<?php

class PersonController extends Controller  {

    /**
     * @return \PersonController
     */
    public function  __construct(){
        parent::__construct('person');
        if (!Security::isUserLoggedIn()){
            Helper::redirectTo(WEB.'login');
        }
    }

    /**
     * @return void
     */
    public function findAllAction(){
        if ($this->isAJAX() && $this->isRequestMethod('GET')){
            $customerId = $_GET['customerId'];
            $person = $this->loadModel('Person');
            $people = $person->FindByColumn(array('customerId' => $customerId));
            echo json_encode($people);
        }
    }

    /**
     * @param $params
     * @return void
     */
    public function createAction($params = []) {
        if ($this->isAJAX() && $this->isRequestMethod('POST')){
            Session::Start();
            $userId = Session::Get('Id');
            $request = json_decode(file_get_contents('php://input'));
            $person = $this->loadModel('Person');
            $personId = $person->Save(array(
                'userId'     => $userId,
                'customerId' => htmlspecialchars($request->{'customerId'}, ENT_QUOTES),
                'firstname'  => htmlspecialchars($request->{'firstname'}, ENT_QUOTES),
                'lastname'   => htmlspecialchars($request->{'lastname'}, ENT_QUOTES),
                'position'   => htmlspecialchars($request->{'position'}, ENT_QUOTES),
                'birthday'   => htmlspecialchars($request->{'birthday'}, ENT_QUOTES)
                ));
            echo json_encode(array("id" => $personId));
        }
    }

    /**
     * @return void
     */
    public function updateAction(){
        if ($this->isAJAX() && $this->isRequestMethod('PUT')){
            $request = json_decode(file_get_contents('php://input'));
            $person = $this->loadModel('Person');
            $person->Id = htmlspecialchars($request->{'id'}, ENT_QUOTES);
            $personId = $person->Save(array(
                'firstname' => htmlspecialchars($request->{'firstname'}, ENT_QUOTES),
                'lastname'  => htmlspecialchars($request->{'lastname'}, ENT_QUOTES),
                'position'  => htmlspecialchars($request->{'position'}, ENT_QUOTES),
                'birthday'  => htmlspecialchars($request->{'birthday'}, ENT_QUOTES)
                ));
            echo json_encode(array("id" => $personId));
        }
    }

    /**
     * @return void
     */
    public function deleteAction(){
        if ($this->isAJAX() && $this->isRequestMethod('DELETE')){
            $request = json_decode(file_get_contents('php://input'));
            $id = htmlspecialchars($request->{'id'} , ENT_QUOTES);
            $person = $this->loadModel('Person');
            $person->Id = $id;
            $personId = $person->Destroy();
            echo json_encode(array("id" => $personId));
        }
    }
}