<template>
  <main class="login">
    <h1>Please login to continue</h1>
    <form>
      <FormInput
        name="username"
        :value="username"
        @input="val => username = val"
        placeholder="Username"
      />
    </form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      username: ""
    };
  }
};
</script>