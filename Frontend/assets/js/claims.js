$(document).ready(function () {
    var claimID;
    $.ajax({
        url: "https://api.bsp-academy.com/GetList",
        type: "GET",
        headers: {
            "Authorization": "bearer " + localStorage.getItem('token')
        },
        success: function (claims) {
            if (claims.length == 0) {
                $(".claim").remove();
            }
            $.each(claims, function (i, claim) {
                if (i == 0) {
                    $(".claim").attr("data", claim.Transport.id);
                    $(".claim").find($(".claim-user h2")).text(claim.Transport.appUser.name + " " + claim.Transport.appUser.surname);
                    $(".claim").find($(".claim-user p")).text("@" + claim.Transport.appUser.userName);

                    if (claim.Transport.isIntercity == false) {
                        $(".claim").find($(".claim-location")).text(claim.Transport.street.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + "-" + claim.Transport.toStreet.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + ", " + claim.Transport.street.towns.city.name);
                        $(".claim").find($(".claim-info h3")).text("Şehir İçi" + claim.Transport.category.name);
                    }
                    else {
                        $(".claim").find($(".claim-location")).text(claim.Transport.street.towns.city.name + "-" + claim.Transport.toStreet.towns.city.name);
                        $(".claim").find($(".claim-info h3")).text("Şehirler Arası" + claim.Transport.category.name);
                    }

                    $(".claim").find($(".claim-info h3")).text(claim.Transport.category.name + " Talebi");
                    $(".claim").find($(".claim-info p")).text(claim.Transport.description);
                    $(".claim").find($(".claim-weight")).text("~" + claim.Transport.weight + " Desi");
                    if (claim.Transport.isInsurances == true) {
                        $(".claim").find($(".claim-insurance")).text("Evet, istiyorum");
                    }
                    else {
                        $(".claim").find($(".claim-insurance")).text("Hayır, istemiyorum");
                    }
                    if (claim.Transport.isPackageHelpers == true) {
                        $(".claim").find($(".claim-insurance")).text("Evet, istiyorum");
                    }
                    else {
                        $(".claim").find($(".claim-insurance")).text("Hayır, istemiyorum");
                    }
                    if (claim.Transport.isPackageHelpers == true) {
                        $(".claim").find($(".claim-packaging")).text("Evet, istiyorum");
                    }
                    else {
                        $(".claim").find($(".claim-packaging")).text("Hayır, istemiyorum");
                    }
                    $(".claim").find($(".claim-carrying")).text(claim.Transport.howCarries.name);
                    $(".claim").find($(".claim-big")).text(claim.Transport.bigitemCount);
                    $(".claim").find($(".claim-mid")).text(claim.Transport.miditemCount);
                    $(".claim").find($(".claim-small")).text(claim.Transport.smallitemCount);
                    $(".claim").find($(".claim-offers p")).text(claim.offers + " Teklif");
                }
                else {
                    var newClaim = $(".claim").first().clone();

                    newClaim.attr("data", claim.Transport.id);
                    newClaim.find(".claim-user h2").text(claim.Transport.appUser.name + " " + claim.Transport.appUser.surname);
                    newClaim.find(".claim-user p").text(claim.Transport.appUser.userName);

                    if (claim.Transport.isIntercity == false) {
                        newClaim.find(".claim-location").text(claim.Transport.street.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + "-" + claim.Transport.toStreet.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + ", " + claim.Transport.street.towns.city.name);
                        newClaim.find(".claim-info h3").text("Şehir İçi" + claim.Transport.category.name);
                    }
                    else {
                        newClaim.find(".claim-location").text(claim.Transport.street.towns.city.name + "-" + claim.Transport.toStreet.towns.city.name);
                        newClaim.find(".claim-info h3").text("Şehirler Arası" + claim.Transport.category.name);
                    }

                    newClaim.find(".claim-info h3").text(claim.Transport.category.name + " Talebi");
                    newClaim.find(".claim-info p").text(claim.Transport.description);
                    newClaim.find(".claim-weight").text("~" + claim.Transport.weight + " Desi");
                    if (claim.Transport.isInsurances == true) {
                        newClaim.find(".claim-insurance").text("Evet, istiyorum");
                    }
                    else {
                        newClaim.find(".claim-insurance").text("Hayır, istemiyorum");
                    }
                    if (claim.Transport.isPackageHelpers == true) {
                        newClaim.find(".claim-insurance").text("Evet, istiyorum");
                    }
                    else {
                        newClaim.find(".claim-insurance").text("Hayır, istemiyorum");
                    }
                    if (claim.Transport.isPackageHelpers == true) {
                        newClaim.find(".claim-packaging").text("Evet, istiyorum");
                    }
                    else {
                        newClaim.find(".claim-packaging").text("Hayır, istemiyorum");
                    }
                    newClaim.find(".claim-carrying").text(claim.Transport.howCarries.name);
                    newClaim.find(".claim-big").text(claim.Transport.bigitemCount);
                    newClaim.find(".claim-mid").text(claim.Transport.miditemCount);
                    newClaim.find(".claim-small").text(claim.Transport.smallitemCount);
                    newClaim.find(".claim-offers p").text(claim.offers + " Teklif");

                    $("#claims-content").prepend(newClaim);
                }
            });
            $("#loading").fadeOut();

            $(".claim-delete").off("click");
            $(".claim-delete").click(function () {
                let deleteID = $(this).parent(".claim-button").parent(".claim-title").parent(".claim").attr("data");
                $("#loading").fadeIn();
                $.ajax({
                    url: "https://api.bsp-academy.com/" + deleteID,
                    type: "DELETE",
                    headers: {
                        "Authorization": "bearer " + localStorage.getItem('token')
                    },
                    success: function () {
                        $(".claim[data=" + deleteID + "]").remove();
                        $("#success-title h1").text("Talebiniz Silindi");
                        $("#success-title p").text("Talebiniz başarıyla talep listenizden kaldırıldı.");
                        $("#success").fadeIn();
                        $("#loading").fadeOut();
                    },
                    error: function () {
                        $("#error-title h1").text("Talebiniz Silinemedi");
                        $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
                        $("#error").fadeIn();
                        $("#loading").fadeOut();
                    }
                });
            });

            $(".see-offers").off("click");
            $(".see-offers").click(function () {
                claimID = $(this).parent(".claim-button").parent(".claim-features").parent(".claim-content").parent(".claim").attr("data");
                seeOffers(claimID);
            });
        },
        error: function () {
            showError();
        }
    });
});

