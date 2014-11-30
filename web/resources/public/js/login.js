$( document ).ready(function() {
    var loginSuccessRoute = $('#loginSuccessRoute').html();
    var form = $('#form');

    form.submit(function( event ) {
        event.preventDefault();
        login();
    });

    function login(){
        $.ajax({
            url: form.attr('action'),
            data: form.serialize(),
            type: form.attr('method'),
            dataType: 'html',
            success: function(data) {
                var result = $.parseJSON(data);
                var success = result.success;
                if (success){
                   console.log('User has logged in.');
                   window.location.replace(loginSuccessRoute);
                }
            },
            error:function(){
                //submit.removeAttr("disabled");
            }
        });
    }
});