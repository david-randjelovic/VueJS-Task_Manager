<template>
    <Dialog :visible="visible" :closable="true" modal @update:visible="hideDialog">
      <template #header>
        <h3>Are you sure you want to delete this task?</h3>
      </template>
      <form class="dialog-form" @submit.prevent="deleteTask">
        <PrimeButton label="Yes" type="submit" />
        <PrimeButton label="No" type="button" @click="hideDialog"/>
      </form>
    </Dialog>
    <PrimeToast position="bottom-right"/>
</template>


<script setup>
import { defineEmits, defineProps } from 'vue';
import Dialog from 'primevue/dialog';
import TaskService from '../../../services/TaskService.js';
import { useToast } from 'primevue/usetoast';
import InfoService from '@/services/InfoService';

const toast = useToast();

const props = defineProps({
  visible: Boolean,
  task_id: Number
});

const emit = defineEmits(['update:visible', 'task-deleted']);

const hideDialog = () => {
  emit('update:visible', false);
};

const deleteTask = () => {
  removeTask();
  hideDialog();
};

async function removeTask() {
  try {
    const payload = {
        task_id: props.task_id,
    }
    await TaskService.deleteTask(payload);
    emit('task-deleted', props.task_id);
  } catch (error) {
    InfoService.showToast(toast, 'Error', 'Oops, something went wrong.', 'error');
  }
}
</script>

<style scoped>
</style>