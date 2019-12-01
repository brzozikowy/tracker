<template>
  <b-row class="text-center">
    <b-col cols="6">
      Timer today: {{getTime(dailyTime)}}
    </b-col>
    <b-col cols="6">
      Timer all tasks: {{getTime(allTime)}}
    </b-col>
    <b-col cols="12">
      <h1>
        All tasks of the day  
      </h1>
    </b-col>
    <b-col cols="4" >
      <b-button variant="outline-primary" @click="subDay()">  Previous day
        {{yesterday}}
      </b-button>
    </b-col>
    
    <b-col cols="4">
      <b-button variant="outline-primary" disabled> 
        {{date}}
      </b-button>
    </b-col>
    <b-col cols="4">
      <b-button variant="outline-primary" @click="addDay()">  Next day
        {{tomorrow}}
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from 'vuex'
import store from '../../store/store'
import * as type from '../../store/mutation/types'
export default {
  name: 'Time',
  created: function(){
    setInterval(this.checkTimer, 1000);
  },
  methods: {
    checkTimer(){
      if(this.$store.state.calc == 1){
        store.dispatch({
              type: type.IcrementTime
          });
      }
    },
    addDay: function(){
      this.changeDay("add", this.$store.state.tomorrow)
    },
    subDay: function(){
      this.changeDay("sub", this.$store.state.yesterday)
    },
    changeDay(method, day){
       store.dispatch({
                type: type.ChangeDay,
                method: method,
                day: day
            });
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
  },
  computed: mapState({
      date: function(state){
       return state.date; 
     },
      tomorrow: function(state){
       return state.tomorrow; 
     },
      yesterday: function(state){
       return state.yesterday; 
     },
     allTime: function(state){
       return state.allTime;
     },
     dailyTime: function(state){
       return state.dailyTime;
     },
     calc: function(state){
       return state.calc;
     }
  })
}
</script>

<style scoped>
</style>
