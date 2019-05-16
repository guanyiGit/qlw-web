<template>
  <!--查看免疫证详情-->
  <div>
    <!--内容区-->
    <div class="w980 fr">
      <div class="mbx">
        <ul class="ul11 clearfix">
          <li><router-link style="cursor:pointer;" :to="{name:'dogAndOwnerFile'}">犬主犬只登记></router-link></li>
          <li>新增犬只</li>
        </ul>
      </div>
      <div class="mgt15 k3">
        <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">
          犬主信息<span style="margin-left: 80%;"></span>
        </div>
        <div class="pdb20 pdr30 ovh">
          <div class="w950 pdt10">
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">犬主姓名</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" v-model="dogOwner.dogOwnerName" :disabled="disabled">
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">联系电话</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" v-model="dogOwner.dogOwnerPhone" :disabled="disabled">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">证件类型</span>
                <div class="mgl100">
                  <select  type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogOwner.cardType" :disabled="disabled">
                    <option value="0">身份证</option>
                  </select>
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">证件号码</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" v-model="dogOwner.cardNum" :disabled="disabled">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">性别</span>
                <div class="mgl100">
                  <select  type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogOwner.sex" :disabled="disabled">
                    <option value="0">男</option>
                    <option value="1">女</option>
                  </select>
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">出生日期</span>
                <div class="mgl100">
                  <el-date-picker name="startTime" type="date" placeholder="选择日期" class="wd100b"
                                  v-model="dogOwner.birthDate" format="yyyy年MM月dd日" :disabled="disabled">
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">现住区县</span>
                <div class="mgl100">
                  <select  type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogOwner.districtId" :disabled="disabled">
                    <option v-for="item in disTrictList" v-bind:value="item.districtId">{{item.districtName}}</option>
                  </select>
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">所属街道</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" v-model="dogOwner.community" :disabled="disabled">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">详细地址</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" v-model="dogOwner.address" :disabled="disabled">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ovh mgt20"></div>
      <div class="h60 lh60 pdl30 bgf8 fs16 cor0 fb">新增犬只</div>
      <div class="mgt15 k3">
        <form action="#">
        <div class="pdb20 pdr30 ovh">
          <div class="w950 pdt10">
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">犬名<font color="red"> * </font></span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" v-model="dogInfo.dogName">
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">品种</span>
                <div class="mgl100">
                  <select  type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogInfo.dogBreedType" >
                    <option v-for="item in breedList" v-bind:value="item.dictionaryValue">{{item.dictionaryDescribe}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">性别</span>
                <div class="mgl100">
                  <select  class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogInfo.dogGender">
                    <option value="0">雄</option>
                    <option value="1">雌</option>
                  </select>
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">毛色</span>
                <div class="mgl100">
                  <select  type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogInfo.dogColorType" >
                    <option v-for="item in colorList" v-bind:value="item.dictionaryValue">{{item.dictionaryDescribe}}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">犬龄</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" v-model="dogInfo.dogAge" placeholder="请填写纯数字字符">
                </div>
              </div>
            </div>

            <div class="mgt20">
              <span class="db w100 fl h40 lh40 pdl30 cor0">犬只照片</span>
              <div class="mgl100 ovh">
                <!--<img-upload class="ovh" ref="imgup"></img-upload>-->
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
          </div>
        </div>
          <div class="t-c mgt40 mgb50">
            <input type="submit" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" value="提交"
                   @click.prevent="save" style="cursor: pointer;">
            <a href="###" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5" @click="$router.back(-1)">取消</a>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--内容区END-->

  </div>
</template>

<script>
  import configJS from "../../common/config"
  export default {
    name: "dogOwnerDetail",
    data(){
      return {
        disabled: true,
        dogOwner:{},
        dogInfo:{},
        disTrictList:[],
        breedList:[],
        colorList:[]

      }
    },
    created() {
      let dogOwnerId=this.$route.params.dogOwnerId;
      this.dogInfo.dogOwnerId=dogOwnerId;
      initData(this,dogOwnerId);
      initSelectOption(this);
    },
    mounted(){
    },
    watch:{
    },
    methods:{
        save:function () {
            if($.trim(this.dogInfo.dogName)==''){
              this.$alert("犬名不能为空!");
              return
            }
            if(!/^[0-9]*$/.test($.trim(this.dogInfo.dogAge)) ){
              this.$alert("犬龄需填纯数字字符！");
              return
            }

          save(this);
        }


    },

  }


  function save(_this) {
    _this.dogInfo.operationId=configJS.userInfo.userId;
    _this.$axios({
      url: '/biz/dogInfo/saveDogInfo',
      method: 'post',
      data: _this.dogInfo,
      ContentType:'application/json'
    }).then(res => {
      console.log(res);
      if (res.data.status==200) {
        _this.$refs.imgup.upload({type:2,id:res.data.data});//正面照上传
        _this.$refs.imgup1.upload({type:10,id:res.data.data});//侧面照上传
        _this.$alert("新增成功!")
        _this.$router.push({name:'dogAndOwnerFile'})
      } else {
        _this.$alert("新增失败!")
      }
    })
  }
  function initData(_this,dogOwnerId) {
    _this.$axios({
      url: '/biz/dogInfo/findDogOwnerById',
      params: {dogOwnerId:dogOwnerId}
    }).then((res) => {
      if(res.data.status==200 && res.data.data!=null){
        _this.dogOwner=res.data.data;
        if (_this.dogOwner.cardNum!=null && _this.dogOwner.cardNum!=""){
          var myz = _this.dogOwner.cardNum.substr(4, 10);
          _this.dogOwner.cardNum = _this.dogOwner.cardNum.replace(myz, "****");
        }
        if(res.data.data.dogInfo.length>0){
          _this.dogList=res.data.data.dogInfo;
        }
      }
    }).catch((res)=>{

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
  .seachClick:hover{
    cursor: pointer;
  }

</style>
