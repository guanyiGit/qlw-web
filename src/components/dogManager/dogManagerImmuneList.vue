<template>
  <!--内容区-->
  <div class="w980 fr">

    <!--headler-->
    <div class="ovh">
      <!--<div class="fl cor6 h40 lh40">-->
        <!--<router-link :to="{name:'hospital_ImmuneAdd'}" class="db fl hov8 corffa472 mgr35 pc9 pdl36">新建档案</router-link>-->
      <!--</div>-->
      <form class="fr db w380 h40 borbfbfbf ras20 rel" action="#">
        <input type="text" @keyup.enter="search" class="db ww100 h38 lh38 pdl15 cor3c3c3c bort" @dblclick="$event.target.select()" v-model="params.input" placeholder="犬主姓名/手机号/免疫证号">
        <!--<input type="text" @keyup.enter="search" class="db ww100 h38 lh38 pdl15 cor3c3c3c bort" @dblclick="$event.target.select()" v-model="params.input" placeholder="免疫证号/犬主姓名/手机号/证件号">-->
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
            <td style="width: 10%">免疫证号</td>
            <td style="width: 10%">犬只名称</td>
            <td style="width: 10%">犬只品种</td>
            <td style="width: 5%">性别</td>
            <td style="width: 5%">犬龄</td>
            <td style="width: 5%">毛色</td>
            <td style="width: 10%">犬主姓名</td>
            <td style="width: 10%">联系电话</td>
            <td style="width: 10%">创建时间</td>
            <td style="width: 15%">操作</td>
          </tr>
          <tr v-for="(item,index) in mmuneList" :key="index">
            <td v-if="item.immune_card_num">{{item.immune_card_num}}</td>
            <td v-else>···</td>
            <td v-if="item.dog_name">{{item.dog_name}}</td>
            <td v-else>···</td>
            <td v-if="item.breed">{{item.breed}}</td>
            <td v-else>···</td>
            <td v-if="item.dog_gender">{{item.dog_gender}}</td>
            <td v-else>···</td>
            <td v-if="item.dogAge">{{item.dogAge}}</td>
            <td v-else>···</td>
            <td v-if="item.color">{{item.color}}</td>
            <td v-else>···</td>
            <td v-if="item.dog_owner_name">{{item.dog_owner_name}}</td>
            <td v-else>···</td>
            <td v-if="item.dog_owner_phone">{{item.dog_owner_phone}}</td>
            <td v-else>···</td>
            <td v-if="item.createTime">{{item.createTime | formatDate('yyyy-MM-dd')}}</td>
            <td v-else>···</td>
            <td>
              <!--<router-link class="dinb cor009cff hov8" :to="{name:'hospital_ImmuneDatail',params:{'VIId':item.vaccine_register_id,seqId:item.seq_id,dogId:item.dog_id}}">免疫记录</router-link>-->
              <router-link class="dinb cor009cff hov8" :to="{name:'hospital_ImmuneDatail',params:{'orgId':item.org_id,'VIId':item.vaccine_register_id,seqId:item.seq_id,dogId:item.dog_id,creation_time:item.creation_time}}">免疫记录</router-link>
              <a v-if="orgId==item.org_id" href="javascript:"class="dinb cor009cff hov8"
                 @click="printImm(item.dog_id)">&nbsp;打印免疫登记卡</a>
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
    <!--打印-->
    <!--<div id="printimm">-->
    <div id="printimm" style="display: none;">
      <div style="width: 1100px;margin-left: -50px">
        <div style="width: 100%;text-align: center;">
          <p style="padding-top: 20px;padding-bottom: 20px;font-size: 30px;font-family: '宋体';color: #000000"><b>犬免疫登记卡</b></p>
        </div>
        <div style="width: 100%;font-family: '宋体';font-size: 20px;">
          <div style="width: 80%;margin-left: 10%;border: 1px solid;">
            <table class="immtable10 t-c" width="100%" border="1">
              <tbody>
              <tr>
                <td style="width: 23%">犬主姓名</td>
                <td class="cor9" style="width: 23%"v-if="dogInfos.dogOwner&&dogInfos.dogOwner.dogOwnerName">{{dogInfos.dogOwner.dogOwnerName}}</td>
                <td class="cor9" style="width: 23%"v-else>···</td>
                <td style="width: 23%">联系电话</td>
                <td class="cor9" style="width: 23%"v-if="dogInfos.dogOwner&&dogInfos.dogOwner.dogOwnerPhone">{{dogInfos.dogOwner.dogOwnerPhone}}</td>
                <td class="cor9" style="width: 23%"v-else>···</td>
              </tr>
              <tr>
                <td>详细地址</td>
                <td class="cor9" v-if="dogInfos.dogOwner&&dogInfos.dogOwner.address" colspan="3">{{dogInfos.dogOwner.address}}</td>
                <td class="cor9" v-else colspan="3">···</td>
              </tr>
              <tr>
                <td>身份证号</td>
                <td class="cor9" v-if="dogInfos.dogOwner&&dogInfos.dogOwner.tDogOwnerCard
                &&dogInfos.dogOwner.tDogOwnerCard.cardNum" colspan="3">{{dogInfos.dogOwner.tDogOwnerCard.cardNum}}</td>
                <td class="cor9" v-else colspan="3">···</td>
              </tr>
              <tr>
                <td>犬只称呼名</td>
                <td class="cor9" v-if="dogInfos&&dogInfos.dogName">{{dogInfos.dogName}}</td>
                <td class="cor9" v-else>···</td>
                <td>犬只类别、品种</td>
                <td class="cor9" v-if="dogInfos.dogBreedDictionary&&dogInfos.dogBreedDictionary.dictionaryDescribe">
                  {{dogInfos.dogBreedDictionary.dictionaryDescribe}}</td>
                <td class="cor9" v-else>···</td>
              </tr>
              <tr>
                <td>特征与毛色</td>
                <td class="cor9" v-if="dogInfos.dogBreedDictionary&&dogInfos.dogBreedDictionary.dictionaryDescribe">
                  {{dogInfos.dogBreedDictionary.dictionaryDescribe}}</td>
                <td class="cor9" v-else>···</td>
                <td>性别</td>
                <td class="cor9">{{dogInfos.dogGender==0?'雄':'雌'}}</td>
                <!--<td class="cor9" v-else>···</td>-->
              </tr>
              <tr>
                <td>年龄</td>
                <td class="cor9" v-if="dogInfos.dogAge">{{dogInfos.dogAge}}</td>
                <td class="cor9" v-else>···</td>
                <td>免疫证号</td>
                <td class="cor9" v-if="dogInfos.dogImmune&&dogInfos.dogImmune.immuneCardNum">{{dogInfos.dogImmune.immuneCardNum}}</td>
                <td class="cor9" v-else>···</td>
              </tr>
              </tbody>
            </table>
            <table class="immtable10 t-c" width="100%" border="1">
              <tbody>
              <tr>
                <td colspan="11" style="border-top: 1px solid;border-bottom: 1px solid">健康状况检查</td>
              </tr>
              <tr>
                <td style="width: 12%">检查日期</td>
                <td style="width: 8%">皮温</td>
                <td style="width: 8%">肛温</td>
                <td style="width: 8%">脉搏</td>
                <td style="width: 9%">呼吸</td>
                <td style="width: 9%">可视粘膜</td>
                <td style="width: 9%">皮肤</td>
                <td style="width: 9%">体重</td>
                <td style="width: 9%">检查机构</td>
                <td style="width: 9%">兽医</td>
                <td style="width: 9%">备注</td>
              </tr>
              <tr v-for="(item,index) in list1">
                <td v-if="item.inspectTime">{{item.inspectTime|formatDate(dataFormatPattern)}}</td><td v-else>...</td>
                <td v-if="item.skinTemperature">{{item.skinTemperature}}</td><td v-else>...</td>
                <td v-if="item.analTemperature">{{item.analTemperature}}</td><td v-else>...</td>
                <td v-if="item.pulse">{{item.pulse}}</td><td v-else>...</td>
                <td v-if="item.breathe">{{item.breathe}}</td><td v-else>...</td>
                <td v-if="item.visibleMucousMembrane">{{item.visibleMucousMembrane}}</td><td v-else>...</td>
                <td v-if="item.skin">{{item.skin}}</td><td v-else>...</td>
                <td v-if="item.weight">{{item.weight}}</td><td v-else>...</td>
                <td v-if="item.orgName">{{item.orgName}}</td><td v-else>...</td>
                <td v-if="item.userName">{{item.userName}}</td><td v-else>...</td>
                <td v-if="item.remark">{{item.remark}}</td><td v-else>...</td>
              </tr>
              </tbody>
            </table>
            <table class="immtable10 t-c" width="100%" border="1">
              <tbody>
              <tr>
                <td colspan="7" style="border-top: 1px solid;border-bottom: 1px solid">免疫记录</td>
              </tr>
              <tr>
                <td style="width: 14%">免疫日期</td>
                <td style="width: 14%">免疫项目</td>
                <td style="width: 14%">疫苗厂家及批号</td>
                <td style="width: 14%">下次免疫时间</td>
                <td style="width: 14%">兽医</td>
                <td style="width: 14%">免疫机构</td>
                <td style="width: 14%">备注</td>
              </tr>
              <tr v-for="(item,index) in list":key="index">
                <td class="cor3" v-if="item.fact_injection_date">{{item.fact_injection_date|formatDate(dataFormatPattern)}}</td>
                <td class="cor3" v-else>···</td>
                <td class="cor3" v-if="item.vaccine_name">{{item.vaccine_name}}</td>
                <td class="cor3" v-else>···</td>
                <td class="cor3" v-if="item.vaccine_producer">{{item.vaccine_producer}}</td>
                <td class="cor3" v-else>···</td>
                <td class="cor3" v-if="item.next_injection_date">{{item.next_injection_date|formatDate(dataFormatPattern)}}</td>
                <td class="cor3" v-else>···</td>
                <td class="cor3" v-if="item.name">{{item.name}}</td>
                <td class="cor3" v-else>···</td>
                <td class="cor3" v-if="item.organization_name">{{item.organization_name}}</td>
                <td class="cor3" v-else>···</td>
                <td class="cor3" v-if="item.remarks" style="width: 25%;word-wrap：break-word;">{{item.remarks}}</td>
                <td class="cor3" v-else>···</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style="padding-bottom: 20px;padding-top: 10px;font-size: 20px;">
          <div style="margin-left: 10%">
            <span>免疫单位：{{confs&&confs.userInfo&&confs.userInfo.tOrganization&&confs.userInfo.tOrganization.organizationName
              ?confs.userInfo.tOrganization.organizationName:'...'}}</span>
            <span style="margin-left: 45%" v-if="list.length>0&&list[(list.length)-1].fact_injection_date">初始记录日期：{{list[(list.length)-1].fact_injection_date|formatDate(dataFormatPattern)}}</span>
            <span style="margin-left: 50%" v-else>初始记录日期：...</span>
          </div>
        </div>
      </div>
    </div>
    <!--打印-->
  </div>
  <!--内容区END-->
