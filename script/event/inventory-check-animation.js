inventory_container.addEventListener("animationend", () => {
	if (!player.inventoryDisplay.open) {
		inventory_container.style.transition = "all 0.5s ease-in-out";
		inventory_container.style.display = "none";
	}
});
