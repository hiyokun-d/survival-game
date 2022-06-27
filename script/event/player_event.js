addEventListener("keydown", (e) => {
	if (e.keyCode === keys.a) {
		player.move.left = true;
		if (e.shiftKey && !player.isRegen) {
			player.isRunning = true;
		}
	}

	if (e.keyCode === keys.d) {
		player.move.right = true;
		if (e.shiftKey && !player.isRegen) {
			player.isRunning = true;
		}
	}

	if (e.keyCode === keys.w) {
		player.move.top = true;
		if (e.shiftKey && !player.isRegen) {
			player.isRunning = true;
		}
	}

	if (e.keyCode === keys.s) {
		player.move.bottom = true;
		if (e.shiftKey && !player.isRegen) {
			player.isRunning = true;
		}
	}

	if (player.inventoryDisplay.open) {
		if (e.keyCode === keys.e) {
			player.inventoryDisplay.open = false;
		}
	} else {
		if (e.keyCode === keys.e) {
			player.inventoryDisplay.open = true;
		}
	}

	//we click shift + b to toggle build mode
	if (e.keyCode === keys.b && e.shiftKey) {
		if (player.build_mode) {
			player.build_mode = false;
			build_mode_text.innerHTML = "🛠";
			build_mode.className = build_mode.className.replace("on", "off");
			console.clear();
		} else {
			if (player.inventory.items.length > 0) {
				console.info("%c build mode🛠", "color:orange; font-size:10px");
				build_mode.className = build_mode.className.replace("off", "on");
				build_mode_text.innerHTML = "❌";
				player.build_mode = true;
			}
		}
	}
});

addEventListener("keyup", (e) => {
	if (e.shiftKey) {
		player.isRunning = false;
	} else {
		player.isRunning = false;
	}

	if (e.keyCode === keys.a) {
		player.move.left = false;
	}

	if (e.keyCode === keys.d) {
		player.move.right = false;
	}

	if (e.keyCode === keys.w) {
		player.move.top = false;
	}

	if (e.keyCode === keys.s) {
		player.move.bottom = false;
	}
});

canvas.addEventListener("mousedown", (e) => {
	if (!player.build_mode) {
		block_array.forEach((block) => {
			if (player.collision(block)) {
				block.isBreaking = true;
			} else {
				block.isBreaking = false;
			}
		});

		placeBlock_array.forEach((block) => {
			if(player.collision(block)) {
				block.isBreaking = true;
			} else {
				block.isBreaking = false
			}
		})
	}
});

canvas.addEventListener("click", (e) => {
	if (player.build_mode) {
		if (!player.putblock) {
			player.putblock = true;
		}
	}
});

canvas.addEventListener("mouseup", (e) => {
	block_array.forEach((block) => {
		if (player.collision(block)) {
			block.isBreaking = false;
		} else {
			block.isBreaking = false;
		}
	});

	placeBlock_array.forEach((block) => {
		if(player.collision(block)) {
			block.isBreaking = false;
		} else {
			block.isBreaking = false
		}
	})
});
