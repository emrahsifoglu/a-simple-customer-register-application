<?php

class LoginController extends Controller {

    /**
     * @return \LoginController
     */
    public function  __construct(){
        parent::__construct('login');
        if (Security::isUserLoggedIn()){
            Helper::redirectTo(WEB.'admin');
        }
    }

    /**
     * @param $params
     * @return void
     */
    public function indexAction($params = []) {
        $this->loadView('Login/index');
    }

    /**
     * @return void
     */
    public function loginAction(){
        if ($this->isAJAX() && $this->isRequestMethod('POST')){
            if(filter_has_var(INPUT_POST, "inputUsername") && filter_has_var(INPUT_POST, "inputPassword")) {
                $return = array('success' => false);
                $username = htmlspecialchars($_POST['inputUsername'], ENT_QUOTES);
                $password = htmlspecialchars($_POST['inputPassword'], ENT_QUOTES);
                $user = $this->loadModel('User');
                $user->Username = $username;
                $user->Password = $password;
                $Id = $user->Validate();
                if ($Id > 0) {
                    Session::Start();
                    Session::Set('Id', $Id);
                    $return = array('success' => true, 'id' => $Id);
                }
                echo json_encode($return);
            }
        } else {
            Helper::redirectTo(WEB.'login');
        }
    }
}

