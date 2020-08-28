<template>
  <div class="universe" @click="clickHandle">
    <canvas id="canvas"></canvas>
    <Controls :life="life"/>
  </div>
</template>

<script>
import { GameOfLife } from "../GameOfLife";
import Controls from "./Controls";

const CELL_SIZE = 10; // px
const GRID_COLOR = "#AAAAAA";
const DEAD_COLOR = "#DDDDDD";
const ALIVE_COLOR = "#000000";

export default {
  name: "Universe",
  props: {},
  components: {
    'Controls': Controls,
  },
  data() {
    return {
      canvas: null,
      ctx: null,
      life: null
    };
  },

  methods: {
    pixToCell(pixelX, pixelY) {
      let row = Math.floor(pixelX / (CELL_SIZE + 1));
      let column = Math.floor(pixelY / (CELL_SIZE + 1));
      return { row, column };
    },

    clickHandle(event) {
      let pixelX = event.offsetX;
      let pixelY = event.offsetY;
      let coors = this.pixToCell(pixelX, pixelY);
      this.life.toggleCell(coors, true);
      this.drawGrid();
      this.drawCells();
      //      this.ctx.fillStyle = "black";
      //      this.ctx.fillRect(event.clientX - 10, event.clientY - 10, 10, 10);
    },

    drawCells() {
      for (let i = 0; i < this.life.size; i++) {
        let { row, column } = this.life.coorsOf(i);

        this.ctx.fillStyle = this.life.cells[i] ? ALIVE_COLOR : DEAD_COLOR;

        this.ctx.fillRect(
          row * (CELL_SIZE + 1) + 1,
          column * (CELL_SIZE + 1) + 1,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    },

    drawGrid() {
      this.ctx.beginPath();
      this.ctx.strokeStyle = GRID_COLOR;
      this.ctx.lineWidth = 1;

      // Vertical lines.
      for (let i = 0; i <= this.canvas.width; i++) {
        this.ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
        this.ctx.lineTo(
          i * (CELL_SIZE + 1) + 1,
          (CELL_SIZE + 1) * this.canvas.height + 1
        );
      }

      // Horizontal lines.
      for (let j = 0; j <= this.canvas.height; j++) {
        this.ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
        this.ctx.lineTo(
          (CELL_SIZE + 1) * this.canvas.width + 1,
          j * (CELL_SIZE + 1) + 1
        );
      }

      this.ctx.stroke();
    }
  },

  mounted() {
    const canvas = document.querySelector("#canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let rows = Math.floor(windowHeight / CELL_SIZE) - 10;
    let cols = Math.floor(windowWidth / CELL_SIZE) - 10;

    canvas.width = cols * (CELL_SIZE + 1) + 1;
    canvas.height = rows * (CELL_SIZE + 1) + 1;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = DEAD_COLOR;
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.life = new GameOfLife(rows, cols);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>