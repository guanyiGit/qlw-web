<template>
<div>
  <!--头-->
  <MainTop></MainTop>
  <!--服务指南-->
  <div class="w1200 c-b mgt40" >
    <div class="ovh">
      <div class="fl cor6 h40 lh40">
        <img class="mgr8 db fl" src="../../../static/images/19.png" alt="">
        <span class="fs18 cor6a4a22 fb mgr30 db fl">养犬服务</span>
        <a style="cursor:pointer;" class="db fl tab1 active mgr35" @click="changeTo1">服务指南</a>
        <a style="cursor:pointer;" class="db fl tab1 mgr35" id="wd" @click="changeTo1">服务网点</a>
        <a style="cursor:pointer;" class="db fl tab1 active"id="wd1">查看地图</a>
      </div>
      <form class="fr db w380 h40 borbfbfbf ras20 rel form" action="#">
        <input id="input1" type="text" class="db ww100 h38 lh38 pdl15 cor3c3c3c bort" @keyup.enter="serviceGuidee" placeholder="标题">
        <input value="" class="in1 db abs z100 top0 bort right0" v-on:click="serviceGuidee">
      </form>
      <form class="fr db w380 h40 borbfbfbf ras20 rel form" action="#" style="display: none">
        <input id="input2" type="text" class="db ww100 h38 lh38 pdl15 cor3c3c3c bort" @keyup.enter="serviceOutlets" placeholder="网点名称">
        <input value="" class="in1 db abs z100 top0 bort right0" v-on:click="serviceOutlets">
      </form>
      <form class="fr db w380 h40 borbfbfbf ras20 rel form" action="#" style="display: none">
        <input id="input3" type="text" class="db ww100 h38 lh38 pdl15 cor3c3c3c bort" @keyup.enter="serviceOutlets" placeholder="网点">
        <input value="" class="in1 db abs z100 top0 bort right0" v-on:click="serviceOutlets">
      </form>
    </div>
    <img class="db mgt10" src="../../../static/images/23.png" alt="">
    <div class="pdt10" v-show="isShow">
      <div class="db tab2">
        <ul class="ul05">
          <li v-for="item in infos">
            <router-link href="###" class="db h50 lh50 pdl24 pdr10 ovh fs14 cor3 pc3" :to="{name:'infoDetails',params:{id:item.informationId,type:3}}">
              {{item.infoTitile}}<span class="fr cor9">{{item.creationTime | formatDate('yyyy-MM-dd')}}</span>
            </router-link>
          </li>
        </ul>
        <!--分页-->
        <page-vue :pageData="pageData" @chekdpageCallcak="chekdpage"></page-vue>
        <!--分页-->
      </div>
      <div class="dn tab2">
        <ul class="ul09 ovh">
          <li class="w385 fl mgt18" v-for="item in hospitalList">
            <router-link :to="{name:'HospitalDetails',params:{id:item.organizationId}}" class="ovh">
              <router-link :to="{name:'HospitalDetails',params:{id:item.organizationId}}">
                <div class="fl w122">
                  <img v-if="item&&item.pictureUrl&&item.pictureUrl.length>0" :src="item.pictureUrl[0].thumbnailUrl" alt="" style="width: 122px;height: 123px">
                  <img v-else src="../../../static/images/17-1.png" alt="">
                </div>
              </router-link>
            </router-link>
              <!--<div class="fl w122">
                <img v-if="item&&item.pictureUrl&&item.pictureUrl.length>0" :src="item.pictureUrl[0].thumbnailUrl" alt="">
                <img v-else src="../../../static/images/17-1.png" alt="">
              </div>-->
              <div class="mgl140">
                <div class="fs16 cor3 h30 lh30">
                  <router-link :to="{name:'HospitalDetails',params:{id:item.organizationId}}">
                    <p class="fs16 cor3">{{item.organizationName}}</p>
                  </router-link><a style="cursor:pointer;" class="dinb fr w65 h28 lh28 t-c corw a3" @click="changeTo2(item)">预约</a>
                </div>
                <p class="cor9 mgt15">电话：{{item.phone}}</p>
                <p class="cor9 mgt10 w210 lh20">地址：{{item.address}}</p>
              </div>
            <!--</router-link>-->
          </li>
        </ul>
        <!--分页-->
        <page-vue :pageData="pageData1" @chekdpageCallcak="chekdpage1"></page-vue>
        <!--分页-->
      </div>
      <!--地图-->
      <div class="dn tab2">
        <div style="width: 100%;height: 700px;">
          <!--地图-->
          <div style="width: 80%;height: 100%;float: left;margin-left: 20px;">
            <!--<a href="javascript:history.go(-1)"  style="font-size: 18px;">返回列表</a>-->
            <div class="mgt10 k3 hb100" id="container-map" style="height: 100%"></div>
          </div>
          <!--地图-->
        </div>
      </div>
    </div>
    <!--预约-->
    <div v-show="isAdd" class="k3">
      <form action="#">
        <div class="h60 lh60 bgf8 pdl30 pdr30 cor0 fs16 fb">新增预约</div>
        <div class="pdt10 pdb20 pdr30">
          <div class="ovh">
            <div class="mgt10 ww50 fl ovh">
              <span class="db w100 fl h40 lh40 cor0 pdl30">预约时间 <font color="red"> * </font></span>
              <div class="mgl100">
                <el-date-picker v-model="appointment.scheduleTime" type="datetime"
                                class="ww100 h40 lh40 borf1 ras4 pc6 picDate"
                                placeholder="选择预约时间"></el-date-picker>
              </div>
            </div>
            <div class="mgt10 ww50 fr ovh">
              <span class="db w90 fl h40 lh40 cor0 pdl20">预约业务<font color="red"> * </font></span>
              <div class="mgl90">
                <el-select class="ww100 h40 lh40  borf1 ras4" v-model="appointment.bizType" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in bizTypes"
                    :key="index"
                    :label="item.dictionaryDescribe"
                    :value="item.dictionaryValue">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl ovh">
              <span class="db w100 fl h40 lh40 cor0 pdl30">预约人<font color="red"> * </font></span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="appointment.appointmentName"
                       placeholder="预约姓名">
              </div>
            </div>
            <div class="mgt10 ww50 fr ovh">
              <span class="db w90 fl h40 lh40 cor0 pdl20">联系电话<font color="red"> * </font></span>
              <div class="mgl90">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" placeholder="预约人电话"
                       v-model="appointment.appointmentPhone">
              </div>
            </div>
          </div>

          <div class="ovh">
            <div class="mgt10 ww50 fl ovh">
              <span class="db w100 fl h40 lh40 cor0 pdl30">预约网点</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="nameSite" disabled>
              </div>
            </div>
          </div>

          <div class="ovh pdt10">
            <div class="mgt10 ww100 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">备注</span>
              <div class="mgl100">
                <textarea class="ww100 h140 borf1 pdl10 pdr10 pdt10 pdb10" v-model="appointment.remarks"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="t-c mgt40 mgb50">
          <input type="submit" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" value="提交"
                 @click.prevent="submit" style="cursor: pointer;">
          <a href="###" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5" @click="changeTo1">取消</a>
        </div>
      </form>
    </div>

  </div>
  <!--服务指南END-->





  <div class="clearfix"></div>


  <!--友情链接-->
  <div class="mgt110 ovh w1200 c-b">
    <div class="fl w160 h72 pdl20 pdt17 bor-r">
      <p class="fs20 cor6b4a22 h22 lh22">友情链接</p>
      <p class="cor9 h16 lh16">Brand introduction</p>
    </div>
    <div class="mgl160">
      <ul class="ul07">
        <li class="fl">
          <a href="###" class="db h36 lh36 cor9 hov8">狗狗网</a>
        </li>
        <li class="fl">
          <a href="###" class="db h36 lh36 cor9 hov8">瑞鹏宠物中心</a>
        </li>
        <li class="fl">
          <a href="###" class="db h36 lh36 cor9 hov8">邵阳宠物医院</a>
        </li>
        <li class="fl">
          <a href="###" class="db h36 lh36 cor9 hov8">丰原宠物网</a>
        </li>
        <li class="fl">
          <a href="###" class="db h36 lh36 cor9 hov8">全进宠物食品网</a>
        </li>
        <li class="fl">
          <a href="###" class="db h36 lh36 cor9 hov8">邵阳宠物医院</a>
        </li>
        <li class="fl">
          <a href="###" class="db h36 lh36 cor9 hov8">邵阳宠物医院</a>
        </li>
        <li class="fl">
          <a href="###" class="db h36 lh36 cor9 hov8">狗狗网</a>
        </li>
        <li class="fl">
          <a href="###" class="db h36 lh36 cor9">瑞鹏宠物中心</a>
        </li>
        <li class="fl">
          <a href="###" class="db h36 lh36 cor9">邵阳宠物医院</a>
        </li>
        <li class="fl">
          <a href="###" class="db h36 lh36 cor9">狗狗网</a>
        </li>
        <li class="fl">
          <a href="###" class="db h36 lh36 cor9">全进宠物食品网</a>
        </li>
        <li class="fl">
          <a href="###" class="db h36 lh36 cor9">邵阳宠物医院</a>
        </li>
        <li class="fl">
          <a href="###" class="db h36 lh36 cor9">狗狗网</a>
        </li>
      </ul>
    </div>
  </div>
  <!--友情链接-->

  <!--分割线-->
  <div class="mgt110"><img class="db c-b" src="../../../static/images/6.png" alt="分割线"></div>
  <!--分割线END-->

  <!--底部-->
  <MainBottom></MainBottom>
