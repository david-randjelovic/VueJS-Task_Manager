<template>
    <Dialog :visible="visible" :closable="true" modal @update:visible="hideDialog" v-if="!is_list_busy">
      <template #header>
        <h3>Are you sure you want to delete this list?</h3>
      </template>
      <form class="dialog-form" @submit.prevent="deleteList">
        <PrimeButton label="Yes" type="submit" />
        <PrimeButton label="No" type="button" @click="hideDialog"/>
      </form>
    </Dialog>
    <Dialog :visible="visible" :closable="true" modal @update:visible="hideDialog" v-else>
      <template #header>
        <h3>Can't delete the list.</h3>
      </template>
      <form class="dialog-form">
        <p>Please delete all the tasks from the list before removing it.</p>
        <PrimeButton label="Ok" type="button" @click="hideDialog"/>
      </form>
    </Dialog>
</template>


<script setup>
import { defineEmits, defineProps } from 'vue';
import Dialog from 'primevue/dialog';
import ListService from '../../../services/ListService.js';

const props = defineProps({
  visible: Boolean,
  list_id: Number,
  is_list_busy: Boolean
});

const emit = defineEmits(['update:visible', 'list-deleted']);

const hideDialog = () => {
  emit('update:visible', false);
};

const deleteList = () => {
  removeList();
  hideDialog();
};

async function removeList() {
  try {
    const payload = {
        list_id: props.list_id,
    }
    await ListService.deleteList(payload);
    emit('list-deleted', props.list_id);
  } catch (error) {
    //Do nothing - error will be reported in dashboard function
  }
}
</script>

<style scoped>
</style>