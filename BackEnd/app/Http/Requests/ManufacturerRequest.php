<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ManufacturerRequest extends FormRequest
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
        return [
            'manufacturer_code' => 'unique:manufacturer,manufacturer_code,' . $this->id,
            'telephone' => ['nullable', 'unique:manufacturer,telephone,' . $this->id, 'unique:info,telephone'],
        ];
    }
}
