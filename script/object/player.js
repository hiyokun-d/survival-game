class Player {
	constructor({
		name = "budi",
		x,
		y,
		size,
		color,
		showCollider = false,
		showImage = false,
		spriteSheet = {
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

			config: {
				speed: {
					whileRunning: 5,
					whileWalking: 6,
					whileIdle: 8,
					whileBreaking: 8,
					whileCheatTeleport: 8,
				},

				size: {
					width: 16,
					height: 16,

					image: {
						width: 32,
						height: 32,
					},
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

					breakingBlock: 3,
				},
			},
		},

		speed = {
			walk: 5,
			run: 5,
		},
		move = {
			left: false,
			top: false,
			right: false,
			bottom: false,
			canMove: true,
		},
		cannot = {
			through: { window: true, collision: true },
			Run_While_RegenStamina: false,
			move_while_open_inventory: false,
			collide_with: {
				inventoryDisplay: true,
				build_mode_button: true,
			},
		},
		shape = { circle: false, rectangle: true, triangle: false },
		maxStamina = 100,
		stamina_regen = 1,
		stamina_cooldown = 2000,
		stamina_reduce = 1.2,
		stamina_Position = {
			Follow_player: true,
			Sides: {
				top_Left: false,
				top_Right: false,
				bottom_Left: false,
				bottom_Right: false,
			},
		},
		damage = 1,
		inventory = {
			items: [],
			maxItems: 10,
		},
		inventoryDisplay = {
			followPlayer: true,
			open: false,
			canBe: {
				dragged: true,
			},
			collide,
		},
		putblock = false,
		build_mode = false,
	}) {
		this.spriteSheet = spriteSheet;
		this.showCollider = showCollider;
		this.showImage = showImage;
		this.gameFrame = 0;

		this.x = x;
		this.y = y;
		this.shape = shape;
		if (shape.rectangle && shape.triangle) {
			this.height = size;
			this.width = size;
		} else if (shape.circle) {
			this.radius = size;
		} else {
			this.width = size;
			this.height = size;
		}

		this.color = color;
		this.speed_config = speed;
		this.speed = {
			x: speed.walk,
			y: speed.walk,
		};
		this.move = move;
		this.cannot = cannot;
		this.isRunning = false;

		this.build_mode = build_mode;
		this.inventory = inventory;
		this.name = name;
		this.inventoryDisplay = inventoryDisplay;

		/* stamina */
		this.maxStamina = maxStamina;
		this.stamina = maxStamina;
		this.stamina_regen = stamina_regen;
		this.stamina_cooldown = stamina_cooldown;
		this.stamina_reduce = stamina_reduce;
		this.isRegen = false;
		this.stamina_Position = stamina_Position;
		this.damage = damage;
		/* end of stamina */

		this.putblock = putblock;

		this.collums_value = this.spriteSheet.config.collumns_value.idle.normal;
		this.timeCollums = this.spriteSheet.config.speed.whileIdle;
		this.spriteImage = new Image();
	}

	draw(ctx) {
		if (this.showCollider) {
			if (this.shape.circle) {
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
				ctx.fillStyle = this.color;
				ctx.fill();
			} else if (this.shape.rectangle) {
				ctx.fillStyle = this.color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
			} else if (this.shape.triangle) {
				ctx.beginPath();
				ctx.moveTo(this.x, this.y);
				ctx.lineTo(this.x + this.width, this.y);
				ctx.lineTo(this.x + this.width / 2, this.y + this.height);
				ctx.fillStyle = this.color;
				ctx.fill();
			} else {
				ctx.fillStyle = this.color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
		}

		if (this.showImage) {
			this.drawSpriteSheet();
		}
	}

	drawSpriteSheet() {
		this.position =Math.floor(this.gameFrame / this.timeCollums) % this.collums_value;
		this.collums = this.position * this.spriteSheet.config.size.width;

		if (
			!this.move.left &&
			!this.move.right &&
			!this.move.top &&
			!this.move.bottom
		) {
			this.spriteImage.src = this.spriteSheet.idle.normal;
			this.collums_value = this.spriteSheet.config.collumns_value.idle.normal;
			this.timeCollums = this.spriteSheet.config.speed.whileIdle;
		}
		
		if (this.move.left) {
			this.spriteImage.src = this.spriteSheet.walk.left;
			this.collums_value = this.spriteSheet.config.collumns_value.walk.left;
			this.timeCollums = this.spriteSheet.config.speed.whileWalking;
		}

		if (this.move.right) {
			this.spriteImage.src = this.spriteSheet.walk.right;
			this.collums_value = this.spriteSheet.config.collumns_value.walk.right;
			this.timeCollums = this.spriteSheet.config.speed.whileWalking;
		}

		if (this.move.top) {
			this.spriteImage.src = this.spriteSheet.walk.up;
			this.collums_value = this.spriteSheet.config.collumns_value.walk.up;
			this.timeCollums = this.spriteSheet.config.speed.whileWalking;
		}

		if (this.move.bottom) {
			this.spriteImage.src = this.spriteSheet.walk.down
			this.collums_value = this.spriteSheet.config.collumns_value.walk.down;
			this.timeCollums = this.spriteSheet.config.speed.whileWalking;
		}

		this.gameFrame++;

		// make the image smooth
		ctx.imageSmoothingEnabled = true;

			ctx.drawImage(
				this.spriteImage,
				this.collums,
				0,
				this.spriteSheet.config.size.width,
				this.spriteSheet.config.size.height,
				this.x,
				this.y,
				this.width,
				this.height
				);

	}

	Stamina_Mechanism() {
		if (this.stamina_Position.Follow_player) {
			this.staminaPosition = {
				x: this.x,
				y: this.y - 10,
				width: this.stamina,
				height: 5,
			};

			if (this.isRunning) {
				ctx.fillStyle = "red";
				ctx.fillRect(
					this.staminaPosition.x,
					this.staminaPosition.y,
					this.staminaPosition.width,
					this.staminaPosition.height
				);
			} else {
				if (this.isRegen) {
					ctx.fillStyle = "green";
					ctx.fillRect(
						this.staminaPosition.x,
						this.staminaPosition.y,
						this.staminaPosition.width,
						this.staminaPosition.height
					);
				}
			}
		} else if (this.stamina_Position.Sides.top_Left) {
			this.staminaPosition = {
				x: 0,
				y: 0,
				width: this.stamina,
				height: 10,
			};

			if (
				this.staminaPosition.x < this.x + this.width &&
				this.staminaPosition.x + this.staminaPosition.width > this.x &&
				this.staminaPosition.y < this.y + this.height &&
				this.staminaPosition.y + this.staminaPosition.height > this.y
			) {
				this.staminaPosition.y = this.y + this.height + 10;
			}

			ctx.fillStyle = "orange";
			ctx.fillRect(
				this.staminaPosition.x,
				this.staminaPosition.y,
				this.staminaPosition.width,
				this.staminaPosition.height
			);
		} else if (this.stamina_Position.Sides.top_Right) {
			this.staminaPosition = {
				x: canvas.width - this.stamina,
				y: 0,
				width: this.stamina,
				height: 10,
			};

			if (
				this.staminaPosition.x < this.x + this.width &&
				this.staminaPosition.x + this.staminaPosition.width > this.x &&
				this.staminaPosition.y < this.y + this.height &&
				this.staminaPosition.y + this.staminaPosition.height > this.y
			) {
				this.staminaPosition.y = this.y + this.height + 10;
			}

			ctx.fillStyle = "orange";
			ctx.fillRect(
				this.staminaPosition.x,
				this.staminaPosition.y,
				this.staminaPosition.width,
				this.staminaPosition.height
			);
		} else if (this.stamina_Position.Sides.bottom_Left) {
			this.staminaPosition = {
				x: 0,
				y: canvas.height - 10,
				width: this.stamina,
				height: 10,
			};

			if (
				this.staminaPosition.x < this.x + this.width &&
				this.staminaPosition.x + this.staminaPosition.width > this.x &&
				this.staminaPosition.y < this.y + this.height &&
				this.staminaPosition.y + this.staminaPosition.height > this.y
			) {
				this.staminaPosition.y = this.y - 10;
			}

			ctx.fillStyle = "orange";
			ctx.fillRect(
				this.staminaPosition.x,
				this.staminaPosition.y,
				this.staminaPosition.width,
				this.staminaPosition.height
			);
		} else if (this.stamina_Position.Sides.bottom_Right) {
			this.staminaPosition = {
				x: canvas.width - this.stamina,
				y: canvas.height - 10,
				width: this.stamina,
				height: 10,
			};

			if (
				this.staminaPosition.x < this.x + this.width &&
				this.staminaPosition.x + this.staminaPosition.width > this.x &&
				this.staminaPosition.y < this.y + this.height &&
				this.staminaPosition.y + this.staminaPosition.height > this.y
			) {
				this.staminaPosition.y = this.y - 10;
			}

			ctx.fillStyle = "orange";
			ctx.fillRect(
				this.staminaPosition.x,
				this.staminaPosition.y,
				this.staminaPosition.width,
				this.staminaPosition.height
			);
		} else {
			this.staminaPosition = {
				x: this.x,
				y: this.y - 10,
				width: this.stamina,
				height: 5,
			};

			if (this.isRunning) {
				ctx.fillStyle = "red";
				ctx.fillRect(
					this.staminaPosition.x,
					this.staminaPosition.y,
					this.staminaPosition.width,
					this.staminaPosition.height
				);
			} else {
				if (this.isRegen) {
					ctx.fillStyle = "green";
					ctx.fillRect(
						this.staminaPosition.x,
						this.staminaPosition.y,
						this.staminaPosition.width,
						this.staminaPosition.height
					);
				}
			}
		}

		if (this.staminaPosition.x + this.staminaPosition.width > canvas.width) {
			this.staminaPosition.x = canvas.width - this.staminaPosition.width;
		}

		if (this.staminaPosition.y < 0) {
			this.staminaPosition.y = this.y + 5;
			this.staminaPosition.x = this.x + 20;
		}

		if (this.isRunning) {
			// reduce stamina
			this.stamina -= this.stamina_reduce;
			if (this.stamina < 0) {
				this.stamina = 0;
			}
		} else {
			setTimeout(() => {
				if (this.stamina <= this.maxStamina && !this.isRunning) {
					if (!this.cannot.Run_While_RegenStamina) {
						this.isRegen = true;
					} else {
						this.isRegen = false;
					}
					this.stamina += this.stamina_regen;

					if (this.stamina >= this.maxStamina) {
						this.stamina = this.maxStamina;
						this.isRegen = false;
					}
				} else {
					this.isRegen = false;
				}
			}, this.stamina_cooldown);
		}
	}

	moving() {
		if (this.move.canMove) {
			if (this.isRunning && this.stamina >= 0.01 && !this.isRegen) {
				this.speed = {
					x: this.speed_config.run,
					y: this.speed_config.run,
				};
			} else {
				this.speed = {
					x: this.speed_config.walk,
					y: this.speed_config.walk,
				};
			}

			if (this.shape.rectangle) {
				if (this.move.left) {
					this.x -= this.speed.x;
				}

				if (this.move.right) {
					this.x += this.speed.x;
				}

				if (this.move.top) {
					this.y -= this.speed.y;
				}

				if (this.move.bottom) {
					this.y += this.speed.y;
				}

				if (this.cannot.through.window) {
					if (this.x < 0) {
						this.isRunning = false;
						this.x = 0;
					}

					if (this.y < 0) {
						this.isRunning = false;
						this.y = 0;
					}

					if (this.x + this.width > canvas.width) {
						this.isRunning = false;
						this.x = canvas.width - this.width;
					}

					if (this.y + this.height > canvas.height) {
						this.isRunning = false;
						this.y = canvas.height - this.height;
					}
				}
			} else if (this.shape.circle) {
				if (this.move.left) {
					this.x -= this.speed.x;
				}

				if (this.move.right) {
					this.x += this.speed.x;
				}

				if (this.move.top) {
					this.y -= this.speed.y;
				}

				if (this.move.bottom) {
					this.y += this.speed.y;
				}

				if (this.cannot.through.window) {
					if (this.x - this.radius < 0) {
						this.isRunning = false;
						this.x = this.radius;
					}

					if (this.y - this.radius < 0) {
						this.isRunning = false;
						this.y = this.radius;
					}

					if (this.x + this.radius > canvas.width) {
						this.isRunning = false;
						this.x = canvas.width - this.radius;
					}

					if (this.y + this.radius > canvas.height) {
						this.isRunning = false;
						this.y = canvas.height - this.radius;
					}
				}
			} else if (this.shape.triangle) {
				if (this.move.left) {
					this.x -= this.speed.x;
				}

				if (this.move.right) {
					this.x += this.speed.x;
				}

				if (this.move.top) {
					this.y -= this.speed.y;
				}

				if (this.move.bottom) {
					this.y += this.speed.y;
				}

				if (this.cannot.through.window) {
					if (this.x < 0) {
						this.isRunning = false;
						this.x = 0;
					}

					if (this.y < 0) {
						this.isRunning = false;
						this.y = 0;
					}

					if (this.x + this.width > canvas.width) {
						this.isRunning = false;
						this.x = canvas.width - this.width;
					}

					if (this.y + this.height > canvas.height) {
						this.isRunning = false;
						this.y = canvas.height - this.height;
					}
				}
			} else {
				if (this.move.left) {
					this.x -= this.speed.x;
				}

				if (this.move.right) {
					this.x += this.speed.x;
				}

				if (this.move.top) {
					this.y -= this.speed.y;
				}

				if (this.move.bottom) {
					this.y += this.speed.y;
				}

				if (this.cannot.through.window) {
					if (this.x < 0) {
						this.isRunning = false;
						this.x = 0;
					}

					if (this.y < 0) {
						this.isRunning = false;
						this.y = 0;
					}

					if (this.x + this.width > canvas.width) {
						this.isRunning = false;
						this.x = canvas.width - this.width;
					}

					if (this.y + this.height > canvas.height) {
						this.isRunning = false;
						this.y = canvas.height - this.height;
					}
				}
			}
		}
	}

	collision(obj) {
		if (this.shape.rectangle) {
			if (
				this.x + this.width > obj.x &&
				this.x < obj.x + obj.width &&
				this.y + this.height > obj.y &&
				this.y < obj.y + obj.height
			) {
				return true;
			} else {
				return false;
			}
		} else if (this.shape.circle) {
			if (
				(this.x - this.radius + this.width > obj.x &&
					this.x - this.radius < obj.x + obj.width &&
					this.y - this.radius + this.height > obj.y &&
					this.y - this.radius < obj.y + obj.height) ||
				(this.x + this.radius + this.width > obj.x &&
					this.x + this.radius < obj.x + obj.width &&
					this.y + this.radius + this.height > obj.y &&
					this.y + this.radius < obj.y + obj.height) ||
				(this.x - this.radius + this.width > obj.x &&
					this.x - this.radius < obj.x + obj.width &&
					this.y + this.radius + this.height > obj.y &&
					this.y + this.radius < obj.y + obj.height) ||
				(this.x + this.radius + this.width > obj.x &&
					this.x + this.radius < obj.x + obj.width &&
					this.y - this.radius + this.height > obj.y &&
					this.y - this.radius < obj.y + obj.height)
			) {
				return true;
			} else {
				return false;
			}
		} else if (this.shape.triangle) {
			if (
				(this.x + this.width > obj.x &&
					this.x < obj.x + obj.width &&
					this.y + this.height > obj.y &&
					this.y < obj.y + obj.height) ||
				(this.x + this.width > obj.x &&
					this.x < obj.x + obj.width &&
					this.y + this.height > obj.y &&
					this.y < obj.y + obj.height) ||
				(this.x + this.width > obj.x &&
					this.x < obj.x + obj.width &&
					this.y + this.height > obj.y &&
					this.y < obj.y + obj.height)
			) {
				return true;
			} else {
				return false;
			}
		} else {
			if (
				this.x + this.width > obj.x &&
				this.x < obj.x + obj.width &&
				this.y + this.height > obj.y &&
				this.y < obj.y + obj.height
			) {
				return true;
			} else {
				return false;
			}
		}
	}

	addItem(id, amount, type) {
		let items = this.inventory.items;
		for (var i = 0; i < items.length; i++) {
			if (items[i].id == id) {
				if (items[i].amount <= this.inventory.maxItems - 1) {
					items[i].amount += amount;
					this.refreshRender();
					return;
				}
			}
		}

		items.push({ id: id, amount: amount, type: type });
		this.refreshRender();
	}

	removeItem(id, amount) {
		let items = this.inventory.items;
		for (var i = 0; i < items.length; i++) {
			if (items[i].id == id) {
				if (items[i].amount > 0) {
					items[i].amount -= amount;
					this.refreshRender();
				}

				this.refreshRender();
				return;
			}
		}
	}

	hasItem(id, amount) {
		let items = this.inventory.items;
		for (var i = 0; i < items.length; i++) {
			if (items[i].id == id) {
				return items[i].amount >= amount;
			} else {
				return false;
			}
		}

		return false;
	}

	refreshRender() {
		let itemArray = this.inventory.items;
		let item_icon_src = "nothing!";
		for (var i = 0; i < itemArray.length; i++) {
			let item = itemArray[i];

			items.forEach(function (x) {
				if (x.name == item.id) {
					item_icon_src = x.icon;
				}
			});

			if (inventory_collumn.length > i) {
				inventory_collumn[
					i
				].innerHTML = `<p>${item.amount} <img src="${item_icon_src}" alt="${item.id}"></p>`;
				inventory_collumn[i].id = item.id;
			} else {
				console.log("You have too many items");
			}

			if (item.type == "block") {
				if (inventory_display_collumns.length > i) {
					inventory_display_collumns[
						i
					].innerHTML = `<p><span class="item-value">${item.amount}</span> <br /><span class="item-id"><img src="${item_icon_src}" alt="${item.id}"></span></p>`;
					inventory_display_collumns[i].id = item.id;
				} else {
					console.log("You have too many items to display");
				}
			}

			if (item.amount <= 0) {
				itemArray.splice(i, 1);
				this.refreshRender();
				for (let j = 0; j < inventory_collumn.length; j++) {
					inventory_collumn[j].innerHTML = "";
				}

				for (let j = 0; j < inventory_display_collumns.length; j++) {
					inventory_display_collumns[j].innerHTML = "";
				}
			}
		}
	}
}
