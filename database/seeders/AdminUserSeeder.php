<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = \App\Models\User::firstOrNew([
            'email' => 'admin@larasdelitesse.com',
        ]);

        $user->name = 'Super Admin';
        $user->password = bcrypt('password'); // You should change this after first login or use env variables
        $user->is_admin = true;

        $user->save();
    }
}
