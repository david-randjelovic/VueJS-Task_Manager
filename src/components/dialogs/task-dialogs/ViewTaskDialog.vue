<template>
    <Dialog :closable="true" modal @update:visible="hideDialog">
      <template #header>
        <h3>{{ title }}</h3>
      </template>
      <div class="description-wrapper">
        <p>{{ description }}</p>
      </div>

    </Dialog>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';
import Dialog from 'primevue/dialog';

defineProps({
    title: String,
    description: String
})

const emit = defineEmits(['update:visible']);

const hideDialog = () => {
  emit('update:visible', false);
};
</script>

<style scoped>
.description-wrapper {
    min-width: 300px;
    max-width: 600px;
}
</style>
  