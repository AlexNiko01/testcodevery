;
(function ($) {
    $(document).ready(function () {
        $('input[type=file]').on('change', function () {
            var val = $(this).val();
            var info_container = $('.contact-form__attachment-input');
            if (info_container.length > 0) {
                if (!info_container.data('placeholder')) {
                    info_container.data('placeholder', info_container.text());
                }
                if (val.length > 0) {
                    var file_parts = val.split('\\');
                    info_container.text(file_parts[file_parts.length - 1]);

                } else {
                    info_container.text(info_container.data('placeholder'));
                }
            }
        });
        $('.contact-form').on('submit', function (e) {
            e.preventDefault();
            var inputFirstname = $("input[name='firstname']");
            var firstname = inputFirstname.val();
            var haveErrors = false;

            if (firstname.length > 0) {
                inputFirstname.next('.with-errors').html('');

            } else {
                inputFirstname.next('.with-errors').html('Firstname is required.');
                haveErrors = true;
            }

            var inputLastname = $("input[name='lastname']");
            var lastname = inputLastname.val();

            if (lastname.length > 0) {
                inputLastname.next('.with-errors').html('');

            } else {
                inputLastname.next('.with-errors').html('Lastname is required.');
                haveErrors = true;
            }
            var inputEmail = $("input[name='email']");
            var email = inputEmail.val();
            if (email.length > 0) {
                if (validateEmail(email)) {
                    inputEmail.next('.with-errors').html('');
                } else {
                    inputEmail.next('.with-errors').html("Valid email is required.");
                    haveErrors = true;
                }
            } else {
                inputEmail.next('.with-errors').html("Email is required.");
                haveErrors = true;
            }

            var inputPhone = $("input[name='phone']");
            var phone = inputPhone.val();
            if (phone.length > 0) {
                if (validatePhone(phone)) {
                    inputPhone.next('.with-errors').html('');

                } else {
                    inputPhone.next('.with-errors').html('Valid phone is required.');
                    haveErrors = true;

                }
            } else {
                inputPhone.next('.with-errors').html("Phone is required.");
                haveErrors = true;
            }

            var inputMessage = $("textarea[name='message']");
            var message = inputMessage.val();
            if (message.length > 0) {
                inputMessage.next('.with-errors').html('');
            } else {
                inputMessage.next('.with-errors').html('Message is required.');
                haveErrors = true;
            }

            if (!haveErrors) {
                var url = $(this).attr('action');
                var method_val = $(this).attr('method');
                sendAjax(url, method_val, this)

            }
        });
    });

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function validatePhone(phone) {
        var re = /^\d[\d\(\)\-]{4,14}\d$/;
        return re.test(phone);
    }

    function sendAjax(url, method_val, form) {
        $.ajax({
            url: '/' + url,
            dataType: "json",
            method: method_val,
            data: new FormData(form),
            processData: false,
            contentType: false,
            success: function (result) {
                var res = '<div class="single-comment"><div class="row"><div class="col-md-1"><div class="single-comment__id">'
                    + result.id +
                    ' </div></div><div class="col-md-2  single-comment__date"><h5 class="single-comment__title">DATE:</h5><time>'
                    + result.date +
                    '</time><h5 class="single-comment__title">COMMENTS:</h5></div><div class="col-md-9"><div class="single-comment__name"><span>AUTHOR: </span>'
                    + result.firstname + ' ' + result.lastname + '</div>' +
                    '<div class="single-comment__content">' + result.message + '</div>' +
                    '</div>' +
                    '</div>';

                $('.comments .container').prepend(res);

                $("input[name='firstname']").val('');
                $("input[name='lastname']").val('');
                $("input[name='phone']").val('');
                $("input[name='email']").val('');
                $("textarea[name='message']").val('');
                $("input[name='file']").val('');
            }
        });
    }
})
(jQuery);
