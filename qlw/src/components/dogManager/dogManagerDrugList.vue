<template>
  <!--内容区-->
  <div class="w980 fr">

    <!--headler-->
    <div class="ovh">
      <div class="fl cor6 h40 lh40">
        <router-link :to="{name:'hospital_DrugAdd'}" class="db fl hov8 corffa472 mgr35 pc9 pdl36">新建档案</router-link>
      </div>
      <form class="fr db w380 h40 borbfbfbf ras20 rel" action="#">
        <input type="text" @keyup.enter="search" class="db ww100 h38 lh38 pdl15 cor3c3c3c bort" @dblclick="$event.target.select()" v-model="params.input" placeholder="犬主姓名/手机号/证件号">
        <input type="text" value="" class="seachClick in1 db abs z100 top0 bort right0" @click="search" >
      </form>
    </div>
    <!--headler end-->

    <!--table -->
    <div class="mgt10 k3">
      <!--<div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">违法信息</div>-->
      <div class="t-c">
        <table class="table11 t-c" width="100%">
          <tbody>
          <tr>
            <td>犬只名称</td>
            <td>犬只品种</td>
            <td>性别</td>
            <td>犬龄</td>
            <td>毛色</td>
            <td>犬主姓名</td>
            <td>联系电话</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item,index) in mmuneList" :key="index">
            <td v-if="item.dog_name">{{item.dog_name}}</td>
            <td v-else>···</td>
            <td v-if="item.breed">{{item.breed}}</td>
            <td v-else>···</td>
            <td v-if="item.dog_gender!=null&&item.dog_gender!==''">{{item.dog_gender==0?'雄':'雌'}}</td>
            <td v-else>···</td>
            <td v-if="item.birth_time">{{item.birth_time}}</td>
            <td v-else>···</td>
            <td v-if="item.color">{{item.color}}</td>
            <td v-else>···</td>
            <td v-if="item.dog_owner_name">{{item.dog_owner_name}}</td>
            <td v-else>···</td>
            <td v-if="item.dog_owner_phone">{{item.dog_owner_phone}}</td>
            <td v-else>···</td>
            <td>
              <router-link class="dinb cor009cff hov8" :to="{name:'hospital_DrugDatail',params:{'VIId':item.vaccine_register_id}}">喂药记录</router-link>
            </td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>
    <!--table end-->

    <!--分页-->
    <page-vue :pageData="pageData" @chekdpageCallcak="chekdpage"></page-vue>
    <!--分页-->

  </div>
  <!--内容区END-->
</template>

<script>
  import conf from "../../common/config"
  export default {
    name: "dogManagerDrugList",
    data(){
      return {
        mmuneList:[],//免疫登记列表
        page:[],//分页对象
        params:{//请求参数
          num: 1,
          size:6,
          input:''
          ,org_id:conf.userInfo.organizationId
        },dataFormatPattern :'yyyy/MM/dd',

      }
    },
    created() {
      initData(this)
    },
    mounted(){
    },
    watch:{
    },
    methods:{
      search(){//搜索
        this.params.num = 1
        this.params.size = 6
        initData(this)
      },
      chekdpage(pageNum){
        this.params.num = pageNum
        initData(this)
      },
      selectAll(){//全选
        /*this.dogList.map(item=>{

        })*/
      }
    },
    computed:{
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

  function initData(_this) {
    /*if(!_this.params.input || _this.params.input.trim().length==0){
      delete _this.params.input//判断查询参数
    }*/
    _this.params.input=_this.params.input.trim()
    _this.params.org_id=conf.userInfo.organizationId
    _this.$axios({
      method: 'post',
      url: '/biz/dogInfo/tVaccineList',
      params: _this.params
    }).then((res) => {
      if (res.data) {
        _this.mmuneList = res.data.list;
        _this.page = res.data.pageInfo;
        console.log("res.data.list+++"+res.data.list)
        console.log("_this.mmuneList+++"+_this.mmuneList)
      }
    }).catch((err) => {
      console.log(err);
    })
  }
</script>

<style scoped>
  .seachClick:hover{
    cursor: pointer;
  }

</style>
