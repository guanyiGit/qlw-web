<template>
  <div class="w980 fr">
    <div class="mgt20 k3">
      <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">犬只信息<span style="margin-left: 80%;"><a style="color: #fbad82;cursor:pointer;" @click="update()" v-show="edit">修改</a>
        <a  style="color: #fbad82;cursor:pointer;display: none" v-show="save" @click="saveDogInfo">保存</a>
        <a style="color: #fbad82;cursor:pointer;margin-left: 2%;" @click="back()">返回</a>
      </span></div>
      <div class="pdt10 pdb20 pdr30">
        <!---->
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">犬名</span>
            <div class="mgl100">
              <input type="text"  class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogInfo.dogName" :disabled="disabled">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w100 fl h40 lh40 cor0 pdl30">品种</span>
            <div class="mgl100">
              <select  type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogInfo.dogBreedType" :disabled="disabled">
                <option v-for="item in breedList" v-bind:value="item.dictionaryValue">{{item.dictionaryDescribe}}</option>
              </select>
            </div>
          </div>
        </div>
        <div id="remaining">
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">性别</span>
              <div class="mgl100">
                <select  class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogInfo.dogGender" :disabled="disabled">
                  <option value="0">雄</option>
                  <option value="1">雌</option>
                </select>
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w100 fl h40 lh40 cor0 pdl30">毛色</span>
              <div class="mgl100">
                <select  type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogInfo.dogColorType" :disabled="disabled">
                  <option v-for="item in colorList" v-bind:value="item.dictionaryValue">{{item.dictionaryDescribe}}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">犬龄(岁)</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogInfo.dogAge"  :disabled="disabled" placeholder="请填写纯数字字符">
              </div>
            </div>
          </div>

        </div>
       <!-- <template v-if="divImg">
          <div class="mgt20">
            <span class="db w100 fl h40 lh40 pdl30 cor0">照片</span>
            <div class="mgl100 ovh">
              <div style="float: left">
                <img-upl class="ovh" ref="imgup"></img-upl>
                <div class="el-upload__text" style="width:178px;text-align: center;">犬只正面照</div>
              </div>
              <div style="float: left;margin-left: 10px">
                <img-upl class="ovh" ref="imgup1"></img-upl>
                <div class="el-upload__text" style="width:178px;text-align: center;">犬只侧面照</div>
              </div>
            </div>

          </div>
        </template>-->
        <template>
          <div class="mgt20">

            <span class="db w100 fl h40 lh40 pdl30 cor0">照片</span>
            <div class="mgl100 ovh">
              <!--<img-upload class="ovh" ref="imgup"></img-upload>-->
              <div style="float: left" v-if="divImg2">
                <img  v-bind:src="dogInfo.zUrl" alt="" style="height: 120px;width: 120px" @click="showBigImg(dogInfo.zUrl)">
                <div class="el-upload__text" style="width:115px;text-align: center;" v-if="divImg1">犬只正面照</div>
                <div class="el-upload__text" style="width:115px;text-align: center; cursor:pointer;color:#00F" v-else="divImg1" @click="qc1()">删除</div>
              </div>
              <div style="float: left" v-else="divImg2">
                <img-upl class="ovh" ref="imgup"></img-upl>
                <div class="el-upload__text" style="width:178px;text-align: center;">犬只正面照</div>
              </div>



              <div style="float: left;margin-left: 10px" v-if="divImg3">
                <img  v-bind:src="dogInfo.cUrl" alt="" style="height: 120px;width: 120px" @click="showBigImg(dogInfo.cUrl)">
                <div class="el-upload__text" style="width:115px;text-align: center;" v-if="divImg1">犬只侧面照</div>
                <div class="el-upload__text" style="width:115px;text-align: center;cursor:pointer;color:#00F" v-else="divImg1" @click="qc2()">删除</div>
              </div>
              <div style="float: left;margin-left: 10px" v-else="divImg3">
                <img-upl class="ovh" ref="imgup1"></img-upl>
                <div class="el-upload__text" style="width:178px;text-align: center;">犬只侧面照</div>
              </div>

            </div>

          </div>
        </template>



      </div>
    </div>
    <!--放大图片-->
    <div class="T db Ti" style="display: none;z-index: 5" @click="imgHide()">
      <div class="tan6 abs" style="height: 500px;width: 500px">
        <img class="imgtan abs" id="imgg" :src="url">
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import VDistpicker from 'v-distpicker'
  import configJS from '../../common/config'


  export default {
    name: "dogDetail",
    data() {
      return {
        url:'',
        edit:true,
        save:false,
        flag: true,
        divImg1: true,
        divImg2:true,
        divImg3:true,
        zImageId:0,
        zImage:false,
        cImageId:0,
        cImage:false,
        fileList: [],
        images: [],
        disabled: true,
        dogInfo:{},
        disTrictList:[],
        breedList:[],
        colorList:[]
      }

    },
    components: {VDistpicker},
    created() {
      let dogId=this.$route.params.dogId;
      DogDetail(this,dogId)
      initSelectOption(this);
    },

    watch: {},
    mounted() {

    },
    methods: {
      showBigImg:function (url) {
        this.url=url
        console.log(this.url)
        $(".Ti").show();
      },
      imgHide:function () {
        $(".Ti").hide();
      },
      update(){
        this.divImg1=false;
        this.disabled=false;
        this.edit=false;
        this.save=true;
      },
      qc1(){
        this.divImg2=false;
        deletePic(this,this.zImageId,1);
      },
      qc2(){
        this.divImg3=false;
        deletePic(this,this.cImageId,2);
      },
      back(){
        this.$router.push({name:'dogOwnerDetail',params:{dogOwnerId:this.dogInfo.dogOwnerId}})
      },

      saveDogInfo:function () {
        if($.trim(this.dogInfo.dogName)==''){
          this.$alert("犬名不能为空!");
          return
        }
        if(!/^[0-9]*$/.test($.trim(this.dogInfo.dogAge)) ){
          this.$alert("犬龄需填纯数字字符！");
          return
        }
        updateDogInfo(this);
      }
    }
  }


  function deletePic(_this,imageId,e) {
    _this.$axios({
      url: '/biz/dogInfo/deletePic',
      params: {fid:imageId},
    }).then(res => {
      console.log(res);
      if (res.data.status==200) {
          if(e==1){
            _this.zImage=true;
          } if(e==2){
            _this.cImage=true;
          }
        _this.$alert("删除成功!")
      } else {
        _this.$alert("删除失败!")
      }
    })
  }

  function  updateDogInfo(_this) {
    _this.$axios({
      url: '/biz/dogInfo/updateDogInfo',
      method: 'post',
      data: _this.dogInfo,
      ContentType:'application/json'
    }).then(res => {
      console.log(res);
      if (res.data.status==200) {
          if(_this.zImage==true || _this.dogInfo.zImageId==null){
            _this.$refs.imgup.upload({type:2,id:_this.dogInfo.dogId});//正面照上传
          }
          if(_this.cImage==true || _this.dogInfo.cImageId==null){
            _this.$refs.imgup1.upload({type:10,id:_this.dogInfo.dogId});//正面照上传
          }
        _this.$alert("修改成功!")
        _this.$router.push({name:'dogOwnerDetail',params:{dogOwnerId:_this.dogInfo.dogOwnerId}})
      } else {
        _this.$alert("修改失败!")
      }
    })
  }

  function DogDetail(_this,dogId) {
    _this.$axios({
      url: '/biz/dogInfo/findDogInfoVOById',
      params: {'dogId': dogId}
    }).then(res => {
        console.log(res);
      if(res.data.status==200 && res.data.data!=null){
        _this.dogInfo=res.data.data;
        _this.zImageId=res.data.data.zImageId;
        if(_this.zImageId==null){
          _this.divImg2=false;
        }
        _this.cImageId=res.data.data.cImageId;
        if(_this.cImageId==null){
          _this.divImg3=false;
        }
      }

    })
  }

  //初始化毛色 品种等
  function initSelectOption(_this) {
    _this.$axios({
      method: 'get',
      url: '/biz/dogInfo/findBreedColorDistrict'
      // params: {collectionId:1}
    }).then((res) => {
      if (res.data.meta.success) {
        if (res.data.data!=null) {
          var dataa=res.data.data
          _this.disTrictList=dataa.disTrictList,
            _this.breedList=dataa.breedList,
            _this.colorList=dataa.colorList
        }
      }
    })
  }
</script>

<style scoped>
  .wrapper-city, .distpicker-address-wrapper {
    margin-top: 10px;
  }

  .el-date-editor {
    width: 100%;
  }
</style>
