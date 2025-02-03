<?php

namespace App\Http\Controllers;
use App\Models\SaleBanner;
use Illuminate\Http\Request;

class SaleBannerController extends Controller
{
     // Get all banners
    public function index()
    {
        return SaleBanner::all();  // Returns all banners
    }

    // Store a new banner
   public function store(Request $request)
{
    // Validate input
    $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'image_url' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:20000',
        'bg_color' => 'nullable|string',
        'is_active' => 'nullable|boolean',
    ]);

    // Initialize $imagePath as null in case no image is uploaded
    $imagePath = null;

    // Check if there is an uploaded image
    if ($request->hasFile('image_url')) {
        $image = $request->file('image_url');
        $imageName = time() . '-' . $image->getClientOriginalName(); // Generate a unique name for the image
        $imagePath = 'banners/' . $imageName; // Store in the 'public/banners' folder

        // Move the image to the public directory
        $image->move(public_path('banners'), $imageName);
    }

    // Create the banner with the validated data
    $banner = SaleBanner::create([
        'title' => $request->title,
        'description' => $request->description,
        'image_url' => $imagePath, // Store the relative path of the image
        'bg_color' => $request->bg_color,
        'is_active' => $request->is_active,
    ]);

    // Return the created banner as a response
    return response()->json($banner, 201); // Return with a 201 status (Created)
}

    // Update an existing banner
    public function update(Request $request, $id)
    {
        $banner = SaleBanner::findOrFail($id); // Find the banner by ID

        $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|string',
            'bg_color' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        $banner->update($request->all()); // Update the banner with the new data
        return response()->json($banner); // Return the updated banner
    }

    // Delete a banner
    public function destroy($id)
    {
        $banner = SaleBanner::findOrFail($id);
        $banner->delete(); // Delete the banner
        return response()->json(['message' => 'Banner deleted successfully']);
    }
}
