console.log('contact grid script is loaded.');

var currentCustomerId = 0;
var contacts_html = "";
var contacts_zero = "";
var personControllerRoute = "";
var currentContactAction = "";
var person = {};

function setPersonControllerRoute(route){
    personControllerRoute = route;
}

function setContactsHTML(tr) {
    contacts_html = tr.html();
    tr.remove();
}

function setContactZeroHTML(tr) {
    contacts_zero = tr.html();
    tr.remove();
}

function removeContactsForm() {
    var add_contact_btn = $('#add-contact');
    add_contact_btn.unbind('click', addContact);
    $('#contacts-'+currentCustomerId).remove();
    currentCustomerId = 0;
}

function addContactsForm(id){
    currentCustomerId = id;
    $('#customer-'+id).after('<tr id="contacts-'+id+'">'+contacts_zero+'</tr>');
    var add_contact_btn = $('#add-contact');
    add_contact_btn.bind('click', addContact);
}

function bindContactsControls(id){
    var contact_td = $('.contact-td', "#contact-"+id);
    var delete_contact_btn = $(".delete", "#contact-"+id);
    var update_contact_btn = $(".update", "#contact-"+id);
    contact_td.bind('click', contactRowClick);
    delete_contact_btn.bind("click", deleteContact);
    update_contact_btn.bind("click", updateContact);
}

function unbindContactsControls(id){
    var contact_td = $('.contact-td', "#contact-"+id);
    var delete_contact_btn = $(".delete", "#contact-"+id);
    var update_contact_btn = $(".update", "#contact-"+id);
    contact_td.unbind('click', contactRowClick);
    delete_contact_btn.unbind("click", deleteContact);
    update_contact_btn.unbind("click", updateContact);
}

function contactRowClick(){
    $('#firstname').val($(this).parent('tr').find("td:eq(0)").html());
    $('#lastname').val($(this).parent('tr').find("td:eq(1)").html());
    $('#birthday').val($(this).parent('tr').find("td:eq(2)").html());
    $('#position').val($(this).parent('tr').find("td:eq(3)").html());
}

function addContact(event){
    event.preventDefault();
    currentContactAction = "addContact";
    var firstname = $('#firstname').val();
    var lastname = $('#lastname').val();
    var birthday = $('#birthday').val();
    var position = $('#position').val();
    person.preUpdate();
    person.setCustomerId(currentCustomerId);
    person.setFirstname(firstname);
    person.setLastname(lastname);
    person.setBirthday(birthday);
    person.setPosition(position);
    if (person.isValid()){
        person.save(onPersonSuccess, onPersonError, onPersonComplete);
    } else {
        currentContactAction = "";
        console.log('Contact add is failed due to following error(s).');
        $.each( person.getErrors(), function( i, error ) {
            console.log(error.msg);
        });
    }
}

function deleteContact(event){
    event.preventDefault();
    currentContactAction = "destroyContact";
    person.setId($(this).attr('href'));
    person.destroy(onPersonSuccess, onPersonError, onPersonComplete);
}

function updateContact(event){
    event.preventDefault();
    currentContactAction = "updateContact";
    var firstname = $('#firstname').val();
    var lastname = $('#lastname').val();
    var birthday = $('#birthday').val();
    var position = $('#position').val();
    person.preUpdate();
    person.setId($(this).attr('href'));
    person.setFirstname(firstname);
    person.setLastname(lastname);
    person.setBirthday(birthday);
    person.setPosition(position);
    if (person.isValid()){
        person.save(onPersonSuccess, onPersonError, onPersonComplete);
    } else {
        currentContactAction = "";
        console.log('Contact update is failed due to following error(s).');
        $.each( person.getErrors(), function( i, error ) {
            console.log(error.msg);
        });
    }
}

function loadContacts(){
    currentContactAction = "loadContacts";
    person = new Person();
    person.preUpdate(); // just in case to clear things;
    person.setController(personControllerRoute);
    person.setId(0);
    person.setCustomerId(currentCustomerId);
    person.fetchAll(onPersonSuccess, onPersonError, onPersonComplete);
}

function onPersonSuccess(returnData, textStatus, jqXHR){
    if (textStatus == "success") {
        var data = $.parseJSON(returnData);
        switch (currentContactAction){
            case 'addContact' :
                person.setId(data.id);
                appendContactRow(
                    person.getId(),
                    person.getFirstname(),
                    person.getLastname(),
                    person.getPosition(),
                    person.getBirthday()
                );
                bindContactsControls(person.getId());
                break;
            case 'loadContacts':
                updateContactsRows(returnData);
                break;
            case 'updateContact' :
                var id = person.getId();
                var contact_tr = $("#contact-"+id);
                contact_tr.find("td:eq(0)").html(person.getFirstname());
                contact_tr.find("td:eq(1)").html(person.getLastname());
                contact_tr.find("td:eq(2)").html(person.getBirthday());
                contact_tr.find("td:eq(3)").html(person.getPosition());
                break;
            case 'destroyContact' :
                unbindContactsControls(person.getId());
                $("#contact-"+person.getId()).remove();
                break;
        }
    }
}

function onPersonError(jqXHR, textStatus, errorThrown){
    console.log(textStatus);
}

function onPersonComplete(){
    currentContactAction = "";
}

function updateContactsRows(returnData){
    var people = $.parseJSON(returnData);
    if (people.length > 0) createContactRows(people);
}

function createContactRows(people){
    $.each( people, function( i, person ) {
        var id = person[0];
        var firstname = person[3];
        var lastname = person[4];
        var position = person[5];
        var birthday = person[6];
        appendContactRow(id, firstname, lastname, position, birthday);
        bindContactsControls(id);
    });
}

function appendContactRow(id, firstname, lastname, position, birthday){
    var new_contact_html = contacts_html.replace('{{update}}', id).
                                         replace('{{delete}}', id).
                                         replace('{{-update-}}', id).
                                         replace('{{-delete-}}', id).
                                         replace('{{firstname}}', firstname).
                                         replace('{{lastname}}', lastname).
                                         replace('{{position}}', position).
                                         replace('{{birthday}}', birthday);
    $('#contacts-0-0').after('<tr id="contact-'+id+'">'+new_contact_html+'</tr>');
}