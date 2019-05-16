<template>
  <!--内容区-->
  <div class="w980 fr">
    <div class="mbx">
      <ul class="ul11 clearfix nav-titile">
        <li><a style="cursor:pointer;" @click.prevent="reternn">网点列表></a></li>
        <li>网点详情</li>
      </ul>
    </div>
    <div class="k2 w660 c-b ovh">
      <a style="cursor:pointer;" class="db fl fs16 cor0 w220"><img class="v-m mgr10" src="../../../static/images/30.png" alt="">宠物医院提交申请</a>
      <a style="cursor:pointer;" class="db fl fs16 cor0 w220 t-c active">平台审核</a>
      <a style="cursor:pointer;" class="db fl fs16 cor0 w220 t-c">结束</a>
    </div>

    <div class="mgt20 k3">
      <div class="h56 lh56 bgf8 pdl30 pdr30 fs16 cor0 fb">
        基本信息
      </div>
      <div class="t-c">
        <table class="table10 tableee" width="100%" border="1">
          <tbody>
          <tr>
            <td>医院名称</td>
            <td class="cor9">{{info?info.organizationName?info.organizationName:'':''}}</td>
            <!--<td>注册资本</td>-->
            <!--<td class="cor9">{{info?info.organizationCapital?info.organizationCapital:'':''}}万</td>-->
            <td>成立日期</td>
            <td v-if="info" class="cor9">{{info.establishDate | formatDate(datePattern)}}</td>
            <td v-else class="cor9"></td>
          </tr>
          <tr>
            <td>注册号</td>
            <td class="cor9">{{info?info.registerNumber?info.registerNumber:'':''}}</td>
            <td>统一社会信用代码</td>
            <td class="cor9">{{info?info.creditCode?info.creditCode:'':''}}</td>
          </tr>
          <!--<tr>-->
            <!--<td>成立日期</td>-->
            <!--<td v-if="info" class="cor9">{{info.establishDate | formatDate(datePattern)}}</td>-->
            <!--<td v-else class="cor9"></td>-->
            <!--<td>所属省份</td>-->
            <!--<td class="cor9">{{info?info.province?info.province:'':''}}</td>-->
          <!--</tr>-->
          <!--<tr>-->
            <!--<td>所属城市</td>-->
            <!--<td class="cor9">{{info?info.ownedCity?info.ownedCity:'':''}}</td>-->
            <!--<td>所属区/县</td>-->
            <!--<td class="cor9">{{info?info.district?info.district:'':''}}</td>-->
          <!--</tr>-->
          <tr>
            <td>联系人</td>
            <td class="cor9">{{info?info.personLiable?info.personLiable:'':''}}</td>
            <td>联系电话</td>
            <td class="cor9">{{info?info.phone?info.phone:'':''}}</td>
          </tr>
          <tr>
            <td>所属地区</td>
            <td colspan="3" id="selectt">
              <v-distpicker wrapper="wrapper-city" address-container="test" :placeholders="citySelectData.placeholders"
                            :province="citySelectData.defaultVal" :city="citySelectData.defaultCity" :area="citySelectData.defaultArea"></v-distpicker>
            </td>
          </tr>
          <tr>
            <td>详细地址</td>
            <td class="cor9 t-l" colspan="3">{{info?info.address?info.address:'':''}}</td>
          </tr>
          <tr>
            <td>经营范围</td>
            <td class="cor9 t-l" colspan="3">{{info?info.scopeOfOperation?info.scopeOfOperation:'':''}}</td>
          </tr>
          <tr>
            <td>店铺照片</td>
            <td class="cor9 pdt20 pdb20 pdl30" colspan="3">
              <div v-if="info&&info.pictureUrl">
                <p v-for="(item,index) in info.pictureUrl" :key="index" class="fl mgr10"><img :src="item.thumbnailUrl" alt="" style="width: 150px;height: 120px" @click="showBigImg(item.imageUrl)"></p>
              </div>
              <p v-else class="fl mgr10"><img src="../../../static/images/28-8.png" alt=""></p>
            </td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>

    <div class="mgt20 k3">
      <div class="h56 lh56 bgf8 pdl30 pdr30 fs16 cor0 fb">
        证件信息
      </div>
      <div>
        <table class="table10 t-c">
          <tbody>
          <tr>
            <td colspan="4"><span class="dinb mgr10 sp3">1</span>动物诊断许可证</td>
          </tr>
          <tr>
            <td>证件号</td>
            <td>{{certificate1?certificate1.petHCardNum?certificate1.petHCardNum:'':''}}</td>
            <td>有效期限</td>
            <td v-if="certificate1&&certificate1.startTime">{{certificate1.startTime | formatDate(datePattern)}}</td>
            <td v-else></td>
            <td v-if="certificate1&&certificate1.endTime">{{certificate1.endTime | formatDate(datePattern)}}</td>
            <td v-else></td>
          </tr>
          <tr>
            <td class="pdt20 pdb20" colspan="5">
              <p class="fl pdl60 pdr100">图片</p>
              <p v-if="certificate1&&certificate1.images.length>0" class="fl">
                <img v-for="item in certificate1.images" v-bind:src="item.thumbnailUrl" alt="" style="width: 150px;height: 120px" @click="showBigImg(item.imageUrl)">
              </p>
              <p v-else class="fl">
                <img src="../../../static/images/28-8.png" alt="">
              </p>
            </td>
          </tr>

          <!--<tr>-->
            <!--<td colspan="4"><span class="dinb mgr10 sp3">2</span>动物防疫许可证</td>-->
          <!--</tr>-->
          <!--<tr>-->
            <!--<td>证件号</td>-->
            <!--<td>{{certificate2?certificate2.petHCardNum?certificate2.petHCardNum:'':''}}</td>-->
            <!--<td>有效期限</td>-->
            <!--<td v-if="certificate1&&certificate1.startTime">{{certificate1.startTime | formatDate(datePattern)}}</td>-->
            <!--<td v-else></td>-->
            <!--<td v-if="certificate1&&certificate1.endTime">{{certificate1.endTime | formatDate(datePattern)}}</td>-->
            <!--<td v-else></td>-->
          <!--</tr>-->
          <!--<tr>-->
            <!--<td class="pdt20 pdb20" colspan="5">-->
              <!--<p class="fl pdl60 pdr100">图片</p>-->
              <!--<p v-if="certificate1&&certificate1.images.length>0" class="fl">-->
                <!--<img v-for="item in certificate1.images" v-bind:src="item.thumbnailUrl" alt="">-->
              <!--</p>-->
              <!--<p v-else class="fl">-->
                <!--<img src="../../../static/images/28-8.png" alt="">-->
              <!--</p>-->
            <!--</td>-->
          <!--</tr>-->
          <tr>
            <td colspan="4"><span class="dinb mgr10 sp3">2</span>工商营业执照</td>
          </tr>
          <tr>
            <td>证件号</td>
            <td>{{certificate3?certificate3.petHCardNum?certificate3.petHCardNum:'':''}}</td>
            <td>有效期限</td>
            <td v-if="certificate3&&certificate3.startTime">{{certificate3.startTime | formatDate(datePattern)}}</td>
            <td v-else></td>
            <td v-if="certificate3&&certificate3.endTime">{{certificate3.endTime | formatDate(datePattern)}}</td>
            <td v-else></td>
          </tr>
          <tr>
            <td class="pdt20 pdb20" colspan="5">
              <p class="fl pdl60 pdr100">图片</p>
              <p v-if="certificate3&&certificate3.images.length>0" class="fl">
                <img v-for="item in certificate3.images" v-bind:src="item.thumbnailUrl" alt="" style="width: 150px;height: 120px" @click="showBigImg(item.imageUrl)">
              </p>
              <p v-else class="fl">
                <img src="../../../static/images/28-8.png" alt="">
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="4"><span class="dinb mgr10 sp3">3</span>兽医资格证</td>
          </tr>
          <tr>
            <td>证件号</td>
            <td>{{certificate4?certificate4.petHCardNum?certificate4.petHCardNum:'':''}}</td>
            <td>有效期限</td>
            <td v-if="certificate4&&certificate4.startTime">{{certificate4.startTime | formatDate(datePattern)}}</td>
            <td v-else></td>
            <td v-if="certificate4&&certificate4.endTime">{{certificate4.endTime | formatDate(datePattern)}}</td>
            <td v-else></td>
          </tr>
          <tr>
            <td class="pdt20 pdb20" colspan="4">
              <p class="fl pdl60 pdr100">图片</p>
              <p v-if="certificate4&&certificate4.images.length>0" class="fl">
                <img v-for="item in certificate4.images" v-bind:src="item.thumbnailUrl" alt="" style="width: 150px;height: 120px" @click="showBigImg(item.imageUrl)">
              </p>
              <p v-else class="fl">
                <img src="../../../static/images/28-8.png" alt="">
              </p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="t-c mgt40 mgb50">
      <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 mgl5" @click="notThrough">审核不通过</a>
      <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="through">审核通过</a>
      <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5" @click.prevent="$router.go(-1)">取消</a>
    </div>
    <!--弹窗1-->
    <div class="T" style="display: none" id="aaa">
      <div class="tan3 bgw rel">
        <div class="h60 lh60 bgf1 fs16 cor0 pdl30 fb">指定业务范围</div>
        <form action="#">
          <div class="pdt10 pdl85 pdr85 ovh">
            <p class="cor9 mgt17">
              <span style="font-size: 16px">请指定业务范围:</span>
            </p>
            <p class="cor9 mgt17">
              <label class="lab3 fl mgr12"><input type="checkbox" class="check" value="0" name="card_add"><i></i></label>免疫证办理
            </p>
            <p class="cor9 mgt17">
              <label class="lab3 fl mgr12"><input type="checkbox" class="check" value="1" name="card_add"><i></i></label>犬证办理
            </p>
          </div>
          <div class="t-c mgt40 mgb50">
            <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="saveThrough">提交</a>
            <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5" @click="cancel1">取消</a>
          </div>
        </form>
        <a style="cursor:pointer;" class="db abs close w28 h28"><img src="../../../static/images/50.png" alt="" @click="cancel1"></a>
      </div>
    </div>
    <!--弹窗1-->
    <!--弹窗2-->
    <div class="T" id="bbb" style="display: none;z-index: 5">
      <div class="tan3 bgw rel">
        <div class="h60 lh60 bgf1 fs16 cor0 pdl30 fb">审批不通过原因</div>
        <form action="#">
          <div class="pdl85 pdr85 ovh">
            <textarea id="whyy" rows="15" style="width: 100%" placeholder="请输入原因：" v-model="why"></textarea>
          </div>
          <div class="t-c mgt10 mgb50">
            <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="saveNotThrough">提交</a>
            <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5" @click="cancell">取消</a>
          </div>
        </form>
        <a style="cursor:pointer;" class="db abs close w28 h28"><img src="../../../static/images/50.png" alt="" @click="cancell"></a>
      </div>
    </div>
    <!--弹窗2-->
    <!--弹窗   说明。.db--显示，.dn--隐藏-->
    <div class="T db Ti" style="display: none;z-index: 5" @click="imgHide()">
      <div class="tan6 abs" style="height: 500px;width: 500px">
        <img class="imgtan abs" id="imgg" :src="url">
      </div>
    </div>
    <!--弹窗   说明。.db--显示，.dn--隐藏-->
  </div>
