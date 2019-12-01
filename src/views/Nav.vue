<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="secondary">
            <b-navbar-brand >Task Timer Tracker</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item>
                        <b-button variant="info" @click="showAddtaskModal = !showAddtaskModal">New task</b-button>
                    </b-nav-item>
                    <b-nav-item>
                        <b-button variant="info" @click="addDaily">Add daily tasks</b-button>
                    </b-nav-item>
                    <b-nav-item>
                        <b-button variant="info" @click="showAddtemplateModal = !showAddtemplateModal">Create template task</b-button>
                    </b-nav-item>
                    <b-nav-item  href="/api/list/download" target='_blank'>
                        <b-button variant="info"> Download csv</b-button>
                    </b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <b-form-input size="sm" class="mr-sm-2"
                        placeholder="Search task" v-model="search"
                        autocomplete="off" v-on:keyup="searchTasks" ></b-form-input>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <b-modal id="new-task" v-model="showAddtaskModal"  hide-footer>
            <template v-slot:modal-title>
               Add new task
            </template>
            <div class="d-block text-center">
                
                <b-form @submit="onSubmitNewTask">
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
        <b-modal id="new-task" v-model="showAddtemplateModal"  hide-footer>
            <template v-slot:modal-title>
               Add new template
            </template>
            <div class="d-block text-center">
                
                <b-form @submit="onSubmitNewTemplate">
                    <b-form-group
                        id="name-template-label"
                        label="Task template name:"
                        label-for="name-task"
                    >
                        <b-form-input
                            id="name-task"
                            v-model="template.name"
                            type="text"
                            required
                            placeholder="Enter new name template"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="name-template-label"
                        label="Template Description:"
                        label-for="name-template"
                    >
                        <b-form-input
                            id="name-template"
                            v-model="template.desc"
                            type="text"
                            required
                            placeholder="Enter new description template"
                        ></b-form-input>
                        <b-button type="submit" variant="primary" style="margin-top: 20px;">Create</b-button>
                    </b-form-group>
                </b-form>
            </div>
        </b-modal>
    </div>
</template>

<script>

const axios = require('axios').default;
import store from '../../store/store'
import * as type from '../../store/mutation/types'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { mapState } from 'vuex'
import Vue from 'vue'
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
            template:{
                name: "",
                desc: ""
            },
            search: "",
            showAddtaskModal: false,
            showAddtemplateModal: false
        }
    },
    computed: mapState({
      auth: function(state){
       return state.auth;
     }
    }),
    methods: {
        addDaily(){
            var vm = this;
            axios
            .post('http://wgoracej.usermd.net/api/addTemplate',)
            .then((respone) =>{
                Vue.swal('Added!', 'Template tasks hase been added', 'success')   
                store.dispatch({
                    type: type.Newlist,
                     search: vm.search
                });             
            },
            function(error){ 
                Vue.swal('Error', 'Some kind of error', 'error')
            })
        },
        onSubmitNewTask(evt){
            const vm = this;
            evt.preventDefault()
            
            this.showAddtaskModal = !this.showAddtaskModal
             axios
            .post('http://wgoracej.usermd.net/api/tasks/create' ,
            {
                name: this.task.name,
                desc: this.task.desc,
                user_id: this.$store.state.auth
            })
            .then((respone) =>{
                Vue.swal('Ok', 'Added new task', 'success')   
                vm.task.name = ""
                vm.task.desc = ""
                vm.search = ''

                store.dispatch({
                    type: type.SearchTask,
                     search: vm.search
            });             
            },
            function(error){ 
                Vue.swal('Error', 'Some kind of error', 'error')
            })
           
        },
        onSubmitNewTemplate(evt){
            const vm = this;
            evt.preventDefault()
            
            this.showAddtemplateModal = !this.showAddtemplateModal
             axios
            .post('http://wgoracej.usermd.net/api/createTemplate' ,
            {
                name: this.template.name,
                desc: this.template.desc
            })
            .then((respone) =>{
                Vue.swal('Ok', 'Added new template', 'success')   
                vm.template.name = ""
                vm.template.desc = ""
                       
            },
            function(error){ 
                Vue.swal('Error', 'Some kind of error', 'error')
            })
           
        },
        searchTasks(evt){
            evt.preventDefault()
            store.dispatch({
                type: type.Newlist,
                search: this.search
            });
        },
    }

}
</script>

<style scoped>
    .btn-warning{
        color: white;
        margin-right: 20px;
    }

</style>
