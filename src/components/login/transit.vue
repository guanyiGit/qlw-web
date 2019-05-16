<template>
    <div style="margin-left: 30%;font-size: 18px">登陆中。。。。。。</div>
</template>

<script>
  import configJS from '../../common/config'
    export default {
        name: "transit",
      beforeCreate(){
        //获取用户信息
        let href=window.location.href
        let attr=href.split("?");
        let code=attr[1]
        this.$axios({
          url: "/biz/server/accessToken",
          method: 'get',
          params:{code:code}
        }).then((res) => {
          if (res.data.status == 200) {
            if (res.data.data) {
              //登录成功将用户信息放入全局
              configJS.userInfo = res.data.data;
              this.$store.commit("changUserInfo",res.data.data)
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

                //跳转到首页
                toIndexx(this)
                // window.close();
              }
            })

          } else {
            this.$alert(res.data.msg, "登录提示")
          }
        }).catch(_ => {
        })
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
  function toIndexx(_this) {
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

</style>
