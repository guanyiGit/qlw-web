<template>
  <!--内容区-->
  <div class="w980 fr">
    <div class="mbx">
      <ul class="ul11 clearfix">
        <li><router-link :to="{name:'hospital_DogList'}">喂药登记></router-link></li>
        <li>查看详情</li>
      </ul>
    </div>
    <div class="mgt20 k3">
      <table class="table10 t-c" width="100%" border="1">
        <tbody>
        <tr>
          <td>免疫证号</td>
          <td class="cor9" v-if="Datails&&Datails.immune_card_num">{{Datails.immune_card_num}}</td>
          <td class="cor9" v-else>···</td>
          <td>犬主姓名</td>
          <td class="cor9" v-if="Datails&&Datails.dog_owner_name">{{Datails.dog_owner_name}}</td>
          <td class="cor9" v-else>···</td>
        </tr>
        <tr>
          <td>联系电话</td>
          <td class="cor9" v-if="Datails&&Datails.dog_owner_phone">{{Datails.dog_owner_phone}}</td>
          <td class="cor9" v-else>···</td>
          <td>证件类型</td>
          <td class="cor9" v-if="Datails&&Datails.card_type!=null">
            {{Datails.card_type==0?'身份证':Datails.card_type==1?'护照':Datails.card_type==2?'社保证':'其他'}}</td>
          <td class="cor9" v-else>···</td>
        </tr>
        <tr>
          <td>证件号码</td>
          <td class="cor9" v-if="Datails&&Datails.card_num">{{Datails.card_num}}</td>
          <td class="cor9" v-else>···</td>
          <td>犬只名称</td>
          <td class="cor9" v-if="Datails&&Datails.dog_name">{{Datails.dog_name}}</td>
          <td class="cor9" v-else>···</td>
        </tr>
        <tr>
          <td>犬只品种</td>
          <td class="cor9" v-if="Datails&&Datails.breed">{{Datails.breed}}</td>
          <td class="cor9" v-else>···</td>
          <td>犬龄</td>
          <td class="cor9" v-if="Datails&&Datails.birth_time">{{Datails.birth_time}}</td>
          <td class="cor9" v-else>···</td>
        </tr>
        <tr>
          <td>性别</td>
          <td class="cor9" v-if="Datails&&Datails.dog_gender">{{Datails.dog_gender}}</td>
          <td class="cor9" v-else>···</td>
          <td>毛色</td>
          <td class="cor9" v-if="Datails&&Datails.color">{{Datails.color}}</td>
          <td class="cor9" v-else>···</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="ovh mgt20">
      <div class="fl cor6 h40 lh40" v-if="Datails&&Datails.vaccine_register_id">
        <a href="#" class="db fl hov8 corffa472 mgr35 pc9 pdl36" @click="check">新增</a>
      </div>
    </div>
    <div class="h60 lh60 pdl30 bgf8 fs16 cor0 fb">喂药记录</div>
    <div class="mgt10 k3 t-c">
      <table class="table5" width="100%" border="1">
        <tbody>
        <tr>
          <td class="cor0 h60 bgf1">喂药时间</td>
          <td class="cor0 h60 bgf1">药品名称</td>
          <td class="cor0 h60 bgf1">药品厂家及批号</td>
          <td class="cor0 h60 bgf1">兽医</td>
          <td class="cor0 h60 bgf1">下次喂药时间</td>
          <td class="cor0 h60 bgf1">备注</td>
        </tr>
        <tr v-for="(item,index) in list":key="index">
          <td class="cor3" v-if="item.drug_date">{{item.drug_date|formatDate(dataFormatPattern)}}</td>
          <td class="cor3" v-else>···</td>
          <td class="cor3" v-if="item.drug_name">{{item.drug_name}}</td>
          <td class="cor3" v-else>···</td>
          <td class="cor3" v-if="item.drug_name_num">{{item.drug_name_num}}</td>
          <td class="cor3" v-else>···</td>
          <td class="cor3" v-if="item.name">{{item.name}}</td>
          <td class="cor3" v-else>···</td>
          <td class="cor3" v-if="item.next_drug_date">{{item.next_drug_date|formatDate(dataFormatPattern)}}</td>
          <td class="cor3" v-else>···</td>
          <td class="cor3" v-if="item.remarks" style="width: 25%;word-break:break-all;">{{item.remarks}}</td>
          <td class="cor3" v-else>···</td>
        </tr>

        </tbody>
      </table>
      <!--分页-->
      <page-vue :page-data="pageDate" @chekdpageCallcak="chekdPage"></page-vue>
      <!--分页-->
    </div>
    <!--弹窗   说明。.db--显示，.dn--隐藏-->
    <div class="T db" style="display: none;z-index: 2;margin-top: 50px">
      <div class="tan6 abs bgw k3 db" style="height: 640px;">
        <div class="h60 lh60 pdl30 bgf8 fs16 cor0 fb" style="margin-bottom: 50px;">新增喂药信息</div>
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w90 fl h40 lh20 cor0 pdl30">喂药时间</span>
            <div class="mgl100">
              <el-date-picker  v-model="addImm.cardDateStart" disabled name="startTime" type="date" placeholder="选择日期" class="wd100b"
                               format="yyyy年MM月dd日">
              </el-date-picker>
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">药品名称</span>
            <div class="mgl90">
              <input type="text"style="width: 95%" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="addImm.vaccine_name">
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh20 cor0 pdl30">疫苗厂家<br>及批号</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="addImm.vaccine_producer">
            </div>
          </div>
          <div class="mgt10 ww50 fr">
            <span class="db w90 fl h40 lh40 cor0 pdl30">接种兽医</span>
            <div class="mgl90">
              <input type="text"style="width: 95%" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="operator_id" disabled>
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w90 fl h40 lh20 cor0 pdl30">下次喂药时间</span>
            <div class="mgl100">
              <el-date-picker  v-model="addImm.next_injection_date" name="startTime" type="date" placeholder="选择日期" class="wd100b"
                               format="yyyy年MM月dd日">
              </el-date-picker>
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">备注信息</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="addImm.remarks">
            </div>
          </div>
        </div>
        <div class="t-c mgt40 mgb50">
          <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="selectDogAndOwner">确定</a>
          <a style="cursor:pointer;" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8" @click="tableCancel">取消</a>
        </div>
      </div>
    </div>
    <!--弹窗END-->
  </div>
  <!--内容区END-->
