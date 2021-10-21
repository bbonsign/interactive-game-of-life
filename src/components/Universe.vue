<template>
  <div class="universe">
    <canvas
      id="game-of-life-canvas"
      @mousedown="mouseDown"
      @mousemove="mouseMove"
      @mouseup="mouseUp"
      @mouseleave="() => {isDragging = false; isMouseDown = false;}"
    ></canvas>
    <Controls :life="life" @toggleAnimation="animate" @drawUniverse="drawUniverse" />
  </div>
</template>

<script>
import { GameOfLife } from "../GameOfLife";
import Controls from "./Controls";

const GRID_COLOR = "#AAAAAA";
const DEAD_COLOR = "#DDDDDD";
const ALIVE_COLOR = "#000000";

let animation;

export default {
  name: "Universe",
  props: {},
  components: {
    Controls: Controls,
  },

  data() {
    return {
      canvas: null,
      ctx: null,
      life: null,
      cellSize: 20,
      isDragging: false,
      isMouseDown: false,
    };
  },

  methods: {
    mouseDown() {
      this.isDragging = false;
      this.isMouseDown = true;
    },

    mouseMove(event) {
      if (this.isMouseDown) {
        this.isDragging = true;
        this.mousehandle(event);
      }
    },

    mouseUp(event) {
      this.mousehandle(event);
      this.isDragging = false;
      this.isMouseDown = false;
    },

    mousehandle(event) {
      let pixelX = event.offsetX;
      let pixelY = event.offsetY;
      let coors = this.pixToCell(pixelX, pixelY);
      if (this.isDragging) {
        this.life.setCell(coors, true);
      } else {
        this.life.toggleCell(coors);
      }
      this.drawUniverse();
    },

    pixToCell(pixelX, pixelY) {
      let row = Math.floor(pixelX / (this.cellSize + 1));
      let column = Math.floor(pixelY / (this.cellSize + 1));
      return { row, column };
    },

    drawCells() {
      for (let i = 0; i < this.life.size; i++) {
        let { row, column } = this.life.coorsOf(i);

        this.ctx.fillStyle = this.life.cells[i] ? ALIVE_COLOR : DEAD_COLOR;

        this.ctx.fillRect(
          row * (this.cellSize + 1) + 1,
          column * (this.cellSize + 1) + 1,
          this.cellSize,
          this.cellSize
        );
      }
    },

    drawGrid() {
      this.ctx.beginPath();
      this.ctx.strokeStyle = GRID_COLOR;
      this.ctx.lineWidth = 1;

      // Vertical lines.
      for (let i = 0; i <= this.canvas.width; i++) {
        this.ctx.moveTo(i * (this.cellSize + 1) + 1, 0);
        this.ctx.lineTo(
          i * (this.cellSize + 1) + 1,
          (this.cellSize + 1) * this.canvas.height + 1
        );
      }

      // Horizontal lines.
      for (let j = 0; j <= this.canvas.height; j++) {
        this.ctx.moveTo(0, j * (this.cellSize + 1) + 1);
        this.ctx.lineTo(
          (this.cellSize + 1) * this.canvas.width + 1,
          j * (this.cellSize + 1) + 1
        );
      }

      this.ctx.stroke();
    },

    clearUniverse() {
      this.ctx.fillStyle = DEAD_COLOR;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },

    drawUniverse() {
      this.clearUniverse();
      this.drawGrid();
      this.drawCells();
    },

    animate(bool) {
      if (!bool) {
        animation = requestAnimationFrame(this.renderLoop);
      } else {
        cancelAnimationFrame(animation);
      }
    },

    renderLoop() {
      this.life.tick();
      this.drawUniverse();

      animation = requestAnimationFrame(this.renderLoop);
    },
  },

  mounted() {
    const canvas = document.querySelector("#game-of-life-canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let rows = Math.floor(windowHeight / this.cellSize) - 5;
    let cols = Math.floor(windowWidth / this.cellSize) - 5;

    canvas.width = cols * (this.cellSize + 1) + 1;
    canvas.height = rows * (this.cellSize + 1) + 1;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.life = new GameOfLife(rows, cols);
    this.drawUniverse();
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.universe {
  text-align: center;
}

#game-of-life-canvas {
  cursor: crosshair;
}
</style>
