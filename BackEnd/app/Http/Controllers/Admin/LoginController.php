<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
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
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = "/admin/home";

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request)
    {
        $user = User::whereHas('info', function ($query) use ($request) {
            $query->where("email", $request->email);
        })
            ->where('status', config('constants.user.status.active'))
            ->first();

        if ($request->isCustomer) {
            $user = Customer::whereHas('info', function ($query) use ($request) {
                $query->where("email", $request->email);
            })->first();
        }

        if (!$user) {
            return response()->json([
                'status' => 'fails',
                'message' => 'Incorrect account or password'
            ], Response::HTTP_UNAUTHORIZED);
        }

        if (!password_verify($request->password, $user->info->password)) {
            return response()->json([
                'status' => 'fails',
                'message' => 'Incorrect account or password'
            ], Response::HTTP_UNAUTHORIZED);
        }
        $info = null;
        if ($request->isCustomer) {
            Auth::guard('customer')->login($user);
            $info = Auth::guard('customer')->user();
        } else {
            Auth::login($user);
            $info = Auth::user();
        }
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;

        if ($request->remember_me) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }

        $token->save();

        return response()->json([
            'status' => 'success',
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString(),
            "info" => $info,
        ], Response::HTTP_OK);
    }

    public function logout(Request $request)
    {
        $accessToken = '';
        if ($request->isCustomer) {
            $accessToken = Auth::guard('customerApi')->user()->token();
        } else {
            $accessToken = Auth::guard('api')->user()->token();
        }
        $accessToken->revoke();
        return response()->json([
            'message' => 'success',
            'code' => Response::HTTP_OK,
        ], Response::HTTP_OK);
    }
}
