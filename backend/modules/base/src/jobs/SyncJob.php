<?php

namespace modules\base\jobs;

use Craft;
use craft\helpers\DateTimeHelper;
use craft\helpers\FileHelper;
use craft\queue\BaseJob;
use RuntimeException;
use yii\base\ErrorException;
use yii\base\Exception;

class SyncJob extends BaseJob
{
    /**
     * @return string
     */
    public function defaultDescription(): string
    {
        return 'Propagating...';
    }

    /**
     * @param $queue
     * @return void
     */
    public function execute($queue): void
    {
        try {
            FileHelper::writeToFile(
                dirname(__DIR__, 5) . '/frontend/utils/hmr.js',
                "export const hmr = () => {\r\n   console.info('hmr ~ %c" . substr(DateTimeHelper::currentTimeStamp(), -6) . "', 'color: orange;')\r\n};"
            );
        } catch (ErrorException|Exception $e) {
            Craft::error($e->getMessage(), __METHOD__);
            throw new RuntimeException($e->getMessage());
        }
    }
}
