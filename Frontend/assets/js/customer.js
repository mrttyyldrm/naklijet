$(document).ready(function(){
    //$("#loading").fadeIn();
    setTimeout(function(){
        $.ajax({
            url: "https://api.bsp-academy.com/isLogged",
            type: "GET",
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            success: function(data){
                if(data = "true"){
                    location.href = "business.html";
                }
                else{
                    //Ajax Data Request with JWT Token
                }
            },
            error: function(){
                // $("#error-title h1").text("Oturum Zaman Aşımına Uğradı");
                // $("#error-title p").text("Panele erişmek için lütfen tekrar giriş yapınız.");
                // $("#error-button a").attr("href", "login.html");
                // $("#error-button a").text("Giriş Yap");
                // $("#error").fadeIn();
                // $("#loading").fadeOut();
            }
        });
    }, 1000);
});