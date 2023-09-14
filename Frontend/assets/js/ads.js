$.ajax({
    url: "https://api.bsp-academy.com/GetTransportsList",
    type: "GET",
    headers: {
        "Authorization": "bearer " + localStorage.getItem('token')
    },
    success: function (ads) {
        if(ads.length == 0){
            $(".ads").remove();
        }
        $.each(ads, function (i, ad) {
            if (i == 0) {
                $(".ad").attr("data", ad.transport.id);
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

                $("#ads-content").append(newAd);
            }
        });
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
