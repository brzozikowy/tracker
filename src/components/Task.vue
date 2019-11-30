<template>
  <b-row :class="getClassRow(status)">
    <b-col cols="12" class="border"> {{name}} </b-col>

      <b-col cols="6">
        {{desc}}
      </b-col>
      <b-col cols="3">
        {{start}}
      </b-col>
      <b-col cols="3">
        Actual status: {{status}}
      </b-col>

  </b-row>
</template>

<script>
export default {
  name: 'Task',
  props: {
    name: String,
    desc: String,
    start: String,
    status: String
  },
    methods: {
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
  }
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
    border: 1px solid #fd7e14;
  }

  .row-active{
    border: 1px solid #17a2b8;
  }

  .row-paused{
    border: 1px solid #20c997;
  }
  .row-done{
    border: 1px solid #28a745;
  }

  .row {
    margin: 20px 10px;
  }

</style>
