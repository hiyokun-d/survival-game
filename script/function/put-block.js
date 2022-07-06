function putBlock() {
	player.inventory.items.forEach(itemInven => {
		let inventory_display_choosen_children = inventory_display_choosen.children;
		if (inventory_display_choosen_children.length > 0) {

			items.forEach(item => {
				if (
					inventory_display_choosen.id === item.name &&
					inventory_display_choosen.id === itemInven.id
                ) {
					if (itemInven.amount > 0) {
						if (player.putblock) {
							item.event();
							player.removeItem(itemInven.id, 1);
							player.putblock = false;
							console.log(
								`%c ${itemInven.id} is put`,
								"color:green; font-size:15px; font-weight:bold; text-align:center"
							);
						}
					}
				}
			});
		}
	});
}