</template>
<script>
  import  conf from "../../common/config"
  import  $ from "jquery"
  export default {
    name: "dogManagerDrugDatail"
    ,data(){
      return{
        pageInfo:{//分页
          pageNum:1
          ,pageSize:5
        },list:{}//免疫记录集合
        ,Datails:''//基本信息
        ,dataFormatPattern :'yyyy年MM月dd日'
        ,operator_id:conf.userInfo.name
        ,addImm:{
          cardDateStart:new Date()
          ,vaccine_name:''
          ,vaccine_producer:''
          ,operator_id:''
          ,next_injection_date:''
          ,remarks:''
        }
      }
    },created(){
      initData(this);

    },methods:{
      check(){//点击新增事件
        $(".T").show();
      }
      ,selectDogAndOwner(){
        add(this)
      }
      ,tableCancel(){//点击取消（关闭新增）事件
        $(".T").hide();
      },chekdPage(index){
        this.pageInfo.pageNum=index;
        initData(this)
      }
    },computed:{
      pageDate(){
        return{
          curPage:this.pageInfo.pageNum,//当前页吗
          totalCount: this.pageInfo.totalCount?this.pageInfo.totalCount:0,//总条数
          pageSize: this.pageInfo.pageSize,//页面大小
        }
      }
    }
  }
  function initData(_this) {
    _this.$axios({
      url: '/biz/dogInfo/getDrugRecord',
      params: {"id": _this.$route.params.VIId,"num":_this.pageInfo.pageNum,"size":_this.pageInfo.pageSize}
    }).then((res) => {
      _this.Datails=res.data.dogInfo;
      _this.list=res.data.list;
      _this.pageInfo=res.data.pageInfo;
      if(_this.Datails.dog_gender==0||_this.Datails.dog_gender==1){
        _this.Datails.dog_gender=_this.Datails.dog_gender==0?'雄':'雌'
      }
      if(_this.Datails.birth_time!=null&&_this.Datails.birth_time!=''){
        _this.Datails.birth_time=CalAge(_this.Datails.birth_time)
        console.log(_this.Datails.birth_time)
      }
    }).catch((res)=>{
      console.log(res.message)
    })
  }
  function CalAge(date1) {
    var datetime1 = new Date(date1);
    var datetime2 = new Date();
    var year1 = datetime1.getFullYear();
    var year2 = datetime2.getFullYear();
    var age=year2-year1+1;
    return age+"岁";
  }
  function add(_this){
    try{
      let drugRecord={};
      drugRecord.vaccine_register_id= _this.Datails.vaccine_register_id//喂药登记id
      drugRecord.drug_date=_this.addImm.cardDateStart//喂药时间
      drugRecord.drug_name=_this.addImm.vaccine_name//药品名称
      drugRecord.drug_name_num=_this.addImm.vaccine_producer//厂家编号
      drugRecord.veterinary=_this.operator_id//兽医
      drugRecord.next_drug_date=_this.addImm.next_injection_date//下次喂药时间
      drugRecord.operator_id=conf.userInfo.userId//喂药人id
      drugRecord.remarks=_this.addImm.remarks//备注
      if(drugRecord.drug_date==null||drugRecord.drug_date==''){
        _this.$message("请输入喂药时间")
        return
      }
      if(drugRecord.drug_name==null||drugRecord.drug_name==''){
        _this.$message("请输入药品名称")
        return
      }
      if(drugRecord.next_drug_date!=null&&drugRecord.next_drug_date!=''&&drugRecord.next_drug_date<drugRecord.drug_date){
        _this.$message("下次喂药时间不能小于喂药时间")
        return
      }
      if(drugRecord.next_drug_date!=null&&drugRecord.next_drug_date!=''){
        drugRecord.next_drug_date=drugRecord.next_drug_date.getFullYear() + '-' + (drugRecord.next_drug_date.getMonth() + 1) + '-' + drugRecord.next_drug_date.getDate();
      }

      console.log(drugRecord.next_drug_date)

      _this.$axios({
        url: '/biz/dogInfo/addDrugRecord',
        params:{drugRecord:JSON.stringify(drugRecord)}
      }).then((res) => {
        console.log(res.data)
        if(res.data){
          _this.$alert("添加成功！")
          _this.pageInfo.pageNum=1
          initData(_this)
          $(".T").hide()
          _this.addImm.vaccine_name=null
          _this.addImm.vaccine_producer=null
          _this.addImm.operator_id=null
          _this.addImm.next_injection_date=null
          _this.addImm.remarks=null

        }else {
          _this.$alert("添加失败！")
        }
      }).catch((res)=>{
        _this.$alert("添加失败！")
        console.log(res.message)
      });
    } catch (e) {
      _this.$message("信息不完整，请重新选择！")
    } finally {
    }
  }
</script>
<style scoped>
  td{
    text-align:center;
  }
</style>
