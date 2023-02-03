<?php

namespace App\Http\Services\Admin;

use App\Models\Attribute;
use App\Models\GroupCategory;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class GroupCategoryService
{
    public function list($request)
    {
        $groupCategories = GroupCategory::select(
            'id',
            'group_category_code',
            'name',
            'status',
            'image',
        )->filter($request);
        $total = count($groupCategories->get());
        if ($request->pageSize) {
            $groupCategories->limit($request->pageSize)
                ->offset(($request->currentPage) * ($request->pageSize));
        }

        return response([
            'groupCategories' => $groupCategories->get(),
            'total' => $total,
            'code' => Response::HTTP_OK
        ], Response::HTTP_OK);
    }

    public function create($request)
    {
        try {
            DB::beginTransaction();
            $groupCategory = GroupCategory::create([
                'group_category_code' => $request->group_category_code,
                'name' => $request->name,
                'status' => $request->status,
                "image" => $request->avatar ? $request->avatar[0]["file"] : "",
            ]);
            DB::commit();
            return response([
                'groupCategory' => $groupCategory,
                'message' => 'Create group category success!',
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => 'Create group category error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function detail($request)
    {
        $groupCategory = GroupCategory::find($request->id);
        if ($groupCategory) {
            return response([
                'groupCategory' => $groupCategory,
                'message' => 'success!',
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);
        }

        return response([
            'groupCategory' => [],
            'message' => 'This group category dont exist!',
            'code' => Response::HTTP_NOT_FOUND
        ], Response::HTTP_NOT_FOUND);
    }

    public function edit($request)
    {
        try {
            DB::beginTransaction();
            $groupCategory = GroupCategory::find($request->id);
            if ($groupCategory) {
                $groupCategory->update([
                    'name' => $request->name,
                    'status' => $request->status,
                    "image" => $request->avatar ? $request->avatar[0]["file"] : "",
                ]);

                DB::commit();
                return response([
                    'groupCategory' => $groupCategory,
                    'message' => 'Update group category success!',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }

            return response([
                'groupCategory' => [],
                'message' => 'This group category dont exist!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => 'Update group category error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function delete($id)
    {
        try {
            DB::beginTransaction();
            $groupCategory = GroupCategory::find($id);
            if ($groupCategory) {
                $groupCategory->update([
                    'status' => 0
                ]);
                DB::commit();
                return response([
                    'message' => 'success!',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }

            return response([
                'message' => 'This group category dont exist!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => 'Delete group category error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function attribute($request)
    {
        $groupCategories = GroupCategory::with('attributes:id,name')
            ->where('status', config('constants.user.status.active'))
            ->select('id', 'name')
            ->find($request->group_category_id);
        if ($groupCategories) {
            return response([
                'groupCategories' => $groupCategories,
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);
        }
        return response([
            'message' => 'Please select group category',
            'code' => Response::HTTP_NOT_FOUND
        ], Response::HTTP_NOT_FOUND);
    }

    public function storeAttribute($request)
    {
        try {
            DB::beginTransaction();
            $groupCategory = GroupCategory::find($request->group_category_id);
            if ($groupCategory) {
                $attribute = Attribute::create([
                    "name" => $request->attribute
                ]);
                $groupCategory->attributes()->attach($attribute);
                DB::commit();
                return response([
                    'message' => 'success!',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }

            return response([
                'message' => 'This group category dont exist!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => 'Create group category attribute error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function topGroupCategory()
    {
        $groupCategories = GroupCategory::select(
            'id',
            'group_category_code',
            'name',
            'status',
            'image'
        )
            ->withCount(['products' => function ($query) {
                $query->whereHas('orderDetail');
            }])
            ->orderBy('products_count', 'desc')
            ->take(3)
            ->get();

        return response([
            "groupCategories" => $groupCategories,
            'message' => 'success',
            'code' => Response::HTTP_OK
        ], Response::HTTP_OK);
    }
}
