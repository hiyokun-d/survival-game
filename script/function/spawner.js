function block_spawner(delay, maximum) {
	if (delay == undefined) {
		delay = 0;
	}

	if (maximum == undefined) {
		maximum = 5;
	}

	setInterval(function () {
		//*STONE
		if (block_array.length < maximum) {
			let x = Math.floor(Math.random() * canvas.width);
			let y = Math.floor(Math.random() * canvas.height);

			if (x < 0) {
				x = 0;
			} else if (x + 20 > canvas.width) {
				x = canvas.width;
			}

			if (y < 0) {
				y = 0;
			} else if (y + 20 > canvas.height) {
				y = canvas.height;
			}

			block_array.push(
				new Block({
					id: "cobblestone",
					type: "block",
					x: x,
					y: y,
					width: 20,
					height: 20,
					color: "gray",
					health: items[1].health,
					image: items[1].icon,
				})
			);
		}

		//*tree
		if (block_array.length < maximum) {
			let x = Math.floor(Math.random() * canvas.width);
			let y = Math.floor(Math.random() * canvas.height);

			if (x < 0) {
				x = 0;
			} else if (x + 20 > canvas.width) {
				x = canvas.width;
			}

			if (y < 0) {
				y = 0;
			} else if (y + 20 > canvas.height) {
				y = canvas.height;
			}

			block_array.push(
				new Block({
					id: "log",
					type: "block",
					x: x,
					y: y,
					width: 25,
					height: 30,
					color: "green",
					health: items[0].health,
					image: `assets/img/object/tree/tree.png`,
				})
			);
		}

		//*GRASS
		if (grass_array.length < 15) {
			let x = Math.floor(Math.random() * canvas.width);
			let y = Math.floor(Math.random() * canvas.height);

			if (x < 0) {
				x = 0;
			} else if (x + 20 > canvas.width) {
				x = canvas.width;
			}

			if (y < 0) {
				y = 0;
			} else if (y + 20 > canvas.height) {
				y = canvas.height;
			}

			// let width = Math.floor(Math.random() * 20) + 10;
			let height = Math.floor(Math.random() * 10 + 10);

			grass_array.push(new Grass(x, y, 5, height, {r: 0, g: 255, b: 0}));
		}
	}, delay * 1000);
}
