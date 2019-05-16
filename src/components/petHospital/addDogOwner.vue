<template>
  <!--内容区-->
  <div class="w980 fr pdb40">
    <div class="mbx">
      <ul class="ul11 clearfix" style="margin-bottom: 20px">
        <li>
          <router-link :to="{name:'dogAndOwnerFile'}">犬主犬只登记 ></router-link>
        </li>
        <li>新增犬主</li>
      </ul>
    </div>
    <div class="k3">
      <form action="#">
        <div class="pdt10 pdb20 pdr30">
          <div class="ovh">
            <div class="mgt10 ww50 fl ovh">
              <span class="db w100 fl h40 lh40 cor0 pdl30">犬主姓名<font color="red"> * </font></span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogOwner.dogOwnerName">
              </div>
            </div>
            <div class="mgt10 ww50 fr ovh">
              <span class="db w90 fl h40 lh40 cor0 pdl20">联系电话<font color="red"> * </font></span>
              <div class="mgl90">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogOwner.dogOwnerPhone" @blur="check()">
              </div>
            </div>
          </div>

          <div class="ovh">
            <div class="mgt10 ww50 fl ovh">
              <span class="db w100 fl h40 lh40 cor0 pdl30">证件类型</span>
              <div class="mgl100">
                <select  type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogOwner.cardType">
                  <option value="0">身份证</option>
                  <!--<option value="1">护照</option>-->
                  <!--<option value="2">社保卡</option>-->
                  <!--<option value="3">其他</option>-->
                </select>
              </div>
            </div>
            <div class="mgt10 ww50 fr ovh">
              <span class="db w90 fl h40 lh40 cor0 pdl20">证件号码</span>
              <div class="mgl90">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogOwner.cardNum">
              </div>
            </div>
          </div>

          <div class="ovh">
            <div class="mgt10 ww50 fl ovh">
              <span class="db w100 fl h40 lh40 cor0 pdl30">性别</span>
              <div class="mgl100">
                <select  type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogOwner.sex">
                  <option value="0">男</option>
                  <option value="1">女</option>
                </select>
              </div>
            </div>
            <div class="mgt10 ww50 fr ovh">
              <span class="db w90 fl h40 lh40 cor0 pdl20">出生日期</span>
              <div class="mgl90">
                <el-date-picker name="startTime" type="date" placeholder="选择日期" class="wd100b"
                                v-model="dogOwner.birthDate" format="yyyy年MM月dd日">
                </el-date-picker>
              </div>
            </div>
          </div>

          <div class="ovh">
            <div class="mgt10 ww50 fl ovh">
              <span class="db w100 fl h40 lh40 cor0 pdl30">现住区县</span>
              <div class="mgl100">
                <select  type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogOwner.districtId">
                  <option v-for="item in disTrictList" v-bind:value="item.districtId">{{item.districtName}}</option>
                </select>
              </div>
            </div>
            <div class="mgt10 ww50 fr ovh">
              <span class="db w90 fl h40 lh40 cor0 pdl20">所属街道</span>
              <div class="mgl90">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogOwner.community">
              </div>
            </div>
          </div>


          <div class="ovh">
            <div class="mgt10 ww50 fl ovh">
              <span class="db w100 fl h40 lh40 cor0 pdl30">详细地址</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogOwner.address">
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
  <!--内容区END-->
</template>

<script>
  import configJS from '../../common/config'

  export default {
    name: "addDogOwner",
    data() {
      return {
        disTrictList:null,//现住区县下拉
        IsExist:false,
        dogOwner:{}
      }
    },
    created() {
      initSelectOption(this);//初始化区县
    },

    computed: {
     /* serviceStation() {
        return configJS.userInfo.tOrganization.organizationName
      }*/
    },
    methods: {
          check:function () {
              if($.trim(this.dogOwner.dogOwnerPhone)!=''){
                checkDogOwner(this);
              }
          },
      save:function () {
          if($.trim(this.dogOwner.dogOwnerName)==''){
            this.$alert("犬主姓名不能为空！");
            return
          }
          if($.trim(this.dogOwner.dogOwnerPhone)==''){
            this.$alert("联系电话不能为空！");
            return
          }
          if(!/^1[34578]\d{9}$/.test($.trim(this.dogOwner.dogOwnerPhone)) ){
            this.$alert("联系电话格式有误！");
            return
          }
          if(this.IsExist==true){
            this.$alert("联系电话已被使用！");
            return
          }
          if($.trim(this.dogOwner.cardNum)!=''){
            if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
                .test(this.dogOwner.cardNum)){
              this.$alert("犬主证件号码格式有误！");
              return
            }
          }
          save(this);
      }
    }
  }

  function save(_this) {
    _this.dogOwner.userId=configJS.userInfo.userId;
    _this.dogOwner.orgId=configJS.userInfo.organizationId;
    _this.$axios({
      url: '/biz/dogInfo/saveDogOwner',
      method: 'post',
      data: _this.dogOwner,
      ContentType:'application/json'
    }).then(res => {
      console.log(res);
      if (res.data.status==200) {
        _this.$alert("新增成功!")
        _this.$router.push({name:'dogAndOwnerFile'})
      } else if(res.data.status==100){
        _this.$alert("新增失败,联系电话已被使用！")
      }else{
        _this.$alert("新增失败,请联系管理员")
      }
    })
  }

  //检查犬主电话是否存在
  function checkDogOwner(_this) {
    _this.IsExist=false;
    _this.$axios({
      method: 'get',
      url: '/biz/dogInfo/findDogOwnerByPhone',
      params: {phone:_this.dogOwner.dogOwnerPhone}
    }).then((res) => {
      if (res.data.data!=null) {
          _this.IsExist=true;
      }else{
          _this.IsExist=false;
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
  .picDate {
    width: 100%;
  }
</style>
