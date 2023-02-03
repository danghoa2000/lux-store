<?php

namespace App\Http\Controllers;

use App\Models\Commune;
use App\Models\District;
use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DirectionController extends Controller
{
    public function getProvince()
    {
        try {
            $provinces = Province::select('id', 'name')->get();
            return response(['provinces' => $provinces, 'message' => 'success', 'code' => Response::HTTP_OK], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response(['provinces' => [], 'message' => 'Get data province error', 'code' => Response::HTTP_INTERNAL_SERVER_ERROR], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getDistrict($provinceId)
    {
        try {
            $districts = District::where('province_id', $provinceId)->select('id', 'name')->get();
            return response(['districts' => $districts, 'message' => 'success', 'code' => Response::HTTP_OK], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response(['districts' => [], 'message' => 'Get data district error', 'code' => Response::HTTP_INTERNAL_SERVER_ERROR], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getCommune($districtId)
    {
        try {
            $communes = Commune::where('district_id', $districtId)->select('id', 'name')->get();
            return response(['communes' => $communes, 'message' => 'success', 'code' => Response::HTTP_OK], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response(['communes' => [], 'message' => 'Get data commune error', 'code' => Response::HTTP_INTERNAL_SERVER_ERROR], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
