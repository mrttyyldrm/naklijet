$(document).ready(function () {
    let transportID, vehicle, driver, price, time, date;
    let workers = [];

    $.ajax({
        url: "https://api.bsp-academy.com/GetTransportsList",
        type: "GET",
        headers: {
            "Authorization": "bearer " + localStorage.getItem('token')
        },
        success: function (ads) {
            if (ads.length == 0) {
                $(".ads").remove();
            }
            $.each(ads, function (i, ad) {
                if (i == 0) {
                    $(".ad").attr("data", ad.transport.id);
                    $(".ad").find(".ad-message").attr("data", ad.transport.appUserId);
                    $(".ad").find($(".ad-user h2")).text(ad.transport.appUser.name + " " + ad.transport.appUser.surname);
                    $(".ad").find($(".ad-user p")).text("@" + ad.transport.appUser.userName);

                    if (ad.transport.isIntercity == false) {
                        $(".ad").find($(".ad-location")).text(ad.transport.street.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + "-" + ad.transport.toStreet.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + ", " + ad.transport.street.towns.city.name);
                        $(".ad").find($(".ad-info h3")).text("Şehir İçi" + ad.transport.category.name);
                    }
                    else {
                        $(".ad").find($(".ad-location")).text(ad.transport.street.towns.city.name + "-" + ad.transport.toStreet.towns.city.name);
                        $(".ad").find($(".ad-info h3")).text("Şehirler Arası" + ad.transport.category.name);
                    }

                    $(".ad").find($(".ad-info h3")).text(ad.transport.category.name + " Talebi");
                    $(".ad").find($(".ad-info p")).text(ad.transport.description);
                    $(".ad").find($(".ad-weight")).text("~" + ad.transport.weight + " Desi");
                    if (ad.transport.isInsurances == true) {
                        $(".ad").find($(".ad-insurance")).text("Evet, istiyorum");
                    }
                    else {
                        $(".ad").find($(".ad-insurance")).text("Hayır, istemiyorum");
                    }
                    if (ad.transport.isPackageHelpers == true) {
                        $(".ad").find($(".ad-insurance")).text("Evet, istiyorum");
                    }
                    else {
                        $(".ad").find($(".ad-insurance")).text("Hayır, istemiyorum");
                    }
                    if (ad.transport.isPackageHelpers == true) {
                        $(".ad").find($(".ad-packaging")).text("Evet, istiyorum");
                    }
                    else {
                        $(".ad").find($(".ad-packaging")).text("Hayır, istemiyorum");
                    }
                    $(".ad").find($(".ad-carrying")).text(ad.transport.howCarries.name);
                    $(".ad").find($(".ad-big")).text(ad.transport.bigitemCount);
                    $(".ad").find($(".ad-mid")).text(ad.transport.miditemCount);
                    $(".ad").find($(".ad-small")).text(ad.transport.smallitemCount);
                    $(".ad").find($(".ad-offers p")).text(ad.offers + " Teklif");
                }
                else {
                    var newAd = $(".ad").first().clone();

                    newAd.attr("data", ad.transport.id);
                    newAd.find(".ad-message").attr("data", ad.transport.appUserId);
                    newAd.find(".ad-user h2").text(ad.transport.appUser.name + " " + ad.transport.appUser.surname);
                    newAd.find(".ad-user p").text("@" + ad.transport.appUser.userName);

                    if (ad.transport.isIntercity == false) {
                        newAd.find(".ad-location").text(ad.transport.street.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + "-" + ad.transport.toStreet.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + ", " + ad.transport.street.towns.city.name);
                        newAd.find(".ad-info h3").text("Şehir İçi" + ad.transport.category.name);
                    }
                    else {
                        newAd.find(".ad-location").text(ad.transport.street.towns.city.name + "-" + ad.transport.toStreet.towns.city.name);
                        newAd.find(".ad-info h3").text("Şehirler Arası" + ad.transport.category.name);
                    }

                    newAd.find(".ad-info h3").text(ad.transport.category.name + " Talebi");
                    newAd.find(".ad-info p").text(ad.transport.description);
                    newAd.find(".ad-weight").text("~" + ad.transport.weight + " Desi");
                    if (ad.transport.isInsurances == true) {
                        newAd.find(".ad-insurance").text("Evet, istiyorum");
                    }
                    else {
                        newAd.find(".ad-insurance").text("Hayır, istemiyorum");
                    }
                    if (ad.transport.isPackageHelpers == true) {
                        newAd.find(".ad-insurance").text("Evet, istiyorum");
                    }
                    else {
                        newAd.find(".ad-insurance").text("Hayır, istemiyorum");
                    }
                    if (ad.transport.isPackageHelpers == true) {
                        newAd.find(".ad-packaging").text("Evet, istiyorum");
                    }
                    else {
                        newAd.find(".ad-packaging").text("Hayır, istemiyorum");
                    }
                    newAd.find(".ad-carrying").text(ad.transport.howCarries.name);
                    newAd.find(".ad-big").text(ad.transport.bigitemCount);
                    newAd.find(".ad-mid").text(ad.transport.miditemCount);
                    newAd.find(".ad-small").text(ad.transport.smallitemCount);
                    newAd.find(".ad-offers p").text(ad.offers + " Teklif");

                    $("#ads-content").prepend(newAd);
                }
            });
            $("#loading").fadeOut();

            $(".give-offer").click(function () {
                $("#overlay").fadeIn();
                $(".swipe:first").fadeIn();
                transportID = $(this).parent(".ad-button").parent(".ad-features").parent(".ad-content").parent(".ad").attr("data");

                $.ajax({
                    url: "https://api.bsp-academy.com/Personals/GetCrew",
                    type: "GET",
                    headers: {
                        "Authorization": "bearer " + localStorage.getItem('token')
                    },
                    success: function (crew) {
                        for (let car of crew[0].Car) {
                            $("#vehicle .swipe-content").append(`<div class="swipe-option" data="${car.id}"><p>${car.brand} ${car.model}</p></div>`);
                        }

                        for (let person of crew[0].Personal) {
                            if (person.appellationId == 1) {
                                $("#driver .swipe-content").append(`<div class="swipe-option" data="${person.id}"><p>${person.name} ${person.surname}</p></div>`)
                            }
                            else if (person.appellationId == 2) {
                                $("#worker .swipe-content").append(`<div class="swipe-option" data="${person.id}"><p>${person.name} ${person.surname}</p></div>`)
                            }
                        }

                        $("#ads-swipe").addClass("active");
                        $(".swipe-loading").fadeOut();

                        $("#vehicle .swipe-option").click(function () {
                            vehicle = parseInt($(this).attr("data"));
                            $("#next").addClass("active");
                            $(this).siblings(".swipe-option").removeClass("active");
                            $(this).addClass("active");
                            console.log(workers);
                        });

                        $("#driver .swipe-option").click(function () {
                            driver = parseInt($(this).attr("data"));
                            $("#next").addClass("active");
                            $(this).siblings(".swipe-option").removeClass("active");
                            $(this).addClass("active");
                            console.log(workers + " " + driver);
                        });

                        $("#worker .swipe-option").click(function () {
                            if ($(this).hasClass("active")) {
                                workers = workers.filter(item => item !== parseInt($(this).attr("data")));
                                $(this).removeClass("active");
                            }
                            else {
                                workers.push(parseInt($(this).attr("data")));
                                $(this).addClass("active");
                                $("#next").addClass("active");
                            }
                            if (!$("#worker .swipe-option").hasClass("active")) {
                                $("#next").removeClass("active");
                            }
                        });
                    },
                    error: function () {
                        $("#error-title h1").text("Teklif Gönderilemedi");
                        $("#error-title p").text("Lütfen daha sonra tekrar deneyin.");
                        $("#error-button a").attr("href", "business.html");
                        $("#error-button a").text("Panele Dön");
                        $("#error").fadeIn();
                        $("#loading").fadeOut();
                    }
                });
            });

            $(".ad-message").off("click");
            $(".ad-message").click(function () {
                let appUserId = $(this).attr("data");
                let user = $(this).parent(".ad-button").siblings(".ad-user").children("p").text();
                $("#loading").fadeIn();

                $("section#business").addClass("fixed");
                $("#business-content").load("chat.html", function () {
                    $("#chat-title h1").text(user);
                    getMessages(appUserId, function(){
                        setMessages();
                    });
                    startGetMessages(appUserId, function(){
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
                                        "toId": appUserId,
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
                                $(this).siblings("textarea").val("");
                            }
                        }
                    });
                });
            });
        },
        error: function () {
            $("#error-title h1").text("Hatalı İstek");
            $("#error-title p").text("Talebiniz gerçekleştirilemedi. Lütfen daha sonra tekrar deneyiniz.");
            $("#error-button a").attr("href", "business.html");
            $("#error-button a").text("Panele Dön");
            $("#error").fadeIn();
            $("#loading").fadeOut();
        }
    });

    let queue = 1;

    $("#prev").click(function () {
        queue--;
        $("#next").text("Devam Et");
        $(".swipe").fadeOut();
        setTimeout(function () {
            $(".swipe[queue=" + queue + "]").fadeIn();
        }, 500);

        if (queue == 0) {
            $("#ads-swipe").removeClass("active");
            $("#overlay").fadeOut();
            $("#vehicle .swipe-option").remove();
            $("#driver .swipe-option").remove();
            $("#worker .swipe-option").remove();
        }
        else if (queue == 1) {
            $("#prev").removeClass("small");
        }
        else if (queue == 2) {
        }
        else if (queue == 3) {
        }
        else {
            $("#prev").addClass("small");
        }

        if ($(".swipe[queue=" + queue + "] .swipe-content .swipe-option").hasClass("active")) {
            $("#next").addClass("active");
        }
    });

    $("#next").click(function () {
        if ($(this).hasClass("active")) {
            if (queue <= $(".swipe").length - 1) {
                queue++;
            }

            $(".swipe").fadeOut(500);
            setTimeout(function () {
                $(".swipe[queue=" + queue + "]").fadeIn();
            }, 750);

            if (queue == 2) {
                $("#prev").addClass("small");
            }

            $(this).removeClass("active");
            if (queue == $(".swipe").length) {
                if ($("#next").text() == "Devam Et") {
                    $(this).text("Onayla");
                }
                else {
                    $("#loading").fadeIn();
                    price = parseInt($("#service .swipe-price").val());
                    time = parseInt($("#service .swipe-time").val());
                    workers.push(driver);
                    date = new Date().toISOString();

                    $.ajax({
                        url: "https://api.bsp-academy.com/Application",
                        type: "POST",
                        headers: {
                            "Authorization": "bearer " + localStorage.getItem('token')
                        },
                        contentType: "application/json",
                        data: JSON.stringify({
                            "transportId": transportID,
                            "carsId": vehicle,
                            "companyTransportTime": time,
                            "price": price,
                            "personalIds": workers,
                        }),
                        success: function () {
                            $("#ads-swipe").removeClass("active");
                            $("#success-title h1").text("Teklif Gönderdildi");
                            $("#success-title p").text("Teklifinize dair detayları Satışlarım penceresinden inceleyebilirsiniz...");
                            $("#success-button a").attr("href", "business.html");
                            $("#success-button a").text("Panele Dön");
                            $("#success").fadeIn();
                            $("#loading").fadeOut();
                        },
                        error: function () {
                            $("#error-title h1").text("Teklif Gönderilemedi");
                            $("#error-title p").text("Lütfen daha sonra tekrar deneyin.");
                            $("#error-button a").attr("href", "business.html");
                            $("#error-button a").text("Panele Dön");
                            $("#error").fadeIn();
                            $("#loading").fadeOut();
                        }
                    });
                }

                if ($("#service .swipe-price").val() != "" && $("#service .swipe-time").val() != "") {
                    $("#next").addClass("active");
                }
                else {
                    $("#next").removeClass("active");
                }
            }
            else {
                $(this).text("Devam Et");
            }
        }
    });

    $("#overlay").click(function () {
        $("#vehicle .swipe-option").remove();
        $("#driver .swipe-option").remove();
        $("#worker .swipe-option").remove();
        $("#ads-swipe").removeClass("active");
    });

    $("#service input").keyup(function () {
        if ($("#service .swipe-price").val() != "" && $("#service .swipe-time").val() != "") {
            $("#next").addClass("active");
        }
        else {
            $("#next").removeClass("active");
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