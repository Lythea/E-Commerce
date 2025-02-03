<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FeaturedProduct;
class FeaturedProductController extends Controller
{
    // Fetch all featured products
    public function index()
    {
        return FeaturedProduct::all();
    }
public function store(Request $request)
{
    // Validate incoming request
    $request->validate([
        'name' => 'required|string',
        'description' => 'required|string',
        'percent' => 'required|string', // You might want to validate this as a string or a number depending on how you expect the value
        'image' => 'required|file|mimes:jpeg,png,jpg,gif|max:10240', // validate file type and size (10MB max)
        'current_price' => 'required|numeric',
        'discounted_price' => 'required|numeric',
    ]);

    // Handle the image file upload
    if ($request->hasFile('image')) {
        // Get the file from the request
        $image = $request->file('image');
        
        // Generate a unique filename for the image
        $imageName = uniqid() . '.' . $image->getClientOriginalExtension();

        // Move the image to the public/images directory
        $image->move(public_path('images'), $imageName);

        // Create the product and store all the data, including the image path
        $product = FeaturedProduct::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'percent' => $request->input('percent'),
            'image_url' => 'images/' . $imageName, // Store the relative image path
            'current_price' => $request->input('current_price'),
            'discounted_price' => $request->input('discounted_price'),
        ]);

        return response()->json($product, 201); // Respond with the created product
    } else {
        return response()->json(['error' => 'No image uploaded'], 400);
    }
}



    // Show a single featured product
    public function show($id)
    {
        $product = FeaturedProduct::findOrFail($id);
        return response()->json($product);
    }

    // Update a featured product
    public function update(Request $request, $id)
    {
        $product = FeaturedProduct::findOrFail($id);

        $request->validate([
            'name' => 'string',
            'description' => 'string',
            'percent' => 'numeric',
            'image_url' => 'url',
            'current_price' => 'numeric',
            'discounted_price' => 'numeric',
        ]);

        $product->update($request->all());

        return response()->json($product);
    }

    // Delete a featured product
    public function destroy($id)
    {
        $product = FeaturedProduct::findOrFail($id);
        $product->delete();

        return response()->json(null, 204);
    }
}
