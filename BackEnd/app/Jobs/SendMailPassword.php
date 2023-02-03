<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendMailPassword implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $info;
    protected $auth;
    protected $password;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($info, $auth, $password)
    {
        $this->info  = $info;
        $this->auth  = $auth;
        $this->password  = $password;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::send('emails.BacancyMail', ['name' => $this->info->full_name, 'password' => $this->password], function ($message) {
            $message->to($this->info->email, $this->info->full_name)->subject('Elite Comfirm password');
            $message->from($this->auth->info->email, $this->auth->info->full_name);
        });
    }

    /**
     * Handle a job failure.
     *
     * @param  \Throwable  $exception
     * @return void
     */
    public function failed(Throwable $exception)
    {
        Log::error("Error send mail: " .$exception);
    }
}
