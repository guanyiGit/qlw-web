<template>

  <!--内容区-->
  <div class="w980 fr">
    <div class="mbx">
      <ul class="ul11 clearfix">
        <li>
          <!--<router-link :to="{name:'dogManager_list'}">犬只档案 &nbsp;&gt;&nbsp;&nbsp;</router-link>-->
          <a href="###" @click.prevent="$router.go(-1)">{{$route.params.name?$route.params.name:'上一页'}}&nbsp;&gt;&nbsp;&nbsp;</a>
        </li>
        <li>查看详情</li>
      </ul>
    </div>

    <div class="mgt15 k3">
      <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">犬只信息：</div>
      <div class="pdb20 ovh" v-if="dogInfos.dogInfo">
        <div class="fl w945 pdt10">
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">犬名：</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogInfo.dogName"
                       :disabled="isDisabled">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w90 fl h40 lh40 cor0 pdl30">品种：</span>
              <div class="mgl90">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogInfo.breed"
                       :disabled="isDisabled">
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">性别：</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4"
                       :value="dogInfos.dogInfo.dogGender==0?'雄':dogInfos.dogInfo.dogGender==1?'雌':'-'"
                       :disabled="isDisabled">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w90 fl h40 lh40 cor0 pdl30">犬龄：</span>
              <div class="mgl90">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos?dogInfos.dogInfo?dogInfos.dogInfo.dogAge?dogInfos.dogInfo.dogAge +'岁':'':'':''"
                       :disabled="isDisabled">
              </div>
            </div>
          </div>
          <div class="ovh">
            <!--<div class="mgt10 ww50 fl">-->

              <!--<span class="db w100 fl h40 lh40 cor0 pdl30">出生日期</span>-->
              <!--<div class="mgl100">-->
                <!--<input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogInfo.birthTime"-->
                       <!--:disabled="isDisabled">-->
              <!--</div>-->
            <!--</div>-->
            <div class="mgt10 ww50 fl">
              <span class="db w90 fl h40 lh40 cor0 pdl30">毛色：</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogInfo.color"
                       :disabled="isDisabled">
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">录入时间：</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogInfo.creationTime|formatDate('yyyy-MM-dd')"
                       :disabled="isDisabled">

              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w90 fl h40 lh40 cor0 pdl30">体重：</span>
              <div class="mgl90">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogInfo.weight"
                       :disabled="isDisabled">
              </div>
            </div>
          </div>
          <div class="mgt20">
            <span class="db w100 fl h40 lh40 pdl30 cor0">照片：</span>
            <div class="mgl100 ovh">
              <ul class="ovh fl ul10 h180 ww100 borbfc695">
                <li class="fl" v-for="(item,index) in dogInfos.urlLsit" :key="index">
                  <img :src="item.imageUrl" alt="" class="img" v-if="index<=3">
                </li>
                <!--<li class="fl"><img src="/static/images/28-1.png" alt="" style="width: 202px;height: 180px;"></li>-->
                <!--<li class="fl"><img src="/static/images/28-2.png" alt=""></li>-->
                <!--<li class="fl"><img src="/static/images/28-3.png" alt=""></li>-->
              </ul>
            </div>
          </div>
        </div>
        <!--<div class="mgl730 pdt20">-->
          <!--<img class="db c-b imgMax" :src="dogInfos.urlLsit[0].imageUrl" alt=""-->
               <!--v-if="dogInfos.urlLsit && dogInfos.urlLsit.length>0">-->
          <!--<img class="db c-b imgMax" src="/static/images/dog-none.png" alt="" v-else>-->
        <!--</div>-->
      </div>
      <div class="pdt10 pdb20 pdr30 borb2" v-else>
        <div class="ovh"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;无</div>
      </div>
    </div>
