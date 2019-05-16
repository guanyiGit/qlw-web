<template>
  <!--内容区-->
  <div class="w980 fr">
    <div class="ovh">
      <div class="fl w600 k3">
        <div class="h56 lh56 bgf8 pdl30 pdr30 fs16 cor0">
          我的消息 <a href="$$$" class="dinb fr hov8"><img src="images/b19.png" alt=""></a>
        </div>
        <div class="pdt6 pdb15 pdl30 pdr30">
          <ul class="ul13">

            <li v-for="(item,index) in  msgList" :key="index" v-if="msgList && msgList.length>0">
              <a href="###" class="db cor3 h45 lh45 hov8 pdl24 pc3" @click.prevent="check(item)">
                {{item.dicNotiType}}<span class="fr cor9">{{item.creationTime | formatDate(pattern)}}</span>
              </a>
            </li>
            <li v-if="!msgList || msgList.length==0">
              <a href="###" class="db cor3 h45 lh45 hov8 pdl24 pc3">
                暂无消息<span class="fr cor9">--/--/--</span>
              </a>
            </li>

          </ul>
        </div>
      </div>
      <div class="fr w370">
        <div>
          <div class="h80 lh80 pdl75 pdr30 borff6655 ras10 fs18 cor0 pc17">
            今日在线人数<span class="fr">{{todayCount}}</span>
          </div>
          <div class="h80 lh80 pdl75 pdr30 borff9d6d ras10 fs18 cor0 pc18 mgt5">
            今日设备在线数量<span class="fr">{{activeDeviceCount}}</span>
          </div>
          <div class="h80 lh80 pdl75 pdr30 borffcf70 ras10 fs18 cor0 pc19 mgt5">
            今日信息发布条数<span class="fr">{{toDayInfoCount}}</span>
          </div>
        </div>


        <div class="k3 mgt20">
          <div class="h56 lh56 bgf8 pdl30 pdr30 fs16 cor0">设备使用情况</div>
          <div class="h291">
            <div id="main1" ref="chart1" class="ww100 h291"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="k3 mgt20">
      <div class="h56 lh56 bgf8 pdl30 pdr30 fs16 cor0">
        用户在线趋势 <a href="$$$" class="dinb fr hov8"><img src="images/b19.png" alt=""></a>
      </div>
      <div class="h291">
        <div id="main2" class="ww100 h291"></div>
      </div>
    </div>
    <!--弹窗   说明。.db--显示，.dn--隐藏-->
    <div class="T db" style="display: none;z-index: 2;margin-top: 50px">
      <div class="tan6 abs bgw k3 db" style="height: 450px;width: 450px">
        <div class="h60 lh60 pdl30 bgf8 fs16 cor0 fb" style="margin-bottom: 10px;">
          <span>通知信息</span>
          <span style="margin-left: 75%;margin-top: 10%;font-size: 22px;cursor: pointer" @click="hideT">×</span>
        </div>
        <!--<span style="margin-left: 10%;margin-top: 10%;font-size: 16px">×</span>-->
        <div class="ovh">
          <div class="mgt10 ww50 fl" >
            <span class="db w90 fl h40 lh30 cor0 pdl30">标题</span>
            <div class="mgl100">
              <input type="text"style="width: 230%" class="ww100 h30 lh40 pdl20 borf1 ras4" :value="notifTitle">
            </div>
          </div>


        </div>
        <div class="ovh">
          <div class="mgt10 ww50 fl" >
            <span class="db w90 fl h40 lh20 cor0 pdl30">内容</span>
            <div class="mgl100">
              <textarea type="text"style="width: 230%" class="ww100 h40 lh40 pdl20 borf1 ras4" :value="notiContent"></textarea>
            </div>
          </div>


        </div>
        <div class="ovh">
          <div class="mgt10 ww50 fl" >
            <span class="db w90 fl h40 lh20 cor0 pdl30">创建时间</span>
            <div class="mgl100">
              <input type="text"style="width: 230%" class="ww100 h30 lh40 pdl20 borf1 ras4" :value="creationTime |formatDate(pattern)">
            </div>
          </div>


        </div>

      </div>
    </div>
    <!--弹窗END-->
  </div>
  <!--内容区END-->
</template>

