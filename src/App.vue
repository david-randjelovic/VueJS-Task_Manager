<template>
  <div v-if="!isAuthInUrl">
    <TheHeader></TheHeader>
    <div class="content-container">
        <TheSidebar></TheSidebar>
        <router-view></router-view>
    </div>
  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';
import TheSidebar from './components/TheSidebar.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

//Searchbar imports
import { provide } from 'vue';
import { useSearch } from './services/SearchService';

const { searchTerm, setSearchTerm } = useSearch();

provide('searchTerm', searchTerm);
provide('setSearchTerm', setSearchTerm);

const route = useRoute();

const isAuthInUrl = computed(() => {
    return route.path.includes('auth');
});
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
  background-color: var(--background-color);
}
h6, h5 {
    margin: 0px;
    padding: 0px;
}
.content-container {
  display: grid;
  grid-template-columns: 0.10fr 1.90fr;
}
.p-dialog-header {
  padding-bottom: 0px;
  padding-top: 10px;
}
.dialog-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.p-dialog-header, .p-dialog-content {
  background-color: var(--background-color) !important;
  color: var(--text-color);
}
.p-dialog {
  background-color: var(--background-color) !important;
  border: 0px;
}
.p-inputtext {
  background-color: var(--background-color) !important;
  border: var(--secondary-color) 1px solid;
  color: var(--text-color);
}
.p-inputtext:focus {
  color: var(--text-color);
}
.p-inputgroup-addon {
  background-color: var(--addon-background-color);
  color: var(--text-color);
}
.p-menu-overlay {
  background-color: var(--background-color) !important;
  color: var(--text-color) !important;
}
.p-submenu-header {
  background-color: var(--background-color) !important;
  color: var(--text-color) !important;
}
.p-menuitem-text {
  color: var(--text-color) !important;
}
.p-menuitem-link:hover {
  background-color: var(--list-color) !important;
}
.p-menuitem-content:hover {
  background-color: var(--list-color) !important;
  transition: 0s !important;
}
.p-menuitem-content {
  background-color: var(--background-color) !important;
  transition: 0.2s !important;
}
.pi {
  color: var(--text-color) !important;
}
</style>
