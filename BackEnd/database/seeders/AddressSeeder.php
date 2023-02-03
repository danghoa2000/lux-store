<?php

namespace Database\Seeders;

use App\Models\Commune;
use App\Models\District;
use App\Models\Province;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        District::truncate();
        Province::truncate();
        Commune::truncate();
        $jsonString = file_get_contents('https://provinces.open-api.vn/api/?depth=3');
        $data = json_decode($jsonString, true);

        // Add province from data.
        foreach ($data as $itemProvince) {
            $province = Province::create([
                'name' => $itemProvince['name'],
            ]);

            // Add district for province.
            foreach ($itemProvince['districts'] as $itemDistrict) {
                $district = $province->districts()->Create([
                    'name' => $itemDistrict['name'],
                ]);

                foreach ($itemDistrict['wards'] as $itemWard) {
                    $district->communes()->create([
                        'name' => $itemWard['name'],
                    ]);
                }
            }
        }
    }
}
