<template>
  <div class="w980 fr">
  <div class="mgt20 k3">

    <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60" v-if="disabled">基本信息<span style="margin-left: 85%;color: #fbad82;cursor:pointer;" @click="update()">修改</span></div>
    <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60" v-else>基本信息>>修改<span style="margin-left: 80%;color: #fbad82;cursor:pointer;" @click="back()">返回</span></div>
    <div class="pdt10 pdb20 pdr30">
      <!---->
      <div class="ovh">
        <div class="mgt10 ww50 fl">
          <span class="db w100 fl h40 lh40 cor0 pdl30">医院名称<a style="color:red"> *</a></span>
          <div class="mgl100">
            <input type="text"  class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="hospitalData==null ? '': hospitalData.organizationName" :disabled="disabled">
          </div>
        </div>
        <div class="mgt10 ww50 fr">
          <span class="db w100 fl h40 lh40 cor0 pdl30">固定电话</span>
          <div class="mgl100">
            <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="hospitalData==null ? '': hospitalData.fixedPhone" :disabled="disabled">
          </div>
        </div>
      </div>
      <div id="remaining">
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">联系人<a style="color:red"> *</a></span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="hospitalData==null ? '': hospitalData.personLiable" :disabled="disabled">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w100 fl h40 lh40 cor0 pdl30">联系人电话<a style="color:red"> *</a></span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="hospitalData==null ? '': hospitalData.phone" :disabled="disabled">
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10">
            <span class="db w100 fl h40 lh40 cor0 pdl30">所属地区<a style="color:red"> *</a></span>
            <v-distpicker wrapper="wrapper-city" address-container="test" :placeholders="citySelectData.placeholders"
                           @province="provinceChanged"
                          @city="cityChanged" @area="areaChanged"
                          :province="citySelectData.defaultVal" :city="citySelectData.defaultCity" :area="citySelectData.defaultArea"
                          :disabled="disabled"
            ></v-distpicker>
          </div>
        </div>

        <div class="ovh">
          <div class="mgt10 ww100 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">详细地址<a style="color:red"> *</a></span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="hospitalData==null ? '': hospitalData.address"  :disabled="disabled">
            </div>
          </div>
        </div>
      </div>

        <div class="mgt20">

            <span class="db w100 fl h40 lh40 pdl30 cor0">照片</span>
            <div class="mgl100 ovh">
              <img-edit  class="ovh" ref="imgup" :file_List="fileList" :Disable="disabled" :Id2="orgId"></img-edit>
            </div>

        </div>
        <div v-show="!disabled" class="t-c mgt40 mgb50">
          <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="save()">保存</a>
          <!--<a href="javascript:" @click="$router.back(-1)"class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5">取消</a>-->
        </div>

    </div>
  </div>

  </div>
</template>

