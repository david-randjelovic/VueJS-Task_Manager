<template>
    <Dialog :visible="visible" :closable="true" modal @update:visible="hideDialog">
      <template #header>
        <h3>Enter new list name</h3>
      </template>
      <form class="dialog-form" @submit.prevent="submitList">
        <InputText v-model="list.name" placeholder="List Name" />
        <PrimeButton label="Finish Editing" type="submit" />
      </form>
    </Dialog>
    <PrimeToast position="bottom-right"/>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits, defineProps } from 'vue';
import Dialog from 'primevue/dialog';
import ListService from '../../../services/ListService.js'
import { useToast } from 'primevue/usetoast';
import InfoService from '@/services/InfoService';

const toast = useToast();

const props = defineProps({
  visible: Boolean,
  list_id: Number,
})

const list = ref({
  name: '',
});

const emit = defineEmits(['update:visible', 'list-edited']);

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
    InfoService.showToast(toast, 'Error', 'Oops, something went wrong.', 'error');
  }
}
</script>

<style scoped>
</style>
  