var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", function() {
  // Create a data URL from the canvas
  var dataURL = canvas.toDataURL("image/png");

  // Create a link element with the data URL as its href
  var link = document.createElement("a");
  link.download = "canvas.png";
  link.href = dataURL;

  // Click the link to download the image
  link.click();
});

export default class Garden {
  constructor(gardenEl, controlsEl) {
    this.gardenEl = gardenEl;
    this.controlsEl = controlsEl;
    this.activeShape = {};
    this.mousePos = { x: 0, y: 0 };
    this.activeShapeEl = null;
    this.initInteraction();
  }

  initInteraction() {
    const defaultTypeA = document.getElementById("A");
    this.setShape(defaultTypeA);
    
    //Place shape on click event on garden element
    this.gardenEl.addEventListener("click", () => {
      this.placeShape();
    });

    //Update mouse movement of x,y and render
    this.gardenEl.addEventListener("mousemove", (e) => {
      this.mousePos.x = e.clientX;
      this.mousePos.y = e.clientY;
      this.renderShape();
    });

    //Adding input eventListener for all <input> in the controls element
    let inputEls = this.controlsEl.querySelectorAll("input");
    inputEls.forEach((el) => {
      el.addEventListener("input", (e) => {
        this.setShape(e.target);
        this.renderShape();
      });
    });

    //Add keydown event listener to document
    // document.addEventListener("keydown", (e) => {
    //   if (e.key === "t") {
    //     this.activeShape.type = "tagada";
    //     this.renderShape();
    //   } else if (e.key === "a") {
    //     this.activeShape.type = "asfalt";
    //     this.renderShape();
    //   }
    // });
  }

  setShape(el) {
    this.activeShape = {};
    this.gardenEl.style.backgroundColor =
    this.controlsEl.querySelector("#color").value;
    this.activeShape.width = this.controlsEl.querySelector("#width").value;
    this.activeShape.height = this.controlsEl.querySelector("#height").value;
    this.activeShape.rotate = this.controlsEl.querySelector("#rotate").value;
    this.activeShape.skew = this.controlsEl.querySelector("#skew").value;
    this.activeShape.value = el.value;
    

    const keyMap = {
      a: { value: "A", type: "asfalt" },
      b: { value: "B", type: "tagada" },
      c: { value: "C", type: "tagada" },
      d: { value: "D", type: "tagada" },
      e: { value: "E", type: "tagada" },
      f: { value: "F", type: "tagada" },
      g: { value: "G", type: "tagada" },
      h: { value: "H", type: "tagada" },
      i: { value: "I", type: "tagada" },
      j: { value: "J", type: "tagada" },
      k: { value: "K", type: "tagada" },
      l: { value: "L", type: "tagada" },
      m: { value: "M", type: "tagada" },
      n: { value: "N", type: "tagada" },
      o: { value: "O", type: "tagada" },
      p: { value: "P", type: "tagada" },
      q: { value: "Q", type: "tagada" },
      r: { value: "R", type: "tagada" },
      s: { value: "S", type: "tagada" },
      t: { value: "T", type: "tagada" },
      u: { value: "U", type: "tagada" },
      v: { value: "V", type: "tagada" },
      w: { value: "W", type: "tagada" },
      x: { value: "X", type: "tagada" },
      y: { value: "Y", type: "tagada" },
      z: { value: "Z", type: "tagada" },
      1: { value: "1", type: "tagada" },
      2: { value: "2", type: "tagada" },
      3: { value: "3", type: "tagada" },
      4: { value: "4", type: "tagada" },
      5: { value: "5", type: "tagada" },
      6: { value: "6", type: "tagada" },
      7: { value: "7", type: "tagada" },
      8: { value: "8", type: "tagada" },
      9: { value: "9", type: "tagada" },
      0: { value: "0", type: "tagada" },
      // 1: { value: "1", type: "tagada" },
      // 1: { value: "1", type: "tagada" },
      // 1: { value: "1", type: "tagada" },



    };
    
    for (let key in keyMap) {
      document.addEventListener("keydown", (e) => {
        if (e.key === key) {
          this.activeShape.value = keyMap[key].value;
          this.activeShape.type = keyMap[key].type;
          this.renderShape();
        }
      });
    }
  }

  renderShape() {
    if (this.activeShapeEl === null) {
      this.activeShapeEl = document.createElement("div");
      this.activeShapeEl.innerHTML = this.activeShape.value;
      console.log(this.activeShape.value);
      this.gardenEl.appendChild(this.activeShapeEl);
    }
    this.activeShapeEl.classList.add("type");
    this.activeShapeEl.style.left =
      this.mousePos.x - this.activeShape.width / 2 + "px";
    this.activeShapeEl.style.top =
      this.mousePos.y - this.activeShape.height / 2 + "px";
    this.activeShapeEl.style.transform =
      "scaleX(" +
      this.activeShape.width +
      ") scaleY(" +
      this.activeShape.height +
      ")" +
      "rotate(" +
      this.activeShape.rotate +
      "deg)" +
      "skewY(" +
      this.activeShape.skew +
      "deg)";
    if (this.activeShape.type === "tagada") {
      this.activeShapeEl.style.fontFamily = "Tagada";
      this.activeShapeEl.style.src = "tagada.otf";
    }
    if (this.activeShape.type === "asfalt") {
      this.activeShapeEl.style.fontFamily = "Asfalt";
      this.activeShapeEl.style.src = "asfalt.otf";
    }
  }
  placeShape() {
    this.activeShapeEl = null;
    this.renderShape();
  }

  clear() {
    this.gardenEl.innerHTML = "";
    this.activeShapeEl = null;
    this.renderShape();
  }
}