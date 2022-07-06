function call_function() {
	ctx.fillStyle = "rgba(0, 110, 0)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	block_spawner(0.1, 150);
	inventorySystem();
	putBlock();
	spawn_block();
	break_block();
	game();

	requestAnimationFrame(call_function);
}

call_function();
