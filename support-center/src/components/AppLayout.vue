<template>
  <div class="app-layout">
    <header class="header">
      <div>
        <img class="img" src="../assets/logo.svg" />
      </div>
      <div>My shirt shop</div>
    </header>

    <!-- 菜单将放在这里 -->
    <NavMenu />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="stylus">
@import '../style/main';
</style>

<style lang="stylus" scoped>
.header {
  .img {
    width: 64px;
    height: 64px;
  }
}
</style>

<script>
import NavMenu from "./NavMenu.vue";

export default {
  components: {
    NavMenu
  }
};
</script>
