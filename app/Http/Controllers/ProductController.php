<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductFormRequest;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productsList = Product::latest()->get();
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
                'price' => $request->price,
                'imageFile' => $image,
                'date' => now(),
                'stock' => $request->stock,
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
