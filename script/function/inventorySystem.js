function inventorySystem() {
	let x = player.x + 20;
	let y = player.y - 150;

	if (x < 0) {
		x = 0;
	}

	if (x + inventory_container.offsetWidth > canvas.width) {
		x = player.x - 220;
	}

	if (y < 0) {
		y = 1;
	}

	if (player.inventoryDisplay.open) {
		inventory_container.style.display = "grid";
		inventory_container.style.animation =
			"open-up 0.5s ease-in-out forwards 0s 1 normal";

		if (player.cannot.move_while_open_inventory) {
			player.move.canMove = false;
		} else {
			player.move.canMove = true;
		}

		if (player.inventoryDisplay.followPlayer) {
			inventory_container.style.transform = `translate(${x}px, ${y}px)`;
		}
	} else {
		player.move.canMove = true;
		inventory_container.style.animation =
			"close-up 1s cubic-bezier(1, -0.7, 0.55, 0.9) forwards 0s 1 normal";
	}

}

