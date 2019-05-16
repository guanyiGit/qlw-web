<template>
    <!--添加免疫证-->
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
        <input type="text" class="ww70 h40 lh40 pdl20 borf1 ras4" v-model.trim="listParm.input" @keyup.enter="check" placeholder="犬主电话/犬主姓名">
        <a style="cursor:pointer;width: 100px;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="check">查找</a>
      </div>
      <div class="mgt10 k3">
        <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60" >免疫证信息</div>
        <div class="pdt10 pdb20 pdr30">
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">免疫证号<b style="color: red">&nbsp;*</b></span>
              <div class="mgl100">
                <input id="immune" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" @change="checkImmune">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mgt15 k3">
        <!--<div class="fs16 cor0 fb pdl30 bgf1 h60 lh60" style="text-align:left">犬主信息</div>-->
        <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60 " style="position: relative">
          <span  style="position: absolute;left: 26px">犬主信息</span>
        </div>
        <div class="pdb20 ovh">
          <div class="w945 pdt10">
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">联系电话<b style="color: red">&nbsp;*</b></span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled v-model="dogInfo.dogOwner.dogOwnerPhone">
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w90 fl h40 lh40 cor0 pdl30">犬主姓名<b style="color: red">&nbsp;*</b></span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogInfo.dogOwner.dogOwnerName">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">证件类型<b style="color: red">&nbsp;*</b></span>
                <div class="mgl100">
                  <select type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogInfo.dogOwner.tDogOwnerCard.cardType">
                    <option value="0">身份证</option>
                    <option value="1">护照</option>
                    <option value="2">社保卡</option>
                    <option value="3">其他</option>
                  </select>
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w90 fl h40 lh40 cor0 pdl30">证件号码<b style="color: red">&nbsp;*</b></span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogInfo.dogOwner.tDogOwnerCard.cardNum">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">民族</span>
                <div class="mgl100">
                  <select type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogInfo.dogOwner.ethnic">
                    <option value="未选择">未选择</option>
                    <option value="汉族">汉族</option>
                    <option value="蒙古族">蒙古族</option>
                    <option value="回族">回族</option>
                    <option value="藏族">藏族</option>
                    <option value="维吾尔族">维吾尔族</option>
                    <option value="苗族">苗族</option>
                    <option value="彝族">彝族</option>
                    <option value="壮族">壮族</option>
                    <option value="布依族">布依族</option>
                    <option value="朝鲜族">朝鲜族</option>
                    <option value="满族">满族</option>
                    <option value="侗族">侗族</option>
                    <option value="瑶族">瑶族</option>
                    <option value="白族">白族</option>
                    <option value="土家族">土家族</option>
                    <option value="哈尼族">哈尼族</option>
                    <option value="哈萨克族">哈萨克族</option>
                    <option value="傣族">傣族</option>
                    <option value="黎族">黎族</option>
                    <option value="傈僳族">傈僳族</option>
                    <option value="佤族">佤族</option>
                    <option value="畲族">畲族</option>
                    <option value="高山族">高山族</option>
                    <option value="拉祜族">拉祜族</option>
                    <option value="水族">水族</option>
                    <option value="东乡族">东乡族</option>
                    <option value="纳西族">纳西族</option>
                    <option value="景颇族">景颇族</option>
                    <option value="柯尔克孜族">柯尔克孜族</option>
                    <option value="土族">土族</option>
                    <option value="达斡尔族">达斡尔族</option>
                    <option value="仫佬族">仫佬族</option>
                    <option value="羌族">羌族</option>
                    <option value="布朗族">布朗族</option>
                    <option value="撒拉族">撒拉族</option>
                    <option value="毛南族">毛南族</option>
                    <option value="仡佬族">仡佬族</option>
                    <option value="锡伯族">锡伯族</option>
                    <option value="阿昌族">阿昌族</option>
                    <option value="普米族">普米族</option>
                    <option value="塔吉克族">塔吉克族</option>
                    <option value="怒族">怒族</option>
                    <option value="乌孜别克族">乌孜别克族</option>
                    <option value="俄罗斯族">俄罗斯族</option>
                    <option value="鄂温克族">鄂温克族</option>
                    <option value="德昂族">德昂族</option>
                    <option value="保安族">保安族</option>
                    <option value="裕固族">裕固族</option>
                    <option value="京族">京族</option>
                    <option value="塔塔尔族">塔塔尔族</option>
                    <option value="独龙族">独龙族</option>
                    <option value="鄂伦春族">鄂伦春族</option>
                    <option value="赫哲族">赫哲族</option>
                    <option value="门巴族">门巴族</option>
                    <option value="珞巴族">珞巴族</option>
                    <option value="基诺族">基诺族</option>
                  </select>
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w90 fl h40 lh40 cor0 pdl30">出生日期</span>
                <div class="mgl100">
                  <el-date-picker type="date" placeholder="选择日期" class="wd100b" format="yyyy年MM月dd日">
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">性别</span>
                <div class="mgl90 h40 lh40">
                  <label class="lab2 mgr40"><input v-model="dogInfo.dogOwner.sex" type="radio" name="abcd" value="0"><i></i>男</label>
                  <label class="lab2"><input type="radio" v-model="dogInfo.dogOwner.sex" name="abcd" value="1"><i></i>女</label>
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w90 fl h40 lh40 cor0 pdl30">电子邮箱</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogInfo.dogOwner.eMail">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">现住区县</span>
                <div class="mgl100">
                  <!--<select id="district" @change="obtainDistrict" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4">-->
                    <!--<option>请选择</option>-->
                    <!--<option v-for="item in disTrictList" v-bind:value="item.districtId">{{item.districtName}}</option>-->
                  <!--</select>-->
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w90 fl h40 lh40 cor0 pdl30">所属街道</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogInfo.dogOwner.districtId">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww100 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">详细地址</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogInfo.dogOwner.address">
                </div>
              </div>
            </div>
          </div>
          <div class="mgt20">
            <span class="db w100 fl h40 lh40 pdl30 cor0">犬主照片</span>
            <div class="mgl100 ovh" v-if="dogAllInfo&&dogAllInfo.ownerUrlLsit&&dogAllInfo.ownerUrlLsit.length>0">
              <img v-for="(item,index) in dogAllInfo.ownerUrlLsit" :key="index" style="width: 178px;height: 178px;margin-left: 10px" :src="item.imageUrl" alt="">
            </div>
            <div class="mgl100 ovh" v-else>
              <div style="float: left">
                <img-upl class="ovh" ref="imgup"></img-upl>
                <div class="el-upload__text" style="width:178px;text-align: center;">手持身份证半身照</div>
              </div>
              <div style="float: left;margin-left: 10px">
                <img-upl class="ovh" ref="imgup1"></img-upl>
                <div class="el-upload__text" style="width:178px;text-align: center;">身份证正面照</div>
              </div>
              <div style="float: left;margin-left: 10px">
                <img-upl class="ovh" ref="imgup2"></img-upl>
                <div class="el-upload__text" style="width:178px;text-align: center;">身份证反面照</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--犬只列表-->
      <div class="mgt10 k3">
        <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">犬只信息</div>
        <div v-if="myDogs">
          <table class="table2" width="100%" border="1">
            <tbody>
            <tr>
              <td></td>
              <td>免疫证号</td>
              <td>犬名</td>
              <td>品种</td>
              <td>毛色</td>
              <td>操作</td>
            </tr>
            <tr v-if="myDogs && myDogs.length>0" v-for="(item,index) in myDogs" :key="index">
              <td><label class="lab3 mgr40"><input type="radio" v-model="isCheckd" name="aa" :value=item.dogId><i></i></label></td>
              <td>{{item.immuneCardNum?item.immuneCardNum:''}}</td>
              <td>{{item.dogName?item.dogName:''}}</td>
              <td>{{item.breed?item.breed:''}}</td>
              <td>{{item.colour?item.colour:''}}</td>
              <td><router-link :to="{name: 'dogManager_info',params:{dogId:item.dogId,name:'犬主详情'}}"><font color="blue">修改</font></router-link></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="none">无数据</div>
      </div>
      <div class="t-c mgt40 mgb50">
        <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="save">提交</a>
        <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8" @click="fromReset">重置</a>
      </div>
    </div>
    <!--内容区END-->
    <!--弹窗   说明。.db--显示，.dn--隐藏-->
    <div class="T db tc1" style="display: none;z-index: 2">
      <div class="tan6 abs bgw k3 db" style="height: 640px">
        <p class="ww100 h30" style="background-color: #ffa472"><span style="color: #ffffff;margin-left: 10px;font-size: 16px">查找犬主</span></p>
        <form class="fr db w380 h40 borbfbfbf ras20 rel mgt5">
          <input type="text" class="db ww100 h38 lh38 pdl15 cor3c3c3c bort" v-model="listParm.input" @keyup.enter="check" placeholder="犬主姓名/犬主电话">
          <input value="" class="in1 db abs z100 top0 bort right0" @click="check">
        </form>
        <div class="mgt50 k3">
          <table class="table5 t-c">
            <thead>
            <tr>
              <td class="cor0 h60 bgf1 ww5"></td>
              <td class="cor0 h60 bgf1">犬主姓名</td>
              <td class="cor0 h60 bgf1">犬主电话</td>
              <td class="cor0 h60 bgf1">犬主证件类型</td>
              <td class="cor0 h60 bgf1">犬主证件号码</td>
            </tr>
            </thead>
            <tbody id="tbod">
            <tr v-for="(item,index) in ownerList" :key="index">
              <td class="ww5"><label class="lab3 mgr40"><input type="radio" v-model="isCheckd" name="aa" :value=item.dogOwnerId><i></i></label></td>
              <td>{{item?item.dogOwnerName?item.dogOwnerName:'':''}}</td>
              <td>{{item?item.dogOwnerPhone?item.dogOwnerPhone:'':''}}</td>
              <td>{{item?item.cardType==0?'身份证':item.cardType==1?'护照':item.cardType==2?'社保卡':item.cardType==3?'其他':'--':'--'}}</td>
              <td>{{item.cardNum?item.cardNum:'-'}}</td>
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
    <!--弹窗2start-->
    <!--<div class="T db" style="display: none;z-index: 2">-->
      <!--<div class="tan6 abs bgw k3 db" style="height: 640px">-->
        <!--<div class="mgt20 k3">-->
          <!--<div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">犬只信息</div>-->
          <!--<div class="pdt10 pdb20 pdr30">-->
            <!--<div class="ovh">-->
              <!--<div class="mgt10 ww50 fl">-->
                <!--<span class="db w100 fl h40 lh40 cor0 pdl30">犬名</span>-->
                <!--<div class="mgl100">-->
                  <!--<input v-if="dog&&dog.dogName" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dog.dogName" :disabled="true">-->
                  <!--<input v-else type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model.trim="dogInfo.dogName">-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="ovh">-->
              <!--<div class="mgt10 ww50 fl">-->
                <!--<span class="db w100 fl h40 lh40 cor0 pdl30">性别</span>-->
                <!--<div v-if="dog&&dog.dogGender" class="mgl100 h40 lh40">-->
                  <!--<label class="lab2 mgr40"><input v-model="dog.dogGender" type="radio" name="abcd" value="0"><i></i>雄</label>-->
                  <!--<label class="lab2"><input type="radio" v-model="dog.dogGender" name="abcd" value="1"><i></i>雌</label>-->
                <!--</div>-->
                <!--<div v-else class="mgl100 h40 lh40">-->
                  <!--<label class="lab2 mgr40"><input v-model="dogInfo.dogGender" type="radio" name="abcd" value="0"><i></i>雄</label>-->
                  <!--<label class="lab2"><input type="radio" v-model="dogInfo.dogGender" name="abcd" value="1"><i></i>雌</label>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="mgt10 ww50 fr">-->
                <!--<span class="db w100 fl h40 lh40 cor0 pdl30">品种<b style="color: red">&nbsp;*</b></span>-->
                <!--<div class="mgl100">-->
                  <!--<input v-if="dog&&dog.breed" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dog.breed" :disabled="true">-->
                  <!--<select v-else id="breed" @change="obtainBreed" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4">-->
                    <!--<option>请选择</option>-->
                    <!--<option v-for="item in breedList" v-bind:value="item.dictionaryValue">{{item.dictionaryDescribe}}</option>-->
                  <!--</select>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="ovh">-->
              <!--<div class="mgt10 ww50 fr">-->
                <!--<span class="db w100 fl h40 lh40 cor0 pdl30">犬龄</span>-->
                <!--<div class="mgl100">-->
                  <!--<input v-if="dog&&dog.dogAge" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dog.dogAge+'岁'" :disabled="true">-->
                  <!--<input v-else type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model.trim="dogInfo.dogAge">-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="mgt10 ww50 fr">-->
                <!--<span class="db w100 fl h40 lh40 cor0 pdl30">毛色</span>-->
                <!--<div class="mgl100">-->
                  <!--<input v-if="dog&&dog.colour" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dog.colour" :disabled="true">-->
                  <!--<select v-else id="color" @change="obtainColor" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4">-->
                    <!--<option>请选择</option>-->
                    <!--<option v-for="item in colorList" v-bind:value="item.dictionaryValue">{{item.dictionaryDescribe}}</option>-->
                  <!--</select>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="mgt20">-->
              <!--<span class="db w100 fl h40 lh40 pdl30 cor0">犬只照片</span>-->
              <!--<div class="mgl100 ovh">-->
                <!--&lt;!&ndash;<img-upload class="ovh" ref="imgup"></img-upload>&ndash;&gt;-->
                <!--<div style="float: left">-->
                  <!--<img-upl class="ovh" ref="imgup"></img-upl>-->
                  <!--<div class="el-upload__text" style="width:178px;text-align: center;">犬只正面照</div>-->
                <!--</div>-->
                <!--<div style="float: left;margin-left: 10px">-->
                  <!--<img-upl class="ovh" ref="imgup1"></img-upl>-->
                  <!--<div class="el-upload__text" style="width:178px;text-align: center;">犬只侧面照</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="t-c mgt40 mgb50">-->
          <!--<a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="selectDogAndOwner">确定</a>-->
          <!--<a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8" @click="tableCancel">取消</a>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--弹窗2end-->
  </div>
