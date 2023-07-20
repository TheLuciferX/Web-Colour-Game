var repickColours = document.querySelector(".nc");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");
var boxes = document.querySelectorAll(".square");
var colourText = document.querySelector("h1");
var tryAgain = document.querySelector(".try-again");
var banner = document.querySelector(".bg-custom");
var diff = "hard";
var playing = true;

boxes.forEach(function(box) {
	box.available = true;
});
pickColours();

repickColours.addEventListener("mousedown", function() {
	repickColours.style.background = "#325f86";
});
repickColours.addEventListener("mouseup", function() {
	repickColours.style.background = "#4078a9";
});
repickColours.addEventListener("mouseenter", function() {
	repickColours.style.background = "#4078a9";
	repickColours.style.color = "#fff";
});
repickColours.addEventListener("mouseleave", function() {
	repickColours.style.background = "#fff";
	repickColours.style.color = "#4078a9";
});
repickColours.addEventListener("click", function() {
	for(var i = 0; i < 6; i++) { 
		if(diff === "easy") {
			if(i > 2) {
				boxes[i].style.background = "#1f1f1f";
				boxes[i].style.cursor = "default";
				boxes[i].available = false;
			} else {
				boxes[i].available = true;
				boxes[i].style.cursor = "pointer";
			}
		} else {
			boxes[i].style.background = "#fff";
			boxes[i].available = true;
			boxes[i].style.cursor = "pointer";
		}
	}
	pickColours();
});

boxes.forEach(function(box) {
	box.addEventListener("click", function() {
		if(playing) {
			if(this.available) {
				if(this.style.background === colourText.textContent) {
					repickColours.textContent = "Try Again?";
					tryAgain.textContent = "Correct!";
					tryAgain.style.color = "#000";
					winBoxes();
					playing = false;
				} else  {
					this.available = false;
					tryAgain.style.color = "#000";
					this.style.background = "#1f1f1f";
					this.style.cursor = "default";
					if (count() > 1) {
						tryAgain.textContent = "Try Again";
					} else {
						tryAgain.textContent = "You Lost";
						repickColours.textContent = "Try Again?";
						playing = false;
					}
				}
			}
		}
	});
});

function winBoxes() {
	banner.style.background = colourText.textContent;
	for(var i = 0; i < 6; i++) {
		if(i <= 2) {
			makeVisible(boxes[i]);
		}
		if(diff == "hard") {
			if(i >= 3) {
				makeVisible(boxes[i]);
			}
		}
	}
}

function makeVisible(box) {
	box.available = true;
	box.style.background = colourText.textContent;
	box.style.cursor = "pointer";
}

easy.addEventListener("click", function() {
	if(diff === "hard") {
		diff = "easy";
		this.classList.remove("text-custom");
		this.classList.add("text-custom-two");
		hard.classList.add("text-custom");
		hard.classList.remove("text-custom-two");
		for(var i = 0; i < 6; i++) { 
			if(i > 2) {
				boxes[i].style.background = "#1f1f1f";
				boxes[i].style.cursor = "default";
				boxes[i].available = false;
			} else {
				boxes[i].available = true;
				boxes[i].style.cursor = "pointer";
			}
			boxes[i].style.transition = "background 0.0s";
		}
		pickColours();
	}
});
hard.addEventListener("click", function() {
	if(diff === "easy") {
		diff = "hard";
		this.classList.remove("text-custom");
		this.classList.add("text-custom-two");
		easy.classList.add("text-custom");
		easy.classList.remove("text-custom-two");
		boxes.forEach(function(box) {
			box.style.background = "#fff";
			box.style.cursor = "pointer";
			box.available = true;
			box.style.transition = "background 0.0s";
		});
		pickColours();
	}
});
function pickColours() {
	tryAgain.style.color = "#fff";
	repickColours.textContent = "new colours"
	banner.style.background = "#4078a9";
	playing = true;
	boxes.forEach(function(box) {
		if(box.available) {
			change(box);
		}
	});
	changeText();
}
function change(box) {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	box.style.background = "RGB(" + r + ", " + g + ", " + b +")";
	box.style.transition = "background 2.0s";
}
function changeText() {
	var rnd = Math.floor(Math.random() * 6);
	colourText.textContent = boxes[rnd].style.background;
	while(!boxes[rnd].available) {
		rnd = Math.floor(Math.random() * 6);
		colourText.textContent = boxes[rnd].style.background;
	}
}
function count() {
	var n = 0;
	boxes.forEach(function(box) {
		n = box.available ? n+1 : n;
	});
	return n;
}