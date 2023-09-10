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
                data: {
                    "userName": $("input#username").val(),
                    "password": $("input#password").val()
                },
                success: function(data){
                    
                },
                error: function(){

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

        if($(this).hasClass("company")){
            $("#register-form .form-row .form-control").hide();
            $("#register-form .form-row .form-control.company").css("display","flex");
        }
        else{
            $("#register-form .form-row .form-control").css("display","flex");
            $("#register-form .form-row .form-control.company").hide();
        }
    });

    $("#register-form .form-input input").keyup(function(){
        if($("#register-navigation button.singular").hasClass("active")){
            if($("input#name").val() != "" && $("input#surname").val() != "" && $("input#username").val() != "" && $("input#email").val() != "" && $("input#password").val() != ""){
                $("button#register").addClass("active");
            }
            else{
                $("button#register").removeClass("active");
            }
        }
        else if($("#register-navigation button.company").hasClass("active")){
            if($("input#company").val() != "" && $("input#username").val() != "" && $("input#email").val() != "" && $("input#password").val() != ""){
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
            
            if($("#register-navigation button.singular").hasClass("active")){
                $.ajax({
                    url: "https://api.bsp-academy.com/Register",
                    type: "POST",
                    data: {
                        "name": $("input#name").val(),
                        "surname": $("input#surname").val(),
                        "userName": $("input#username").val(),
                        "email": $("input#email").val(),
                        "password": $("input#password").val()
                    },
                    success: function(data){
                        
                    },
                    error: function(){
    
                    }
                });
            }
            else if($("#register-navigation button.company").hasClass("active")){
                $.ajax({
                    url: "https://api.bsp-academy.com/RegisterCompany",
                    type: "POST",
                    data: {
                        "companyName": $("input#company").val(),
                        "userName": $("input#username").val(),
                        "email": $("input#email").val(),
                        "password": $("input#password").val()
                    },
                    success: function(data){
                        
                    },
                    error: function(){
    
                    }
                });
            }
        }
    });
});