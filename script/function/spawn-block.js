function spawn_block() {
	requestAnimationFrame(spawn_block);

    for (let i = 0; i < block_array.length; i++) {
        block_array[i].draw();

        if (!player.build_mode) {
            block_array[i].text_draw();
        }
    }

    for (let i = 0; i < placeBlock_array.length; i++) {
        placeBlock_array[i].draw();

        if (!player.build_mode) {
            placeBlock_array[i].text_draw();
        }
    }
}
