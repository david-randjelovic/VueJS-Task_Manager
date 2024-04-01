<template>
    <aside class="app-sidebar">
        <div class="sidebar-header">
            <div class="project-icon"></div>
            <div class="project-info">
                <h6 class="project-name"><strong>Onikron</strong></h6>
                <span class="project-type">Software project</span>
            </div>
        </div>
        <div class="sidebar-main-wrapper">
            <nav>
                <ul>
                    <router-link class="sidebar-link" to="/dashboard">
                        <li class="sidebar-item">
                            <img class="sidebar-icon" src="../assets/dashboard-icon.svg">
                            <span>Dashboard</span>
                        </li>
                    </router-link>
                </ul>
                <ul>
                    <router-link class="sidebar-link" to="/about">
                        <li class="sidebar-item">
                            <img class="sidebar-icon" src="../assets/info-circle-icon.svg">
                            <span>About</span>
                        </li>
                    </router-link>
                </ul>
            </nav>
            <div class="sidebar-footer">
                <span class="footer-info">This is a showcase project</span>
                <h6>Made by David.</h6>
            </div>
        </div>

    </aside>
</template>

<script setup>
</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px;
}
.app-sidebar {
    display: inline-block;
    width: 250px;
    height: 92.4vh;
    border-right: 1px solid var(--line-color);
    padding: 30px 30px;
}
.sidebar-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--line-color);
}
.project-icon {
    background-image: url('../assets/project-default.svg');
    background-size: cover;
    width: 50px;
    height: 50px;
}
.sidebar-item {
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
    padding-top: 5px;
    padding-right: 5px;
    padding-left: 5px;
    padding-bottom: 5px;
}
.sidebar-item:hover {
    background-color: var(--hover-color);
    cursor: pointer;
    border-radius: 5px;
}
.sidebar-link {
    color: var(--text-color);
    text-decoration: none;
}
.sidebar-icon {
    width: 30px;
}
ul {
    list-style-type: none;
}
.sidebar-main-wrapper {
    display: flex;
    flex-direction: column;
    height: 95%;
    justify-content: space-between;
}
.sidebar-footer {
    text-align: center;
    color: var(--text-color);
}
.footer-info {
    font-size: 12px;
    color: var(--subheading-color);
}
.project-name {
    color: var(--text-color);
}
.project-type {
    color: var(--text-color);
}

</style>