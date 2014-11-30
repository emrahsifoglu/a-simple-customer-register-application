<?php

class Session {

    /**
     * @var bool
     */
	private static $isSessionStart = false;

    /**
     * @access public
     * @return void
     */
	public static function Start(){
		 if(self::$isSessionStart) return;
		 session_start();
		 self::$isSessionStart = true;
	}

    /**
     * @access public
     * @param string $key
     * @param $value
     * @return void
     */
	public static function Set($key, $value){
		 $_SESSION[$key] = $value;
	}

    /**
     * @access public
     * @param string $key
     * @return mixed
     */
	public static function Get($key){
		if (!empty($_SESSION[$key])){
			return $_SESSION[$key];	
		}else{
			return 0;
		}
	}
    /**
     * @access public
     * @return void
     */
	public static function Stop(){
		session_unset();
		session_destroy();
		self::$isSessionStart = false;
	}
}