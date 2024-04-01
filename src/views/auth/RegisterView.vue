<template>
   <div class="registration-wrapper">
    <form @submit.prevent="registerUser">
        <div class="upper-line"></div>
        <div class="logo-wrapper">
            <img class="logo" src="../../assets/logo.svg" alt="logo.svg">
            <span>David's task manager</span>
            <span class="faded">(Registration Form)</span>
        </div>
        <div class="form-items">
            <div class="form-item">
                <label for="username" class="faded">Full Name</label>
                <InputGroup>
                    <InputGroupAddon>
                    <i class="pi pi-user"></i>
                    </InputGroupAddon>
                    <InputText id="username" v-model="userForm.full_name" aria-describedby="username-help" @blur="$v.full_name.$touch()"/>
                </InputGroup>
                <span class="error-message" v-if="$v.full_name.$error">Name is required.</span>
            </div>
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
                <label for="phone" class="faded">Phone</label>
                <InputGroup>
                    <InputGroupAddon>
                    <i class="pi pi-phone"></i>
                    </InputGroupAddon>
                    <InputText id="phone" v-model="phoneNumber" aria-describedby="phone-help" @blur="$v.phone.$touch()"/>
                </InputGroup>
                <span class="error-message" v-if="$v.phone.$error">Phone must be at least 10 numbers long.</span>
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
                <PrimeButton type="submit" class="register-button" label="Register" raised :disabled="$v.$invalid"/>
                <router-link to="/auth/login" class="login-link">
                    <span>Already have an account?</span>
                </router-link>
            </div>
        </div>
    </form>
   </div>
</template>

<script setup>
import { register } from '../../services/UserService.js';
import { reactive, computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, email } from '@vuelidate/validators';
import InfoService  from '../../services/InfoService.js';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const router = useRouter();
const phoneNumber = ref('');

// Phone input custom validation
onMounted(() => {
    const inputElement = document.getElementById('phone');
    inputElement.addEventListener('keydown', isNumericInput);
    inputElement.addEventListener('paste', handlePaste);
});

const isNumericInput = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && (charCode < 96 || charCode > 105) && charCode !== 8) {
        event.preventDefault();
    }
};

const handlePaste = (event) => {
    const pasteData = (event.clipboardData || window.clipboardData).getData('text');
    if (!/^\d+$/.test(pasteData)) {
        event.preventDefault();
    }
};

// Form functions
const userForm = reactive({
    full_name: '',
    email: '',
    phone: phoneNumber,
    password: '',
});

const rules = computed(() => ({
      full_name: {
        required,
        minLength: minLength(2)
      },
      email: {
        required,
        email
      },
      phone: {
        required,
        minLength: minLength(10)
      },
      password: {
        required,
        minLength: minLength(6)
      },
}))

const $v = useVuelidate(rules, userForm);

const registerUser = async () => {
    $v.value.$touch();
    try {
         await register({
          username: userForm.full_name,
          email: userForm.email,
          phone: userForm.phone,
          password: userForm.password,
        });
        router.replace('/auth/login');
    } catch (error) {
        InfoService.showToast(toast, 'Error', 'Unable to register, something went wrong.', 'error');
    }
};
</script>

<style scoped>
.registration-wrapper {
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
    margin-bottom: 40px;
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
.register-button {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 30px;
}
.login-link {
    text-decoration: none;
    color: var(--subheading-color);
}
.error-message {
    color: var(--error-color);
}
</style>