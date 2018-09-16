<!DOCTYPE html>

<html>

<head>
	<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/5.1.2/math.min.js"></script>
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">

	<script src="fraktal.js"></script>
	<link rel="stylesheet" href="fraktal.css" />
</head>

<body>
	<div class="w3-container">
		<h1 class="w3-text-white w3-center w3-xlarge title">Fraktal with style</h1>
	</div>

	<!-- Container du dessin de la fractale -->
	<div class="w3-container fraktalDrawing">
		<div class="fraktalContent">
			<!-- Message d'introduction du site -->
			<div class="w3-container w3-text-white fraktalIntro">
				<h2 class="w3-center" id="welcomeTitle">Bienvenue sur Fraktal with style</h2>
				<p>
					Ici, il faut décrire ce que les gens peuvent faire avec le form en dessous :D
				</p>
			</div>

			<!-- canvas -->
			<div class="fraktalCanvas">
				<canvas id="canvas" width="1200" height="600">Si vous voyez ceci, mettez à jour ou changer de navigateur pour voir les fractales</canvas>
			</div>

			<!-- Message de loading -->
			<div class="w3-container w3-text-white fraktalLoading">
				<h2 class="w3-center" id="welcomeTitle">Dessin de la fractal en cours</h2>
				<p>
					Veuillez patienter
				</p>
				<div class="w3-light-grey">
					<div id="loadingBar" class="w3-container w3-grey" style="height:24px;width:0%;"></div>
				</div>
			</div>
		</div>

		<!-- Formulaire permettant de remplir les données concernant le dessin de la fractale -->
		<form class="w3-section fraktalForm" id="fraktalForm">

			<!-- Zoom -->
			<div class="w3-container">
				<span class="fraktalForm-desc">Niveau de zoom</span>
				<span class="fraktalForm-desc" id="zoomLevelDisplay">X<span id="rangeValue">1</span></span>
			</div>
			<div class="w3-container">
				<input class="w3-input fraktalForm-input" type="range" min="0.5" max="10" value="1" name="zoomLevel" id="zoomLevel" step="0.5" />
			</div>

			<!-- Partie réel du complexe -->
			<div class="w3-container w3-margin-top">
				<span class="fraktalForm-desc">Partie réelle</span>
			</div>
			<div class="w3-container">
				<input class="w3-input fraktalForm-input" type="number" step="any" name="re" id="re" value="0.285"/>
			</div>

			<!-- Partie imaginaire du complexe -->
			<div class="w3-container w3-margin-top">
				<span class="fraktalForm-desc">Partie imaginaire</span>
			</div>
			<div class="w3-container">
				<input class="w3-input fraktalForm-input" type="number" step="any" name="im" id="im" value="0.01"/>
			</div>

			<!-- Bouton pour tracer la fractale -->
			<div class="w3-margin-top">
				<button class="w3-btn w3-red" id="btn-draw">Tracer</button>
			</div>

			<div class="w3-margin-top">
				<a class="w3-btn w3-teal" type="button" id="btn-dl">Télécharger</a>
			</div>

		</form>

	</div>

</body>

</html>
