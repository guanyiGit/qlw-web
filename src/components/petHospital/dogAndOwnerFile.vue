<template>
  <!--内容区-->
  <div class="w980 fr">

    <!--headler-->
    <div class="ovh">
      <div class="fl cor6 h40 lh40">
        <router-link :to="{name:'addDogOwner'}" class="db fl hov8 corffa472 mgr35 pc9 pdl36">新增犬主</router-link>
      </div>
      <div class="fr db w380 h40 borbfbfbf ras20 rel" action="#">
        <input type="text" @keyup.enter="search" class="db ww100 h38 lh38 pdl15 cor3c3c3c bort" @dblclick="$event.target.select()" v-model="params.string" placeholder="犬主姓名/电话号码">
        <input type="text" value="" class="seachClick in1 db abs z100 top0 bort right0" @click="search" >
      </div>
    </div>
    <!--headler end-->

    <!--table -->
    <div class="mgt10 k3">
      <!--<div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">违法信息</div>-->
      <div class="t-c">
        <table class="table11 t-c" width="100%">
          <tbody>
          <tr>
            <td style="width: 11%">犬主姓名</td>
            <td style="width: 11%">性别</td>
            <td style="width: 11%">联系电话</td>
            <td style="width: 10%">现住县区</td>
            <td style="width: 10%">犬只数量</td>
            <td style="width: 10%">创建时间</td>
            <td style="width: 15%">操作</td>
          </tr>
          <tr v-for="(item,index) in dogOwnerList" :key="index">
            <td class="cor3">{{item.dogOwnerName}}</td>
            <td class="cor3">{{item.sex==0?'男':'女'}}</td>
            <td>{{item.dogOwnerPhone}}</td>
            <td>{{item.districtName}}</td>
            <td>{{item.dogInfo.length}}</td>
            <td>{{item.creationTime|formatDate(dataFormatPattern)}}</td>
            <td class="t-c">
              <router-link class="dinb cor009cff hov8 mgr14"
                           :to="{name:'dogOwnerDetail',params:{dogOwnerId:item.dogOwnerId}}">查看详情
              </router-link>
              <router-link class="dinb cor009cff hov8 mgr14"
                           :to="{name:'addDog',params:{dogOwnerId:item.dogOwnerId}}">新增犬只
              </router-link>
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
    name: "dogAndOwnerFile",
    data(){
      return {
        dataFormatPattern :'yyyy/MM/dd',
        totalCount:0,
        dogOwnerList:[],//免疫登记列表
        page:[],//分页对象
        params:{//请求参数
          num: 1,
          size:6,
          string:'',
          orgId:conf.userInfo.organizationId
        },
      }
    },
    created() {
      initData(this);
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
    },
    computed:{
      pageData(){//分页参数
        return {
          curPage:this.params.num,//当前页吗
          totalCount:this.totalCount,//总条数
          pageSize:this.params.size//页面大小
        }
      }
    }

  }

  function initData(_this){
    _this.$axios({
      method: 'get',
      url: '/biz/dogInfo/findDogOwnerList',
      params: _this.params
    }).then((res) => {
      console.log(res)
      if (res.data.status == 200 && res.data.data != null) {
        _this.dogOwnerList = res.data.data.lists;//
        _this.totalCount = res.data.data.totalRecord
      }
      // console.log(this.$data)
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