<script>
  import $ from 'jquery'
  import VDistpicker from 'v-distpicker'
  import configJS from '../../common/config'
  //服务网点注册
  let datae = {
    provinceId: 440000,//省
    ownedCityId: 440500,//市
    districtId: 440507,//区
  }
  export default {
    name: "hospitalInfo",
    data() {
      return {
        menuKey:1,
        flag:true,
        fileList:[],
        images:[],
        disabled:true,
        orgId:0,
        data: {
          fixedPhone:null,//固定电话
          organizationName: null,//医院名称
          provinceId: null,//省
          ownedCityId: null,//市
          districtId: null,//区
          phone: null,//联系电话
          personLiable: null,//联系人
          orgType: 2,//机构类型
          address: null,
          longitude: '',
          latitude: '',
        },
        hospitalData:null,
        datePattern: "yyyy年MM月dd日",
        citySelectData: {//地区选择器
          defaultVal: configJS.userInfo.tOrganization.provinceId,
          defaultCity: configJS.userInfo.tOrganization.ownedCityId,
          defaultArea: configJS.userInfo.tOrganization.districtId,
          placeholders: {
            province: '------- 省 --------',
            city: '-------- 市 --------',
            area: '-------- 区 --------'
          },
          select: {//被选择的城市信息

          }
        },
      }
    },
    components: {VDistpicker},
    created() {
      this.orgId=configJS.userInfo.organizationId;
      this.initHospital();
    },

    watch: {
      // fileList(){
      //
      //   ++this.menuKey
      // }
    },
    mounted() {
      var b=$(".distpicker-address-wrapper select")
      for (var i=0;i<b.length;i++) {
        // $(b[i]).attr('disabled',true);
        // $(b[i]).css("color","#999");
        $(b[i]).css("font-size",12);
        // $(b[i]).css("border",0);
      }
    },
    methods: {
      initHospital(){
        this.$axios({
          url: '/biz/serviceSite/getServiceSite',
          params: {'organizationId': this.orgId},
        }).then(res => {
          if(res.data.status==200 && res.data.data!=null){
            this.hospitalData=res.data.data;
            if(res.data.data.pictureUrl.length>0){
              var d=res.data.data.pictureUrl;
              d.map( item => {
                this.fileList.push({

                  name:item.imageName,
                  url:item.imageUrl

                })
              } )
              console.log("this.fileList++++++"+JSON.stringify(this.fileList))
            }
          }
        })
      },
      update(){
          this.$router.push({"name":"hospital_Info"})
          this.disabled=false;
      },
      back(){
        this.disabled=true;
      },
      //输入地址
      addressChange() {
        this.flag=false;
        var _self=this;

        let temp = this.hospitalData.address
        if (temp && temp.trim().length > 0) {
          $.ajax({
            url: '/biz/serviceSite/searchPosition',
            data: {'addressName': _self.hospitalData.address},
            async:false,
            dataType:"json",
            success:function(res){
              debugger
              if(res.meta.success){
                _self.hospitalData.longitude = res.data.longitude;
                _self.hospitalData.latitude = res.data.latitude;
                _self.flag=true;
              }else{
                _self.$alert("该地址无法获得详细坐标信息，搜索【附近的】无法找到！")
              }
            },
            error:function(jqXHR){
              // aler("发生错误："+ jqXHR.status);
            }

          })

          //输入完成查找地址坐标信息
          // this.$axios({
          //   url: '/biz/serviceSite/searchPosition',
          //   params: {'addressName': this.hospitalData.address},
          //   async:false
          // }).then(res => {
          //   if (!res.data.meta.success) {
          //     this.$alert("该地址无法获得详细坐标信息，搜索【附近的】无法找到！")
          //     //this.hospitalData.address=null;
          //
          //   } else {
          //     this.hospitalData.longitude = res.data.data.longitude;
          //     this.hospitalData.latitude = res.data.data.latitude;
          //     this.flag=true;
          //   }
          //   console.log(this.data)
          // })

        }
      },
      provinceChanged(e) {//省
        this.hospitalData.provinceId = e.code;
        //{code: "350300", value: "莆田市"}
      },
      cityChanged(e) {//市
        this.hospitalData.ownedCityId = e.code;
      },
      areaChanged(e) {//区
        this.hospitalData.districtId = e.code;
      },
      save() {
        //let flag = true;
        if (this.hospitalData.longitude==null || this.hospitalData.latitude==null) {
          this.$alert("详细地址无法获得坐标信息，请填写正确有效的地址！")
          this.flag=false;
          return;
        }
        if (!this.hospitalData.organizationName || this.hospitalData.organizationName.trim().length <= 2) {
          this.$alert("医院名称填写有误！")
          this.flag=false;
          return;
        }
        if (!this.hospitalData.personLiable || this.hospitalData.personLiable.trim().length == 0) {
          this.$alert("联系人不能为空！")
          this.flag=false;
          return;
        }

        if (!this.hospitalData.phone || this.hospitalData.phone.trim().length == 0) {
          this.$alert("联系人电话不能为空！")
          this.flag=false;
          return;
        }
        if (!this.hospitalData.phone || !/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.hospitalData.phone)) {
          this.$alert("电话号码格式有误！");
          this.flag=false;
          return;
        }
        if(this.hospitalData.fixedPhone!=null && this.hospitalData.fixedPhone!=''){
          if (!this.hospitalData.fixedPhone || !/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(this.hospitalData.fixedPhone)) {
            this.$alert("固定电话格式有误！");
            this.flag=false;
            return;
          }
        }


        if (!this.hospitalData.provinceId) {
          this.$alert('所属省份必须选择')
          this.flag=false;
          return;
        }
        if (!this.hospitalData.ownedCityId) {
          this.$alert('所属地市必须选择')
          this.flag=false;
          return;
        }
        if (!this.hospitalData.districtId) {
          this.$alert('所属区县必须选择')
          this.flag=false;
          return;
        }
        if (!this.hospitalData.address || this.hospitalData.address.trim().length == 0) {
          this.$alert('地址信息必须填写！')
          this.flag=false;
          return;
        }
        debugger
        console.log("this.addressChange()前:flag:"+this.flag)
        this.addressChange();
        console.log("this.addressChange()后:flag:"+this.flag)
        if(this.flag) {
          const loadind = this.$loading({
            lock: true,
            text: '加载中，请稍等！！！',
          });
          debugger
          this.$axios({
            method: 'post',
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'  //这里加上头部信息
            },
            url: '/biz/serviceSite/updateSite',
            data: JSON.stringify(this.hospitalData),
            isloading: true,
            async:'false'
          }).then((res) => {
            loadind.close();
            if (res.data.status == 200) {
              this.$refs.imgup.upload({type: 9, id: this.orgId});//图片上传
              //this.$router.push({name:"hospital_Info"});
              //location.reload();

            } else {
              this.$alert("录入失败!", "添加提示");
            }

          }).catch(_ => {
            this.$alert("录入失败!", "添加提示");
          })
          this.disabled=true;
        }

      },
      cancel() {
        this.data = {
          organizationName: null,//医院名称
          organizationCapital: null,//注册资本
          registerNumber: null,//注册号
          creditCode: null,//统一社会信用代码
          establishDate: null,//成立时间
          provinceId: null,//省
          ownedCityId: null,//市
          districtId: null,//区
          phone: null,//联系电话
          personLiable: null,//联系人
          orgType: 2,//机构类型
          scopeOfOperation: null,//经营范围
          address: null,
          petHospitals: [
            {
              petHCardType: 0,
              petHCardNum: null,
              startTime: null,
              endTime: null
            },
            {
              petHCardType: 1,
              petHCardNum: null,
              startTime: null,
              endTime: null
            },
            {
              petHCardType: 2,
              petHCardNum: null,
              startTime: null,
              endTime: null
            },
            {
              petHCardType: 3,
              petHCardNum: null,
              startTime: null,
              endTime: null
            }
          ]
        }

      }
    }
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
