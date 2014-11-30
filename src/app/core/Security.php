<?php

class Security {

    /**
     * @access public
     * @return bool
     */
    public static function isUserLoggedIn(){
        Session::Start();
        return (Session::Get('Id') == 0) ? false : true;
    }

}