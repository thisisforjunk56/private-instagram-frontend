<script setup>
 const url = window.location.href
  const id = url.split("/").filter(items => items !== "").at(-1)
const json = ref({ success: false, description: "Loading video..." })
onMounted(async () => {


  json.value = await $fetch(`http://localhost:8080/reel/${id}`)
  console.log(json)
}) 

</script>id

<template>

<main class="fle-col justify-center gap-4 p-8">
<div v-if="json.success">
  <video :src="`/reel-fetch/${id}`" controls></video>
</div>
<div class="flex row gap-4 max-width[50%]">
  <p class="text-white">{{ json.description }}</p>
</div>
</main>
</template>

<style>

main {
  height: 100dvh;
  width: 100dvw;
  max-width: 100%;
  max-height: 100%;

  background: #0f0f0f;
}

video {
  height: 100%;
  max-height: calc(100vh - 6rem);
  width: auto;
  object-fit: cover;

  margin: auto;
}
</style>