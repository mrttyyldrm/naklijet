$(document).ready(function(){
    $.ajax({
        url: "https://api.bsp-academy.com/isLogged",
        type: "GET",
        headers: {
            "Authorization": localStorage.getItem('token')
        },
        success: function(data){
            if(data = "false"){
                location.href = "customer.html";
            }
            else{
                //Ajax Data Request with JWT Token
            }
        },
        error: function(){
            $("#error-title h1").text("Oturum Zaman Aşımına Uğradı");
            $("#error-title p").text("Lütfen tekrar giriş yapınız.");
            $("#error-button a").attr("href", "login.html");
            $("#error-button a").text("Giriş Yap");
            $("#error").fadeIn();
            $("#loading").fadeOut();
        }
    });
});