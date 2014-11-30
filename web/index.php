<?php
define ('DIR', str_replace('//','/',dirname(__FILE__).'/'));

$config_file = '../src/config.php';
$init_file = '../src/init.php';

require_once DIR.$config_file;
require_once DIR.$init_file;

$app = new App();
$app->addRoute('login', 'Login', false);
$app->addRoute('admin', 'Admin', true);
$app->addRoute('customer', 'Customer', true);
$app->addRoute('person', 'Person', true);
$app->addRoute('logout', 'Logout', false);
$app->run();