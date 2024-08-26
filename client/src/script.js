
// Circle follow cursor movements

const cursor = document.querySelector<HTMLElement>("#cursor");
const cursorBorder = document.querySelector<HTMLElement>("#cursor-border");
const cursorPos = { x: 0, y: 0 };
const cursorBorderPos = { x: 0, y: 0 };

document.addEventListener("mousemove", (e) => {
  cursorPos.x = e.clientX;
  cursorPos.y = e.clientY;

if (cursor) {
	cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
}
});

function loop() {
  const easting = 8;
  cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easting;
  cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easting;

if (cursorBorder) {
	cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
}
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

document.querySelectorAll<HTMLElement>("[data-cursor]").forEach((item) => {
  item.addEventListener("mouseover", (e) => {
	if (cursorBorder) {
		if (item.dataset.cursor === "pointer") {
		cursorBorder.style.backgroundColor = "black";
		cursorBorder.style.mixBlendMode = "difference";
			if (cursor) {
				cursor.style.backgroundColor = "black";
			}
			
    }
    if (item.dataset.cursor === "pointer2") {
      cursorBorder.style.backgroundColor = "white";
      cursorBorder.style.mixBlendMode = "difference";
      cursorBorder.style.setProperty("--size", "80px");
    }
  item.addEventListener("mouseout", (e) => {
    cursorBorder.style.backgroundColor = "unset";
    cursorBorder.style.mixBlendMode = "unset";
    cursorBorder.style.setProperty("--size", "50px");
	if (cursor ) {
		cursor.style.backgroundColor = "white";
	}
  });
} 
});   
});

