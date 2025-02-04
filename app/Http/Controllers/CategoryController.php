<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
class CategoryController extends Controller
{
      // Get all category
    public function index()
    {
        return response()->json(Category::all());
    }

public function store(Request $request)
{
    // Validate input fields including the image file
    $request->validate([
        'name' => 'required|string|max:255',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validate the image type and size
    ]);

    // Store the image in the 'public/category' directory and get its path
    $image = $request->file('image');
    $imageName = time() . '.' . $image->getClientOriginalExtension();
    $imagePath = public_path('category/' . $imageName);
    $image->move(public_path('category'), $imageName);

    // Create a new category with the name and image path
    $category = Category::create([
        'name' => $request->name,
        'image' => 'category/' . $imageName, // Store the path of the uploaded image
    ]);

    return response()->json($category, 201);
}
public function update(Request $request, $id)
{
    // Validate input fields including the image file
    $request->validate([
        'name' => 'required|string|max:255',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // The image field is optional on update
    ]);

    // Find the category by ID
    $category = Category::findOrFail($id);

    // Check if a new image is uploaded and delete the old one
    if ($request->hasFile('image')) {
        // Delete the old image from the public folder if it exists
        $oldImagePath = public_path($category->image);
        if (file_exists($oldImagePath)) {
            unlink($oldImagePath); // Delete the old image file
        }

        // Store the new image in the 'public/category' directory and get its path
        $image = $request->file('image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $imagePath = public_path('category/' . $imageName);
        $image->move(public_path('category'), $imageName);

        // Update the category's image path
        $category->image = 'category/' . $imageName;
    }

    // Update the category's name
    $category->update([
        'name' => $request->name,
    ]);

    return response()->json($category);
}

public function destroy($id)
{
    // Find the category by ID
    $category = Category::findOrFail($id);

    // Delete the image from the public folder if it exists
    $imagePath = public_path($category->image);
    if (file_exists($imagePath)) {
        unlink($imagePath); // Delete the image file
    }

    // Delete the category from the database
    $category->delete();

    return response()->json(['message' => 'Category deleted successfully']);
}
    public function count()
    {
        // Count the number of brands
        return response()->json(['count' => Category::count()]);
    }
}
