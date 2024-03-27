// PrimeVue components
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Menu from 'primevue/menu';

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
        app.component('InputGroup', InputGroup);
        app.component('InputGroupAddon', InputGroupAddon);
        app.component('PrimeMenu', Menu);
        app.use(ToastService);
    },
};