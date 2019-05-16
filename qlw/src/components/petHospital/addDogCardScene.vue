<template>
  <!--内容区-->
  <div class="w980 fr">
    <div class="mbx">
      <ul class="ul11 clearfix">
        <li>
          <!--<router-link :to="{name:'dogManager_list'}">犬证管理></router-link>-->
          <a href="###" @click.prevent="$router.go(-1)">{{$route.params.name?$route.params.name:'上一页'}}&nbsp;&gt;&nbsp;&nbsp;</a>
        </li>
        <li>犬证办理</li>
      </ul>
    </div>
    <div class="mgl100">
      <input type="text" class="ww70 h40 lh40 pdl20 borf1 ras4" v-model.trim="params.input" @keyup.enter="check" placeholder="免疫证号/犬主姓名/手机号">
      <a style="cursor:pointer;width: 100px;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="check">查找</a>
    </div>
    <form @submit.prevent="submit">
      <div class="mgt10 k3">
        <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60" >免疫证信息</div>
        <div class="pdt10 pdb20 pdr30">
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">免疫证号</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled
                       :value="dogAllInfo.immuneCard?dogAllInfo.immuneCard.immuneCardNum:''">
                <!--<el-tooltip class="item" effect="dark" content="输入免疫证号搜索" placement="right">-->
                <!--<el-autocomplete-->
                <!--class="inline-input ww100 h40 lh40 ras4"-->
                <!--v-model="cardKeyWord"-->
                <!--:fetch-suggestions="querySearchCrad"-->
                <!--placeholder="请输入内容搜索"-->
                <!--:trigger-on-focus="false"-->
                <!--@select="cradSelectHandle"-->
                <!--&gt;</el-autocomplete>-->
                <!--</el-tooltip>-->
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">办理时间</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled
                       v-if="!(dogAllInfo.immuneCard && dogAllInfo.immuneCard.lssueTime)">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled v-else
                       :value="dogAllInfo.immuneCard.lssueTime|formatDate('yyyy年MM月dd日')">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w90 fl h40 lh40 cor0 pdl30">办理机构</span>
              <div class="mgl90">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled
                       :value="dogAllInfo.immuneCard?dogAllInfo.immuneCard.orgName:''">
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
                <span class="db w100 fl h40 lh40 cor0 pdl30">犬主姓名</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="insertParams.name">
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w90 fl h40 lh40 cor0 pdl30">性别</span>
                <div class="mgl90 h40 lh40">
                  <label class="lab2 mgr40"><input v-model="insertParams.gender" type="radio" name="abcd" value="0"><i></i>男</label>
                  <label class="lab2"><input type="radio" v-model="insertParams.gender" name="abcd" value="1"><i></i>女</label>
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">民族</span>
                <div class="mgl100">
                  <select type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="insertParams.ethnic">
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
                <div class="mgl90">
                  <el-date-picker v-model="insertParams.birthday" type="date" placeholder="选择日期" class="wd100b" format="yyyy年MM月dd日">
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">证件类型</span>
                <div class="mgl100">
                  <select type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="insertParams.cardType" :disabled="true">
                    <option value="0">身份证</option>
                    <option value="1">护照</option>
                    <option value="2">社保卡</option>
                    <option value="3">其他</option>
                  </select>
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w90 fl h40 lh40 cor0 pdl30">证件号码</span>
                <div class="mgl90">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="insertParams.cardNum" :disabled="true">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">联系电话</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled v-model="insertParams.phone">
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w90 fl h40 lh40 cor0 pdl30">电子邮箱</span>
                <div class="mgl90">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="insertParams.email">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">现住区县</span>
                <div class="mgl100">
                  <select id="district" @change="obtainDistrict" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4">
                    <option>请选择</option>
                    <option v-for="item in disTrictList" v-bind:value="item.districtId">{{item.districtName}}</option>
                  </select>
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w90 fl h40 lh40 cor0 pdl30">所属街道</span>
                <div class="mgl90">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="insertParams.street">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww100 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">详细地址</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="insertParams.addrees">
                </div>
              </div>
            </div>
          </div>

          <!--<div class="mgl730 pdt70">-->
          <!--<img class="db c-b" src="/static/images/b16.png" alt="">-->
          <!--</div>-->

          <div class="mgt20">
            <span class="db w100 fl h40 lh40 pdl30 cor0">犬主照片</span>
            <div class="mgl100 ovh" v-if="dogAllInfo&&dogAllInfo.ownerUrlLsit&&dogAllInfo.ownerUrlLsit.length>0">
              <img v-for="(item,index) in dogAllInfo.ownerUrlLsit" :key="index" style="width: 178px;height: 178px;margin-left: 10px" :src="item.imageUrl" alt="">
            </div>
            <div class="mgl100 ovh" v-else>
              <!--<img-upload class="ovh" ref="imgup"></img-upload>-->
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

      <div class="mgt10 k3">
        <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60" >犬只信息</div>
        <div class="pdt10 pdb20 pdr30">
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">犬名</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled
                       :value="dogAllInfo.dogInfo?dogAllInfo.dogInfo.dogName:''">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w90 fl h40 lh40 cor0 pdl30">品种</span>
              <div class="mgl90">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled
                       :value="dogAllInfo.dogInfo?dogAllInfo.dogInfo.breed:''">
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">性别</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled
                       :value="dogAllInfo.dogInfo && dogAllInfo.dogInfo.dogGender==0?'雄':dogAllInfo.dogInfo && dogAllInfo.dogInfo.dogGender==1?'雌':''">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w90 fl h40 lh40 cor0 pdl30">犬龄</span>
              <div class="mgl90">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled
                       :value="dogAllInfo.dogInfo?dogAllInfo.dogInfo.dogAge:''">
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">毛色</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled
                       :value="dogAllInfo.dogInfo?dogAllInfo.dogInfo.color:''">
              </div>
            </div>
          </div>
          <div class="mgt20">
            <span class="db w100 fl h40 lh40 pdl30 cor0">照片</span>
            <div class="mgl100 ovh">
              <ul class="ovh fl ul10 h180 ww100 borbfc695">
                <li class="fl" v-for="(item,index) in dogAllInfo.urlLsit" :key="index">
                  <img :src="item.imageUrl" alt="" style="width: 202px;height: 180px;" v-if="index<3">
                </li>
                <!--<li class="fl"><img src="/static/images/28-1.png" alt="" style="width: 202px;height: 180px;"></li>-->
                <!--<li class="fl"><img src="/static/images/28-2.png" alt=""></li>-->
                <!--<li class="fl"><img src="/static/images/28-3.png" alt=""></li>-->
              </ul>
            </div>
          </div>
        </div>
      </div>


      <div class="mgt10 k3">
        <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60" >犬证信息</div>
        <div class="pdt10 pdb20 pdr30">
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">犬证号<b style="color: red">&nbsp;*</b></span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="insertParams.dogCardNum">
              </div>
            </div>
            <!--<div class="mgt10 ww50 fr">-->
              <!--<a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="generateDogCard">生成犬证号</a>-->
            <!--</div>-->
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">签发日期</span>
              <div class="mgl100">
                <el-date-picker v-model="insertParams.startTime" name="startTime" type="date" placeholder="选择日期" class="wd100b" disabled format="yyyy年MM月dd日">
                </el-date-picker>
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w90 fl h40 lh40 cor0 pdl30">有效期至<b style="color: red">&nbsp;*</b></span>
              <div class="mgl90">
                  <el-date-picker v-model="insertParams.endTime" name="endTime" type="date" placeholder="选择日期" class="wd100b"
                                  :format="datePattern">
                  </el-date-picker>
              </div>
            </div>
          </div>
        </div>

        <div class="t-c mgt40 mgb50 ">
          <input type="submit" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort cupo" value="提交">
          <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5"
             @click.prevent="quel">重置</a>
        </div>

        <div class="t-c mgt40 mgb50">
          <el-dialog
            title="提示"
            :visible.sync="alert.dialogVisible"
            width="30%">
            <span slot="footer" class="dialog-footer">
              <!--<el-button @click="alert.dialogVisible = false">取 消</el-button>-->
              <el-button type="primary" @click="alert.dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>

    </form>

    <!--内容区END-->
    <!--弹窗   说明。.db--显示，.dn--隐藏-->
    <div class="T db" style="display: none;z-index: 2">
      <div class="tan6 abs bgw k3 db" style="height: 640px">
        <p class="ww100 h30" style="background-color: #ffa472"><span style="color: #ffffff;margin-left: 10px;font-size: 16px">查找犬只</span></p>
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
              <td>{{item?item.immuneCardNum?item.immuneCardNum:'':''}}</td>
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
  <!--内容区END-->
