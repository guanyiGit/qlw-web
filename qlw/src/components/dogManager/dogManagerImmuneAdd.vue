<template>
  <div>
    <div class="ovh div1 h50 rel">
      <p class="abs ww100 left0 bottom0"></p>
      <a style="cursor:pointer;" class="fl db fs16 cor3c3c3c w200 h50 lh50 t-c active">免疫登记</a>
    </div>
    <!--办理免疫登记-->
    <div class="div12 w980 fr">
      <div class="mbx">
        <br/>
        <ul class="ul11 clearfix">
          <li><router-link :to="{name:'hospital_ImmuneList'}">免疫登记></router-link></li>
          <li>新建免疫登记</li>
        </ul>
      </div>
      <div class="mgt20 k3">
        <div class="h56 lh56 bgf8 pdl30 pdr30 fs16 cor0 fb">基本信息</div>
        <div class="pdt10 pdb20 pdr30">
          <div class="ovh">

            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">联系电话<b style="color: red">&nbsp;*</b></span>
              <div class="mgl100">
                <input type="text" @blur="leave()" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogOwner.dog_owner_phone">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w90 fl h40 lh40 cor0 pdl30">犬主姓名<b style="color: red">&nbsp;*</b></span>
              <div class="mgl90">
                <input type="text" :disabled="dis.dog_owner_name" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogOwner.dog_owner_name">

              </div>
            </div>
          </div>
          <div class="ovh">

            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">身份证号<b style="color: red">&nbsp;*</b></span>
              <div class="mgl100">
                <input type="text" :disabled="dis.card_num" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dogOwner.card_num">
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">犬只姓名<b style="color: red">&nbsp;*</b></span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dog.dog_name">

              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w90 fl h40 lh40 cor0 pdl30">犬只品种</span>
              <div class="mgl90">
                <select id="breed"type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dog.dog_breed_type">
                  <option value="999">其他</option>
                  <option v-for="item in breedList" v-bind:value="item.dictionaryValue">{{item.dictionaryDescribe}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">性别</span>
              <div class="mgl100">
                <select id="dogsex" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dog.sex">
                  <option value="0">雄</option>
                  <option value="1">雌</option>
                </select>
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w90 fl h40 lh40 cor0 pdl30">毛色</span>
              <div class="mgl90">
                <select id="color" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="dog.dog_color_type">
                  <option value="999">其他</option>
                  <option v-for="item in colorList" v-bind:value="item.dictionaryValue">{{item.dictionaryDescribe}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">免疫项目<b style="color: red">&nbsp;*</b></span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="addImm.vaccine_name">
              </div>
            </div>
            <div class="mgt10 ww50 fr">
              <span class="db w90 fl h40 lh40 cor0 pdl30">接种兽医</span>
              <div class="mgl90">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="addImm.name" disabled>
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
              <span class="db w90 fl h40 lh40 cor0 pdl30">免疫时间<b style="color: red">&nbsp;*</b></span>
              <div class="mgl90">
                <el-date-picker  v-model="addImm.cardDateStart" disabled name="startTime" type="date" placeholder="选择日期" class="wd100b"
                                 format="yyyy年MM月dd日">
                </el-date-picker>
              </div>
            </div>

          </div>
          <div class="ovh">
            <div class="mgt10 ww50 fl">
              <span class="db w90 fl h40 lh20 cor0 pdl30">下次免疫<br>时间</span>
              <div class="mgl100">
                <el-date-picker  v-model="addImm.nextDateStart" name="startTime" type="date" placeholder="选择日期" class="wd100b"
                                 format="yyyy年MM月dd日">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 ww100 fl">
              <span class="db w100 fl h40 lh40 cor0 pdl30">备注</span>
              <div class="mgl100">
                <textarea class="ww100 h140 pdl20 borf1 ras4" v-model="addImm.remarks"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="t-c mgt40 mgb50">
          <input type="button" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="tets" value="保存"/>
          <a href="javascript:"@click="$router.back(-1)" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5">取消</a>
        </div>
      </div>
    </div>
  </div>
  <!--内容区-->

  <!--内容区END-->
</template>

<script>
  import $$ from 'jquery'
  import  conf from "../../common/config"

    export default {
        name: "dogManagerImmuneAdd"
      ,data(){
          return{
            colorList:[],//初始化毛色
            breedList:[]//初始化犬品种
            ,dataFormatPattern:'yyyy年MM月dd日'
            ,dogOwner:{
              dog_owner_id:''//犬主id
              ,dog_owner_name:''//犬主
              ,dog_owner_phone:''//电话
              ,card_num:''//犬主身份证
            },dog:{
              dog_id:''//犬id
              ,dog_name:''//犬名
              ,dog_breed_type:999//犬品种
              ,sex:0//性别
              ,dog_color_type:999//毛色
            },addImm:{
              org_id:conf.userInfo.organizationId//机构id
              ,vaccine_name: ''//疫苗名称
              ,vaccine_producer: ''//疫苗厂家
              ,cardDateStart: new Date()//免疫时间
              ,operator_id:conf.userInfo.userId//注射入id
              ,name:conf.userInfo.name//兽医
              ,nextDateStart: ''//下次免疫时间
              ,remarks:''//备注
            },dis:{
              dog_owner_name:false
              ,card_num:false
            }
          }
      },created(){
        //初始化毛色品种
        initSelectOption(this);
      },mounted(){

      },methods:{
        //点击保存
        tets:function(){
          add(this)
        },leave:function(){
          getDogOwner(this)//根据犬主电话得到犬主信息
        }
      },computed:{
      }
    }


  //添加免疫登记
  function add(_this){
    try{
      let vaccine={};
      vaccine.dog_owner_id=_this.dogOwner.dog_owner_id;
      vaccine.dog_owner_name=_this.dogOwner.dog_owner_name;
      vaccine.dog_owner_phone=_this.dogOwner.dog_owner_phone
      vaccine.card_num=_this.dogOwner.card_num

      vaccine.dog_id=_this.dog_id;
      vaccine.dog_name=_this.dog.dog_name
      vaccine.dog_breed_type=_this.dog.dog_breed_type;
      vaccine.dog_color_type=_this.dog.dog_color_type;
      vaccine.dog_gender=_this.dog.sex;
      vaccine.operation_id=_this.addImm.operator_id;//记录人id

      vaccine.operator_id=_this.addImm.operator_id;//注射入id
      vaccine.org_id=_this.addImm.org_id//机构id
      vaccine.vaccine_name=_this.addImm.vaccine_name//免疫姓名
      vaccine.vaccine_producer=_this.addImm.vaccine_producer//疫苗厂家
      vaccine.first_injection_date=_this.addImm.cardDateStart//第一次免疫时间
      vaccine.fact_injection_date=_this.addImm.cardDateStart//免疫时间
      vaccine.next_injection_date=_this.addImm.nextDateStart//下次免疫时间
      vaccine.remarks=_this.addImm.remarks//备注

      if(!vaccine.dog_owner_phone || !/^1[34578]\d{9}$/.test(vaccine.dog_owner_phone) ){
        _this.$message("电话号码格式有误！")
        return
      }
      if(vaccine.dog_owner_name==null||vaccine.dog_owner_name==''){
        _this.$message("请输入犬主姓名")
        return
      }
      if(vaccine.card_num==null||vaccine.card_num==''){
        _this.$message("请输入身份证")
        return
      }
      if(vaccine.dog_name==null||vaccine.dog_name==''){
        _this.$message("请输入犬名")
        return
      }

      if(vaccine.fact_injection_date==null||vaccine.fact_injection_date==''){
        _this.$message("请输入免疫时间")
        return
      }
      if(vaccine.vaccine_name==null||vaccine.vaccine_name==''){
        _this.$message("请输入免疫项目")
        return
      }
      if(vaccine.next_injection_date!=null&&vaccine.next_injection_date!=''&&vaccine.next_injection_date<vaccine.fact_injection_date){
        _this.$message("下次免疫时间不能小于免疫时间")
        return
      }
      if(vaccine.next_injection_date!=null&&vaccine.next_injection_date!=''){
        vaccine.next_injection_date=vaccine.next_injection_date.getFullYear() + '-' + (vaccine.next_injection_date.getMonth() + 1) + '-' + vaccine.next_injection_date.getDate();
      }
      console.log(JSON.stringify(vaccine))
      _this.$axios({
        url: '/biz/dogInfo/addWZT_vaccine',
        params:{vaccine:JSON.stringify(vaccine)}
      }).then((res) => {
        console.log(res.data)
        if(res.data){
          _this.$alert("添加成功！")
          _this.$router.push({path:'ImmuneList'})
        }else {
          _this.$alert("添加失败！")
        }
      }).catch((res)=>{
        _this.$alert("添加失败！")
        console.log(res.message)
      });
    } catch (e) {
      _this.$message("信息填写不完整，请重新选择！")
    } finally {
    }
  }
  //初始化毛色 品种等
  function initSelectOption(_this) {
    _this.$axios({
      method: 'get',
      url: '/biz/dogInfo/findBreedColorDistrict'
      // params: {collectionId:1}
    }).then((res) => {
      if (res.data.meta.success) {
        if (res.data.data!=null) {
          var dataa=res.data.data
            _this.breedList=dataa.breedList,
            _this.colorList=dataa.colorList
        }
      }
    })
  }
  //查找犬主信息
  function getDogOwner(_this) {
    if(_this.dogOwner.dog_owner_phone!=null&&_this.dogOwner.dog_owner_phone!=''){
      if(!/^1[34578]\d{9}$/.test(_this.dogOwner.dog_owner_phone) ){
        _this.$message("电话号码格式有误！")
        _this.dis.dog_owner_name=false;
        _this.dis.card_num=false;
        //_this.dogOwner.dog_owner_name="";
        //_this.dogOwner.card_num="";
        return
      }
      _this.$axios({
        url:"biz/dogInfo/getDogOwner"
        ,params:{dog_owner_phone:_this.dogOwner.dog_owner_phone}
      }).then((ref=>{
        if(ref.data){
          _this.dogOwner=ref.data;
          console.log("犬主"+JSON.stringify(_this.wznew))
          _this.dis.dog_owner_name=true;
          _this.dis.card_num=true;
        }else {
          _this.dis.dog_owner_name=false;
          _this.dis.card_num=false;
          _this.dogOwner.dog_owner_name="";
          _this.dogOwner.card_num="";
        }
      }))
    }
  }
  //根据出生日期返回年龄
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
