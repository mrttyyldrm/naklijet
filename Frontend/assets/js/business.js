var data;

function getMessages(comid, event){
    $.ajax({
        url: "https://api.bsp-academy.com/Message?comid=" + comid,
        type: "GET",
        headers: {
            "Authorization": "bearer " + localStorage.getItem('token')
        },
        success: function (messages) {
            data = messages;
            event();
        },
        error: function () {
            $("#error-title h1").text("Mesajlar Yüklenemedi");
            $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
            $("#error-button a").attr("href", page + ".html");
            $("#error-button a").text("Panele Dön");
            $("#error").fadeIn();
            $("#loading").fadeOut();
        }
    });
}

var interval;
function startGetMessages(comid, event){
    interval = setInterval(function(){
        getMessages(comid, event);
    }, 5000);
}

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
                $("#business-content").load("sales.html");
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
                clearInterval(interval);
                $("#business-content").load(page + ".html");
                $("section#business").removeClass("fixed");
            }, 750);
        }
    });

    $("#aside-logout").click(function(){
        localStorage.removeItem("token");
        location.href = "login.html";
    });
});