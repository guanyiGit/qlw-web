<template>
  <!--内容区-->
  <div class="w980 fr">
    <form @submit.prevent="submit">
      <div class="mgt10 k3">
        <div class="h56 lh56 bgf8 pdl30 pdr30 fs16 cor0 fb">
          添加用户
        </div>
        <div class="ovh pdb30">
          <div class="fl w980 pdr30">
            <div class="ovh pdt10" style="height: 70px">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">用户名称<font color="red"> * </font></span>
                <div class="mgl100">
                  <el-tooltip class="item" effect="dark" content="用户名称大于2个字符" placement="right-start">
                    <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="userSunmit.name">
                  </el-tooltip>
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w105 fl h40 lh40 cor0 pdl30">性别<font color="red"> * </font></span>
                <div class="mgl105">
                  <el-select class="ww100 h40 lh40  borf1 ras4" v-model="userSunmit.sex" placeholder="请选择">
                    <el-option value="0" label="男"></el-option>
                    <el-option value="1" label="女"></el-option>
                  </el-select>
                  <!--<select class="ww100 h40 lh40 pdl20 borf1 ras4 pc4" v-model="userSunmit.sex">-->
                  <!--<option value="0">男</option>-->
                  <!--<option value="1">女</option>-->
                  <!--</select>-->
                </div>
              </div>
            </div>
            <div class="ovh pdt10">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">电话<font color="red"> * </font></span>
                <div class="mgl100">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="userSunmit.phone">
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w105 fl h40 lh40 cor0 pdl30">邮箱<font color="red"> * </font></span>
                <div class="mgl105">
                  <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4" v-model="userSunmit.email">
                </div>
              </div>
            </div>
            <div class="ovh pdt10" style="height: 70px">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">机构类型</span>
                <div class="mgl100">
                  <el-select class="ww100 h40 lh40 borf1 ras4" v-model="userSunmit.orgType" placeholder="请选择机构类型">
                    <el-option label="无" value="" >
                    </el-option>
                    <el-option
                      v-for="(item,index) in orgTypeList"
                      :key="index"
                      :label="item.dictionaryDescribe"
                      :value="item.dictionaryValue"
                    >
                    </el-option>
                  </el-select>

                  <!--<select class="ww100 h40 lh40 pdl20 borf1 ras4 pc4" v-model="userSunmit.orgType">-->
                  <!--<option v-for="(item,index) in orgTypeList" :key="index" :value="item.dictionaryValue">{{-->
                  <!--item.dictionaryDescribe }}-->
                  <!--</option>-->
                  <!--</select>-->
                </div>
              </div>
              <div class="mgt10 ww50 fr">
                <span class="db w105 fl h40 lh40 cor0 pdl30">机构名称<font color="red"
                                                                       v-show="!!userSunmit.orgType"> * </font></span>
                <div class="mgl105">
                  <el-tooltip class="item" effect="dark" content="请先选择所属机构" :disabled="!!userSunmit.orgType"
                              placement="right-start">
                    <el-select class="ww100 h40 lh40 borf1 ras4" v-model="userSunmit.organizationId" placeholder="请选择所属机构">
                      <el-option
                        v-for="(item,index) in orgList"
                        :key="index"
                        :label="item.organizationName"
                        :value="item.organizationId">
                      </el-option>
                    </el-select>
                    <!--<select class="ww100 h40 lh40 pdl20 borf1 ras4 pc4" v-model="userSunmit.organizationId">-->
                    <!--<option v-for="(item,index) in orgList" :key="index" :value="item.organizationId">{{-->
                    <!--item.organizationName }}-->
                    <!--</option>-->
                    <!--</select>-->
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div class="ovh pdt10" style="height: 70px">
              <div class="mgt10 ww50 fl">
                <span class="db w100 fl h40 lh40 cor0 pdl30">所属角色<font color="red"> * </font></span>
                <div class="mgl100">
                  <el-select class="ww100 h40 lh40 borf1 ras4" v-model="userSunmit.roleId" placeholder="请选择所属角色">
                    <el-option
                      v-for="(item,index) in roleList"
                      :key="index"
                      :label="item.roleName"
                      :value="item.roleId"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="t-c mgt140 mgb50">
          <input type="submit" class="dinb w140 h40 lh40 t-c corw bgfbad82 ras4 hov8 bort cursurpo" value="保存">
          <a href="###" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5" @click.prevent="canael">取消</a>
        </div>
      </div>
    </form>


  </div>


