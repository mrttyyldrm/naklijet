$(document).ready(function(){
    $("#star-navigation i").click(function(){
        $("#star-navigation i").removeClass("fa-solid").addClass("fa-regular")
        for(let i = 1; i <= parseInt($(this).attr("data")); i++){
            $("#star-navigation i:nth-child(" + i + ")").removeClass("fa-regular").addClass("fa-solid");
        }
        $("#rating-star h2").text($(this).attr("data") + ".0");

        if($("#rating-star h2").text() != "0.0" && $("#rating-comment textarea").val() != ""){
            $("#send-rate").addClass("active");
        }
        else{
            $("#send-rate").removeClass("active");
        }
    });

    $("#rating-comment textarea").keyup(function(){
        if($("#rating-star h2").text() != "0.0" && $("#rating-comment textarea").val() != ""){
            $("#send-rate").addClass("active");
        }
        else{
            $("#send-rate").removeClass("active");
        }
    });
});