</div>
</template>

<script>
  import $ from 'jquery'
  import configJS from '../../common/config'

  var _this = '';
    export default {
        name: "serviceGuide",
      data() {
        return {
          siteOrgId:'',
          nameSite:'',
          bizTypes: [],
          appointmentChannels: [],
          appointment: {},
          isShow:true,
          isAdd:false,
          infos: [],//服务指南
          hospitalList:[],//服务网点
          data: {TypeNumber: 3, status: 1, pageNum: 1,pageSize:20,query:null},//TypeNumber 0：政策法规 1：动态资讯 2:养犬宣传 3：服务指南 status:0审核中，1上架，2下架
          data1:{provinceId : null,ownedCityId : null,districtId : null,orgtype : 2,status : 1,pageNum:1,pageSize:15,searchKey:null},//服务网点参数
          pageData:{
            curPage:1,//当前页吗
            totalCount:1,//总条数
            pageSize:1//页面大小
          },
          pageData1:{
            curPage:1,//当前页吗
            totalCount:1,//总条数
            pageSize:1//页面大小
          },hospital:''//服务网点详细信息
          ,hospitalListtxy:''//所有服务网点集合
          ,mapInstance: '',//地图实例
          markers:[]
        }
      },
      created() {

        if (this.$route.params.type==1) {
          $("#wd").addClass('active').siblings().removeClass('active');
          $('.tab2').eq(1).show().siblings('.tab2').hide();
          $('.form').eq(1).show().siblings('.form').hide();
          this.isShow=false;
          this.isAdd=true;
          this.siteOrgId=this.$route.params.orgId;
          this.nameSite=this.$route.params.orgName;
        }
        this.$store.commit('changeIndex',2)
        selectServiceGuide();
        selectServiceOutlets();
        initDataBizTypes(this);
      },beforeCreate(){
        _this = this;
      },
      mounted(){
        var $tab1= $('.tab1');
        $tab1.click(function(){
          $(this).addClass('active').siblings().removeClass('active');
          var i= $tab1.index(this);
          $('.tab2').eq(i).show().siblings('.tab2').hide();
          $('.form').eq(i).show().siblings('.form').hide();
        });
        if (this.$route.params.vall==1) {
          $("#wd").addClass('active').siblings().removeClass('active');
          $('.tab2').eq(1).show().siblings('.tab2').hide();
          $('.form').eq(1).show().siblings('.form').hide();
        }
        getHospital(this)//显示服务网点详情
      },
      computed: {

        serviceStation() {
          return configJS.userInfo.tOrganization.organizationName
        }
        // pageData() {
        //   return {
        //     curPage: params.data.pageNum ? params.data.pageNum : 1,//当前页吗
        //     totalCount: this.totalPage ? this.totalPage : 1,//总条数
        //     pageSize: params.data.pageSize ? params.data.pageSize : 1//页面大小
        //   }
        // },
        // pageData1() {
        //   return {
        //     curPage: params.data1.pageNum ? params.data1.pageNum : 1,//当前页吗
        //     totalCount: this.totalPage1 ? this.totalPage1 : 1,//总条数
        //     pageSize: params.data1.pageSize ? params.data1.pageSize : 1//页面大小
        //   }
        // }
      },
      methods: {
        goTo(){
          var that = this;
          // 创建点标记
          for (let i=0;i<this.hospitalListtxy.length;i++){
            //alert(that.hospitalListtxy[i].latitude+"*"+that.hospitalListtxy[i].longitude)
            var marker = new AMap.Marker({
              map: that.mapInstance,
              position: [that.hospitalListtxy[i].longitude, that.hospitalListtxy[i].latitude],
              extData:that.hospitalListtxy[i]
            });
            that.markers.push(marker);
            console.log("++++++++++++++++++")
            /*if(that.hospitalListtxy[i].longitude==that.hospital.longitude
              &&that.hospitalListtxy[i].latitude==that.hospital.latitude){
              var info = [];
              info.push("<div style=\"padding:7px 0px 0px 0px;\"><h4>"+that.hospitalListtxy[i].organizationName.toString()+"</h4>");
              info.push("<p class='input-item'>电话 :"+that.hospitalListtxy[i].phone.toString()+"</p>");
              info.push("<p class='input-item'>地址 :"+that.hospitalListtxy[i].address.toString()+"</p></div></div>");
              var infoWindow = new AMap.InfoWindow({
                //isCustom: true,  //使用自定义窗体
                content: info.join(""),
                //offset: new AMap.Pixel(16, -45)
              });
              infoWindow.open(that.mapInstance, marker.getPosition())
            }*/
          }
          //that.getMarker();
          that.markers.forEach(value=>{
            AMap.event.addListener(value, 'click',()=> {
              that.createInfoWindow(value);
            });
          })
        },createInfoWindow(marker) {
        let position = marker.getPosition();
        //debugger
        //实例化信息窗体
        var that = this;
        console.log(marker.getPosition().toString(),"id"+marker.getExtData().toString());
        //构建信息窗体中显示的内容
        var info = [];
        info.push("<div style=\"padding:7px 0px 0px 0px;\"><h4>"+marker.getExtData().organizationName.toString()+"</h4>");
        info.push("<p class='input-item'>电话 : "+marker.getExtData().phone.toString()+"</p>");
        info.push("<p class='input-item'>地址 :"+marker.getExtData().address.toString()+"</p></div></div>");

        var infoWindow = new AMap.InfoWindow({
          //isCustom: true,  //使用自定义窗体
          content: info.join(""),
          //offset: new AMap.Pixel(16, -45)
        });
        this.$axios({
          method:"post"
          ,url:"/biz/serviceSite/getServiceSite"
          ,params:{organizationId:marker.getExtData().organizationId}
        }).then((ref)=>{
          if(ref.data.data){
            this.hospital=ref.data.data
          }
          // console.log("++"+JSON.stringify(ref.data))
        })
        infoWindow.open(that.mapInstance, marker.getPosition())
      },

        changeTo2:function (item) {
          this.nameSite=item.organizationName;
          this.siteOrgId=item.organizationId;

          this.isShow=false;
          this.isAdd=true
        },changeTo1:function () {
          _this.isShow=true;
          _this.isAdd=false;
        },
        submit() {
          let {scheduleTime, bizType, appointmentName, appointmentPhone, appointmentChannel} = this.appointment;

          if (!scheduleTime || scheduleTime.getTime() < new Date().getTime()) {
            this.$alert("预约时间不正确！");
            return;
          }
          if (bizType != 0 && !bizType) {
            this.$alert("预约类型请选择！");
            return;
          }
          if (!appointmentName) {
            this.$alert("预约人姓名请填写！");
            return;
          }
          if (!appointmentPhone) {
            this.$alert("预约人电话请填写！");
            return;
          }
          if (!(/0?(13|14|15|17|18|19)[0-9]{9}/.test(appointmentPhone))) {
            this.$alert("手机号格式不正确！")
            return;
          }

          this.appointment.orgId = this.siteOrgId;
          this.appointment.userId = configJS.userInfo.userId;
          this.appointment.appointmentChannel = 1;

          this.$axios({
            url: '/biz/reservation',
            method: 'post',
            params: this.appointment,
            isloading: true
          }).then(res => {
              console.log(res);
            if (res.data.meta.success) {
              this.$alert("新增成功!")
              this.changeTo1();
              this.appointment={};
              //this.$router.push({name:'hospital_reservationList'})
            } else {
              this.$alert("新增失败!")
            }
          })

        },

        serviceGuidee: function (event) {
          this.data.query=$("#input1").val().trim();
          this.data.pageNum=1
          selectServiceGuide();
        },
        serviceOutlets: function (event) {
          this.data1.searchKey=$("#input2").val().trim();
          this.data1.pageNum=1
          selectServiceOutlets();
        },
        chekdpage(pageNum) {
          this.data.pageNum = pageNum
          selectServiceGuide();
        },
        chekdpage1(pageNum) {
          this.data1.pageNum = pageNum
          selectServiceOutlets();
        }
      }
    }
  function selectServiceGuide(){
    //查询服务指南列表
    _this.$axios({
      method: 'post',
      url: '/biz/information/getInformations',
      params: _this.data
    }).then((res) => {
      if (res.data.status == 200) {
        _this.infos=res.data.data.list
        _this.pageData.totalCount=res.data.data.total//总条数
        _this.pageData.curPage= _this.data.pageNum//当前页吗
        _this.pageData.pageSize= _this.data.pageSize//页面大小
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  function selectServiceOutlets(){
    //查詢服务网点
    _this.$axios({
      method: 'post',
      url: '/biz/serviceSite/getServiceSitesforAdmin',
      params: _this.data1
    }).then((res) => {
      console.log("24343")
      console.log(res)
      if (res.data.status == 200 && res.data.data != null) {
        _this.hospitalList = res.data.data.list;//服務網點
        _this.pageData1.totalCount = res.data.data.total
        _this.pageData1.curPage= _this.data1.pageNum//当前页吗
        _this.pageData1.pageSize= _this.data1.pageSize//页面大小
      }
      // console.log(this.$data)
    }).catch((err) => {
      console.log(err);
    })
  }
  //初始化地图
  function initMap(_this) {
    _this.mapInstance = new AMap.Map("container-map", {
      resizeEnable: true,
      // center:[116.481181, 39.989792],
      //center: [_this.hospital.longitude, _this.hospital.latitude],//地图中心点
      //center:[113.113657,25.756798],
      zoom: 14, //地图显示的缩放级别
    });
  }
  //根据服务网点id得到服务网点详细信息和所有网点信息集合
  function getHospital(_this){
    _this.$axios({
      method:"post"
      ,url:"/biz/dogInfo/getHospital"
      //,params:{id:_this.$route.params.id}
      ,params:{id:62}
    }).then((ref)=>{
      if(ref.data){
        _this.hospital=ref.data.hospital;
        console.log("_this.hospital"+JSON.stringify(_this.hospital))
        console.log("ref.data.hospital"+JSON.stringify(ref.data.hospital))
        _this.hospitalListtxy=ref.data.list;
        initMap(_this)//初始化地图
        _this.goTo(_this)//显示所有服务网点到地图上
      }
      // console.log("++"+JSON.stringify(ref.data))
    })
  }


  function initDataBizTypes(_this) {
    _this.$axios({
      url: '/biz/Tdictionary/biz_type'
    }).then(res => {
      if (res.data.meta.success) {
        _this.bizTypes = res.data.data;
      }
    })
  }
</script>

<style scoped>

</style>
