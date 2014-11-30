<?php

class View  {

    protected $name;

    /**
     * @access public
     * @param string $name
     * @return \View
     */
    public function __construct($name){
        $this->name = $name;
    }

} 