<?php

class Customer extends Model {

    /*
    public $UserId;
    public $Name;
    public $PhoneNumber;
    public $RegistrationNumber;
    public $Address;
    */

    /**
     * @return \Customer
     */
    public function __construct(){
       parent::__construct('Customer', 'customers');
    }
}