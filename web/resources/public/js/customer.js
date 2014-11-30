console.log('Customer script is loaded');

function Customer () {
    this.id = 0;
}

Customer.prototype.controller = "";
Customer.prototype.id = 0;
Customer.prototype.name = "";
Customer.prototype.phoneNumber = "";
Customer.prototype.registrationNumber = "";
Customer.prototype.address = "";
Customer.prototype.errors = [];

Customer.prototype.setController = function(controller) {
    this.controller = controller;
};

Customer.prototype.setId = function(id) {
    if (isNumber(id)) this.id = id;
};

Customer.prototype.setName = function(name) {
    if (isStringValid(name, 5, 15)) this.name = name;
};

Customer.prototype.setPhoneNumber = function(phoneNumber) {
    if (isPhoneNumberValid(phoneNumber)) this.phoneNumber = phoneNumber;
};

Customer.prototype.setRegistrationNumber = function(registrationNumber) {
    if (isStringValid(registrationNumber, 5, 20)) this.registrationNumber = registrationNumber;
};

Customer.prototype.setAddress = function(address) {
    if (isStringValid(address, 2, 200)) this.address = address;
};

Customer.prototype.getController = function() {
    return this.controller;
};

Customer.prototype.getId = function() {
    return this.id;
};

Customer.prototype.getName = function() {
    return this.name;
};

Customer.prototype.getPhoneNumber = function() {
    return this.phoneNumber;
};

Customer.prototype.getRegistrationNumber = function() {
    return this.registrationNumber;
};

Customer.prototype.getAddress = function() {
    return this.address;
};

Customer.prototype.preUpdate = function(){
    this.id = 0;
    this.name = "";
    this.phoneNumber = "";
    this.registrationNumber = "";
    this.address = "";
};

Customer.prototype.getErrors = function() {
    this.errors = [];
    if (this.controller == "") this.errors.push({name:"controller", msg:"Controller is not valid."});
    if (this.name == "") this.errors.push({name:"name", msg:"Name is not valid."});
    if (this.phoneNumber == 0) this.errors.push({name:"phoneNumber", msg:"Phone number is not valid."});
    if (this.registrationNumber == "") this.errors.push({name:"registrationNumber", msg:"Registration number is not valid."});
    if (this.address == "") this.errors.push({name:"address", msg:"Address is not valid."});
    return this.errors;
};

Customer.prototype.isValid = function() {
    return (this.getErrors().length == 0);
};

Customer.prototype.save = function(onSuccess, onError, onComplete){
    var url = '';
    var type = '';
    var data = { name:this.getName(),
                 phoneNumber:this.getPhoneNumber(),
                 registrationNumber:this.getRegistrationNumber(),
                 address:this.getAddress()
                };
    if (this.getId() > 0) {
        data['id'] = this.getId();
        url = this.getController()+'update';
        type = 'PUT';
    } else  {
        url = this.getController()+'create';
        type = 'POST';
    }
    callService(url, JSON.stringify(data), type, 'html', 'application/json; charset=utf-8', onSuccess, onError, onComplete);
};

Customer.prototype.destroy = function(onSuccess, onError, onComplete){
    var data = { id:this.getId() };
    callService(this.getController()+'delete', JSON.stringify(data), 'DELETE', 'html', 'application/json; charset=utf-8', onSuccess, onError, onComplete);
};

Customer.prototype.fetchAll = function(onSuccess, onError, onComplete){
    callService(this.getController()+'findAll', '', 'GET', 'html', 'application/json; charset=utf-8', onSuccess, onError, onComplete);
};

Customer.prototype.fetchByWhere = function(data, onSuccess, onError, onComplete){
    callService(this.getController(), data, 'GET', 'html', 'application/json; charset=utf-8', onSuccess, onError, onComplete);
};

function callService(url, data, type, dataType, contentType, onSuccess, onError, onComplete){
    $.ajax({
        type: type,
        dataType: dataType,
        url: url,
        contentType: contentType,
        data : data,
        success: function (data, textStatus, jqXHR) {
            onSuccess(data, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            onError(jqXHR, textStatus, errorThrown);
        },
        complete: function(){
            onComplete();
        }
    });
}