
<template>
  <!--内容区-->
  <div class="w980 fr">
    <div class="ovh div1 h50 rel">
      <p class="abs ww100 left0 bottom0"></p>
      <a href="javascript:void(0);" class="fl db fs16 cor3c3c3c w200 h50 lh50 t-c active" @click.prevent="checkTab = 0">未读</a>
      <a href="javascript:void(0);" class="fl db fs16 cor3c3c3c w200 h50 lh50 t-c" @click.prevent="checkTab = 1">已读</a>
    </div>
    <div class="div12 db mgt20">
      <ul class="ul05">
        <li v-for="(item,index) in  list" :key="index">
          <a class="db h50 lh50 pdl24 pdr10 ovh fs14 cor3" @click.prevent="check(item)">
            {{item.notifTitle}}
          </a>
        </li>
      </ul>
    </div>
    <div class="div12 dn mgt20">
      <ul class="ul05">
        <li v-for="(item,index) in  list" :key="index">
          <a  class="db h50 lh50 pdl24 pdr10 ovh fs14 cor3" @click.prevent="check(item)">
            {{item.notifTitle}}
          </a>
        </li>
      </ul>
    </div>
    <!--分页-->
    <page-vue :pageData="pageData" @chekdpageCallcak="chekdpage"></page-vue>
    <!--分页-->

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
              <textarea type="text"style="width: 230%" class="ww100 h200 lh40 pdl20 borf1 ras4" :value="notiContent"></textarea>
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
</template>

<script>
  import configJs from '../../common/config'
  var _this = ''

  export default {
    name: "message",
    data() {
      return {
        checkTab:0,//页签tab
        pattern: 'yyyy-MM-dd HH:mm:ss',
        totalCount: 0,
        list: [],
        params:{
          offset: 1,
          limit: 10,
          userId: 0,
          status:0
        },
        notifId:0,
        notifTitle:null,
        notiContent:null,
        creationTime:null
      }
    },
    methods: {
      //分页
      chekdpage(currentPage) {
        this.params.offset = currentPage//页码
        initData()
      },
      check: function (item){
        this.notifId=item.notifId;
        if(this.checkTab==0){
          update();
        }
        this.notifTitle=item.notifTitle;
        this.notiContent=item.notiContent;
        this.creationTime=item.creationTime;
        $(".T").show();
      },
      hideT(){
        $(".T").hide();
      }

    },
    computed: {
      //分页参数
      pageData() {
        return {
          curPage: this.params.offset,//当前页吗
          totalCount: this.totalCount,//总条数
          pageSize: this.params.limit//页面大小}
        }
      },
    },
    created() {
      this.params.userId=configJs.userInfo.userId;
      initData()
    },
    beforeCreate(){
      _this=this;
    },
    mounted(){
      var $tab3= $('.div1>a');
      $tab3.click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        var i= $tab3.index(this);
        $('.div12').eq(i).show().siblings('.div12').hide();
      });
    },
    watch:{
      checkTab(newVal,oldVal){

        if(newVal != oldVal) {
          this.params.offset=1
          this.params.status =  newVal;//切换tab
          initData()
        }
      },

    }

  }

  function initData() {
    _this.$axios({
      url: '/biz/notice/noticeList',
      method: 'get',
      params:_this.params
    }).then(res => {
      _this.totalCount = res.data.data.total;
      _this.list = res.data.data.list;
    })
  }

  function update() {
    _this.$axios({
      url: '/biz/notice/updateNotice',
      method: 'get',
      params:{noticeId:_this.notifId}
    }).then(res => {

      if (res.data.data==1){
        initData()
      }
    })
  }

</script>

<style scoped>
  .pc3 {
    background-position-y: 16px;
  }

  .mar30 {
    margin-right: 30px;
  }
</style>
