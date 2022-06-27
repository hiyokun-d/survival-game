const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const inventory_container = document.getElementById("inventory-container");
const inventory_collumn = document.querySelectorAll(
	"#inventory-container .inventory-collumn"
);

const body = document.body;

const build_mode = document.getElementById("build-mode");
const build_mode_text = document.querySelector("#build-mode p")

const health_container = document.getElementById("health-container");
const health_block = document.querySelector("#health-container .health-block");

const inventory_display = document.getElementById("inventory-display");
const inventory_display_grid = document.getElementById("inventory-display-grid");
const inventory_display_collumns = document.querySelectorAll("#inventory-display-grid > .inventory-display-collumn");
let inventory_display_choosen = document.querySelector(".inventory-display-collumn.choosen")
