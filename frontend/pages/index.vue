<script setup>
const input = ref()
function submit() {
    console.log(input.value)
  let id = input.value.split("/").filter(items => items !== "").at(-1)
  console.log(id)
  if (id.indexOf("?") > -1) {
    id = id.split("?")[0]
  }

  navigateTo("/reel/" + id)

}
</script>

<template>
<main class="flex flex-col min-height gap-4 pt-8">
whatcha doin' here?

If you want to watch a reel, enter the reel ID here or paste the instagram link here
<div class="flex gap-2">
  <input placeholder="id here" v-model="input">
  <button @click="submit">Submit</button>
</div>
</main>
</template>

<style>
main {
  display:grid;
  place-items: center;

  height: 100dvh;
  width: 100dvw;
  max-width: 100%;
  max-height: 100%;

  background: white;
}
</style>