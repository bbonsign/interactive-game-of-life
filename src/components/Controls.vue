<template>
  <div class="controls">
    <button @click="toggleAnimation">{{ isAnimated ? "Pause" : "Play" }}</button>
    <button @click="life.tick()">Step</button>
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
      this.$emit("updateUniverse");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
