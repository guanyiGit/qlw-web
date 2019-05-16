<template>
  <!--查看免疫证详情-->
  <div>
    <!--内容区-->
    <div class="w980 fr">
      <div class="mbx">
        <ul class="ul11 clearfix">
          <li><router-link style="cursor:pointer;" :to="{name:'hospital_certificateDealt'}">免疫证办理></router-link></li>
          <li>免疫证详情</li>
        </ul>
      </div>
      <div class="mgt20 k3" v-if="dogInfos.dogImmune">
        <div class="pdt10 pdb20 pdr30">
        <div class="ovh">
        <div class="mgt10 ww50 fl">
        <span class="db w100 fl h40 lh40 cor0 pdl30">免疫证号</span>
        <div class="mgl100">
        <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogImmune.immuneCardNum" :disabled="isDisabled">
        </div>
        </div>
        </div>
        <div class="ovh">
        <div class="mgt10 ww50 fl">
        <span class="db w100 fl h40 lh40 cor0 pdl30">办理时间</span>
        <div class="mgl100">
        <el-date-picker v-model="dogInfos.dogImmune.lssueTime" type="date" class="ww100 h40 lh40 borf1 ras4 dataSelect"
        placeholder="" :format="datePattern" :disabled="true"></el-date-picker>
        </div>
        </div>
        <div class="mgt10 ww50 fr">
        <span class="db w100 fl h40 lh40 cor0 pdl30">办理机构</span>
        <div class="mgl100">
        <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogImmune.tOrganization?dogInfos.dogImmune.tOrganization.organizationName:''" :disabled="isDisabled">
        </div>
        </div>
        </div>
        </div>
      </div>

      <div class="mgt20 k3" v-if="dogInfos">
        <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">犬只信息</div>
        <div class="pdt10 pdb20 pdr30">
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">犬名</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogName" :disabled="isDisabled">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w100 fl h40 lh40 cor0 pdl30">品种</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogBreedDictionary?dogInfos.dogBreedDictionary.dictionaryDescribe:''" :disabled="isDisabled">
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">性别</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogGender==0?'雄':'雌'" :disabled="isDisabled">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <sinsertDogCardpan class="db w100 fl h40 lh40 cor0 pdl30">犬龄</sinsertDogCardpan>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos?dogInfos.dogAge?dogInfos.dogAge+'岁':'':''" :disabled="isDisabled">
              </div>
            </div>
          </div>
          <div class="ovh">
            <!--<div class="mgt10 ww50 fl">-->
            <!--<span class="db w100 fl h40 lh40 cor0 pdl30">出生日期</span>-->
            <!--<div class="mgl100">-->
            <!--<input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.birthTime | formatDate" :disabled="isDisabled">-->
            <!--</div>-->
            <!--</div>-->
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">毛色</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogColorDictionary?dogInfos.dogColorDictionary.dictionaryDescribe:''" :disabled="isDisabled">
              </div>
            </div>
          </div>
          <div class="mgt20">
            <span class="db w100 fl h40 lh40 pdl30 cor0">照片</span>
            <div class="mgl100 ovh">
              <ul class="ovh fl ul10 h180 ww100 borbfc695" v-if="dogInfos&&dogInfos.imageList.length>0">
                <li v-for="(item,index) in dogInfos.imageList" :key="index" class="fl">
                  <img class="img" :src="item.thumbnailUrl" v-if="index<3" alt="">
                </li>
              </ul>
              <div class="file fl rel ww100 h160 borbfc695" v-else>
                <input type="file" class="abs z10 w202 h160 left0 top0">
                <!--<img class="rel z1" src="../../../static/images/28-8.png">-->
                <p class="abs cor9 ww100 z8 left0 top90 t-c">无照片</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="mgt15 k3" v-if="dogInfos.dogOwner">
        <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">犬主信息</div>
        <div class="pdb20 pdr30 ovh">
          <div class="w950 pdt10">
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">犬主姓名</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwner.dogOwnerName" :disabled="isDisabled">
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">联系电话</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwner.dogOwnerPhone" :disabled="isDisabled">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">证件类型</span>
                <div class="mgl100">
                  <input v-if="dogInfos.dogOwner.tDogOwnerCard" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwner.tDogOwnerCard.cardType==0?'身份证':dogInfos.dogOwner.tDogOwnerCard.cardType==1?'护照':dogInfos.dogOwner.tDogOwnerCard.cardType==2?'社保卡':'其他'" :disabled="isDisabled">
                  <input v-else type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :disabled="isDisabled">
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">证件号码</span>
                <div class="mgl100">
                  <input v-if="dogInfos.dogOwner.tDogOwnerCard" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwner.tDogOwnerCard?dogInfos.dogOwner.tDogOwnerCard.cardNum:''" :disabled="isDisabled">
                  <input v-else type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :disabled="isDisabled">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">现住区县</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwner.tDistrict?dogInfos.dogOwner.tDistrict.districtName:''" :disabled="isDisabled">
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w100 fl h40 lh40 cor0 pdl30">所属街道</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwner.community" :disabled="isDisabled">
                </div>
              </div>
            </div>
            <div class="ovh">
              <div class="mgt10 ww100 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">详细地址</span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwner.address" :disabled="isDisabled">
                </div>
              </div>
            </div>
            <!--<div class="ovh">-->
            <!--<div class="mgt10 ww50 fl">-->
            <!--<span class="db w100 fl h40 lh40 cor0 pdl30">照片</span>-->
            <!--<div class="mgl100">-->
            <!--<img src="../../../static/images/28-8.png" alt="">-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
          </div>
        </div>
        <!--<div class="t-c mgt40 mgb50">-->
        <!--<a href="###" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8">打印</a>-->
        <!--<input type="submit" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" value="提交">-->
        <!--<a href="###" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8">取消</a>-->
        <!--</div>-->
      </div>

    </div>
    <!--内容区END-->
  </div>
</template>

<script>
    export default {
        name: "checkImmunCard",
      data(){
        return {
          dogInfos:{},//犬信息列表
          test:'msg',
          isDisabled:true,//是否禁用输入框
          datePattern:"yyyy年MM月dd日",
        }
      },
      mounted() {
        console.log(this.$data)
      },
      beforeCreate() {
        initData(this)
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
        }
      }
    }

    function initData(_this) {
      _this.$axios({
        method: 'get',
        url: '/biz/dogInfo/findImmuneDetail',
        params: {
          seqId: _this.$route.params.seqId
        },
      }).then((res) => {
          if (res.data.data != null) {
            _this.dogInfos = res.data.data
          }
        }
      ).catch((err) => {
        console.log(err);
      })
    }

</script>

<style scoped>
  .img{
    width: 202px;
    height: 180px;
    border: solid 1px #eee;
  }
</style>