</template>

<script>
  export default {
    name: "addUser",
    data() {
      return {
        orgTypeList: [],
        orgList: [],
        roleList:[],
        userSunmit: {
          name: "",
          sex: "",
          phone: "",
          email: "",
          orgType: "",
          organizationId: ""
        }

      }
    },
    created() {
      initOrgType(this);
      initRoleData(this);
    },
    /**
     * 计算属性
     */
    computed: {
      orgType() {
        return this.userSunmit.orgType
      },

    },
    /**
     * watch监听
     */
    watch: {
      orgType(val) {
        this.userSunmit.organizationId = "";
        initOrgList(this, val);
      },

    },

    methods: {
      //表单提交
      submit() {
        let {name, phone, sex, orgType, organizationId,email,roleId} = this.userSunmit;

        if (!name) {
          this.$alert("用户名不能为空")
          return;
        }
        if (name.trim().length < 2) {
          this.$alert("用户名长度不够")
          return;
        }
        if (!sex) {
          this.$alert("性别不能为空")
          return;
        }
        if (!(/0?(13|14|15|17|18|19)[0-9]{9}/.test(phone))) {
          this.$alert("手机号格式不正确！")
          return;
        }

        if (!/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(email)) {
          this.$alert("邮箱地址格式不对！");
          return;
        }

        if (orgType && !organizationId) {
          this.$alert("机构用户请选择所属机构名称！")
          return;
        }

        if (!roleId){
          this.$alert("角色不能为空！");
          return;
        }
        let loadingInstance = this.$loading({
          lock: true,
          text: '正在处理，请稍后...',
          background: 'rgba(0, 0, 0, 0.3)'
        })

        this.$axios({
          url: "/biz/user/add",
          method: "post",
          params: this.userSunmit,
        }).then(res => {
          if (res.data.status == 200) {
            this.$alert("添加成功！")
            this.$router.push({path:'resource'})
          } else {
            this.$alert(res.data.msg)
          }
        }).finally(_ => {
          this.$nextTick(() => loadingInstance.close());
        })
      },
      //取消，返回上一页
      canael(){
        this.$router.back(-1);
        // this.$router.push({name:"operator_resource"})
      }
    }
  }

  /**
   * 获取机构类型
   * @param that
   */
  function initOrgType(that) {
    that.$axios({
      url: "/biz/dictionary/OrgType",
      method: "post",
    }).then(res => {
      if (res.data.status == 200) {
        var orgTypeList = res.data.data;
        if (orgTypeList && orgTypeList.length > 0) {
          that.orgTypeList = orgTypeList
        }
      }
    })
  };

  function initOrgList(that, orgType) {
    that.$axios({
      url: "/biz/serviceSite/selectOrgByTypeId",
      method: "post",
      params: {
        orgType: orgType
      }
    }).then(res => {
      if (res.data.status == 200) {
        var orgList = res.data.data;
        that.orgList = orgList
      }
    })
  }

  /**
   *加载角色列表
   */
  function initRoleData(that) {
    that.$axios({
      url: "/biz/role/list",
      method: "post",
    }).then(res => {
      if (res.data.status == 200) {
        var roleList = res.data.data.list;
        that.roleList = roleList;
        console.log(that.roleList)
      }
    })
  }

</script>

<style scoped>
  .cursurpo{
    cursor: pointer;
  }
</style>
