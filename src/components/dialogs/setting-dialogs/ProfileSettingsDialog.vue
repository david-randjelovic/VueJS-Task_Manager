<template>
    <Dialog :closable="true" modal @update:visible="hideDialog">
      <template #header>
        <h3>Account Settings</h3>
      </template>
      <form class="dialog-form" @submit.prevent="saveSettings">
        <div class="profile-picture"></div>
        <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-envelope"></i>
        </InputGroupAddon>
        <InputText v-model="account_settings.email" placeholder="Email"/>
      </InputGroup>
        <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-phone"></i>
        </InputGroupAddon>
        <InputText v-model="account_settings.phone" placeholder="Phone"/>
      </InputGroup>
        <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-briefcase"></i>
        </InputGroupAddon>
        <InputText v-model="account_settings.job_title" placeholder="Job Title"/>
      </InputGroup>
        <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-building"></i>
        </InputGroupAddon>
        <InputText v-model="account_settings.department" placeholder="Department"/>
      </InputGroup>
        <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-sitemap"></i>
        </InputGroupAddon>
        <InputText v-model="account_settings.organization" placeholder="Organization"/>
      </InputGroup>
        <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-map-marker"></i>
        </InputGroupAddon>
        <InputText v-model="account_settings.location" placeholder="Location"/>
      </InputGroup>
        <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-lock"></i>
        </InputGroupAddon>
        <InputText v-model="account_settings.password" placeholder="Password" type="password"/>
      </InputGroup>
        <PrimeButton label="Save Settings" type="submit" class="save-settings-button" />
      </form>
    </Dialog>
    
</template>

<script setup>
import Dialog from 'primevue/dialog';
import { defineEmits } from 'vue';

const emit = defineEmits(['update:visible']);
const account_settings = {
    email: '',
    phone: '',
    job_title: '',
    department: '',
    organization: '',
    location: '',
    password: ''
}

const saveSettings = () => {

}

const hideDialog = () => {
  emit('update:visible', false);
};
</script>

<style scoped>
.dialog-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    min-width: 350px;
    min-height: 500px;
    /* padding: 0px 50px 0px 50px; */
}
.profile-picture {
    height: 200px;
    width: 200px;
    background-image: url('../../../assets/profile-default.svg');
    background-size: cover;
}
.save-settings-button {
    width: 100%;
}
</style>
  