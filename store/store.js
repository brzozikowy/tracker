import Vue from 'vue'
import Vuex from 'vuex'

const axios = require('axios').default;

const moment = require('moment')
require('moment/locale/es')
Vue.use(Vuex)
 
Vue.use(require('vue-moment'), {
    moment
})

const store = new Vuex.Store({
    state: {
        list: [],
        page: 0,
        auth: null,
        las_page: 1,
        state: true,
        date: moment().format('YYYY-MM-DD'),
        tomorrow: moment().add(1, 'd').format('YYYY-MM-DD'),
        yesterday: moment().subtract(1, 'd').format('YYYY-MM-DD'),
        addDay: 1,
        deleteDay: 1,
        calculateTime: false,
        allTime: "0",
        currentTime: '0',
        dailyTime: '0',
        calc: 0
        
    },
    mutations: {
        newList (state, payload){
            var url = "date=" + this.state.date;
            if(payload.search !== undefined){
                url += "&search="+ payload.search
            }
           
            axios
                .get('http://localhost/taskTimerTracker/public/api/tasks?'+url)
                .then(response => {
                    this.state.last_page = response.data.las_page
                        this.state.list = response.data.tasks
                        this.state.allTime =response.data.allTimer
                        this.state.dailyTime = response.data.dailyTimer
                        this.state.currentTime = response.data.currentTime
                        this.state.calc = response.data.calc
                    if(this.state.last_page === this.state.page){
                        this.state.state = false
                    }else{
                        this.state.state = true
                    }
                })
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
        changeDay(state, payload){
            if(payload.method === 'add'){
                this.state.addDay += 1;
                this.state.deleteDay -= 1;
            }else{
                this.state.addDay -= 1;
                this.state.deleteDay += 1;
            }
            this.state.date = payload.day
            this.state.tomorrow = moment().add(this.state.addDay, 'd').format('YYYY-MM-DD')
            this.state.yesterday =  moment().subtract(this.state.deleteDay, 'd').format('YYYY-MM-DD')
        },
        icrementTime(state){
            this.state.allTime ++
            this.state.dailyTime++
            this.state.currentTime++
        },

    },
    actions: {
        newList (context, payload) {
            context.commit('newList', payload);
        },
        searchTask(context, payload) {  
            context.commit('newList', payload);
        },
        changeDay (context, payload){
            context.commit('changeDay', payload);
            context.commit('newList', payload);
        },
        icrementTime(context){
            context.commit('icrementTime');
        }
    }
  })
  export default store;