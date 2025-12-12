<?php

use craft\config\GeneralConfig;
use craft\helpers\App;

$isProd = in_array(App::env('CRAFT_ENVIRONMENT'), ['prod', 'live']);
$isLocal = in_array(App::env('CRAFT_ENVIRONMENT'), ['local', 'dev']);

return GeneralConfig::create()
    ->allowAdminChanges(App::env('CRAFT_ALLOW_ADMIN_CHANGES') ?? false)
    ->allowUpdates(App::env('CRAFT_ALLOW_UPDATES') ?? false)
    ->allowedGraphqlOrigins([App::env('PRIMARY_SITE_URL')] ?? false)
    ->convertFilenamesToAscii()
    ->defaultWeekStartDay(1)
    ->defaultDirMode(0774)
    ->defaultFileMode(0664)
    ->defaultTokenDuration('P1W') // 1 week
    ->devMode(App::env('CRAFT_DEV_MODE') ?? false)
    ->disabledUtilities($isLocal ? [] : ['updates', 'find-replace', 'upgrade', 'deprecation-errors', 'migrations', 'system-messages', 'project-config'])
    ->disallowRobots()
    ->enableGraphqlCaching($isProd)
    //->enableCsrfProtection(false)
    //->enableGql(false)
    ->extraFileKinds([
        'jpg-png' => [
            'label' => 'JPG/PNG',
            'extensions' => ['jpg', 'png'],
        ],
        'svg' => [
            'label' => 'SVG',
            'extensions' => ['svg'],
        ]
    ])
    //->enableTemplateCaching($isProd)
    //->errorTemplatePrefix('errors/')
    //->generateTransformsBeforePageLoad()
    ->headlessMode()
    //->imageDriver('gd')
    ->limitAutoSlugsToAscii()
    ->maxUploadFileSize(6291456) // 6mb
    ->maxRevisions(7)
    //->omitScriptNameInUrls()
    //->sanitizeSvgUploads(false)
    ->runQueueAutomatically(App::env('CRAFT_RUN_QUEUE_AUTOMATICALLY') ?? false)
    //->requireUserAgentAndIpForSession(false)
    //->securityKey(App::env('CRAFT_SECURITY_KEY') ?? 'P0yp3rToJd')
    //->testToEmailAddress('leowebguy@gmail.com')
    ->timezone('America/New_York')
    ->useEmailAsUsername()
    ->omitScriptNameInUrls()
    ->preloadSingles()
    ->preventUserEnumeration()
    ->aliases([
        '@webroot' => dirname(__DIR__) . '/web',
        '@preview' => App::env('PRIMARY_SITE_URL'),
    ]);
