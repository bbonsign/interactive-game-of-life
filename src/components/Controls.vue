<template>
  <div class="controls">
    <button>Back</button>
    <button @click="toggleAnimation">{{ isAnimated ? "Pause" : "Play" }}</button>
    <button @click="life.tick()">Forward</button>
  </div>
</template>

<script>
export default {
  name: "Controls",
  data() {
    return {
      isAnimated: false
    };
  },
  props: {
    life: Object
  },
  methods: {
    toggleAnimation() {
      this.$emit("toggleAnimation", this.isAnimated);
      this.isAnimated = !this.isAnimated;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
