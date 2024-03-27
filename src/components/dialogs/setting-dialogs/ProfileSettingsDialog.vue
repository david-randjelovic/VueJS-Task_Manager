<template>
    <Dialog :visible="visible" :closable="true" modal @update:visible="hideDialog">
      <template #header>
        <h3>Account Settings</h3>
      </template>
      <form class="dialog-form" @submit.prevent="saveSettings">
        <div class="profile-picture-wrapper">
            <div class="profile-picture"></div>
            <div class="overlay">
                Upload picture
                <i class="pi pi-upload"></i>
            </div>
        </div>
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
        <PrimeButton label="Save Settings" type="submit" class="save-settings-button" />
      </form>
    </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog';
import { defineEmits, defineProps } from 'vue';
import UserService from '../../../services/UserService.js';
import { useToast } from 'primevue/usetoast';
import InfoService from '@/services/InfoService';

const toast = useToast();

const props = defineProps({
    visible: Boolean,
    userInfo: Object,
})

const emit = defineEmits(['update:visible']);

const account_settings = {
    email: props.userInfo.email,
    phone: props.userInfo.phone,
    job_title: props.userInfo.job_title,
    department: props.userInfo.department,
    organization: props.userInfo.organization,
    location: props.userInfo.location,
}

console.log(props.userInfo);

async function saveSettings () {
    const payload = {
        department: account_settings.department,
        email: account_settings.email,
        job_title: account_settings.job_title,
        location: account_settings.location,
        organization: account_settings.organization,
        phone: account_settings.phone,
    }
    try {
        const response = await UserService.updateUser(props.userInfo.id, payload);
        localStorage.setItem('user', JSON.stringify(response.data));
        hideDialog();
    } catch (e) {
        InfoService.showToast(toast, 'Error', 'Oops, something went wrong.', 'error');
    }
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
    border-radius: 50%;
    background-size: cover;
}
.save-settings-button {
    width: 100%;
}


.profile-picture-wrapper {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
}

.profile-picture {
    height: 100%;
    width: 100%;
    background-image: url('../../../assets/profile-default.svg');
    border-radius: 50%;
    background-size: cover;
    transition: opacity 0.3s ease;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    color: white;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
    font-size: 16px;
    border-radius: 50%;
    cursor: pointer;
}

.profile-picture-wrapper:hover .overlay {
    opacity: 1;
}

.profile-picture-wrapper:hover .profile-picture {
    opacity: 0.7;
}
</style>
  