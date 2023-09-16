function listOrders(orders) {
    $("#loading").fadeOut();
    if(orders.length == 0){
        $("#orders-content .order").remove();
    }
    else{
        $.each(orders, function (i, order) {
            if (i == 0) {
                $(".order").attr("data", order.id);
                $(".order").find(".order-status p").text(order.statuses.name);
                $(".order").find(".order-detail").attr("data", order.statuses.id);
                $(".order").find(".order-price p").text(order.price + " ₺");
                if (order.transports.isIntercity == false) {
                    $(".order").find($(".order-location")).text(order.transports.street.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + "-" + order.transports.toStreet.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + ", " + order.transports.street.towns.city.name);
                    $(".order").find($(".order-info h3")).text("Şehir İçi " + order.transports.category.name);
                }
                else {
                    $(".order").find($(".order-location")).text(order.transports.street.towns.city.name + "-" + order.transports.toStreet.towns.city.name);
                    $(".order").find($(".order-info h3")).text("Şehirler Arası " + order.transports.category.name);
                }
                $(".order").find(".order-vehicle").text(order.cars.brand + " " + order.cars.model);
                let driverCount = 0, workerCount = 0;
                for (let person of order.appPersonels) {
                    if (person.appellationId == 1) {
                        driverCount++;
                    }
                    else if (person.appellationId == 2) {
                        workerCount++;
                    }
                }
                $(".order").find(".order-crew").text(driverCount + " Şoför & " + workerCount + " İşçi");
                $(".order").find(".order-time").text(order.transportTime.substring(0,10));
                $(".order").find(".order-user h2").text(order.company.companyName);
                $(".order").find(".order-user p").text("@" + order.company.userName);
            }
            else {
                var newOrder = $(".order").first().clone();
    
                newOrder.attr("data", order.id);
                newOrder.find(".order-status p").text(order.statuses.name);
                newOrder.find(".order-detail").attr("data", order.statuses.id);
                newOrder.find(".order-price p").text(order.price + " ₺");
                if (order.transports.isIntercity == false) {
                    newOrder.find($(".order-location")).text(order.transports.street.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + "-" + order.transports.toStreet.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + ", " + order.transports.street.towns.city.name);
                    newOrder.find($(".order-info h3")).text("Şehir İçi" + order.transports.category.name);
                }
                else {
                    newOrder.find($(".order-location")).text(order.transports.street.towns.city.name + "-" + order.transports.toStreet.towns.city.name);
                    newOrder.find($(".order-info h3")).text("Şehirler Arası" + order.transports.category.name);
                }
                newOrder.find(".order-vehicle").text(order.cars.brand + " " + order.cars.model);
                let driverCount = 0, workerCount = 0;
                for (let person of order.appPersonels) {
                    if (person.appellationId == 1) {
                        driverCount++;
                    }
                    else if (person.appellationId == 2) {
                        workerCount++;
                    }
                }
                newOrder.find(".order-crew").text(driverCount + " Şoför & " + workerCount + " İşçi");
                newOrder.find(".order-time").text(order.transportTime.substring(0,10));
                newOrder.find(".order-user h2").text(order.company.companyName);
                newOrder.find(".order-user p").text("@" + order.company.userName);
    
                $("#orders-content").append(newOrder);
            }
        });
        
        let ID;
        $(".order-detail").click(function () {
            ID = $(this).parent(".order-button").parent(".order-features").parent(".order-content").parent(".order").attr("data");
            $("#orders-swipe").addClass("active");
            $(".swipe-option[data=" + $(this).attr("data") + "]").addClass("active");
            $("#overlay").fadeIn();
        });
        
        $(".swipe-option").click(function(){
            let statusID = $(this).attr("data");
            if(!$(this).hasClass("active")){
                $.ajax({
                    url: "https://api.bsp-academy.com/Application/UpdateStatus",
                    type: "POST",
                    headers: {
                        "Authorization": "bearer " + localStorage.getItem('token')
                    },
                    contentType: "application/json",
                    data: JSON.stringify({
                        "id": ID,
                        "statusId": statusID,
                    }),
                    success: function (sales) {
                        $("#success-title h1").text("");
                        $("#success-title p").text("Hesabınızla panele giriş yapabilirsiniz.");
                        $("#success-button a").attr("href", "login.html");
                        $("#success-button a").text("Giriş Yap");
                        $("#success").fadeIn();
                        $("#loading").fadeOut();
                        $(".form-input input").val("");
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
        });
    }
}

function ordersError() {
    $("#error-title h1").text("Hatalı İstek");
    $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
    $("#error").fadeIn();
    $("#loading").fadeOut();
}

$(document).ready(function () {
    $.ajax({
        url: "https://api.bsp-academy.com/Application/UserApprovalApplication",
        type: "GET",
        headers: {
            "Authorization": "bearer " + localStorage.getItem('token')
        },
        success: function (orders) {
            listOrders(orders);
        },
        error: function () {
            ordersError();
        }
    });

    $("#overlay").click(function () {
        $("#orders-swipe").removeClass("active");
    });
});