<template>
  <div>
    <ul v-for="product in products" :key="product._id">
      <li>{{product._id}}</li>
      <li>{{product.name}}</li>
      <li>{{product.price}}</li>
      <br />
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const products = await $axios.$get("http://localhost:4000/api/products");
    return { products };
  }
};
</script>

<style>
</style>