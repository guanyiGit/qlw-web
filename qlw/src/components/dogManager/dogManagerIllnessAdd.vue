<template>
  <div>
    <div class="ovh div1 h50 rel">
      <p class="abs ww100 left0 bottom0"></p>
      <a style="cursor:pointer" class="fl db fs16 cor3c3c3c w200 h50 lh50 t-c active">新增病历</a>
      <a style="cursor:pointer;display: none;" class="fl db fs16 cor3c3c3c w200 h50 lh50 t-c">新增无证病历</a>
    </div>
  <!--内容区-->
    <!--办理无证病历记录-->
    <div class="div12 w980 fr">
      <div class="mbx">
        <br/>
        <ul class="ul11 clearfix">
          <li><router-link :to="{name:'hospital_IllnessList'}">病历记录></router-link></li>
          <li>新增无证病历</li>
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
                <select id="breed" type="text" class="ww100 h40 lh40 pdl20 borf1 ras4"  v-model="dog.dog_breed_type">
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
          <br/>
          <div class="h60 lh60 pdl30 bgf8 fs16 cor0 fb">录入病历信息</div>
          <div class="ovh">
            <div class="mgt10 fl"style="width: 98%">
              <span class="db w100 fl h40 lh40 cor0 pdl30">症状描述</span>
              <div class="mgl100">
                <textarea style="resize:none;width: 100%;height: 130px;border: 1px solid #ddd" v-model="addIll.symptom"></textarea>
              </div>
            </div>
          </div>

          <div class="ovh">
            <div class="mgt10 fl"style="width: 98%">
              <span class="db w100 fl h40 lh40 cor0 pdl30">诊断信息</span>
              <div class="mgl100">
                <textarea style="resize:none;width: 100%;height: 130px;border: 1px solid #ddd" v-model="addIll.diagnose"></textarea>
              </div>
            </div>
          </div>
          <div class="ovh">
            <div class="mgt10 fl"style="width: 98%">
              <span class="db w100 fl h40 lh40 cor0 pdl30">治疗信息</span>
              <div class="mgl100">
                <textarea style="resize:none;width: 100%;height: 130px;border: 1px solid #ddd" v-model="addIll.treatment_info"></textarea>
              </div>
            </div>
          </div>
          <div class="mgt20">
            <span class="db w90 fl h40 lh40 cor0" style="padding-left: 30px;">上传照片</span>
            <div class="mgl90 ovh" style="margin-left: 100px;">
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
              <span class="db w100 fl h40 lh40 cor0 pdl30">医生姓名</span>
              <div class="mgl100">
                <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="addIll.name" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="t-c mgt40 mgb50">
          <!--<input type="submit" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" value="保存">-->
          <input type="button" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" @click="tets" value="保存"/>
          <a href="javascript:" @click="$router.back(-1)"class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5">取消</a>
          <!--<router-link :to="{name:'hospital_IllnessList'}"class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5">取消</router-link>-->
          <!--<a href="/#/dogManager/ImmuneList" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5">取消</a>-->
        </div>
      </div>
    </div>

  </div>
  <!--内容区END-->
</template>

<script>
  import $$ from 'jquery'
  import  conf from "../../common/config"
  export default {
    name: "dogManagerIllnessAdd",
    data(){
      return{
        dataFormatPattern:'yyyy年MM月dd日'
        ,colorList:[],//初始化毛色
        breedList:[]//初始化犬品种
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
        },addIll:{
          org_id:conf.userInfo.organizationId//机构id
          ,operation_id:conf.userInfo.userId//办理人id
          ,name:conf.userInfo.name//医名称
          ,symptom:""//症状描述
          ,diagnose:""//诊断
          ,treatment_info:""//治疗信息
          ,remarks:""//备注信息
        },dis:{
          dog_owner_name:false
          ,card_num:false
        }
      }
    },created(){
      initSelectOption(this);
    },mounted(){

    },
    methods:{
      tets:function(){
        add(this)
      },leave:function(){
        getDogOwner(this);
      },
    },computed:{

    }
  }
  //添加病历记录
  function add(_this){
    try{
      let vaccine={};
      vaccine.dog_owner_id=_this.dogOwner.dog_owner_id;
      vaccine.dog_owner_name=_this.dogOwner.dog_owner_name;
      vaccine.dog_owner_phone=_this.dogOwner.dog_owner_phone;
      vaccine.card_num=_this.dogOwner.card_num;

      vaccine.dog_name=_this.dog.dog_name;
      vaccine.dog_breed_type=_this.dog.dog_breed_type;
      vaccine.dog_color_type=_this.dog.dog_color_type;
      vaccine.dog_gender=_this.dog.sex;
      vaccine.operation_id=_this.addIll.operation_id;//记录人id

      vaccine.org_id=_this.addIll.org_id
      vaccine.operation_id=_this.addIll.operation_id
      vaccine.physician_name=_this.addIll.name//医名称
      vaccine.symptom=_this.addIll.symptom//症状描述
      vaccine.diagnose=_this.addIll.diagnose//诊断
      vaccine.treatment_info=_this.addIll.treatment_info//治疗信息
      vaccine.remarks=_this.addIll.remarks//备注信息
      if(!vaccine.dog_owner_phone || !/^1[34578]\d{9}$/.test(vaccine.dog_owner_phone) ){
        _this.$message("电话号码格式有误！")
        return
      }
      if(vaccine.dog_owner_name==null||vaccine.dog_owner_name==''){
        _this.$message("请输入犬主姓名")
        return
      }
      if(vaccine.card_num==null||vaccine.card_num==''){
        _this.$message("请输入身份证信息")
        return
      }
      if(vaccine.dog_name==null||vaccine.dog_name==''){
        _this.$message("请输入犬名")
        return
      }
      if(vaccine.physician_name==null||vaccine.physician_name==''){
        _this.$message("请填入医生姓名")
        return;
      }
      if(vaccine.symptom==null||vaccine.symptom==''){
        _this.$message("请填入症状描述")
        return;
      }
      if(vaccine.diagnose==null||vaccine.diagnose==''){
        _this.$message("请输入诊断信息")
        return;
      }
      if(vaccine.treatment_info==null||vaccine.treatment_info==''){
        _this.$message("请输入治疗信息")
        return;
      }

      console.log(JSON.stringify(vaccine))
      _this.$axios({
        url: '/biz/dogInfo/addWZTherapy',
        params:{therapy:JSON.stringify(vaccine)}
      }).then((res) => {
        console.log(res.data)
        if(res.data>0){
          _this.$alert("添加成功！")
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
          _this.$router.push({path:'IllnessList'})
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
          _this.disTrictList=dataa.disTrictList,
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
