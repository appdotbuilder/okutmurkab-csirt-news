<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'content' => 'required|string|min:10|max:1000',
        ];

        // If user is not authenticated, require name and email
        if (!auth()->check()) {
            $rules['author_name'] = 'required|string|max:100';
            $rules['author_email'] = 'required|email|max:255';
        }

        return $rules;
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'content.required' => 'Please enter your comment.',
            'content.min' => 'Comment must be at least 10 characters long.',
            'content.max' => 'Comment cannot exceed 1000 characters.',
            'author_name.required' => 'Please enter your name.',
            'author_email.required' => 'Please enter your email address.',
            'author_email.email' => 'Please enter a valid email address.',
        ];
    }
}