<template>
    <div class="dashboard-wrapper">
        <div v-for="list in lists" :key="list.id" class="drop-zone" @drop="onDrop($event, list.id)" @dragenter.prevent @dragover.prevent>
            <div class="list-header">
                <h5 class="list-name">{{ trimText(list.name, 20) }}</h5>
                <div class="list-header-tools">
                    <i class="pi pi-pencil icon-hidden" @click="openEditListDialog(list.id)"></i>
                    <i class="pi pi-trash icon-hidden" @click="openDeleteListDialog(list.id)"></i>
                </div>
            </div>
            <div v-for="task in getList(list)" :key="task" class="drag-element" draggable="true" @dragstart="startDrag($event, task.id)" @click="openViewTaskDialog(task.title, task.description)">
                <div class="task-info">
                    <span>{{ trimText(task.title, 10) }}</span>
                    <span class="task-creation-date">Created at: {{ task.formattedDate }}</span>
                </div>
                <div class="toolbar">
                    <i class="pi pi-pencil icon-hidden" @click="openEditTaskDialog($event, task.title, task.description, task.id)"></i>
                    <i class="pi pi-trash icon-hidden" @click="openDeleteTaskDialog($event, task.id)"></i>
                </div>
            </div>
            <h5 class="add-task-button" @click="openAddTaskDialog(list.id)">+ Add new task</h5>
        </div>
        
        <div class="add-new-list-button" @click="openAddListDialog">
            <h5 class="list-name">+ Add new list</h5>
        </div>
    </div>

    <AddTaskDialog :visible="addTaskDialogVisible" @update:visible="addTaskDialogVisible = $event" :list_id="listId"  @task-added="handleNewTask"></AddTaskDialog>
    <AddListDialog :visible="addListDialogVisible" @update:visible="addListDialogVisible = $event" @list-added="handleNewList"></AddListDialog>
    <DeleteTaskDialog :visible="deleteTaskDialogVisible" @update:visible="deleteTaskDialogVisible = $event" :task_id="taskId" @task-deleted="handleDeletedTask"></DeleteTaskDialog>
    <ViewTaskDialog :visible="viewTaskDialogVisible" @update:visible="viewTaskDialogVisible = $event" :title="taskTitle" :description="taskDescription"></ViewTaskDialog>
    <EditListDialog :visible="editListDialogVisible" @update:visible="editListDialogVisible = $event" :list_id="listId" @list-edited="handleEditedList"></EditListDialog>
    <DeleteListDialog :visible="deleteListDialogVisible" @update:visible="deleteListDialogVisible = $event" :is_list_busy="isListBusy" :list_id="listId" @list-deleted="handleDeletedList"></DeleteListDialog>
    <EditTaskDialog :visible="editTaskDialogVisible" @update:visible="editTaskDialogVisible = $event" :task_id="taskId" :task_title="taskTitle" :task_description="taskDescription" @task-edited="handleEditedTask"></EditTaskDialog>
    <PrimeToast position="bottom-right"/>
</template>

<script setup>
// Task imports
import TaskService from '../services/TaskService.js'
import AddTaskDialog from '../components/dialogs/task-dialogs/AddTaskDialog.vue';
import EditTaskDialog from '../components/dialogs/task-dialogs/EditTaskDialog.vue';
import DeleteTaskDialog from '../components/dialogs/task-dialogs/DeleteTaskDialog.vue';
import ViewTaskDialog from '../components/dialogs/task-dialogs/ViewTaskDialog.vue';

// List imports
import ListService from '../services/ListService.js'
import AddListDialog from '../components/dialogs/list-dialogs/AddListDialog.vue';
import EditListDialog from '../components/dialogs/list-dialogs/EditListDialog.vue';
import DeleteListDialog from '../components/dialogs/list-dialogs/DeleteListDialog.vue';

//Other imports
import {ref, onMounted} from 'vue';
import { trimText } from '../utils/trim.js';
import InfoService from '../services/InfoService.js'
import { useToast } from 'primevue/usetoast';
import { inject, computed } from 'vue';

// Use
const toast = useToast();

// Certain Info
const listId = ref(null);
const taskId = ref(null);
const taskTitle = ref(null);
const taskDescription = ref(null);

//Dialogs
const addTaskDialogVisible = ref(false);
const viewTaskDialogVisible = ref(false);
const deleteTaskDialogVisible = ref(false);
const addListDialogVisible = ref(false);
const deleteListDialogVisible = ref(false);
const editTaskDialogVisible = ref(false);
const editListDialogVisible = ref(false);
const isListBusy = ref(false);

// Arrays
let lists = ref([]);
const tasks = ref([]);
const ftasks = ref([]);

// Lifecycles
onMounted(() => {
    loadLists();
    loadTasks();
})

// Searchbar
const searchTerm = inject('searchTerm');

const filteredTasks = computed(() => {
  return ftasks.value.filter(task => task.title.toLowerCase().includes(searchTerm.value.toLowerCase()));
});

// Date formatter
const formattedTasks = computed(() => {
  return filteredTasks.value.map(task => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    const formattedDate = new Date(task.created_at).toLocaleString(undefined, options);
    return {
      ...task,
      formattedDate: formattedDate
    };
  });
});

// App Functions
const getList = (list) => {
    return formattedTasks.value.filter((task) => task.list_id == list.id);
}

