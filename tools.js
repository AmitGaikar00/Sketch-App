const pencil = document.querySelector(".pencil");
const eraser = document.querySelector(".eraser");
const color = document.querySelector(".color");
const sticky = document.querySelector(".text");
const pencil__tools = document.querySelector(".pencil__tools");
const eraser__tools = document.querySelector(".eraser__tools");
const color__tools = document.querySelector(".color__pallete");

let pencilFlag = false;
let eraserFlag = false;
let colorFlag = false;
let noteFlag = true;

pencil.onclick = () => {
  pencilFlag = !pencilFlag;
  if (pencilFlag) {
    pencil__tools.style.display = "block";
  } else {
    pencil__tools.style.display = "none";
  }
};

eraser.onclick = () => {
  eraserFlag = !eraserFlag;
  if (eraserFlag) {
    eraser__tools.style.display = "block";
  } else {
    eraser__tools.style.display = "none";
  }
};

color.onclick = () => {
  colorFlag = !colorFlag;
  if (colorFlag) {
    color__tools.style.display = "flex";
  } else {
    color__tools.style.display = "none";
  }
};

sticky.addEventListener("click", (e) => {
  let stickyTemplateHTML = `
    <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck="false" rows='10'></textarea>
    </div>
    `;

  createSticky(stickyTemplateHTML);
});

function createSticky(stickyTemplateHTML) {
  let stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky__content");
  stickyCont.innerHTML = stickyTemplateHTML;
  document.body.appendChild(stickyCont);

  let minimize = stickyCont.querySelector(".minimize");
  let remove = stickyCont.querySelector(".remove");

  sticky__Actions(minimize, remove, stickyCont);

  stickyCont.onmousedown = function (event) {
    dragAndDrop(stickyCont, event);
  };

  stickyCont.ondragstart = function () {
    return false;
  };
}

function sticky__Actions(minimize, remove, element) {
  remove.onclick = () => {
    element.remove();
  };

  minimize.onclick = (e) => {
    let noteCont = element.querySelector(".note-cont");
    const value = getComputedStyle(noteCont).getPropertyValue("display");
    if (value === "none") {
      noteCont.style.display = "block";
    } else {
      noteCont.style.display = "none";
    }
  };
}

function dragAndDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the ball, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}
