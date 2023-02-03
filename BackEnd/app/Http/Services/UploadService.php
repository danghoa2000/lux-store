<?php

namespace App\Http\Services;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UploadService
{
    public function store($image, $path)
    {
        try {
            $name = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);;
            $extension = $image->clientExtension();
            $fullPath = 'uploads/' . $path;
            $image->move(public_path($fullPath), time() . "." . $extension);
            return response([
                "imgName" => $name . "." . $extension,
                "path" => $fullPath . time() . "." . $extension
            ], Response::HTTP_OK);
        } catch (\Exception $exception) {
            return response([], Response::HTTP_INTERNAL_SERVER_ERROR);
            return false;
        }
    }
}
