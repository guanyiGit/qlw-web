<template>
  <!--内容区-->
  <div class="w980 fr">
    <div class="mbx">
      <ul class="ul11 clearfix">
        <li>
          <a href="###" @click.prevent="$router.go(-1)">{{$route.params.name?$route.params.name:'上一页'}}&nbsp;&gt;&nbsp;&nbsp;</a>
        </li>
        <li>犬证审核</li>
      </ul>
    </div>

      <div class="k2 w660 c-b ovh">
        <a href="###" class="db fl fs16 cor0 w220"><img class="v-m mgr10" src="../../../static/images/30.png" alt="">养犬人提交申请</a>
        <a href="###" class="db fl fs16 cor0 w220 t-c active">办证机构审核</a>
        <a href="###" class="db fl fs16 cor0 w220 t-c">结束</a>
      </div>

    <div class="mgt15 k3">
      <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">犬只信息</div>
      <div class="pdb20 ovh">
        <div class="fl w945 pdt10">
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">犬名</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos?dogInfos.dogInfo?dogInfos.dogInfo.dogName?dogInfos.dogInfo.dogName:'':'':''"
                       :disabled="isDisabled">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w90 fl h40 lh40 cor0 pdl30">品种</span>
              <div class="mgl90">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos?dogInfos.dogInfo?dogInfos.dogInfo.breed?dogInfos.dogInfo.breed:'':'':''"
                       :disabled="isDisabled">
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">性别</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4"
                       :value="dogInfos?dogInfos.dogInfo?dogInfos.dogInfo.dogGender==0?'雄':dogInfos.dogInfo.dogGender==1?'雌':'-':'-':'-'"
                       :disabled="isDisabled">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w90 fl h40 lh40 cor0 pdl30">犬龄</span>
              <div class="mgl90">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos?dogInfos.dogInfo?dogInfos.dogInfo.dogAge?dogInfos.dogInfo.dogAge +'岁':'':'':''"
                       :disabled="isDisabled">
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w90 fl h40 lh40 cor0 pdl30">毛色</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos?dogInfos.dogInfo?dogInfos.dogInfo.color?dogInfos.dogInfo.color:'':'':''"
                       :disabled="isDisabled">
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">录入时间</span>
              <div class="mgl100">
                <input v-if="dogInfos&&dogInfos.dogInfo&&dogInfos.dogInfo.creationTime" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogInfo.creationTime|formatDate('yyyy-MM-dd')"
                       :disabled="isDisabled">
                <input v-else type="text" class="ww100 h40 lh40 pdl20 borf1 ras4">

              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w90 fl h40 lh40 cor0 pdl30">体重</span>
              <div class="mgl90">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos?dogInfos.dogInfo?dogInfos.dogInfo.weight?dogInfos.dogInfo.weight:'':'':''"
                       :disabled="isDisabled">
              </div>
            </div>
          </div>
          <div class="mgt20">
            <span class="db w100 fl h40 lh40 pdl30 cor0">照片</span>
            <div class="mgl100 ovh">
              <ul class="ovh fl ul10">
                <li class="fl" v-for="(item,index) in dogInfos.urlLsit" :key="index">
                  <img :src="item.imageUrl" alt="" style="width: 202px;height: 180px;" v-if="index<3">
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mgt10 k3">
      <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">犬主信息</div>
      <div class="pdt10 pdb20 pdr30">

        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">犬主姓名</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos?dogInfos.dogOwners?dogInfos.dogOwners.dogOwnerName?dogInfos.dogOwners.dogOwnerName:'':'':''"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>

        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">证件类型</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4"
                     :value="dogInfos.dogOwners.cardType==0?'身份证':dogInfos.dogOwners.cardType==1?'房产证':dogInfos.dogOwners.cardType==2?'营业执照':'其他'"
                     :disabled="isDisabled">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">证件号码</span>
            <div class="mgl90">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.cardNum"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>

        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">性别</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.sex==0?'男':'女'"
                     :disabled="isDisabled">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">出生日期</span>
            <div class="mgl90">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.birthDate"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>

        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">现住区县</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.districtName"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>

        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">所属社区</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.community"
                     :disabled="isDisabled">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30"> 邮编</span>
            <div class="mgl90">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.postalCode"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>

        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">联系电话</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.dogOwnerPhone"
                     :disabled="isDisabled">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">电子邮箱</span>
            <div class="mgl90">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.eMail"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>

        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">详细地址</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.dogOwners.address"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>
        <div class="mgt20">
          <span class="db w100 fl h40 lh40 pdl30 cor0">照片</span>
          <div class="mgl100 ovh">
            <ul class="ovh fl ul10">
              <li class="fl" v-for="(item,index) in dogInfos.ownerUrlLsit" :key="index">
                <img :src="item.imageUrl" alt="" style="width: 202px;height: 180px;" v-if="index<3">
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>

    <!--。。。。。。。。。。。。。。。-->
    <div class="mgt10 k3">
      <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">免疫证信息</div>
      <div class="pdt10 pdb20 pdr30 borb2">
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">免疫证号</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.immuneCard.immuneCardNum"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">办理时间</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.immuneCard.lssueTime|formatDate('yyyy-MM-dd')"
                     :disabled="isDisabled">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">办理机构</span>
            <div class="mgl90">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="dogInfos.immuneCard.orgName"
                     :disabled="isDisabled">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--。。。。。。。。。。。。。。。-->
    <div class="mgt10 k3">
      <div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">犬证信息（如以上资料审核无误，由审核人填写）</div>
      <div class="pdt10 pdb20 pdr30 borb2">
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
      <div class="t-c mgt40 mgb50">
        <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 mgl5" @click="notThrough">审核不通过</a>
        <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="through">审核通过</a>
        <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5" @click="cancel">取消</a>
      </div>
    </div>
    <!--弹窗2-->
    <div class="T" id="bbb" style="display: none">
      <div class="tan3 bgw rel" style="height: 440px">
        <div class="h60 lh60 bgf1 fs16 cor0 pdl30 fb">审批不通过原因</div>
        <form action="#">
          <div class="pdt10 pdl85 pdr85 ovh">
            <textarea id="whyy" rows="15" style="width: 100%" placeholder="请输入原因：" v-model="insertParams.reason"></textarea>
          </div>
          <div class="t-c mgt40 mgb50">
            <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="saveNotThrough">提交</a>
            <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5" @click="cancell">取消</a>
          </div>
        </form>
        <a style="cursor:pointer;" class="db abs close w28 h28"><img src="../../../static/images/50.png" alt="" @click="cancell"></a>
      </div>
    </div>
    <!--弹窗2-->
  </div>
  <!--内容区END-->
