function handleDragStart(e) {
	this.style = `
        transition: all 0.2s ease-in-out;
        transform: scale(1.1);
        opacity: 0.5;
        color: #fff;
    `;

	dragSrcEl = this;

	e.dataTransfer.effectAllowed = "move";
	e.dataTransfer.setData("text/html", this.innerHTML);
}

function handleDragEnd(e) {
	this.style = `
        transition: all 0.2s ease-in-out;
        transform: scale(1);
        opacity: 1;
        
        `;

	inventory_collumn.forEach(function (collumn) {
		collumn.classList.remove("over");
	});
}

function handleDragOver(e) {
	e.preventDefault();
	return false;
}

function handleDragEnter(e) {
	this.classList.add("over");
}

function handleDragLeave(e) {
	this.classList.remove("over");
}

function handleDrop(e) {
    e.stopPropagation();

    if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData("text/html");
    }

	return false;
}

inventory_collumn.forEach(function (collumn) {
    if (player.inventoryDisplay.canBe.dragged) {
        collumn.setAttribute("draggable", "true");
        collumn.addEventListener("dragstart", handleDragStart);
        collumn.addEventListener("dragover", handleDragOver);
        collumn.addEventListener("dragenter", handleDragEnter);
        collumn.addEventListener("dragleave", handleDragLeave);
        collumn.addEventListener("dragend", handleDragEnd);
        collumn.addEventListener("drop", handleDrop);
    } else {
        collumn.setAttribute("draggable", "false");
    }
});
