<?php

namespace App\Http\Controllers;
use App\Models\SaleBanner;
use Illuminate\Http\Request;

class SaleBannerController extends Controller
{
      public function updateBackground(Request $request, $id)
    {
        // Validate the incoming request to ensure 'is_background' is either 0 or 1
        $request->validate([
            'is_background' => 'required|in:0,1', // Ensures the is_background field is either 0 or 1
        ]);

        // Find the banner by its ID
        $banner = SaleBanner::findOrFail($id);

        // Update the 'is_background' field with the new value
        $banner->is_background = $request->input('is_background');

        // Save the updated banner
        $banner->save();

        // Respond with a success message or the updated banner data
        return response()->json([
            'message' => 'Banner background updated successfully',
            'banner' => $banner
        ]);
    }
      public function updateStatus(Request $request, $id)
    {
        // Validate the incoming request to ensure 'is_active' is either 0 or 1
        $request->validate([
            'is_active' => 'required|in:0,1', // Ensures the is_active field is either 0 or 1
        ]);

        // Find the banner by its ID
        $banner = SaleBanner::findOrFail($id);

        // Update the 'is_active' field with the new value (0 or 1)
        $banner->is_active = $request->input('is_active');

        // Save the updated banner
        $banner->save();

        // Respond with a success message or the updated banner data
        return response()->json([
            'message' => 'Banner status updated successfully',
            'banner' => $banner
        ]);
    }
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
    $isBackground = 0; // Default to 0 for no background image

    // Check if there is an uploaded image
    if ($request->hasFile('image_url')) {
        $image = $request->file('image_url');
        $imageName = time() . '-' . $image->getClientOriginalName(); // Generate a unique name for the image
        $imagePath = 'banners/' . $imageName; // Store in the 'public/banners' folder

        // Move the image to the public directory
        $image->move(public_path('banners'), $imageName);

        // Set is_background to 1 since an image is uploaded
        $isBackground = 1;
    } elseif ($request->bg_color) {
        // If bg_color is present, set is_background to 0
        $isBackground = 0;
    }

    // Create the banner with the validated data
    $banner = SaleBanner::create([
        'title' => $request->title,
        'description' => $request->description,
        'image_url' => $imagePath, // Store the relative path of the image
        'bg_color' => $request->bg_color,
        'is_active' => $request->is_active,
        'is_background' => $isBackground, // Set the is_background flag
    ]);

    // Return the created banner as a response
    return response()->json($banner, 201); // Return with a 201 status (Created)
}

public function update(Request $request, $id)
{
        try {
        $banner = SaleBanner::findOrFail($id); // Find the banner by ID
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json(['message' => 'Banner not found'], 404);
    }
    // Validate the request input
    $request->validate([
        'title' => 'nullable|string|max:255',
        'description' => 'nullable|string',
        'image_url' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:20000', // Allow file upload for image
        'bg_color' => 'nullable|string',
        'is_active' => 'nullable|boolean',
    ]);

    // Initialize $imagePath to the current banner image URL
    $imagePath = $banner->image_url;

    // Check if a new image is uploaded
    if ($request->hasFile('image_url')) {
        // Delete the old image if a new one is uploaded
        if ($imagePath) {
            // Remove the old image file from the public folder
            $oldImagePath = public_path($imagePath);
            if (file_exists($oldImagePath)) {
                unlink($oldImagePath);
            }
        }

        // Handle the new uploaded image
        $image = $request->file('image_url');
        $imageName = time() . '-' . $image->getClientOriginalName(); // Generate a unique image name
        $imagePath = 'banners/' . $imageName; // Store in the 'public/banners' folder

        // Move the image to the public directory
        $image->move(public_path('banners'), $imageName);
    }

    // Determine is_background value based on bg_color and image_url
    $isBackground = 0;
    if ($request->hasFile('image_url')) {
        $isBackground = 1; // Set is_background to 1 if image is present
    } elseif ($request->bg_color) {
        $isBackground = 0; // Set is_background to 0 if only bg_color is present
    }

    // Update the banner with the new data
    $banner->update([
        'title' => $request->title ?? $banner->title, // Keep existing value if not updated
        'description' => $request->description ?? $banner->description, // Same here
        'image_url' => $imagePath, // Use the new image path
        'bg_color' => $request->bg_color ?? $banner->bg_color, // Keep existing if not updated
        'is_active' => $request->is_active ?? $banner->is_active, // Keep existing if not updated
        'is_background' => $isBackground, // Set the new is_background value
    ]);

    // Return the updated banner as a response
    return response()->json($banner);
}

    // Delete a banner
    public function destroy($id)
    {
        $banner = SaleBanner::findOrFail($id);
        $banner->delete(); // Delete the banner
        return response()->json(['message' => 'Banner deleted successfully']);
    }
        public function count()
    {
        // Count the number of brands
        return response()->json(['count' => SaleBanner::count()]);
    }
}
