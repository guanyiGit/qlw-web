<template>

  <div>
    <h1>8888888</h1>
    <a hrfe="#" @click="testcs">点</a>
  </div>


</template>

<script>
  export default {
    name: "test"
    ,data(){
      return{

      }
    },created(){

    },methods:{
      testcs(){
        alert(11)
        let num={};
        num.name="ttt"
        num.age=18
        this.$axios({
          url:'/biz/dogInfo/hello',
          params:{num:JSON.stringify(num)}
        }).then(ref=>{
          alert(ref.data)
        })
      }
    }
  }
</script>

<style scoped>

</style>
