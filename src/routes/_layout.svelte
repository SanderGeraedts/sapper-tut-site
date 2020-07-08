<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<style>
  main {
    position: relative;
    background-color: white;
    margin: 0 auto;
    box-sizing: border-box;
    min-height: 80vh;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