const startDrag = (event, task) => {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('taskID', task);
}

const onDrop = (event, list) => {
    const taskID = event.dataTransfer.getData('taskID');
    const ftask = ftasks.value.find((task) => task.id == taskID);
    ftask.list_id = list;
    updateTasksPosition(ftask.id, list);
}

// Dialogs
const openAddTaskDialog = (id) => {
    addTaskDialogVisible.value = true;
    listId.value = id;
};

const openViewTaskDialog = (task_title, task_description) => {
    viewTaskDialogVisible.value = true;
    taskTitle.value = task_title;
    taskDescription.value = task_description;
};

const openDeleteTaskDialog = (event, id) => {
    event.stopPropagation();
    deleteTaskDialogVisible.value = true;
    taskId.value = id;
}

const openEditListDialog = (id) => {
    editListDialogVisible.value = true;
    listId.value = id;
}

const openEditTaskDialog = (event, task_title, task_description, task_id) => {
    event.stopPropagation();
    editTaskDialogVisible.value = true;
    taskTitle.value = task_title;
    taskDescription.value = task_description;
    taskId.value = task_id;
}

const openAddListDialog = () => {
    addListDialogVisible.value = true;
}

const openDeleteListDialog = (id) => {
    isListBusy.value = tasks.value.some((task) => task.list_id == id); 
    deleteListDialogVisible.value = true;
    listId.value = id;
}

// Handlers
const handleNewList = (newListData) => {
    lists.value.push(newListData);
    InfoService.showToast(toast, 'Success', 'List has been created.', 'success');
}

const handleEditedList = (editedListData) => {
    const targetedList = lists.value.find((list) => list.id === editedListData.id);
    targetedList.name = editedListData.name;
    InfoService.showToast(toast, 'Success', 'List has been edited.', 'success');
}

const handleDeletedList = (list_id) => {
    lists.value = lists.value.filter((list) => list.id !== list_id);
    InfoService.showToast(toast, 'Success', 'List has been deleted.', 'success');
}

const handleNewTask = (newTaskData) => {
    ftasks.value.push(newTaskData);
    InfoService.showToast(toast, 'Success', 'Task has been created.', 'success');
}

const handleEditedTask = (newTaskData) => {
    let targetedTaskIndex = tasks.value.findIndex((task) => task.id === newTaskData.id)
    tasks.value[targetedTaskIndex] = newTaskData;
    ftasks.value[targetedTaskIndex] = newTaskData;
    InfoService.showToast(toast, 'Success', 'Task has been edited.', 'success');
}

const handleDeletedTask = (task_id) => {
    tasks.value = tasks.value.filter((task) => task.id !== task_id);
    ftasks.value = ftasks.value.filter((task) => task.id !== task_id);
    InfoService.showToast(toast, 'Success', 'Task has been deleted.', 'success');
}

// Call functions
async function updateTasksPosition(task_id, list_id) {
    try {
        const payload = {
            task_id: task_id,
            list_id: list_id
        }
        await TaskService.updateTasksList(payload);
    } catch(e) {
        InfoService.showToast(toast, 'Error', 'Unable to move task, something went wrong.', 'error');
    }
}

async function loadLists() {
    try {
        const response = await ListService.getLists();
        lists.value = response.data;
    } catch(e) {
        InfoService.showToast(toast, 'Error', 'Unable to load lists, something went wrong.', 'error');
    }
}

async function loadTasks() {
    try {
        const response = await TaskService.getTasks();
        tasks.value = response.data;
        ftasks.value = response.data;
    } catch(e) {
        InfoService.showToast(toast, 'Error', 'Unable to load tasks, something went wrong.', 'error');
    }
}
</script>

<style scoped>
.dashboard-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    overflow-x: auto;
}
.drop-zone {
    width: 300px;
    margin: 20px;
    background-color: #ecf0f1;
    padding: 10px 10px 1px 10px;
    min-height: 10px;
    border-radius: 10px;
    flex-shrink: 0;
    flex-grow: 0;
}
.drag-element {
    background-color: var(--primary-color);
    color: #fff;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 10px;
    cursor: grabbing;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.toolbar {
    display: flex;
    gap: 10px;
}
i {
    cursor: pointer;
}
.drag-el:nth-last-of-type(1) {
    margin-bottom: 0;
}
.add-task-button {
    display: inline-block;
    color: var(--subheading-color);
    margin-bottom: 5px;
    cursor: pointer;
}
.task-info {
    display: flex;
    flex-direction: column;
}
.task-creation-date {
    font-size: 12px;
}
.list-name {
    margin-bottom: 10px;
    color: var(--subheading-color);
}
.add-new-list-button {
    margin: 20px;
    padding: 10px;
    flex-shrink: 0;
    flex-grow: 0;
}
.add-new-list-button:hover {
    margin-top: 20px;
    padding: 10px 10px 1px 10px;
    background-color: var(--hover-color);
    border-radius: 10px;
    cursor: pointer;
}
.list-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
}
.list-header-tools {
    display: flex;
    gap: 10px;
    color: var(--subheading-color);
}
.icon-hidden {
    visibility: hidden;
}
.drag-element:hover .icon-hidden {
    visibility: visible;
}
.list-header:hover .icon-hidden {
    visibility: visible;
}
</style>