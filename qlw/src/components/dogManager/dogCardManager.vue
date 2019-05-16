<template>
  <!--犬证管理-->
  <div>
    <!--内容区-->
    <div class="w980 fr">
      <div class="ovh div1 h50 rel">
        <p class="abs ww100 left0 bottom0"></p>
        <a style="cursor:pointer;" class="fl db fs16 cor3c3c3c w200 h50 lh50 t-c active">网上办理审核</a>
        <a style="cursor:pointer;" class="fl db fs16 cor3c3c3c w200 h50 lh50 t-c">现场办理</a>
      </div>

      <div class="div12 db">
        <div class="ovh mgt20">
          <div class="fl cor6 h40 lh40">
            <select v-model="params1.status" @change="change" style="border-color: #cccccc;padding-left: 9px;" class="selestd">
              <option value="6">全部</option>
              <option value="4">待审核</option>
              <option value="1">审核通过</option>
              <option value="5">审核不通过</option>
            </select>
          </div>
          <form class="fr db w380 h40 borbfbfbf ras20 rel" action="#">
            <input type="text" class="db ww100 h38 lh38 pdl15 cor3c3c3c bort" @dblclick="$event.target.select()" @keyup.enter="search1" v-model.trim="params1.input" placeholder="犬主姓名/身份证号/犬证号/免疫证号/标示牌号">
            <input value="" class="in1 db abs z100 top0 bort right0" @click.prevent="search1">
          </form>
        </div>

        <div class="mgt10 k3">
          <div class="t-c">
            <table class="table5" width="100%" border="1">
              <tbody>
              <tr>
                <td class="cor0 h60 bgf1">犬证号</td>
                <td class="cor0 h60 bgf1">犬只名称</td>
                <td class="cor0 h60 bgf1">犬只品种</td>
                <td class="cor0 h60 bgf1">犬主姓名</td>
                <td class="cor0 h60 bgf1">电话</td>
                <td class="cor0 h60 bgf1">申请时间</td>
                <td class="cor0 h60 bgf1">审核人</td>
                <td class="cor0 h60 bgf1">审核机构</td>
                <td class="cor0 h60 bgf1">状态</td>
                <td class="cor0 h60 bgf1">操作</td>
              </tr>
              <tr v-for="(item,index) in infos1" :key="index">
                <td>{{item.dogCardNum?item.dogCardNum:'--'}}</td>
                <td>{{item.dogName}}</td>
                <td>{{item.dogVarieties}}</td>
                <td>{{item.dogOwnerName}}</td>
                <td>{{item.dogOwnerPhone}}</td>
                <td>{{item.applyTime | formatDate}}</td>
                <td>{{item.lssuerName}}</td>
                <td>{{item.lssueOrgName}}</td>
                <td>{{item.status==1?'审核通过':item.status==4?'待审核':item.status==5?'审核不通过':'--'}}</td>
                <td class="t-c">
                  <router-link v-if="item.status!=4" href="###" class="db cor009cff hov8" :to="{name:path,params:{'dogId':item.dogId,'name':'证件办理'}}">查看详情</router-link>
                  <span v-if="item.status==1||item.status==2" class="cupo dinb cor009cff hov8" @click="renewal(item.dogId)">续期</span>
                  <router-link v-if="item.status==4" class="cupo dinb cor009cff hov8" :to="{name:path2,params:{'dogId':item.dogId,'name':'犬证审核'}}">审核</router-link>
                  <!--续费 弹窗-->
                  <el-dialog
                    title="续期提示"
                    :visible.sync="alert.dialogVisible"
                    width="30%" >
                    <div class="cont">
                      <span class="h100b">{{alert.msg}}</span>
                      <el-date-picker
                        v-model="alert.selectdDate"
                        type="date"
                        :format="dateRegular"
                        placeholder="选择日期">
                      </el-date-picker>
                    </div>
                    <span slot="footer" class="dialog-footer">
                  <el-button @click="alert.dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="renewConfirm()">确 定</el-button>
                </span>
                  </el-dialog>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--分页-->
        <page-vue :pageData="pageData1" @chekdpageCallcak="chekdpage1"></page-vue>
        <!--分页-->
      </div>
      <div class="div12 dn">
        <div class="ovh mgt20">
          <div class="fl cor6 h40 lh40">
            <router-link style="cursor:pointer;" class="db fl hov8 corffa472 mgr35 pc9 pdl36" :to="{name:path1,params:{name:'证件办理'}}">犬证办理</router-link>
          </div>
          <form class="fr db w380 h40 borbfbfbf ras20 rel" action="#">
            <input type="text" class="db ww100 h38 lh38 pdl15 cor3c3c3c bort" @dblclick="$event.target.select()" @keyup.enter="search" v-model.trim="params.input" placeholder="犬主姓名/身份证号/犬证号/免疫证号/标示牌号">
            <input type="submit" value="" class="in1 db abs z100 top0 bort right0" @click.prevent="search">
          </form>
        </div>

        <div class="mgt10 k3">
          <div class="t-c">
            <table class="table5" width="100%" border="1">
              <tbody>
              <tr>
                <td class="cor0 h60 bgf1">犬证号</td>
                <td class="cor0 h60 bgf1">犬只名称</td>
                <td class="cor0 h60 bgf1">犬只品种</td>
                <td class="cor0 h60 bgf1">犬主姓名</td>
                <td class="cor0 h60 bgf1">电话</td>
                <td class="cor0 h60 bgf1">办理时间</td>
                <td class="cor0 h60 bgf1">办理人</td>
                <td class="cor0 h60 bgf1">办理机构</td>
                <td class="cor0 h60 bgf1">操作</td>
              </tr>
              <tr v-for="(item,index) in infos" :key="index">
                <td>{{item.dogCardNum?item.dogCardNum:'--'}}</td>
                <td>{{item.dogName}}</td>
                <td>{{item.dogVarieties}}</td>
                <td>{{item.dogOwnerName}}</td>
                <td>{{item.dogOwnerPhone}}</td>
                <td>{{item.lssueTime | formatDate}}</td>
                <td>{{item.lssuerName}}</td>
                <td>{{item.lssueOrgName}}</td>
                <td class="t-c">
                  <!--<a href="###" class="dinb cor009cff hov8 mgr14">查看详情</a>-->
                  <router-link class="dinb cor009cff hov8 mgr14" :to="{name:path,params:{'dogId':item.dogId,'name':'证件办理'}}">查看详情</router-link>
                  <span class="cupo dinb cor009cff hov8" @click="renewal1(item.dogId)">续期</span>

                  <!--续费 弹窗-->
                  <el-dialog
                    title="续期提示"
                    :visible.sync="alert1.dialogVisible"
                    width="30%" >
                    <div class="cont">
                      <span class="h100b">{{alert.msg}}</span>
                      <el-date-picker
                        v-model="alert1.selectdDate"
                        type="date"
                        :format="dateRegular"
                        placeholder="选择日期">
                      </el-date-picker>
                    </div>
                    <span slot="footer" class="dialog-footer">
                  <el-button @click="alert1.dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="renewConfirm1()">确 定</el-button>
                </span>
                  </el-dialog>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!--分页-->
        <page-vue :pageData="pageData" @chekdpageCallcak="chekdpage"></page-vue>
        <!--分页-->
      </div>
    </div>
    <!--内容区END-->
  </div>
