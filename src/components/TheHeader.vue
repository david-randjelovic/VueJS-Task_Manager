<template>
  <header class="app-header">
    <div class="logo-wrapper">
      <div class="logo"></div>
      <span>David's task manager</span>
    </div>
    <div class="profile-menu">
      <div class="profile-icon"></div>
      <i class="pi pi-angle-down"></i>
    </div>
  </header>
</template>

<script setup>

</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  height: 70px;
  /* background-color: #f4f4f4; */
  border-bottom: 1px solid var(--secondary-color);
  padding: 10px 20px 10px 20px;
}
.logo-wrapper {
  display: flex;
  align-items: center;
}
.logo {
  display: inline-block;
  background-image: url('../assets/logo.svg');
  background-size: cover;
  width: 50px;
  height: 50px;
  margin-right: 5px;
}
.profile-icon {
  display: inline-block;
  background-image: url('../assets/profile-default.svg');
  background-size: cover;
  width: 30px;
  height: 30px;
}
.profile-menu {
  display: flex;
  align-items: center;
  gap: 5px;
  transition: 0.2s;
  cursor: pointer;
  padding: 0px 10px;
  border-radius: 10px;
}
.profile-menu:hover {
  background-color: var(--secondary-color);
}
</style>