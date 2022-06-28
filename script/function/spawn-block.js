function spawn_block() {
	requestAnimationFrame(spawn_block);

	// for (let i = 0; i < block_array.length; i++) {
	//     block_array[i].draw();

	// if (!player.build_mode) {
	//     block_array[i].text_draw();
	// }
	// }

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
    })
}
