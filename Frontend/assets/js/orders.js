
function listOrders(orders) {
    let orderDetails;
    $("#loading").fadeOut();
    if(orders.length == 0){
        $("#orders-content .order").remove();
    }
    else{
        $.each(orders, function (i, order) {
            orderDetails = orders;
            if (i == 0) {
                $(".order").attr("data", order.id);
                $(".order").find(".order-status p").text(order.statuses.name);
                $(".order").find(".order-detail").attr("data", i);
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
                    if (person.personals.appellationId == 1) {
                        driverCount++;
                    }
                    else if (person.personals.appellationId == 2) {
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
                newOrder.find(".order-detail").attr("data", i);
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
                    if (person.personals.appellationId == 1) {
                        driverCount++;
                    }
                    else if (person.personals.appellationId == 2) {
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
            $(".swipe-option[data=" + $(this).attr("data") + "]").addClass("active");
            $("#orders-swipe").addClass("active");
            $("#overlay").fadeIn();
            
            $(".swipe-worker .swipe-item").remove();
            $(".swipe-comments .comment").not(".swipe-comments .comment:first").remove();
            $(".swipe-comments .comment:first .comment-rate i").removeClass("fa-solid").addClass("fa-regular");
            let detail = orderDetails[parseInt($(this).attr("data"))];
            if(detail.statuses.id == 5){
                $("#evaluate-order").addClass("active");
            }
            else{
                $("#evaluate-order").removeClass("active");
            }

            $("#evaluate-order").attr("data", detail.appPersonels[0].applicationId);
            $(".swipe").find(".swipe-status h2").text(detail.statuses.name);
            $(".swipe").find(".swipe-status").attr("data", detail.statuses.id);
            $(".swipe").find(".swipe-price h3").text(detail.price + " ₺");
            $(".swipe").find(".swipe-time h3").text(detail.transportTime.substring(0, 10));
            $(".swipe").find(".swipe-vehicle .swipe-name h3").text(detail.cars.brand + " " + detail.cars.model);
            $(".swipe").find(".swipe-vehicle .swipe-data:first p").text(detail.cars.plate);
            $(".swipe").find(".swipe-vehicle .swipe-data:last p").text(detail.cars.capacity);

            for (let member of detail.appPersonels) {
                if (member.personals.appellationId == 1) {
                    $(".swipe").find(".swipe-driver .swipe-name h3").text(member.personals.name + " " + member.personals.surname);
                }
                else if (member.personals.appellationId == 2) {
                    $(".swipe-worker").append(`<div class="swipe-item"><div class="swipe-name"><div class="swipe-icon"><i class="fa-regular fa-user-group"></i></div><h3>${member.personals.name} ${member.personals.surname}</h3></div></div>`)
                }
            }

            $("#evaluate-order").click(function(){
                let appId = parseInt($(this).attr("data"));
                if($(this).hasClass("active")){
                    $("#loading").fadeIn();
                    $("#customer").addClass("fixed");
                    $("#overlay").fadeOut();
                    $("#customer-content").load("rating.html", function(){
                        $("#loading").fadeOut();

                        $("#send-rate").click(function(){
                            if($(this).hasClass("active")){
                                if($("#rating-star h2").text() != "0.0" && $("#rating-comment textarea").val() != ""){
                                    $.ajax({
                                        url: "https://api.bsp-academy.com/Application/UpdateRates?appId=" + appId + "&rate=" + $("#rating-star h2").text().substring(0,1) + "&comment=" + $("#rating-comment textarea").val(),
                                        type: "POST",
                                        headers: {
                                            "Authorization": "bearer " + localStorage.getItem('token')
                                        },
                                        contentType: "application/json",
                                        data: JSON.stringify({
                                            "appId": appId,
                                            "rate": parseInt($("#rating-star h2").text().substring(0,1)),
                                            "comment": $("#rating-comment textarea").val()
                                        }),
                                        success: function(){
                                            $("#success-title h1").text("Değerlendirme İletildi");
                                            $("#success-title p").text("Sipariş hakkındaki değerlendirmeniz için teşekkür ederiz.");
                                            $("#success-button a").attr("href", "customer.html");
                                            $("#success-button a").text("Panele Dön");
                                            $("#success").fadeIn();
                                            $("#loading").fadeOut();
                                        },
                                        error: function(){
                                            $("#error-title h1").text("Değerlendirme İletilemedi");
                                            $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
                                            $("#error-button a").attr("href", "customer.html");
                                            $("#error-button a").text("Panele Dön");
                                            $("#error").fadeIn();
                                            $("#loading").fadeOut();
                                        }
                                    });
                                }
                            }
                        })
                    });
                }
            });
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