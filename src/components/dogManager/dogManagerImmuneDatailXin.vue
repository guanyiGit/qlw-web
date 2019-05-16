<template>
  <!--查看免疫证详情-->
  <div>
    <!--内容区-->
    <div class="w980 fr">
      <div class="mbx">
        <ul class="ul11 clearfix">
          <li><router-link style="cursor:pointer;" :to="{name:'hospital_ImmuneList'}">免疫登记></router-link></li>
          <li>免疫登记详情</li>
        </ul>
      </div>
      <div class="mgt15 k3">
        <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">
          基本信息
          <!--<span style="margin-left: 80%;"><a id="xg" style="color: #fbad82;cursor:pointer;" @click="update">修改</a><a id="bcxg" style="color: #fbad82;cursor:pointer;display: none" @click="saveUpdate">保存修改</a></span>-->
        </div>
        <div class="pdb20 pdr30 ovh">
          <div class="w950 pdt10">
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">犬主姓名</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" :value="dogInfos.dogOwner?dogInfos.dogOwner.dogOwnerName?dogInfos.dogOwner.dogOwnerName:'':''" :disabled="isDisabled">
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">联系电话</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" :value="dogInfos.dogOwner?dogInfos.dogOwner.dogOwnerPhone?dogInfos.dogOwner.dogOwnerPhone:'':''" :disabled="isDisabled" @change="phonee">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">证件类型</span>
                <div class="mgl100">
                  <input v-if="dogInfos.dogOwner&&dogInfos.dogOwner.tDogOwnerCard" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwner.tDogOwnerCard.cardType==0?'身份证':dogInfos.dogOwner.tDogOwnerCard.cardType==1?'护照':dogInfos.dogOwner.tDogOwnerCard.cardType==2?'社保卡':'其他'" :disabled="isDisabled">
                  <input v-else type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :disabled="isDisabled">
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">证件号码</span>
                <div class="mgl100">
                  <input v-if="dogInfos.dogOwner&&dogInfos.dogOwner.tDogOwnerCard" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" :value="dogInfos.dogOwner.tDogOwnerCard.cardNum" :disabled="isDisabled">
                  <input v-else type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :disabled="isDisabled">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">现住区县</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 gq" :value="dogInfos.dogOwner?dogInfos.dogOwner.tDistrict?dogInfos.dogOwner.tDistrict.districtName:'':''" :disabled="isDisabled">
                  <select id="district" v-model="quxian" @change="obtainDistrict" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 gh" style="display: none">
                    <option>请选择</option>
                    <option v-for="item in disTrictList" v-bind:value="item.districtId">{{item.districtName}}</option>
                  </select>
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">所属街道</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" :value="dogInfos.dogOwner?dogInfos.dogOwner.community?dogInfos.dogOwner.community:'':''" :disabled="isDisabled">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww100 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">详细地址</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" :value="dogInfos.dogOwner?dogInfos.dogOwner.address?dogInfos.dogOwner.address:'':''" :disabled="isDisabled">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">犬名</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" :value="dogInfos.dogName" :disabled="isDisabled">
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">品种</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 gq" :value="dogInfos.dogBreedDictionary?dogInfos.dogBreedDictionary.dictionaryDescribe:''" :disabled="isDisabled">
                  <select id="breed" v-model="pinzhong" @change="obtainBreed" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 gh" style="display: none">
                    <option>请选择</option>
                    <option v-for="item in breedList" v-bind:value="item.dictionaryValue">{{item.dictionaryDescribe}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">性别</span>
                <div class="mgl100 h40 lh40">
                  <!--<input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogGender==0?'雄':'雌'" :disabled="isDisabled">-->
                  <label class="lab2 mgr40"><input v-model="dogInfos.dogGender" type="radio" name="abcd" value="0"><i></i>雄</label>
                  <label class="lab2"><input type="radio" v-model="dogInfos.dogGender" name="abcd" value="1"><i></i>雌</label>
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">犬龄(岁)</span>
                <div class="mgl100">
                  <input v-if="dogInfos&&dogInfos.dogAge" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" :value="dogInfos.dogAge" :disabled="isDisabled">
                  <input v-else type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" :disabled="isDisabled" placeholder="填写纯数字字符">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">毛色</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 gq" :value="dogInfos.dogColorDictionary?dogInfos.dogColorDictionary.dictionaryDescribe:''" :disabled="isDisabled">
                  <select id="color" v-model="maose" @change="obtainColor" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 gh" style="display: none">
                    <option>请选择</option>
                    <option v-for="item in colorList" v-bind:value="item.dictionaryValue">{{item.dictionaryDescribe}}</option>
                  </select>
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">免疫证号</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 iup" :value="dogInfos.dogImmune?dogInfos.dogImmune.immuneCardNum?dogInfos.dogImmune.immuneCardNum:'':''" :disabled="isDisabled">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">办理时间</span>
                <div class="mgl100">
                  <el-date-picker :value="dogInfos.dogImmune?dogInfos.dogImmune.lssueTime?dogInfos.dogImmune.lssueTime:'':''" type="date" class="ww100 h40 lh40 borf1 ras4 dataSelect iup"
                                  placeholder="" :format="datePattern" :disabled="true"></el-date-picker>
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">办理机构</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogImmune?dogInfos.dogImmune.tOrganization?dogInfos.dogImmune.tOrganization.organizationName:'':''" :disabled="isDisabled">
                </div>
              </div>
            </div>
            <div class="mgt20">
              <span class="db w100 fl h40 lh40 pdl30 cor0">照片</span>
              <div class="mgl100 ovh">
                <ul class="ovh fl ul10 h180 ww100 borbfc695" v-if="dogInfos&&dogInfos.imageList.length>0">
                  <li v-for="(item,index) in dogInfos.imageList" :key="index" class="fl">
                    <img class="img" :src="item.thumbnailUrl" v-if="index<3" alt="" @click="showBigImg(item.imageUrl)">
                  </li>
                </ul>
                <div class="file fl rel ww100 h160 borbfc695" v-else>
                  <input class="abs z10 w202 h160 left0 top0">
                  <!--<img class="rel z1" src="../../../static/images/28-8.png">-->
                  <p class="abs cor9 ww100 z8 left0 top90 t-c" style="z-index: 2">无照片</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ovh mgt20">
        <div class="fl cor6 h40 lh40">
          <a class="db fl hov8 corffa472 mgr35 pc9 pdl36" @click="check1">新增</a>
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
            <td class="cor0 h60 bgf1">检查机构</td>
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
            <td v-if="item.orgName">{{item.orgName}}</td><td v-else>...</td>
            <td v-if="item.userName">{{item.userName}}</td><td v-else>...</td>
            <td v-if="item.remark">{{item.remark}}</td><td v-else>...</td>
          </tr>
          </tbody>
        </table>
        <!--分页-->
        <!--<page-vue :page-data="pageDate" @chekdpageCallcak="chekdPage"></page-vue>-->
        <!--分页-->
      </div>
      <div class="ovh mgt20">
        <div class="fl cor6 h40 lh40">
          <a class="db fl hov8 corffa472 mgr35 pc9 pdl36" @click="check">新增</a>
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
            <td class="cor0 h60 bgf1">免疫机构</td>
            <td class="cor0 h60 bgf1">接种兽医</td>
            <td class="cor0 h60 bgf1">备注</td>
          </tr>
          <tr v-for="(item,index) in list":key="index">
            <td class="cor3" v-if="item.fact_injection_date">{{item.fact_injection_date|formatDate(dataFormatPattern)}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="item.vaccine_name">{{item.vaccine_name}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="item.vaccine_producer">{{item.vaccine_producer}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="item.next_injection_date">{{item.next_injection_date|formatDate(dataFormatPattern)}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="item.organization_name">{{item.organization_name}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="item.name">{{item.name}}</td>
            <td class="cor3" v-else>···</td>
            <td class="cor3" v-if="item.remarks" style="width: 25%;">{{item.remarks}}</td>
            <td class="cor3" v-else>···</td>
          </tr>

          </tbody>
        </table>
        <!--&lt;!&ndash;分页&ndash;&gt;-->
        <!--<page-vue :page-data="pageDate" @chekdpageCallcak="chekdPage"></page-vue>-->
        <!--&lt;!&ndash;分页&ndash;&gt;-->
      </div>
      <div class="t-c mgt40 mgb50">
        <a v-if="orgIdd==dogInfos.ownerOrgId" href="javascript:"class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8"
           @click="printImms()">&nbsp;打印免疫登记卡</a>
        <!--<a class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8">打印</a>-->
        <router-link class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8" style="cursor:pointer;" :to="{name:'hospital_ImmuneList'}">返回</router-link>
      </div>
      <!--打印-->
      <!--<div id="printimm">-->
      <div id="printimm" style="display: none">
        <div style="width: 1100px;margin-left: -50px">
          <div style="width: 100%;text-align: center;">
            <p style="padding-top: 20px;padding-bottom: 20px;font-size: 30px;font-family: '宋体';color: #000000"><b><strong>犬免疫登记卡</strong></b></p>
          </div>
          <div style="width: 100%;font-family: '宋体';font-size: 20px;">
            <div style="width: 80%;margin-left: 10%;border: 1px solid;">
              <table class="immtable10 t-c" width="100%" border="1" style="border: #000000 1px solid;color: #000000">
                <tbody>
                <tr>
                  <td style="width: 23%">犬主姓名</td>
                  <td class="" style="width: 23%"v-if="dogInfos.dogOwner&&dogInfos.dogOwner.dogOwnerName">{{dogInfos.dogOwner.dogOwnerName}}</td>
                  <td class="" style="width: 23%"v-else>···</td>
                  <td style="width: 23%">联系电话</td>
                  <td class="" style="width: 23%"v-if="dogInfos.dogOwner&&dogInfos.dogOwner.dogOwnerPhone">{{dogInfos.dogOwner.dogOwnerPhone}}</td>
                  <td class="" style="width: 23%"v-else>···</td>
                </tr>
                <tr>
                  <td>详细地址</td>
                  <td class="" v-if="dogInfos.dogOwner&&dogInfos.dogOwner.address" colspan="3">{{dogInfos.dogOwner.address}}</td>
                  <td class="" v-else colspan="3">···</td>
                </tr>
                <tr>
                  <td>身份证号</td>
                  <td class="" v-if="idCardNum" colspan="3">{{idCardNum}}</td>
                  <td class="" v-else colspan="3">···</td>
                </tr>
                <tr>
                  <td>犬只称呼名</td>
                  <td class="" v-if="dogInfos&&dogInfos.dogName">{{dogInfos.dogName}}</td>
                  <td class="" v-else>···</td>
                  <td>犬只类别、品种</td>
                  <td class="" v-if="dogInfos.dogBreedDictionary&&dogInfos.dogBreedDictionary.dictionaryDescribe">
                    {{dogInfos.dogBreedDictionary.dictionaryDescribe}}</td>
                  <td class="" v-else>···</td>
                </tr>
                <tr>
                  <td>特征与毛色</td>
                  <td class="" v-if="dogInfos.dogBreedDictionary&&dogInfos.dogBreedDictionary.dictionaryDescribe">
                    {{dogInfos.dogBreedDictionary.dictionaryDescribe}}</td>
                  <td class="" v-else>···</td>
                  <td>性别</td>
                  <td class="">{{dogInfos.dogGender==0?'雄':'雌'}}</td>
                  <!--<td class="cor9" v-else>···</td>-->
                </tr>
                <tr>
                  <td>年龄</td>
                  <td class="" v-if="dogInfos.dogAge">{{dogInfos.dogAge}}</td>
                  <td class="" v-else>···</td>
                  <td>免疫证号</td>
                  <td class="" v-if="dogInfos.dogImmune&&dogInfos.dogImmune.immuneCardNum">{{dogInfos.dogImmune.immuneCardNum}}</td>
                  <td class="" v-else>···</td>
                </tr>
                </tbody>
              </table>
              <table class="immtable10 t-c" width="100%" border="1">
                <tbody>
                <tr>
                  <td colspan="11" style="border-top: #000000 1px solid;border-bottom: #000000 1px solid">健康状况检查</td>
                </tr>
                <tr>
                  <td style="width: 12%">检查日期</td>
                  <td style="width: 8%">皮温</td>
                  <td style="width: 8%">肛温</td>
                  <td style="width: 8%">脉搏</td>
                  <td style="width: 9%">呼吸</td>
                  <td style="width: 9%">可视粘膜</td>
                  <td style="width: 9%">皮肤</td>
                  <td style="width: 9%">体重</td>
                  <td style="width: 9%">检查机构</td>
                  <td style="width: 9%">兽医</td>
                  <td style="width: 9%">备注</td>
                </tr>
                <tr v-for="(item,index) in list1">
                  <td v-if="item.inspectTime">{{item.inspectTime|formatDate(dataFormatPattern)}}</td><td v-else>...</td>
                  <td v-if="item.skinTemperature">{{item.skinTemperature}}</td><td v-else>...</td>
                  <td v-if="item.analTemperature">{{item.analTemperature}}</td><td v-else>...</td>
                  <td v-if="item.pulse">{{item.pulse}}</td><td v-else>...</td>
                  <td v-if="item.breathe">{{item.breathe}}</td><td v-else>...</td>
                  <td v-if="item.visibleMucousMembrane">{{item.visibleMucousMembrane}}</td><td v-else>...</td>
                  <td v-if="item.skin">{{item.skin}}</td><td v-else>...</td>
                  <td v-if="item.weight">{{item.weight}}</td><td v-else>...</td>
                  <td v-if="item.orgName">{{item.orgName}}</td><td v-else>...</td>
                  <td v-if="item.userName">{{item.userName}}</td><td v-else>...</td>
                  <td v-if="item.remark">{{item.remark}}</td><td v-else>...</td>
                </tr>
                </tbody>
              </table>
              <table class="immtable10 t-c" width="100%" border="1">
                <tbody>
                <tr>
                  <td colspan="7" style="border-top: #000000 1px solid;border-bottom: #000000 1px solid">免疫记录</td>
                </tr>
                <tr>
                  <td style="width: 14%">免疫日期</td>
                  <td style="width: 14%">免疫项目</td>
                  <td style="width: 14%">疫苗厂家及批号</td>
                  <td style="width: 14%">下次免疫时间</td>
                  <td style="width: 14%">兽医</td>
                  <td style="width: 14%">免疫机构</td>
                  <td style="width: 14%">备注</td>
                </tr>
                <tr v-for="(item,index) in list":key="index">
                  <td class="" v-if="item.fact_injection_date">{{item.fact_injection_date|formatDate(dataFormatPattern)}}</td>
                  <td class="" v-else>···</td>
                  <td class="" v-if="item.vaccine_name">{{item.vaccine_name}}</td>
                  <td class="" v-else>···</td>
                  <td class="" v-if="item.vaccine_producer">{{item.vaccine_producer}}</td>
                  <td class="" v-else>···</td>
                  <td class="" v-if="item.next_injection_date">{{item.next_injection_date|formatDate(dataFormatPattern)}}</td>
                  <td class="" v-else>···</td>
                  <td class="" v-if="item.name">{{item.name}}</td>
                  <td class="" v-else>···</td>
                  <td class="" v-if="item.organization_name">{{item.organization_name}}</td>
                  <td class="" v-else>···</td>
                  <td class="" v-if="item.remarks" style="width: 25%;word-wrap：break-word;">{{item.remarks}}</td>
                  <td class="" v-else>···</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style="padding-bottom: 20px;padding-top: 10px;font-size: 20px;">
            <div style="margin-left: 10%">
            <span>免疫单位：{{confs&&confs.userInfo&&confs.userInfo.tOrganization&&confs.userInfo.tOrganization.organizationName
              ?confs.userInfo.tOrganization.organizationName:'...'}}</span>
              <span style="margin-left: 45%" v-if="list.length>0&&list[(list.length)-1].fact_injection_date">初始记录日期：{{list[(list.length)-1].fact_injection_date|formatDate(dataFormatPattern)}}</span>
              <span style="margin-left: 50%" v-else>初始记录日期：...</span>
            </div>
          </div>
        </div>
      </div>
      <!--打印-->
    </div>
    <!--内容区END-->
    <!--弹窗   说明。.db--显示，.dn--隐藏-->
    <div class="T db Ti" style="display: none;z-index: 5" @click="imgHide()">
      <div class="tan6 abs" style="height: 500px;width: 500px">
        <img class="imgtan abs" id="imgg" :src="url">
      </div>
    </div>
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
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">备注信息</span>
            <div class="mgl90">
              <input type="text"style="width: 95%" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="addImm.remarks">
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
    <div class="T db Tw" style="display: none;z-index: 5;margin-top: 50px">
      <div class="tan6 abs bgw k3 db" style="height: 640px">
        <div class="h60 lh60 pdl30 bgf8 fs16 cor0 fb" style="margin-bottom: 50px;">新增健康状况检查</div>
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
            <span class="db w100 fl h40 lh20 cor0 pdl30">兽医</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="doctorName" disabled>
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">备注信息</span>
            <div class="mgl90">
              <input type="text" style="width: 95%" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="healthConditionDO.remark">
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
  import  conf from "../../common/config"
  import router from "../../router";
    export default {
        name: "dogManagerImmuneDatailXin",
      data(){
        return {
          url:null,
          dogInfos:{},//犬信息列表
          test:'msg',
          isDisabled:true,//是否禁用输入框
          datePattern:"yyyy年MM月dd日",
          //........................................................
          pageInfo:{//分页
            pageNum:null
            ,pageSize:null
          }
          ,list:{}//免疫记录集合
          ,list1:[]//健康记录集合
          ,dataFormatPattern :'yyyy/MM/dd'
          ,operator_id:conf.userInfo.name
          ,addImm:{
            cardDateStart:new Date()
            ,vaccine_name:''
            ,vaccine_producer:''
            ,operator_id:''
            ,next_injection_date:''
            ,remarks:''
          },
          doctorName:conf.userInfo.name,
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
          disTrictList:[],//区县集合
          breedList:[],
          colorList:[],
          phone:null,
          adress:null,
          name:null,
          idCardNum:null,//身份证号码
          idCardNumx:null//遮罩身份证号码
          ,confs:conf
          ,orgId:this.$route.params.orgId
          ,getPrintImm:{//打印的信息
            dogInfo:{}//登记信息（犬，犬主信息）
            ,Immunelist:[]//免疫记录集合信息
            ,HealthConditionList:[]//健康检查集合
          },
          quxian:null,
          pinzhong:null,
          maose:null,
          orgIdd:conf.userInfo.organizationId
        }
      },
      mounted() {
        console.log(this.$data)
      },
      beforeCreate() {
          console.log("nihao")
          console.log(conf)
        initData(this)
      },
      created(){
        //printImm(this);
        initData1(this);
        initSelectOption(this);
      },
      methods:{
        CalAge:function (date1) {
          if (date1==null || date1==undefined){
            return "";
          }
          var datetime1 = new Date(date1);
          var datetime2 = new Date();
          var year1 = datetime1.getFullYear();
          var year2 = datetime2.getFullYear();
          var age=year2-year1+1;
          return age+"岁";
        },
        showBigImg:function (url) {
          this.url=url
          console.log(this.url)
          $(".Ti").show();
        },
        imgHide:function () {
          $(".Ti").hide();
        },
        check(){//点击新增事件
          $(".Tm").show();
        },
        check1(){//点击新增事件
          $(".Tw").show();
        },
        chekdPage(index){
          this.pageInfo.pageNum=index;
          initData1(this)
        },
        tableCancel(){//点击取消（关闭新增免疫记录）事件
          $(".Tm").hide();
        },
        //新增免疫记录
        addImmunizationRecord(){
          add(this)
        },
        //新增健康检查记录
        addHealthCheck(){
          add1(this)
        },
        tableCancel1(){//点击取消（关闭新增健康）事件
          $(".Tw").hide();
        },
        update:function () {
          $("#xg").hide();
          $("#bcxg").show();
          $(".gq").hide();
          $(".gh").show();
          var b=$('.iup')
          for (var i=0;i<b.length;i++) {
            b[i].removeAttribute('disabled');
          }
          // this.quxian=this.dogInfos.dogOwner.tDistrict.districtName
          // this.pinzhong=this.dogInfos.dogBreedDictionary.dictionaryDescribe
          // this.maose=this.dogInfos.dogColorDictionary.dictionaryDescribe

          // this.disTrictList=dataa.disTrictList
          // this.breedList=dataa.breedList,
          // this.colorList=dataa.colorList
          for (var i=0;i<this.breedList.length;i++) {
            if (this.dogInfos.dogBreedDictionary.dictionaryDescribe==this.breedList[i].dictionaryDescribe) {
              this.pinzhong=this.breedList[i].dictionaryValue
            }
          }
          for (var i=0;i<this.colorList.length;i++) {
            if (this.dogInfos.dogColorDictionary.dictionaryDescribe==this.colorList[i].dictionaryDescribe) {
              this.maose=this.colorList[i].dictionaryValue
            }
          }
          //获取犬只品种
            this.dogInfos.dogBreedType=this.pinzhong;
          //获取毛色
            this.dogInfos.dogColorType=this.maose;
          for (var i=0;i<this.disTrictList.length;i++) {
            if (this.dogInfos.dogOwner.tDistrict.districtName==this.disTrictList[i].districtName) {
              this.quxian=this.disTrictList[i].districtId
            }
          }
          //获取社区
          this.dogInfos.dogOwner.tDistrict.districtId=this.quxian;
        },
        //获取社区
        obtainDistrict:function () {
          this.dogInfos.dogOwner.tDistrict.districtId=$("#district").val();
        },
        //获取犬只品种
        obtainBreed:function () {
          this.dogInfos.dogBreedType=$("#breed").val();
        },
        //获取毛色
        obtainColor:function () {
          this.dogInfos.dogColorType=$("#color").val();
        },
        saveUpdate:function () {
          this.dogInfos.dogId=this.$route.params.dogId
          this.dogInfos.dogOwner.dogOwnerId=this.dogInfos.dogOwnerId
          this.dogInfos.dogImmune.seqId=this.$route.params.seqId

          // this.dogInfos.dogOwner.dogOwnerPhone=this.phone,
          //   this.dogInfos.dogOwner.address=this.adress,
          //   this.dogInfos.dogOwner.dogOwnerName=this.name,
          if (this.dogInfos.dogOwner.tDogOwnerCard.cardNum==this.idCardNumx) {
            this.dogInfos.dogOwner.tDogOwnerCard.cardNum=this.idCardNum//身份证号码
          }
          let alertMsg = '录入信息有误！';
          let flag = true;
          if(!this.dogInfos.dogImmune.immuneCardNum){
            // alertMsg='免疫证号必须填写!'
            flag = false
            this.$alert('免疫证号必须填写!');
          }
          if (this.dogInfos.dogAge!=null && this.dogInfos.dogAge!="") {
            if(!/^[0-9]*$/.test(this.dogInfos.dogAge) ){
              // alertMsg = "年龄需填纯数字字符！";
              flag = false
              this.$alert("年龄需填纯数字字符！");
            }
          }
          if (this.dogInfos.dogId==null) {
            if(!this.dogInfos.dogBreedType){
              // alertMsg='犬只品种必须选择'
              flag = false
              this.$alert('犬只品种必须选择');
            }
          }
          if(this.dogInfos.dogGender==null){
            // alertMsg='犬性别必须填写'
            flag = false
            this.$alert('犬性别必须填写');
          }
          if(this.dogInfos.dogColorType==null || this.dogInfos.dogColorType=="" || this.dogInfos.dogColorType=="请选择"){
            if (this.dogInfos.dogColorType!=0) {
              // alertMsg='犬只毛色必须选择'
              flag = false
              this.$alert('犬只毛色必须选择');
            }
          }
          if(!this.dogInfos.dogName){
            // alertMsg='犬名必须填写'
            flag = false
            this.$alert('犬名必须填写');
          }
          // if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(this.dogInfos.dogOwner.tDogOwnerCard.cardNum) ){
          //   // alertMsg = "电话号码格式有误！";
          //   flag = false
          //   this.$alert("犬主证件号码格式有误！");
          // }
          // if(!this.dogInfos.dogOwner.tDogOwnerCard.cardNum){
          //   // alertMsg='犬主证件号码必须填写'
          //   flag = false
          //   this.$alert('犬主证件号码必须填写');
          // }
          // if(this.dogInfos.dogOwner.tDogOwnerCard.cardType != 0 && this.dogInfos.dogOwner.tDogOwnerCard.cardType != 1 && this.dogInfos.dogOwner.tDogOwnerCard.cardType != 2 && this.dogInfos.dogOwner.tDogOwnerCard.cardType != 3){
          //   // alertMsg='犬主证件类型必须选择!'
          //   flag = false
          //   this.$alert('犬主证件类型必须选择!');
          // }
          if(!this.dogInfos.dogOwner.dogOwnerName){
            // alertMsg='犬主姓名必须填写'
            flag = false
            this.$alert('犬主姓名必须填写');
          }
          if(!/^1[34578]\d{9}$/.test(this.dogInfos.dogOwner.dogOwnerPhone) ){
            // alertMsg = "电话号码格式有误！";
            flag = false
            this.$alert("电话号码格式有误！");
          }
          if(!this.dogInfos.dogOwner.dogOwnerPhone){
            // alertMsg = "电话号码未填！";
            flag = false
            this.$alert("电话号码未填！");
          }
          if(flag){
            this.$axios({
              method: 'post',
              headers:{
                'Content-Type': 'application/json;charset=UTF-8'  //这里加上头部信息
              },
              url: '/biz/dogInfo/updateDogImmune',
              data: JSON.stringify(this.dogInfos)
            }).then((res) => {
                if (res.data.status==200 && res.data.msg=="OK") {
                  this.$alert("基本信息修改成功！")
                  $("#xg").show();
                  $("#bcxg").hide();
                  $(".gq").show();
                  $(".gh").hide();
                  var b=$('.iup')
                  for (var i=0;i<b.length;i++) {
                    $(b[i]).attr("disabled","disabled");
                  }
                  initData(this)
                }else {
                  this.$alert("修改失败！")
                }
              }
            ).catch((err) => {
              console.log(err);
            })
          }
        },
        phonee:function () {
          this.$confirm('修改电话将改变犬主的账号密码，确定修改电话吗？').then(_ => {
            this.phone=this.dogInfos.dogOwner.dogOwnerPhone
          }).catch(_ => {
          });
        },printImms(){
          var printData = document.getElementById("printimm").innerHTML; // 只打印 forPrint 这个div中的内容。
          window.document.body.innerHTML = printData;   //把 html 里的数据 复制给 body 的 html 数据 ，相当于重置了整个页面的 内容
          window.print();
          if (navigator.userAgent.indexOf("MSIE") > 0){
            document.body.removeChild(iframe);
          }
          location.reload();
        }
      },
      computed:{
        pageDate(){
          return{
            curPage:this.pageInfo.pageNum,//当前页吗
            totalCount: this.pageInfo.totalCount?this.pageInfo.totalCount:0,//总条数
            pageSize: this.pageInfo.pageSize,//页面大小
          }
        }
      }
    }

  function initData(_this) {
    _this.$axios({
      method: 'get',
      url: '/biz/dogInfo/findImmuneDetail',
      params: {
        dogId: _this.$route.params.dogId
      },
    }).then((res) => {
      console.log(111)
      console.log(res)
      console.log(_this.$route.params.dogId)
        if (res.data.data != null) {
          _this.dogInfos = res.data.data
          console.log("3344犬信息"+JSON.stringify(_this.dogInfos))
          _this.phone=_this.dogInfos.dogOwner.dogOwnerPhone,
          _this.adress=_this.dogInfos.dogOwner.address,
          _this.name=_this.dogInfos.dogOwner.dogOwnerName,
          _this.idCardNum=_this.dogInfos.dogOwner.tDogOwnerCard.cardNum//身份证号码
          _this.dogInfos.dogImmune.seqId=_this.$route.params.seqId
          //遮罩
          // var name=plusXingg(_this.dogInfos.dogOwner.dogOwnerName,1,1);
          // _this.dogInfos.dogOwner.dogOwnerName=name;
          // var adress=plusXingg(_this.dogInfos.dogOwner.address,1,1);
          // _this.dogInfos.dogOwner.address=adress;
          // var myphone = _this.dogInfos.dogOwner.dogOwnerPhone.substr(3, 4);
          // _this.dogInfos.dogOwner.dogOwnerPhone = _this.dogInfos.dogOwner.dogOwnerPhone.replace(myphone, "****");
          var myz = _this.dogInfos.dogOwner.tDogOwnerCard.cardNum.substr(4, 10);
          _this.dogInfos.dogOwner.tDogOwnerCard.cardNum = _this.dogInfos.dogOwner.tDogOwnerCard.cardNum.replace(myz, "****");
          _this.idCardNumx=_this.dogInfos.dogOwner.tDogOwnerCard.cardNum
        }
      }
    ).catch((err) => {
      console.log(err);
    })
  }

  function initData1(_this) {
    _this.$axios({
      url: '/biz/dogInfo/getTVaccineId',
      params: {"id": _this.$route.params.dogId,"num":_this.pageInfo.pageNum,"size":_this.pageInfo.pageSize}
    }).then((res) => {
      _this.list=res.data.Immunelist;
      _this.list1=res.data.HealthConditionList;
      console.log(65432)
      console.log(_this.list1)
      console.log("健康检查"+JSON.stringify(_this.list1))
      _this.getPrintImm=res.data;
      _this.getPrintImm.creation_time=parseInt(_this.$route.params.creation_time)
      if(_this.getPrintImm.dogInfo.dog_gender!=null){
        _this.getPrintImm.dogInfo.dog_gender=_this.getPrintImm.dogInfo.dog_gender==0?'雄':'雌'
      }
      if(_this.getPrintImm.dogInfo.birth_time!=null){
        _this.getPrintImm.dogInfo.birth_time=CalAge(_this.getPrintImm.dogInfo.birth_time)
      }

      //console.log("打印信息"+JSON.stringify(_this.getPrintImm))

    }).catch((res)=>{
      console.log(res.message)
    })
  }

  //新增免疫记录
  function add(_this){
    let immuneRegister={
      vaccineRegister:{//免疫登记
        dogId:_this.$route.params.dogId,
        orgId:conf.userInfo.organizationId,
        injectionType:0
      },
      vaccineInjection:{//免疫记录
        dogId:_this.$route.params.dogId,
        vacOrg:conf.userInfo.organizationId,//机构id
        factInjectionDate:_this.addImm.cardDateStart,//实际注射时间,
        vaccineName:_this.addImm.vaccine_name,//免疫项目
        vaccineProducer:_this.addImm.vaccine_producer,//厂家及编号
        operatorId:conf.userInfo.userId,//注射人id
        nextInjectionDate:_this.addImm.next_injection_date,//下次注射时间
        remarks:_this.addImm.remarks//备注
      },
      immuneCard:{//免疫证
        seqId:_this.$route.params.seqId,
        dogId:_this.$route.params.dogId,
        dogOwnerId:_this.dogInfos.dogOwnerId,
        // immuneCardNum:_this.dogInfos.dogImmune.immuneCardNum,
        lssueOrgId:conf.userInfo.organizationId,
        lssuerId:conf.userInfo.userId
      }
    }
    try{
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
          initData(_this);
          initData1(_this);
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
    _this.healthConditionDO.dogId=_this.$route.params.dogId,
    _this.healthConditionDO.inspectOrg=conf.userInfo.organizationId
    _this.healthConditionDO.operator=conf.userInfo.userId
    _this.healthConditionDO.status=1
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
          initData1(_this);
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
  //姓名遮罩
  function plusXingg (str,frontLen,endLen) {
    var len = str.length-frontLen-endLen;
    var xing = '';
    if(len==0){
      return '*'+str.substring(str.length-endLen);
    }
    for (var i=0;i<len;i++) {
      xing+='*';
    }
    return str.substring(0,frontLen)+xing+str.substring(str.length-endLen);
  }
  function printImm(_this){
    _this.$axios({
      async:false,
      url:'/biz/dogInfo/getTVaccineId'
      ,params:{id:_this.$route.params.VIId,num:null,size:null}
    }).then((ref)=>{
      _this.getPrintImm=ref.data;
      _this.getPrintImm.creation_time=_this.$route.params.creation_time
      if(_this.getPrintImm.dogInfo.dog_gender!=null){
        _this.getPrintImm.dogInfo.dog_gender=_this.getPrintImm.dogInfo.dog_gender==0?'雄':'雌'
      }
      /*if(_this.getPrintImm.dogInfo.birth_time!=null){
        _this.getPrintImm.dogInfo.birth_time=CalAge(_this.getPrintImm.dogInfo.birth_time)
      }*/

      console.log("打印信息"+JSON.stringify(_this.getPrintImm))
      /*_this.$confirm('确认去打印吗？','提示').then((ref)=>{
        _this.printImmss();
      })*/

    })
  }
  function CalAge(date1) {
    var datetime1 = new Date(date1);
    var datetime2 = new Date();
    var year1 = datetime1.getFullYear();
    var year2 = datetime2.getFullYear();
    var age=year2-year1+1;
    return age+"岁";
  }
</script>

<style scoped>
  .img{
    width: 202px;
    height: 180px;
    border: solid 1px #eee;
  }
  .imgtan{
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  td{
    text-align:center;
  }
  .immtable10 td{
    border:1px solid #000000;
    color: #000000;
  }
</style>
