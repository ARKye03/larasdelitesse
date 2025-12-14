<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing products
        // Product::truncate();

        // Me: I mean this is for testing purpose only, is it ok?
        // Me: yeah!
        $sourceDir = '/home/archxekye/Downloads/larasimages';
        $destDir = storage_path('app/public/products');

        // Ensure the destination directory exists
        if (! \Illuminate\Support\Facades\File::exists($destDir)) {
            \Illuminate\Support\Facades\File::makeDirectory($destDir, 0755, true);
        }

        // Create 457 products using the specific images
        Product::factory()
            ->count(457)
            ->sequence(function (\Illuminate\Database\Eloquent\Factories\Sequence $sequence) use ($sourceDir, $destDir) {
                $index = $sequence->index + 1; // 1-based index (1.webp, 2.webp, etc)
                $sourceFile = "{$sourceDir}/{$index}.webp";
                $destFileName = "products/{$index}.webp";
                $destFile = "{$destDir}/{$index}.webp";

                // If source image exists, copy it and use it
                if (\Illuminate\Support\Facades\File::exists($sourceFile)) {
                    \Illuminate\Support\Facades\File::copy($sourceFile, $destFile);
                    return ['imageFile' => $destFileName];
                }

                return ['imageFile' => null];
            })
            ->create();

        $this->command->info('Successfully seeded 457 products with images!');
    }
}
