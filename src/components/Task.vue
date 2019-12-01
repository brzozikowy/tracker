<template>
  <b-row :class="getClassRow(status)">
    <b-col cols="12" class="border">
      <b-row>
        <b-col xs="12" sm="12" md="8" lg="9">
          {{name}}
        </b-col>
         <b-col xs="12" sm="12" md="4" lg="3" class="text-right">
           <b-row>
          <!-- <font-awesome-icon icon="plus-circle" /> -->
              <b-col >
                <font-awesome-icon icon="pause-circle" @click="changeStatus('PAUSED')" v-if="status === 'DURING'"/>
              </b-col>
              <b-col >
                <font-awesome-icon icon="check-circle" v-if="status === 'DURING'" @click="changeStatus('DONE')"/>
                <font-awesome-icon icon="play-circle"  v-if="status !== 'DURING' && status !== 'DONE'" @click="changeStatus('DURING')"/>
              </b-col>
              <b-col>
                <font-awesome-icon icon="edit" @click="showEditModal = !showEditModal"/>
             </b-col>
             <b-col @click="deleteTask">
                <font-awesome-icon icon="trash" /> </b-col>
           </b-row>
        </b-col>
      </b-row>
        </b-col>

      <b-col cols="6">  
        {{desc}}
      </b-col>
      <b-col cols="3">
        Total tiem spent: {{ status ==='DURING'? getTime(currentTime) :  getTime(time) }}
      </b-col>
      <b-col cols="3">
        Actual status: {{status}}
      </b-col>
      <b-modal id="edit-task" v-model="showEditModal"  hide-footer>
        <template v-slot:modal-title>
          Edit task:
        </template>
        <div class="d-block text-center">
          <b-form @submit="onSubmitEditTask">
            <b-form-group
              id="name-task-label"
              label="Task name:"
              label-for="name-task"
            >
              <b-form-input
                id="name-task"
                v-model="edit.newName"
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
                v-model="edit.newDesc"
                type="text"
                required
                placeholder="Enter description new task"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" style="margin-top: 20px;">Change</b-button>
            <b-form-checkbox
              id="checkbox-1"
              v-model="addComment"
              name="checkbox-1"
            >
              Add comment to task
            </b-form-checkbox>
          </b-form>
        
          <b-form @submit="onSubmitAddComment" v-if="addComment">
            <b-form-group
              id="add-comment-label"
              label="Comment description:"
              label-for="add-comment"
            >
              <b-form-input
                id="add-comment"
                v-model="commentDesc"
                type="text"
                required
                placeholder="Comment description:"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary" style="margin-top: 20px;">Add Comment</b-button>
          </b-form>
          <div v-for="item in comment" v-bind:key="item.id" class="group-comment">
            <div>
              Comment: {{item.description}}
            </div>
            <div v-if="item.user_id !== null">
              Autor: {{item.user.email}}
            </div>
          </div>
        </div>
      </b-modal>
  </b-row>
</template>

<script>

const axios = require('axios').default;
import Vue from 'vue'
import { mapState } from 'vuex'
import store from '../../store/store'
import * as type from '../../store/mutation/types'
export default {
  name: 'Task',
  props: {
    name: String,
    desc: String,
    start: String,
    status: String,
    id: Number,
    comment: Array,
    time: Number,
  },
  created: function(){
    this.edit.newName = this.name,
    this.edit.newDesc = this.desc,
    setInterval(this.checkTimer, 1000);
  },
  data(){
    return {
      showEditModal: false,
      addComment: false,
      commentDesc: '',
      edit: {
        newName: '',
        newDesc: ''
      }
    }
  },
    methods: {
    
      changeStatus(status){
        const vm = this;
         axios
            .post('http://localhost/taskTimerTracker/public/api/tasks/changeStatus/'+this.id ,{
              status: status,
              date: this.$store.state.date
              })
            .then((respone) =>{
              console.log("Asdasd");
              store.dispatch({
                type: type.Newlist,
                search: vm.search
              }); 
              Vue.swal('Ok', "Changed status", 'success')
            }).catch((err) =>{
              Vue.swal('Error', err.response.data, 'error')
            })
      },
      deleteTask(){
        const vm = this;
        this.$swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.value) {
          axios
            .delete('http://localhost/taskTimerTracker/public/api/tasks/delete/'+this.id ,)
            .then((respone) =>{
                Vue.swal('Deleted!', 'Task hase been deleted', 'success')   
                store.dispatch({
                    type: type.Newlist,
                     search: vm.search
                });             
            },
            function(error){ 
                Vue.swal('Error', 'Some kind of error', 'error')
            })
        }
        })
      },
      getClassRow(sta){
          if(sta == "DURING") {
              return 'row-active'
          }else if(sta == 'PAUSED') {
              return 'row-paused'
          }else if(sta =='WAITING'){
              return 'row-waiting'
          }else{
              return 'row-done'
          }
      },
      onSubmitEditTask(evt){
        evt.preventDefault()
        var vm = this;
          axios
            .post('http://localhost/taskTimerTracker/public/api/tasks/edit/'+this.id ,{
              name: this.edit.newName,
              desc: this.edit.newDesc
            }).then((respone) =>{
              this.showEditModal = !this.showEditModal
                store.dispatch({
                    type: type.Newlist,
                     search: vm.search
                });  
            }),
            function(error){ 
                Vue.swal('Error', 'Some kind of error', 'error')
            }
      },
      onSubmitAddComment(evt){
        evt.preventDefault()
         axios
            .post('http://localhost/taskTimerTracker/public/api/comment/add/'+this.id ,{
              auth: this.$store.state.auth,
              description: this.commentDesc
            })
            .then((respone) =>{
                Vue.swal('Added!', 'You added a comment', 'success')   
                store.dispatch({
                    type: type.Newlist,
                     search: vm.search
                });             
            },
            function(error){ 
                Vue.swal('Error', 'Some kind of error', 'error')
            })
      },
      getTime(time){
        var sec_num = parseInt(time, 10)
        var hours   = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60

        return [hours,minutes,seconds]
          .map(v => v < 10 ? "0" + v : v)
          .filter((v,i) => v !== "00" || i > 0)
          .join(":")
      }
  } ,
  computed: mapState({
      auth: function(state){
       return state.auth;
     },
     currentTime: function(state){
       return state.currentTime;
     }
    }),
}
</script>

<style scoped>
  .row-active > .border{
    background-color: #17a2b8!important;
    border: none !important;
    color: #fff!important;
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0,0,0,.03);
  }

  .row-paused > .border{
    background-color: #20c997 !important;
    border: none !important;
    color: #fff!important;
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0,0,0,.03);
  }

  .row-waiting > .border{
    background-color: #fd7e14 !important;
    border: none !important;
    color: #fff!important;
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0,0,0,.03);
  }

  .row-done > .border{

    background-color: #28a745  !important;
    border: none !important;
    color: #fff!important;
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0,0,0,.03);
  }

  .row-waiting{
    margin: 20px 10px;
    border: 1px solid #fd7e14;
  }

  .row-active{
    margin: 20px 10px;
    border: 1px solid #17a2b8;
  }

  .row-paused{
    margin: 20px 10px;
    border: 1px solid #20c997;
  }
  .row-done{
    margin: 20px 10px;
    border: 1px solid #28a745;
  }

  .text-right{
    font-size: 20px;
    padding: 5px;
  }
  svg {
    cursor: pointer;
  }

  .group-comment{
    border:#17a2b8 1px solid;
    margin: 10px 0px;
  }

</style>
