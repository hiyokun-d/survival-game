function break_block() {
	requestAnimationFrame(break_block);

	block_array.forEach(function (block, index) {
		if (block.isBreaking) {
			block.health -= player.damage;
		} /* else {
            if (block.health_back_default) {
                block.health = 20
            }
        } */

		if (block.health <= 0) {
			setTimeout(() => {
				block_array.splice(index, 1);
                console.log(`%c ${block.id} ${index} is dead`, "color:red; font-size:20px");
                player.addItem(block.id, block.add, block.type);
			}, 0);
		}
    });
    
    placeBlock_array.forEach(function (block, index) {
        if (block.isBreaking) {
            block.health -= player.damage;
        } /* else {
            if (block.health_back_default) {
                block.health = 20
            }
        } */

        if (block.health <= 0) {
            setTimeout(() => {
                placeBlock_array.splice(index, 1);
                console.log(`%c ${block.id} ${index} is dead`, "color:red; font-size:20px");
                player.addItem(block.id, block.add, block.type);
            }, 0);
        }
    })
}
