<template>
    <div class="login-wrapper">
     <form @submit.prevent="loginUser">
         <div class="upper-line"></div>
         <div class="logo-wrapper">
             <img class="logo" src="../../assets/logo.svg" alt="logo.svg">
             <span>David's task manager</span>
             <span class="faded">(Login Form)</span>
         </div>
         <div class="form-items">
             <div class="form-item">
                 <label for="email" class="faded">E-mail</label>
                 <InputGroup>
                    <InputGroupAddon>
                    <i class="pi pi-envelope"></i>
                    </InputGroupAddon>
                    <InputText id="email" v-model="userForm.email" aria-describedby="email-help" @blur="$v.email.$touch()"/>
                </InputGroup>
                 <span class="error-message" v-if="$v.email.$error">Email not valid.</span>
             </div>
             <div class="form-item">
                 <label for="password" class="faded">Password</label>
                 <InputGroup>
                    <InputGroupAddon>
                    <i class="pi pi-lock"></i>
                    </InputGroupAddon>
                    <InputText id="password" v-model="userForm.password" aria-describedby="password-help" type="password" @blur="$v.password.$touch()"/>
                </InputGroup>
                 <span class="error-message" v-if="$v.password.$error">Password must be at least 6 numbers long.</span>
             </div>
             <div class="buttons">
                <PrimeButton type="submit" class="login-button" label="Login" raised :disabled="$v.$invalid"/>
                <router-link to="/auth/register" class="register-link">
                    <span>Don't have an account?</span>
                </router-link>
             </div>
             <PrimeToast position="bottom-right"/>
         </div>
     </form>
    </div>
 </template>

<script setup>
import { login } from '../../services/UserService.js';
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, email } from '@vuelidate/validators';
import InfoService from '../../services/InfoService.js';
import { useToast } from 'primevue/usetoast';

// Use
const toast = useToast();
const router = useRouter();

const userForm = reactive({
    email: '',
    password: '',
});

const rules = computed(() => ({
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
}))

const $v = useVuelidate(rules, userForm);

const loginUser = async () => {
    $v.value.$touch();
    try {
        const response = await login({
          email: userForm.email,
          password: userForm.password,
        });
        
        router.replace('/dashboard');
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
    } catch (error) {
        InfoService.showToast(toast, 'Error', 'Unable to login, something went wrong.', 'error');
    }
};
</script>

<style scoped>
.pi .pi-envelope {
    color: var(--text-color) !important;
}
.login-wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
}
.upper-line {
    height: 20px;
    width: 100%;
    background-color: var(--primary-color);
}
form {
    width: 400px;
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.5), 0px 2px 4px -1px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
}
.logo-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
    margin-top: 40px;
    color: var(--text-color);
}
.faded {
    color: var(--subheading-color);
}
.form-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0px 20px 0px 20px;
}
.form-item {
    display: flex;
    flex-direction: column;
}
.logo {
    width: 100px;
}
.login-button {
    margin-top: 10px;
    margin-bottom: 30px;
    width: 100%;
}
.register-link {
    text-decoration: none;
    color: var(--subheading-color);
}
.error-message {
    color: var(--error-color);
}
label {
    margin-bottom: 10px;
}
</style>