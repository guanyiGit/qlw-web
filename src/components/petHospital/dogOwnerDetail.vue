<template>
  <!--查看免疫证详情-->
  <div>
    <!--内容区-->
    <div class="w980 fr">
      <div class="mbx">
        <ul class="ul11 clearfix">
          <li><router-link style="cursor:pointer;" :to="{name:'dogAndOwnerFile'}">犬主犬只登记></router-link></li>
          <li>查看详情</li>
        </ul>
      </div>
      <div class="mgt15 k3">
        <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">
          犬主信息<span style="margin-left: 80%;"><a style="color: #fbad82;cursor:pointer;" @click="update()" v-show="edit">修改</a>
          <a  style="color: #fbad82;cursor:pointer;display: none" v-show="save" @click="saveOwner">保存</a>
          <a style="color: #fbad82;cursor:pointer;margin-left: 2%;" @click="back()">返回</a>
        </span>
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
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" v-model="dogOwner.dogOwnerPhone" @click="changePhone" :disabled="disabled">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">证件类型</span>
                <div class="mgl100">
                  <select  type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogOwner.cardType" :disabled="disabled">
                    <option value="0">身份证</option>
                    <!--<option value="1">护照</option>-->
                    <!--<option value="2">社保卡</option>-->
                    <!--<option value="3">其他</option>-->
                  </select>
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">证件号码</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" v-model="idCardNumx" :disabled="disabled">
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
      <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">
        犬只信息<span style="margin-left: 80%;">
              <router-link class=" hov8 corffa472 mgr35 pc9 pdl36"
                    :to="{name:'addDog',params:{dogOwnerId:dogOwner.dogOwnerId}}">新增犬只
              </router-link>
        </span>
      </div>
      <div class="mgt10 k3 t-c">
        <table class="table11 t-c" width="100%">
          <tbody>
          <tr>
            <td class="cor3 h60 bgf1">犬名</td>
            <td class="cor0 h60 bgf1">品种</td>
            <td class="cor0 h60 bgf1">性别</td>
            <td class="cor0 h60 bgf1">毛色</td>
            <td class="cor0 h60 bgf1">犬龄(岁)</td>
            <td class="cor0 h60 bgf1">登记日期</td>
            <td class="cor0 h60 bgf1">免疫证号</td>
            <td class="cor0 h60 bgf1">操作</td>
          </tr>
          <tr v-for="(item,index) in dogList" :key="index">
            <td class="cor3">{{item.dogName}}</td>
            <td class="cor3">{{item.dogBreed}}</td>
            <td>{{item.dogGender==0?'雄':'雌'}}</td>
            <td>{{item.dogColor}}</td>
            <td>{{item.dogAge}}</td>
            <td>{{item.creationTime|formatDate(dataFormatPattern)}}</td>
            <td>{{item.immuneCardNum}}</td>
            <td class="t-c">
              <router-link class="dinb cor009cff hov8 mgr14"
                           :to="{name:'dogDetail',params:{dogId:item.dogId}}">详情
              </router-link>
            </td>
          </tr>
          </tbody>
        </table>
        <!--分页-->
        <!--<page-vue :page-data="pageDate" @chekdpageCallcak="chekdPage"></page-vue>-->
        <!--分页-->
      </div>
        <!--<router-link class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8" style="cursor:pointer;" :to="{name:'hospital_ImmuneList'}">返回</router-link>-->
      </div>
    </div>
    <!--内容区END-->

  </div>
</template>

<script>
  import conf from "../../common/config"
  export default {
    name: "dogOwnerDetail",
    data(){
      return {
        dataFormatPattern :'yyyy/MM/dd',
        edit:true,
        save:false,
        disabled:true,
        dogOwner:{},
        IsExist:false,
        dogList:[],
        disTrictList:[],
        breedList:[],
        colorList:[],
        idCardNumx:null,
        cardNum:null

      }
    },
    created() {
      let dogOwnerId=this.$route.params.dogOwnerId;
      initData(this,dogOwnerId);
      initSelectOption(this);
    },
    mounted(){
    },
    watch:{
    },
    methods:{
      update(){
        this.disabled=false;
        this.edit=false;
        this.save=true;
      },
      back(){
        this.$router.push({name:'dogAndOwnerFile'})
      },
      saveOwner:function () {
        if (this.cardNum!=this.idCardNumx) {
          this.dogOwner.cardNum=this.idCardNumx//身份证号码
        }
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
        updateOwner(this);
      },
      changePhone:function () {
        this.$alert("修改联系电话会使用户名和密码发生变化，请慎重！")
      }


    },

  }
  function updateOwner(_this) {
  /*  _this.dogOwner.userId=configJS.userInfo.userId;
    _this.dogOwner.orgId=configJS.userInfo.organizationId;*/
    console.log(_this.dogOwner);
    _this.$axios({
      url: '/biz/dogInfo/updateDogOwner',
      method: 'post',
      data: _this.dogOwner,
      ContentType:'application/json'
    }).then(res => {
      if (res.data.status==200) {
        _this.$alert("修改成功!")
        _this.$router.push({name:'dogAndOwnerFile'})
      } else if(res.data.status==100) {
        _this.$alert("修改失败,联系电话已被使用!")
      }else {
        _this.$alert("修改失败!")
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
            _this.cardNum = _this.dogOwner.cardNum.replace(myz, "****");
            _this.idCardNumx= _this.dogOwner.cardNum.replace(myz, "****");
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


  //检查犬主电话是否存在
  function checkDogOwner(_this) {
    _this.$axios({
      method: 'get',
      url: '/biz/dogInfo/findDogOwnerByPhone',
      params: {phone:_this.dogOwner.dogOwnerPhone}
    }).then((res) => {
      if (res.data.data!=null) {
        _this.IsExist=true;
      }else {
        _this.IsExist=false;
      }
    })
  }
</script>

<style scoped>
  .seachClick:hover{
    cursor: pointer;
  }

</style>
