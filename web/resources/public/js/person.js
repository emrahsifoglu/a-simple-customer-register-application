console.log('Person script is loaded');

function Person () {
    this.id = 0;
}

Person.prototype.controller = "";
Person.prototype.id = 0;
Person.prototype.customerId = 0;
Person.prototype.firstname = "";
Person.prototype.lastname = "";
Person.prototype.position = "";
Person.prototype.birthday = "";
Person.prototype.errors = [];

Person.prototype.setController = function(controller) {
    this.controller = controller;
};

Person.prototype.setCustomerId = function(customerId) {
    if (isNumber(customerId)) this.customerId = customerId;
};

Person.prototype.setId = function(id) {
    if (isNumber(id)) this.id = id;
};

Person.prototype.setFirstname = function(firstname) {
    if (isStringValid(firstname, 5, 15)) this.firstname = firstname;
};

Person.prototype.setLastname = function(lastname) {
    if (isStringValid(lastname, 5, 15)) this.lastname = lastname;
};

Person.prototype.setPosition = function(position) {
    if (isStringValid(position, 2, 200)) this.position = position;
};

Person.prototype.setBirthday = function(birthday) {
    if (isStringValid(birthday, 10,10)) this.birthday = birthday;
};

Person.prototype.getController = function() {
    return this.controller;
};

Person.prototype.getId = function() {
    return this.id;
};

Person.prototype.getCustomerId = function() {
    return this.customerId;
};

Person.prototype.getFirstname = function() {
    return this.firstname;
};

Person.prototype.getLastname = function() {
    return this.lastname;
};

Person.prototype.getPosition = function() {
    return this.position;
};

Person.prototype.getBirthday = function() {
    return this.birthday;
};

Person.prototype.preUpdate = function(){
    this.id = 0;
    this.firstname = "";
    this.lastname = "";
    this.position = "";
    this.birthday = "";
};

Person.prototype.getErrors = function() {
    this.errors = [];
    if (this.controller == "") this.errors.push({name:"controller", msg:"Controller is not valid."});
    if (this.customerId == 0) this.errors.push({name:"customerId", msg:"Customer id is not valid."});
    if (this.firstname == "") this.errors.push({name:"firstname", msg:"Firstname is not valid."});
    if (this.lastname == "") this.errors.push({name:"Lastname", msg:"Lastname number is not valid."});
    if (this.position == "") this.errors.push({name:"position", msg:"Position number is not valid."});
    if (this.birthday == "") this.errors.push({name:"birthday", msg:"Birthday is not valid."});
    return this.errors;
};

Person.prototype.isValid = function() {
    return (this.getErrors().length == 0);
};

Person.prototype.save = function(onSuccess, onError, onComplete){
    var url = '';
    var type = '';
    var data = {
        firstname:this.getFirstname(),
        lastname:this.getLastname(),
        position:this.getPosition(),
        birthday:this.getBirthday()
    };
    if (this.getId() > 0) {
        data['id'] = this.getId();
        url = this.getController()+'update';
        type = 'PUT';
    } else  {
        data['customerId'] = this.getCustomerId();
        url = this.getController()+'create';
        type = 'POST';
    }
    callService(url, JSON.stringify(data), type, 'html', 'application/json; charset=utf-8', onSuccess, onError, onComplete);
};

Person.prototype.destroy = function(onSuccess, onError, onComplete){
    var data = { id:this.getId() };
    callService(this.getController()+'delete', JSON.stringify(data), 'DELETE', 'html', 'application/json; charset=utf-8', onSuccess, onError, onComplete);
};

Person.prototype.fetchAll = function(onSuccess, onError, onComplete){
    callService(this.getController()+"findAll", { customerId:this.getCustomerId() }, 'GET', 'html', 'application/json; charset=utf-8', onSuccess, onError, onComplete);
};

Person.prototype.fetchByWhere = function(data, onSuccess, onError, onComplete){
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