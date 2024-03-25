<template>
    <Dialog :visible="visible" modal @update:visible="hideDialog">
      <template #header>
        <h3>Add New Task</h3>
      </template>
      <form class="dialog-form" @submit.prevent="submitTask">
        <InputText v-model="task.title" placeholder="Task Title" />
        <TextArea v-model="task.description" placeholder="Task Description" rows="3"></TextArea>
        <PrimeButton label="Add Task" type="submit" />
      </form>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import TaskService from '../../../services/TaskService.js';
import Dialog from 'primevue/dialog';


const props = defineProps({
  visible: Boolean,
  list_id: Number,
});

const task = ref({
  title: '',
  description: ''
});

const emit = defineEmits(['update:visible','task-added']);

const hideDialog = () => {
  emit('update:visible', false);
};

const submitTask = () => {
  createTask();
  task.value.title = '';
  task.value.description = '';
  hideDialog();
};

async function createTask() {
  try {
    const payload = {
        title: task.value.title,
        description: task.value.description,
        list_id: props.list_id
    }
    const response = await TaskService.createTask(payload);
    emit('task-added', response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
</script>

<style scoped>
textarea {
  resize: none;
  width: 600px;
  Height: 300px;
}
</style>
  