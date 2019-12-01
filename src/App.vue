<template>
  <div id="app">
    <Nav />
    <b-container>
      <Time />
        <Task
          v-for="val in list"
          v-bind:name="val.name"
          v-bind:desc="val.description"
          v-bind:start="val.created_at"
          v-bind:status="val.status"
          v-bind:id="val.id"
          v-bind:comment="val.comment"
          v-bind:time="val.time"
          :key="val.id"
        /> 
        <b-row v-if="list.length === 0" class=" no-result"> 
          <b-col cols="12">
          No task has been created for this day
          </b-col>
        </b-row>
    </b-container>

  </div>
</template>

<script>
import Task from './components/Task.vue'
import Nav from './views/Nav.vue'
import Time from './components/Time.vue'
import { mapState } from 'vuex'
import store from '../store/store'
import * as type from '../store/mutation/types'

export default {
  name: 'app',
  components: {
    Task,
    Nav,
    Time
  },
  created(){
    store.dispatch({
            type: type.Newlist
          });
    /*var tasks =  axios
      .get('http://wgoracej.usermd.net/api/tasks')
      .then(response => (this.info = response))
    console.log(tasks);*/

  },
  methods: {
    infiniteHandler($state){
      console.log("asd");
      /*store.dispatch({
        type: type.Newlist,
        page: this.$store.state.page
      });*/
      console.log('status')
      console.log(this.$store.state.state);
      console.log(this.$store.state.page);
      
      if(this.$store.state.state){

       $state.loaded();
      }else{
        $state.complete();
        
      }
     /* if(this.$store.state.status){
        $state.loaded();
      } else {
        $state.complete();
      }*/
    }
  }, 
  computed: mapState({
      list: function(state){
       return state.list;
     },
     page: function(state){
       return state.page;
     },
     state: function(state){
       return state.state;
     }
    })
}
</script>

<style>
.container {
  margin-top:50px;
}
.no-result{
  margin: 20px;
  font-size: 20px;
  text-align: center;
}


</style>
