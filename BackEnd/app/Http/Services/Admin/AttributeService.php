<?php

namespace App\Http\Services\Admin;

use App\Models\Attribute;
use App\Models\GroupCategory;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class AttributeService
{
    public function create($request)
    {
        try {
            DB::beginTransaction();
            $attribute = Attribute::find($request->attribute);
            if ($attribute) {
                $attribute->attributeValue()->create([
                    "attribute_id" => $request->attribute,
                    "attribute_value_name" => $request->attributeValue
                ]);
                DB::commit();
                return response([
                    'message' => 'A new attribute value has been created!',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }
            return response([
                'message' => 'This attribute not found!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => 'Create new attribute value error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function option($request)
    {
        try {
            $attribute = Attribute::with('attributeValue:id,attribute_id,attribute_value_name')->find($request->id);
            if ($attribute) {
                return response([
                    'attribute' => $attribute,
                    'message' => 'success',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }
            return response([
                'message' => 'This attribute not found!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $th) {
            return response([
                'message' => 'server error',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }
}
