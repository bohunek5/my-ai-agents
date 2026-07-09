<?php


namespace Nextend\SmartSlider3Pro\Application\Admin\Sliders;


use Nextend\SmartSlider3\Application\Admin\Sliders\ControllerAjaxSliders;
use Nextend\SmartSlider3\Application\Model\ModelSliders;

class PluggedControllerAjaxSliders {

    /** @var ControllerAjaxSliders */
    protected $controller;

    public function __construct($controller) {
        $this->controller = $controller;

        $this->controller->addExternalAction('listGroups', array(
            $this,
            'actionListGroups'
        ));
    }

    public function actionListGroups() {
        $this->controller->validateToken();

        $slidersModel = new ModelSliders($this->controller);
        $result       = $slidersModel->getGroups();

        $data = array();
        foreach ($result AS $r) {
            $data[$r['id']] = $r['title'];
        }

        $this->controller->getResponse()
                         ->respond($data);
    }
}