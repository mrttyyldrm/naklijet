alert($(this).parent(".claim-button").parent(".claim-features").parent(".claim-content").parent(".claim").attr("data"));
$.ajax({
    url: "https://api.bsp-academy.com/Application/GetRelations?id=" + $(this).parent(".claim-button").parent(".claim-features").parent(".claim-content").parent(".claim").attr("data"),
    type: "GET",
    headers: {
        "Authorization": "bearer " + localStorage.getItem('token')
    },
    success: function (offers) {
        console.log(offers);
        if(offers.length == 0){
            $(".offer").remove();
        }
        // $.each(offers, function (i, offer) {
        //     if (i == 0) {
        //         $(".claim").attr("data", claim.Transport.id);
        //     }
        //     else {
        //         var newClaim = $(".claim").first().clone();

        //         newClaim.attr("data", claim.Transport.id);
        //         newClaim.find(".claim-user h2").text(claim.Transport.appUser.name + " " + claim.Transport.appUser.surname);
        //         newClaim.find(".claim-user p").text(claim.Transport.appUser.userName);

        //         if (claim.isIntercity == false) {
        //             newClaim.find(".claim-location").text(claim.Transport.street.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + "-" + claim.Transport.toStreet.name.replace("Mahallesi", "Mah").replace("Caddesi", "Cad") + ", " + claim.Transport.street.towns.city.name);
        //             newClaim.find(".claim-info h3").text("Şehir İçi" + claim.Transport.category.name);
        //         }
        //         else {
        //             newClaim.find(".claim-location").text(claim.Transport.street.towns.city.name + "-" + claim.Transport.toStreet.towns.city.name);
        //             newClaim.find(".claim-info h3").text("Şehirler Arası" + claim.Transport.category.name);
        //         }

        //         newClaim.find(".claim-info h3").text(claim.Transport.category.name + " Talebi");
        //         newClaim.find(".claim-info p").text(claim.Transport.description);
        //         newClaim.find(".claim-weight").text("~" + claim.Transport.weight + " Desi");
        //         if (claim.Transport.isInsurances == true) {
        //             newClaim.find(".claim-insurance").text("Evet, istiyorum");
        //         }
        //         else {
        //             newClaim.find(".claim-insurance").text("Hayır, istemiyorum");
        //         }
        //         if (claim.Transport.isPackageHelpers == true) {
        //             newClaim.find(".claim-insurance").text("Evet, istiyorum");
        //         }
        //         else {
        //             newClaim.find(".claim-insurance").text("Hayır, istemiyorum");
        //         }
        //         if (claim.Transport.isPackageHelpers == true) {
        //             newClaim.find(".claim-packaging").text("Evet, istiyorum");
        //         }
        //         else {
        //             newClaim.find(".claim-packaging").text("Hayır, istemiyorum");
        //         }
        //         newClaim.find(".claim-carrying").text(claim.Transport.howCarries.name);
        //         newClaim.find(".claim-big").text(claim.Transport.bigitemCount);
        //         newClaim.find(".claim-mid").text(claim.Transport.miditemCount);
        //         newClaim.find(".claim-small").text(claim.Transport.smallitemCount);
        //         newClaim.find(".claim-offers p").text(claim.offers + " Teklif");

        //         $("#claims-content").append(newClaim);
        //     }
        // });
        $("#loading").fadeOut();

    },
    error: function () {
        $("#error-title h1").text("Hatalı İstek");
        $("#error-title p").text("Talebiniz gerçekleştirilemedi. Lütfen daha sonra tekrar deneyiniz.");
        $("#error-button a").attr("href", "customer.html");
        $("#error-button a").text("Panele Dön");
        $("#error").fadeIn();
        $("#loading").fadeOut();
    }
});