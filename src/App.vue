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
:root {
  --primary-color: #59c193;
  --subheading-color: #626F86;
  --secondary-color: #d6d6d6;
  --hover-color: #d6d6d6;
  --error-color: #b0090a;
}

body {
  margin: 0px;
  padding: 0px;
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
</style>
