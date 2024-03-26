<template>
  <header class="app-header">
    <div class="logo-wrapper">
      <div class="logo"></div>
      <span>David's task manager</span>
    </div>
    <div class="header-right-side">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-search"></i>
        </InputGroupAddon>
        <InputText placeholder="Search..." @input="onSearch"/>
      </InputGroup>
  </div>
  </header>
</template>

<script setup>
import { inject } from 'vue';

const setSearchTerm = inject('setSearchTerm');

const onSearch = (event) => {
  setSearchTerm(event.target.value);
};
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
.header-right-side {
  display: flex;
  align-items: center;
}
</style>