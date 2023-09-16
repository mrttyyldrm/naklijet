function getCrew() {
    $("#vehicle hr").remove();
    $(".vehicle").not(".vehicle:first").remove();
    $("#driver hr").remove();
    $(".driver").not(".driver:first").remove();
    $("#worker hr").remove();
    $(".worker").not(".worker:first").remove();

    $.ajax({
        url: "https://api.bsp-academy.com/Personals/GetCrew",
        type: "GET",
        headers: {
            "Authorization": "bearer " + localStorage.getItem('token')
        },
        success: function (crew) {
            if (crew[0].Car.length == 0) {
                $(".crew-group#vehicle").hide();
            }
            else {
                $(".crew-group#vehicle").show();
            }
            $.each(crew[0].Car, function (i, vehicle) {
                if (i == 0) {
                    $(".vehicle").attr("data", vehicle.id);
                    $(".vehicle").find(".member-info h3").text(vehicle.brand + " " + vehicle.model);
                    $(".vehicle").find(".member-data:first p").text(vehicle.plate);
                    $(".vehicle").find(".member-data:last p").text(vehicle.capacity);
                }
                else {
                    var newVehicle = $(".vehicle").first().clone();

                    newVehicle.attr("data", vehicle.id);
                    newVehicle.find(".member-info h3").text(vehicle.brand + " " + vehicle.model);
                    newVehicle.find(".member-data:first p").text(vehicle.plate);
                    newVehicle.find(".member-data:last p").text(vehicle.capacity);

                    $(".crew-group#vehicle").append("<hr>");
                    $(".crew-group#vehicle").append(newVehicle);
                }
            });

            let driverCount = 0;
            $.each(crew[0].Personal, function (i, driver) {
                if (driver.appellationId == 1) {
                    if (driverCount != 0) {
                        let newDriver = $(".driver").first().clone();
                        newDriver.attr("data", driver.id);
                        newDriver.find(".member-info h3").text(driver.name + " " + driver.surname);

                        $(".crew-group#driver").append("<hr>");
                        $(".crew-group#driver").append(newDriver);
                    }
                    else {
                        $(".driver").attr("data", driver.id);
                        $(".driver").find(".member-info h3").text(driver.name + " " + driver.surname);
                    }
                    driverCount++;
                }
            });

            let workerCount = 0;
            $.each(crew[0].Personal, function (i, worker) {
                if (worker.appellationId == 2) {
                    if (workerCount != 0) {
                        var newWorker = $(".worker").first().clone();
                        newWorker.attr("data", worker.id);
                        newWorker.find(".member-info h3").text(worker.name + " " + worker.surname);

                        $(".crew-group#worker").append("<hr>");
                        $(".crew-group#worker").append(newWorker);
                    }
                    else {
                        $(".worker").attr("data", worker.id);
                        $(".worker").find(".member-info h3").text(worker.name + " " + worker.surname);
                    }
                    workerCount++;
                }
            });

            if (driverCount == 0) {
                $(".crew-group#driver").hide();
            }
            else {
                $(".crew-group#driver").show();
            }
            if (workerCount == 0) {
                $(".crew-group#worker").hide();
            }
            else {
                $(".crew-group#worker").show();
            }

            $("#loading").fadeOut();

            $(".member-delete").off("click");
            $(".member-delete").click(function () {
                $("#loading").fadeIn();
                $.ajax({
                    url: "https://api.bsp-academy.com/Personals?id=" + $(this).parent(".member-title").parent(".member").attr("data"),
                    type: "DELETE",
                    headers: {
                        "Authorization": "bearer " + localStorage.getItem('token')
                    },
                    success: function () {
                        $("#ads-swipe").removeClass("active");
                        $("#success-title h1").text("Personel Kaldırıldı");
                        $("#success-title p").text("Personel detaylarını Filo Yönetimi sayfası üzerinden görüntüleyebilirsiniz.");
                        $("#success").fadeIn();
                        $("#loading").fadeOut();
                        getCrew();
                    },
                    error: function () {
                        $("#error-title h1").text("Personel Kaldırılamadı");
                        $("#error-title p").text("Lütfen daha sonra tekrar deneyin.");
                        $("#error").fadeIn();
                        $("#loading").fadeOut();
                    }
                });
            });

            $(".vehicle-delete").off("click");
            $(".vehicle-delete").click(function () {
                $("#loading").fadeIn();
                $.ajax({
                    url: "https://api.bsp-academy.com/Cars?id=" + $(this).parent(".member-title").parent(".member").attr("data"),
                    type: "DELETE",
                    headers: {
                        "Authorization": "bearer " + localStorage.getItem('token')
                    },
                    success: function () {
                        $("#ads-swipe").removeClass("active");
                        $("#success-title h1").text("Araç Kaldırıldı");
                        $("#success-title p").text("Araç detaylarını Filo Yönetimi sayfası üzerinden görüntüleyebilirsiniz.");
                        $("#success").fadeIn();
                        $("#loading").fadeOut();
                        getCrew();
                    },
                    error: function () {
                        $("#error-title h1").text("Araç Kaldırılamadı");
                        $("#error-title p").text("Lütfen daha sonra tekrar deneyin.");
                        $("#error").fadeIn();
                        $("#loading").fadeOut();
                    }
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
}
getCrew();

$("button#add-vehicle").click(function () {
    $("#vehicle-swipe").addClass("active");
    $("#overlay").fadeIn();
});
$("button#add-member").click(function () {
    $("#member-swipe").addClass("active");
    $("#overlay").fadeIn();
});

$("#overlay").click(function () {
    $("#vehicle-swipe").removeClass("active");
    $("#member-swipe").removeClass("active");
});

$("#vehicle-swipe input").keypress(function () {
    if ($("input#brand").val() != "" && $("input#model").val() != "" && $("input#plate").val() != "" && $("input#capacity").val() != "") {
        $("button#save-vehicle").addClass("active");
    }
});
$("#member-swipe input").keypress(function () {
    if ($("input#name").val() != "" && $("input#surname").val()) {
        $("button#save-member").addClass("active");
    }
});

$("#save-vehicle").click(function () {
    $("#loading").fadeIn();

    $.ajax({
        url: "https://api.bsp-academy.com/Cars",
        type: "POST",
        headers: {
            "Authorization": "bearer " + localStorage.getItem('token')
        },
        contentType: "application/json",
        data: JSON.stringify({
            "brand": $("input#brand").val(),
            "model": $("input#model").val(),
            "plate": $("input#plate").val(),
            "capacity": parseInt($("input#capacity").val()),
        }),
        success: function () {
            $("#vehicle-swipe").removeClass("active");
            $("#save-vehicle").removeClass("active");
            $("#vehicle-swipe input").val("");
            $("#overlay").fadeOut();
            $("#ads-swipe").removeClass("active");
            $("#success-title h1").text("Araç Oluşturuldu");
            $("#success-title p").text("Araç detaylarını Filo Yönetimi sayfası üzerinden görüntüleyebilirsiniz.");
            $("#success").fadeIn();
            $("#loading").fadeOut();
            getCrew();
        },
        error: function () {
            $("#vehicle-swipe").removeClass("active");
            $("#vehicle-swipe input").val("");
            $("#overlay").fadeOut();
            $("#error-title h1").text("Araç Oluşturulamadı");
            $("#error-title p").text("Lütfen daha sonra tekrar deneyin.");
            $("#error").fadeIn();
            $("#loading").fadeOut();
        }
    });
});
$("#save-member").click(function () {
    $("#loading").fadeIn();

    $.ajax({
        url: "https://api.bsp-academy.com/Personals",
        type: "POST",
        headers: {
            "Authorization": "bearer " + localStorage.getItem('token')
        },
        contentType: "application/json",
        data: JSON.stringify({
            "name": $("input#name").val(),
            "surname": $("input#surname").val(),
            "appellationId": $("select#appellation").val(),
        }),
        success: function () {
            $("#member-swipe").removeClass("active");
            $("#save-member").removeClass("active");
            $("#member-swipe input,select").val("");
            $("#overlay").fadeOut();
            $("#ads-swipe").removeClass("active");
            $("#success-title h1").text("Personel Oluşturuldu");
            $("#success-title p").text("Personel detaylarını Filo Yönetimi sayfası üzerinden görüntüleyebilirsiniz.");
            $("#success").fadeIn();
            $("#loading").fadeOut();
            getCrew();
        },
        error: function () {
            $("#member-swipe").removeClass("active");
            $("#member-swipe input").val("");
            $("#overlay").fadeOut();
            $("#error-title h1").text("Personel Oluşturulamadı");
            $("#error-title p").text("Lütfen daha sonra tekrar deneyin.");
            $("#error").fadeIn();
            $("#loading").fadeOut();
        }
    });
});