// PrimeVue components
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

// Theme relating things
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

export default {
    install: (app) => {
        app.use(PrimeVue);
        app.component('PrimeButton', Button);
        app.component('InputText', InputText);
        app.component('TextArea', Textarea);
        app.component('PrimeToast', Toast);
        app.use(ToastService);
    },
};