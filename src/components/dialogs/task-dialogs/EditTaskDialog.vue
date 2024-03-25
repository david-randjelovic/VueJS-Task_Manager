<template>
    <Dialog :visible="visible" modal @update:visible="hideDialog">
      <template #header>
        <h3>Edit Task</h3>
      </template>
      <form class="dialog-form" @submit.prevent="submitTask">
        <InputText v-model="task.title" placeholder="Task Title" />
        <TextArea v-model="task.description" placeholder="Task Description" rows="3"></TextArea>
        <PrimeButton label="Edit Task" type="submit" />
      </form>
    </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';
import TaskService from '../../../services/TaskService.js';
import Dialog from 'primevue/dialog';


const props = defineProps({
  visible: Boolean,
  task_title: String,
  task_description: String,
  task_id: Number,
});

watch(() => props.task_title, (newTitle) => {
  task.value.title = newTitle;
});

watch(() => props.task_description, (newDescription) => {
  task.value.description = newDescription;
});

const task = ref({
  title: '',
  description: ''
});

const emit = defineEmits(['update:visible','task-edited']);

const hideDialog = () => {
  emit('update:visible', false);
};

const submitTask = () => {
  editTask();
  hideDialog();
};

async function editTask() {
  try {
    const payload = {
        title: task.value.title,
        description: task.value.description,
        task_id: props.task_id
    }
    const response = await TaskService.editTask(payload);
    emit('task-edited', response.data);
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
  