</template>

<script>
  import globalConf from '@/common/config'
  var bool=true;
    export default {
        name: "addDogCardScene",
      data() {
        return {
          params: {
            num: 1,//页码
            size: 5,//页面大小
            input: '',  //keyword
          },
          isCheckd:null,
          insertParams:{//办理犬证插入的对象
            seqNum:null,
            dogCardNum:null,
            dogOwnerCardId:null,//犬主证件id
            dogId:null,
            dogOwnerId:null,
            startTime:null,
            endTime:null,
            lssueTime:null,
            lssueOrgId:null,
            lssuerId:null,
            creationTime:null,
            phone:null,
            name:null,
            gender:null,
            email:null,
            ethnic:null,//名族
            birthday:null,//生日
            cardType:null,//证件类型
            cardNum:null,//证件号码
            bool:null,//判断是insert证件信息还是update证件信息 0新增1修改
            districtId:null,//现住区县id
            street:null,//所属街道
            addrees:null//详细地址
          },
          datePattern:"yyyy年MM月dd日",
          page: [],//分页对象
          dogList:[],
          cardKeyWord: '',//免疫证输入值
          deviceNumKeyWord: '',//设备编号输入值
          deviceInfo: {},//选择的设备信息
          dogAllInfo: {},//犬的所有信息
          cardDateStart: '',//证书期限 开始时间
          cardDateEnd: '',//证书期限 结束时间
          alert: {//弹出框
            dialogVisible: false,//弹出框显示标示，
            msg: 'ssss'//弹窗提示内容
          },
          disTrictList:null,
        }
      },
      created(){
          if (this.$route.params.immuneCardNum) {
            this.$axios({
              url: '/biz/dogCard/selectDogCardInfo',
              params: {'cardNum': this.$route.params.immuneCardNum}
            }).then((res) => {
              if (res.data.code == '000000') {
                this.dogAllInfo = res.data.result;
                this.insertParams={//办理犬证插入的对象
                  dogCardNum:null,
                  dogOwnerCardId:this.dogAllInfo.dogOwners.dogOwnerCardId,
                  dogId:this.dogAllInfo.dogInfo.dogId,
                  dogOwnerId:this.dogAllInfo.dogOwners.dogOwnerId,
                  startTime:new Date(),
                  endTime:null,
                  lssueTime:new Date(),
                  lssueOrgId:globalConf.userInfo.organizationId,
                  lssuerId:globalConf.userInfo.userId,
                  creationTime:new Date(),
                  phone:this.dogAllInfo.dogOwners.dogOwnerPhone,
                  name:this.dogAllInfo.dogOwners.dogOwnerName,
                  gender:this.dogAllInfo.dogOwners.sex,
                  email:this.dogAllInfo.dogOwners.eMail,
                  ethnic:null,//名族
                  birthday:null,//生日
                  cardType:this.dogAllInfo.dogOwners.cardType,//证件类型
                  cardNum:this.dogAllInfo.dogOwners.cardNum,//证件号码
                  bool:null,//判断是insert证件信息还是update证件信息 0新增1修改
                  districtId:this.dogAllInfo.dogOwners.districtId,//现住区县id
                  street:this.dogAllInfo.dogOwners.community,//所属街道
                  addrees:this.dogAllInfo.dogOwners.address//详细地址
                }
              }
            }).catch((res) => {
              console.log(res)
            })
          }
      },
      methods: {
        querySearchCrad(queryString, cb) {
          this.cardKeyWord = queryString;
          initSearchCardData(this, cb);
        },
        querySearchDeivce(queryString, cb) {
          this.deviceNumKeyWord = queryString;
          initSearchDeviceData(this, cb)
        },
        deviceSelectHandle(item) {//设备编号选择
          if (!item || item.value === '无匹配') return
          this.deviceInfo = item.address
          console.log(this.deviceInfo)
        },
        //获取社区
        obtainDistrict:function () {
          this.insertParams.districtId=$("#district").val();
        },
        cradSelectHandle(item) {//免疫证号选择选择
          this.$axios({
            url: '/biz/dogCard/selectDogCardInfo',
            params: {'cardNum': item.value}
          }).then((res) => {
            console.log(res)
            if (res.data.code == '000000') {
              this.dogAllInfo = res.data.result;
            }
          }).catch((res) => {
            console.log(res)
          })
        },
        selectDogAndOwner() {//获取犬主犬只信息
          let dogimmuneNum = null;
          let seqNum = null;
          let bol = false;
          this.dogList.map(item => {
            if (item && this.isCheckd==item.dogId) {//所有选中的
              if (item.seqNum!=null) {
                this.$confirm('该犬只已申请办理犬证，正待审核，确定继续办理吗？').then(_ => {
                  dogimmuneNum=item.immuneCardNum
                  seqNum=item.seqNum
                  console.log(this.insertParams.seqNum)
                  bol = true
                  this.$axios({
                    url: '/biz/dogCard/selectDogCardInfo',
                    params: {'cardNum': dogimmuneNum}
                  }).then((res) => {
                    if (res.data.code == '000000') {
                      this.dogAllInfo = res.data.result;
                      this.insertParams={//办理犬证插入的对象
                        seqNum:seqNum,
                        dogCardNum:null,
                        dogOwnerCardId:this.dogAllInfo.dogOwners.dogOwnerCardId,
                        dogId:this.dogAllInfo.dogInfo.dogId,
                        dogOwnerId:this.dogAllInfo.dogOwners.dogOwnerId,
                        startTime:new Date(),
                        endTime:null,
                        lssueTime:new Date(),
                        lssueOrgId:globalConf.userInfo.organizationId,
                        lssuerId:globalConf.userInfo.userId,
                        creationTime:new Date(),
                        phone:this.dogAllInfo.dogOwners.dogOwnerPhone,
                        name:this.dogAllInfo.dogOwners.dogOwnerName,
                        gender:this.dogAllInfo.dogOwners.sex,
                        email:this.dogAllInfo.dogOwners.eMail,
                        ethnic:null,//名族
                        birthday:null,//生日
                        cardType:this.dogAllInfo.dogOwners.cardType,//证件类型
                        cardNum:this.dogAllInfo.dogOwners.cardNum,//证件号码
                        bool:null,//判断是insert证件信息还是update证件信息 0新增1修改
                        districtId:this.dogAllInfo.dogOwners.districtId,//现住区县id
                        street:this.dogAllInfo.dogOwners.community,//所属街道
                        addrees:this.dogAllInfo.dogOwners.address//详细地址
                      }
                    }
                  }).catch((res) => {
                    console.log(res)
                  })
                }).catch(_ => {});
              }else {
                dogimmuneNum=item.immuneCardNum
                bol = true
              }
            }
          })
          if (bol) {
            this.$axios({
              url: '/biz/dogCard/selectDogCardInfo',
              params: {'cardNum': dogimmuneNum}
            }).then((res) => {
              if (res.data.code == '000000') {
                this.dogAllInfo = res.data.result;
                this.insertParams={//办理犬证插入的对象
                  dogCardNum:null,
                  dogOwnerCardId:this.dogAllInfo.dogOwners.dogOwnerCardId,
                  dogId:this.dogAllInfo.dogInfo.dogId,
                  dogOwnerId:this.dogAllInfo.dogOwners.dogOwnerId,
                  startTime:new Date(),
                  endTime:null,
                  lssueTime:new Date(),
                  lssueOrgId:globalConf.userInfo.organizationId,
                  lssuerId:globalConf.userInfo.userId,
                  creationTime:new Date(),
                  phone:this.dogAllInfo.dogOwners.dogOwnerPhone,
                  name:this.dogAllInfo.dogOwners.dogOwnerName,
                  gender:this.dogAllInfo.dogOwners.sex,
                  email:this.dogAllInfo.dogOwners.eMail,
                  ethnic:null,//名族
                  birthday:null,//生日
                  cardType:this.dogAllInfo.dogOwners.cardType,//证件类型
                  cardNum:this.dogAllInfo.dogOwners.cardNum,//证件号码
                  bool:null,//判断是insert证件信息还是update证件信息 0新增1修改
                  districtId:this.dogAllInfo.dogOwners.districtId,//现住区县id
                  street:this.dogAllInfo.dogOwners.community,//所属街道
                  addrees:this.dogAllInfo.dogOwners.address//详细地址
                }
              }
            }).catch((res) => {
              console.log(res)
            })
          }
          $(".T").hide();
          if (dogimmuneNum==null && bol) {
            this.$alert("请选择犬只！");
          }
        },
        quel(){//重置
          bool=true
          this.dogAllInfo={}
          this.insertParams={//办理犬证插入的对象
              seqNum:null,
              dogCardNum:null,
              dogOwnerCardId:null,//犬主证件id
              dogId:null,
              dogOwnerId:null,
              startTime:null,
              endTime:null,
              lssueTime:null,
              lssueOrgId:null,
              lssuerId:null,
              creationTime:null,
              phone:null,
              name:null,
              gender:null,
              email:null,
              ethnic:null,//名族
              birthday:null,//生日
              cardType:null,//证件类型
              cardNum:null,//证件号码
              bool:null,//判断是insert证件信息还是update证件信息 0新增1修改
              districtId:null,//现住区县id
              street:null,//所属街道
              addrees:null//详细地址
          }
        },
        submit(e) {//提交表单
          // let loadingInstance = this.$loading({
          //   lock: true,
          //   text: '正在处理，请稍后...',
          //   background: 'rgba(0, 0, 0, 0.3)'
          // })
          if (bool) {
            bool=false
            try {
              if (!this.insertParams.dogCardNum) {
                bool=true;
                this.$alert("请填写犬证号！");
                return;
              }
              if (!this.insertParams.endTime) {
                bool=true;
                this.$alert("您还没有选择证书有效期！");
                return;
              }

              if (!this.insertParams.dogOwnerId) {
                bool=true;
                this.$alert("请选择一个免疫证信息");
                return;
              }
              //发请求办证
              this.$axios({
                method: "post",
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'  //这里加上头部信息
                },
                url: '/biz/dogCard/insertDogCard',
                data: JSON.stringify(this.insertParams),
                isloading:true
              }).then((res) => {
                bool=true
                console.log(res)
                if (res.data.code == '000000') {
                  this.alert.msg = "办理成功！";
                  //图片上传
                  bool=false
                  if (!this.dogAllInfo.ownerUrlLsit.length>0) {
                    this.$refs.imgup.upload({type: 11, id: this.insertParams.dogOwnerId})
                    this.$refs.imgup1.upload({type: 12, id: this.insertParams.dogOwnerId})
                    this.$refs.imgup2.upload({type: 13, id: this.insertParams.dogOwnerId})
                  }
                  bool=true
                  this.$alert(this.alert.msg).then(_=>{
                    this.$router.back(-1);
                  })
                }else if (res.data.code == '000133') {
                  this.alert.msg = "请不要重复提交！";
                  this.$alert(this.alert.msg);
                } else {
                  this.alert.msg = "办理失败！";
                  this.$alert(this.alert.msg);
                }
              }).catch(_ => {
                // this.alert.msg = "服务器繁忙！";
                // this.$alert(this.alert.msg)
              })
            } catch (e) {
              this.alert.msg = "信息填写不完整！";
              this.$alert(this.alert.msg)
              // setTimeout(()=>{this.alert.dialogVisible = !this.alert.dialogVisible},1000)
            } finally {
              // this.alert.dialogVisible = !this.alert.dialogVisible;
              // this.$nextTick(() => loadingInstance.close());
              // this.$alert(this.alert.msg)
            }
          }
        },
        handleClose(done) {
          this.$confirm('确认关闭？').then(_ => {
            done();
          }).catch(_ => {
          });
        },
        //...................................................................................................
        //查找犬只列表信息
        check:function () {
          bool=true
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
        generateDogCard(){//生成犬证号
          if (!this.insertParams.dogCardNum) {
            this.$axios({
              method: "get",
              url: '/biz/dogCard/generateDogCard',
            }).then((res) => {
              if (res.data!=null) {
                this.insertParams.dogCardNum=res.data
              }
            }).catch(_ => {
              // this.alert.msg = "服务器繁忙！";
              // this.$alert(this.alert.msg)
            })
          }
          }
      },
      mounted() {
        initSelectOption(this);
        // this.searchCardList = this.loadAll();
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
      },
      filters: {},
      watch: {
        deviceNumKeyWord(newVal, oldVal) {
          if (!newVal || newVal.trim().length == 0) this.deviceInfo = {};
        },
        phoneKeyWord(newVal, oldVal) {
          if (!newVal || newVal.trim().length == 0) this.dogAllInfo = {};
        },
        cardDateEnd(newVal) {
          if (newVal && this.cardDateStart && newVal.getTime() < this.cardDateStart) {
            this.$alert("结束日期不能小于开始日期")
            this.cardDateEnd = '';
          }
        },
        cardDateStart(newVal) {
          if (newVal && this.cardDateEnd && newVal.getTime() > this.cardDateEnd) {
            this.$alert("开始日期不能大于结束日期")
          }
          if (newVal && newVal.getTime() > this.cardDateEnd && this.cardDateEnd) {
            this.$alert("起始日期不能大于结束日期")
            this.cardDateStart = '';
          }
        }
      }
    }

  function initSearchCardData(_this, cb) {
    _this.$axios({
      url: '/biz/dogCard/selectImmuneCardNums',
      params: {"input": _this.cardKeyWord}
    }).then((res) => {
      if (res.data.code == '000000') {
        //输入框下拉逻辑
        if (cb) {
          let temp = [];
          res.data.result.map(item => {
            temp.push({"value": item, "address": item})//固定格式返回
          })
          cb(isNone(temp))
        }
      }
    }).catch(r => console.log(r))
  }

  // function initSearchDeviceData(_this, cb) {
  //   _this.$axios({
  //     url: '/biz/device/search/' + _this.deviceNumKeyWord,
  //     params: {"isActive": true}
  //   }).then((res) => {
  //     if (res.data.meta.success && res.data.data) {
  //       //输入框下拉逻辑
  //       if (cb) {
  //         let temp = [];
  //         res.data.data.map(item => {
  //           temp.push({"value": item.deviceNumber, "address": item})//固定格式返回
  //         })
  //         cb(isNone(temp))
  //       }
  //     }
  //   }).catch(r => console.log(r))
  // }

  //判断搜索有无结果
  function isNone(array) {
    if (!array || array.length == 0) {
      return [{
        value: '无匹配',
        address: '无匹配'
      }]
    }
    return array;
  }

//..............................................................................
  function initData(_this) {
    // if (!_this.params.input) {
    //   return
    // }
    _this.$axios({
      method: 'get',
      url: '/biz/dogAndOwner/selectNoDogCard',
      params: _this.params,
    }).then((res) => {
      if (res.data.code == '000000' && res.data.result != null) {
        res.data.result.dogInfos.map(item => {
          item.checkd = false//添加选中标示 默认未选中
        })
        _this.dogList = res.data.result.dogInfos;
        _this.page = res.data.result.page;
        console.log(111)
        console.log(_this.dogList)
        //分页数据
        // this.pageData.curPage = _this.page.pageNum;//当前页吗
        // this.pageData.totalCount = _this.page.totalCount;//总条数
        // this.pageData.pageSize = _this.page.pageSize;//页面大小
      }
    }).catch((err) => {
      console.log(err);
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
  .wd100b {
    width: 100%;
    display: inline-block;
    vertical-align: middle;
  }

  .cupo {
    cursor: pointer;
  }

</style>
