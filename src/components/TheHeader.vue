<template>
  <header class="app-header">
    <div class="logo-wrapper">
      <div class="logo"></div>
      <span class="heading">David's task manager</span>
    </div>
    <div class="header-right-side">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-search"></i>
        </InputGroupAddon>
        <InputText class="search-box" placeholder="Search..." @input="onSearch"/>
      </InputGroup>
      <div class="profile-menu" @click="toggle" aria-haspopup="true" aria-controls="overlay-menu" :style="{ backgroundImage: 'url('+ profilePictureUrl +')' }"></div>
      <PrimeMenu ref="menu" id="overlay-menu" :model="items" :popup="true" class="w-full md:w-15rem">
        <template #start>
          <div class="menu-template">
            <p class="menu-heading">Account</p>
            <div class="profile-wrapper">
              <div class="profile-picture" :style="{ backgroundImage: 'url('+ profilePictureUrl +')' }"></div>
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
  <ProfileSettingsDialog v-if="userInfo" :visible="accountSettingsDialogVisible" :userInfo="userInfo" @update:visible="accountSettingsDialogVisible = $event" @picture-uploaded="onPictureUploaded"></ProfileSettingsDialog>
  <PrimeToast position="bottom-right"/>
</template>

<script setup>
import { inject, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ProfileSettingsDialog from './dialogs/setting-dialogs/ProfileSettingsDialog.vue';
import profileDefault from '@/assets/profile-default.svg';


const router = useRouter();

const userInfo = JSON.parse(localStorage.getItem('user'));
const setSearchTerm = inject('setSearchTerm');
const defaultTheme = 'light';
let themeIcon = ref('pi pi-sun');
const storedTheme = localStorage.getItem('theme');
const theme = ref(storedTheme || defaultTheme);

const accountSettingsDialogVisible = ref(false);
let profilePictureUrl = ref(userInfo && userInfo.profile_picture ? `${process.env.VUE_APP_BACKEND_STORAGE_API_URL + userInfo.profile_picture}` : profileDefault);

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
                icon: themeIcon,
                command: () => {
                  setTimeout(() => { // Timeout is here in order for dialog closing animation to be smooth
                    toggleTheme();
                  },100)
                }
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

const onPictureUploaded = (picturePath) => {
  profilePictureUrl.value = `${process.env.VUE_APP_BACKEND_STORAGE_API_URL + picturePath}`;
}

const logOut = () => {
  router.replace('/auth/login');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

const applyTheme = (newValue) => {
  const href = newValue === 'dark' ? '/themes/dark-theme.css' : '/themes/light-theme.css';
  themeIcon.value = newValue === 'dark' ? 'pi pi-moon' : 'pi pi-sun';
  document.getElementById('theme-style').setAttribute('href', href);
  localStorage.setItem('theme', newValue);
};

watch(theme, applyTheme, { immediate: true });

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  height: 70px;
  /* background-color: #f4f4f4; */
  border-bottom: 1px solid var(--line-color);;
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
  background-size: cover;
  border-radius: 50%;
  width: 47px !important;
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
  border-radius: 50%;
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
.heading {
  color: var(--text-color);
}
input {
  background-color: transparent !important;
}
.p-inputtext:focus {
  border: 1px solid #fff;
}
.p-inputgroup-addon {
  background-color: transparent !important;
}
.pi, .pi-search {
  color: var(--text-color) !important;
}
</style>