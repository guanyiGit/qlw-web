<template>
  <div class="div12 w980"style="margin-left: 23%">
    <div class="mbx">
      <br/>
      <ul class="ul11 clearfix">
        <li>修改密码</li>
      </ul>
    </div>
    <div class="mgt20 k3">
      <div class="pdt10 pdb20 pdr30" style="margin-left: 32%">
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">原密码</span>
            <div class="mgl100">
              <input type="password" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="updPwd.rawPwd">
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">新密码</span>
            <div class="mgl100">
              <input type="password" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="updPwd.newPwd">
            </div>
          </div>
        </div>
        <div class="ovh">
          <div class="mgt10 ww50 fl">
            <span class="db w100 fl h40 lh40 cor0 pdl30">确认密码</span>
            <div class="mgl100">
              <input type="password" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="updPwd.newPwds">
            </div>
          </div>
        </div>
      </div>
      <div class="t-c mgt40 mgb50">
        <input type="button" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort" value="确认修改" @click="upd"/>
        <a href="#"onClick="javascript :history.back(1);" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5">返回</a>
      </div>
    </div>
  </div>
</template>

<script>
  import $$ from 'jquery'
  import conf from '../../common/config'
    export default {
        name: "dogManagerUpdPwd"
      ,data(){
          return{
            updPwd:{//密码对象
              rawPwd:''
              ,newPwd:''
              ,newPwds:''
            }
          }
      },methods:{
          upd:function(){
            updPwd(this);
          }
      }
    }
    //修改密码
    function updPwd(_this){
      let updPwd={};
      updPwd.rawPwd=_this.updPwd.rawPwd.trim();//原密码
      updPwd.newPwd=_this.updPwd.newPwd.trim();//新密码
      updPwd.id=conf.userInfo.userId;//用户id
      updPwd.name=conf.userInfo.username//用户名

      if(updPwd.rawPwd==null||updPwd.rawPwd==''){
        _this.$message("请输入原密码")
        return;
      }
      if(updPwd.newPwd==null||updPwd.newPwd==''){
        _this.$message("请输入新密码")
        return;
      }
      if(_this.updPwd.newPwds.trim()==null||_this.updPwd.newPwds.trim()==''){
        _this.$message("请确认新密码")
        return;
      }
      if(updPwd.newPwd!=_this.updPwd.newPwds.trim()){
        _this.$message("2次输入的密码不一致")
        return;
      }
      if(updPwd.newPwd.length<6){
        _this.$message("密码不能小于6位数")
        return;
      }
      if(updPwd.rawPwd==updPwd.newPwd){
        _this.$message("新密码不能与旧密码一样")
        return;
      }
      _this.$axios({
        url:"/biz/dogInfo/updPwd"
        ,params:{updPwd:JSON.stringify(updPwd)}
      }).then((ref)=>{
        if(ref.data==1){
          outLogin(_this)
        }else if (ref.data==-1) {
          _this.$alert("原密码不正确")
        }else if (ref.data==0) {
          _this.$alert("新密码不能与旧密码一致")
        }else if (ref.data==-2) {
          _this.$alert("修改失败，请联系管理原")
        }else{
          _this.$alert("服务器出现错误")
        }
      })
    }
    function outLogin(_this){
      _this.$alert("修改成功,请重新登陆")
      _this.$axios({url: "/biz/logout", isloading: "body"})
        .then(res => {
          if (res.data.status == 200) {
            conf.userInfo = {};
            conf.resource = [];
          }else{
            this.$message("服务器错误！")
          }
        }).finally(_ => _this.$router.push({name: 'login'}))


    }
</script>

<style scoped>

</style>
