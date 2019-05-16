<template>
  <!--内容区-->
  <div class="w980 fr">
    <div class="ovh">
      <div class="fl cor6 h40 lh40">
        <router-link class="db fl hov8  corffa472 mgr35 pc9 pdl36"
                     :to="{name:path1,params:{name:'犬证管理'}}">犬证办理
        </router-link>
        <!--<a href="###" class="db fl hov8 corffa472 pc8 pdl36">精准搜索</a>-->
      </div>
      <form class="fr db w380 h40 borbfbfbf ras20 rel" action="#">
        <input type="text" class="db ww100 h38 lh38 pdl15 cor3c3c3c bort" @dblclick="$event.target.select()"
               v-model="keyWord" placeholder="犬证号/免疫证号">
        <input type="submit" value="" class="in1 db abs z100 top0 bort right0" @click.prevent="search">
      </form>
    </div>

    <div class="mgt10 k3">
      <!--<div class="fs16 cor0 fb pdl30 bgf1 h60 lh60">违法信息</div>-->
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
            <td>{{item.dogCardNum.length>10?item.dogCardNum.substring(0,10):item.dogCardNum}}</td>
            <td>{{item.dogName}}</td>
            <td>{{item.dogVarieties}}</td>
            <td>{{item.dogOwnerName}}</td>
            <td>{{item.dogOwnerPhone}}</td>
            <td>{{item.lssueTime | formatDate(pattern)}}</td>
            <td>{{item.lssuerName}}</td>
            <!--<td>{{item.nextYearsCheckDate | formatDate}}</td>-->
            <!--<td>{{item.lssueTime | formatDate}}</td>-->
            <td>{{item.lssueOrgName}}</td>
            <td class="t-c">
              <!--<a href="###" class="dinb cor009cff hov8 mgr14">查看详情</a>-->
              <router-link class="dinb cor009cff hov8 mgr14"
                           :to="{name:path,params:{'dogId':item.dogId,'name':'犬证管理'}}">
                查看详情
              </router-link>
              <span class="cupo dinb cor009cff hov8" @click="dialogShow(item)">续期</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--续费 弹窗-->
      <el-dialog
        title="续期提示"
        :visible.sync="alert.dialogVisible"
        width="30%">
        <div class="cont">
          <span class="h100b">原日期:</span>
          <el-input prefix-icon="el-icon-date" :value="item.nextYearsCheckDate | formatDate('yyyy年MM月dd日')" readonly v-if="item.nextYearsCheckDate"></el-input>
          <el-input value="无" readonly v-else></el-input>
        </div>
        <div class="cont">
          <span class="h100b">{{alert.msg}}</span>
          <el-tooltip class="item" effect="dark"  :disabled="item.nextYearsCheckDate && alert.selectdDate && item.nextYearsCheckDate < new Date(alert.selectdDate)" content="所选日期不能小于之前日期" placement="right">
            <el-date-picker
              v-model="alert.selectdDate"
              type="date"
              :format="dateRegular"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-tooltip>
        </div>
        <span slot="footer" class="dialog-footer">
                  <el-button @click="alert.dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="renewConfirm(item.dogId)" :disabled="item.nextYearsCheckDate && alert.selectdDate && item.nextYearsCheckDate > new Date(alert.selectdDate)">确 定</el-button>
                </span>
      </el-dialog>

    </div>

    <!--分页-->
    <page-vue :pageData="pageData" @chekdpageCallcak="chekdpage"></page-vue>
    <!--分页-->

  </div>
  <!--内容区END-->
</template>

<script>
  import configJS from '../../common/config'

  export default {
    name: "dogManagerDogList",
    data() {
      return {
        pattern: 'yyyy年MM月dd日',
        item:'',//弹窗数据内容
        params: {
          num: 1,//页码
          size: 10,//页面大小
          input: '',  //keyword
        },
        pageData: {
          curPage: 1,//当前页吗
          totalCount: 1,//总条数
          pageSize: 1//页面大小
        },
        infos: [],//信息列表
        keyWord: '',//搜索关键字
        alert: {//弹出框
          dialogVisible: false,//弹出框显示标示，
          msg: '续期至：',//弹窗提示内容,
          selectdDate: ''
        },
        dateRegular: "yyyy年MM月dd日",
        path: null,
        path1:null,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      }
    },
    created() {
      initData(this);
      //判断用户角色信息
      let roleIds = configJS.userInfo.tRoles.map(e => e.roleId);
      if (roleIds && roleIds.length == 1) {
        if (roleIds[0] == 1) {
          this.path = 'dogManager_info';
          this.path1 = 'dogManager_dogadd';
        } else if (roleIds[0] == 2) {
          this.path = 'hospice_info';
          this.path1 = 'hospice_dogadd';
        }
      }
    },
    computed: {},
    methods: {
      //续期弹窗
      dialogShow(item){
        this.alert.dialogVisible = true
        this.item = item;
      },
      chekdpage(pageNum) {
        this.params.num = pageNum//页码
        initData(this)
      },
      search() {
        initData(this)
      },
      renewConfirm(dogId) {//续费确认
        // console.log(this.infos.find(x=>x.dogId ==dogId ))
        // return;
        let alertMdg = "续费失败";//提示窗信息
        if (this.alert.selectdDate) {
          this.$axios({//续费请求
            url: '/biz/dogCard/updateCardDate',
            params: {"dogId": dogId, 'endDate': this.alert.selectdDate}, isloading: true,
          }).then((res) => {
            if (res.data.code = '000000') {
              alertMdg = "续费成功！"
              this.params.num = 1;
              initData(this)
            }
          }).catch(_ => {
          }).finally(_ => {
            this.alert.dialogVisible = false;
            this.$alert(alertMdg, '续费结果', {
              confirmButtonText: '确定',
            });
          })
        }
      }
    },
    watch: {
      keyWord(newVal, oldVal) {
        this.params.input = newVal;
        this.params.num = 1;
      }
    }
  }

  function initData(_this) {
    if (!_this.params.input || _this.params.input.trim().length == 0) {
      delete _this.params.input
    }
    _this.$axios({
      url: '/biz/dogCard/selectDogCardHandleList',
      params: _this.params,
      // isloading: true
    }).then((res) => {
      if (res.data) {
        _this.pageData.curPage = res.data.page//当前页吗
        _this.pageData.totalCount = res.data.total//总条数
        _this.pageData.pageSize = _this.params.size//页面大小
        _this.infos = res.data.rows
      }
    }).catch((res) => {
      console.log(res)
    })
  }
</script>

<style scoped>
  [type="submit"] {
    cursor: pointer;
  }

  .h100b {
    width: 100px;
    height: 100%;
    margin-right: 10px;
  }

  .cupo {
    cursor: pointer;
  }

  .cont {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btns {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }

  .btns a {
    margin-bottom: 6px;
    display: inline-block;
    width: 100%;
  }

  .btns span {
    display: inline-block;
    width: 100%;
    text-align: center;
  }

  td:first-child {
    padding-left: 10px;
  }

  .el-tooltip__popper[x-placement^=right] .popper__arrow{
    border-right-color: #1ab394;
  }
  .el-tooltip__popper[x-placement^=right] .popper__arrow:after {
    border-right-color: #1ab394;
  }

</style>