<!--。。。。。。。。。。。。。。。-->
    <div class="mgt10 k3">
      <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">证件&设备 信息</div>

      <div class="pdt10 pdb20 pdr30 borb2" v-if="dogInfos.immuneCard">
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">免疫证号：</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.immuneCard.immuneCardNum"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">办理时间：</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.immuneCard.lssueTime|formatDate('yyyy-MM-dd')"
                     :disabled="isDisabled">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">办理机构：</span>
            <div class="mgl90">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.immuneCard.orgName"
                     :disabled="isDisabled">
            </div>
          </div>
          <!--<div class="mgt10 ww50 fr">-->
            <!--<span class="db w100 fl h40 lh40 cor0 pdl30">有效期至</span>-->
            <!--<div class="mgl100">-->
              <!--<input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.immuneCard.endTime|formatDate('yyyy-MM-dd')"-->
                     <!--:disabled="isDisabled">-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
      <div class="pdt10 pdb20 pdr30 borb2" v-else>
        <div class="ovh"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;无免疫证信息</div>
      </div>

      <div class="pdt10 pdb20 pdr30 borb2" v-if="dogInfos.device">
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">项圈编号：</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.device.deviceNumber"
                     :disabled="isDisabled">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">办理机构：</span>
            <div class="mgl90">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.device.orgName"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">出厂日期：</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.device.productionTime|formatDate('yyyy-MM-dd')"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>
      </div>
      <div class="pdt10 pdb20 pdr30 borb2" v-else>
        <div class="ovh"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;无设备信息</div>
      </div>

      <div class="pdt10 pdb20 pdr30 borb2" v-if="dogInfos.dogCard">
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">犬证号：</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogCard.dogCardNum"
                     :disabled="isDisabled">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">签发机构：</span>
            <div class="mgl90">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogCard.orgName"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>
        <div class="ovh">
          <!--<div class="mgt10 ww50 fl">-->
            <!--<span class="db w100 fl h40 lh40 cor0 pdl30">有效期限</span>-->
            <!--<div class="mgl100">-->
              <!--<input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4 " :value="dogInfos.dogCard.startTime|formatDate('yyyy-MM-dd')"-->
                     <!--:disabled="isDisabled">-->
            <!--</div>-->
          <!--</div>-->
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">签发日期：</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogCard.lssueTime|formatDate('yyyy-MM-dd')"
                     :disabled="isDisabled">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">有效期至：</span>
            <div class="mgl90">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogCard.endTime|formatDate('yyyy-MM-dd')"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>
      </div>
      <div class="pdt10 pdb20 pdr30 borb2" v-else>
        <div class="ovh"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;无犬证信息</div>
      </div>

    </div>

    <div class="mgt10 k3">
      <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">犬主信息</div>
      <div class="pdt10 pdb20 pdr30" v-if="dogInfos.dogOwners">

        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">犬主姓名：</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.dogOwnerName"
                     :disabled="isDisabled">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">民族：</span>
            <div class="mgl90">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4"
                     :value="dogInfos.dogOwners.ethnic" :disabled="isDisabled">
            </div>
          </div>
        </div>

        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">证件类型：</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4"
                     :value="dogInfos.dogOwners.cardType==0?'身份证':dogInfos.dogOwners.cardType==1?'护照':dogInfos.dogOwners.cardType==2?'社保卡':'其他'"
                     :disabled="isDisabled">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">证件号码：</span>
            <div class="mgl90">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.cardNum"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>


        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">性别：</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.sex==0?'男':'女'"
                     :disabled="isDisabled">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">出生日期：</span>
            <div class="mgl90">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.birthDate | formatDate('yyyy-MM-dd')"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>

        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">现住区县：</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.districtName"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>

        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">所属社区：</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.community"
                     :disabled="isDisabled">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30"> 邮编：</span>
            <div class="mgl90">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.postalCode"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>

        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">联系电话：</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.dogOwnerPhone"
                     :disabled="isDisabled">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">电子邮箱：</span>
            <div class="mgl90">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.eMail"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>

        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">详细地址：</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.address"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>
        <div class="mgt20">
          <span class="db w100 fl h40 lh40 pdl30 cor0">照片：</span>
          <div class="mgl100 ovh">
            <ul class="ovh fl ul10 h180 ww100 borbfc695">
              <li class="fl" v-for="(item,index) in dogInfos.ownerUrlLsit" :key="index">
                <img :src="item.imageUrl" alt=""class="img" v-if="index<3" >
              </li>
              <!--<li class="fl"><img src="/static/images/28-1.png" alt="" class="img"></li>-->
              <!--<li class="fl"><img src="/static/images/28-2.png" alt=""></li>-->
              <!--<li class="fl"><img src="/static/images/28-3.png" alt=""></li>-->
            </ul>
          </div>
        </div>


      </div>
      <div class="pdt10 pdb20 pdr30 borb2" v-else>
        <div class="ovh"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;无</div>
      </div>
    </div>

    <div class="mgt10 k3">
      <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">防疫信息</div>
      <div>
        <table class="table2" width="100%" border="1">
          <tbody>
          <tr>
            <td>免疫日期</td>
            <!--<td>免疫项目</td>-->
            <td>疫苗名称</td>
            <td>疫苗厂家</td>
            <td>疫苗批号</td>
            <td>接种兽医</td>
            <td>接种单位</td>
          </tr>
          <tr v-for="(item,index) in dogInfos.vaccineList" v-if="dogInfos.vaccineList && index<20" :key="index">
            <td>{{item.injectionTime |formatDate("yyyy年MM月dd日")}}</td>
            <!--<td>{{item.vaccineName}}</td>-->
            <td>{{item.vaccineName}}</td>
            <td>{{item.vaccineProducer}}</td>
            <td>{{item.vaccineNum}}</td>
            <td>{{item.name}}</td>
            <td>{{item.orgName}}</td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>
    <div class="mgt10 k3">
      <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">年检信息</div>
      <div>
        <table class="table3" width="100%" border="1">
          <tbody>
          <tr>
            <td>年检日期</td>
            <td>年检单位</td>
            <td>年检结果</td>
            <td>备注</td>
          </tr>
          <tr v-for="(item,index) in dogInfos.inspectionsInfoList" v-if="index<20" :key="index">
            <td>{{item.inspectionsDate | formatDate('yyyy年MM月dd日')}}</td>
            <td>{{item.orgName}}</td>
            <td>{{item.resultType==0?'合格':item.resultType==1?'不合格':'其它'}}</td>
            <td>{{item.remarks}}</td>
          </tr>

          <!--
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          -->
          </tbody>
        </table>
      </div>

    </div>

    <div class="mgt10 k3">
      <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">违法信息</div>
      <div>
        <table class="table4" width="100%" border="1">
          <tbody>
          <tr>
            <td>违法时间</td>
            <td>违法类型</td>
            <!--<td>违法行为</td>-->
            <!--<td>违法地点</td>-->
            <td>处罚方式</td>
            <!--<td>罚款（元）</td>-->
            <td>本次扣分（分）</td>
            <td>累计扣分（分）</td>
            <td>执法人员</td>
            <td>备注</td>
          </tr>
          <tr v-for="(item ,index) in dogInfos.violationList" :key="index" v-if="index<20">
            <td>{{item.violationDate | formatDate("yyyy年MM月dd日")}}</td>
            <!--<td>{{item.violationType==0?'溜犬不及时清理犬只粪便':item.violationType==1?'不牵犬绳':item.violationType==2?'犬只扰民':'其他'}}-->
            <!--</td>-->
            <td>{{item.violation}}</td>
            <!--<td>&nbsp;</td>-->
            <td>{{item.punishType==0?'扣分':'其他'}}</td>
            <td>{{item.fine}}</td>
            <td>{{item.deductionSum}}</td>
            <td>{{item.operatorName}}</td>
            <td>{{item.remark}}</td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>
    <div v-if="dogInfos&&dogInfos.dogCard&&dogInfos.dogCard.reason">审核不通过原因：{{dogInfos.dogCard.reason}}</div>
  </div>
  <!--内容区END-->

