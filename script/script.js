function game() {
	//inventory display
	if (player.build_mode) {
		inventory_display.style.transform = "translateY(0px)";
		if (
			player.x < inventory_display.offsetLeft + inventory_display.offsetWidth &&
			player.x + player.width > inventory_display.offsetLeft &&
			player.y < inventory_display.offsetTop + inventory_display.offsetHeight &&
			player.y + player.height > inventory_display.offsetTop
		) {
			inventory_display.style.opacity = 0.5;

			player.inventoryDisplay.collide = true;
		} else {
			inventory_display.style.opacity = 1;
			player.inventoryDisplay.collide = false;
		}
	} else {
		inventory_display.style.transform = "translateY(70px)";
	}
	/* end of inventory display */

	//build mode
	if (player.inventory.items.length > 0) {
		build_mode.style.transform = "translateX(0px)";
		if (
			player.x < build_mode.offsetLeft + build_mode.offsetWidth &&
			player.x + player.width > build_mode.offsetLeft &&
			player.y < build_mode.offsetTop + build_mode.offsetHeight &&
			player.y + player.height > build_mode.offsetTop
		) {
			build_mode.style = `
			opacity: 0.5;
			transform: translateX(-50px);
		`;
		} else {
			build_mode.style = `
			transform: translateX(0px);
		`;
		}
	} else {
		player.build_mode = false;
		build_mode.style.transform = "translateX(60px)";
	}
		player.build_mode
			? (build_mode_text.innerText = "❌")
			: (build_mode_text.innerText = "🛠");
	/* end of build mode */
	
	player.draw(ctx);
	player.moving();
	player.Stamina_Mechanism();
}