</template>

<script>
import conf from "../../common/config"
  export default {
    name: "operatorMsgAuditList",
    data(){
      return {
        mmuneList:[],//免疫登记列表
        page:[],//分页对象
        params:{//请求参数
          num: 1,
          size:6,
          input:'',
          org_id:conf.userInfo.organizationId
        },dataFormatPattern :'yyyy/MM/dd'
        ,getPrintImm:{//打印的信息
          dogInfo:{}//登记信息（犬，犬主信息）
          ,Immunelist:[]//免疫记录集合信息
          ,HealthConditionList:[]//健康检查集合
        },confs:conf
        ,dogInfos:{}//犬信息列表
        ,list:{}//免疫记录集合
        ,list1:[],//健康记录集合
        orgId:conf.userInfo.organizationId
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
      },printImm(id){
        printImms(this,id);
      },printImmss(){
        var printData = document.getElementById("printimm").innerHTML; // 只打印 forPrint 这个div中的内容。
        window.document.body.innerHTML = printData;   //把 html 里的数据 复制给 body 的 html 数据 ，相当于重置了整个页面的 内容
        window.print();
        if (navigator.userAgent.indexOf("MSIE") > 0){
          document.body.removeChild(iframe);
        }
        location.reload();
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
      console.log(777)
      console.log(res)
      if (res.data) {
        _this.mmuneList = res.data.list;
        _this.page = res.data.pageInfo;
        for (let i=0;i<_this.mmuneList.length;i++) {
          if(_this.mmuneList[i].dog_gender!=null){
            _this.mmuneList[i].dog_gender=_this.mmuneList[i].dog_gender==0?'雄':'雌'
          }
          if(_this.mmuneList[i].birth_time!=null){
            _this.mmuneList[i].birth_time=CalAge(_this.mmuneList[i].birth_time)
          }
        }
        console.log("_this.mmuneList+++"+JSON.stringify(_this.mmuneList))
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  function printImms(_this,id){
    _this.$axios({
      async:false,
      url:'/biz/dogInfo/getTVaccineIdPrint'
      ,params:{dogId:id}
    }).then((ref)=>{
      console.log("打印信息"+JSON.stringify(ref.data))
        if(ref.data.code==200){
          _this.dogInfos=ref.data.dogInfo;
          _this.list=ref.data.printValue.Immunelist;
          _this.list1=ref.data.printValue.HealthConditionList;
          _this.$confirm('确认去打印吗？','提示').then((ref)=>{
          _this.printImmss();
        })
      }else {
          _this.$message("网络延迟，请稍等再试！")
        }

      //_this.getPrintImm=ref.data;
      //_this.getPrintImm.creation_time=creation_time
      /*if(_this.getPrintImm.dogInfo.dog_gender!=null){
        _this.getPrintImm.dogInfo.dog_gender=_this.getPrintImm.dogInfo.dog_gender==0?'雄':'雌'
      }
      if(_this.getPrintImm.dogInfo.birth_time!=null){
        _this.getPrintImm.dogInfo.birth_time=CalAge(_this.getPrintImm.dogInfo.birth_time)
      }*/



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
</script>

<style scoped>
  .seachClick:hover{
    cursor: pointer;
  }
  .immtable10 td{
    border:1px solid #000000;
    color: #000000;
  }
</style>
