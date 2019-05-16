<template>
    <!--新版添加免疫证-->
  <div>
    <!--内容区-->
    <div class="w980 fr">
      <div class="mbx">
        <ul class="ul11 clearfix">
          <li><router-link style="cursor:pointer;" :to="{name:'hospital_certificateDealt'}">免疫证办理></router-link></li>
          <li>免疫证办理</li>
        </ul>
      </div>
      <div class="mgl100">
        <input type="text" class="ww70 h40 lh40 pdl20 borf1 ras4" v-model.trim="params.input" @keyup.enter="check" placeholder="犬主电话/犬主姓名">
        <a style="cursor:pointer;width: 100px;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="check">查找</a>
      </div>
      <div class="mgt10 k3">
        <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60" >免疫证信息</div>
        <div class="pdt10 pdb20 pdr30">
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">免疫证号<b style="color: red">&nbsp;*</b></span>
              <div class="mgl100">
                <input id="immune" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" @change="checkImmune" v-model="dogInfo.dogImmune.immuneCardNum">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mgt15 k3">
        <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">犬主信息</div>
        <div class="pdb20 pdr30 ovh">
          <div class="w950 pdt10">
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">犬主电话<b style="color: red">&nbsp;*</b></span>
                <div class="mgl100">
                  <input type="text" id="phone" @change="selectOwner" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model.trim="dogInfo.dogOwner.dogOwnerPhone" :disabled="ble">
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">犬主姓名<b style="color: red">&nbsp;*</b></span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model.trim="dogInfo.dogOwner.dogOwnerName" :disabled="ble">
                </div>
              </div>
            </div>
            <div id="remaining">
              <div class="ovh">
                <div class="mgt10 ww50 fl">
                  <span class="db w100 fl h40 lh40 cor0 pdl30">证件类型<b style="color: red">&nbsp;*</b></span>
                  <div class="mgl100">
                    <select v-model="dogInfo.dogOwner.tDogOwnerCard.cardType" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :disabled="ble1">
                      <option value="0">身份证</option>
                      <option value="1">护照</option>
                      <option value="2">社保卡</option>
                      <option value="3">其他</option>
                    </select>
                  </div>
                </div>
                <div class="mgt10 ww50 fr">
                  <span class="db w100 fl h40 lh40 cor0 pdl30">证件号码<b style="color: red">&nbsp;*</b></span>
                  <div class="mgl100">
                    <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model.trim="dogInfo.dogOwner.tDogOwnerCard.cardNum" :disabled="ble2">
                  </div>
                </div>
              </div>
              <div class="ovh">
                <div class="mgt10 ww50 fl">
                  <span class="db w100 fl h40 lh40 cor0 pdl30">现住区县</span>
                  <div class="mgl100">
                    <select id="district" @change="obtainDistrict" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4">
                      <option value="ddd">请选择</option>
                      <option v-for="item in disTrictList" v-bind:value="item.districtId">{{item.districtName}}</option>
                    </select>
                  </div>
                </div>
                <div class="mgt10 ww50 fr">
                  <span class="db w100 fl h40 lh40 cor0 pdl30">所属街道</span>
                  <div class="mgl100">
                    <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model.trim="dogInfo.dogOwner.community">
                  </div>
                </div>
              </div>
              <div class="ovh">
                <div class="mgt10 ww100 fl">
                  <span class="db w100 fl h40 lh40 cor0 pdl30">详细地址</span>
                  <div class="mgl100">
                    <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model.trim="dogInfo.dogOwner.address">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mgt20 k3">
        <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">犬只信息</div>
        <div class="pdt10 pdb20 pdr30">
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">犬名</span>
              <div class="mgl100">
                <input v-if="dog&&dog.dogName" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dog.dogName" :disabled="true">
                <input v-else type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model.trim="dogInfo.dogName">
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">性别</span>
              <div v-if="dog&&dog.dogGender" class="mgl100 h40 lh40">
                <label class="lab2 mgr40"><input v-model="dog.dogGender" type="radio" name="abcd" value="0"><i></i>雄</label>
                <label class="lab2"><input type="radio" v-model="dog.dogGender" name="abcd" value="1"><i></i>雌</label>
              </div>
              <div v-else class="mgl100 h40 lh40">
                <label class="lab2 mgr40"><input v-model="dogInfo.dogGender" type="radio" name="abcd" value="0"><i></i>雄</label>
                <label class="lab2"><input type="radio" v-model="dogInfo.dogGender" name="abcd" value="1"><i></i>雌</label>
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w100 fl h40 lh40 cor0 pdl30">品种<b style="color: red">&nbsp;*</b></span>
              <div class="mgl100">
                <input v-if="dog&&dog.breed" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dog.breed" :disabled="true">
                <select v-else id="breed" @change="obtainBreed" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4">
                  <option>请选择</option>
                  <option v-for="item in breedList" v-bind:value="item.dictionaryValue">{{item.dictionaryDescribe}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fr">
              <span class="db w100 fl h40 lh40 cor0 pdl30">犬龄</span>
              <div class="mgl100">
                <input v-if="dog&&dog.dogAge" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dog.dogAge+'岁'" :disabled="true">
                <input v-else type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model.trim="dogInfo.dogAge" placeholder="填写纯数字字符">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w100 fl h40 lh40 cor0 pdl30">毛色<b style="color: red">&nbsp;*</b></span>
              <div class="mgl100">
                <input v-if="dog&&dog.colour" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dog.colour" :disabled="true">
                <select v-else id="color" @change="obtainColor" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4">
                  <option>请选择</option>
                  <option v-for="item in colorList" v-bind:value="item.dictionaryValue">{{item.dictionaryDescribe}}</option>
                </select>
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
        <div class="t-c mgt40 mgb50">
          <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="save">提交</a>
          <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8" @click="fromReset">重置</a>
        </div>
      </div>

      <!--<div class="mgt10 k3">-->
        <!--<div class="fs16 cor0 fb pdl30 bgf1 h60 lh60" >免疫证信息</div>-->
        <!--<div class="pdt10 pdb20 pdr30">-->
          <!--<div class="ovh">-->
            <!--<div class="mgt10 ww50 fl">-->
              <!--<span class="db w100 fl h40 lh40 cor0 pdl30">免疫证号<b style="color: red">&nbsp;*</b></span>-->
              <!--<div class="mgl100">-->
                <!--<input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogInfo.dogImmune.immuneCardNum">-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <!--内容区END-->
    <!--弹窗   说明。.db--显示，.dn--隐藏-->
    <div class="T db" style="display: none;z-index: 2">
        <div class="tan6 abs bgw k3 db" style="height: 640px">
          <p class="ww100 h30" style="background-color: #ffa472"><span style="color: #ffffff;margin-left: 10px;font-size: 16px">查找犬只</span><span style="color: red;margin-left: 250px">提示：选择犬只办理免疫证或点击取消填写下面的犬只信息办理</span></p>
          <form class="fr db w380 h40 borbfbfbf ras20 rel mgt5">
            <input type="text" class="db ww100 h38 lh38 pdl15 cor3c3c3c bort" v-model="params.input" @keyup.enter="check" placeholder="犬主姓名/犬主电话">
            <input value="" class="in1 db abs z100 top0 bort right0" @click="check">
          </form>
          <div class="mgt50 k3">
            <table class="table5 t-c">
              <thead>
              <tr>
                <td class="cor0 h60 bgf1 ww5"></td>
                <td class="cor0 h60 bgf1">免疫证号</td>
                <td class="cor0 h60 bgf1">犬只名称</td>
                <td class="cor0 h60 bgf1">犬只品种</td>
                <td class="cor0 h60 bgf1">性别</td>
                <td class="cor0 h60 bgf1">犬龄</td>
                <td class="cor0 h60 bgf1">毛色</td>
                <td class="cor0 h60 bgf1">犬主姓名</td>
                <td class="cor0 h60 bgf1">联系电话</td>
              </tr>
              </thead>
              <tbody id="tbod">
              <tr v-for="(item,index) in dogList" :key="index">
              <td class="ww5"><label class="lab3 mgr40"><input type="radio" v-model="isCheckd" name="aa" :value=item.dogId><i></i></label></td>
              <td>{{item?item.immuneCardNum?item.immuneCardNum:'无':'无'}}</td>
              <td>{{item?item.dogName?item.dogName:'':''}}</td>
              <td>{{item?item.breed?item.breed:'':''}}</td>
              <td>{{item.dogGender==0?'雄':item.dogGender==1?'雌':'未指定'}}</td>
              <td>{{item.dogAge?item.dogAge +'岁':'-'}}</td>
              <td>{{item.colour?item.colour:'-'}}</td>
              <td>{{item.dogOwnerName?item.dogOwnerName:'-'}}</td>
              <td>{{item.phone?item.phone:'-'}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--分页-->
          <page-vue :pageData="pageData" @chekdpageCallcak="chekdpage"></page-vue>
          <!--分页-->
          <div class="t-c mgt40 mgb50">
            <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="selectDogAndOwner">确定</a>
            <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8" @click="tableCancel">取消</a>
          </div>
        </div>
    </div>
    <!--弹窗END-->
  </div>
</template>

<script>
  import $ from 'jquery'
  import config from '../../common/config'
    export default {
        name: "addImmunCard",
      data() {
        return {
          datePattern:"yyyy年MM月dd日",
          ble:false,
          ble1:false,
          ble2:false,
          dog:null,//列表中获取的犬信息
          dogList: [],//犬只列表
          page: [],//分页对象
          params: {//请求参数
            num: 1,
            size: 5,
            input: ''
          },
          isCheckd:null,
          dogInfo:
            {dogId:null,
              dogName:null,//犬名
              dogBreedType:null,//犬品种
              dogGender:null,//犬性别
              birthTime:null,//犬只出生日期
              dogColorType:null,//犬只颜色
              fatherId:null,//父本
              motherId:null,  //母本
              dogAge:null,
              dogImmune: {//免疫证信息
                lssuerId:config.userInfo.userId,//签证人id
                immuneCardNum:null,//免疫证号
                lssueTime:null,//签发日期
                startTime:null,//生效时间
                endTime:null,//失效时间
                lssueOrgId:config.userInfo.organizationId//签发机构
              },
              dogOwner: {//犬主信息
                dogOwnerId:null,
                dogOwnerName:null,//犬主姓名
                dogOwnerType:null,//性质
                sex:null,//性别
                birthDate:null,//出生日期
                districtId:null,//现住区县
                community:null,//所属社区
                postalCode:null,//邮编
                dogOwnerPhone:null,//电话
                eMail:null,//邮件
                address:null,//地址
                tDogOwnerCard:{
                  dogOwnerCardId:null,
                  cardType:null,//证件类型
                  cardNum:null//证件号码
                }
              }
            },
          Id:null,
          type:2,
          datePattern:"yyyy年MM月dd日",
          disTrictList:null,
          breedList:[],
          colorList:[],
          datas:{
            url:'',
            uploadData:null
          }
        }
      },


      created() {
        initSelectOption(this);
        this.dogInfo.dogImmune.lssuerId=config.userInfo.userId
        this.dogInfo.dogImmune.lssueOrgId=config.userInfo.organizationId
      },
      watch: {
        formData() {
          console.log(this.dogInfo)
        },
      },
      methods:{
        // checkedOne (_this) {
        //   $(".inputbox").attr("checked",false);
        //   _this.attr("checked",true);
        // },
        save(){
          this.dogInfo.dogImmune.lssuerId=config.userInfo.userId
          this.dogInfo.dogImmune.lssueOrgId=config.userInfo.organizationId
          console.log("fff444")
          console.log(this.dogInfo)
          let alertMsg = '录入信息有误！';
          let flag = true;
          if (this.dogInfo.dogId==null) {
            if(!this.dogInfo.dogBreedType){
              alertMsg='犬只品种必须选择'
              flag = false
            }
            // if(!this.dogInfo.dogColorType){
            //   alertMsg='犬只毛色必须选择'
            //   flag = false
            // }
            // if(!this.dogInfo.dogName){
            //   alertMsg='犬只名称必须选择'
            //   flag = false
            // }
            // if(!this.dogInfo.dogGender){
            //   alertMsg='犬只性别必须填写'
            //   flag = false
            // }
          }
            if(!this.dogInfo.dogOwner.dogOwnerName){
              alertMsg='犬主姓名必须填写'
              flag = false
            }
            if(!this.dogInfo.dogOwner.dogOwnerPhone){
              alertMsg = "电话号码未填！";
              flag = false
            }
            if(!/^1[34578]\d{9}$/.test(this.dogInfo.dogOwner.dogOwnerPhone) ){
              alertMsg = "电话号码格式有误！";
              flag = false
            }
            if (this.dogInfo.dogAge!=null && this.dogInfo.dogAge!="") {
              if(!/^[0-9]*$/.test(this.dogInfo.dogAge) ){
                alertMsg = "年龄需填纯数字字符！";
                flag = false
              }
            }
            // if(!this.dogInfo.dogOwner.eMail || !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.dogInfo.dogOwner.eMail) ){
            //   alertMsg = "邮箱格式有误！";
            //   flag = false
            // }
            if(this.dogInfo.dogOwner.tDogOwnerCard.cardType != 0 && this.dogInfo.dogOwner.tDogOwnerCard.cardType != 1 && this.dogInfo.dogOwner.tDogOwnerCard.cardType != 2 && this.dogInfo.dogOwner.tDogOwnerCard.cardType != 3){
              alertMsg='犬主证件类型必须选择!'
              flag = false
            }
            if(!this.dogInfo.dogOwner.tDogOwnerCard.cardNum){
              alertMsg='犬主证件号码必须填写'
              flag = false
            }
            // if(!this.dogInfo.dogOwner.sex){
            //   alertMsg='犬主性别必须选择'
            //   flag = false
            // }
          if(!this.dogInfo.dogImmune.immuneCardNum){
            alertMsg='免疫证号必须填写!'
            flag = false
          }
          if (!flag) {
            this.$alert(alertMsg);
          }
          console.log(this.dogInfo.dogOwner.districtId)
          if(flag){
            this.$axios({
              method:'post',
              // headers:{
              //   "content-type": "application/json;charset=utf-8",
              // },
              headers:{
                'Content-Type': 'application/json;charset=UTF-8'  //这里加上头部信息
              },
              url:'/biz/dogInfo/insertImmuneMsg',
              data:JSON.stringify(this.dogInfo),
              loading:true
            }).then((res)=>{
              console.log("111444")
              console.log(res.data.data)
              if(res.data.data!=null && res.data.data!=""  && res.data.data!="免疫证号重复"){
                this.Id=res.data.data;
                this.$refs.imgup.upload({type:2,id:res.data.data,string:'犬只正面照'});//犬只正面图片上传
                this.$refs.imgup1.upload({type:10,id:res.data.data,string:'犬只侧面照'});//犬只侧面图片上传
                this.$alert("录入成功!","添加提示").then(_=>{
                  this.$router.push('certificateDealt');//其中certificateDealt是你定义的一个路由模块
                })
              }else if (res.data.data=="免疫证号重复") {
                this.$alert("免疫证号重复");
              } else {
                this.$alert("录入失败!","添加提示");
              }
            }).catch(_=>{
              this.$alert("录入失败!","添加提示");
            })
          }
        },
        fromReset(){
          this.ble=false
          this.ble1=false
          this.ble2=false
          this.dogInfo= {dogId:null,
            dogName:'',//犬名
            dogBreedType:'',//犬品种
            dogGender:'',//犬性别
            birthTime:'',//犬只出生日期
            dogColorType:'',//犬只颜色
            fatherId:'',//父本
            motherId:'',  //母本
            dogImmune:{//免疫证信息
              lssuerId:'',//签证人id
              immuneCardNum:'',//免疫证号
              lssueTime:'',//签发日期
              startTime:'',//生效时间
              endTime:'',//失效时间
              lssueOrgId:''//签发机构
            },
            dogOwner: {//犬主信息
              dogOwnerId:null,
              dogOwnerName:'',//犬主姓名
              dogOwnerType:'',//性质
              sex:'',//性别
              birthDate:'',//出生日期
              districtId:'',//现住区县
              community:'',//所属社区
              postalCode:'',//邮编
              dogOwnerPhone:'',//电话
              eMail:'',//邮件
              address:'',//地址
              tDogOwnerCard:{
                cardType:'',//证件类型
                cardNum:''//证件号码
              }
            }
          }
          // this.$router.push('certificateDealt');//其中certificateDealt是你定义的一个路由模块
        },
        //获取犬只品种
        obtainBreed:function () {
          this.dogInfo.dogBreedType=$("#breed").val();
        },
        //获取社区
        obtainDistrict:function () {
          this.dogInfo.dogOwner.districtId=$("#district").val();
          if (this.dogInfo.dogOwner.districtId=="ddd") {
            this.dogInfo.dogOwner.districtId=null;
          }
        },
        //获取毛色
        obtainColor:function () {
          this.dogInfo.dogColorType=$("#color").val();
        },
        //根据电话获取犬主信息
        selectOwner:function () {
          selectOwnerr(this,null);
          this.params.input=$("#phone").val().trim();
          this.$axios({
            method: 'post',
            url: '/biz/dogAndOwner/selectDogListAccurate',
            data: this.params,
          }).then((res) => {
            if (res.data.code == '000000' && res.data.result != null) {
              res.data.result.dogInfos.map(item => {
                item.checkd = false//添加选中标示 默认未选中
                if (item.immuneCardNum==null || item.immuneCardNum==""){
                  $(".T").show();
                }
              })
              this.dogList = res.data.result.dogInfos;
              this.page = res.data.result.page;
            }
          }).catch((err) => {
            console.log(err);
          })
        },
        //查找犬只列表信息
        check:function () {
          this.ble=false
          this.dogInfo= {dogId:null,
            dogName:'',//犬名
            dogBreedType:'',//犬品种
            dogGender:'',//犬性别
            birthTime:'',//犬只出生日期
            dogColorType:'',//犬只颜色
            fatherId:'',//父本
            motherId:'',  //母本
            dogImmune:{//免疫证信息
              lssuerId:'',//签证人id
              immuneCardNum:'',//免疫证号
              lssueTime:'',//签发日期
              startTime:'',//生效时间
              endTime:'',//失效时间
              lssueOrgId:''//签发机构
            },
            dogOwner: {//犬主信息
              dogOwnerId:null,
              dogOwnerName:'',//犬主姓名
              dogOwnerType:'',//性质
              sex:'',//性别
              birthDate:'',//出生日期
              districtId:'',//现住区县
              community:'',//所属社区
              postalCode:'',//邮编
              dogOwnerPhone:'',//电话
              eMail:'',//邮件
              address:'',//地址
              tDogOwnerCard:{
                cardType:'',//证件类型
                cardNum:''//证件号码
              }
            }
          }
          this.isCheckd=null
          $(".T").show();
          initData(this);
        },
        //列表的取消
        tableCancel:function () {
          $(".T").hide();
        },
        chekdpage(pageNum) {
          this.params.num = pageNum
          initData(this);
        },
        selectDogAndOwner() {//获取犬主犬只信息
          let dogId = null;
          let phone = null;
          this.dogList.map(item => {
            if (item && this.isCheckd==item.dogId) {//选中的
              if (item.immuneCardNum!=null) {
                $(".T").hide();
                this.dogInfo.dogId=null;
                this.dog=null;
                this.$alert('该犬已有免疫证，请输入新的犬只信息！');
              }else {
                $(".T").hide();
                this.dogInfo.dogId=item.dogId;
                this.dog=item;
              }
              phone=item.phone;
              dogId=item.dogId;
            }
          })
          selectOwnerr(this,phone);
          if (dogId==null) {
            this.$alert("请选择犬只！");
          }
        },
        //校验免疫证号是否重复
        checkImmune(){
          this.$axios({
            method: 'get',
            url: '/biz/dogAndOwner/selectIminNumBymin',
            params: {min:$("#immune").val().trim()},
            // isloading:true
          }).then((res) => {
            if (res.data != null && res.data != "") {
              this.$alert("此免疫证号已使用,请重新填写！");
              $("#immune").val('');
            }
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      computed: {
        pageData() {//分页参数
          let _this = this;
          return {
            curPage: _this.page.pageNum,//当前页吗
            totalCount: _this.page.totalCount,//总条数
            pageSize: _this.page.pageSize//页面大小
          }
        }
      }
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
  function initData(_this) {
    // if (!_this.params.input || _this.params.input.trim().length == 0) {
    //   delete _this.params.input//判断查询参数
    // }
    // if (!_this.params.input) {
    //   return
    // }
    _this.$axios({
      method: 'post',
      url: '/biz/dogAndOwner/selectDogListAccurate',
      data: _this.params,
      // isloading:true
    }).then((res) => {
      if (res.data.code == '000000' && res.data.result != null) {
        res.data.result.dogInfos.map(item => {
          item.checkd = false//添加选中标示 默认未选中
        })
        _this.dogList = res.data.result.dogInfos;
        _this.page = res.data.result.page;

        //分页数据
        // this.pageData.curPage = _this.page.pageNum;//当前页吗
        // this.pageData.totalCount = _this.page.totalCount;//总条数
        // this.pageData.pageSize = _this.page.pageSize;//页面大小
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  //根据电话获取犬主信息
  function selectOwnerr(_this,phonee) {
    _this.dogInfo.dogOwner.dogOwnerId=null;
    _this.dogInfo.dogOwner.dogOwnerName=null;
    _this.dogInfo.dogOwner.dogOwnerType=null;
    _this.dogInfo.dogOwner.sex=null;
    _this.dogInfo.dogOwner.districtId=null;
    _this.dogInfo.dogOwner.postalCode=null;
    _this.dogInfo.dogOwner.eMail=null;
    _this.dogInfo.dogOwner.address=null;
    _this.dogInfo.dogImmune.lssuerId=config.userInfo.userId
    _this.dogInfo.dogImmune.lssueOrgId=config.userInfo.organizationId
    var phone=null;
    if (phonee) {
      phone=phonee;
    }else {
      phone=$("#phone").val().trim();
    }
    _this.$axios({
      method:'get',
      url:'/biz/dogAndOwner/selectDogOwnersByPhoneee',
      params:{"phone":phone}
    }).then((res) => {
      console.log("23432rdfdf")
      console.log(res)
      if (res.data.data!=null && JSON.stringify(res.data.data) !="[]") {
        if (res.data.data[0].dogOwnerId!=null) {
          _this.ble=true
          if (res.data.data[0].cardType!=null) {
            _this.ble1=true
          }
          if (res.data.data[0].cardNum!=null) {
            _this.ble2=true
          }
          _this.dogInfo.dogOwner.dogOwnerId=res.data.data[0].dogOwnerId;
          _this.dogInfo.dogOwner.dogOwnerName=res.data.data[0].dogOwnerName;
          _this.dogInfo.dogOwner.dogOwnerType=res.data.data[0].dogOwnerType;
          _this.dogInfo.dogOwner.sex=res.data.data[0].sex;
          _this.dogInfo.dogOwner.districtId=res.data.data[0].districtId;
          _this.dogInfo.dogOwner.postalCode=res.data.data[0].postalCode;
          _this.dogInfo.dogOwner.dogOwnerPhone=res.data.data[0].dogOwnerPhone;
          _this.dogInfo.dogOwner.eMail=res.data.data[0].eMail;
          _this.dogInfo.dogOwner.address=res.data.data[0].address;
          _this.dogInfo.dogOwner.tDogOwnerCard.cardType=res.data.data[0].cardType;
          _this.dogInfo.dogOwner.tDogOwnerCard.cardNum=res.data.data[0].cardNum;
          _this.dogInfo.dogOwner.tDogOwnerCard.dogOwnerCardId=res.data.data[0].dogOwnerCardId;
        }
      }else {
        _this.ble=false
        _this.dogInfo.dogOwner.dogOwnerId=null;
        _this.dogInfo.dogOwner.dogOwnerName=null;
        _this.dogInfo.dogOwner.dogOwnerType=null;
        _this.dogInfo.dogOwner.sex=null;
        _this.dogInfo.dogOwner.districtId=null;
        _this.dogInfo.dogOwner.postalCode=null;
        _this.dogInfo.dogOwner.eMail=null;
        _this.dogInfo.dogOwner.address=null;
        $("#remaining input").val("");
      }
    })
  }
</script>

<style scoped>
.table5 td{
  text-align: center;
}
</style>