</template>

<script>

  export default {
    name: "dogManagerInfo",
    data() {
      return {
        dogInfos: {},//犬信息列表
        test: 'msg',
        isDisabled: true,//是否禁用输入框
      }
    },
    mounted() {
      console.log(this.$data)
    },
    created() {
      initData(this)
    },
    computed: {
      // roBackName() {
      //   let temp = this.$router
      //   let temp2 = this.$route
      //   console.log(temp)
      //   console.log(temp2)
      //   console.log(this.formUrl)
      //   debugger
      //   return ''
      // }
    }
  }


  function initData(_this) {
    _this.$axios({
      method: 'post',
      url: '/biz/dogCard/selectDogCardInfo',
      params: {
        dogId: _this.$route.params.dogId
      },
    }).then((res) => {
      console.log(res)
        if (res.data.code == '000000' && res.data.result != null) {
          _this.dogInfos = res.data.result
        }
      }
    ).catch((err) => {
      console.log(err);
    })
  }
</script>

<style scoped>
  .imgMax {
    width: 80%;
    height: 80%;
  }

  td {
    text-align: center;
  }
  /*.dogimg{*/
    /*border: solid 1px #eee;*/
  /*}*/
  .img{
    width: 202px;
    height: 180px;
    border: solid 1px #eee;
  }

</style>
