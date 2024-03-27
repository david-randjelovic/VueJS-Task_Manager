<template>
  <header class="app-header">
    <div class="logo-wrapper">
      <div class="logo"></div>
      <span>David's task manager</span>
    </div>
    <div class="header-right-side">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-search"></i>
        </InputGroupAddon>
        <InputText placeholder="Search..." @input="onSearch"/>
      </InputGroup>
      <div class="profile-menu" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" ></div>
      <PrimeMenu ref="menu" id="overlay_menu" :model="items" :popup="true" class="w-full md:w-15rem">
        <template #start>
          <div class="menu-template">
            <p class="menu-heading">Account</p>
            <div class="profile-wrapper">
              <div class="profile-picture"></div>
              <div class="profile-info">
                <span class="full-name">{{ userInfo.name }}</span>
                <span class="email">{{ userInfo.email }}</span>
              </div>
            </div>
        </div>
        </template>
    </PrimeMenu>
  </div>
  </header>
  <ProfileSettingsDialog :visible="accountSettingsDialogVisible" @update:visible="accountSettingsDialogVisible = $event"></ProfileSettingsDialog>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import ProfileSettingsDialog from './dialogs/setting-dialogs/ProfileSettingsDialog.vue';

const router = useRouter();
const userInfo = JSON.parse(localStorage.getItem('user'));
const setSearchTerm = inject('setSearchTerm');

const accountSettingsDialogVisible = ref(false);
const menu = ref();
const items = ref([
    {
        label: 'Profile',
        items: [
            {
                label: 'Settings',
                icon: 'pi pi-cog',
                command: () => {
                  openProfileSettingsDialog()
                }
            },
            {
                label: 'Theme',
                icon: 'pi pi-sun'
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => {
                  logOut();
                }
            }
        ]
    }
]);

const openProfileSettingsDialog = () => {
    accountSettingsDialogVisible.value = true;
}

const toggle = (event) => {
    menu.value.toggle(event);
};

const onSearch = (event) => {
  setSearchTerm(event.target.value);
};

const logOut = () => {
  router.replace('/auth/login');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  height: 70px;
  /* background-color: #f4f4f4; */
  border-bottom: 1px solid var(--secondary-color);
  padding: 10px 20px 10px 20px;
}
.logo-wrapper {
  display: flex;
  align-items: center;
}
.logo {
  display: inline-block;
  background-image: url('../assets/logo.svg');
  background-size: cover;
  width: 50px;
  height: 50px;
  margin-right: 5px;
}
.profile-icon {
  display: inline-block;
  background-image: url('../assets/profile-default.svg');
  background-size: cover;
  width: 30px;
  height: 30px;
}
.header-right-side {
  display: flex;
  align-items: center;
  gap: 10px;
}
.profile-menu {
  background-image: url('../assets/profile-default.svg');
  background-size: cover;
  width: 45px !important;
  height: 40px !important;
  cursor: pointer;
}
.menu-template {
  padding: 0px 14px 0px 14px;
}
.profile-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-bottom: 12px;
}
.profile-picture {
  margin-left: -5px;
  width: 40px;
  height: 40px;
  background-image: url('../assets/profile-default.svg');
  background-size: cover;
}
.profile-info {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
.email {
  font-size: 12px;
  color: #94A3B8;
}
.menu-heading {
  color: #94A3B8;
  font-weight: 700;
  padding: 12px 0px 12px 0px;
  margin: 0px;
}
</style>