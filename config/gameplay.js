let player = new Player({
	name: "bambang",
	x: 100,
	y: 100,
	showCollider: false,
	showImage: true,

	spriteSheet: {
		config: {
			speed: {
				whileRunning: 5,
				whileWalking: 6,
				whileIdle: 8,
				whileBreaking: 8,
				whileCheatTeleport: 8, //if player is cheating to teleport then this is the delay
			},

			size: {
				//*16 * 16 default
				width: 16,
				height: 16,

				image: 20
			},

			collumns_value: {
				walk: {
					up: 8,
					down: 8,
					left: 8,
					right: 8,
				},

				idle: {
					cheatActivate: 7,
					normal: 82,
				},

				breakingBlock: 1,
			},
		},

		walk: {
			up: "assets/img/character/walk/up/walkUp.png",
			down: "assets/img/character/walk/down/walkDown.png",
			left: "assets/img/character/walk/left/walkLeft.png",
			right: "assets/img/character/walk/right/walkRight.png",
		},

		idle: {
			cheatActivate: "assets/img/character/idle/supersaiyan.png",
			normal: "assets/img/character/idle/characterIdle.png",
		},

		breakingBlock:
			"assets/img/character/breaking block/player_breakSomething.png",

		run: {
			up: "",
			down: "",
			left: "",
			right: "",
		},
	},

	size: 20,
	color: "black",
	cannot: {
		through: {
			window: true,
			collision: false, //!it's have a bug and i'll fix it later (if i can) but now just call it a features
		},
		Run_While_RegenStamina: false,
		move_while_open_inventory: true,
		collide_with: {
			inventoryDisplay: true,
			build_mode_button: true,
		},
	},

	speed: {
		walk: 2,
		run: 5,
	},

	// this is the shape collision of the player
	/* NOTE: so if you make all false it will become rectangle because it default -_- */
	shape: {
		circle: false,
		rectangle: true, //*default
		triangle: false,
	},

	stamina_regen: 0.5,
	stamina_Position: {
		Follow_player: false, //*default
		Sides: {
			top_Left: true,
			top_Right: false,
			bottom_Left: false,
			bottom_Right: false,
		},
	},

	damage: 0.1,
	inventoryDisplay: {
		followPlayer: true,
		canBe: {
			dragged: false, //!THIS IS HAVE A BUG WHERE WE CAN DUPLICATE ITEM
			//*just help me fix this bug
		},
	},
});

let mouse = {
	x: 0,
	y: 0,
};

let placeBlock_array = [];
let block_array = [];
let grass_array = [];

let developerMode = true;
