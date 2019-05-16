<template>
  <!--内容区-->
  <div class="w980 fr">
    <div class="ovh">
      <div class="fl cor6 h40 lh40">
        <router-link :to="{name:'hospital_IllnessAdd'}" class="db fl hov8 corffa472 mgr35 pc9 pdl36">新增病历</router-link>
      </div>
      <form class="fr db w380 h40 borbfbfbf ras20 rel" action="#">
        <input type="text" class="db ww100 h38 lh38 pdl15 cor3c3c3c bort" @dblclick="$event.target.select()" @keyup.enter="search" v-model="params.input" placeholder="电话/犬主姓名">
        <input type="submit" value="" class="in1 db abs z100 top0 bort right0" @click.prevent="search">
      </form>
    </div>

    <div class="mgt10 k3">
      <div>
        <table class="table5" width="100%" border="1">
          <tbody>
          <tr>
            <td class="cor0 h60 bgf1 t-l pdl100 ww30">犬只信息</td>
            <td class="cor0 h60 bgf1 t-c">犬主</td>
            <td class="cor0 h60 bgf1 t-c">犬证号</td>
            <td class="cor0 h60 bgf1 t-c">免疫证号</td>
            <td class="cor0 h60 bgf1 t-c">操作</td>
          </tr>
          <tr v-for="(item,index) in banEList " :key="index">

            <td class="pdt20 pdb20 ww30">
              <div class="ovh t-l">
                <div class="fl w76">
                  <img v-if="item.imageList[0]&&item.imageList[0].thumbnailUrl" v-bind:src="item.imageList[0].thumbnailUrl" alt="">
                  <img src="ss" alt="" v-else>
                </div>
                <div class="mgl98">
                  <div class="cor0 h22 lh22">
                    <span class="mgr15">{{item.dogName}}</span><!--<a href="###" class="dinb a5 w66 h22 lh22 t-c fs12 corw hov8 mgl5">犬证超期</a><a href="###" class="dinb a6 w66 h22 lh22 t-c fs12 corw hov8 mgl5">年检超期</a>-->
                  </div>
                  <div class="cor9 mgt10 ovh">
                    <p class="fl mgr30">性别：{{item.dogGender==0?'雄':'雌'}}</p>
                    <p class="fl" v-if="item.dogBreedDictionary&&item.dogBreedDictionary.dictionaryDescribe">品种：{{item.dogBreedDictionary.dictionaryDescribe}}</p>
                    <p class="fl" v-else>品种：</p>
                  </div>
                  <div class="cor9 mgt10 ovh">
                    <p class="fl mgr30" v-if="item.birthTime">年龄：{{item.birthTime}}</p>
                    <p class="fl mgr30" v-else>年龄：</p>
                    <p class="fl" v-if="item.dogColorDictionary&&item.dogColorDictionary.dictionaryDescribe">毛色：{{item.dogColorDictionary.dictionaryDescribe}}</p>
                  </div>
                </div>
              </div>
            </td>
            <td class="t-c" v-if="item.dogOwner.dogOwnerName">{{item.dogOwner.dogOwnerName}}<br/><br/>{{item.dogOwner.dogOwnerPhone}}</td>
            <td class="t-c" v-else></td>
            <td class="t-c" v-if="item.tDogCard&&item.tDogCard.dogCardNum">{{item.tDogCard.dogCardNum}}</td>
            <td class="t-c" v-else></td>
            <td class="t-c" v-if="item.dogImmune&&item.dogImmune.immuneCardNum">{{item.dogImmune.immuneCardNum}}</td>
            <td class="t-c" v-else></td>
            <td class="t-c">
              <router-link class="dinb cor009cff hov8" :to="{name:'hospital_txyinfo',params:{'dogId':item.dogId}}">病历记录</router-link>
              <!--<a href="/#/dogManager/dogManagerIllnessDatails" class="dinb cor009cff hov8">病历记录</a><br/>-->
              <!--<br/>
              <a href="###" class="dinb cor009cff hov8">发消息</a>-->
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--分页-->
      <page-vue :pageData="pageData" @chekdpageCallcak="chekdpage"></page-vue>
      <!--分页-->
    </div>

  </div>
  <!--内容区END-->
</template>

<script>
  import  conf from "../../common/config"

  export default {
    name: "operatorMsgAuditList"
    ,data() {
      return {
        page:[],//分页对象
        banEList: [],//病历列表
        dataFormatPattern :'yyyy年MM月dd日',
        params: {
          num: 1,//页码
          size: 5,//页面大小
          input: '',  //keyword
          orgId:conf.userInfo.organizationId,
        }
      }
    }, created() {
      initData(this)
    },mounted(){
    },
    watch:{
    },
    methods: {
      chekdpage(pageNum){
        this.params.num = pageNum
        initData(this)
      },
      //搜索
      search(){
        this.params.index = 1
        this.params.pageSize = 5
        initData(this)
      }
    },
    computed: {
      pageData(){//分页参数
        let _this = this;
        return {
          curPage:_this.page.pageNum,//当前页吗
          totalCount:_this.page.totalCount,//总条数
          pageSize:_this.page.pageSize//页面大小
        }
      }
    }
  }

  //查询列表
  function initData(_this) {
    if(!_this.params.input || _this.params.input.trim().length==0){
      delete _this.params.input
    }else {
      _this.params.input=_this.params.input.trim()
    }
    _this.$axios({
      url: '/biz/dogInfo/findTherapyList',
      params:_this.params
    }).then((res) => {
      if(res.data){
        _this.page = res.data.pageInfo;
        _this.banEList = res.data.list
        // console.log(_this.banEList)
        //debugger
        for (let i=0;i<_this.banEList.length;i++){
          if(_this.banEList[i].birthTime!=null&&_this.banEList[i].birthTime!=''){
            //console.log("======"+i)
            _this.banEList[i].birthTime=CalAge(_this.banEList[i].birthTime)
            //console.log("转换年龄:"+_this.banEList[i].birthTime)
          }
        }
      }
    }).catch((res) => {})

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

</style>
