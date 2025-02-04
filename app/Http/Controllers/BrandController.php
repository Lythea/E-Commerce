<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brand;

class BrandController extends Controller
{
    // Get all brands
    public function index()
    {
        return response()->json(Brand::all());
    }

    // Store a new brand
    public function store(Request $request)
    {
        // Validate input fields including the image file
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validate the image type and size
        ]);

        // Store the image in the 'public/brand' directory and get its path
        $image = $request->file('image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $imagePath = public_path('brand/' . $imageName);
        $image->move(public_path('brand'), $imageName);

        // Create a new brand with the name and image path
        $brand = Brand::create([
            'name' => $request->name,
            'image' => 'brand/' . $imageName, // Store the path of the uploaded image
        ]);

        return response()->json($brand, 201);
    }

    // Update an existing brand
    public function update(Request $request, $id)
    {
        // Validate input fields including the image file
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // The image field is optional on update
        ]);

        // Find the brand by ID
        $brand = Brand::findOrFail($id);

        // Check if a new image is uploaded and delete the old one
        if ($request->hasFile('image')) {
            // Delete the old image from the public folder if it exists
            $oldImagePath = public_path($brand->image);
            if (file_exists($oldImagePath)) {
                unlink($oldImagePath); // Delete the old image file
            }

            // Store the new image in the 'public/brand' directory and get its path
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $imagePath = public_path('brand/' . $imageName);
            $image->move(public_path('brand'), $imageName);

            // Update the brand's image path
            $brand->image = 'brand/' . $imageName;
        }

        // Update the brand's name
        $brand->update([
            'name' => $request->name,
        ]);

        return response()->json($brand);
    }

    // Delete a brand
    public function destroy($id)
    {
        // Find the brand by ID
        $brand = Brand::findOrFail($id);

        // Delete the image from the public folder if it exists
        $imagePath = public_path($brand->image);
        if (file_exists($imagePath)) {
            unlink($imagePath); // Delete the image file
        }

        // Delete the brand from the database
        $brand->delete();

        return response()->json(['message' => 'Brand deleted successfully']);
    }
        public function count()
    {
        // Count the number of brands
        return response()->json(['count' => Brand::count()]);
    }
}
