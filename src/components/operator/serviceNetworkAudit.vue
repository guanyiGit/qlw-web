<template>
    <!--服务网点审核列表-->
  <div class="w980 fr" >
    <div class="ovh div1 h50 rel">
      <p class="abs ww100 left0 bottom0"></p>
      <a href="javascript:void(0);" class="fl db fs16 cor3c3c3c w200 h50 lh50 t-c active" @click.prevent="checkTab = 0">待审核</a>
      <a href="javascript:void(0);" class="fl db fs16 cor3c3c3c w200 h50 lh50 t-c" @click.prevent="checkTab = 1">已审核</a>
    </div>
    <div class="div12 db mgt20">
      <div class="ovh">
        <div class="fl cor6 h40 lh40">
          <!--<router-link :to="{name:'operator_msgAdd'}" class="db fl hov8 corffa472 mgr35 pc9 pdl36">新增</router-link>-->
        </div>
        <form class="fr db w380 h40 borbfbfbf ras20 rel" action="#">
          <input type="text" class="db ww100 h38 lh38 pdl15 cor3c3c3c bort" placeholder="网点名称" v-model="keyword">
          <input type="submit" value="" class="in1 db abs z100 top0 bort right0" @click.prevent="searchKey">
        </form>
      </div>
      <div class="ovh k3 mgt20">
        <table class="table11" width="100%">
          <tbody>
          <tr>
            <td class="ww24">网点名称</td>
            <td>联系电话</td>
            <td>所属区域</td>
            <td>详细地址</td>
            <td>申请时间</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item,index) in  stayList" :key="index">
            <td>{{item.organizationName}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.district}}</td>
            <td>{{item.address}}</td>
            <td>{{item.creationTime | formatDate(datePattern)}}</td>
            <td>
              <!--<router-link style="cursor:pointer;" class="dinb hov8 cor009cff" :to="{name:'operator_networkAudit',params:{'organizationId':item.organizationId,idd:440000}}">审核</router-link>-->
              <a style="cursor:pointer;" class="dinb hov8 cor009cff" @click="tooo(item.organizationId)">审核</a>
            </td>
          </tr>

          </tbody>
        </table>

      </div>
      <!--分页-->
      <page-vue :pageData="pageData" @chekdpageCallcak="chekdpage"></page-vue>
      <!--分页-->
    </div>
    <div class="div12 dn mgt20">
      <div class="ovh">
        <form class="fr db w380 h40 borbfbfbf ras20 rel" action="#">
          <input type="text" class="db ww100 h38 lh38 pdl15 cor3c3c3c bort" placeholder="网点名称" v-model="keyword">
          <input type="submit" value="" class="in1 db abs z100 top0 bort right0" @click.prevent="searchKey1">
        </form>
      </div>
      <div class="ovh k3 mgt20">
        <table class="table11" width="100%">
          <tbody>
          <tr>
            <td class="ww24">网点名称</td>
            <td>联系电话</td>
            <td>所属区域</td>
            <td>详细地址</td>
            <td>审批时间</td>
            <td>审批状态</td>
            <td>操作</td>
          </tr>

          <tr v-for="(item,index) in  stayList1" :key="index" v-if="stayList1 && stayList1.length>0">
            <td>{{item.organizationName}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.district}}</td>
            <td>{{item.address}}</td>
            <td>{{item.approvalTime | formatDate(datePattern)}}</td>
            <td>
              <template v-if="item.status==1">
                <a class="dinb a9 active2">{{'审核通过'}}</a>
              </template>
              <template v-else>
                <a class="dinb a9 active">{{'审核不通过'}}</a>
              </template>
            </td>
            <!--<td>-->
              <!--<a class="dinb a9 active">审批不通过</a>-->
            <!--</td>-->
            <td>
              <!--<router-link style="cursor:pointer;" class="dinb hov8 cor009cff" :to="{name:'operator_checkBranches',params:{'organizationId':item.organizationId}}">查看</router-link>-->
              <a style="cursor:pointer;" class="dinb hov8 cor009cff" @click="toCheck(item.organizationId)">查看</a>
              <!--<a v-if="item.status==1" style="cursor:pointer;" class="dinb hov8 cor009cff" @click="through(item.organizationId)">指定业务</a>-->
            </td>
          </tr>
          </tbody>
        </table>
        <!--分页-->
        <page-vue :pageData="pageData1" @chekdpageCallcak="chekdpage1"></page-vue>
        <!--分页-->
      </div>
    </div>
    <!--弹窗1-->
    <!--<div class="T" style="display: none" id="aaa">-->
      <!--<div class="tan3 bgw rel">-->
        <!--<div class="h60 lh60 bgf1 fs16 cor0 pdl30 fb">指定业务范围</div>-->
        <!--<form action="#">-->
          <!--<div class="pdt10 pdl85 pdr85 ovh">-->
            <!--<p class="cor9 mgt17">-->
              <!--<span style="font-size: 16px">请指定业务范围:</span>-->
            <!--</p>-->
            <!--<p class="cor9 mgt17">-->
              <!--<label class="lab3 fl mgr12"><input type="checkbox" class="check" value="0" name="card_add"><i></i></label>免疫证办理-->
            <!--</p>-->
            <!--<p class="cor9 mgt17">-->
              <!--<label class="lab3 fl mgr12"><input type="checkbox" class="check" value="1" name="card_add"><i></i></label>犬证办理-->
            <!--</p>-->
          <!--</div>-->
          <!--<div class="t-c mgt40 mgb50">-->
            <!--<a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort">提交</a>-->
            <!--<a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5" @click="cancel1">取消</a>-->
          <!--</div>-->
        <!--</form>-->
        <!--<a style="cursor:pointer;" class="db abs close w28 h28"><img src="../../../static/images/50.png" alt="" @click="cancel1"></a>-->
      <!--</div>-->
    <!--</div>-->
    <!--弹窗1-->
  </div>
