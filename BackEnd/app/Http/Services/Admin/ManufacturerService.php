<?php

namespace App\Http\Services\Admin;

use App\Models\Manufacturer;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ManufacturerService
{
    public function list($request)
    {
        $manufacturers = Manufacturer::select(
            'id',
            'manufacturer_code',
            'name',
            'telephone',
            'address',
            'status',
        )->filter($request);
        $total = count($manufacturers->get());
        if ($request->pageSize) {
            $manufacturers->limit($request->pageSize)
                ->offset(($request->currentPage) * ($request->pageSize));
        }
        return response([
            'manufacturers' => $manufacturers->get(),
            'total' => $total,
            'code' => Response::HTTP_OK
        ], Response::HTTP_OK);
    }

    public function create($request)
    {
        try {
            DB::beginTransaction();
            $manufacturer = Manufacturer::create([
                'manufacturer_code' => $request->manufacturer_code,
                'name' => $request->name,
                'status' => $request->status,
                'telephone' =>  $request->telephone,
                'address' =>  $request->address,
            ]);

            DB::commit();
            return response([
                'manufacturer' => $manufacturer,
                'message' => 'Create manufacturer success!',
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => 'Create manufacturer error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function detail($request)
    {
        $manufacturer = Manufacturer::find($request->id);
        if ($manufacturer) {
            return response([
                'manufacturer' => $manufacturer,
                'message' => 'success!',
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);
        }

        return response([
            'manufacturer' => [],
            'message' => 'This manufacturer dont exist!',
            'code' => Response::HTTP_NOT_FOUND
        ], Response::HTTP_NOT_FOUND);
    }

    public function edit($request)
    {
        try {
            DB::beginTransaction();
            $manufacturer = Manufacturer::find($request->id);
            if ($manufacturer) {
                $manufacturer->update([
                    'name' => $request->name,
                    'status' => $request->status,
                    'telephone' =>  $request->telephone,
                    'address' =>  $request->address,
                ]);

                DB::commit();
                return response([
                    'manufacturer' => $manufacturer,
                    'message' => 'Update manufacturer success!',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }

            return response([
                'manufacturer' => [],
                'message' => 'This manufacturer dont exist!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => 'Update manufacturer error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function delete($id)
    {
        try {
            $manufacturer = Manufacturer::find($id);
            if ($manufacturer) {
                $manufacturer->update([
                    'status' => 0
                ]);
                return response([
                    'message' => 'success!',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }

            return response([
                'message' => 'This manufacturer dont exist!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $th) {
            return response([
                'message' => 'Delete manufacturer error!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
