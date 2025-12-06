<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing products (optional - comment out if you want to keep existing data)
        // Product::truncate();

        // Create 1000 products with varied characteristics
        Product::factory(800)->create();

        // Create 100 out of stock products
        Product::factory(50)->outOfStock()->create();

        // Create 50 low stock products
        Product::factory(50)->lowStock()->create();

        // Create 50 expensive products
        Product::factory(50)->expensive()->create();

        // Create 50 cheap products
        Product::factory(50)->cheap()->create();

        $this->command->info('Successfully seeded 1000 products!');
    }
}
