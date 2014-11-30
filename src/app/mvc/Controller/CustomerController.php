<?php

class CustomerController extends Controller  {

    /**
     * @return \CustomerController
     */
    public function  __construct(){
        parent::__construct('customer');
        if (!Security::isUserLoggedIn()){
            Helper::redirectTo(WEB.'login');
        }
    }

    /**
     * @return void
     */
    public function findAllAction(){
        if ($this->isAJAX() && $this->isRequestMethod('GET')){
            Session::Start();
            $userId = Session::Get('Id');
            $customer = $this->loadModel('Customer');
            $customers = $customer->FindByColumn(array('userId' => $userId));
            echo json_encode($customers);
        }
    }

    /**
     * @param array $params
     * @return void
     */
    public function createAction($params = []) {
        if ($this->isAJAX() && $this->isRequestMethod('POST')){
            Session::Start();
            $userId = Session::Get('Id');
            $request = json_decode(file_get_contents('php://input'));
            $name = htmlspecialchars($request->{'name'} , ENT_QUOTES);
            $phoneNumber = htmlspecialchars($request->{'phoneNumber'}, ENT_QUOTES);
            $registrationNumber = htmlspecialchars($request->{'registrationNumber'}, ENT_QUOTES);
            $address = htmlspecialchars($request->{'address'}, ENT_QUOTES);
            $customer = $this->loadModel('Customer');
            $customerId = $customer->Save(array(
                    'userId' =>	$userId,
                    'name' => $name,
                    'phoneNumber' => $phoneNumber,
                    'registrationNumber' => $registrationNumber,
                    'address' => $address));
            echo json_encode(array("id" => $customerId));
        }
    }

    /**
     * @return void
     */
    public function updateAction(){
        if ($this->isAJAX() && $this->isRequestMethod('PUT')){
            $request = json_decode(file_get_contents('php://input'));
            $id = htmlspecialchars($request->{'id'} , ENT_QUOTES);
            $name = htmlspecialchars($request->{'name'} , ENT_QUOTES);
            $phoneNumber = htmlspecialchars($request->{'phoneNumber'}, ENT_QUOTES);
            $registrationNumber = htmlspecialchars($request->{'registrationNumber'}, ENT_QUOTES);
            $address = htmlspecialchars($request->{'address'}, ENT_QUOTES);
            $customer = $this->loadModel('Customer');
            $customer->Id = $id;
            $customerId = $customer->Save(array(
                    'name' => $name,
                    'phoneNumber' => $phoneNumber,
                    'registrationNumber' => $registrationNumber,
                    'address' => $address));
            echo json_encode(array("id" => $customerId));
        }
    }

    /**
     * @return void
     */
    public function deleteAction(){
        if ($this->isAJAX() && $this->isRequestMethod('DELETE')){
            $request = json_decode(file_get_contents('php://input'));
            $id = htmlspecialchars($request->{'id'} , ENT_QUOTES);
            $customer = $this->loadModel('Customer');
            $customer->Id = $id;
            $customerId = $customer->Destroy();
            if ($customerId == $customer->Id){
                $person = $this->loadModel('Person');
                $person->DeleteByColumn(array('customerId' => $customerId));
            }
           echo json_encode(array("id" => $customerId));
        }
    }
}