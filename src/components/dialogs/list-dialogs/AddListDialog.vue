<template>
    <Dialog :closable="true" modal @update:visible="hideDialog">
      <template #header>
        <h3>Add New List</h3>
      </template>
      <form class="dialog-form" @submit.prevent="submitList">
        <InputText v-model="list.name" placeholder="List Name" />
        <PrimeButton label="Add List" type="submit" />
      </form>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import Dialog from 'primevue/dialog';
import ListService from '../../../services/ListService.js'

const list = ref({
  name: '',
});

const emit = defineEmits(['update:visible', 'list-added']);

const hideDialog = () => {
  emit('update:visible', false);
};

const submitList = () => {
  loadData();
  list.value.name = '';
  hideDialog();
};

async function loadData() {
  try {
    const rawData = localStorage.getItem('user');
    const parsedUser = JSON.parse(rawData);
    const payload = {
        name: list.value.name,
        user_id: parsedUser.id
    }
    const response = await ListService.createList(payload);
    emit('list-added', response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
</script>

<style scoped>
</style>
  