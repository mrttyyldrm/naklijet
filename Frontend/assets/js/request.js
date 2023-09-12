$(document).ready(function () {
    $("#loading").fadeIn();
    setTimeout(function(){
        $.ajax({
            url: "https://api.bsp-academy.com/isLogged",
            type: "GET",
            headers: {
                "Authorization": "bearer " + localStorage.getItem('token')
            },
            success: function(data){
                if(data == true){
                    location.href = "business.html";
                }
                else{
                    $("#loading").fadeOut();
                }
            },
            error: function(){
                $("#error-title h1").text("Oturum Zaman Aşımına Uğradı");
                $("#error-title p").text("Panele erişmek için lütfen tekrar giriş yapınız.");
                $("#error-button a").attr("href", "login.html");
                $("#error-button a").text("Giriş Yap");
                $("#error").fadeIn();
                $("#loading").fadeOut();
            }
        });
    }, 1000);

    let category, type, from, to, situation, packaging, insurance, description;
    let count = {
        big: 0,
        mid: 0,
        small: 0
    };

    let queue = 1;
    let progress = 100 / ($(".step").length);
    $("#request-progress").css("width", (progress * queue) + "%");

    function fromLocations() {
        let cityID, townID, streetID;
        $(".step#from .step-content .option").remove();
        $.ajax({
            url: "https://api.bsp-academy.com/city",
            type: "GET",
            success: function (cities) {
                for (let city of cities) {
                    $(".step#from .step-content").append(`<div class="option" data="${city.id}"><p>${city.name}</p></div>`);
                }
                $(".step#from .step-loading").fadeOut();

                $(".step#from .option").click(function () {
                    $(this).siblings(".option").removeClass("active");
                    $(this).addClass("active");
                    cityID = $(this).attr("data");
                    $(".step#from .step-loading").fadeIn();
                    setTimeout(function () {
                        $.ajax({
                            url: "https://api.bsp-academy.com/town?id=" + cityID,
                            type: "GET",
                            success: function (towns) {
                                $(".step#from .step-content .option").remove();
                                for (let town of towns) {
                                    $(".step#from .step-content").append(`<div class="option" data="${town.id}"><p>${town.name}</p></div>`);
                                }
                                $(".step#from .step-loading").fadeOut();

                                $(".step#from .option").click(function () {
                                    $(this).siblings(".option").removeClass("active");
                                    $(this).addClass("active");
                                    townID = $(this).attr("data");
                                    $(".step#from .step-loading").fadeIn();
                                    setTimeout(function () {
                                        $.ajax({
                                            url: "https://api.bsp-academy.com/street?id=" + townID,
                                            type: "GET",
                                            success: function (streets) {
                                                $(".step#from .step-content .option").remove();
                                                for (street of streets) {
                                                    $(".step#from .step-content").append(`<div class="option" data="${street.id}"><p>${street.name}</p></div>`);
                                                }
                                                $(".step#from .step-loading").fadeOut();

                                                $(".step#from .option").click(function () {
                                                    $(this).siblings(".option").removeClass("active");
                                                    $(this).addClass("active");
                                                    from = $(this).attr("data");
                                                    $("#next").addClass("active");
                                                });
                                            },
                                            error: function () {
                                                $("#error-title h1").text("Hata");
                                                $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
                                                $("#error-button a").attr("href", "index.html");
                                                $("#error").fadeIn();
                                                $(".form-input input").val("");
                                            }
                                        });
                                    }, 750);
                                });
                            },
                            error: function () {
                                $("#error-title h1").text("Hata");
                                $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
                                $("#error-button a").attr("href", "index.html");
                                $("#error").fadeIn();
                                $(".form-input input").val("");
                            }
                        });
                    }, 750);
                });
            },
            error: function () {
                $("#error-title h1").text("Hata");
                $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
                $("#error-button a").attr("href", "index.html");
                $("#error").fadeIn();
                $(".form-input input").val("");
            }
        });
    }
    function toLocations(){
        let cityID, townID, streetID;
        $(".step#to .step-content .option").remove();
        $.ajax({
            url: "https://api.bsp-academy.com/city",
            type: "GET",
            success: function (cities) {
                for (let city of cities) {
                    $(".step#to .step-content").append(`<div class="option" data="${city.id}"><p>${city.name}</p></div>`);
                }
                $(".step#to .step-loading").fadeOut();

                $(".step#to .option").click(function () {
                    $(this).siblings(".option").removeClass("active");
                    $(this).addClass("active");
                    cityID = $(this).attr("data");
                    $(".step#to .step-loading").fadeIn();
                    setTimeout(function () {
                        $.ajax({
                            url: "https://api.bsp-academy.com/town?id=" + cityID,
                            type: "GET",
                            success: function (towns) {
                                $(".step#to .step-content .option").remove();
                                for (let town of towns) {
                                    $(".step#to .step-content").append(`<div class="option" data="${town.id}"><p>${town.name}</p></div>`);
                                }
                                $(".step#to .step-loading").fadeOut();

                                $(".step#to .option").click(function () {
                                    $(this).siblings(".option").removeClass("active");
                                    $(this).addClass("active");
                                    townID = $(this).attr("data");
                                    $(".step#to .step-loading").fadeIn();
                                    setTimeout(function () {
                                        $.ajax({
                                            url: "https://api.bsp-academy.com/street?id=" + townID,
                                            type: "GET",
                                            success: function (streets) {
                                                $(".step#to .step-content .option").remove();
                                                for (street of streets) {
                                                    $(".step#to .step-content").append(`<div class="option" data="${street.id}"><p>${street.name}</p></div>`);
                                                }
                                                $(".step#to .step-loading").fadeOut();

                                                $(".step#to .option").click(function () {
                                                    $(this).siblings(".option").removeClass("active");
                                                    $(this).addClass("active");
                                                    to = $(this).attr("data");
                                                    $("#next").addClass("active");
                                                });
                                            },
                                            error: function () {
                                                $("#error-title h1").text("Hata");
                                                $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
                                                $("#error-button a").attr("href", "index.html");
                                                $("#error").fadeIn();
                                                $(".form-input input").val("");
                                            }
                                        });
                                    }, 750);
                                });
                            },
                            error: function () {
                                $("#error-title h1").text("Hata");
                                $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
                                $("#error-button a").attr("href", "index.html");
                                $("#error").fadeIn();
                                $(".form-input input").val("");
                            }
                        });
                    }, 750);

                });
            },
            error: function () {
                $("#error-title h1").text("Hata");
                $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
                $("#error-button a").attr("href", "index.html");
                $("#error").fadeIn();
                $(".form-input input").val("");
            }
        });
    }

    $("#next").click(function () {
        if ($(this).hasClass("active")) {
            if(queue <= $(".step").length -1){
                queue++;
            }
            
            $("#request-progress").css("width", (progress * queue) + "%");
            $(".step").fadeOut(500);
            setTimeout(function () {
                $(".step[queue=" + queue + "]").fadeIn();
            }, 750);

            if (queue == 2) {
                $("#prev").addClass("small");
            }
            else if (queue == 3) {
                fromLocations();
            }
            else if (queue == 4) {
                toLocations();
            }
            else if (queue == 5) {
                if ($("h3#big").text() != "0" || $("h3#mid").text() != "0" || $("h3#small").text() != "0") {
                    $(this).addClass("active");
                }
            }

            if (queue == $(".step").length) {
                if ($("#next").text() == "Devam Et") {
                    $(this).text("Onayla");
                }
                else {
                    $("#loading").fadeIn();
                    description = $(".step#description textarea").val();
                    $.ajax({
                        url: "https://api.bsp-academy.com/newTransport",
                        type: "POST",
                        headers: {
                            "Authorization": "bearer " + localStorage.getItem('token')
                        },
                        contentType: "application/json",
                        data: JSON.stringify({
                            "categoryId": type,
                            "description": description,
                            "bigitemCount": count.big,
                            "miditemCount": count.mid,
                            "smallitemCount": count.small,
                            "streetId": from,
                            "howCarryId": situation,
                            "isPackageHelpers": packaging==='true',
                            "isInsurances": insurance==='true',
                            "appUserId": "string",
                            "toStreetId": to,
                            "isIntercity": category==='true'
                        }),
                        success: function(){
                            $("#success-title h1").text("Talebiniz Oluşturuldu");
                            $("#success-title p").text("Talebiniz hakkındaki bilgileri Taleplerim sayfasından görebilirsiniz.");
                            $("#success-button a").attr("href", "customer.html");
                            $("#success-button a").text("Panele Dön");
                            $("#success").fadeIn();
                            $("#loading").fadeOut();
                        },
                        error: function(){
                            $("#error-title h1").text("Talebiniz Oluşturulamadı");
                            $("#error-title p").text("Bir şeyler ters gitti. Lütfen daha sonra tekrar deneyiniz.");
                            $("#error-button a").attr("href", "index.html");
                            $("#error-button a").text("Tamam");
                            $("#error").fadeIn();
                            $("#loading").fadeOut();
                        }
                    });
                }
            }
            else {
                $(this).text("Devam Et");
            }
            $(this).removeClass("active");
            if($(".step#description textarea").val() != ""){
                $("#next").addClass("active");
            }
            if ($(".step[queue=" + queue + "] .step-content .option").hasClass("active")) {
                $(this).addClass("active");
            }
        }
    });

    $("#prev").click(function () {
        queue--;
        $("#next").text("Devam Et");
        $("#request-progress").css("width", (progress * queue) + "%");
        $(".step").fadeOut(500);
        setTimeout(function () {
            $(".step[queue=" + queue + "]").fadeIn();
        }, 500);

        if (queue == 0) {
            location.href = "index.html";
        }
        else if (queue == 1) {
            $("#prev").removeClass("small");
        }
        else if (queue == 3) {
            fromLocations();
        }
        else if (queue == 4) {
            toLocations();
        }
        else if(queue == 5){
            if ($("h3#big").text() != "0" || $("h3#mid").text() != "0" || $("h3#small").text() != "0") {
                $("#next").addClass("active");
            }
        }
        else {
            $("#prev").addClass("small");
        }

        if ($(".step[queue=" + queue + "] .step-content .option").hasClass("active")) {
            $("#next").addClass("active");
        }
    });

    $("#category .option").click(function () {
        category = $(this).attr("data");
        $("#next").addClass("active");
        $(this).siblings(".option").removeClass("active");
        $(this).addClass("active");
    });

    $("#type .option").click(function () {
        type = $(this).attr("data");
        $("#next").addClass("active");
        $(this).siblings(".option").removeClass("active");
        $(this).addClass("active");
    });

    $("#situation .option").click(function () {
        situation = $(this).attr("data");
        $("#next").addClass("active");
        $(this).siblings(".option").removeClass("active");
        $(this).addClass("active");
    });

    $("#packaging .option").click(function () {
        packaging = $(this).attr("data");
        $("#next").addClass("active");
        $(this).siblings(".option").removeClass("active");
        $(this).addClass("active");
    });

    $("#insurance .option").click(function () {
        insurance = $(this).attr("data");
        $("#next").addClass("active");
        $(this).siblings(".option").removeClass("active");
        $(this).addClass("active");
    });

    $("#description .form-control textarea").keyup(function () {
        description = $(this).val();
        if ($(this).val() != "") {
            $("#next").addClass("active");
        }
        else {
            $("#next").removeClass("active");
        }
    });

    $(".option .option-button").click(function () {
        if ($(this).hasClass("minus")) {
            if (parseInt($("h3#" + $(this).parent(".option").attr("data")).text()) > 0) {
                $("h3#" + $(this).parent(".option").attr("data")).text(parseInt($("h3#" + $(this).parent(".option").attr("data")).text()) - 1);
            }
        }
        else if ($(this).hasClass("plus")) {
            $("h3#" + $(this).parent(".option").attr("data")).text(parseInt($("h3#" + $(this).parent(".option").attr("data")).text()) + 1);
        }

        count.big = parseInt($("h3#big").text());
        count.mid = parseInt($("h3#small").text());
        count.small = parseInt($("h3#small").text());

        if ($("h3#big").text() != "0" || $("h3#mid").text() != "0" || $("h3#small").text() != "0") {
            $("#next").addClass("active");
        }
        else{
            $("#next").removeClass("active");
        }
    });
});