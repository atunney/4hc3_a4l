// https://codepen.io/opensoorce/pen/KQmvdL

$(document).ready(function() {

    $('#submit').click(function(e) {
        e.preventDefault(); // prevent reloading of page

        var validEmail = $('#username').val() === 'admin';
        var validPassword = $('#password').val() === '123';

        if (validEmail === true && validPassword === true) {
            window.location.href = "announcements.html";
        }
        else {
            $('.error').css('display', 'block');
        }
    });
});