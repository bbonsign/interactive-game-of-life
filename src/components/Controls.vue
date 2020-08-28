<template>
  <div class="controls">
    <button>Back</button>
    <button>Pause</button>
    <button>Play</button>
    <button @click="life.tick()">Forward</button>
  </div>
</template>

<script>
export default {
  name: "Controls",
  props: {
    life: Object,
  },
  methods: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
