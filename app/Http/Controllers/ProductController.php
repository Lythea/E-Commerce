<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
class ProductController extends Controller
{
    // Get all products
    public function index()
    {
        return response()->json(Product::all());
    }

public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'price' => 'required|numeric|min:0',
        'stock' => 'required|integer|min:0',
        'category' => 'required|string|max:255',
        'image' => 'nullable|file|mimes:jpg,jpeg,png,gif', // Add file validation
        'ratings' => 'nullable|numeric|min:0|max:5',
        'rating_count' => 'nullable|integer|min:0',
        'brand' => 'nullable|string|max:255',
        'is_active' => 'nullable|integer|in:0,1', // Accepts 0 or 1 for active status
        'weight' => 'nullable|integer|min:0',
        'specifications' => 'nullable|string',
    ]);

    // Handle file upload
    if ($request->hasFile('image')) {
        // Store the image in the 'public/product_images' folder
        $imagePath = $request->file('image')->move(public_path('product_images'), $request->file('image')->getClientOriginalName());
        $imagePath = 'product_images/' . $request->file('image')->getClientOriginalName();
    } else {
        $imagePath = null;
    }

    // Create the product
    $product = Product::create([
        'name' => $validated['name'],
        'description' => $validated['description'],
        'price' => $validated['price'],
        'stock' => $validated['stock'],
        'category' => $validated['category'],
        'image' => $imagePath,  // Store the image path
        'ratings' => $validated['ratings'] ?? 0,
        'rating_count' => $validated['rating_count'] ?? 0,
        'brand' => $validated['brand'],
        'is_active' => $validated['is_active'] ?? 1,  // Store 0 or 1
        'weight' => $validated['weight'],
        'specifications' => $validated['specifications'],
    ]);

    return response()->json($product, 201);
}


    // Show a single product
    public function show($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }

    // Update a product
  public function update(Request $request, $id)
{
    // Find the product by ID
    $product = Product::find($id);

    // If the product does not exist, return a 404 response
    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    // Validate the incoming request
    $validated = $request->validate([
        'name' => 'sometimes|string|max:255',
        'description' => 'nullable|string',
        'price' => 'sometimes|numeric|min:0',
        'stock' => 'sometimes|integer|min:0',
        'category' => 'sometimes|string|max:255',
        'image' => 'sometimes|nullable|file|mimes:jpg,jpeg,png',
        'ratings' => 'sometimes|nullable|numeric|min:0|max:5',
        'rating_count' => 'sometimes|nullable|integer|min:0',
        'brand' => 'sometimes|nullable|string|max:255',
        'is_active' => 'sometimes|nullable|in:0,1',
        'weight' => 'sometimes|nullable|integer|min:0',
        'specifications' => 'sometimes|nullable|string',
    ]);

    // If an image is provided, handle the upload
    if ($request->hasFile('image')) {
        // Delete the old image if it exists
        if ($product->image && file_exists(public_path($product->image))) {
            unlink(public_path($product->image)); // Delete the old image
        }

        // Store the new image in the 'public/product_images' directory
        $imageName = $request->file('image')->getClientOriginalName();
        $imagePath = $request->file('image')->move(public_path('product_images'), $imageName);
        $validated['image'] = 'product_images/' . $imageName; // Save the new image path
    }

    // Update the product with the validated data
    $product->update($validated);

    // Return the updated product as a response
    return response()->json($product);
}



   public function destroy($id)
{
    $product = Product::find($id);

    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    // Check if the product has an image and if the file exists
    if ($product->image && File::exists(public_path($product->image))) {
        // Delete the image from the public directory
        File::delete(public_path($product->image));
    }

    // Delete the product record from the database
    $product->delete();

    return response()->json(['message' => 'Product deleted successfully']);
}
    public function count()
    {
        // Count the number of brands
        return response()->json(['count' => Product::count()]);
    }
}
