$(document).ready(function() {
    console.log('admin script is loaded.');

    var customer_name = $('#customer-name');
    var customer_pn = $('#customer-phone-number');
    var customer_rn = $('#customer-registration-number');
    var countries = $('#countries');
    var add_customer_btn = $('#add-customer');
    var controllerRoute = $('#controllerRoute').val();
    var customer_tr = $('#customer-tr');
    var contacts_tr = $('#contacts-tr');
    var contacts_zero = $("#contacts-0");
    var customer_zero = $("#customer-0");
    var customer_html = "";
    var currentAction = "";
    var customer = new Customer();

    add_customer_btn.click(function(event) {
        event.preventDefault();
        currentAction = "add";
        customer.preUpdate();
        customer.setName($.trim(customer_name.val()));
        customer.setPhoneNumber($.trim(customer_pn.val()));
        customer.setRegistrationNumber($.trim(customer_rn.val()));
        customer.setAddress($.trim(countries.val()));
        if (customer.isValid()){
            customer.save(onSuccess, onError, onComplete);
        } else {
            currentAction = "";
            console.log('add customer is failed due to following error(s).');
            $.each( customer.getErrors(), function( i, error ) {
               console.log(error.msg);
            });
        }
    });

    function updateCustomer(event) {
        event.preventDefault();
        currentAction = "update";
        customer.preUpdate();
        customer.setId($(this).attr('href'));
        customer.setName($.trim(customer_name.val()));
        customer.setPhoneNumber($.trim(customer_pn.val()));
        customer.setRegistrationNumber($.trim(customer_rn.val()));
        customer.setAddress($.trim(countries.val()));
        if (customer.isValid()){
            customer.save(onSuccess, onError, onComplete);
        } else {
            currentAction = "";
            console.log('update customer is failed due to following error(s).');
            $.each( customer.getErrors(), function( i, error ) {
                console.log(error.msg);
            });
        }
    }

    function toggleContactsForm(event){
        event.preventDefault();
        var id = $(this).attr('href');
        if (currentCustomerId == id ) {
            removeContactsForm();
        } else {
            if (currentCustomerId > 0) {
                removeContactsForm();
            }
            addContactsForm(id);
            loadContacts();
        }
    }

    function customerRowClick(){
        customer_name.val($(this).parent('tr').find("td:eq(0)").html());
        customer_pn.val($(this).parent('tr').find("td:eq(1)").html());
        customer_rn.val($(this).parent('tr').find("td:eq(2)").html());
        var cc = $(this).parent('tr').find("td:eq(3)").html();
        $.each(isoCountries, function(iso, option) {
            if (option == cc) {
                countries.val(iso);
                return false;
            }
            return true;
        });
    }

    function deleteCustomer(event) {
        event.preventDefault();
        currentAction = "destroy";
        customer.setId($(this).attr('href'));
        customer.destroy(onSuccess, onError, onComplete);
    }

    function onSuccess(returnData, textStatus, jqXHR){
        if (textStatus == "success") {
            var data = $.parseJSON(returnData);
            switch (currentAction){
                case 'add' :
                    customer.setId(data.id);
                    appendRow(
                        customer.getId(),
                        customer.getName(),
                        customer.getPhoneNumber(),
                        customer.getRegistrationNumber(),
                        getCountryName(customer.getAddress())
                    );
                    bindCustomerControls(customer.getId());
                    break;
                case 'update' :
                    var id = customer.getId();
                    customer_tr = $("#customer-"+id);
                    customer_tr.find("td:eq(0)").html(customer.getName());
                    customer_tr.find("td:eq(1)").html(customer.getPhoneNumber());
                    customer_tr.find("td:eq(2)").html(customer.getRegistrationNumber());
                    customer_tr.find("td:eq(3)").html(getCountryName(customer.getAddress()));
                    break;
                case 'destroy' :
                    unbindCustomerControls(customer.getId());
                    if (currentCustomerId == customer.getId()) removeContactsForm();
                    $("#customer-"+customer.getId()).remove();
                    break;
                case 'load' :
                    updateRows(returnData);
                    break;

            }
            console.log(currentAction + " is " + textStatus);
        }
    }

    function onError(jqXHR, textStatus, errorThrown){
        console.log(textStatus);
        console.log(errorThrown);
    }

    function onComplete(){
        currentAction = "";
    }

    function bindCustomerControls(id){
        var customer_td = $('.customer-td', "#customer-"+id);
        var delete_customer_btn = $(".delete", "#customer-"+id);
        var contact_customer_btn = $(".contact", "#customer-"+id);
        var update_customer_btn = $(".update", "#customer-"+id);
        customer_td.bind("click", customerRowClick);
        delete_customer_btn.bind("click", deleteCustomer);
        update_customer_btn.bind("click", updateCustomer);
        contact_customer_btn.bind("click", toggleContactsForm);
    }

    function unbindCustomerControls(id){
        var customer_td = $('.customer-td', "#customer-"+id);
        var delete_customer_btn = $(".delete", "#customer-"+id);
        var contact_customer_btn = $(".contact", "#customer-"+id);
        var update_customer_btn = $(".update", "#customer-"+id);
        customer_td.unbind("click", customerRowClick);
        delete_customer_btn.unbind("click", deleteCustomer);
        update_customer_btn.unbind("click", updateCustomer);
        contact_customer_btn.unbind("click", toggleContactsForm);
    }

    function updateRows(returnData){
        var customers = $.parseJSON(returnData);
        if (customers.length > 0) createRows(customers);
    }

    function createRows(customers){
        $.each( customers, function( i, customer ) {
            var id = customer[0];
            var name = customer[2];
            var pn = customer[3];
            var rn = customer[4];
            var address = getCountryName(customer[5]);
            appendRow(id, name, pn, rn, address);
            bindCustomerControls(id);
        });
    }

    function appendRow(id, name, pn, rn, address){
        var new_customer_html  = customer_html.replace('{{update}}', id).
                                               replace('{{delete}}', id).
                                               replace('{{contact}}', id).
                                               replace('{{-update-}}', id).
                                               replace('{{-delete-}}', id).
                                               replace('{{-contact-}}', id).
                                               replace('{{name}}', name).
                                               replace('{{pn}}', pn).
                                               replace('{{rn}}', rn).
                                               replace('{{address}}', address);
        customer_zero.after('<tr id="customer-'+id+'">'+new_customer_html+'</tr>');
    }

    function setCustomerHTML(tr){
        customer_html = tr.html();
        tr.remove();
    }

    function loadCustomers(){
        currentAction = "load";
        customer.fetchAll(onSuccess, onError, onComplete);
    }

    function initAdmin(){
        $.each(isoCountries, function(iso, option) {
            countries.append($('<option/>').attr("value", iso).text(option));
        });
        customer.setController(controllerRoute+'customer/');
        setPersonControllerRoute(controllerRoute+'person/');
        setCustomerHTML(customer_tr); // store html to use as a template
        setContactsHTML(contacts_tr); // store html to use as a template
        setContactZeroHTML(contacts_zero); // store html to use as a template
    }

    initAdmin();
    loadCustomers();
});