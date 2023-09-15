let comid;

$.ajax({
    url: "https://api.bsp-academy.com/Message/GetMyMessage",
    type: "GET",
    headers: {
        "Authorization": "bearer " + localStorage.getItem('token')
    },
    success: function (chats) {
        $("#loading").fadeOut();
        $.each(chats, function (i, chat) {
            if (i == 0) {
                $(".chat").attr("data", chat.fromId);
                $(".chat").find("h2").text(chat.from.name + " " + chat.from.surname);
                if (chat.content.length > 25) {
                    $(".chat").find("p").text(chat.content.substring(0, 25) + " ...");
                }
                else {
                    $(".chat").find("p").text(chat.content);
                }
            }
            else {
                var newChat = $(".chat").first().clone();

                newChat.attr("data", chat.id);
                newChat.find("h2").text(chat.from.name + " " + chat.from.surname);
                if (chat.content.length > 25) {
                    $(".chat").find("p").text(chat.content.substring(0, 30) + " ...");
                }
                else {
                    $(".chat").find("p").text(chat.content);
                }

                $("#messages-chats").append("<hr>");
                $("#messages-chats").append(newChat);
            }

            $(".chat").click(function () {
                comid = $(this).attr("data");
                let user = $(this).children(".chat-info").children("h2").text();

                if (!$(this).hasClass("active")) {
                    $(this).siblings(".chat").removeClass("active");
                    $(this).addClass("active");
                    $("#loading").fadeIn();

                    $("section#business").addClass("fixed");
                    $("#business-content").load("chat.html", function () {
                        setInterval(() => {
                            $("#chat-content .message").not(".message:first").remove();
                            $.ajax({
                                url: "https://api.bsp-academy.com/Message?comid=" + comid,
                                type: "GET",
                                headers: {
                                    "Authorization": "bearer " + localStorage.getItem('token')
                                },
                                success: function (messages) {
                                    $("#chat-title h1").text(user);
                                    $.each(messages, function (i, message) {
                                        if (i == 0) {
                                            if (message.situation == "incoming") {
                                                $(".message").addClass("incoming");
                                            }
                                            else {
                                                $(".message").addClass("outgoing");
                                            }
                                            $(".message").find("p").text(message.text);
                                            $(".message").find("span").text(message.date.substring(11, 16));
                                        }
                                        else {
                                            var newMessage = $(".message").first().clone();

                                            if (message.situation == "incoming") {
                                                newMessage.addClass("incoming");
                                            }
                                            else {
                                                newMessage.addClass("outgoing");
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
                                },
                                error: function () {
                                    $("#error-title h1").text("Mesajlar Yüklenemedi");
                                    $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
                                    $("#error-button a").attr("href", "business.html");
                                    $("#error-button a").text("Panele Dön");
                                    $("#error").fadeIn();
                                    $("#loading").fadeOut();
                                }
                            });
                        }, 5000);

                        $("#send").click(function () {
                            if($(this).siblings("textarea").val() != ""){
                                $("#chat-content").append(`<div class="message outgoing"><p>${$("#chat-send textarea").val()}</p><span>${new Date().getHours()}:${new Date().getMinutes()}</span></div>`);
                            $(this).siblings("textarea").val("");
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
                                        $("#error-button a").attr("href", "business.html");
                                        $("#error-button a").text("Panele Dön");
                                        $("#error").fadeIn();
                                        $("#loading").fadeOut();
                                    }
                                });
                            }
                            }
                        });
                    });
                }
            })
        });
    },
    error: function () {
        $("#error-title h1").text("Mesajlar Yüklenemedi");
        $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
        $("#error-button a").attr("href", "business.html");
        $("#error-button a").text("Panele Dön");
        $("#error").fadeIn();
        $("#loading").fadeOut();
    }
});