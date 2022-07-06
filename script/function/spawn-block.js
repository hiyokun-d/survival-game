function spawn_block() {
	grass_array.forEach((grass, index) => {
		grass.draw();
		grass.draw_shadow();
	});

	block_array.forEach(function (block) {
		block.draw();

		block.imageDraw();

		if (!player.build_mode) {
			block.text_draw();
		}

		if (block.x < -block.width) {
			block_array.splice(block_array.indexOf(block), 1);
		}
	});

	placeBlock_array.forEach(function (block) {
		block.draw();
		block.imageDraw();

		if (!player.build_mode) {
			block.text_draw();
		}

		if (block.x < -block.width) {
			placeBlock_array.splice(placeBlock_array.indexOf(block), 1);
		}
	});
}