</template>

<script>
  import $$ from 'jquery'
  import  conf from '../../common/config'
    export default {
        name: "dogCardManager",
      data() {
        return {
          params: {
            num: 1,//页码
            size: 8,//页面大小
            status:1,
            input: '',  //keyword
          },
          params1: {
            num: 1,//页码
            size: 8,//页面大小
            status:6,
            input: '',  //keyword
          },
          pageData:{
            curPage:1,//当前页吗
            totalCount:1,//总条数
            pageSize:1//页面大小
          },
          pageData1:{
            curPage:1,//当前页吗
            totalCount:1,//总条数
            pageSize:1//页面大小
          },
          infos:[],//信息列表
          infos1:[],//信息列表
          keyWord:'',//搜索关键字
          keyWord1:'',//搜索关键字
          alert:{//弹出框
            dialogVisible: false,//弹出框显示标示，
            msg:'续期至：',//弹窗提示内容,
            selectdDate:''
          },
          alert1:{//弹出框
            dialogVisible: false,//弹出框显示标示，
            msg:'续期至：',//弹窗提示内容,
            selectdDate:''
          },
          dogId:null,
          dogId1:null,
          dateRegular:"yyyy年MM月dd日",
          path: null,//查看
          path1:null,//添加
          path2:null,//审核
        }
      },
      created() {
        this.params.input=null;
        this.params1.input=null;
        //判断用户角色信息
        let roleIds = conf.userInfo.tRoles.map(e => e.roleId);
        if (roleIds && roleIds.length == 1) {
          if (roleIds[0] == 1) {
            this.path = 'dogManager_info';
            this.path1 = 'dogManager_dogadd';
            this.path2 = 'dogManager_dogCardaudit';
          } else if (roleIds[0] == 2) {
            this.path = 'hospice_info';
            this.path1 = 'hospice_dogadd';
            this.path2 = 'hospice_dogCardaudit';
          }
        }
        initData(this)
        initData1(this)
      },
      computed:{

      },
      mounted(){
        var $tab12= $$('.div1>a');
        $tab12.mouseover(function(){
          $$(this).addClass('active').siblings().removeClass('active');
          var i= $tab12.index(this);
          $$('.div12').eq(i).show().siblings('.div12').hide();
        });
      },
      methods:{
          change(){
            this.params1.num=1
            initData1(this);
          },
        chekdpage(pageNum){
          this.params.num = pageNum//页码
          initData(this)
        },
        chekdpage1(pageNum){
          this.params1.num = pageNum//页码
          initData1(this)
        },
        search(){
          this.params.num = 1
          initData(this)
        },
        search1(){
          this.params1.num=0
          initData1(this)
        },
        renewal(dogId){
          this.alert.dialogVisible = true
          this.alert.selectdDate="";
          this.dogId=dogId
        },
        renewal1(dogId){
          this.alert1.dialogVisible = true
          this.alert1.selectdDate="";
          this.dogId1=dogId
        },
        renewConfirm(){//续费确认
          let alertMdg = "续费失败";//提示窗信息
          if(this.alert.selectdDate){
            this.$axios({//续费请求
              url:'/biz/dogCard/updateCardDate',
              params:{"dogId":this.dogId,'endDate':this.alert.selectdDate}
            }).then((res)=>{
              if(res.data.code='000000'){
                alertMdg="续费成功！"
              }
            }).catch(_=>{}).finally(_=>{
              this.alert.dialogVisible = false;
              this.$alert(alertMdg, '续费结果', {
                confirmButtonText: '确定',
              });
            })
          }
        },
        renewConfirm1(){//续费确认
          let alertMdg = "续费失败";//提示窗信息
          if(this.alert1.selectdDate){
            this.$axios({//续费请求
              url:'/biz/dogCard/updateCardDate',
              params:{"dogId":this.dogId1,'endDate':this.alert1.selectdDate}
            }).then((res)=>{
              if(res.data.code='000000'){
                alertMdg="续费成功！"
              }
            }).catch(_=>{}).finally(_=>{
              this.alert1.dialogVisible = false;
              this.$alert(alertMdg, '续费结果', {
                confirmButtonText: '确定',
              });
            })
          }
        }
      },
      watch:{
        // keyWord(newVal,oldVal){
        //   this.params.input = newVal.trim();
        //   this.params.num = 1
        // },
        // keyWord1(newVal,oldVal){
        //   this.params1.searchKey = newVal.trim();
        //   this.params1.index=1
        // },
      }
    }

  function initData(_this) {
    _this.$axios({
      url: '/biz/dogCard/selectDogCardHandleList',
      params:_this.params
    }).then((res) => {
      if(res.data){
        _this.pageData.curPage= res.data.page//当前页吗
        _this.pageData.totalCount= res.data.total//总条数
        _this.pageData.pageSize= _this.params.size//页面大小
        _this.infos = res.data.rows
      }
    }).catch((res) => {
      //console.log(res)
    })
  }

  function initData1(_this) {
    _this.$axios({
      url: '/biz/dogCard/selectDogCardHandleList',
      params:_this.params1
    }).then((res) => {
      console.log(res)
      if(res.data){
        _this.pageData1.curPage= res.data.page//当前页吗
        _this.pageData1.totalCount= res.data.total//总条数
        _this.pageData1.pageSize= _this.params1.size//页面大小
        _this.infos1 = res.data.rows
      }
    }).catch((res) => {
      //console.log(res)
    })
  }
</script>

<style scoped>
  [type="submit"]{
    cursor: pointer;
  }
  .h100b{
    height: 100%;
    margin-right: 10px;
  }
  .cupo{
    cursor: pointer;
  }
  .cont{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  td:first-child{padding-left: 10px}
  .selestd{
    cursor: pointer;
  }
</style>
