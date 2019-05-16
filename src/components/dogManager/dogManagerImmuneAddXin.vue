<template>
  <!--新版添加免疫证-->
  <div>
    <!--内容区-->
    <div class="w980 fr">
      <div class="mbx">
        <ul class="ul11 clearfix">
          <li><router-link style="cursor:pointer;" :to="{name:'hospital_ImmuneList'}">免疫登记></router-link></li>
          <li>新建免疫登记</li>
        </ul>
      </div>
      <div class="mgt20 k3">
        <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">基本信息<span style="margin-left: 85%;color: #fbad82;cursor:pointer;" @click="flag && save()">保存</span></div>
        <div class="pdt10 pdb20 pdr30">
          <!---->
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">犬主电话<b style="color: red">&nbsp;*</b></span>
              <div class="mgl100">
                <input type="text" id="phone" @change="selectOwner" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model.trim="dogInfo.dogOwner.dogOwnerPhone" :disabled="disabled">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w100 fl h40 lh40 cor0 pdl30">犬主姓名<b style="color: red">&nbsp;*</b></span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model.trim="dogInfo.dogOwner.dogOwnerName" :disabled="disabled">
              </div>
            </div>
          </div>
          <div id="remaining">
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">证件类型</span>
                <div class="mgl100">
                  <select v-model="dogInfo.dogOwner.tDogOwnerCard.cardType" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :disabled="disabled">
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
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model.trim="dogInfo.dogOwner.tDogOwnerCard.cardNum" :disabled="disabled">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">现住区县</span>
                <div class="mgl100">
                  <select id="district" @change="obtainDistrict" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :disabled="disabled">
                    <option value="ddd">请选择</option>
                    <option v-for="item in disTrictList" v-bind:value="item.districtId">{{item.districtName}}</option>
                  </select>
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">所属街道</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model.trim="dogInfo.dogOwner.community" :disabled="disabled">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww100 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">详细地址</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model.trim="dogInfo.dogOwner.address" :disabled="disabled">
                </div>
              </div>
            </div>
          </div>
          <!---->
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">犬名</span>
              <div class="mgl100">
                <input v-if="dog&&dog.dogName" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dog.dogName" :disabled="true">
                <input v-else type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model.trim="dogInfo.dogName" :disabled="disabled">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w100 fl h40 lh40 cor0 pdl30">毛色<b style="color: red">&nbsp;*</b></span>
              <div class="mgl100">
                <input v-if="dog&&dog.colour" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dog.colour" :disabled="true">
                <select v-else id="color" @change="obtainColor" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :disabled="disabled">
                  <option>请选择</option>
                  <option v-for="item in colorList" v-bind:value="item.dictionaryValue">{{item.dictionaryDescribe}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">性别<b style="color: red">&nbsp;*</b></span>
              <div v-if="dog&&dog.dogGender" class="mgl100 h40 lh40">
                <label class="lab2 mgr40"><input v-model="dog.dogGender" type="radio" name="abcd" value="0"><i></i>雄</label>
                <label class="lab2"><input type="radio" v-model="dog.dogGender" name="abcd" value="1"><i></i>雌</label>
              </div>
              <div v-else class="mgl100 h40 lh40" >
                <label class="lab2 mgr40"><input v-model="dogInfo.dogGender" type="radio" name="abcd" value="0"><i></i>雄</label>
                <label class="lab2"><input type="radio" v-model="dogInfo.dogGender" name="abcd" value="1"><i></i>雌</label>
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w100 fl h40 lh40 cor0 pdl30">品种<b style="color: red">&nbsp;*</b></span>
              <div class="mgl100">
                <input v-if="dog&&dog.breed" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dog.breed" :disabled="true">
                <select v-else id="breed" @change="obtainBreed" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :disabled="disabled">
                  <option>请选择</option>
                  <option v-for="item in breedList" v-bind:value="item.dictionaryValue">{{item.dictionaryDescribe}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">犬龄<b style="color: red">&nbsp;*</b></span>
              <div class="mgl100">
                <input v-if="dog&&dog.dogAge" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dog.dogAge+'岁'" :disabled="true">
                <input v-else type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model.trim="dogInfo.dogAge" placeholder="填写纯数字字符" :disabled="disabled">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w100 fl h40 lh40 cor0 pdl30">免疫证号<b style="color: red">&nbsp;*</b></span>
              <div class="mgl100">
                <input id="immune" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" @change="checkImmune" v-model="dogInfo.dogImmune.immuneCardNum" :disabled="disabled">
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
      <!--............................................................................................-->
      <div class="ovh mgt20">
        <div class="fl cor6 h40 lh40">
          <a class="db fl hov8 corffa472 mgr35 pc9 pdl36" @click="addmShow1">新增</a>
        </div>
      </div>
      <div class="h60 lh60 pdl30 bgf8 fs16 cor0 fb"> 健康状况检查</div>
      <div class="mgt10 k3 t-c">
        <table class="table5" width="100%" border="1">
          <tbody>
          <tr>
            <td class="cor0 h60 bgf1">检查时间</td>
            <td class="cor0 h60 bgf1">皮温</td>
            <td class="cor0 h60 bgf1">肛温</td>
            <td class="cor0 h60 bgf1">脉搏</td>
            <td class="cor0 h60 bgf1">呼吸</td>
            <td class="cor0 h60 bgf1">可视粘膜</td>
            <td class="cor0 h60 bgf1">皮肤</td>
            <td class="cor0 h60 bgf1">体重</td>
            <!--<td class="cor0 h60 bgf1">检查机构</td>-->
            <td class="cor0 h60 bgf1">兽医</td>
            <td class="cor0 h60 bgf1">备注</td>
          </tr>
          <tr v-for="(item,index) in list1":key="index">
            <td class="cor3" v-if="item.inspectTime">{{item.inspectTime|formatDate(dataFormatPattern)}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="item.skinTemperature">{{item.skinTemperature}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="item.analTemperature">{{item.analTemperature}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="item.pulse">{{item.pulse}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="item.breathe">{{item.breathe}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="item.visibleMucousMembrane">{{item.visibleMucousMembrane}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="item.skin">{{item.skin}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="item.weight">{{item.weight}}</td>
            <td class="cor3" v-else>···</td>
            <!--<td class="cor3" v-if="item.inspectOrg">{{item.inspectOrg}}</td>-->
            <!--<td class="cor3" v-else>···</td>-->
            <td class="cor3" v-if="doctorName">{{doctorName}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="item.remark" style="width: 25%;word-wrap：break-word;">{{item.remark}}</td>
            <td class="cor3" v-else>···</td>
          </tr>
          </tbody>
        </table>
        <!--分页-->
        <!--<page-vue :page-data="pageDate" @chekdpageCallcak="chekdPage"></page-vue>-->
        <!--分页-->
      </div>
      <div class="ovh mgt20">
        <div class="fl cor6 h40 lh40">
          <a class="db fl hov8 corffa472 mgr35 pc9 pdl36" @click="addmShow">新增</a>
        </div>
      </div>
      <div class="h60 lh60 pdl30 bgf8 fs16 cor0 fb">免疫记录</div>
      <div class="mgt10 k3 t-c">
        <table class="table5" width="100%" border="1">
          <tbody>
          <tr>
            <td class="cor0 h60 bgf1">免疫时间</td>
            <td class="cor0 h60 bgf1">免疫项目</td>
            <td class="cor0 h60 bgf1">疫苗厂家及批号</td>
            <td class="cor0 h60 bgf1">下次免疫时间</td>
            <td class="cor0 h60 bgf1">接种兽医</td>
            <td class="cor0 h60 bgf1">备注</td>
          </tr>
          <tr v-for="(item,index) in list":key="index">
            <td class="cor3" v-if="item.cardDateStart">{{item.cardDateStart|formatDate(dataFormatPattern)}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="doctorName">{{doctorName}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="item.vaccine_producer">{{item.vaccine_producer}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="item.next_injection_date">{{item.next_injection_date|formatDate(dataFormatPattern)}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="doctorName">{{doctorName}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="item.remarks" style="width: 25%;word-wrap：break-word;">{{item.remarks}}</td>
            <td class="cor3" v-else>···</td>
          </tr>
          </tbody>
        </table>
        <!--分页-->
        <!--<page-vue :page-data="pageDate" @chekdpageCallcak="chekdPage"></page-vue>-->
        <!--分页-->
      </div>
      <div class="t-c mgt40 mgb50">
        <router-link style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" :to="{name:'hospital_ImmuneList'}">返回</router-link>
        <!--<a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort">打印</a>-->
      </div>
    </div>
    <!--内容区END-->
    <!--弹窗   说明。.db--显示，.dn--隐藏-->
    <div class="T db Tm" style="display: none;z-index: 2;margin-top: 50px">
      <div class="tan6 abs bgw k3 db" style="height: 640px">
        <div class="h60 lh60 pdl30 bgf8 fs16 cor0 fb" style="margin-bottom: 50px;">新增免疫信息</div>
        <div class="ovh">
          <div class="mgt10 ww50 fl" >
            <span class="db w90 fl h40 lh20 cor0 pdl30">免疫时间</span>
            <div class="mgl100">
              <el-date-picker  v-model="addImm.cardDateStart" disabled name="startTime" type="date" placeholder="选择日期" class="wd100b"
                               format="yyyy年MM月dd日">
              </el-date-picker>
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">免疫项目</span>
            <div class="mgl90">
              <input type="text"style="width: 95%" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="addImm.vaccine_name">
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh20 cor0 pdl30">疫苗厂家<br>及批号</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="addImm.vaccine_producer">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">接种兽医</span>
            <div class="mgl90">
              <input type="text"style="width: 95%" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="doctorName" disabled>
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w90 fl h40 lh20 cor0 pdl30">下次免疫时间</span>
            <div class="mgl100">
              <el-date-picker  v-model="addImm.next_injection_date" name="startTime" type="date" placeholder="选择日期" class="wd100b"
                               format="yyyy年MM月dd日">
              </el-date-picker>
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">备注信息</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="addImm.remarks">
            </div>
          </div>
        </div>
        <div class="t-c mgt40 mgb50">
          <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="addImmunizationRecord">确定</a>
          <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8" @click="tableCancel">取消</a>
        </div>
      </div>
    </div>
    <!--弹窗END-->
    <!--弹窗2   说明。.db--显示，.dn--隐藏-->
    <div class="T db Tw" style="display: none;z-index: 2;margin-top: 50px">
      <div class="tan6 abs bgw k3 db" style="height: 640px">
        <div class="h60 lh60 pdl30 bgf8 fs16 cor0 fb" style="margin-bottom: 50px;">健康状况检查</div>
        <div class="ovh">
          <div class="mgt10 ww50 fl" >
            <span class="db w90 fl h40 lh20 cor0 pdl30">检查时间</span>
            <div class="mgl100">
              <el-date-picker  v-model="healthConditionDO.inspectTime" disabled name="startTime" type="date" placeholder="选择日期" class="wd100b"
                               format="yyyy年MM月dd日">
              </el-date-picker>
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">皮温</span>
            <div class="mgl90">
              <input type="text"style="width: 95%" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="healthConditionDO.skinTemperature">
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh20 cor0 pdl30">肛温</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="healthConditionDO.analTemperature">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">脉搏</span>
            <div class="mgl90">
              <input type="text"style="width: 95%" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="healthConditionDO.pulse">
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh20 cor0 pdl30">呼吸</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="healthConditionDO.breathe">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">可视粘膜</span>
            <div class="mgl90">
              <input type="text"style="width: 95%" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="healthConditionDO.visibleMucousMembrane">
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh20 cor0 pdl30">皮肤</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="healthConditionDO.skin">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">体重</span>
            <div class="mgl90">
              <input type="text"style="width: 95%" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="healthConditionDO.weight">
            </div>
          </div>
        </div>
        <div class="ovh">
          <!--<div class="mgt10 ww50 fl">-->
            <!--<span class="db w100 fl h40 lh20 cor0 pdl30">检查机构</span>-->
            <!--<div class="mgl100">-->
              <!--<input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="inspectOrg" disabled>-->
            <!--</div>-->
          <!--</div>-->
          <div class="mgt10 ww50 fl">
            <span class="db w90 fl h40 lh40 cor0 pdl30">兽医</span>
            <div class="mgl90">
              <input type="text"style="width: 95%" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="doctorName" disabled>
            </div>
          </div>
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">备注信息</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="healthConditionDO.remark">
            </div>
          </div>
        </div>
        <div class="t-c mgt40 mgb50">
          <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="addHealthCheck">确定</a>
          <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8" @click="tableCancel1">取消</a>
        </div>
      </div>
    </div>
    <!--弹窗2END-->
  </div>
</template>

<script>
  import $ from 'jquery'
  import config from '../../common/config'
  let _this=null
  export default {
        name: "dogManagerImmuneAddXin",
    data() {
      return {
        flag:true,
        disabled:false,
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
                cardType:0,//证件类型
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
        },
        list:[],//免疫记录集合
        list1:[],//健康状况记录集合
        addImm:{
          cardDateStart:new Date()
          ,vaccine_name:''
          ,vaccine_producer:''
          ,operator_id:''
          ,next_injection_date:''
          ,remarks:''
        },
        doctorName:null,
        dogIdAndOwnerId:null,
        healthConditionDO:{
        dogId:null,
        inspectTime:new Date(),//检查时间
        skin:null,//皮肤
        analTemperature:null,//肛温
        pulse:null,//脉搏
        breathe:null,//呼吸
        visibleMucousMembrane:null,//可视粘膜
        skinTemperature:null,//皮温
        weight:null,//体重
        inspectOrg:null,//检查机构
        operator:null,//操作人
        remark:null,//备注
        createTime:null,//创建时间
        status:null,////状态1有效2无效
        expirationTime:null,//过期时间
        nextInspectTime:null//下次检查时间
        },
        inspectOrg:null,//检查机构
        operator:null,//操作人
      }
    },


    created() {
      _this=this
      initSelectOption(this);
      this.dogInfo.dogImmune.lssuerId=config.userInfo.userId
      this.dogInfo.dogImmune.lssueOrgId=config.userInfo.organizationId
      this.doctorName=config.userInfo.name
      // inspectOrg:null,//检查机构
      this.operator=config.userInfo.name//操作人
    },
    watch: {
      formData() {
        console.log(this.dogInfo)
      },
    },
    methods:{
      save(){

        this.dogInfo.dogImmune.lssuerId=config.userInfo.userId;
        this.dogInfo.dogImmune.lssueOrgId=config.userInfo.organizationId;
        console.log("fff444");
        console.log(this.dogInfo);
        let alertMsg = '录入信息有误！';
        let flag = true;
        if(!this.dogInfo.dogImmune.immuneCardNum){
          // alertMsg='免疫证号必须填写!'
          flag = false;
          this.$alert('免疫证号必须填写!');
        }
        if (this.dogInfo.dogAge!=null && this.dogInfo.dogAge!="") {
          if(!/^[0-9]*$/.test(this.dogInfo.dogAge) ){
            // alertMsg = "年龄需填纯数字字符！";
            flag = false;
            this.$alert("年龄需填纯数字字符！");
          }
        }
        if (this.dogInfo.dogId==null) {
          if(!this.dogInfo.dogBreedType){
            // alertMsg='犬只品种必须选择'
            flag = false;
            this.$alert('犬只品种必须选择');
          }
        }
        if(!this.dogInfo.dogGender){
          // alertMsg='犬性别必须填写'
          flag = false;
          this.$alert('犬性别必须填写');
        }
        if(!this.dogInfo.dogColorType){
          // alertMsg='犬只毛色必须选择'
          flag = false;
          this.$alert('犬只毛色必须选择');
        }
        // if(!this.dogInfo.dogName){
        //   // alertMsg='犬名必须填写'
        //   flag = false;
        //   this.$alert('犬名必须填写');
        // }
        // if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(this.dogInfo.dogOwner.tDogOwnerCard.cardNum) ){
        //   // alertMsg = "电话号码格式有误！";
        //   flag = false;
        //   this.$alert("犬主证件号码格式有误！");
        // }
        // if(!this.dogInfo.dogOwner.tDogOwnerCard.cardNum){
        //   // alertMsg='犬主证件号码必须填写'
        //   flag = false;
        //   this.$alert('犬主证件号码必须填写');
        // }
        // if(this.dogInfo.dogOwner.tDogOwnerCard.cardType != 0 && this.dogInfo.dogOwner.tDogOwnerCard.cardType != 1 && this.dogInfo.dogOwner.tDogOwnerCard.cardType != 2 && this.dogInfo.dogOwner.tDogOwnerCard.cardType != 3){
        //   // alertMsg='犬主证件类型必须选择!'
        //   flag = false;
        //   this.$alert('犬主证件类型必须选择!');
        // }
        if(!this.dogInfo.dogOwner.dogOwnerName){
          // alertMsg='犬主姓名必须填写'
          flag = false;
          this.$alert('犬主姓名必须填写');
        }
        if(!/^1[34578]\d{9}$/.test(this.dogInfo.dogOwner.dogOwnerPhone) ){
          // alertMsg = "电话号码格式有误！";
          flag = false;
          this.$alert("电话号码格式有误！");
        }
        if(!this.dogInfo.dogOwner.dogOwnerPhone){
          // alertMsg = "电话号码未填！";
          flag = false;
          this.$alert("电话号码未填！");
        }
        // if(!this.dogInfo.dogOwner.eMail || !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.dogInfo.dogOwner.eMail) ){
        //   alertMsg = "邮箱格式有误！";
        //   flag = false
        // }

        // if(!this.dogInfo.dogOwner.sex){
        //   alertMsg='犬主性别必须选择'
        //   flag = false
        // }

        // if (!flag) {
        //   this.$alert(alertMsg);
        // }
        console.log(this.dogInfo.dogOwner.districtId)
        if(flag){
          const  loadind =  this.$loading({
            lock: true,
            text: '加载中，请稍等！！！',
          });
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
            loadind.close();
            if(res.data.code=="000000" && res.data.result!=""  && res.data.result!=null && res.data.result.isRepeat!=1){
              this.Id=res.data.result.dogId;
              this.dogIdAndOwnerId=res.data.result;
              this.flag = false; //移除save按钮点击事件
              this.disabled = true; //保存成功后禁用input按钮
              this.$refs.imgup.upload({type:2,id:res.data.result.dogId,string:'犬只正面照'});//犬只正面图片上传
              this.$refs.imgup1.upload({type:10,id:res.data.result.dogId,string:'犬只侧面照'});//犬只侧面图片上传
              this.$alert("录入成功!","添加提示").then(_=>{
              })
            }else if (res.data.result.isRepeat==1) {
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
      },
      //新增免疫记录
      addImmunizationRecord(){
        if (this.dogIdAndOwnerId==null) {
          this.$alert("请先保存基本信息！");
          return
        }else if (this.dogIdAndOwnerId.dogOwnerId==null && this.dogIdAndOwnerId.dogId==null) {
          this.$alert("请先保存基本信息！");
          return
        }
        add(_this)
      },
      //新增健康检查记录
      addHealthCheck(){
        if (this.dogIdAndOwnerId==null) {
          this.$alert("请先保存基本信息！");
          return
        }else if (this.dogIdAndOwnerId.dogOwnerId==null && this.dogIdAndOwnerId.dogId==null) {
          this.$alert("请先保存基本信息！");
          return
        }
        add1(_this)
      },
      addmShow(){//点击新增事件
        if (this.dogIdAndOwnerId==null) {
          this.$alert("请先保存基本信息！");
        }else if (this.dogIdAndOwnerId.dogOwnerId==null && this.dogIdAndOwnerId.dogId==null) {
          this.$alert("请先保存基本信息！");
        }else {
          $(".Tm").show();
        }
      },
      addmShow1(){//点击新增事件
        if (this.dogIdAndOwnerId==null) {
          this.$alert("请先保存基本信息！");
        }else if (this.dogIdAndOwnerId.dogOwnerId==null && this.dogIdAndOwnerId.dogId==null) {
          this.$alert("请先保存基本信息！");
        }else {
          $(".Tw").show();
        }
      },
      tableCancel(){//点击取消（关闭新增免疫记录）事件
        $(".Tm").hide();
      },
      tableCancel1(){//点击取消（关闭新增健康）事件
        $(".Tw").hide();
      }
    },
    computed: {
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

  //新增免疫记录
  function add(_this){
    let immuneRegister={
      vaccineRegister:{//免疫登记
        dogId:_this.dogIdAndOwnerId.dogId,
        orgId:config.userInfo.organizationId,
        injectionType:0
      },
      vaccineInjection:{//免疫记录
        vacOrg:config.userInfo.organizationId,//机构id
        factInjectionDate:_this.addImm.cardDateStart,//实际注射时间,
        vaccineName:_this.addImm.vaccine_name,//免疫项目
        vaccineProducer:_this.addImm.vaccine_producer,//厂家及编号
        operatorId:config.userInfo.userId,//注射人id
        nextInjectionDate:_this.addImm.next_injection_date,//下次注射时间
        remarks:_this.addImm.remarks//备注
      }
    }
    try{
      // let tVaccine={};
      // tVaccine.vaccine_register_id=_this.$route.params.VIId//免疫登记id
      // tVaccine.operator_id=conf.userInfo.userId//注射人id
      // tVaccine.remarks=_this.addImm.remarks//备注
      // tVaccine.vaccine_name= _this.addImm.vaccine_name//免疫项目
      // tVaccine.vaccine_producer=_this.addImm.vaccine_producer//厂家及编号
      // tVaccine.fact_injection_date=_this.addImm.cardDateStart//实际注射时间
      // tVaccine.next_injection_date=_this.addImm.next_injection_date//下次注射时间

      // if(tVaccine.fact_injection_date==null||tVaccine.fact_injection_date==''){
      //   _this.$message("请输入免疫时间")
      //   return
      // }
      if(immuneRegister.vaccineInjection.vaccineName==null||immuneRegister.vaccineInjection.vaccineName==''){
        _this.$message("请输入免疫项目")
        return
      }
      if(immuneRegister.vaccineInjection.nextInjectionDate!=null&&immuneRegister.vaccineInjection.nextInjectionDate!=''&&immuneRegister.vaccineInjection.nextInjectionDate<immuneRegister.vaccineInjection.factInjectionDate){
        _this.$message("下次免疫时间不能小于免疫时间")
        return
      }
      if(immuneRegister.vaccineInjection.nextInjectionDate!=null&&immuneRegister.vaccineInjection.nextInjectionDate!=''){
        immuneRegister.vaccineInjection.nextInjectionDate=immuneRegister.vaccineInjection.nextInjectionDate.getFullYear() + '-' + (immuneRegister.vaccineInjection.nextInjectionDate.getMonth() + 1) + '-' + immuneRegister.vaccineInjection.nextInjectionDate.getDate();
      }
      _this.$axios({
        method:'post',
        headers:{
          'Content-Type': 'application/json;charset=UTF-8'  //这里加上头部信息
        },
        url: '/biz/dogInfo/saveImmuneRecord',
        data:JSON.stringify(immuneRegister)
      }).then((res) => {
        if(res.data.status==200 && res.data.msg=="OK"){
          _this.$alert("添加成功！")
          let listt=[]
          let object={
            cardDateStart:new Date(),
            vaccine_name:_this.addImm.vaccine_name,
            vaccine_producer:_this.addImm.vaccine_producer,
            operator_id:'',
            next_injection_date: _this.addImm.next_injection_date,
            remarks:_this.addImm.remarks
          }
          if (_this.list.length>0) {
            for (var i=0;i<_this.list.length;i++) {
              listt.push(_this.list[i])
            }
          }
          listt.push(object)
          _this.list=listt
          $(".Tm").hide()
          _this.addImm.vaccine_name=null
          _this.addImm.vaccine_producer=null
          _this.addImm.operator_id=null
          _this.addImm.next_injection_date=null
          _this.addImm.remarks=null

        }else {
          _this.$alert("添加失败！")
        }
      }).catch((res)=>{
        _this.$alert("添加失败！")
        console.log(res.message)
      });
    } catch (e) {
      _this.$message("信息不完整，请重新选择！")
    } finally {
    }
  }

  //新增健康记录
  function add1(_this){
    _this.healthConditionDO.dogId=_this.dogIdAndOwnerId.dogId
    _this.healthConditionDO.inspectOrg=config.userInfo.organizationId
    _this.healthConditionDO.inspectOrg=config.userInfo.userId
    _this.healthConditionDO.inspectOrg=1
    try{
      // if(immuneRegister.vaccineInjection.vaccineName==null||immuneRegister.vaccineInjection.vaccineName==''){
      //   _this.$message("请输入免疫项目")
      //   return
      // }
      // if(immuneRegister.vaccineInjection.nextInjectionDate!=null&&immuneRegister.vaccineInjection.nextInjectionDate!=''&&immuneRegister.vaccineInjection.nextInjectionDate<immuneRegister.vaccineInjection.factInjectionDate){
      //   _this.$message("下次免疫时间不能小于免疫时间")
      //   return
      // }
      // if(immuneRegister.vaccineInjection.nextInjectionDate!=null&&immuneRegister.vaccineInjection.nextInjectionDate!=''){
      //   immuneRegister.vaccineInjection.nextInjectionDate=immuneRegister.vaccineInjection.nextInjectionDate.getFullYear() + '-' + (immuneRegister.vaccineInjection.nextInjectionDate.getMonth() + 1) + '-' + immuneRegister.vaccineInjection.nextInjectionDate.getDate();
      // }
      _this.$axios({
        method:'post',
        headers:{
          'Content-Type': 'application/json;charset=UTF-8'  //这里加上头部信息
        },
        url: '/biz/dogInfo/saveHealthCondition',
        data:JSON.stringify(_this.healthConditionDO)
      }).then((res) => {
        console.log(6666)
        console.log(res.data)
        if(res.data.status==200 && res.data.msg=="OK"){
          _this.$alert("添加成功！")
          let listt=[]
          let object={
            dogId:_this.dogIdAndOwnerId.dogId,
            inspectTime:_this.healthConditionDO.inspectTime,//检查时间
            skin:_this.healthConditionDO.skin,//皮肤
            analTemperature:_this.healthConditionDO.analTemperature,//肛温
            pulse:_this.healthConditionDO.pulse,//脉搏
            breathe:_this.healthConditionDO.breathe,//呼吸
            visibleMucousMembrane:_this.healthConditionDO.visibleMucousMembrane,//可视粘膜
            skinTemperature:_this.healthConditionDO.skinTemperature,//皮温
            weight:_this.healthConditionDO.weight,//体重
            inspectOrg:_this.healthConditionDO.inspectOrg,//检查机构
            operator:_this.healthConditionDO.operator,//操作人
            remark:_this.healthConditionDO.remark,//备注
            createTime:_this.healthConditionDO.createTime,//创建时间
            status:_this.healthConditionDO.status,//状态1有效2无效
            expirationTime:null,//过期时间
            nextInspectTime:null//下次检查时间
          }
          if (_this.list1.length>0) {
            for (var i=0;i<_this.list1.length;i++) {
              listt.push(_this.list1[i])
            }
          }
          listt.push(object)
          _this.list1=listt
          $(".Tw").hide()
          _this.healthConditionDO={
              dogId:null,
              inspectTime:null,//检查时间
              skin:null,//皮肤
              analTemperature:null,//肛温
              pulse:null,//脉搏
              breathe:null,//呼吸
              visibleMucousMembrane:null,//可视粘膜
              skinTemperature:null,//皮温
              weight:null,//体重
              inspectOrg:null,//检查机构
              operator:null,//操作人
              remark:null,//备注
              createTime:null,//创建时间
              status:null,//状态1有效2无效
              expirationTime:null,//过期时间
              nextInspectTime:null//下次检查时间
          }
        }else {
          _this.$alert("添加失败！")
        }
      }).catch((res)=>{
        _this.$alert("添加失败！")
        console.log(res.message)
      });
    } catch (e) {
      _this.$message("信息不完整，请重新选择！")
    } finally {
    }
  }
</script>

<style scoped>
  .table5 td{
    text-align: center;
  }
</style>
