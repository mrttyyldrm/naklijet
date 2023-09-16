$("#loading").show();
$(document).ready(function(){
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
                $("#business-content").load("sales.html", function(){
                    $("#loading").fadeOut();
                });
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
            let page = $(this).attr("content");
            $("#loading").fadeIn();

            setTimeout(function(){
                $("#overlay").fadeOut(500);
                $("aside").removeClass("active");
            }, 300);

            setTimeout(function(){
                $("#business-content").load(page + ".html");
            }, 750);
        }
    });

    $("#aside-logout").click(function(){
        localStorage.removeItem("token");
        location.href = "login.html";
    });
});