</template>

<script>
  import $ from 'jquery'
  import config from '../../common/config'
    export default {
        name: "NewAddImmunCard",
      data(){
          return{
            listParm:{//查犬主列表的请求参数
             id:null,
             input:null,//搜索条件
             num:1,
             size:5
            },
            dogParm:{//查犬主列表的请求参数
              id:null,
              input:null,//搜索条件
              num:1,
              size:20
            },
            ownerPage:[],
            dogPage:[],
            ownerList:[],//犬主列表信息
            myDogs:[],//我的犬只列表
            isCheckd:null,
            dogInfo: {dogId:null,
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
                  ethnic:null,//民族
                  tDogOwnerCard:{
                    cardType:null,//证件类型
                    cardNum:null//证件号码
                  }
                }
              },
          }
      },
      methods:{
        //查找犬只列表信息
        check:function () {
          this.isCheckd=null
          $(".tc1").show();
          initData(this);
        },
        //列表的取消
        tableCancel:function () {
          $(".tc1").hide();
        },
        chekdpage(pageNum) {
          this.params.num = pageNum
          initData(this);
        },
        save(){
          this.dogInfo.dogImmune.lssuerId=config.userInfo.userId
          this.dogInfo.dogImmune.lssueOrgId=config.userInfo.organizationId
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
          if (this.dogInfo.dogOwner.dogOwnerId==null) {
            if(!this.dogInfo.dogOwner.dogOwnerName){
              alertMsg='犬主姓名必须填写'
              flag = false
            }
            if(!this.dogInfo.dogOwner.dogOwnerPhone || !/^1[34578]\d{9}$/.test(this.dogInfo.dogOwner.dogOwnerPhone) ){
              alertMsg = "电话号码格式有误！";
              flag = false
            }
            // if(!this.dogInfo.dogOwner.eMail || !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.dogInfo.dogOwner.eMail) ){
            //   alertMsg = "邮箱格式有误！";
            //   flag = false
            // }
            if(!this.dogInfo.dogOwner.tDogOwnerCard.cardType){
              alertMsg='犬主证件类型必须选择'
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
          }
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
        selectDogAndOwner() {//获取犬主犬只信息
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
            data: $("#immune").val().trim(),
            // isloading:true
          }).then((res) => {
            if (res.data != null) {
              this.$alert("此免疫证号已使用！");
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
            curPage: _this.ownerPage.pageNum,//当前页吗
            totalCount: _this.ownerPage.totalCount,//总条数
            pageSize: _this.ownerPage.pageSize//页面大小
          }
        }
      }
    }

    //查询犬主列表
  function initData(_this) {
    _this.$axios({
      method: 'post',
      url: '/biz/dogAndOwner/selectDogOwners',
      data: _this.listParm,
      // isloading:true
    }).then((res) => {
      if (res.data.code == '000000' && res.data.result != null) {
        res.data.result.owners.map(item => {
          item.isCheckd = false//添加选中标示 默认未选中
        })
        _this.ownerList = res.data.result.owners;
        _this.ownerPage = res.data.result.page;
        console.log(4234)
        console.log(_this.dogList)
        console.log(_this.ownerPage)
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  //查询我的犬只列表
  function myDogs(_this) {
    _this.$axios({
      method:"get",
      url:"/biz/dogAndOwner/selectMyDogsPag",
      data:_this.dogParm
    }).then((res) =>{
      if (res.data.code == '000000' && res.data.result != null) {
        res.data.result.myDogs.map(item => {
          item.checkd = false//添加选中标示 默认未选中
        })
        _this.dogList = res.data.result.myDogs;
        _this.dogPage = res.data.result.page;
      }
    }).catch((err) =>{
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
      console.log(res)
      if (res.data.data!=null && JSON.stringify(res.data.data) !="[]") {
        if (res.data.data[0].dogOwnerId!=null) {
          _this.ble=true
          _this.dogInfo.dogOwner.dogOwnerId=res.data.data[0].dogOwnerId;
          _this.dogInfo.dogOwner.dogOwnerName=res.data.data[0].dogOwnerName;
          _this.dogInfo.dogOwner.dogOwnerType=res.data.data[0].dogOwnerType;
          _this.dogInfo.dogOwner.sex=res.data.data[0].sex;
          _this.dogInfo.dogOwner.districtId=res.data.data[0].districtId;
          _this.dogInfo.dogOwner.postalCode=res.data.data[0].postalCode;
          _this.dogInfo.dogOwner.dogOwnerPhone=res.data.data[0].dogOwnerPhone;
          _this.dogInfo.dogOwner.eMail=res.data.data[0].eMail;
          _this.dogInfo.dogOwner.address=res.data.data[0].address;
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

</style>
