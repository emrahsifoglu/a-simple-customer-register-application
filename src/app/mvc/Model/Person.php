<?php

class Person extends Model {

    /*
    public $UserId;
    public $CustomerId;
    public $Firstname;
    public $Lastname;
    public $Position;
    public $Birthdate;
    */

    /**
     * @return \Person
     */
    public function __construct(){
       parent::__construct('Person', 'people');
    }

} 