<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index(Request $request)
    {
        $statistic = Order::selectRaw(('SUM(case when status = 2 then price end) AS total'))
            ->selectRaw(('COUNT(case when status = 0 then 1 end) as order_pending'))
            ->selectRaw(('COUNT(case when status = 2 then 1 end) as order_success'))
            ->selectRaw(('COUNT(case when status = 3 then 1 end) as order_cancel'));
        $startDate = Carbon::now()->format('Y-m-01');
        $endDate = Carbon::now()->endOfMonth()->format('Y-m-d');
        if ($request->date_from) {
            $startDate = Carbon::parse($request->date_from)->format('Y-m-d');
            $statistic->where('created_at', '>=', $startDate);
        }
        if ($request->date_to) {
            $endDate = Carbon::parse($request->date_to)->format('Y-m-d');
            $statistic->where('created_at', '<=', $endDate);
        }

        $statisticOrder = $statistic->get();
        $statisticTotalAssets = $this->statisticTotalAssets($statistic, $request);
        $bestSaledStatistic = $this->bestSaledStatistic($request);
        $ratingStatistic = $this->ratingStatistic($request);
        return response()->json([
            'statistic' => $statisticTotalAssets,
            'orderStatistic' => $statisticOrder,
            'bestSaledStatistic' => $bestSaledStatistic,
            'ratingStatistic' => $ratingStatistic,
            'code' => Response::HTTP_OK,
            'message' => 'success'
        ]);
    }

    public function statisticTotalAssets($statistic, $request)
    {
        $startDate = Carbon::now()->format('Y-m-01');
        $endDate = Carbon::now()->endOfMonth()->format('Y-m-d');
        if ($request->date_from) {
            $startDate = Carbon::parse($request->date_from)->format('Y-m-d');
        }
        if ($request->date_to) {
            $endDate = Carbon::parse($request->date_to)->format('Y-m-d');
        }
        switch ($request->display_by) {
            case 'week':
                $statistic->selectRaw(('WEEK(created_at) AS week, YEAR(created_at) AS year'))
                    ->groupByRaw(('WEEK(created_at), YEAR(created_at)'));
                break;
            case 'month':
                $statistic->selectRaw('DATE_FORMAT(created_at, "%b") AS month, YEAR(created_at) AS year')
                    ->groupByRaw(('DATE_FORMAT(created_at, "%b"), YEAR(created_at)'));
                break;
            case 'year':
                $statistic->selectRaw(('YEAR(created_at) AS year'))
                    ->groupByRaw(('YEAR(created_at)'));
                break;

            default:
                $statistic->selectRaw(('DATE_FORMAT(created_at, "%b %e, %Y") AS date, DATE(created_at) AS createDate'))
                    ->groupByRaw(('DATE(created_at), DAY(created_at)'));
                break;
        }

        $statistic = $statistic->get();

        switch ($request->display_by) {
            case 'week':
                $startDate1 = Carbon::parse($startDate);
                $endDate1 = Carbon::parse($endDate);
                do {
                    $index = 'week: ' . $startDate1->format('W') . ', ' . $startDate1->format('Y');
                    $data[$index] = [
                        'total' => 0,
                        'order_pending' => 0,
                        'order_cancel' => 0,
                        'order_success' => 0,
                    ];
                } while ($startDate1->add(1, 'week')->lte($endDate1));
                foreach ($statistic as $chart) {
                    $index = 'week: ' . ($chart->week < 10 ? ('0' . $chart->week) : $chart->week) . ', ' . $chart->year;
                    $data[$index]['total'] = $chart->total ?? 0;
                    $data[$index]['order_pending'] = $chart->order_pending;
                    $data[$index]['order_cancel'] = $chart->order_cancel;
                    $data[$index]['order_success'] = $chart->order_success;
                }
                break;
            case 'month':
                $startDate1 = Carbon::parse($startDate);
                $endDate1 = Carbon::parse($endDate);
                do {
                    $index = $startDate1->format('Y') . '-' . $startDate1->format('M');
                    $data[$index] = [
                        'total' => 0,
                        'order_pending' => 0,
                        'order_cancel' => 0,
                        'order_success' => 0,
                    ];
                } while ($startDate1->add(1, 'month')->lte($endDate1));
                foreach ($statistic as $chart) {
                    $index = $chart->year . '-' . $chart->month;
                    $data[$index]['total'] = $chart->total ?? 0;
                    $data[$index]['order_pending'] = $chart->order_pending;
                    $data[$index]['order_cancel'] = $chart->order_cancel;
                    $data[$index]['order_success'] = $chart->order_success;
                }
                break;

            case 'year':
                $startDate1 = Carbon::parse($startDate);
                $endDate1 = Carbon::parse($endDate);
                do {
                    $index = $startDate1->format('Y');
                    $data[$index] = [
                        'total' => 0,
                        'order_pending' => 0,
                        'order_cancel' => 0,
                        'order_success' => 0,
                    ];
                } while ($startDate1->add(1, 'year')->lte($endDate1));
                foreach ($statistic as $chart) {
                    $index = $chart->year;
                    $data[$index]['total'] = $chart->total ?? 0;
                    $data[$index]['order_pending'] = $chart->order_pending;
                    $data[$index]['order_cancel'] = $chart->order_cancel;
                    $data[$index]['order_success'] = $chart->order_success;
                }
                break;
            default:
                $startDate1 = Carbon::parse($startDate);
                $endDate1 = Carbon::parse($endDate);
                do {
                    $index = $startDate1->toFormattedDateString();
                    $data[$index] = [
                        'total' => 0,
                        'order_pending' => 0,
                        'order_cancel' => 0,
                        'order_success' => 0,
                    ];
                } while ($startDate1->add(1, 'day')->lte($endDate1));
                foreach ($statistic as $chart) {
                    $index = $chart->date;
                    $data[$index]['total'] = $chart->total ?? 0;
                    $data[$index]['order_pending'] = $chart->order_pending;
                    $data[$index]['order_cancel'] = $chart->order_cancel;
                    $data[$index]['order_success'] = $chart->order_success;
                }
                break;
        }
        return $data;
    }

    public function bestSaledStatistic($request)
    {
        $statistic = Order::select('order.status as order_status')
            ->join('order_detail', 'order_detail.order_id', '=', 'order.id')
            ->join('product_detail', 'order_detail.product_id', '=', 'product_detail.id')
            ->join('products', 'products.id', '=', 'product_detail.product_id')
            ->selectRaw(('SUM(order_detail.qty) as total, products.name'))
            ->groupByRaw('product_detail.product_id')
            ->where('order.status', 2);

        $startDate = Carbon::now()->format('Y-m-01');
        $endDate = Carbon::now()->endOfMonth()->format('Y-m-d');
        if ($request->date_from) {
            $startDate = Carbon::parse($request->date_from)->format('Y-m-d');
            $statistic->where('order.created_at', '>=', $startDate);
        }
        if ($request->date_to) {
            $endDate = Carbon::parse($request->date_to)->format('Y-m-d');
            $statistic->where('order.created_at', '<=', $endDate);
        }

        $statistic = $statistic->limit(10)
            ->offset(0)
            ->get();
        return $statistic;
    }

    public function ratingStatistic($request)
    {
        $startDate = Carbon::now()->format('Y-m-01');
        $endDate = Carbon::now()->endOfMonth()->format('Y-m-d');
        if ($request->date_from) {
            $startDate = Carbon::parse($request->date_from)->format('Y-m-d');
        }
        if ($request->date_to) {
            $endDate = Carbon::parse($request->date_to)->format('Y-m-d');
        }
        $statistic = Product::withCount(
            [
                'reviews AS rating' => function ($query) use ($startDate, $endDate) {
                    $query->select(DB::raw('AVG(rate)'))
                        ->where('reviews.created_at', '>=', $startDate)
                        ->where('reviews.created_at', '<=', $endDate);
                }
            ]
        )
            ->limit(10)
            ->offset(0)
            ->get();
        return $statistic;
    }
}
