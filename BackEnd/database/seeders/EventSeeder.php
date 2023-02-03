<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Event::truncate();
        $eventList = ["Flash Delas", "New Arrivals", "Big Discounts"];
        foreach ($eventList as $item) {
            Event::create(['name' => $item]);
        }
    }
}
