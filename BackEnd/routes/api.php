<?php

use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\admin\AttributeController;
use App\Http\Controllers\Admin\CategoriesController;
use App\Http\Controllers\Admin\CouponController;
use App\Http\Controllers\admin\EventController;
use App\Http\Controllers\Admin\GroupCategoryController;
use App\Http\Controllers\Admin\HomeController as AdminHomeController;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\admin\ManufacturerController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\admin\ShippingController;
use App\Http\Controllers\Client\CartController;
use App\Http\Controllers\Client\CustomerController;
use App\Http\Controllers\Client\HomeController;
use App\Http\Controllers\Client\OrderController;
use App\Http\Controllers\DirectionController;
use App\Http\Controllers\UploadController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [LoginController::class, 'login'])->name('login');
    Route::post('logout', [LoginController::class, 'logout'])->name('logout');

    Route::group([
        'middleware' => ['auth:api', 'cors'], 'prefix' => 'admin'
    ], function () {
        Route::get('categories', [CategoriesController::class, 'index'])->name('category');
        Route::post('categories/create', [CategoriesController::class, 'store'])->name('category.create');
        Route::put('categories/update', [CategoriesController::class, 'update'])->name('category.update');
        Route::get('categories/show', [CategoriesController::class, 'show'])->name('category.show');
        Route::delete('categories/delete/{id}', [CategoriesController::class, 'destroy'])->name('category.delete');

        Route::get('account', [AccountController::class, 'index'])->name('account');
        Route::get('account/show', [AccountController::class, 'show'])->name('account.show');
        Route::delete('account/delete/{id}', [AccountController::class, 'destroy'])->name('account.delete');

        Route::get('manufacturer', [ManufacturerController::class, 'index'])->name('manufacturer');
        Route::post('manufacturer/create', [ManufacturerController::class, 'store'])->name('manufacturer.create');
        Route::put('manufacturer/update', [ManufacturerController::class, 'update'])->name('manufacturer.update');
        Route::get('manufacturer/show', [ManufacturerController::class, 'show'])->name('manufacturer.show');
        Route::delete('manufacturer/delete/{id}', [ManufacturerController::class, 'destroy'])->name('manufacturer.delete');

        Route::get('group-category', [GroupCategoryController::class, 'index'])->name('groupCategory');
        Route::post('group-category/create', [GroupCategoryController::class, 'store'])->name('groupCategory.create');
        Route::put('group-category/update', [GroupCategoryController::class, 'update'])->name('groupCategory.update');
        Route::get('group-category/show', [GroupCategoryController::class, 'show'])->name('groupCategory.show');
        Route::delete('group-category/delete/{id}', [GroupCategoryController::class, 'destroy'])->name('groupCategory.delete');
        Route::post('group-category/attribute/create', [GroupCategoryController::class, 'attributeCreate'])->name('groupCategory.attribute.create');
        Route::get('group-category/attribute', [GroupCategoryController::class, 'attribute'])->name('groupCategory.attribute');

        Route::post('attribute/create', [AttributeController::class, 'store'])->name('attribute.store');
        Route::post('attribute/option', [AttributeController::class, 'option'])->name('attribute.option');

        Route::get('shipping', [ShippingController::class, 'index'])->name('shipping');
        Route::post('shipping/create', [ShippingController::class, 'store'])->name('shipping.create');
        Route::put('shipping/update', [ShippingController::class, 'update'])->name('shipping.update');
        Route::get('shipping/show', [ShippingController::class, 'show'])->name('shipping.show');

        Route::post('product/create', [ProductController::class, 'store'])->name('product.create');
        Route::put('product/update', [ProductController::class, 'update'])->name('product.update');
        Route::get('product/show', [ProductController::class, 'show'])->name('product.show');
        Route::delete('product/delete/{id}', [ProductController::class, 'destroy'])->name('product.delete');

        Route::post('product/options', [ProductController::class, 'options'])->name('product.option');
        Route::post('product/attribute', [ProductController::class, 'attribute'])->name('product.attribute');

        Route::get('event', [EventController::class, 'index'])->name('event');
        Route::put('event/update', [EventController::class, 'update'])->name('event.update');
        Route::post('statistic', [AdminHomeController::class, 'index'])->name('statistic');

        Route::get('order', [OrderController::class, 'index'])->name('admin.order');
        Route::post('order/create', [OrderController::class, 'store'])->name('admin.order.create');
        Route::put('order/update', [OrderController::class, 'update'])->name('admin.order.update');
        Route::get('order/show', [OrderController::class, 'show'])->name('order.show');
        Route::delete('order/delete/{id}', [OrderController::class, 'destroy'])->name('admin.order.delete');

        Route::get('coupon', [CouponController::class, 'index'])->name('coupon');
        Route::post('coupon/create', [CouponController::class, 'store'])->name('coupon.create');
        Route::put('coupon/update', [CouponController::class, 'update'])->name('coupon.update');
        Route::get('coupon/show', [CouponController::class, 'show'])->name('coupon.show');
        Route::delete('coupon/delete/{id}', [ManufacturerController::class, 'destroy'])->name('coupon.delete');
    });
});
Route::get('auth/admin/coupon/check-valid', [CouponController::class, 'checkValid'])->name('coupon.checkValid');
Route::post('auth/admin/account/create', [AccountController::class, 'store'])->name('account.create');
Route::put('auth/admin/account/update', [AccountController::class, 'update'])->name('account.update');

