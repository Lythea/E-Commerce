<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FeaturedProduct;
class FeaturedProductController extends Controller
{
public function count()
{
    $count = FeaturedProduct::count();
    \Log::info('Featured Product Count: ' . $count);  // Log the count for debugging
    return response()->json(['count' => $count]);
}

    public function index()
    {
        return FeaturedProduct::all();
    }
public function store(Request $request)
{
    // Validate incoming request
    $request->validate([
        'name' => 'required|string',
             'category' => 'required|string',
        'description' => 'required|string',
        'percent' => 'required|string', // You might want to validate this as a string or a number depending on how you expect the value
        'image' => 'required|file|mimes:jpeg,png,jpg,gif|max:10240', // Validate file type and size (10MB max)
        'current_price' => 'required|numeric',
        'discounted_price' => 'required|numeric',
        'expiration_date' => 'required|date|after_or_equal:today', // Validate expiration date (must be a valid date and not in the past)
    ]);

    // Handle the image file upload
    if ($request->hasFile('image')) {
        // Get the file from the request
        $image = $request->file('image');
        
        // Generate a unique filename for the image
        $imageName = uniqid() . '.' . $image->getClientOriginalExtension();

        // Move the image to the public/images directory
        $image->move(public_path('images'), $imageName);

        // Create the product and store all the data, including the image path and expiration date
        $product = FeaturedProduct::create([
            'name' => $request->input('name'),
              'category' => $request->input('category'),
            'description' => $request->input('description'),
            'percent' => $request->input('percent'),
            'image_url' => 'images/' . $imageName, // Store the relative image path
            'current_price' => $request->input('current_price'),
            'discounted_price' => $request->input('discounted_price'),
            'expiration_date' => $request->input('expiration_date'), // Store the expiration date
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
  public function updateStatus(Request $request, $id)
    {
    
    }

public function destroy($id)
{
    $product = FeaturedProduct::findOrFail($id);
    
    // Check if the product has an associated image and delete it from the public directory
    if ($product->image_url) {
        $imagePath = public_path($product->image_url); // Get the full path of the image
        
        // Delete the image file if it exists
        if (file_exists($imagePath)) {
            unlink($imagePath); // Delete the image file from the public folder
        }
    }

    // Delete the product from the database
    $product->delete();

    return response()->json(null, 204);
}
   
}