</template>

<script>
  //请求参数pageData
  let params = {
    pageSize: 8,
    pageNum: 1,
    status:0,//查询状态 (查询所有待审核的服务网点)
    searchKey: null,
  }
  let params1 = {
    pageSize: 8,
    pageNum: 1,
    status:-1,//查询状态
    searchKey: null,
  }
  let id=null
    export default {
        name: "serviceNetworkAudit",
      data() {
        return {
          checkTab:1,//页签tab
          datePattern:'yyyy年MM与dd日',
          totalCount: 0,//总条数
          totalCount1: 0,//总条数
          stayList: [],//待审核列表
          stayList1: [],//已审核列表
          keyword:null,//搜索关键字
        }
      },
      methods: {
        //分页
        chekdpage(currentPage) {
          params.pageNum = currentPage//页码
          initData(this)
        },
        chekdpage1(currentPage) {
          params1.pageNum = currentPage//页码
          initData1(this)
        },
        searchKey(){
          initData(this);
        },
        searchKey1(){
          initData1(this);
        },
        tooo(organizationId){
          this.$axios({
            url: '/biz/serviceSite/getServiceSite',
            method: 'post',
            params: {organizationId: organizationId}
          }).then(res => {
            if (res.data.status == 200) {
              this.$router.push({name:'operator_networkAudit',params:{'organizationId':organizationId,province:res.data.data.province,city:res.data.data.ownedCity,district:res.data.data.district}})
            }
          })
        },
        toCheck(organizationId){
          this.$axios({
            url: '/biz/serviceSite/getServiceSite',
            method: 'post',
            params: {organizationId: organizationId}
          }).then(res => {
            if (res.data.status == 200) {
              this.$router.push({name:'operator_checkBranches',params:{'organizationId':organizationId,province:res.data.data.province,city:res.data.data.ownedCity,district:res.data.data.district}})
            }
          })
        }
      },
      computed: {
        //分页参数
        pageData() {
          return {
            curPage: params.pageNum,//当前页吗
            totalCount: this.totalCount,//总条数
            pageSize: params.pageSize//页面大小}
          }
        },
        pageData1() {
          return {
            curPage: params1.pageNum,//当前页吗
            totalCount: this.totalCount1,//总条数
            pageSize: params1.pageSize//页面大小
          }
        },
      },
      created() {
        params.query=null;
        params1.query=null;
        initData(this)
        initData1(this)
      },
      mounted(){
        var $tab3= $('.div1>a');
        $tab3.click(function(){
          $(this).addClass('active').siblings().removeClass('active');
          var i= $tab3.index(this);
          $('.div12').eq(i).show().siblings('.div12').hide();
        });
      },
      // methods:{
        // cancel1(){
        //   $(".check").attr("checked",false);
        //   $("#aaa").hide();
        // },
        // through(idd){
        //   $("#aaa").show();
        //   id=null
        //   id=idd
        // },
        // saveThrough(){
        //   var obj = document.getElementsByName("card_add");
        //   for (var i in obj){
        //     if (obj[i].checked){
        //       check_val.push(obj[i].value);
        //     }
        //   }
        //   var power = 0;
        //   if (check_val.length<1){
        //     this.$alert("请指定业务范围");
        //     return
        //   }
        //   for (var j in check_val){
        //     var val = check_val[j];
        //     if (val == 1){
        //       power = 1
        //     }
        //   }
        //   this.$axios({
        //     url: '/biz/serviceSite/update',
        //     method: 'post',
        //     params: {organizationId:id,
        //       status:1,   //审核通过
        //       power:power    //业务范围
        //     }
        //   }).then(res => {
        //     // console.log(res)
        //     if(res.data.status == 200){
        //       this.$alert("提交成功！");
        //       $("#aaa").hide();
        //       this.$router.push('serviceNetworkAudit');//其中operatorMsgAuditLis是你定义的一个路由模块
        //     }
        //   })
        // },
      // },
      watch:{
        checkTab(newVal,oldVal){
          if(newVal != oldVal) {
            // newVal = oldVal
            // params.status =  newVal;//切换tab
            initData(this)
            initData1(this)
            this.keyword='';
          }
        },
        keyword(newVal){
            params.searchKey = newVal.trim();
            params1.searchKey = newVal.trim();
            params.pageNum=1;
            params1.pageNum=1;
            // initData(this)
        }
      }
    }

  function initData(_this) {
    _this.$axios({
      url: '/biz/serviceSite/getServiceSitesforAdmin',
      method: 'post',
      params: params
    }).then(res => {
      if(res.data.status == 200){
        _this.totalCount = res.data.data.total;
        _this.stayList = res.data.data.list;
      }
    })
  }
  function initData1(_this) {
    _this.$axios({
      url: '/biz/serviceSite/getServiceSitesforAdmin',
      method: 'post',
      params: params1
    }).then(res => {
      console.log(res)
      if(res.data.status == 200){
        _this.totalCount1 = res.data.data.total;
        _this.stayList1 = res.data.data.list;
      }
    })
  }
</script>

<style scoped>

</style>