Route::group([
    'middleware' => ['cors']
], function () {
    Route::post('upload', [UploadController::class, 'upload']);
    Route::get('get-province', [DirectionController::class, 'getProvince']);
    Route::get('get-district/{provinceId}', [DirectionController::class, 'getDistrict']);
    Route::get('get-commune/{districtId}', [DirectionController::class, 'getCommune']);

    Route::get('home', [HomeController::class, 'index'])->name('home');
    Route::get('search', [HomeController::class, 'search'])->name('search');
    Route::get('getFormFilter', [HomeController::class, 'getFormFilter'])->name('formSearch');
    Route::get('auth/admin/product', [ProductController::class, 'index'])->name('product');
    Route::get('auth/admin/top-group-category', [GroupCategoryController::class, 'topGroupCategory'])->name('topGroupCategory');
    Route::get('auth/admin/group-category', [GroupCategoryController::class, 'index'])->name('groupCategory');
    Route::get('cart', [CartController::class, 'index'])->name('cart');

    Route::get('auth/admin/product/show', [ProductController::class, 'show'])->name('product.show');

    Route::group([
        'middleware' => ['auth:customerApi']
    ], function () {
        Route::post('cart/create', [CartController::class, 'store'])->name('cart.create');
        Route::put('cart/update', [CartController::class, 'update'])->name('cart.update');
        Route::get('cart/show', [CartController::class, 'show'])->name('cart.show');
        Route::delete('cart/delete/{id}', [CartController::class, 'destroy'])->name('cart.delete');

        Route::get('customer-address', [CustomerController::class, 'getAddress'])->name('customer-address.show');
        Route::post('customer-address/create', [CustomerController::class, 'storeAddress'])->name('customer-address.create');
        Route::put('customer-address/update', [CustomerController::class, 'updateAddress'])->name('customer-address.update');
        // Route::get('customer-address/show', [CustomerController::class, 'show'])->name('customer-address.show');
        Route::delete('customer-address/delete/{id}', [CustomerController::class, 'destroy'])->name('customer-address.delete');
        Route::post('customer-address/set-default', [CustomerController::class, 'updateAddressSelected'])->name('customer-address.set-default');
        Route::post('customer/show', [CustomerController::class, 'show'])->name('customer.show');
        Route::get('customer/getOrder', [CustomerController::class, 'getOrder'])->name('customer.order');

        Route::get('order', [OrderController::class, 'index'])->name('order');
        Route::post('order/create', [OrderController::class, 'store'])->name('order.create');
        Route::put('order/update', [OrderController::class, 'update'])->name('order.update');
        Route::get('order/show', [OrderController::class, 'show'])->name('order.show');
        Route::delete('order/delete/{id}', [OrderController::class, 'destroy'])->name('order.delete');
    
        Route::post('product/review', [ProductController::class, 'review'])->name('product.review');
        Route::post('product/review/show', [ProductController::class, 'reviewShow'])->name('product.review.show');
    });
});
