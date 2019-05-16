<template>
  <div class="mgl90">
    <!--<img src="../../../static/images/36.png" alt="">-->
    <img-edit class="ovh" ref="imgup4"  :file_List="fileList"  :disable="disable"></img-edit>

    <el-button size="medium" @click="submit">中等按钮</el-button>
  </div>
</template>

<script>
    export default {
        name: "uploadTest",
      data(){
        return {
          disable:true,
          // fileList:[],
          fileList:[{
            name:"0827-niutuku.com-13638.jpg",
            url:"https://qlw.soholy.cn/pic/group1/M00/00/27/wKgBElyCVxuAT1kRAAAn_XZTLL4790.jpg"
          },{
            name:"3.jpg",
            url:"https://qlw.soholy.cn/pic/group1/M00/00/26/wKgBElyCN3aAe196AADXkvB2f50501.jpg"
          }]
        }
      },
      methods:{
          submit(){
            this.$refs.imgup4.upload({type: 14, id: 1175});//图片上传
          }
      }

    }
</script>

<style scoped>

</style>
