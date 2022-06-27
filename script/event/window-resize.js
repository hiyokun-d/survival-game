canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    block_array.splice(0, block_array.length);
});


window.addEventListener("messageerror", function (e) {
    console.log(e);
});