</template>

<script>
  import globalConf from '@/common/config'
  import $ from 'jquery'
    export default {
        name: "dogCardaudit",
      data() {
        return {
          datePattern:"yyyy年MM月dd日",
          dogInfos: {},//犬信息列表
          test: 'msg',
          isDisabled: true,//是否禁用输入框
          insertParams:{//办理犬证插入的对象
            status:null,//犬证状态0已禁用，1启用/审核通过，2,已过期，3注销，4待审核，5审核不通过
            dogCardNum:null,
            dogId:this.$route.params.dogId,
            dogOwnerId:null,
            startTime:new Date(),
            endTime:null,
            lssueOrgId:globalConf.userInfo.organizationId,
            lssuerId:globalConf.userInfo.userId,
            phone:null,
            name:null,
            gender:null,
            email:null,
            reason:null,//审核不通过原因
          },
        }
      },
      mounted() {
        console.log(this.$data)
      },
      created() {
        this.insertParams.lssueOrgId=globalConf.userInfo.organizationId
        this.insertParams.lssuerId=globalConf.userInfo.userId
        this.insertParams.dogId=this.$route.params.dogId
        initData(this)
      },
      methods:{
        notThrough(){
          $("#bbb").show();
        },
        through(){
          this.insertParams.reason=null
          this.insertParams.status=1
          auditt(this);
        },
        saveNotThrough(){
          this.insertParams.status=5
          auditt(this);
          this.insertParams.reason=null
          $("#bbb").hide();
        },
        cancel(){
          this.$router.back(-1);
        },
        cancell(){
          this.insertParams.reason=null
          $("#bbb").hide();
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
      computed: {
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
          if (res.data.code == '000000' && res.data.result != null) {
            _this.dogInfos = res.data.result
            _this.insertParams.dogOwnerId = _this.dogInfos.dogOwners.dogOwnerId
            _this.insertParams.phone = _this.dogInfos.dogOwners.dogOwnerPhone
            _this.insertParams.name = _this.dogInfos.dogOwners.dogOwnerName
            _this.insertParams.gender = _this.dogInfos.dogOwners.sex
            _this.insertParams.email = _this.dogInfos.dogOwners.eMail
          }
        }
      ).catch((err) => {
        console.log(err);
      })
    }

    //提交审核
    function auditt(_this) {
    if (!_this.insertParams.dogCardNum) {
      _this.$alert("请生填写证号！")
      return
    }
      if (!_this.insertParams.endTime) {
        _this.$alert("请选择有效期限！")
        return
      }
      _this.$axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'  //这里加上头部信息
        },
        url: '/biz/dogCard/dogCardAudit',
        data: JSON.stringify(_this.insertParams),
      }).then((res) => {
          if (res.data.code == '000000') {
            _this.$alert("提交成功！").then(_=>{
              _this.$router.back(-1);
            })
          }
        }
      ).catch((err) => {
        console.log(err);
      })
    }
</script>

<style scoped>

</style>
