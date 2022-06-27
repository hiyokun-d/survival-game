inventory_display_collumns.forEach(function (collumn) {
	collumn.addEventListener("click", function () {
		inventory_display_choosen.classList.remove("choosen");
		this.classList.add("choosen");
		inventory_display_choosen = this;
	});
});
