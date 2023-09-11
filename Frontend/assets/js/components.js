$(document).ready(function(){
    $("#loading").load("assets/components/loading.html");
    $("#success").load("assets/components/success.html", function(){
        $("#success-button a").click(function(){
            $("#success").fadeOut();
        });
    });
    $("#error").load("assets/components/error.html", function(){
        $("#error-button a").click(function(){
            $("#error").fadeOut();
        });
    });
});