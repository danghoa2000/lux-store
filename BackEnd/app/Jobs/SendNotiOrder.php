<?php

namespace App\Jobs;

use App\Models\Customer;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendNotiOrder implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $order;
    protected $content;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($order, $content)
    {
        $this->order = $order;
        $this->content = $content;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $user = Customer::where('id', $this->order->customer_id)->first();
        if ($user && $user->info && $user->info->email) {
            Mail::send('emails.OrderMail', ['data' => $this->order, 'content' => $this->content], function ($message) use ($user) {
                $address = $this->order && $this->order->address ? json_decode($this->order->address, true) : '';
                $message->to($user->info->email, $address ? $address['full_name'] : $user->info->full_name)->subject('Elite order ' . $this->order->id);
            });
        }
    }

    /**
     * Handle a job failure.
     *
     * @param  \Throwable  $exception
     * @return void
     */
    public function failed(Throwable $exception)
    {
        Log::error("Error send mail: " . $exception);
    }
}
