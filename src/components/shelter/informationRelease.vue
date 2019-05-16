<template>
    <!--信息发布-->
  <div class="fr">
    <!--内容区-->
    <div class="w980 fr">
      <div class="ovh">
        <div class="fl cor6 h40 lh40">
          <router-link style="cursor:pointer;" class="db fl hov8 corffa472 mgr35 pc23 pdl36" :to="{name:path}">信息发布</router-link>
        </div>
        <form class="fr db w380 h40 borbfbfbf ras20 rel" action="#">
          <input type="text" class="db ww100 h38 lh38 pdl15 cor3c3c3c bort" placeholder="标题" v-model="keyWord" @keyup.enter="search">
          <input style="cursor:pointer;" value="" class="in1 db abs z100 top0 bort right0" @click.prevent="search">
        </form>
      </div>
      <div class="k3 mgt20">
        <table class="table11">
          <tbody>
          <tr>
            <td class="ww38">标题</td>
            <td>类型</td>
            <td>发布时间</td>
            <td>状态</td>
            <td>操作</td>
          </tr>
          <tr v-for="item in lawEList">
            <td>{{item.infoTitile}}</td>
            <td>{{item.informationTypeName}}</td>
            <td>{{item.creationTime | formatDate('yyyy-MM-dd')}}</td>
            <td>{{item.infoState==0?'审核中':item.infoState==1?'上架':item.infoState==2?'下架':''}}</td>
            <td>
              <router-link style="cursor:pointer;" class="dinb hov8 cor009cff mgr14" :to="{name:path1,params:{id:item.informationId,pubishOrg:item.pubishOrg}}">查看详情</router-link>
              <a style="cursor:pointer;" class="dinb hov8 corff0000" @click="deletee(item.informationId)">删除</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--分页-->
      <page-vue :pageData="pageData" @chekdpageCallcak="chekdpage"></page-vue>
      <!--分页-->
    </div>
    <!--内容区END-->
  </div>
</template>

<script>
  import configJS from '../../common/config'
  //请求参数
  let params = {
    TypeNumber:null,
    status:null,
    pageSize:10, // 每页显示数量
    pageNum: 1,   //当前页码
    query:null
  }
    export default {
        name: "informationRelease",
      data() {
        return {
          totalCount: 0,//总条数
          lawEList: [],//列表
          dataFormatPattern :'yyyy年MM月dd日',
          keyWord:'',//搜索关键字
          path:null,
          path1:null,
        }
      },
      methods: {
        //分页
        chekdpage(currentPage) {
          params.pageNum = currentPage//页码
          initData(this)
        },
        //搜索
        search(){
          initData(this)
        },
        //删除
        deletee(informationId){
          this.$confirm('确定删除吗？').then(_ => {
            this.$axios({
              method:'post',
              url: '/biz/information/delete',
              params:{"informationId":informationId}
            }).then((res) => {
              if (res.data.status == 200) {
                this.$message("删除成功！")
                initData(this);
              }else{
                this.$message("删除失败！")
              }
            }).catch(_ => { })
          }).catch(_ => {
          });
        }
      },
      computed: {
        //分页参数
        pageData() {
          return {
            curPage: params.pageNum,//当前页码
            totalCount: this.totalCount,//总条数
            pageSize: params.pageSize//页面大小
          }
        },

      },
      created() {
          params.query=null;
        initData(this)
        //判断用户角色信息
        let roleIds = configJS.userInfo.tRoles.map(e => e.roleId);
        if (roleIds && roleIds.length == 1) {
          if (roleIds[0]==1) {
            this.path='dogManager_release';
            this.path1='dogManager_listInfoDetail';
          }else if (roleIds[0]==2) {
            this.path='hospice_release';
            this.path1='hospice_listInfoDetail';
          }else if (roleIds[0]==5) {
            this.path='operator_release';
            this.path1='operator_listInfoDetail';
          }else if (roleIds[0]==7) {
            this.path='telecom_release';
            this.path1='telecom_listInfoDetail';
          }
        }
      },
      watch:{
        keyWord(newVal,oldVal){
          params.query = newVal.trim();
          params.pageNum=1;
        }
      }
    }

  //查询列表
  function initData(_this) {
    _this.$axios({
      url: '/biz/information/getInformations',
      params:params
    }).then((res) => {
      console.log(res)
      if (res.data.status == 200) {
        _this.totalCount = res.data.data.total
        _this.lawEList = res.data.data.list
      }
    }).catch(_ => { })
  }
</script>

<style scoped>

</style>
