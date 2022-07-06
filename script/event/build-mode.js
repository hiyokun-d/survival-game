build_mode.addEventListener("click", function () {
	if (player.build_mode) {
		player.build_mode = false;
		build_mode.className = build_mode.className.replace("on", "off");
	} else {
		if (player.inventory.items.length > 0) {
			console.log("%c build mode🛠", "color:orange; font-size:10px");
			build_mode.className = build_mode.className.replace("off", "on");
			player.build_mode = true;
		}
	}
});
