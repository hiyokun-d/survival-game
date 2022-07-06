function block_collide_each_other() {
	for (let i = 0; i < block_array.length; i++) {
		if (player.collision(block_array[i])) {
			if (player.cannot.through.collision) {
				if (player.x < block_array[i].x + block_array[i].width) {
					player.x = block_array[i].x - player.width + 0.1;
				} else if (
					player.x + player.width >
					block_array[i].x + block_array[i].width / 2
				) {
					player.x = block_array[i].x + block_array[i].width - 0.1;
				} else if (player.y < block_array[i].y) {
					player.y = block_array[i].y - player.height + 0.1;
				} else if (
					player.y + player.height >
					block_array[i].y + block_array[i].height
				) {
					player.y = block_array[i].y + block_array[i].height - 0.1;
				}
			}
		}

		block_array.forEach(function (block) {
			if (block_array[i].collide(block)) {
				if (block_array[i].x < block.x) {
					block_array[i].x = block.x - block_array[i].width - 51;
				} else if (block_array[i].x > block.x) {
					block_array[i].x = block.x + block.width + 51;
				} else if (block_array[i].y < block.y) {
					block_array[i].y = block.y - block_array[i].height - 51;
				} else if (block_array[i].y > block.y) {
					block_array[i].y = block.y + block.height + 51;
				}
			}

			// if it's collide with grass
			grass_array.forEach((grass, index) => {
				if (block_array[i].collide(grass)) {
					if (block_array[i].x < grass.x) {
						block_array[i].x = grass.x - block_array[i].width - 51;
					} else if (block_array[i].x > grass.x) {
						block_array[i].x = grass.x + grass.width + 51;
					} else if (block_array[i].y < grass.y) {
						block_array[i].y = grass.y - block_array[i].height - 51;
					} else if (block_array[i].y > grass.y) {
						block_array[i].y = grass.y + grass.height + 51;
					}
				}
			})
		});
	}

	for (let i = 0; i < placeBlock_array.length; i++) {
		if (player.collision(placeBlock_array[i])) {
			if (player.cannot.through.collision) {
				if (player.x < placeBlock_array[i].x) {
					player.x = placeBlock_array[i].x - player.width + 0.1;
				} else if (
					player.x + player.width >
					placeBlock_array[i].x + placeBlock_array[i].width
				) {
					player.x = placeBlock_array[i].x + placeBlock_array[i].width - 0.1;
				} else if (player.y < placeBlock_array[i].y) {
					player.y = placeBlock_array[i].y - player.height + 0.1;
				} else if (
					player.y + player.height >
					placeBlock_array[i].y + placeBlock_array[i].height
				) {
					player.y = placeBlock_array[i].y + placeBlock_array[i].height - 0.1;
				}
			}
		}
	}

}

