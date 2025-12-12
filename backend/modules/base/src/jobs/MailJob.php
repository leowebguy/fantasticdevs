<?php

namespace modules\base\jobs;

use craft\queue\BaseJob;
use modules\base\Module;
use yii\queue\JobInterface;

class MailJob extends BaseJob implements JobInterface
{
    public string $to;

    public array $data;

    /**
     * @inheritdoc
     */
    public function defaultDescription(): string
    {
        return 'Sending email';
    }

    /**
     * @inheritdoc
     */
    public function execute($queue): void
    {
        Module::$instance->mailService->compose($this->to, $this->data);
    }


}
