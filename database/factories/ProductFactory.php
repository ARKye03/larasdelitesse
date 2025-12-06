<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Product categories for more realistic names
        $categories = [
            'Electronics' => ['Laptop', 'Smartphone', 'Tablet', 'Headphones', 'Camera', 'Monitor', 'Keyboard', 'Mouse'],
            'Clothing' => ['T-Shirt', 'Jeans', 'Dress', 'Jacket', 'Shoes', 'Hat', 'Scarf', 'Sweater'],
            'Food' => ['Chocolate', 'Coffee', 'Tea', 'Cookies', 'Pasta', 'Rice', 'Bread', 'Cheese'],
            'Books' => ['Novel', 'Cookbook', 'Magazine', 'Comic', 'Textbook', 'Dictionary', 'Atlas', 'Journal'],
            'Home' => ['Lamp', 'Cushion', 'Rug', 'Vase', 'Mirror', 'Clock', 'Frame', 'Candle'],
            'Sports' => ['Ball', 'Racket', 'Weights', 'Mat', 'Bottle', 'Bag', 'Gloves', 'Shoes'],
        ];

        $category = fake()->randomElement(array_keys($categories));
        $productType = fake()->randomElement($categories[$category]);
        $brand = fake()->company();

        // Generate a realistic product name
        $name = fake()->boolean(70)
            ? "{$brand} {$productType}"
            : "{$productType} - {$brand}";

        // Generate realistic rating distribution
        // Most common: 4.0-4.6 (60%)
        // Less common: 3.0-3.9 (20%)
        // Rare: 4.7-4.9 (10%)
        // Very rare: 5.0 (3%)
        // Occasional: 2.0-2.9 (5%)
        // Rare bad: 1.0-1.9 (2%)
        $rand = fake()->numberBetween(1, 100);

        if ($rand <= 60) {
            // Most common: 4.0-4.6
            $rating = fake()->randomFloat(1, 4.0, 4.6);
        } elseif ($rand <= 80) {
            // Less common: 3.0-3.9
            $rating = fake()->randomFloat(1, 3.0, 3.9);
        } elseif ($rand <= 90) {
            // Rare: 4.7-4.9
            $rating = fake()->randomFloat(1, 4.7, 4.9);
        } elseif ($rand <= 93) {
            // Very rare: 5.0
            $rating = 5.0;
        } elseif ($rand <= 98) {
            // Occasional: 2.0-2.9
            $rating = fake()->randomFloat(1, 2.0, 2.9);
        } else {
            // Rare bad: 1.0-1.9
            $rating = fake()->randomFloat(1, 1.0, 1.9);
        }

        return [
            'name' => $name,
            'description' => fake()->paragraph(3),
            'category' => $category,
            'brand' => $brand,
            'price' => fake()->randomFloat(2, 5, 2000), // Price between $5 and $2000
            'stock' => fake()->numberBetween(0, 500),
            'rating' => round($rating, 1), // Round to 1 decimal place
            'imageFile' => null, // We'll handle images separately if needed
            'og_imageFile' => null,
        ];
    }

    /**
     * Indicate that the product is out of stock.
     */
    public function outOfStock(): static
    {
        return $this->state(fn(array $attributes) => [
            'stock' => 0,
        ]);
    }

    /**
     * Indicate that the product is low in stock.
     */
    public function lowStock(): static
    {
        return $this->state(fn(array $attributes) => [
            'stock' => fake()->numberBetween(1, 10),
        ]);
    }

    /**
     * Indicate that the product is expensive.
     */
    public function expensive(): static
    {
        return $this->state(fn(array $attributes) => [
            'price' => fake()->randomFloat(2, 1000, 10000),
        ]);
    }

    /**
     * Indicate that the product is cheap.
     */
    public function cheap(): static
    {
        return $this->state(fn(array $attributes) => [
            'price' => fake()->randomFloat(2, 1, 50),
        ]);
    }
}
