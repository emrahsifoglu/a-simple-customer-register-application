<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

define('ROOT', str_replace("web","", dirname($_SERVER['PHP_SELF'])));
define('WEB', ROOT.'web/');
define('SRC', ROOT.'src/');
define('RESOURCES', WEB.'resources/');
define('STYLES', RESOURCES.'public/css/');
define('SCRIPTS', RESOURCES.'public/js/');
define('IMAGES', RESOURCES.'public/images/');

//define('BASE_PATH', dirname(realpath(__FILE__)));
define('ROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
define('SRC_PATH', ROOT_PATH.SRC);
define('WEB_PATH', ROOT_PATH.WEB);
define('APP_PATH', SRC_PATH.'app/');
define('CORE_PATH', APP_PATH.'core/');
define('CONTROLLER_PATH', APP_PATH.'mvc/Controller/');
define('MODEL_PATH', APP_PATH.'mvc/Model/');
define('VIEW_PATH', APP_PATH.'mvc/View/');
define('LAYOUT', WEB_PATH.'resources/views/layout.php');

define ("DB_CONN_PARAMS", serialize (array(
    'host' => 'localhost',
    'username' => 'root',
    'password' => '',
    'db' => 'ascra'
)));