$(document).ready(function(){
    $(".form-input i").click(function(){
        if($(this).hasClass("fa-eye-slash")){
            $(this).removeClass("fa-eye-slash").addClass("fa-eye");
            $(this).siblings("input").attr("type", "text");
        }
        else{
            $(this).removeClass("fa-eye").addClass("fa-eye-slash");
            $(this).siblings("input").attr("type", "password");
        }
    });

    $("#login-form .form-input input").keyup(function(){
        if($("input#username").val() != "" && $("input#password").val() != ""){
            $("button#login").addClass("active");
        }
        else{
            $("button#login").removeClass("active");
        }
    });

    $("button#login").click(function(){
        if($(this).hasClass("active")){
            $("#loading").fadeIn();

            $.ajax({
                url: "https://api.bsp-academy.com/Login",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "userName": $("input#username").val(),
                    "password": $("input#password").val()
                }),
                success: function(data){
                    localStorage.setItem("token", data.token);
                    location.href = "customer.html";
                },
                error: function(){
                    $("#error-title h1").text("Giriş Başarısız");
                    $("#error-title p").text("Kullanıcı adı veya şifre hatalı");
                    $("#error-button a").attr("href","login.html");
                    $("#error").fadeIn();
                    $("#loading").fadeOut();
                    $(".form-input input").val("");
                }
            });
        }
    });

    $("#register-navigation button").click(function(){
        if(!$(this).hasClass("active")){
            $("#register-navigation button").toggleClass("active");
            $("button#register").removeClass("active");
            $("#register-form input").val("");
        }

        if($(this).hasClass("business")){
            $("#register-form .form-row .form-control").hide();
            $("#register-form .form-row .form-control.business").css("display","flex");
        }
        else{
            $("#register-form .form-row .form-control").css("display","flex");
            $("#register-form .form-row .form-control.business").hide();
        }
    });

    $("#register-form .form-input input").keyup(function(){
        if($("#register-navigation button.customer").hasClass("active")){
            if($("input#name").val() != "" && $("input#surname").val() != "" && $("input#username").val() != "" && $("input#email").val() != "" && $("input#password").val() != ""){
                $("button#register").addClass("active");
            }
            else{
                $("button#register").removeClass("active");
            }
        }
        else if($("#register-navigation button.business").hasClass("active")){
            if($("input#business").val() != "" && $("input#username").val() != "" && $("input#email").val() != "" && $("input#password").val() != ""){
                $("button#register").addClass("active");
            }
            else{
                $("button#register").removeClass("active");
            }
        }
    });

    $("button#register").click(function(){
        if($(this).hasClass("active")){
            $("#loading").fadeIn();
            
            if($("#register-navigation button.customer").hasClass("active")){
                $.ajax({
                    url: "https://api.bsp-academy.com/Register",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({
                        "name": $("input#name").val(),
                        "surname": $("input#surname").val(),
                        "userName": $("input#username").val(),
                        "email": $("input#email").val(),
                        "password": $("input#password").val()
                    }),
                    success: function(){
                        $("#success-title h1").text("Kayıt Oluşturuldu");
                        $("#success-title p").text("Hesabınızla panele giriş yapabilirsiniz.");
                        $("#success-button a").attr("href", "login.html");
                        $("#success-button a").text("Giriş Yap");
                        $("#success").fadeIn();
                        $("#loading").fadeOut();
                        $(".form-input input").val("");
                    },
                    error: function(){
                        $("#error-title h1").text("Kayıt Başarısız");
                        $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
                        $("#error").fadeIn();
                        $("#loading").fadeOut();
                        $(".form-input input").val("");
                    }
                });
            }
            else if($("#register-navigation button.business").hasClass("active")){
                $.ajax({
                    url: "https://api.bsp-academy.com/RegisterCompany",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({
                        "companyName": $("input#business").val(),
                        "userName": $("input#username").val(),
                        "email": $("input#email").val(),
                        "password": $("input#password").val()
                    }),
                    success: function(){
                        $("#success-title h1").text("Kayıt Oluşturuldu");
                        $("#success-title p").text("Hesabınızla panele giriş yapabilirsiniz.");
                        $("#success-button a").attr("href", "login.html");
                        $("#success-button a").text("Giriş Yap");
                        $("#success").fadeIn();
                        $("#loading").fadeOut();
                        $(".form-input input").val("");
                    },
                    error: function(){
                        $("#error-title h1").text("Kayıt Başarısız");
                        $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
                        $("#error").fadeIn();
                        $("#loading").fadeOut();
                        $(".form-input input").val("");
                    }
                });
            }
        }
    });
});