</template>

<script>
  let check_val = [];
  import $ from 'jquery'
  import VDistpicker from 'v-distpicker'
  //服务网点注册
  let datae = {
    provinceId: 440000,//省
    ownedCityId: 440500,//市
    districtId: 440507,//区
  }
  export default {
    name: "networkAudit",
    data() {
      return {
        url:null,
        info: null,
        datePattern: 'yyyy年MM与dd日',
        certificate1: null,//获取动物诊疗许可证
       // certificate2: null,//动物防疫合格证
        certificate3: null,//工商营业执照
        certificate4: null,//兽医资格证
        why: null,//不通过原因

        citySelectData: {//地区选择器
          //初始化默认选中值汉字行，数字也行
          defaultVal: parseInt(this.$route.params.province),
          defaultCity: parseInt(this.$route.params.city),
          defaultArea: parseInt(this.$route.params.district),
          placeholders: {
            province: '------- 省 --------',
            city: '-------- 市 --------',
            area: '-------- 区 --------'
          },
          select: {//被选择的城市信息

          }
        }
      }
    },
    components: {VDistpicker},
    created() {
      this.$axios({
        url: '/biz/serviceSite/getServiceSite',
        method: 'post',
        params: {organizationId: this.$route.params.organizationId}
      }).then(res => {
        if (res.data.status == 200) {
          this.info = res.data.data;
        }
      }),
        selectCertificate(this);
    },
    mounted() {
      var b=$(".distpicker-address-wrapper select")
      for (var i=0;i<b.length;i++) {
        $(b[i]).attr('disabled',true);
        $(b[i]).css("color","#999");
        $(b[i]).css("font-size",12);
        $(b[i]).css("border",0);
      }
    },
    methods: {
      showBigImg:function (url) {
        this.url=url
        console.log(this.url)
        $(".Ti").show();
      },
      imgHide:function () {
        $(".Ti").hide();
      },
      notThrough() {
        $("#bbb").show();
      },
      cancell() {
        $("#whyy").val("");
        $("#bbb").hide();
      },
      cancel1() {
        $(".check").attr("checked", false);
        $("#aaa").hide();
      },
      reternn(){
        this.$router.back(-1);
      },
      saveNotThrough() {
        const  loadind =  this.$loading({
          lock: true,
          text: '加载中，请稍等！！！',
        });
        this.$axios({
          url: '/biz/serviceSite/update',
          method: 'post',
          params: {organizationId: this.$route.params.organizationId, status: 2, failReason: this.why}
        }).then(res => {
          console.log(res)
          loadind.close();
          if (res.data.status == 200) {
            this.$alert("审核成功！");
            this.$router.back(-1);
            // $("#bbb").hide();
            // this.$router.push('serviceNetworkAudit');//其中operatorMsgAuditLis是你定义的一个路由模块
          }else {
            this.$alert("审核失败！");
          }
        })
      },
      through() {
        const  loadind =  this.$loading({
          lock: true,
          text: '加载中，请稍等！！！',
        });
        // $("#aaa").show();
        this.$axios({
          url: '/biz/serviceSite/update',
          method: 'post',
          params: {
            organizationId: this.$route.params.organizationId,
            status: 1,   //审核通过
            power: 0    //业务范围
          }
        }).then(res => {
          loadind.close();
          console.log(12345)
          console.log(res)
          // console.log(res)
          if (res.data.status == 200) {
            this.$alert("审核成功！");
            // $("#aaa").hide();
            this.$router.back(-1);
            // this.$router.push('serviceNetworkAudit');//其中operatorMsgAuditLis是你定义的一个路由模块
          }else if (res.data.status == 400 && res.data.msg == "用户名或电话已存在") {
            this.$alert("审核成功！");
            this.$router.back(-1);
          } else {
            this.$alert("审核失败！");
          }
        })
      },
      saveThrough() {
        var obj = document.getElementsByName("card_add");
        for (var i in obj) {
          if (obj[i].checked) {
            check_val.push(obj[i].value);
          }
        }
        var power = 0;
        if (check_val.length < 1) {
          this.$alert("请指定业务范围");
          return
        }
        for (var j in check_val) {
          var val = check_val[j];
          if (val == 1) {
            power = 1
          }
        }
        this.$axios({
          url: '/biz/serviceSite/update',
          method: 'post',
          params: {
            organizationId: this.$route.params.organizationId,
            status: 1,   //审核通过
            power: power    //业务范围
          }
        }).then(res => {
          // console.log(res)
          if (res.data.status == 200) {
            this.$alert("提交成功！");
            $("#aaa").hide();
            this.$router.push('serviceNetworkAudit');//其中operatorMsgAuditLis是你定义的一个路由模块
          }
        })
      },
      cancel() {
        this.info = null;
        this.$router.push('serviceNetworkAudit');//其中operatorMsgAuditLis是你定义的一个路由模块
      }
    }
  }

  //查询证件信息
  function selectCertificate(_this) {
    _this.$axios({
      url: '/biz/serviceSite/selectSiteCard',
      method: 'post',
      params: {organizationId: _this.$route.params.organizationId}
    }).then(res => {
      console.log(111)
      console.log(res)
      if (res.data.status == 200 && res.data.data != null) {
        var list = res.data.data;
        for (var i=0; i < list.length; i++) {
          if (list[i].cardType == 0) {
            _this.certificate1 = list[i];
          } else if (list[i].cardType == 1) {
           // _this.certificate2 = list[i];
          } else if (list[i].cardType == 2) {
            _this.certificate3 = list[i];
          } else if (list[i].cardType == 3) {
            _this.certificate4 = list[i];
          }
        }
      }
    })
  }
</script>

<style scoped>
.nav-titile{
  margin-bottom: 18px;
}
  td:first-child{
    padding-left: 10px;
  }
.tableee td{
  text-align: center;
}
</style>
