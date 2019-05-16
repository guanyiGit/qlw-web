<template>
  <!--内容区-->
  <div class="w980 fr">
    <div class="k4 ovh clearfix">
      <a href="javascript:void(0)" class="db fl ovh">
        <div class="fl pdt40"><img src="/static/images/b18-1b.png" alt=""></div>
        <div class="mgl60 pdt30">
          <p class="fs30 corw fb">{{yesterdayAddDog}}</p>
          <p class="fs18 corw mgt6">昨日新增犬只</p>
        </div>
      </a>
      <a href="javascript:void(0)" class="db fl ovh">
        <div class="fl pdt40"><img src="/static/images/b18-2b.png" alt=""></div>
        <div class="mgl60 pdt30">
          <p class="fs30 corw fb">{{yesterdayCancelDog}}</p>
          <p class="fs18 corw mgt6">昨日注销犬只</p>
        </div>
      </a>
      <a href="javascript:void(0)" class="db fl ovh">
        <div class="fl pdt40"><img src="/static/images/b18-3b.png" alt=""></div>
        <div class="mgl60 pdt30">
          <p class="fs30 corw fb">{{yesterdayIllegalCounts}}</p>
          <p class="fs18 corw mgt6">昨日违法次数</p>
        </div>
      </a>
    </div>
    <div class="mgt20 ovh">

      <div class="fl w650 k3">
      <!--全市犬只分布轮播-->
        <div id="Carousel3">
          <ul class="carouselUl3">

            <li>
              <div class="ovh h285 pdl20 w650">
                <div id="main4" class="h285 w300 fl"></div>
                <div class="ww40 fr pdt40 pdr20">
                  <table class="table7" width="100%" border="1">
                    <tbody>
                    <tr v-for="(item,index) in staticDogAges" :key="index">
                        <td class="cor6 h40 ww50 t-c">{{item.name}}</td>
                        <td class="cor6 h40 ww50 t-c">{{item.value}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="ovh h285 pdl20 w650">
                <div id="main5" class="h285 w300 fl"></div>
                <div class="ww40 fr pdt100 pdr20">
                  <table class="table7" width="100%" border="1">
                    <tbody>
                      <tr v-for="(item,index) in staticDogGenders" :key="index">
                        <td class="cor6 h40 ww50 t-c">{{item.name}}</td>
                        <td class="cor6 h40 ww50 t-c">{{item.value}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </li>

            <li>
              <div class="ovh w650">
                <div id="main6" class="h285 w650"></div>
                <div class="ww100 pdt40 pdl20 pdr20">
                  <table class="table7" width="100%" border="1">
                    <tbody>
                      <tr v-for="(item,index) in staticDogAges" :key="index">
                        <td class="cor6 h40 ww50 t-c" v-if="item.name">{{item.name}}</td>
                        <td class="cor6 h40 ww50 t-c" v-else>其他年龄段</td>
                        <td class="cor6 h40 ww50 t-c">{{item.value}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </li>


            <li>
              <div class="ovh w650">
                <div id="main7" class="h285 w650"></div>
                <div class="ww100 pdt40 pdl20 pdr20">
                  <table class="table7" width="100%" border="1">
                    <tbody>
                      <tr v-for="(item,index) in staticDogTypesEdit" :key="index">
                        <td class="cor6 h40 ww16 t-c">{{item.obj[0] && item.obj[0].name ? item.obj[0].name : ''}}</td>
                        <td class="cor6 h40 ww16 t-c">{{item.obj[0] && item.obj[0].value ? item.obj[0].value : ''}}</td>
                        <td class="cor6 h40 ww16 t-c">{{item.obj[1] && item.obj[1].name ? item.obj[1].name : ''}}</td>
                        <td class="cor6 h40 ww16 t-c">{{item.obj[1] && item.obj[1].value ? item.obj[1].value : ''}}</td>
                        <td class="cor6 h40 ww16 t-c">{{item.obj[2] && item.obj[2].name ? item.obj[2].name : ''}}</td>
                        <td class="cor6 h40 ww16 t-c">{{item.obj[2] && item.obj[2].value ? item.obj[2].value : ''}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </li>

          </ul>
          <div class="page3"></div>
        </div>
        <!--全市犬只分布轮播-->
      </div>


      <div class="fr w320">
        <div class="ovh k5 t-c">
          <router-link :to="{name:'dogManager_list'}" class="db fl h144 pdt30">
            <p class="fs36 corff6655">{{staticDogSites.dog}}</p>
            <p class="fs18 cor6 mgt20">犬只</p>
          </router-link>
          <router-link :to="{name:'dogManager_owners_list'}" class="db fl h144 pdt30">
            <p class="fs36 corffa273">{{staticDogSites.dogOwner}}</p>
            <p class="fs18 cor6 mgt20">犬主</p>
          </router-link>
          <router-link :to="{name:'dogManager_serviceNetwork'}" class="db fl h144 pdt30">
            <p class="fs36 cor41c7db">{{staticDogSites.serveSite}}</p>
            <p class="fs18 cor6 mgt20">服务网点</p>
          </router-link>
        </div>
        <div class="k3 mgt20">
          <div class="h60 lh60 bgf8 pdl30 pdr30 fs16 cor0">
            上月违法次数<a href="javascript:void(0)" class="dinb fr"><img src="/static/images/bg17.png" alt=""></a>
          </div>
          <div class="h406">
            <ul>
              <li class="bor-be pdl30 pdr30 ovh pdt20 pdb20" v-for="(item,index) in staticDogLastMonthIllegalCount" :key="index" >
                <span class="db fl w26 h26 lh26 t-c corw spp1">{{index+1}}</span>
                <p class="fl h26 lh26 mgl13">{{item.districtName}}</p>
                <p class="fr h26 lh26">{{item.illegalCounts}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="k3 mgt20">
      <div class="h60 lh60 bgf8 pdl30 pdr30 fs16 cor0">
        犬只数量趋势<select class="w120 h30 lh30 bore ras4 mgt15 mgl15 pdl10 cor3 pc13 curpoint" v-model="addDogMonth">
        <option value="1">近一年</option>
        <option value="2">近二年</option>
      </select><a href="javascript:void(0);" class="dinb fr"><img src="/static/images/bg17.png" alt=""></a>
      </div>
      <div class="h285">
        <div ref="echarts5" class="h285 ww100"></div>
      </div>
    </div>
    <div class="k3 mgt20">
      <div class="h60 lh60 bgf8 pdl30 pdr30 fs16 cor0">
        违法次数趋势<select class="w120 h30 lh30 bore ras4 mgt15 mgl15 pdl10 cor3 pc13 curpoint" v-model="IllegalTrendMonth">
        <option value="1">近一年</option>
        <option value="2">近二年</option>
      </select><a href="javascript:void(0)" class="dinb fr"><img src="/static/images/bg17.png" alt=""></a>
      </div>
      <div class="h285">
        <div ref="echarts6" class="h285 ww100"></div>
      </div>
    </div>
  </div>
  <!--内容区END-->

</template>

<script>
  // 引入 ECharts 主模块
  import echarts from 'echarts';
  // 引入柱状图
  import 'echarts/lib/chart/bar';
  // 引入提示框和标题组件
  import 'echarts/lib/component/tooltip';
  import 'echarts/lib/component/title';
  import Swiper from 'swiper';

  import '../../../static/css/cycle.css'

  export default {
    name: "dogManagerIndex",
    data() {
      return {
        yesterdayAddDog: 0,//昨日新增数量
        yesterdayCancelDog: 0,//昨日注销数量
        yesterdayIllegalCounts: 0,//昨日违法数量
        staticDogTypes: [],//犬品种分布
        staticDogAges: [],//犬年龄分布
        staticDogAreas: [],//犬只区域分布
        staticDogGenders: [],//犬只性别分布
        staticDogSites: [],//统计犬只、犬主、服务网点
        staticDogIllegalTendencys: {},//违法统计趋势分析
        staticDogAddByMonthTendencys: [],//每月犬只新增数量趋势
        staticDogLastMonthIllegalCount: [],//上月违法次数数量趋势
        staticLastMonthDogIllegalCounts: {},//上月违法次数趋势
        staticIllegalTendencys: [],//每月犬只违法数量趋势
        IllegalTrendMonth: 1,//默认查看12个月的违法趋势
        addDogMonth: 1,//默认查看12个月的新增趋势
      }
    },
    watch: {
      addDogMonth(newVal, oldVal) {
        if (newVal != oldVal) findLastMonthDogIllegalCounts(this)
      },
      IllegalTrendMonth(newVal, oldVal) {
        if (newVal != oldVal) findDogIllegalCountsTendency(this)
      }
    },
    mounted() {
      InitSwoiper(this);
      initSwiper(this);
    },
    computed:{
      staticDogTypesEdit(){
        let result = [];
        let temp = [];
        for(let i = 1 ; i <= this.staticDogTypes.length ; i++){
          temp.push(this.staticDogTypes[i]);
          if(i % 3 ==0 ){
            result.push({"obj":temp});
            temp = [];
          }
        }
        return result;
      }
    },
    created() {
      try {
        this.$store.commit('changMemuIndex',-1);
        localStorage.setItem("memuIndex",-1);
      }catch (e) {console.log(e)}

      this.$axios.all([
        //统计昨日新增/注销犬只/违法次数
        initDatastatisticTitileCount(this),
        //统计犬只品种分布
        initDataStaticDogTypes(this),
        //犬龄分布
        initDataStaticDogAges(this),
        //区域分布
        initDataStaticDogAreas(this),
        //性别分布
        initDataStaticDogGenders(this),
        //统计犬只、犬主、服务网点
        initDataStaticDogSites(this),
        //上月违法次数
        findDogLastMonthIllegalCount(this),
        //每月犬只新增数量趋势
        findLastMonthDogIllegalCounts(this),
        //违法趋势
        findDogIllegalCountsTendency(this),

      ])
        .then(this.$axios.spread(function (acct, perms) {
          // 两个请求现在都执行完成
        }));

    }
  }

  //统计昨日新增/注销犬只/违法次数
  function initDatastatisticTitileCount(_this) {
    _this.$axios({
      url: "/biz/statistic/findYesterDayDogMsg",
    }).then((res) => {
      if (res.data.meta.success) {
        _this.yesterdayAddDog = res.data.data.yesterdayAddDog
        _this.yesterdayCancelDog = res.data.data.yesterdayCancelDog
        _this.yesterdayIllegalCounts = res.data.data.yesterdayIllegalCounts
      }
    })
  }

  //统计犬只品种分布
  function initDataStaticDogTypes(_this) {
    _this.$axios({url: '/biz/statistic/findDogBreedsCounts'})
      .then((res) => {
        if (res.data.meta.success) {
          _this.staticDogTypes = res.data.data;
          initEcharts4(_this)
        }
      })
  }

  //犬龄分布
  function initDataStaticDogAges(_this) {
    _this.$axios({url: '/biz/statistic/findDogAgeCounts'})
      .then((res) => {
        if (res.data.meta.success) {
          _this.staticDogAges = res.data.data;
          initEcharts3(_this)
        }
      })
  }

  //区域分布
  function initDataStaticDogAreas(_this) {
    _this.$axios({url: '/biz/statistic/findDogCountsByDistrict'})
      .then((res) => {
        if (res.data.meta.success) {
          _this.staticDogAreas = res.data.data;
          initEcharts1(_this);
        }
      })
  }

  //性别分布
  function initDataStaticDogGenders(_this) {
    _this.$axios({url: '/biz/statistic/findDogGenderCounts'})
      .then((res) => {
        if (res.data.meta.success) {
          _this.staticDogGenders = res.data.data;
          initEcharts2(_this)
        }
      })
  }

  //统计犬只、犬主、服务网点
  function initDataStaticDogSites(_this) {
    _this.$axios({url: '/biz/statistic/findDogOwnerAndSite'})
      .then((res) => {
        if (res.data.meta.success) {
          _this.staticDogSites = res.data.data;
        }
      })
  }

  //违法统计趋势分析
  function findDogIllegalCountsTendency(_this) {
    _this.$axios({url: '/biz/statistic/findDogIllegalCountsTendency', params: {"count": _this.IllegalTrendMonth * 12}})// 月数默认12个月
      .then((res) => {
         if (res.data.meta.success) {
          let dateArr = [];
          let countArr = [];
          for (let temp of res.data.data.totalIllegalCountsTendency) {
            dateArr.push(temp.illegalDate);
            countArr.push(temp.illegalCounts);
          }
          _this.staticDogIllegalTendencys = {dateArr, countArr}
          initEcharts6(_this)
        }
      })
  }

  //上月违法次数
  function findDogLastMonthIllegalCount(_this) {
    _this.$axios({url: '/biz/statistic/findDogIllegalCountsTendency', params: {"count": 1}})//TODO 月数
      .then((res) => {

        if (res.data.meta.success) {
          _this.staticDogLastMonthIllegalCount = res.data.data.illegalCountsTendency;
        }
      })
  }

  //每月犬只数量趋势
  function findLastMonthDogIllegalCounts(_this) {
    _this.$axios({url: '/biz/statistic/findDogCountsTendency', params: {"count": _this.addDogMonth * 12}})//TODO 月数
      .then((res) => {
        if (res.data.meta.success && res.data.data) {
          let dateArr = res.data.data;
          // let countArr = res.data.data.totalMonthAdd;
           _this.staticLastMonthDogIllegalCounts.dateArr = dateArr;
          // //_this.staticLastMonthDogIllegalCounts.countArr = countArr;
          initEcharts5(_this)
        }
      })
  }

  //区域
  function initEcharts1(_this) {
    let myChart4 = echarts.init(document.getElementById('main4'));
    let option4 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name:'区域分布',
                type:'pie',
                radius: ['40%', '60%'],
                label: {
                    normal: {
                        backgroundColor: '#eee',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        borderRadius: 4,
                        rich: {
                            a: {
                                color: '#999',
                                lineHeight: 22,
                                align: 'center'
                            },
                            hr: {
                                borderColor: '#aaa',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 16,
                                lineHeight: 33
                            },
                            per: {
                                color: '#eee',
                                backgroundColor: '#334455',
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    }
                },
                data:_this.staticDogAreas
            }
        ]
    };
    myChart4.setOption(option4);

  }

  //性别分布
  function initEcharts2(_this) {

    let myChart5 = echarts.init(document.getElementById('main5'));
    let option5 = {
        tooltip: {
            trigger: '性别分布',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['40%', '60%'],
                label: {
                    normal: {
                        backgroundColor: '#eee',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        borderRadius: 4,
                        rich: {
                            a: {
                                color: '#999',
                                lineHeight: 22,
                                align: 'center'
                            },
                            hr: {
                                borderColor: '#aaa',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 16,
                                lineHeight: 33
                            },
                            per: {
                                color: '#eee',
                                backgroundColor: '#334455',
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    }
                },
                data:_this.staticDogGenders
            }
        ]
    };
    myChart5.setOption(option5);
  }

  //年龄分布
  function initEcharts3(_this) {


    let myChart6 = echarts.init(document.getElementById('main6'));
    let option6 = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [
            {
               name:'年龄分布',
               type:'pie',
            },
            {
                name:'面积模式',
                type:'pie',
                radius : [20, 110],
                center : ['50%', '50%'],
                roseType : 'area',
                data:_this.staticDogAges
            }
        ]
    };
    myChart6.setOption(option6);
  }

  //品种分布
  function initEcharts4(_this) {
    let myChart7 = echarts.init(document.getElementById('main7'));
    let option7 = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [
            {
                name: '品种分布',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:_this.staticDogTypes,
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
    myChart7.setOption(option7);


  }


  function InitSwoiper(_this) {
    let swiper5 = new Swiper('#swiper1', {
      loop: true,
      // speed: 5000,
      speed: 5000,
      autoplay: {
        delay: 10,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination1',
        clickable: true,
      },
      /*observer: true,
       observeParents: true,*/
    });
  }

  //近一年新增犬只数量统计 [犬只数量趋势]
  function initEcharts5(_this) {
    let set = _this.$refs.echarts5
    let myChart5 = echarts.init(set);
    //时间
    let dates = _this.staticLastMonthDogIllegalCounts.dateArr.map(item=>{
      return formartDate(item.date);
    })
    //数量
    let counts = _this.staticLastMonthDogIllegalCounts.dateArr.map(item=>{
     return  item.dogCount;
    })
    let option = {
      tooltip: {
        trigger: 'axis'
      },
      // legend: {
      //      data:['意向','预购','成交']
      //  },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: dates,
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
          data: counts,
          // data: [160, 230, 160, 260, 230, 310, 260, 230, 210, 140, 330, 180]
        },
      ]
    };
    myChart5.setOption(option)
  }

  //违法次数趋势
  function initEcharts6(_this) {
    let set = _this.$refs.echarts6
    let myChart6 = echarts.init(set);
    let option = {
      tooltip: {
        trigger: 'axis'
      },
      // legend: {
      //      data:['意向','预购','成交']
      //  },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: _this.staticDogIllegalTendencys.dateArr,
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
          data: _this.staticDogIllegalTendencys.countArr,
          // data: [120, 230, 140, 260, 430, 310, 220, 120, 120, 80, 120, 380]
        },
      ]
    };
    myChart6.setOption(option)
  }

 function formartDate(time) {
   var time = new Date(time);
    var y = time.getFullYear();
    var m = time.getMonth()+1;

    return y+'-'+add0(m);
  }

  function add0(m){
    return m<10?'0'+m:m;
  }


  function initSwiper(_this){

    $('.carouselUl3') .cycle({
      fx:'scrollLeft',
      // timeout: 2000,
      timeout: 200000,
      pager:'.page3',
      speed:700,
      randomizeEffects:1,
      prev:'.prev3',
      next:'.next3',
      pagerEvent: 'mouseover',
      pause: true,
      manualTrump: true,
    });


  }



</script>

<style scoped>

</style>
