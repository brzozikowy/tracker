<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="secondary">
            <b-navbar-brand >Task Timer Tracker</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item>
                        <b-button variant="info" v-b-modal.new-task>New task</b-button>
                    </b-nav-item>
                    <b-nav-item>
                        <b-button variant="info" v-b-modal.new-task-template>Add new template</b-button>
                    </b-nav-item>
                    <b-nav-item>
                        <b-button variant="info" v-b-modal.new-task-template>Template task</b-button>
                    </b-nav-item>
                    <b-nav-item>
                        <b-button variant="info" > Download csv</b-button>

                    </b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <b-nav-item>
                        Timer current task: 00:24:32
                    </b-nav-item>
                    <b-nav-item>
                        Timer: 01:24:32
                    </b-nav-item>
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2"
                         placeholder="Search task" v-model="search"
                          autocomplete="off" v-on:keyup="searchTasks"></b-form-input>
                    </b-nav-form>

                    <b-nav-item-dropdown right>
                        <template v-slot:button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item>
                            <b-button variant="success" v-b-modal.sing-in>Sing In</b-button>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <b-form @submit="onSubmitLogoutForm">
                                <b-button type="submit" variant="info">Logout</b-button>
                            </b-form>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <b-button variant="dark" v-b-modal.new-task>Sign Out</b-button>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <b-modal id="new-task" hide-footer>
            <template v-slot:modal-title>
               Add new task
            </template>
            <div class="d-block text-center">
                
                <b-form @submit="onSubmitNewTaskLogin">
                    <b-form-group
                            id="name-task-label"
                            label="Task name:"
                            label-for="name-task"
                    >
                        <b-form-input
                                id="name-task"
                                v-model="task.name"
                                type="text"
                                required
                                placeholder="Enter name new task"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                            id="name-desc-label"
                            label="Task Description:"
                            label-for="name-desc"
                    >
                        <b-form-input
                                id="name-desc"
                                v-model="task.desc"
                                type="text"
                                required
                                placeholder="Enter description new task"
                        ></b-form-input>
                        <b-button type="submit" variant="primary" style="margin-top: 20px;">Create</b-button>
                    </b-form-group>
                </b-form>
            </div>
        </b-modal>
        <b-modal id="sing-in" hide-footer>
            <template v-slot:modal-title>
                Login In
            </template>
            <div class="d-block text-center">
                <b-form @submit="onSubmitLoginForm">
                    <b-form-group
                            id="email-login-label"
                            label="Email address:"
                            label-for="email-login"
                    >
                        <b-form-input
                                id="email-login"
                                v-model="form.email"
                                type="email"
                                required
                                placeholder="Enter email"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                            id="pasword-login-label"
                            label="Password address:"
                            label-for="password-login"
                    >
                        <b-form-input
                                id="password-login"
                                v-model="form.paswwrod"
                                type="password"
                                required
                                placeholder="Enter password"
                        ></b-form-input>
                    </b-form-group>


                    <b-button type="submit" variant="primary">Create account</b-button>
                </b-form>
            </div>
        </b-modal>
    </div>
</template>

<script>

import store from '../../store/store'
import * as type from '../../store/mutation/types'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
    name: 'Nav',
    data(){
        return {
            form: {
                email: "",
                password: "",
            },
            task:{
                name: "",
                desc: ""
            },
            search: ""
        }
    },
    methods: {
        onSubmitLoginForm(evt) {
            evt.preventDefault()
            console.log(JSON.stringify(this.form))
        },
        onSubmitLogoutForm(evt){
            evt.preventDefault()
            console.log(JSON.stringify(this.form))
        },
        onSubmitNewTaskLogin(evt){
            evt.preventDefault()
            console.log(JSON.stringify(this.task))
        },
        searchTasks(){
            console.log("change searh");
            store.dispatch({
                type: type.SearchTask,
                search: this.search
            });

        }
    }

}
</script>

<style scoped>
    .btn-warning{
        color: white;
        margin-right: 20px;
    }

</style>
