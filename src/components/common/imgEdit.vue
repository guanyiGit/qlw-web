<template>
  <div class="file">
    <el-upload
      ref="imgupload"
      :action="uploadUrl"
      multiple
      :data="uploadData"
      show-file-list
      :limit="limit"
      :auto-upload='false'
      list-type="picture-card"
      :on-exceed="maxFileHandle"
      :on-change="changeHandle"
      :disabled='Disable'
      :before-upload="beforeUpload"
      :on-remove="onRemove"
      :on-success="onSuccess"
      :on-preview="successHandle"
      :file-list="fileList">
        <div v-show="! Disable" class="el-upload__text cont-icon" slot="trigger"><i class="el-icon-plus icon"></i></div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="item.url" :alt="item.name"
         v-if="fileList && fileList.length>0"
         v-for="(item,index) in fileList" :key="index">
  </el-dialog>
  </div>
</template>
<script>
  export default {
    inject:['reload'],
    name: "upload",
    data() {
      return {
        fileList: this.file_List,
        Id3:this.Id2,
        limit: 4,
        dialogVisible: false,
        uploadUrl:"/biz/fileManager/editFileBatch",
        // uploadUrl:"/biz/fileManager/uploadFileBatch",//上传的url
        uploadData:{
          type:'',
          Id:'',
          urlList:[]  //存放原来已经存在的图片url
        }

      };
    },
    props: [
      'file_List',
      'Disable',
      'Id2'
    ],

    created(){

    },

    watch: {

    },
    methods: {
      successHandle(file) {
        this.dialogVisible = true;
        console.log(file)
      },
      onRemove(file, fileList){
        console.log("删除前 this.fileList"+JSON.stringify(this.fileList));
        // this.uploadData.urlList=[];
        // this.fileList.map(file =>{
        //   this.uploadData.urlList.push(file.url);
        // })
        this.$axios({
          url: '/biz/fileManager/deleteFile',
          params: {'type': 9,'Id':this.Id3,'urlList':file.url}
        }).then(res => {

        })
      },
      beforeUpload(file){
        console.log("beforeUpload this.fileList"+JSON.stringify(this.fileList))
        this.uploadData.urlList=[];
        this.fileList.map(file =>{
          this.uploadData.urlList.push(file.url);
        })

      },
      onSuccess(response, file, fileList) {
        // this.fileList=[];
        this.reload()
      },
      maxFileHandle() {
        this.$alert('单次上传文件过多', '上传提示')
      },
      changeHandle(file, fileList) {
        // debugger
        // this.fileList = fileList;
      },
      upload({type,id,urlList}){
        console.log(this.fileList.length)
          this.uploadData.type = type;
          this.uploadData.Id = id;

          this.$refs.imgupload.submit();

      },
      deleteFile(){

      }
    },
  }
</script>

<style scoped>
  .icon {
    font-size: 60px;
    vertical-align: middle;
  }
  .file{
    border: 1px dashed #aaa;
  }

</style>