<script>
  import echarts from 'echarts'
  import configJs from '../../common/config'
  let params = {
    offset: 1,
    limit: 10,
    userId: 0,
    status:0
  }
  export default {
    name: "operatorIndex",
    data() {
      return {
        todayCount: 0,//今日在线人数
        activeDeviceCount: 0,//今日在线人数设备在线数量
        toDayInfoCount: 0,//今日信息发布条数
        deviceActiveScale: [],//设备使用情况
        userActiveTendency: {},//用户在线趋势
        msgList: [],//我的消息列表
        pattern: 'yyyy-MM-dd HH:mm:ss',
        params:params,
        notifId:0,
        notifTitle:null,
        notiContent:null,
        creationTime:null
      }
    },
    mounted() {

    },
    created() {
      this.params.userId=configJs.userInfo.userId;
      try {
        this.$store.commit('changMemuIndex',-1);
        localStorage.setItem("memuIndex",-1);
      }catch (e) {console.log(e)}
      findTodayOnlineCounts(this);
      dayDeviceActiveSum(this);
      findTodayInformationCount(this);
      findDeviceList(this);
      findStatisticLogUserTendency(this);
      getInformations(this);
    },
    methods: {
      hideT(){
        $(".T").hide();
      },
      check: function (item){
        this.notifId=item.notifId;
          update(this);
        this.notifTitle=item.notifTitle;
        this.notiContent=item.notiContent;
        this.creationTime=item.creationTime;
        $(".T").show();
      },
    }

  }


  //1.今日在线人数
  function findTodayOnlineCounts(_this) {
    _this.$axios({url: "/biz/statistic/findTodayOnlineCounts",})
      .then(res => {
        if (res.data.meta.success) {
          _this.todayCount = res.data.data;
        }
      })
  }

  //今日设备在线数量
  function dayDeviceActiveSum(_this) {
    _this.$axios({
      url: "/biz/statistic/dayDeviceActiveSum",
      params: {"date": new Date()}
    }).then(res => {
      if (res.data.meta.success) {
        _this.activeDeviceCount = res.data.data;
      }
    })


  }

  //2.今日信息发布条数
  function findTodayInformationCount(_this) {
    _this.$axios({url: "/biz/statistic/findTodayInformationCount",})
      .then(res => {
        if (res.data.meta.success)
          _this.toDayInfoCount = res.data.data;
      })
  }

  //3.设备使用情况
  function findDeviceList(_this) {
    _this.$axios({url: "/biz/statistic/findDeviceList",})
      .then(res => {
        if(res.data.meta.success){
          _this.deviceActiveScale = res.data.data;
        }
      }).finally(_=>{initEchars1(_this);})
  }

  //4.用户在线趋势
  function findStatisticLogUserTendency(_this) {
    _this.$axios({url: "/biz/statistic/findStatisticLogUserTendency",})
      .then(res => {
        if(res.data.meta.success && res.data.data){
          const counts = [];
          let dates = res.data.data.map(x=>{
            counts.push(x.logCounts);
            return x.date;
          });
          _this.userActiveTendency = {dates,counts};
        }
      }).finally(_=>{initEchars2(_this);})
  }

  //5.查看信息列表
  function getInformations(_this) {
    _this.$axios({
      url: "/biz/notice/noticeList",
      params: _this.params
    }).then(res => {
      _this.msgList = res.data.data.list;
    })

  }
  //6.更新通知已读
  function update(_this) {
    _this.$axios({
      url: '/biz/notice/updateNotice',
      method: 'get',
      params:{noticeId:_this.notifId}
    }).then(res => {

      if (res.data.data==1){
        getInformations(_this);
      }
    })
  }
  function initEchars1(_this) {
    let myChart1 = echarts.init(document.getElementById('main1'));
    let option = {
      title: {
        text: '设备使用情况',
        subtext: '大致比例图',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          name: '占比',
          type: 'pie',
          radius: '60%',
          center: ['50%', '60%'],
          data:_this.deviceActiveScale
            //[ {value: 335, name: '直接访问'},
            // {value: 310, name: '邮件营销'},]
          ,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    myChart1.setOption(option);
  }

  function initEchars2(_this) {
    let myChart2 = echarts.init(document.getElementById('main2'));
    let option = {
      tooltip: {
        trigger: 'axis'
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data:_this.userActiveTendency.dates,
          // data: ['2017-09', '2017-10', '2017-11', '2017-12', '2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '数量',
          type: 'line',
          smooth: true,
          itemStyle: {normal: {areaStyle: {type: 'default'}}},
          data:_this.userActiveTendency.counts,
          // data: [160, 230, 160, 260, 230, 310, 260, 230, 210, 140, 90, 20]
        },
      ]
    };
    myChart2.setOption(option);
  }
</script>

<style scoped>

</style>
