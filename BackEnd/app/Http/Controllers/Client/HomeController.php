<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Services\HomeService;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

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

    protected $homeService;

    public function __construct(HomeService $homeService)
    {
        $this->homeService = $homeService;
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index()
    {
        return $this->homeService->index();
    }

    /**
     * search product.
     *
     * @param Request $request
     * 
     * @return void
     */
    public function search(Request $request)
    {
        return $this->homeService->search($request);
    }

    /**
     * FormFilter product.
     *
     * @param Request $request
     * 
     * @return void
     */
    public function getFormFilter(Request $request)
    {
        return $this->homeService->getFormFilter($request);
    }
}
