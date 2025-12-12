<?php

namespace modules\base\assets;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class Assets extends AssetBundle
{
    public function init(): void
    {
        $this->sourcePath = '@modules/base/assets';
        $this->depends = [CpAsset::class];

        $this->css = ['css/cp.css'];

        parent::init();
    }
}
