<template>
  <!--内容区-->
  <div class="w980 fr">
    <div class="mbx mbxzdy">
      <ul class="ul11 clearfix">
        <li>
          <a href="###" @click.prevent="$router.go(-1)">设备列表&nbsp;&gt;&nbsp;&nbsp;</a>
        </li>
        <li>查看详情</li>
      </ul>
    </div>
    <form action="#">
      <div class="mgt10 k3">
        <div class="h56 lh56 bgf8 pdl30 pdr30 fs16 cor0 fb">
          设备信息
        </div>
        <div class="pdt10 pdb20 pdr30 borb2">

          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">设备编号：</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled :value="devieInfo.deviceNumber">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w100 fl h40 lh40 cor0 pdl30">办理机构：</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled :value="devieInfo.tOrganization
?devieInfo.tOrganization
.organizationName:'无'">
              </div>
            </div>
          </div>

          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">设备状态：</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled :value="devieInfo.deviceStatus==0?'禁用':devieInfo.deviceStatus==1?'启用':'已注销'">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w100 fl h40 lh40 cor0 pdl30">设备类型：</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled :value="devieInfo.deviceType==0?'RF':'项圈'">
              </div>
            </div>
          </div>

          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">设备厂商：</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled :value="devieInfo.tDeviceFactory?devieInfo.tDeviceFactory.deviceFactoryName:'无'">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w100 fl h40 lh40 cor0 pdl30">型号：</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled :value="devieInfo.tDeviceModel?devieInfo.tDeviceModel.deviceModelName:'无'">
              </div>
            </div>
          </div>

          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">录入日期：</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled :value="devieInfo.creationTime | formatDate(datePattern)" v-if="devieInfo.creationTime">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled value="无" v-else>
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w100 fl h40 lh40 cor0 pdl30">出厂日期：</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled :value="devieInfo.productionTime | formatDate(datePattern)" v-if="devieInfo.productionTime">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled value="无" v-else>
              </div>
            </div>
          </div>

          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">批次：</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled :value="devieInfo.deviceBatch">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w100 fl h40 lh40 cor0 pdl30">工作模式：</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled :value="devieInfo.deviceWorkPattern==0?'正常模式':'省电模式'">
              </div>
            </div>
          </div>

          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">上报间隔：</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled :value="devieInfo.uploadIntervalTime?devieInfo.uploadIntervalTime+'毫秒':'0'  +'毫秒'" >
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w100 fl h40 lh40 cor0 pdl30">imei号：</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" disabled :value="devieInfo.imei">
              </div>
            </div>
          </div>
          <!--
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">有效期限</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w100 fl h40 lh40 cor0"><img src="images/bg14.png" alt=""></span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4">
              </div>
            </div>
          </div>
          -->
        </div>
      </div>
      <div class="t-c mgt40 mgb50">
      <a @click.prevent="$router.go(-1)" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort goBack">返&nbsp;&nbsp;&nbsp;回</a>
      <!--<input type="submit" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" value="保存">-->
      <!--<a href="###" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5">取消</a>-->
      </div>
    </form>
  </div>
  <!--内容区END-->
</template>

<script>
  export default {
    name: "operatorDeviceInfo",
    data() {
      return {
        datePattern:'yyyy年MM与dd日',
        devieInfo: {},//设备信息
      }
    },
    created() {
      initData(this)
    }
  }

  function initData(_this) {
    let devId = _this.$route.params.devId
    _this.$axios({
      url: '/biz/device/other/'+devId,
    }).then(res => {
      if (res.data.meta.success) {
        _this.devieInfo = res.data.data;
      }
    })
  }
</script>

<style scoped>
.goBack{
  cursor: pointer;
}
</style>
