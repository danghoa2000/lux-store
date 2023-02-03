<?php

namespace App\Http\Controllers;

use App\Http\Services\UploadService;
use App\Models\Product;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    //
    protected $uploadService;

    public function __construct(UploadService $uploadService)
    {
        $this->uploadService = $uploadService;
    }
    public function upload(Request $request)
    {
        $path = "";
        switch ($request->uploadType) {
            case 'product':
                $path = Product::UPLOAD_PATH;
                break;

            default:
                # code...
                break;
        }
        return $this->uploadService->store($request->file("file"), $path);
    }
}
