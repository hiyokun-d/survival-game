//NOTE: this is just collider for block

class Block {
	constructor({
		id = "log",
		type = "block",
		add = 1,
		x = 0,
		y = 0,
		width = 0,
		height = 0,
		color = "",
		health = 20,
		isBreaking = false,
		health_back_default = false,
		image = "",
		showCollider = false,
		showImage = true,
	}) {
		this.showCollider = showCollider;
		this.showImage = showImage;
		this.add = add;
		this.type = type;
		this.id = id;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color || "brown";
		this.health = health;
		this.isBreaking = isBreaking;
		this.health_back_default = health_back_default;
		this.image = image;
		this.imageSrc = new Image();
	}

	draw() {
		if (this.showCollider || this.image == "") {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}

	imageDraw() {
		
		if (this.showImage && this.image != "" && typeof this.imageSrc != "undefined") {
			this.imageSrc.src = this.image;
			ctx.drawImage(this.imageSrc, this.x, this.y, this.width, this.height);
		}
	}

	text_draw() {
		let text_size = 0;
		// make animation zoom in if player collide with the tree
		if (
			player.x < this.x + this.width &&
			player.x + player.width > this.x &&
			player.y < this.y + this.height &&
			player.y + player.height > this.y
		) {
			text_size = 20;
		} else {
			text_size = 0;
		}

		ctx.fillStyle = "black";
		ctx.font = `${text_size}px Arial`;
		ctx.fillText(`${Math.floor(this.health)}`, player.x, player.y);

		// console.log(`%c tree health: ${this.health}`, "color:red; font-size:20px");
	}

	collide(somethings) {
		if(somethings.x < this.x + this.width &&
			somethings.x + somethings.width > this.x &&
			somethings.y < this.y + this.height &&
			somethings.y + somethings.height > this.y) {
			return true;
		} else {
			return false;
		}
	}
}
