<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\GroupCategoryRequest;
use App\Http\Services\Admin\GroupCategoryService;
use Illuminate\Http\Request;

class GroupCategoryController extends Controller
{
    protected $groupCategoryService;

    public function __construct(GroupCategoryService $groupCategoryService)
    {
        $this->groupCategoryService = $groupCategoryService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->groupCategoryService->list($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GroupCategoryRequest $request)
    {
        return $this->groupCategoryService->create($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        return $this->groupCategoryService->detail($request);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(GroupCategoryRequest $request)
    {
        return $this->groupCategoryService->edit($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->groupCategoryService->delete($id);
    }

    /**
     * Store a newly attribute created resource in storage.
     *
     * @param  $request
     * @return \Illuminate\Http\Response
     */
    public function attribute(Request $request)
    {
        return $this->groupCategoryService->attribute($request);
    }

    /**
     * Store a newly attribute created resource in storage.
     *
     * @param  $request
     * @return \Illuminate\Http\Response
     */
    public function attributeCreate(Request $request)
    {
        return $this->groupCategoryService->storeAttribute($request);
    }

    public function topGroupCategory(Request $request)
    {
        return $this->groupCategoryService->topGroupCategory($request);
    }
}