function showError() {
    $("#error-title h1").text("Hatalı İstek");
    $("#error-title p").text("Talebiniz gerçekleştirilemedi. Lütfen daha sonra tekrar deneyiniz.");
    $("#error-button a").attr("href", "customer.html");
    $("#error-button a").text("Panele Dön");
    $("#error").fadeIn();
    $("#loading").fadeOut();
}

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

function seeOffers(id) {
    $("#loading").fadeIn();
    setTimeout(function () {
        $("#customer-content").load("offers.html", function () {
            var claimDetails;
            $("#offers-content .offer").not("#offers-content .offer:first-child").remove();
            $.ajax({
                url: "https://api.bsp-academy.com/Application/GetRelations?id=" + id,
                type: "GET",
                headers: {
                    "Authorization": "bearer " + localStorage.getItem('token')
                },
                success: function (offers) {
                    details = offers;
                    if (offers.length == 0) {
                        $(".offer").remove();
                    }
                    $.each(offers, function (i, offer) {
                        if (i == 0) {
                            $(".offer").find(".offer-company h2").text(offer.application.company.companyName);
                            $(".offer").find(".offer-company p").text("@" + offer.application.company.userName);
                            $(".offer").find(".offer-price p").text(offer.application.price + " ₺");
                            $(".offer").find(".offer-vehicle").text(offer.application.cars.brand + " " + offer.application.cars.model);

                            let driverCount = 0, workerCount = 0;
                            for (let person of offer.application.appPersonels) {
                                if (person.personals.appellationId == 1) {
                                    driverCount++;
                                }
                                else if (person.personals.appellationId == 2) {
                                    workerCount++;
                                }
                            }
                            $(".offer").find(".offer-crew").text(driverCount + " Şoför & " + workerCount + " İşçi");
                            $(".offer").find(".offer-time").text(offer.application.companyTransportTime + " Gün");
                            $(".offer").find(".offer-delete").attr("data", offer.application.id);
                            $(".offer").find(".offer-message").attr("data", offer.application.company.id);
                            $(".offer").find(".offer-detail").attr("data", i);
                        }
                        else {
                            var newOffer = $(".offer").first().clone();
                            newOffer.find(".offer-company h2").text(offer.application.company.companyName);
                            newOffer.find(".offer-company p").text("@" + offer.application.company.userName);
                            newOffer.find(".offer-price p").text(offer.application.price + " ₺");
                            newOffer.find(".offer-vehicle").text(offer.application.cars.brand + " " + offer.application.cars.model);

                            let driverCount = 0, workerCount = 0;
                            for (let person of offer.application.appPersonels) {
                                if (person.personals.appellationId == 1) {
                                    driverCount++;
                                }
                                else if (person.personals.appellationId == 2) {
                                    workerCount++;
                                }
                            }
                            newOffer.find(".offer-crew").text(driverCount + " Şoför & " + workerCount + " İşçi");
                            newOffer.find(".offer-time").text(offer.application.companyTransportTime + " Gün");
                            newOffer.find(".offer-delete").attr("data", offer.application.id);
                            newOffer.find(".offer-message").attr("data", offer.application.company.id);
                            newOffer.find(".offer-detail").attr("data", i);

                            $("#offers-content").prepend(newOffer);
                        }

                        $(".offer-delete").off("click");
                        $(".offer-delete").click(function () {
                            let id = $(this).attr("data");
                            $("#loading").fadeIn();
                            $.ajax({
                                url: "https://api.bsp-academy.com/Application/DeleteApplication?id=" + id,
                                type: "DELETE",
                                headers: {
                                    "Authorization": "bearer " + localStorage.getItem('token')
                                },
                                success: function () {
                                    $(".offer-delete[data=" + id + "]").parent(".offer-buttons").parent(".offer-features").parent(".offer-content").parent(".offer").remove();
                                    $("#success-title h1").text("Teklif Silindi");
                                    $("#success-title p").text("Teklif detaylarını Tekliflerim sayfasından inceleyebilirsiniz.");
                                    $("#success").fadeIn();
                                    $("#loading").fadeOut();
                                },
                                error: function () {
                                    $("#error-title h1").text("Teklif Silinemedi");
                                    $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
                                    $("#error").fadeIn();
                                    $("#loading").fadeOut();
                                }
                            });
                        });

                        $(".offer-message").off("click");
                        $(".offer-message").click(function () {
                            let appUserId = $(this).attr("data");
                            let user = $(this).parent(".offer-buttons").parent(".offer-features").parent(".offer-content").siblings(".offer-title").children(".offer-company").children("p").text();
                            console.log(user);
                            $("#loading").fadeIn();

                            $("section#customer").addClass("fixed");
                            $("#customer-content").load("chat.html", function () {
                                $("#chat-title h1").text(user);
                                getMessages(appUserId, function () {
                                    setMessages();
                                });
                                startGetMessages(appUserId, function () {
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
                                                    $("#error-button a").attr("href", "customer.html");
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

                        $(".offer-detail").off("click");
                        $(".offer-detail").click(function () {
                            $("#offers-swipe").addClass("active");
                            $("#overlay").fadeIn();
                            $(".swipe-worker .swipe-item").remove();
                            $(".swipe-comments .comment").not(".swipe-comments .comment:first").remove();
                            $(".swipe-comments .comment:first .comment-rate i").removeClass("fa-solid").addClass("fa-regular");
                            let detail = details[parseInt($(this).attr("data"))];

                            $("#accept-offer").attr("data", $(this).siblings(".offer-buttons").children(".offer-delete").attr("data"));
                            $(".swipe").find(".swipe-title h2").text(detail.application.company.companyName);
                            $(".swipe").find(".swipe-rate p").text(detail.rate);
                            $(".swipe").find(".swipe-price h3").text(detail.application.price + " ₺");
                            $(".swipe").find(".swipe-time h3").text(detail.application.companyTransportTime + " Gün");
                            $(".swipe").find(".swipe-vehicle .swipe-name h3").text(detail.application.cars.brand + " " + detail.application.cars.model);
                            $(".swipe").find(".swipe-vehicle .swipe-data:first p").text(detail.application.cars.plate);
                            $(".swipe").find(".swipe-vehicle .swipe-data:last p").text(detail.application.cars.capacity);

                            for (let member of detail.application.appPersonels) {
                                if (member.personals.appellationId == 1) {
                                    $(".swipe").find(".swipe-driver .swipe-name h3").text(member.personals.name + " " + member.personals.surname);
                                }
                                else if (member.personals.appellationId == 2) {
                                    $(".swipe-worker").append(`<div class="swipe-item"><div class="swipe-name"><div class="swipe-icon"><i class="fa-regular fa-user-group"></i></div><h3>${member.personals.name} ${member.personals.surname}</h3></div></div>`)
                                }
                            }

                            $.each(detail.comments, function (i, comment) {
                                if (comment.rate != null && comment.commentUser != nul && comment.rate != null) {
                                    var newComment = $(".comment").first().clone();
                                    newComment.find("h3").text("@" + comment.commentUser);
                                    newComment.find("p").text(comment.comment);

                                    for (let j = 1; j <= comment.rate; j++) {
                                        newComment.find(".comment-rate i:nth-child(" + j + ")").removeClass("fa-regular").addClass("fa-solid");
                                    }

                                    $(".swipe-comments").append(newComment);
                                }
                            });
                            $(".comment").first().remove();

                            $("#accept-offer").click(function () {
                                $.ajax({
                                    url: "https://api.bsp-academy.com/Application/ConfirmTransport/?id=" + $(this).attr("data"),
                                    type: "GET",
                                    headers: {
                                        "Authorization": "bearer " + localStorage.getItem('token')
                                    },
                                    success: function () {
                                        $("#success-title h1").text("Teklif Onaylandı");
                                        $("#success-title p").text("Siparişinize ait detaylara Siparişlerim bölümünden erişebilirsiniz.");
                                        $("#success-button a").attr("href", "customer.html");
                                        $("#success-button a").text("Panele Dön");
                                        $("#success").fadeIn();
                                        $("#loading").fadeOut();
                                    },
                                    error: function () {
                                        $("#error-title h1").text("Teklif Onaylanamadı");
                                        $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
                                        $("#error").fadeIn();
                                        $("#loading").fadeOut();
                                        $("#overlay").fadeOut();
                                        $("#offers-swipe").removeClass("active");
                                    }
                                });
                            });
                        });
                    });
                    $("#loading").fadeOut();
                },
                error: function () {
                    showError();
                }
            });
        });
    }, 750);
}

$("#overlay").click(function () {
    $("#offers-swipe").removeClass("active");
});
