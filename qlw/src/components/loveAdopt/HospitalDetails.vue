<template>
  <div>
    <div style="width: 100%;height: 980px;">
      <!--地图-->
      <div style="width: 50%;height: 100%;float: left">
        <div class="mgt10 k3 hb100" id="container-map" style="height: 100%"></div>
      </div>
      <!--地图-->
      <div style="width: 50%;height: 100%;float: right">
        <div class="w1200 c-b bord" style="width: 100%;">
          <p class="fs16 cor0 fb h60 lh60 bgf1 pdl30">网点详情</p>
          <div class="pdt10 pdb60 pdl30 pdr30" style="font-size: 18px;margin-left: 30px">
            <div class="mgt10">
              <p class="db h40 cor0">网点名称&nbsp;:
                <span>{{hospital.organizationName?hospital.organizationName:'-'}}</span></p>
            </div>
            <div class="mgt10">
              <p class="db h40 cor0" >区域&nbsp;:
                <span style="margin-left: 35px;">{{hospital.organizationName?hospital.organizationName:'-'}}</span></p>
            </div>
            <div class="mgt10">
              <p class="db h40 cor0">详细地址&nbsp;:
                <span>{{hospital.address?hospital.address:'-'}}</span></p>
            </div>
            <div class="mgt10">
              <p class="db h40 cor0">固定电话&nbsp;:
                <span>{{hospital.fixedPhone?hospital.fixedPhone:'-'}}</span></p>
            </div>
            <div class="mgt10">
              <p class="db h40 cor0">电话&nbsp;:
                <span style="margin-left: 35px;">{{hospital.phone?hospital.phone:'-'}}</span></p>
            </div>
            <div class="mgt10">
              <p class="db h40 cor0">经营范围&nbsp;:
                <span>{{hospital.scopeOfOperation?hospital.scopeOfOperation:'-'}}</span></p>
            </div>
            <div class="mgt10">
              <p class="db h40 cor0">责任人&nbsp;:
                <span style="margin-left: 20px;">{{hospital.personLiable?hospital.personLiable:'-'}}</span>
              </p>
            </div>
            <div class="mgt10">
              <p class="db h40 cor0">成立时间&nbsp;:
                <span>{{hospital.establishDate|formatDate(dataFast)}}</span></p>
            </div>
            <div class="mgt20">
              <span class="db cor0">网点图片&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <div class=" ovh">
                <ul class="ovh fl ul10" >
                  <li class="fl" v-if="hospital.pictureUrl&&hospital.pictureUrl.length<1">
                    <img src="static/images/17-1.png" alt="" width="150px" height="150px"></li>
                  <li class="fl"v-for="(item,index) in hospital.pictureUrl">
                    <img v-if="item.imageUrl" v-bind="item.imageUrl" alt="" width="150px" height="150px"></li>
                </ul>
              </div>
            </div>
            <div class="mgt20">
              <span class="db h40 cor0">网点证书图片&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <div class=" ovh">

                <ul class="ovh fl ul10">
                  <li class="fl" v-if="hospital.orgCardImgs&&hospital.orgCardImgs.length<1">
                    <img src="static/images/28-8.png" alt="" width="150px" height="150px"></li>
                  <li class="fl"v-for="(item,index) in hospital.orgCardImgs ">
                    <img v-if="item.imageUrl" v-bind="item.imageUrl" alt="" width="150px" height="150px"></li>
                </ul>
              </div>
            </div>
            <div class="mgt40">
              <input type="submit" style="width: 20%;" class="dinb w140 h40 lh40 corw bgfbad82 ras4 hov8 bort" value="预约">
              <a href="#" @click="$router.back(-1)" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5">返回</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import $ from 'jquery'
  import moment from 'moment'
    export default {
        name: "HospitalDetails"
      ,data(){
          return{
            dataFast:'yyyy年MM月dd日'
            ,hospital:''//服务网点详细信息
            ,hospitalList:''//所有服务网点集合
            ,mapInstance: '',//地图实例
            markers:[]
          }
      },created(){
      },mounted(){

        getHospital(this)//显示服务网点详情


      },
      methods:{

        goTo(){
          var that = this;
          // 创建点标记
          for (let i=0;i<this.hospitalList.length;i++){
            var marker = new AMap.Marker({
              map: that.mapInstance,
              position: [that.hospitalList[i].longitude, that.hospitalList[i].latitude],
              extData:that.hospitalList[i]
            });
            that.markers.push(marker);
            if(that.hospitalList[i].longitude==that.hospital.longitude&&that.hospitalList[i].latitude==that.hospital.latitude){
              var info = [];
              info.push("<div style=\"padding:7px 0px 0px 0px;\"><h4>"+that.hospitalList[i].organizationName.toString()+"</h4>");
              info.push("<p class='input-item'>电话 :"+that.hospitalList[i].phone.toString()+"</p>");
              info.push("<p class='input-item'>地址 :"+that.hospitalList[i].address.toString()+"</p></div></div>");
              var infoWindow = new AMap.InfoWindow({
                //isCustom: true,  //使用自定义窗体
                content: info.join(""),
                //offset: new AMap.Pixel(16, -45)
              });
              infoWindow.open(that.mapInstance, marker.getPosition())
            }
          }
          //that.getMarker();
          that.markers.forEach(value=>{
            AMap.event.addListener(value, 'click',()=> {
              that.createInfoWindow(value);
            });
          })
        }/*,getMarker(){
          var markers = this.mapInstance.getAllOverlays("marker");
          markers.forEach((value,index,arr)=>{
            let pos = value.getPosition();
            console.log("pos",JSON.stringify(pos));
          })
        }*/,createInfoWindow(marker) {
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
        }
      }
    }
  //初始化地图
  function initMap(_this) {
    _this.mapInstance = new AMap.Map("container-map", {
      resizeEnable: true,
      // center:[116.481181, 39.989792],
      center: [_this.hospital.longitude, _this.hospital.latitude],//地图中心点
      zoom: 14, //地图显示的缩放级别
    });
  }
  //根据服务网点id得到服务网点详细信息和所有网点信息集合
  function getHospital(_this){
    _this.$axios({
      method:"post"
      ,url:"/biz/dogInfo/getHospital"
      ,params:{id:_this.$route.params.id}
    }).then((ref)=>{
      if(ref.data){
        _this.hospital=ref.data.hospital;
        _this.hospitalList=ref.data.list;
        initMap(_this)//初始化地图
        _this.goTo(_this)//显示所有服务网点到地图上
      }
      // console.log("++"+JSON.stringify(ref.data))
      })
  }
</script>

<style scoped>
  p>span{
    text-decoration:underline;
  }
  p>input{
    width: 50%;
  }
</style>
