$(document).ready(function(){
    $("#loading").fadeIn();
    $.ajax({
        url: "https://api.bsp-academy.com/isLogged",
        type: "GET",
        contentType: "application/json",
        headers: {
            "Authorization": "bearer " + localStorage.getItem('token')
        },
        success: function(data){
            if(data == false){
                location.href = "customer.html";
            }
            else{
                //Ajax Data Request with JWT Token
                alert("AJAX Başarıyla Yüklenebilir");
                $("#loading").fadeOut();
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

    $("#header-menu i").click(function(){
        $("aside").toggleClass("active");
        $("#overlay").fadeToggle(500);
    });

    $("#aside-title i").click(function(){
        $("#overlay").fadeOut(500);
        $("aside").removeClass("active");
    });

    $("#aside-menu nav ul li").click(function(){
        if(!$(this).hasClass("active") && !$(this).hasClass("hidden")){
            $("#aside-menu nav ul li").removeClass("active");
            $(this).addClass("active");
        }
    });

    $("#aside-logout").click(function(){
        localStorage.removeItem("token");
        location.href = "login.html";
    });
});