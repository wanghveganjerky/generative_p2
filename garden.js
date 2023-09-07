var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");




export default class Garden {
  constructor(gardenEl, controlsEl) {
    this.gardenEl = gardenEl;
    this.controlsEl = controlsEl;
    this.activeShape = {};
    this.mousePos = { x: 0, y: 0 };
    this.activeShapeEl = null;
    this.initInteraction();
    this.activeShape.color = "#000000";
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
        if (e.target.id !== 'color') { // Prevent resetting shape when color is changed
          this.setShape(e.target);
        } else {
          this.setBackgroundColor();
        }
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
  setBackgroundColor() {
    this.gardenEl.style.backgroundColor = this.controlsEl.querySelector("#color").value;
  }
  setShape(el) {
    this.activeShape.width = this.controlsEl.querySelector("#width").value;
    this.activeShape.height = this.controlsEl.querySelector("#height").value;
    this.activeShape.rotate = this.controlsEl.querySelector("#rotate").value;
    this.activeShape.skew = this.controlsEl.querySelector("#skew").value;
    this.activeShape.color = this.controlsEl.querySelector("#fontColor").value;
    
    if (el.type === "text" || el.type === "radio" || el.type === "checkbox") {
      this.activeShape.value = el.value;
    }
    

    const keyMap = {
      A: { value: "A", type: "tagada" },
      B: { value: "B", type: "tagada" },
      C: { value: "C", type: "tagada" },
      D: { value: "D", type: "tagada" },
      E: { value: "E", type: "tagada" },
      F: { value: "F", type: "tagada" },
      G: { value: "G", type: "tagada" },
      H: { value: "H", type: "tagada" },
      I: { value: "I", type: "tagada" },
      J: { value: "J", type: "tagada" },
      K: { value: "K", type: "tagada" },
      L: { value: "L", type: "tagada" },
      M: { value: "M", type: "tagada" },
      N: { value: "N", type: "tagada" },
      O: { value: "O", type: "tagada" },
      P: { value: "P", type: "tagada" },
      Q: { value: "Q", type: "tagada" },
      R: { value: "R", type: "tagada" },
      S: { value: "S", type: "tagada" },
      T: { value: "T", type: "tagada" },
      U: { value: "U", type: "tagada" },
      V: { value: "V", type: "tagada" },
      W: { value: "W", type: "tagada" },
      X: { value: "X", type: "tagada" },
      Y: { value: "Y", type: "tagada" },
      Z: { value: "Z", type: "tagada" },
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
      a: { value: "a", type: "tagada" },
      b: { value: "b", type: "tagada" },
      c: { value: "c", type: "tagada" },
      d: { value: "d", type: "tagada" },
      e: { value: "e", type: "tagada" },
      f: { value: "f", type: "tagada" },
      g: { value: "g", type: "tagada" },
      h: { value: "h", type: "tagada" },
      i: { value: "i", type: "tagada" },
      j: { value: "j", type: "tagada" },
      k: { value: "k", type: "tagada" },
      l: { value: "l", type: "tagada" },
      m: { value: "m", type: "tagada" },
      n: { value: "n", type: "tagada" },
      o: { value: "o", type: "tagada" },
      p: { value: "p", type: "tagada" },
      q: { value: "q", type: "tagada" },
      r: { value: "r", type: "tagada" },
      s: { value: "s", type: "tagada" },
      t: { value: "c", type: "tagada" },
      u: { value: "u", type: "tagada" },
      v: { value: "v", type: "tagada" },
      w: { value: "w", type: "tagada" },
      x: { value: "x", type: "tagada" },
      y: { value: "y", type: "tagada" },
      z: { value: "z", type: "tagada" },

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
      this.gardenEl.appendChild(this.activeShapeEl);
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    }

    //special case
    const span = document.createElement('span');
    span.innerHTML = this.activeShape.value;
  
    // Special case for descenders
    const descenders = ['g', 'j', 'q', 'y', 'p'];
    if (descenders.includes(this.activeShape.value.toLowerCase())) {
        this.activeShapeEl.style.borderBottom = '-0.2em solid transparent';  // adjust as needed
        this.activeShapeEl.style.lineHeight = '0.8em'; // adjust as needed
    }
    else {
        this.activeShapeEl.style.borderBottom = 'none';
        this.activeShapeEl.style.lineHeight = '1em';
    }
  
    // Append the span to the div
    this.activeShapeEl.innerHTML = '';
    this.activeShapeEl.appendChild(span);

    this.activeShapeEl.style.color = this.activeShape.color; 
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

document.getElementById('fontColor').addEventListener('input', function() {
  let selectedFontColor = this.value;
  gardenInstance.activeShape.color = selectedFontColor;
  gardenInstance.renderShape();
});


var saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", function() {
  var dataURL = canvas.toDataURL("image/png");
  var link = document.createElement("a");
  link.download = "canvas.png";
  link.href = dataURL;
  link.click();
});

