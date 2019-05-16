<template>
  <div>
    <div id="login" class="fixed">
      <div class="login">
        <div>
          <div class="ovh">
            <router-link alt="去首页" tag="img" class="c-b image" src="/static/images/1.png" :to="{name:'index'}">11</router-link>
          </div>
          <form action="#" class="mgt40">
            <el-tooltip class="item" effect="dark" :content.sync="userNameMsg" placement="right"
                        popper-class="test" :enterable="false">
              <p class="mgt10">
                <input class="db ww100 h50 lh50 pdl65 ras6 borbfc695 pc21 input"  type="text" v-model="userName"
                       placeholder="请输入用户名" autocomplete="off">
              </p>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content.sync="passwordMsg" placement="right" :enterable="false">
              <p class="mgt10">
                <input class="db ww100 h50 lh50 pdl65 ras6 borbfc695 pc22 input" type="password"
                       v-model="password" placeholder="请输入密码" autocomplete="on">
              </p>
            </el-tooltip>

            <p class="mgt40"><input class="formsub db ww100 h58 lh60 sub1 ras10 fs24 corw t-c" type="submit"
                                    @click.prevent="login" value="登录">
            </p>

            <div class="btns">
              <div>
                <router-link  class="db corfffefe hov8 fs14" :to="{name:'index'}" style="">去首页</router-link>
              </div>
              <div>
                <a  class="db corfffefe hov8 fs14"  style="cursor:pointer;" href="/biz/server/requestServerCode">电信授权登陆</a>
                <!--<a  class="db corfffefe hov8 fs14"  style="cursor:pointer;" @click="telecomAuthorizationLogin">电信授权登陆</a>-->
                <iframe href="/biz/server/requestServerCode"></iframe>
              </div>
              <div>
                <a  class=" db corfffefe hov8 fs14" style="" @click.prevent="forgetPassword">忘记密码</a>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
    <!--找回密码-->
    <el-dialog title="找回密码" :visible.sync="dialogFormVisible" width="450px" :close-on-click-modal="false" @close="closeDialog('forget')">
      <el-form :model="forget" :rules="rules" ref="forget"  status-icon>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="forget.username" autocomplete="off"  placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="验证码 " :label-width="formLabelWidth" prop="imageCode">
          <el-input v-model="forget.imageCode" autocomplete="off"  placeholder="请输入验证码"></el-input>
          <div class="smsCode">
            <div @click="refreshCode">
              <s-identify :identifyCode="identifyCode" :contentWidth="contentWidth" :contentHeight="contentHeight" style="margin-top: 10px;"></s-identify>
            </div>
            <el-button type="primary" style="margin-left: 15px;width: 138px;height: 50px;margin-top: 10px" :disabled="disabled" @click="sendSms" >{{ smsText }}</el-button>
          </div>
        </el-form-item>

        <el-form-item label="短信验证码 " :label-width="formLabelWidth"  prop="smsCode">
          <el-input v-model="forget.smsCode" autocomplete="off"  placeholder="请输入短信验证码" ></el-input>

        </el-form-item>

        <el-form-item label="新密码 " :label-width="formLabelWidth" prop="newPassword">
          <el-input type="password" v-model="forget.newPassword" autocomplete="off" placeholder="请输入新密码"></el-input>
        </el-form-item>

        <el-form-item label="确认密码 " :label-width="formLabelWidth" prop="confirmPassword">
          <el-input type="password" v-model="forget.confirmPassword" autocomplete="off" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" @close="closeDialog('forget')">取 消</el-button>
        <el-button type="primary" @click="editPassword('forget')">修改密码</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import configJS from '../../common/config'
  import $ from 'jquery'
  export default {
    name: "login",
    data() {
      var validateUserName = (rule, value, callback) =>{
        if (!value){
          callback(new Error('用户名不能为空'))
        }else {
          this.$axios({
            url:"/biz/user/selectUserByUserName/"+value,
          }).then( (res)=>{
            if (res.data.status == 401){
              callback("用户名不存在");
            } else if (res.data.status == 400){
              this.$message({
                message: '服务器异常，请稍后再试！',
                type: 'warning'
              })
            }else{
              this.userId = res.data.data.userId;
              this.phone = res.data.data.phone;
              callback();
            }
          })
        }
      }

      var validateImageCode = (rule, value, callback) =>{
          if (!value){
             callback(new Error('图片验证码不能为空'))
          }else if (value != this.identifyCode){
              this.disabled = true;
              callback(new Error('图片验证码不正确，请重新输入'))
          }else {
            this.disabled = false
            callback();
          }
      }

      var validateConfirmPassword = (rule, value, callback) =>{
        if (!value){
          callback(new Error('请再次输入密码'))
        }else if (value != this.forget.newPassword){
          callback(new Error('两次输入密码不一致!'))
        }else {
          callback()
        }
      }

      var validateSmsCode = (rule, value, callback) =>{
        if (value != this.smsCodeReally){
          callback(new Error('短信验证码不正确'))
        } else {
          callback();
        }
      }

      return {
        rules:{
          username:[
            {required:true,message:"用户名不能为空",trigger:'blur'},
            {validator:validateUserName,trigger:'blur'}
           ],
          imageCode:[
            {required:true,message:"图片验证码不能为空",trigger:'blur'},
            { validator:validateImageCode,trigger:'blur'}
          ],
          smsCode:[
            {required:true,message:"短信验证码不能为空",trigger:'blur'},
            {validator:validateSmsCode}
          ],
          newPassword:[
            {required:true,message:"请输入密码",trigger:'blur'},
          ],
          confirmPassword:[
            {required:true,message:"请再次输入密码",trigger:'blur'},
            {validator:validateConfirmPassword,trigger:'blur'}
          ]
        },

        smsText:"获取短信验证码",
        totalTime: 60,   //默认一分钟发送一次
        canClick: true, //添加canClick
        disabled:true,  //短信按钮默认不可用

        identifyCodes: "1234567890",
        identifyCode: "",
        contentWidth: 138,
        contentHeight:50,

        dialogFormVisible: false,
        formLabelWidth: '100px',

        forget:{
          username:"",
          imageCode:"",
          smsCode:"",
          newPassword:"",
          confirmPassword:""
        },
        phone:"",
        smsCodeReally:"",  //后台返回的验证码



        userName: null,
        userNameMsg: "请输入用户名",
        userNameIs: false,
        password: null,
        passwordMsg: "请输入密码",
        passwordIs: false,
      }
    },
    watch: {
      userName(newVal, oldVal) {
        this.userNameIs = false;
        if (!newVal || newVal.trim().length == 0) {
          this.userNameMsg = "用户名不能为空";
        }
        // if (newVal.trim().length <= 3) {
        //   this.userNameMsg = "用户名长度不够";
        // }
        else {
          this.userNameMsg = "√"
          this.userNameIs = true;
        }
      },
      password(newVal, oldVal) {
        this.passwordIs = false;
        // let reg = /^[a-zA-Z\d_]{5,20}$/;
        if (!newVal || newVal.trim().length == 0) {
          this.passwordMsg = "密码不能为空";
        }
        // if (newVal.trim().length <= 5) {
        //   this.passwordMsg = "密码长度不够";
        // } else if (!reg.test(newVal)) {
        //   this.passwordMsg = "密码格式有误，不能以数组开头";
        // }
        else {
          this.passwordMsg = "√";
          this.passwordIs = true;
        }
      }
    },
    beforeCreate() {
      //如果存在用户信息到首页
      if (configJS.userInfo && configJS.userInfo.userId) {
        toIndex(this)
      }
    },
    methods: {
      //电信授权登陆
      telecomAuthorizationLogin(){
        window.open("http://localhost:8080/#/totran", "authWin", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=500")
        // this.$axios({
        //   url:"/biz/server/requestServerCode",
        // }).then((res) => {
        //   window.open("", "_blank", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=500")
        // })
      },
      // testt(){
      //   window.open($(this).attr("href"),"_blank","toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=500")
      //   window.oauthLogin=function(t){location.hostname.indexOf("segmentfault")!==-1?location.reload():location.href="/"},window.oauthRegister=function(t){location.href="/biz/server/requestServerCode"
      // },
      //短信倒计时
      sendSms(){
        var that = this;
        //发送短信
        that.$axios({
          url:"/biz/dogAndOwner/getCode",
          params:{
            phone:that.phone
          }
        }).then( (res) =>{
          if (res.status == 200){
            console.log(res.data);
            that.smsCodeReally = res.data;
          }
        })
        this.smsText = this.totalTime + 's后重新发送';
        this.disabled = true;   //点击之后，按钮不可用
        let clock = window.setInterval(()=>{
          this.totalTime--;
          this.smsText = this.totalTime + 's后重新发送'
          if (this.totalTime <= 0){ //当倒计时小于0时清除定时器
              window.clearInterval(clock);
              this.disabled = false;
              this.smsText = '重新发送验证码'
              this.totalTime = 60
          }
        },1000)
      },

      //登录
      login() {
        if (this.userNameIs && this.passwordIs) {
          this.$axios({
            // axios({
            url: '/biz/login',
            method: "post",
            params: {
              "username": this.userName.trim(),
              "password": this.password.trim()
            },
            isloading: "body"
          }).then((res) => {
            if (res.data.status == 200) {
              if (res.data.data) {
                //登录成功将用户信息放入全局
                configJS.userInfo = res.data.data;
                this.$store.commit("changUserInfo",res.data.data)
                // try {
                // localStorage.setItem("user_info_token", JSON.stringify(res.data.data))
                // } catch (e) {
                // }
              }
              //获取资源信息
              this.$axios({
                url: "/biz/resource/getResources",
              }).then(res => {
                if (res.data.status == 200 && res.data.data) {
                  let memus = [];//菜单
                  let resource = res.data.data.map((item, index) => {//其他资源
                    if (item.resourceType && item.resourceType == 1) {//菜单类型
                      memus.push(item)
                    } else {//其他资源
                      return item;
                    }
                  })

                  memus.sort(compare)
                  configJS.resource.memu = memus;
                  configJS.resource.other = resource;
                  this.$store.commit("changResource",{
                    memu:memus,
                    other:resource
                  });

                  try {
                    //用户资源信息
                    // localStorage.setItem("resource_info_token", JSON.stringify(configJS.resource));
                    // localStorage.setItem("manager_dog_user_id", configJS.userInfo);
                  } catch (e) {
                  }

                  // console.log(configJS.resource.memu)
                  //跳转到首页
                  toIndex(this)
                }
              })

            } else {
              this.$alert(res.data.msg, "登录提示")
            }
          }).catch(_ => {
          })
        } else {
          this.$alert(this.userNameMsg != "√" ? "用户名格式不正确！" : "密码格式不正确", "登录提示")
        }
      },

      //修改密码
      editPassword(forget){
        var that = this;
        that.$refs[forget].validate((valid,object) => {
            if (valid) {
             //效验通过
              that.$axios({
                url:"/biz/user/retrievePwd/"+that.forget.username+"/"+that.forget.newPassword
              }).then( (res)=>{
                if (res.status == 200){
                  this.dialogFormVisible = false;
                  that.$message({
                    message: '密码修改成功，可重新登录！！',
                    type: 'success'
                  })
                  that.$axios({
                    url:"/biz/logout"
                  }).then( (res) => {
                    console.log(res);
                  } )
                }
              })
            } else {
              return false;
            }
          })
      },

      closeDialog(forget) {
        this.$refs[forget].resetFields();
      },


      forgetPassword(){
        this.dialogFormVisible = true;
      },

      //验证码
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
        }
      }

    },
    mounted(){
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    }
  }

  //资源排序
  let compare = function (obj1, obj2) {
    var val1 = obj1.seq;
    var val2 = obj2.seq;
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  }

  //根据用户信息跳转到其首页
  function toIndex(_this) {
    //用户角色
    try {
      //用户已经登录，并且有首页权限
      let toUrl = 'index';
      configJS.resource.memu.map(item => {
        if (item.seq == 1 && item.level == 2) {
          toUrl = item.link;
        }
      })
      _this.$router.push({name: toUrl});

      // let roleId = configJS.userInfo.tRoles[0].roleId;
      // if (roleId == 1) {//犬只办
      //   _this.$router.push({name: "dogManager_index"});
      // } else if (roleId == 2) {//收容所
      //   _this.$router.push({name: "index"});
      // } else if (roleId == 3) {//犬主
      //   _this.$router.push({name: "index"});
      // } else if (roleId == 4) {//宠物医院
      //   _this.$router.push({name: "index"});
      // } else if (roleId == 5) {//运营方
      //   _this.$router.push({name: "operator_index"});
      // } else if (roleId == 6) {//系统管理员
      //   _this.$router.push({name: "index"});
      // } else {//游客首页
      //   _this.$router.push({name: "index"});
      // }
    } catch (e) {
      _this.$router.push({name: "index"});
    }
  }
</script>

<style scoped>
  @import "../../../static/icon/font_909034_ydsh6k9xp9e/iconfont.css";

  .formsub {
    cursor: pointer;
  }

  .smsCode {
    display: flex;

  }

  .btns {
    margin-top: 25px;
    display: flex;
    justify-content: center;
  }

  .input{
    font-size: 18px;
    letter-spacing: 2px;
  }

  .btns div {
    display: inline-block;
    width: 50%;
    text-align: center;
  }

  .btns div:hover, .image:hover {
    cursor: pointer;
  }

</style>
