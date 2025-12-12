<?php

namespace modules\base\controllers;

use Craft;
use craft\helpers\App;
use craft\helpers\Queue;
use craft\web\Controller;
use modules\base\jobs\MailJob;
use yii\base\Exception;
use yii\web\Response;

class MailController extends Controller
{
    public $enableCsrfValidation = false;

    protected int|bool|array $allowAnonymous = [
        'send'
    ];

    /**
     * @return Response
     * @throws Exception
     */
    public function actionSend(): Response
    {
        $response = Craft::$app->getResponse();

        $response->headers->set('Access-Control-Allow-Origin', App::env('PRIMARY_SITE_URL'));
        $response->headers->set('Access-Control-Allow-Methods', 'POST, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        $post = Craft::$app->request->post();

        // test
        //return $this->asJson([
        //    'post' => $post
        //]);

        $to = App::env('FORM_TO');

        if (!$to) {
            return $this->asJson([
                'success' => false,
                'error' => 'Missing FORM_TO .env'
            ]);
        }

        // adjust payload
        if (isset($post['CRAFT_CSRF_TOKEN'])) {
            unset($post['CRAFT_CSRF_TOKEN']);
        }

        if (isset($post['token'])) {
            unset($post['token']);
        }

        Queue::push(new MailJob([
            'to' => $to,
            'data' => $post
        ]));

        return $this->asJson([
            'success' => true
        ]);
    }
}
