<?php

class AdminController extends Controller  {

    /**
     * @return \AdminController
     */
    public function  __construct(){
        parent::__construct('admin');
        if (!Security::isUserLoggedIn()){
            Helper::redirectTo(WEB.'login');
        }
    }

    /**
     * @param $params
     * @return void
     */
    public function indexAction($params = []) {
        $this->loadView('Admin/index');
    }
} 