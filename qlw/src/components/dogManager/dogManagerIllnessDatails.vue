<template>
  <!--内容区-->
  <div class="w980 fr">
    <div class="mbx">
      <ul class="ul11 clearfix">
        <li><router-link :to="{name:'hospital_IllnessList'}">病历记录></router-link></li>
        <li>病历详情</li>
      </ul>
    </div>
    <div class="mgt20 k3">
      <table class="table10 t-c" width="100%" border="1">
        <tbody>
        <tr>
          <td>免疫证号</td>
          <td class="cor9">{{Datails.immune_card_num?Datails.immune_card_num:'-'}}</td>
          <td>犬证号</td>
          <td class="cor9">{{Datails.card_num?Datails.card_num:'-'}}</td>
        </tr>
        <tr>
          <td>犬主姓名</td>
          <td class="cor9">{{Datails.dog_owner_name?Datails.dog_owner_name:'-'}}</td>
          <td>联系电话</td>
          <td class="cor9">{{Datails.dog_owner_phone?Datails.dog_owner_phone:'-'}}</td>
        </tr>
        <tr>
          <td>犬只名称</td>
          <td class="cor9">{{Datails.dog_name?Datails.dog_name:'-'}}</td>
          <td>性别</td>
          <td class="cor9">{{Datails.dog_gender?Datails.dog_gender:'-'}}</td>
        </tr>
        <tr>
          <td>犬只品种</td>
          <td class="cor9">{{Datails.breed?Datails.breed:'-'}}</td>
          <td>犬龄</td>
          <td class="cor9">{{Datails.birth_time?Datails.birth_time:'-'}}</td>
        </tr>
        <tr>
          <td>毛色</td>
          <td class="cor9">{{Datails.color?Datails.color:'-'}}</td>
          <td></td>
          <td class="cor9"></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="ovh mgt20">
      <div class="fl cor6 h40 lh40">
        <a href="javascript:" class="db fl hov8 corffa472 mgr35 pc9 pdl36" @click="check">新增</a>
      </div>
    </div>

    <div class="mgt10 k3 t-c">
      <table class="table5" width="100%" border="1">
        <tbody>
        <tr>
          <td class="cor0 h60 bgf1">时间</td>
          <td class="cor0 h60 bgf1">症状描述</td>
          <td class="cor0 h60 bgf1">诊断</td>
          <td class="cor0 h60 bgf1">治疗信息</td>
          <td class="cor0 h60 bgf1">备注</td>
          <td class="cor0 h60 bgf1">操作</td>
        </tr>
        <tr v-for="(item,index) in DatailList":key="index">
          <td class="cor3"style="width: 18%;word-break:break-all;">{{item.creation_time|formatDate(dataFormatPattern)}}</td>
          <td class="cor3"style="width: 18%;word-break:break-all;">{{item.symptom}}</td>
          <td class="cor3"style="width: 18%;word-break:break-all;">{{item.diagnose}}</td>
          <td class="cor3"style="width: 18%;word-break:break-all;">{{item.treatment_info}}</td>
          <td class="cor3"style="width: 20%;word-break:break-all;">{{item.remarks}}</td>
          <td class="cor3"style="width: 10%;word-break:break-all;">
            <router-link :to="{name:'hospital_txyinfos',params:{'dogIds':item.therapy_id}}">病历记录详情</router-link>
          </td>

        </tr>

        </tbody>
      </table>
      <page-vue :page-data="pageDate" @chekdpageCallcak="chekdPage"></page-vue>
    </div>
    <!--弹窗   说明。.db--显示，.dn--隐藏-->
    <div class="T db" style="display: none;z-index: 2;top: 12%">
      <div class="tan6 abs bgw k3 db" style="height: 80%;top: 45%">
        <div class="h60 lh60 pdl30 bgf8 fs16 cor0 fb">新增病历信息</div>
        <div class="ovh">
          <div class="mgt10 fl"style="width: 98%">
            <span class="db w100 fl h40 lh40 cor0 pdl30">症状描述</span>
            <div class="mgl100">
              <textarea style="resize:none;width: 100%;height: 80px;border: 1px solid #ddd" v-model="addIll.symptom"></textarea>
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 fl"style="width: 98%">
            <span class="db w100 fl h40 lh40 cor0 pdl30">诊断信息</span>
            <div class="mgl100">
              <textarea style="resize:none;width: 100%;height: 80px;border: 1px solid #ddd" v-model="addIll.diagnose"></textarea>
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 fl"style="width: 98%">
            <span class="db w100 fl h40 lh40 cor0 pdl30">治疗信息</span>
            <div class="mgl100">
              <textarea style="resize:none;width: 100%;height: 80px;border: 1px solid #ddd" v-model="addIll.treatmentInfo"></textarea>
            </div>
          </div>
        </div>
        <div class="mgt20">
          <span class="db w90 fl h40 lh40 cor0" style="padding-left: 30px;">上传照片</span>
          <div class="mgl90 ovh" style="margin-left: 100px">
            <img-upload ref="imgs" style="width: 98%"></img-upload>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 fl"style="width: 98%">
            <span class="db w100 fl h40 lh40 cor0 pdl30">备注信息</span>
            <div class="mgl100">
              <textarea style="resize:none;width: 100%;border: 1px solid #ddd" v-model="addIll.remarks"></textarea>
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w90 fl h40 lh20 cor0 pdl30">医生姓名</span>
            <div class="mgl100">
              <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="addIll.physicianName" disabled >
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
    export default {
        name: "dogManagerIllnessDatails"
      ,data(){
          return{
            DatailList:{}//病历集合
            ,Datails:''
            ,dataFormatPattern :'yyyy年MM月dd日'
            ,addIll:{//添加值集合
              physicianName:conf.userInfo.name//医名称
              ,symptom:""//症状描述
              ,diagnose:""//诊断
              ,treatmentInfo:""//治疗信息
              ,remarks:""//备注信息
            },pageInfo:{//分页
              pageNum:1
              ,pageSize:5
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
        url: '/biz/dogInfo/getDogTherapeList',
        params: {"dogId": _this.$route.params.dogId,"orgId":conf.userInfo.organizationId
        ,"num":_this.pageInfo.pageNum,"size":_this.pageInfo.pageSize}
      }).then((res) => {
        if(res.data){
          _this.DatailList=res.data.list
          _this.Datails=res.data.dogInfo;
          _this.pageInfo=res.data.pageInfo;
          if(_this.Datails.birth_time!=null){
            _this.Datails.birth_time=CalAge(_this.Datails.birth_time)
          }
          console.log(_this.Datails)
          if(_this.Datails.dog_gender!=null){
            _this.Datails.dog_gender=_this.Datails.dog_gender==0?'雄':'雌'
          }
        }

      }).catch((res)=>{
        console.log(res.message)
      });
    }
  function add(_this){
    try{
      //let dogCardNum=_this.Datails.dogImmune.immuneCardNum//如果没有犬证号进入异常
      let tTherapy={};
      tTherapy.orgId=conf.userInfo.organizationId;//机构id
      tTherapy.physicianName=_this.addIll.physicianName//医生名称
      tTherapy.dogId=_this.Datails.dog_id//狗id
      tTherapy.dogOwnerId= _this.Datails.dog_owner_id//犬主id
      tTherapy.operationId=conf.userInfo.userId//记录人id（登陆用户id）

      tTherapy.symptom=_this.addIll.symptom//症状描述
      tTherapy.diagnose=_this.addIll.diagnose//诊断
      tTherapy.treatmentInfo=_this.addIll.treatmentInfo//治疗信息
      tTherapy.remarks=_this.addIll.remarks//备注
      if(tTherapy.physicianName==null||tTherapy.physicianName==''){
        _this.$message("请填入医生姓名")
        return;
      }
      if(tTherapy.symptom==null||tTherapy.symptom==''){
        _this.$message("请填入症状描述")
        return;
      }
      if(tTherapy.diagnose==null||tTherapy.diagnose==''){
        _this.$message("请输入诊断信息")
        return;
      }
      if(tTherapy.treatmentInfo==null||tTherapy.treatmentInfo==''){
        _this.$message("请输入治疗信息")
        return;
      }
      _this.$axios({
        url: '/biz/dogInfo/insertTherapyRecord',
        params:tTherapy
      }).then((res) => {
        if(res.data>0){
          _this.$alert("添加成功")
          $(".T").hide()
          _this.pageInfo.pageNum=1
          _this.addIll.symptom=""
          _this.addIll.diagnose=""
          _this.addIll.treatmentInfo=""
          _this.addIll.remarks=""
          initData(_this)//添加成功刷新病历记录
          if (res.data>0) {
            //图片上传
            let imgs = _this.$refs.imgs;
            if(imgs!=null&&imgs!=''){
              imgs.upload({
                type: 14,
                id: res.data
              })
              _this.$refs.key=null;
            } else {
              this.$alert("图片上传失败！")
            }
            }


        }
      }).catch((res)=>{
        _this.$alert("添加失败")
        console.log(res.message)
      });
    } catch (e) {
      _this.$message("该免疫证信息不完整，不能添加！")
    } finally {
    }
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
  td{
    text-align:center;
  }
</style>
