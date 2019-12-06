<template>
  <div>
    <form v-on:submit.prevent="login">
      <input type="hidden" name="_csrf" :value="csrf" />
      <label for="email">Email:</label>
      <input type="email" name="email" v-model="email" />
      <br />
      <label for="pass">Password:</label>
      <input type="password" name="password" v-model="password" />
      <br />
      <input type="submit" value="Login" />
    </form>
    <button @click="protectedBack">clickMe</button>
  </div>
</template>

<script>
export default {
  async asyncData({ req, res }) {
    //* Force SSR Mode
    if (!process.server) {
      window.location.assign("/login");
      return;
    }

    const csrf_token = res.getHeader("x-csrf-token");
    console.log(req.url.csrf_token);
    return { csrf: csrf_token };
  },
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    login: function() {
      console.log(this.email, this.password);
    },
    protectedBack: function() {
      this.$axios
        .post(
          "http://localhost:4000/api/protected",
          {
            data: "Some test data"
          },
          { headers: { "x-csrf-token": this.csrf } }
        )
        .then(res => console.log(res))
        .catch(err => console.warn(err));
    }
  }
};
</script>

<style></style>
