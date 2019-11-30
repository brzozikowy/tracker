import Vue from 'vue'
import Vuex from 'vuex'

const axios = require('axios').default;

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        list: [
           /* {
                name: "Coffe time", desc: "Morning coffee break at 10 o'clock", start: "2019-11-29", status: "DURING",
            },
            {
                name: "Coffe time", desc: "Morning coffee break at 10 o'clock", start: "2019-11-29", status: "PASUED",
            },
            {
                name: "Coffe time", desc: "Morning coffee break at 10 o'clock", start: "2019-11-29", status: "WAITING"
            },
            {
                name: "Coffe time", desc: "Morning coffee break at 10 o'clock", start: "2019-11-29", status: "DONE"
            },*/
        ],
        auth: null
    },
    mutations: {
        newList (state){
            axios
                .get('http://localhost/taskTimerTracker/public/api/tasks')
                .then(response => (this.state.list = response.data))
        },
        searchTask(state, payload){
            console.log(payload.search);
            axios
            .get('http://localhost/taskTimerTracker/public/api/tasks' ,
            {
                params: {
                search: payload.search
            }
            })
            .then(response => (this.state.list = response.data))
        },
        increment (state, payload){
            return state.count = state.count + payload.amount;
        },
        decrement (state, payload){
            return state.count = state.count - payload.amount;
        }
    },
      actions: {
        newList (context) {
            context.commit('newList');
        },
        searchTask(context, payload) {
            context.commit('searchTask', payload);
        },
        increment (context, payload) {
            context.commit('increment', payload)
        },
        decrement (context, payload) {
            context.commit('decrement', payload)
        }
    }
  })
  export default store;