var defaultxMin, defaultxMax, defaultyMin, defaultyMax;
var xMin, xMax, yMin, yMax;
var zoomLevel;
var canvas, canvasWidth, canvasHeight, ctx;
var complex;
var nbIterations;
var palette;
var i, j;
var currentCompletion;

$(document).ready(function() {
	canvas = document.getElementById('canvas');
	canvasWidth  = canvas.width;
	canvasHeight = canvas.height;
	ctx = canvas.getContext('2d');

	defaultxMin = -3;
	defaultxMax = 3;
	defaultyMin = -1.5;
	defaultyMax = 1.5;

	nbIterations = 100;
	palette = [];

	generatePalette();

	//----------------------------------------//

	$("#zoomLevel").on('input', function() {
		$("#rangeValue").html($(this).val());
	})

	$("#fraktalForm").submit(function(e) {
		i = 0;
		j = 0;
		currentCompletion = 0;

		e.preventDefault();

		$("#fraktalForm").css("opacity", 0.2);
		$(".fraktalIntro").hide();
		$(".fraktalCanvas").hide();
		$(".fraktalLoading").show();
		$("#btn-dl").hide();

		getUserValues();

		setTimeout(dessinerFractale, 10);
	});

	$("#btn-dl").click(function() {
		downloadCanvas(this, "canvas", "Fraktal (" + complex.re + " - " + complex.im + ").png");
	})

});

function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

function generatePalette() {
    // Calculate a gradient
    var roffset = 24;
    var goffset = 16;
    var boffset = 0;
    for (var i=0; i<256; i++) {
        palette[i] = { r:roffset, g:goffset, b:boffset};

        if (i < 64) {
            roffset += 3;
        } else if (i<128) {
            goffset += 3;
        } else if (i<192) {
            boffset += 3;
        }
    }
}


function initDataInInputs() {
	$("#re").val(complex.re);
	$("#im").val(complex.im);
}

function getUserValues() {
	zoomLevel = $("#zoomLevel").val();

	xMin = defaultxMin / zoomLevel;
	xMax = defaultxMax / zoomLevel;
	yMin = defaultyMin / zoomLevel;
	yMax = defaultyMax / zoomLevel;

	let reel = parseFloat($("#re").val());
	let imaginaire = parseFloat($("#im").val());

	complex = math.complex(reel, imaginaire);
}

function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

function updateLoadingBar() {
	$("#loadingBar").width(Math.floor(i/canvas.width*100) + "%");
}

function dessinerFractale() {
	colorPixel(ctx, defineColorForPixel(i, j, complex), i, j);
	j++;

	if(j == canvas.height) {
		j = 0;
		i++;
	}

	if(i == canvas.width) {
		$(".fraktalCanvas").show();
		$("#btn-dl").show();
		$("#fraktalForm").css("opacity", 1);
		$(".fraktalLoading").hide();
		return;
	}

	if(currentCompletion < Math.floor(i/canvas.width*100)) {
		setTimeout(function() {
			currentCompletion = Math.floor(i/canvas.width*100);
			updateLoadingBar();
			dessinerFractale();
		}, 0)
	} else {
		dessinerFractale();
	}
}

function moduleComplex(complex) {
	return math.sqrt(math.multiply(complex.re, complex.re) + math.multiply(complex.im, complex.im));
}

function colorPixel(ctx, color, x, y) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, 1, 1);
}

function r() {
	return Math.floor(Math.random() * 255);
}

function pixelToComplex(x, y) {
	return math.complex(xMin + (x - 0) * ( (xMax - xMin) / (canvasWidth - 0) ), yMin + (y - 0) * ( (yMax - yMin) / (canvasHeight - 0) ) );
}

function complexToPixel(complex) {
	var coord = [];
	coord[0] = math.floor(0 + (complex.re - xMin) * ( (canvasWidth - 0) / (xMax - xMin) ));
	coord[y] = math.floor(0 + (complex.im - yMin) * ( (canvasHeight - 0) / (yMax - yMin) ));

	return coord;
}

function carreComplex(complex) {
	return math.complex(math.multiply(complex.re, complex.re) - math.multiply(complex.im, complex.im), 2*complex.re*complex.im);
}

function defineColorForPixel(x, y, c) {
	var compteur = 0;
	var u = pixelToComplex(x, y); //terme de la suite

	while(compteur < nbIterations && moduleComplex(u) < 2) {
		u = math.add(carreComplex(u), c);
		compteur++;
	}

	var color;
	if(compteur == nbIterations) {
		color = { r:0, g:0, b:0}; // Black
	} else {
		var index = Math.floor((compteur / (nbIterations-1)) * 255);
        color = palette[index];
	}

	return "rgba("+color.r+", "+color.g+", "+color.b+",1)";

}
