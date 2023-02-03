<?php

namespace App\Http\Requests;

use App\Models\Customer;
use App\Models\Info;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class AccountRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {

        $rules = [
            'email' => 'unique:info,email',
        ];

        if (!$this->isCustomer) {
            $rules = [
                'user_code' => 'unique:users,user_code',
                'telephone' => ['nullable', 'unique:info,telephone', 'unique:manufacturer,telephone'],
            ];
        }
        if ($this->isMethod('put')) {
            $user = User::find($this->id);
            if ($this->isCustomer) {
                $user = Customer::find($this->id);
            } else {
                $rules = [
                    'user_code' => 'unique:users,user_code,' . $this->id,
                    'telephone' => ['nullable', 'unique:info,telephone,' .  $user->info->id, 'unique:manufacturer,telephone,' . $user->info->id],
                ];
            }
            $rules = [
                'email' => 'unique:info,email,' . $user->info->id,
            ];
        }
        return $rules;
    }
}
