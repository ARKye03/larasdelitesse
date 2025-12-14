<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductFormRequest;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productsList = Product::latest()->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'category' => $product->category,
                'brand' => $product->brand,
                'price' => $product->price,
                'imageFile' => $product->imageFile ? asset('storage/' . $product->imageFile) : null,
                'stock' => $product->stock,
                'rating' => $product->rating,
                'created_at' => $product->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $product->updated_at->format('Y-m-d H:i:s'),
            ];
        });
        return Inertia::render('products/index', [
            'productsList' => $productsList,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('products/product-form');
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param ProductFormRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(ProductFormRequest $request)
    {
        try {
            $image = null;
            if ($request->file('imageFile')) {
                $image = $request->file('imageFile');
                $image = $image->store('products', 'public');
            }
            Log::info('Product imageFile: ' . $image);
            $product = Product::create([
                'name' => $request->name,
                'description' => $request->description,
                'category' => $request->category,
                'brand' => $request->brand,
                'price' => $request->price,
                'imageFile' => $image,
                'stock' => $request->stock,
                'rating' => $request->rating,
            ]);

            if ($product) {
                return redirect()->route('products.index')->with('success', 'Product created successfully');
            } else {
                return redirect()->back()->with('error', 'Product not created');
            }
        } catch (Exception $e) {
            Log::error('Failed to create product: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Product not created: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('products/view', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'category' => $product->category,
                'brand' => $product->brand,
                'price' => $product->price,
                'imageFile' => $product->imageFile ? asset('storage/' . $product->imageFile) : null,
                'stock' => $product->stock,
                'rating' => $product->rating,
                'created_at' => $product->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $product->updated_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }


    /**
     * Display a product detail page for users (shopping frontend).
     * 
     * @param Product $product
     * @return \Inertia\Response
     */
    public function showShoppingProduct(Product $product)
    {
        return Inertia::render('shopping/product', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'category' => $product->category,
                'brand' => $product->brand,
                'price' => $product->price,
                'imageFile' => $product->imageFile ? asset('storage/' . $product->imageFile) : null,
                'rating' => $product->rating,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('products/product-form', [
            'product' => $product,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param ProductFormRequest $request
     * @param Product $product
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ProductFormRequest $request, Product $product)
    {
        try {
            $product->name = $request->name;
            $product->description = $request->description;
            $product->category = $request->category;
            $product->brand = $request->brand;
            $product->price = $request->price;
            $product->stock = $request->stock;
            $product->rating = $request->rating;

            // Handle image upload if a new image is provided
            if ($request->file('imageFile')) {
                // Delete old image if it exists
                if ($product->imageFile && Storage::disk('public')->exists($product->imageFile)) {
                    Storage::disk('public')->delete($product->imageFile);
                }

                // Store new image
                $image = $request->file('imageFile');
                $product->imageFile = $image->store('products', 'public');
            }

            $product->save();

            return redirect()->route('products.index')->with('success', 'Product updated successfully');
        } catch (Exception $e) {
            Log::error('Failed to update product: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Product not updated: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            if ($product->imageFile && Storage::disk('public')->exists($product->imageFile)) {
                Storage::disk('public')->delete($product->imageFile);
            }
            $product->delete();
            return redirect()->route('products.index')->with('success', 'Product deleted successfully');
        } catch (Exception $e) {
            Log::error('Failed to delete product: ' . $e->getMessage(), ['exception' => $e]);
            return redirect()->back()->with('error', 'Product not deleted: ' . $e->getMessage());
        }
    }
}
