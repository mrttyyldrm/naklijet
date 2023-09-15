function showError(){
    $("#error-title h1").text("Hatalı İstek");
    $("#error-title p").text("Talebiniz gerçekleştirilemedi. Lütfen daha sonra tekrar deneyiniz.");
    $("#error-button a").attr("href", "customer.html");
    $("#error-button a").text("Panele Dön");
    $("#error").fadeIn();
    $("#loading").fadeOut();
}

$.ajax({
    url: "https://api.bsp-academy.com/GetList",
    type: "GET",
    headers: {
        "Authorization": "bearer " + localStorage.getItem('token')
    },
    success: function (claims) {
        if(claims.length == 0){
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

                $("#claims-content").append(newClaim);
            }
        });
        $("#loading").fadeOut();

        $(".claim-delete").click(function () {
            let deleteID = $(this).parent(".claim-button").parent(".claim-title").parent(".claim").attr("data"); 
            $("#loading").fadeIn();
            $.ajax({
                url: "https://api.bsp-academy.com/" + deleteID,
                type: "DELETE",
                headers: {
                    "Authorization": "bearer " + localStorage.getItem('token')
                },
                success: function(){
                    $(".claim[data=" + deleteID + "]").remove();
                    $("#success-title h1").text("Talebiniz Silindi");
                    $("#success-title p").text("Talebiniz başarıyla talep listenizden kaldırıldı.");
                    $("#success").fadeIn();
                    $("#loading").fadeOut();
                },
                error: function(){
                    $("#error-title h1").text("Talebiniz Silinemedi");
                    $("#error-title p").text("Lütfen daha sonra tekrar deneyiniz.");
                    $("#error").fadeIn();
                    $("#loading").fadeOut();
                }
            });
        });

        $(".see-offers").click(function(){
            $("#loading").fadeIn();
            let claimID = $(this).parent(".claim-button").parent(".claim-features").parent(".claim-content").parent(".claim").attr("data");
            setTimeout(function(){
                $("#customer-content").load("offers.html", function(){
                    $.ajax({
                        url: "https://api.bsp-academy.com/Application/GetRelations?id=" + claimID,
                        type: "GET",
                        headers: {
                            "Authorization": "bearer " + localStorage.getItem('token')
                        },
                        success: function (offers) {
                            if(offers.length == 0){
                                $(".offer").remove();
                            }
                            $.each(offers, function (i, offer) {
                                if (i == 0) {
                                    $(".offer").find(".offer-company h2").text(offer.application.company.companyName);
                                    $(".offer").find(".offer-company p").text("@" + offer.application.company.userName);
                                    $(".offer").find(".offer-price p").text(offer.application.price + " TL");
                                    $(".offer").find(".offer-vehicle").text(offer.application.cars.brand + " " + offer.application.cars.model);
                                    
                                    let driverCount=0, workerCount=0;
                                    for(let person of offer.application.appPersonels){
                                        if(person.personals.appellationId == 1){
                                            driverCount++;
                                        }
                                        else if(person.personals.appellationId == 2){
                                            workerCount++;
                                        }
                                    }
                                    $(".offer").find(".offer-crew").text(driverCount + " Şoför & " + workerCount + " İşçi");
                                    $(".offer").find(".offer-time").text(offer.application.companyTransportTime + " Gün");
                                }
                                else {
                                    var newOffer = $(".offer").first().clone();
                                    newOffer.find(".offer-company h2").text(offer.application.company.companyName);
                                    newOffer.find(".offer-company p").text("@" + offer.application.company.userName);
                                    newOffer.find(".offer-price p").text(offer.application.price + " TL");
                                    newOffer.find(".offer-vehicle").text(offer.application.cars.brand + " " + offer.application.cars.model);
                                   
                                    let driverCount=0, workerCount=0;
                                    for(let person of offer.application.appPersonels){
                                        if(person.personals.appellationId == 1){
                                            driverCount++;
                                        }
                                        else if(person.personals.appellationId == 2){
                                            workerCount++;
                                        }
                                    }
                                    newOffer.find(".offer-crew").text(driverCount + " Şoför & " + workerCount + " İşçi");
                                    newOffer.find(".offer-time").text(offer.application.companyTransportTime + " Gün");
    
                                    $("#offers-content").append(newOffer);
                                }
                            });
                            $("#loading").fadeOut();
                        },
                        error: function () {
                            showError();
                        }
                    });
                });
            }, 750);
        });
    },
    error: function () {
        showError();
    }
});
