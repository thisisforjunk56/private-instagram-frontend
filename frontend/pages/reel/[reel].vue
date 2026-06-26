<script setup>
 const url = window.location.href
  const id = url.split("/").at(-1)
const json = ref({ success: false, description: "Loading video..." })
onMounted(async () => {


  json.value = await $fetch(`http://localhost:8080/reel/${id}`)
  console.log(json)
}) 

</script>id

<template>

<main>
<div v-if="json.success">
  <video :src="`/reel-fetch/${id}`" controls></video>
</div>
<div class="flex row gap-4">
  <p>{{ json.description }}</p>
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

video {
  height: 100%;
  max-height: calc(100vh - 6rem);
  width: auto;
  object-fit: cover;
}
</style>