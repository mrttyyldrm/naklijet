var user;

$(document).ready(function () {
    if (window.location.pathname.split("/").pop() == "customer.html") {
        page = "customer";
    }
    else if (window.location.pathname.split("/").pop() == "business.html") {
        page = "business";
    }

    $.ajax({
        url: "https://api.bsp-academy.com/Message/GetMyMessage",
        type: "GET",
        headers: {
            "Authorization": "bearer " + localStorage.getItem('token')
        },
        success: function (chats) {
            let comid;
            let page;

            if (window.location.pathname.split("/").pop() == "customer.html") {
                page = "customer";
            }
            else if (window.location.pathname.split("/").pop() == "business.html") {
                page = "business";
            }
            if (chats.length == 0){
                $("#messages-chats .chat").remove();
            }
            else{
                $.each(chats, function (i, chat) {
                    if (i == 0) {
                        $(".chat").attr("data", chat.fromId);
                        $(".chat").find("h2").text("@" + chat.from.userName);
                    }
                    else {
                        var newChat = $(".chat").first().clone();
    
                        newChat.attr("data", chat.fromId);
                        newChat.find("h2").text("@" + chat.from.userName);
    
                        $("#messages-chats").append("<hr>");
                        $("#messages-chats").append(newChat);
                    }
    
                    $(".chat").click(function () {
                        comid = $(this).attr("data");
                        user = $(this).children(".chat-info").children("h2").text();
    
                        if (!$(this).hasClass("active")) {
                            $(this).siblings(".chat").removeClass("active");
                            $(this).addClass("active");
                            $("#loading").fadeIn();
    
                            $("section#" + page).addClass("fixed");
                            $("#" + page + "-content").load("chat.html", function () {
                                $("#chat-title h1").text(user);
                                getMessages(comid, function(){
                                    setMessages();
                                });
                                startGetMessages(comid, function(){
                                    setMessages();
                                });
    
                                $("#send").click(function () {
                                    if ($(this).siblings("textarea").val() != "") {
                                        $("#chat-content").append(`<div class="message outgoing"><p>${$("#chat-send textarea").val()}</p><span>${new Date().getHours()}:${new Date().getMinutes()}</span></div>`);
                                        $("#chat-content").animate({
                                            scrollTop: $(
                                                '#chat-content').get(0).scrollHeight
                                        }, 0);
                                        if ($(this).children("textarea").val() != "") {
                                            $.ajax({
                                                url: "https://api.bsp-academy.com/Message",
                                                type: "POST",
                                                contentType: "application/json",
                                                headers: {
                                                    "Authorization": "bearer " + localStorage.getItem('token')
                                                },
                                                data: JSON.stringify({
                                                    "content": $("#chat-send textarea").val(),
                                                    "toId": comid,
                                                }),
                                                success: function () {
                                                },
                                                error: function () {
                                                    $("#error-title h1").text("Hata");
                                                    $("#error-title p").text("Bir şeyler yanlış gitti. Lütfen daha sonra tekrar deneyiniz.");
                                                    $("#error-button a").attr("href", page + ".html");
                                                    $("#error-button a").text("Panele Dön");
                                                    $("#error").fadeIn();
                                                    $("#loading").fadeOut();
                                                }
                                            });
                                            $(this).siblings("textarea").val("");
                                        }
                                    }
                                });
                            });
                        }
                    })
                });
            }
            $("#loading").fadeOut();
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
});

function setMessages() {
    $("#chat-content .message").not("#chat-content .message:first-child").remove();
    $.each(data, function (i, message) {
        if (i == 0) {
            if (message.situation == "incoming") {
                $(".message").addClass("incoming");
                $(".message").removeClass("outgoing");
            }
            else if (message.situation == "outgoing") {
                $(".message").addClass("outgoing");
                $(".message").removeClass("incoming");
            }
            $(".message").find("p").text(message.text);
            $(".message").find("span").text(message.date.substring(11, 16));
        }
        else {
            var newMessage = $(".message").first().clone();

            if (message.situation == "incoming") {
                newMessage.addClass("incoming");
                newMessage.removeClass("outgoing");
            }
            else if (message.situation == "outgoing") {
                newMessage.addClass("outgoing");
                newMessage.removeClass("incoming");
            }
            newMessage.find("p").text(message.text);
            newMessage.find("span").text(message.date.substring(11, 16));

            $("#chat-content").append(newMessage);
        }
    });

    $("#chat-content").animate({
        scrollTop: $(
            '#chat-content').get(0).scrollHeight
    }, 0);
    $("#loading").fadeOut();
}