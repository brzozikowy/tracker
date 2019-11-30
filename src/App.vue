<template>
  <div id="app">
    <Nav />
    <b-container>
      <h1>
        List of all tasks
      </h1>
        <Task
          v-for="val in list"
          v-bind:name="val.name"
          v-bind:desc="val.description"
          v-bind:start="val.created_at"
          v-bind:status="val.status"
        />
    </b-container>

  </div>
</template>

<script>
import Task from './components/Task.vue'
import Nav from './views/Nav.vue'
import { mapState } from 'vuex'
import store from '../store/store'
import * as type from '../store/mutation/types'

export default {
  name: 'app',
  components: {
    Task,
    Nav
  },
  created(){
    store.dispatch({
            type: type.Newlist
          });
    /*var tasks =  axios
      .get('http://localhost/taskTimerTracker/public/api/tasks')
      .then(response => (this.info = response))
    console.log(tasks);*/

  },
 
  computed: mapState({
      list: function(state){
       return state.list;
     }
    })
}
</script>

<style>
.container {
  margin-top:50px;
}


</style>
