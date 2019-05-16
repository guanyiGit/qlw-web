<template>
  <!--内容区-->
  <div class="w980 fr">
    <div class="mbx">
      <ul class="ul11 clearfix">
        <li>
          <a href="###" @click.prevent="$router.go(-1)">我的消息 ></a>
        </li>
        <li>消息详情</li>
      </ul>
    </div>
    <div class="ovh mgt20">
      <div class="pdt6 pdb15 pdl30 pdr30">
        <el-collapse accordion v-if="list && list.length>0">
          <el-collapse-item v-for="(item,index) in list" :key="index"
                            class="db cor3 lh45 hov8 pdl24 pc3 ">
            <template slot="title" class="titile">
              <span>{{item.notifTitle}}</span>
              <span class="fr cor9 mar30">{{item.creationTime | formatDate(pattern)}}</span>
            </template>
            <div>{{item.notiContent}}</div>
          </el-collapse-item>
        </el-collapse>
        <div v-if="!list || list.length==0">暂无消息</div>

        <tr>
          <td></td>
        </tr>
      </div>
    </div>
  </div>
  <!--内容区END-->
</template>

<script>
  import configJs from '../../common/config'
    export default {
        name: "messageDetail"
    }

  function initData(_this) {
    _this.$axios({
      url: '/biz/notice/selectNoticeByReceiverd',
      method: 'post',
      params
    }).then(res => {
      _this.totalCount = res.data.data.total;
      _this.list = res.data.data.list;
      console.log(_this.list)
    })
  }
</script>

<style scoped>

</style>
