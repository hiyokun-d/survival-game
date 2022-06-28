/* 
    NOTE: block type can be place also can be break
 */

let items = [
	//* 0
	{
		name: "log",
		type: "block",
		description: "A block of log",
		icon: "assets/img/object/logsTree/log.png",
		sound: "sound/wood.mp3",
		health: 20,
		add: 1,
		event: () => {
			placeBlock_array.push(
				new Block({
					id: `${items[0].name}`,
					type: `${items[0].type}`,
					x: mouse.x,
					y: mouse.y,
					width: 20,
					height: 20,
					color: "brown",
					health: items[0].health,
					image: `${items[0].icon}`,
				})
			);
		},
	},

	//* 1
	{
		name: "cobblestone",
		type: "block",
		description: "A block of cobblestone",
		icon: "assets/img/object/stone/stone.png",
		sound: "sound/stone.mp3",
		health: 35,
		add: 1,
		event: () => {
			placeBlock_array.push(
				new Block({
					id: `${items[1].name}`,
					type: `${items[1].type}`,
					x: mouse.x,
					y: mouse.y,
					width: 20,
					height: 20,
					color: "gray",
					health: items[1].health,
					image: `${items[1].icon}`,
				})
			);
		},
	},
];
