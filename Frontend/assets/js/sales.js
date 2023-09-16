



$(".sale-update").click(function(){
    $("#sales-swipe").addClass("active");
    $("#overlay").fadeIn();
});

$("#overlay").click(function () {
    $("#sales-swipe").removeClass("active");
});