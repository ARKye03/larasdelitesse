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

        return [
            'name' => $name,
            'description' => fake()->paragraph(3),
            'price' => fake()->randomFloat(2, 5, 2000), // Price between $5 and $2000
            'stock' => fake()->numberBetween(0, 500),
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
