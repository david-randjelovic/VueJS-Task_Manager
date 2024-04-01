<template>
    <div class="about-wrapper">
        <h1>Welcome to <span>About</span> Page!</h1>
        <p class="about-paragraph">
            Welcome to about page of this application! This application is developed and designed <span>only for showcase purposes</span> and should present a simple CRUD functionalities with REST API. 
            In order for this application to start you'll need to install local server service such as XAMPP which is php based. Then you'll need to install Composer and Laravel and start the application by running migrations,
            but firstly don't forget to run "<span>composer i</span>". You can run migrations with "<span>php artisan migrate</span>", there are currently no any seeders. After that feel free to run Laravel by entering "<span>php artisan serve</span>" command.
        </p>
        <h2>Did you setup everything correctly?</h2>
        <p class="about-paragraph">
            Let's talk a bit about the application itself, it should give similar vibes as other task managing apps but this is simplified version. You can add task for each list by clicking on <span>add task buttons</span>, you can edit tasks by clicking on <span>pencil icon</span>,
            you can also delete tasks by clicking on a <span>trash bin</span> icon and last but not least if you want to view the tasks description you can do so by clicking on <span>eye icon</span>. Another cool feature is that you can add new lists as you can
            on other task managing apps. You can delete lists as well but you can't delete them when there are any tasks inside them so make sure you move or delete tasks from that list before deleting the list, otherways you'll get a <span>blocking popup</span>.
            List names can also be edited, thats everything that someone needs for <span>managing tasks</span> isn't it? Sounds interesting? 
        </p>
        <PrimeButton label="Lets Explore The Dashboard" raised @click="goToDashboard"></PrimeButton>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToDashboard = () => {
    router.push('/dashboard');
}
</script>

<style scoped>
span {
    color: var(--line-color);
}
.about-wrapper {
    padding: 20px;
    color: var(--text-color);
}
.about-paragraph {
    max-width: 1200px;
}
</style>