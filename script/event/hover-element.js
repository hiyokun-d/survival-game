build_mode.addEventListener("mouseover", () => {
    if (!player.build_mode) {
        document.body.style.cursor = "url('assets/img/icon/Ingame/cursor/hammer.png'), auto";
    } else {
        document.body.style.cursor = "url('assets/img/icon/Ingame/cursor/X.png'), auto";
    }
});

build_mode.addEventListener("mouseout", () => {
    document.body.style.cursor = "url('assets/img/icon/Ingame/cursor/cursor.png'), auto";
})

inventory_collumn.forEach(function (collumn) {
    collumn.addEventListener("mouseover", () => {
        document.body.style.cursor = "url('assets/img/icon/Ingame/cursor/finger.png'), auto";
    })

    collumn.addEventListener("mouseout", () => {
        document.body.style.cursor = "url('assets/img/icon/Ingame/cursor/cursor.png'), auto";
    })
})

inventory_display_collumns.forEach(function (collumn) {
    collumn.addEventListener("mouseover", () => {
        document.body.style.cursor = "url('assets/img/icon/Ingame/cursor/finger.png'), auto";
    })

    collumn.addEventListener("mouseout", () => {
        document.body.style.cursor = "url('assets/img/icon/Ingame/cursor/cursor.png'), auto";
    })
})