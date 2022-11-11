$(document).ready(function() {

    $('#submit').click(function(e) {
        e.preventDefault(); // prevent reloading of page

        var validEmail = $('#username').val() === 'admin';
        var validPassword = $('#password').val() === '123';

        if (validEmail === true && validPassword === true) {
            // $('.valid').css('display', 'block');
            //window.location = 
            window.location.href = "announcements.html";
        }
        // else if (validEmail === true && validPassword === false) {

        // }
        // else if (validEmail === false && validPassword === true) {

        // }
        else {
            $('.error').css('display', 'block');
        }
    });
});