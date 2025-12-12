<?php

namespace modules\base;

use Craft;
use craft\base\Element;
use craft\elements\Entry;
use craft\elements\GlobalSet;
use craft\events\RegisterCpNavItemsEvent;
use craft\events\RegisterTemplateRootsEvent;
use craft\events\RegisterUrlRulesEvent;
use craft\helpers\App;
use craft\helpers\Queue;
use craft\web\twig\variables\Cp;
use craft\web\UrlManager;
use craft\web\View;
use modules\base\jobs\SyncJob;
use modules\base\services\MailService;
use yii\base\Event;
use yii\base\ModelEvent;
use yii\base\Module as BaseModule;

class Module extends BaseModule
{
    public static $instance;

    public function init(): void
    {
        parent::init();
        self::$instance = $this;

        Craft::setAlias('@modules/base', $this->getBasePath());

        $this->setComponents([
            'mailService' => MailService::class
        ]);

        // if dev
        if (App::env('CRAFT_ENVIRONMENT') === 'local') {
            $this->registerPropagateSync();
        }

        // if cp
        if (Craft::$app->getRequest()->getIsCpRequest()) {
            //$this->registerCpAssets();
            $this->registerCpTemplates();
            $this->hidePluginStore();
        } else {
            $this->registerSiteRoutes();
        }
    }

    private function registerPropagateSync(): void
    {
        Event::on(
            Element::class,
            Element::EVENT_AFTER_PROPAGATE,
            static function (ModelEvent $event) {
                /** @var Element $e */
                $e = $event->sender;

                if ($e->propagating ||
                    $e->resaving ||
                    $e->getIsDraft() ||
                    $e->getIsRevision()) {
                    return;
                }

                if ($e instanceof Entry || $e instanceof GlobalSet) {
                    Queue::push(new SyncJob());
                }
            }
        );
    }

    //private function registerCpAssets(): void
    //{
    //    Event::on(
    //        View::class,
    //        View::EVENT_BEFORE_RENDER_TEMPLATE,
    //        static function () {
    //            $view = Craft::$app->getView();
    //            $view->registerAssetBundle(Assets::class);
    //        }
    //    );
    //}

    private function registerCpTemplates(): void
    {
        Event::on(
            View::class,
            View::EVENT_REGISTER_CP_TEMPLATE_ROOTS,
            static function (RegisterTemplateRootsEvent $event) {
                $event->roots['base'] = __DIR__ . '/templates';
            }
        );
    }

    private function registerSiteRoutes(): void
    {
        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_SITE_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $event->rules['mail'] = 'base/mail/send';
            }
        );
    }

    private function hidePluginStore(): void
    {
        Event::on(
            Cp::class,
            Cp::EVENT_REGISTER_CP_NAV_ITEMS,
            function (RegisterCpNavItemsEvent $event) {
                unset($event->navItems[array_search('plugin-store', array_column($event->navItems, 'url'))]);
            }
        );
    }
}
