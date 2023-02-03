<?php

namespace App\Http\Services\Admin;

use App\Models\Event;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class EventService
{
    public function list($request)
    {
        $events = Event::select('id', 'name')
            ->with('products:id,name,sale_type,sale_off,expried,price,image')
            ->get();
        return response([
            'events' => $events,
            'code' => Response::HTTP_OK
        ], Response::HTTP_OK);
    }

    public function edit($request)
    {
        try {
            DB::beginTransaction();
            $events = Event::all();
            foreach ($events as $event) {
                $event->products()->detach();
            }
            foreach ($request->data as $key => $item) {
                $event = Event::find($key);
                $event->products()->attach(array_column($item, 'id'));
            }
            DB::commit();
            return response([
                'message' => 'Update event success!',
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => 'Update event error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
