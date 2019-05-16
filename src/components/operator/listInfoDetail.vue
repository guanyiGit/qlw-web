<template>
    <!--信息发布列表查看信息详情-->
  <!--内容区-->
  <div class="w980 fr">
    <div class="mbx">
      <ul class="ul11 clearfix">
        <li><a style="cursor:pointer;" @click="tolist">上一页></a></li>
        <li>{{info?info.infoTitile?info.infoTitile:'信息详情':'信息详情'}}</li>
      </ul>
    </div>
    <form action="#">
      <div class="ovh k3 mgt20">
        <div class="pdt23 pdb23 bgf1 t-c">
          <p class="fs20 coadsr0">{{info?info.infoTitile?info.infoTitile:'':''}}</p>
          <p class="cor9 mgt15">类型：<span>{{info?info.informationTypeName?info.informationTypeName:'':''}}</span> 发布单位：<span>{{info?info.pubishOrg?info.pubishOrg:'':''}}</span> 发布时间：<span v-if="info&&info.creationTime">{{info.creationTime | formatDate('yyyy-MM-dd')}}</span></p>
        </div>
        <div class="pdt50 pdb150 pdl30 pdr30" v-html="info?info.infoContent?info.infoContent:'':''">
          <!--<p class="fs16 cor0 fb">一、办理条件</p>-->
          <!--<p class="cor9 lh28 mgt15">-->
            <!--1、原则上申请人须年满十八周岁，有稳定职业 ，最好有较固定住所，经济不拮据者。（学生和未满18周岁的申请人，需同住的父母代为申请。<br>-->
            <!--2、把宠物视为家庭的一员，有决心照顾它们一辈子，不会因工作调动、生育问题等抛弃它们。<br>-->
            <!--3、A方式：为杜绝某些领养人一时心血来潮或没有稳定生活来源或是恶的归宿，领养时犬只需收取保证金300-1000元-->
          <!--</p>-->
          <!--<p class="fs16 cor0 fb mgt20">二、办理材料</p>-->
          <!--<p class="cor9 lh28 mgt15">-->
            <!--1、原则上申请人须年满十八周岁，有稳定职业 ，最好有较固定住所，经济不拮据者。（学生和未满18周岁的申请人，需同住的父母代为申请。<br>-->
            <!--2、把宠物视为家庭的一员，有决心照顾它们一辈子，不会因工作调动、生育问题等抛弃它们。<br>-->
            <!--3、A方式：为杜绝某些领养人一时心血来潮或没有稳定生活来源或是恶领养时犬只需收取保证金300-1000元<br>-->
          <!--</p>-->
          <!--<p class="fs16 cor0 fb mgt20">三、办理流程</p>-->
          <!--<p class="cor9 lh28 mgt15">-->
            <!--1、原则上申请人须年满十八周岁，有稳定职业 ，最好有较固定住所，经济不拮据者。（学生和未满18周岁的申请人，需同住的父母代为申请。<br>-->
            <!--2、把宠物视为家庭的一员，有决心照顾它们一辈子，不会因工作调动、生育问题等抛弃它们。<br>-->
            <!--3、A方式：为杜绝某些领养人一时心血来潮或没有稳定生活来源或是稳定的归宿，领养时犬只需收取保证金300-1000元-->
          <!--</p>-->
          <!--<p class="fs16 cor0 fb mgt20">四、办理地点</p>-->
          <!--<p class="cor9 lh28 mgt15">-->
            <!--1、原则上申请人须年满十八周岁，有稳定职业 ，最好有较固定住所，经济不拮据者。（学生和未满18周岁的申请人，需同住的父母代为申请。<br>-->
            <!--2、把宠物视为家庭的一员，有决心照顾它们一辈子，不会因工作调动、生育问题等抛弃它们。<br>-->
            <!--3、A方式：为杜绝某些领养人一时心血来潮或没有稳定生活来源或是定的归宿，领养时犬只需收取保证金300-1000元-->
          <!--</p>-->
          <!--<p class="fs16 cor0 fb mgt20">五、办理时间及费用</p>-->
          <!--<p class="cor9 lh28 mgt15">-->
            <!--1、原则上申请人须年满十八周岁，有稳定职业 ，最好有较固定住所，经济不拮据者。（学生和未满18周岁的申请人，需同住的父母代为申请。<br>-->
            <!--2、把宠物视为家庭的一员，有决心照顾它们一辈子，不会因工作调动、生育问题等抛弃它们。<br>-->
            <!--3infoTitile、A方式：为杜绝某些领养人一时心血来潮或没有稳定生活来源或是定的归宿，领养时犬只需收取保证金300-1000元-->
          <!--</p>-->
        </div>
      </div>
      <p class="c-b mgt40" style="margin-top: 20px" v-if="info&&info.failReason">驳回原因：{{info.failReason}}</p>
    </form>
  </div>
  <!--内容区END-->
</template>

<script>
    export default {
        name: "listInfoDetail",
      data(){
        return{
          info:null,
        }
      },
      created(){
        this.$axios({
          url: '/biz/information/getInformation',
          method: 'post',
          params: {informationId: this.$route.params.id}
        }).then(res => {
          console.log(res)
          if(res.data.status == 200){
            this.info = res.data.data;
          }
        })
      },
      methods:{
        tolist(){
          // if (this.$route.params.type==4) {
          //   this.$router.push("Information")
          // }else if (this.$route.params.type==5) {
          //   this.$router.push("policies")
          // }else if (this.$route.params.type==6) {
          //   this.$router.push("knowledge")
          // }else {
          //   this.$router.back(-1);
          // }
          this.$router.back(-1);
        }
      },
    }
</script>

<style scoped>

</style>
