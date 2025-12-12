<?php

namespace modules\base\services;

use Craft;
use craft\base\Component;
use craft\helpers\App;
use DateTime;
use RuntimeException;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use yii\base\Exception;
use yii\base\InvalidConfigException;

class MailService extends Component
{
    /**
     * @param string $to
     * @param array $data
     * @return void
     * @throws LoaderError
     * @throws RuntimeError
     * @throws SyntaxError
     */
    public function compose(string $to, array $data): void
    {
        try {
            $html = Craft::$app->getView()->renderTemplate('base/mail', ['data' => $data]);
        } catch (Exception $e) {
            Craft::error($e->getMessage(), __METHOD__);
            throw new RuntimeException($e->getMessage());
        }

        try {
            $this->send($html, $data['email'] ?? null, $to);
        } catch (Exception $e) {
            Craft::error($e->getMessage(), __METHOD__);
            throw new RuntimeException($e->getMessage());
        }
    }

    /**
     * @param string $html
     * @param string|null $replyTo
     * @param string $to
     * @return void
     * @throws Exception
     * @throws InvalidConfigException
     */
    private function send(string $html, string|null $replyTo, string $to): void
    {
        $mailer = Craft::$app->getMailer()->compose()
            ->setTo($to)
            ->setBcc(App::env('EMAIL_BCC') ?? null)
            ->setSubject('EMAIL | ' . (new DateTime())->format('m/d/Y H:i'))
            ->setHtmlBody($html);

        if ($replyTo) {
            $mailer->setReplyTo($replyTo);
        }

        $mailer->send();
    }
}
