<?php

class Helper {

    /**
     * @access public
     * @param $route
     * @return void
     */
    public static function redirectTo($route){
        header("Location: ".$route);
    }

} 