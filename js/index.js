$(function() {

var colorPicker = $("#cp2").colorpicker({
	format: "hex",
	horizontal: true,
	useAlpha: false
});

colorPicker.on("colorpickerCreate", function(e) {
	var tmp_color = $("#cp2").val();

	if (tmp_color == "") {
		tmp_color = "#a3a3a3";
		$("#cp2").val(tmp_color);
	}

	atualizaCards(tmp_color);
});

colorPicker.on("colorpickerChange", function(e) {
	atualizaCards(e.color.toHexString());
});

$("#cp1").on("change", function() {
	atualizaCards($("#cp2").val());
})

});

function atualizaCards(cor) {
	var tmp_porcentagem = $("#cp1").val(),
		tmp_count = -5;

	$(".square").css('background-color', cor);

	$(".card-color").each(function(index, val) {
		var tmp_opc = (tmp_porcentagem * tmp_count),
			tmp_new_color = LightenDarkenColor(cor, tmp_opc);

		if (tmp_opc < 0)
			var tmp_text = "Darken "+(tmp_count*-1);
		if (tmp_opc == 0)
			var tmp_text = "Original";
		if (tmp_opc > 0)
			var tmp_text = "Lighten "+(tmp_count*1);

		$(this).css('background-color', tmp_new_color);
		$(this).find(".card-body").html("<span class='mr-2 d-inline-block' style='width: 75px;'>"+tmp_text+"</span>"+tmp_new_color);

		tmp_count++;
	});
}

function LightenDarkenColor(col, amt) {
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
 	return (usePound?"#":"") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
    // return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}