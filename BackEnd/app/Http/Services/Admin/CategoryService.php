<?php

namespace App\Http\Services\Admin;

use App\Models\Category;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class CategoryService
{
    public function list($request)
    {
        $categories = Category::select(
            'id',
            'category_code',
            'name',
            'group_category_id',
            'description',
            'created_by',
            'status',
        )->filter($request);
        $total = count($categories->get());
        if ($request->pageSize) {
            $categories->with('groupCategory', 'createdBy.info')
                ->limit($request->pageSize)
                ->offset(($request->currentPage) * ($request->pageSize));
        }
        return response([
            'categories' => $categories->get(),
            'total' => $total,
            'code' => Response::HTTP_OK
        ], Response::HTTP_OK);
    }

    public function create($request)
    {
        try {
            DB::beginTransaction();
            $category = Category::create([
                'category_code' => $request->category_code,
                'name' => $request->name,
                'description' => $request->description,
                'group_category_id' => $request->group_category_id,
                'created_by' => auth('api')->user()->id,
                'status' => $request->status
            ]);

            DB::commit();
            return response([
                'category' => $category,
                'message' => 'Create category success!',
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => 'Create category error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function detail($request)
    {
        $category = Category::with('groupCategory')->find($request->id);
        if ($category) {
            return response([
                'category' => $category,
                'message' => 'success!',
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);
        }

        return response([
            'category' => [],
            'message' => 'This category dont exist!',
            'code' => Response::HTTP_NOT_FOUND
        ], Response::HTTP_NOT_FOUND);
    }

    public function edit($request)
    {
        try {
            DB::beginTransaction();
            $category = Category::find($request->id);
            if ($category) {
                $category->update([
                    'name' => $request->name,
                    'description' => $request->description,
                    'group_category_id' => $request->group_category_id,
                    'status' => $request->status
                ]);

                DB::commit();
                return response([
                    'category' => $category,
                    'message' => 'Update category success!',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }

            return response([
                'category' => [],
                'message' => 'This category dont exist!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => 'Update category error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function delete($id)
    {
        try {
            $category = Category::find($id);
            if ($category) {
                $category->update([
                    'status' => 0
                ]);
                return response([
                    'message' => 'success!',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }

            return response([
                'message' => 'This category dont exist!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $th) {
            return response([
                'message' => 'Delete category error!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
