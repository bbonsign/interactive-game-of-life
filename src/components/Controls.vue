<template>
  <div class="controls">
    <button :style="styleObj" @click="toggleAnimation">{{ isAnimated ? "Pause" : "Play" }}</button>
    <button @click="stepHandle">Step</button>
    <button @click="clear">Clear</button>
  </div>
</template>

<script>
export default {
  name: "Controls",
  data() {
    return {
      isAnimated: false,
    };
  },
  computed: {
    styleObj() {
      return {
        backgroundColor: this.isAnimated ? "#630000" : "#006300",
        color: "white",
      };
    },
  },
  props: {
    life: Object,
    ctx: Object,
  },
  methods: {
    toggleAnimation() {
      this.$emit("toggleAnimation", this.isAnimated);
      this.isAnimated = !this.isAnimated;
    },
    clear() {
      if (this.isAnimated) this.toggleAnimation();
      this.life.clear();
      this.$emit("drawUniverse");
    },
    stepHandle() {
      this.life.tick();
      this.$emit("drawUniverse");
    },
  },
  mounted() {
    document.addEventListener('keydown', (event)=>{
      if (event.code === 'Space') {event.preventDefault();
        this.toggleAnimation() }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  border: none;
  margin: 0 10px;
  padding: 7px 6px;
  width: 8rem;
  font-size: 1.1rem;
}
</style>
