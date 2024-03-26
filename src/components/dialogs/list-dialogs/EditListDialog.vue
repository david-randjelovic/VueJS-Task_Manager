<template>
    <Dialog :closable="true" modal @update:visible="hideDialog">
      <template #header>
        <h3>Enter new list name</h3>
      </template>
      <form class="dialog-form" @submit.prevent="submitList">
        <InputText v-model="list.name" placeholder="List Name" />
        <PrimeButton label="Finish Editing" type="submit" />
      </form>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits, defineProps } from 'vue';
import Dialog from 'primevue/dialog';
import ListService from '../../../services/ListService.js'

const props = defineProps({
    list_id: Number,
})

const list = ref({
  name: '',
});

const emit = defineEmits(['update:visible', 'list-added']);

const hideDialog = () => {
  emit('update:visible', false);
};

const submitList = () => {
  editList();
  list.value.name = '';
  hideDialog();
};

async function editList() {
  try {
    const payload = {
        list_id: props.list_id,
        name: list.value.name
    }
    const response = await ListService.editList(payload);
    emit('list-edited', response.data);
  } catch (e) {
     //Do nothing - error will be reported in dashboard function
  }
}
</script>

<style scoped>
</style>
  