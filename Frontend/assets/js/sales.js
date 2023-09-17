function listSales(sales) {
    $("#loading").fadeOut();
    if(sales.length == 0){
        $("#sales-content .sale").remove();
    }
    else{
        $("#sales-content .sale").not("#sales-content .sale:first").remove();
        $.each(sales, function (i, sale) {
            if (i == 0) {
                $(".sale").attr("data", sale.id);
                $(".sale").find(".sale-status p").text(sale.statuses.name);
                $(".sale").find(".sale-update").attr("data", sale.statuses.id);
                $(".sale").find(".sale-price p").text(sale.price + " ₺");
                if (sale.transports.isIntercity == false) {
                    $(".sale").find($(".sale-location")).text(sale.transports.street.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + "-" + sale.transports.toStreet.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + ", " + sale.transports.street.towns.city.name);
                    $(".sale").find($(".sale-info h3")).text("Şehir İçi " + sale.transports.category.name);
                }
                else {
                    $(".sale").find($(".sale-location")).text(sale.transports.street.towns.city.name + "-" + sale.transports.toStreet.towns.city.name);
                    $(".sale").find($(".sale-info h3")).text("Şehirler Arası " + sale.transports.category.name);
                }
                $(".sale").find(".sale-vehicle").text(sale.cars.brand + " " + sale.cars.model);
                let driverCount = 0, workerCount = 0;
                for (let person of sale.appPersonels) {
                    if (person.personals.appellationId == 1) {
                        driverCount++;
                    }
                    else if (person.personals.appellationId == 2) {
                        workerCount++;
                    }
                }
                $(".sale").find(".sale-crew").text(driverCount + " Şoför & " + workerCount + " İşçi");
                $(".sale").find(".sale-time").text(sale.transportTime.substring(0,10));
                $(".sale").find(".sale-user h2").text(sale.transports.appUser.name + " " + sale.transports.appUser.surname);
                $(".sale").find(".sale-user p").text("@" + sale.transports.appUser.userName);
            }
            else {
                var newSale = $(".sale").first().clone();
    
                newSale.attr("data", sale.id);
                newSale.find(".sale-status p").text(sale.statuses.name);
                newSale.find(".sale-update").attr("data", sale.statuses.id);
                newSale.find(".sale-price p").text(sale.price + " ₺");
                if (sale.transports.isIntercity == false) {
                    newSale.find($(".sale-location")).text(sale.transports.street.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + "-" + sale.transports.toStreet.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + ", " + sale.transports.street.towns.city.name);
                    newSale.find($(".sale-info h3")).text("Şehir İçi" + sale.transports.category.name);
                }
                else {
                    newSale.find($(".sale-location")).text(sale.transports.street.towns.city.name + "-" + sale.transports.toStreet.towns.city.name);
                    newSale.find($(".sale-info h3")).text("Şehirler Arası" + sale.transports.category.name);
                }
                newSale.find(".sale-vehicle").text(sale.cars.brand + " " + sale.cars.model);
                let driverCount = 0, workerCount = 0;
                for (let person of sale.appPersonels) {
                    if (person.personals.appellationId == 1) {
                        driverCount++;
                    }
                    else if (person.personals.appellationId == 2) {
                        workerCount++;
                    }
                }
                newSale.find(".sale-crew").text(driverCount + " Şoför & " + workerCount + " İşçi");
                newSale.find(".sale-time").text(sale.transportTime.substring(0,10));
                newSale.find(".sale-user h2").text(sale.transports.appUser.name + " " + sale.transports.appUser.surname);
                newSale.find(".sale-user p").text("@" + sale.transports.appUser.userName);
    
                $("#sales-content").append(newSale);
            }
        });

        let ID;
        $(".sale-update").click(function () {
            ID = $(this).parent(".sale-button").parent(".sale-features").parent(".sale-content").parent(".sale").attr("data");
            $("#sales-swipe").addClass("active");
            $(".swipe-option[data=" + $(this).attr("data") + "]").addClass("active");
            $("#overlay").fadeIn();
        });
        
        $(".swipe-option").click(function(){
            if(!$(this).hasClass("active")){
                let statusID = $(this).attr("data");
                $("#loading").fadeIn();
                $.ajax({
                    url: "https://api.bsp-academy.com/Application/UpdateStatus?id=" + ID + "&statusId=" + statusID,
                    type: "GET",
                    headers: {
                        "Authorization": "bearer " + localStorage.getItem('token')
                    },
                    success: function (sales) {
                        $("#success-title h1").text("Satış Güncellendi");
                        $("#success-title p").text("Satış durumunuz hakkındaki son durumu Satışlarım üzerinden inceleyebilirsiniz.");
                        $("#success").fadeIn();
                        $("#loading").fadeOut();
                        $("#sales-swipe").removeClass("active");
                        $("#overlay").fadeOut();
                        getApplication();
                        $(".swipe-option").removeClass("active");
                    },
                    error: function () {
                        $("#error-title h1").text("Satış Güncellenemedi");
                        $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
                        $("#error").fadeIn();
                        $("#loading").fadeOut();
                        $("#sales-swipe").removeClass("active");
                        $("#overlay").fadeOut();
                        $(".swipe-option").removeClass("active");
                    }
                });
            }
        });
    }
}

function getApplication(){
    $.ajax({
        url: "https://api.bsp-academy.com/Application/ApprovalApplication",
        type: "GET",
        headers: {
            "Authorization": "bearer " + localStorage.getItem('token')
        },
        success: function (sales) {
            listSales(sales);
        },
        error: function () {
            salesError();

            $(".swipe-option").click(function(){
                if(!$(this).hasClass("active")){
                    
                }
            });
        }
    });
}

function salesError() {
    $("#error-title h1").text("Hatalı İstek");
    $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
    $("#error").fadeIn();
    $("#loading").fadeOut();
}

$(document).ready(function () {
    getApplication();

    $(".sale-update").click(function () {
        $("#sales-swipe").addClass("active");
        $("#overlay").fadeIn();
    });

    $("#overlay").click(function () {
        $("#sales-swipe").removeClass("active");
    });
});