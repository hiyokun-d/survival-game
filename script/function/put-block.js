function putBlock() {
	player.inventory.items.forEach(itemInven => {
		let inventory_display_choosen_children = inventory_display_choosen.children;
		if (inventory_display_choosen_children.length > 0) {
			// let inventory_display_choosen_children_span =
			// 	inventory_display_choosen_children[0].children;

			// let item_id = inventory_display_choosen_children_span[2];
			// let item_value = inventory_display_choosen_children_span[0];

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
	requestAnimationFrame(putBlock);
}

