<template>
  <!--投诉建议-->
    <div class="w980 fr">
      <p class="fs16 cor0 fb h60 lh60 bgf1 pdl30">病历记录详情</p>
      <div class="pdt10 pdb60 pdl30 pdr30">
        <div class="mgt10">
          <span class="db w90 fl h40 lh40 cor0">症状描述</span>
          <div class="mgl90">
            <textarea style="resize:none;width: 100%;border: 1px solid #ddd" disabled v-if="Therape.symptom" v-model="Therape.symptom"></textarea>
            <textarea style="resize:none;width: 100%;height: 100px;border: 1px solid #ddd"disabled v-else></textarea>
          </div>
        </div>
        <div class="mgt10">
          <span class="db w90 fl h40 lh40 cor0">诊断信息</span>
          <div class="mgl90">
            <textarea style="resize:none;width: 100%;border: 1px solid #ddd" disabled v-if="Therape.diagnose" v-model="Therape.diagnose"></textarea>
            <textarea style="resize:none;width: 100%;border: 1px solid #ddd"disabled v-else></textarea>
          </div>
        </div>
        <div class="mgt10">
          <span class="db w90 fl h40 lh40 cor0">治疗信息</span>
          <div class="mgl90">
            <textarea style="resize:none;width: 100%;border: 1px solid #ddd" disabled v-if="Therape.treatment_info" v-model="Therape.treatment_info"></textarea>
            <textarea style="resize:none;width: 100%;border: 1px solid #ddd"disabled v-else></textarea>
          </div>
        </div>
        <div class="mgt10">
          <span class="db w90 fl h40 lh40 cor0">照片</span>
          <div class="mgl90" style="width: 90%;height:100px;border:1px #d4d4d4 solid;">
            <div style="height:100px;display:flex;float: left"v-for="(item,index) in Therape.list":key="index">
              &nbsp;<img width="100px;" v-if="item.image_url" :src="item.image_url" title="点击放大" @click="fanda($event)"/>
            </div>
          </div>
        </div>
        <div class="mgt10">
          <span class="db w90 fl h40 lh40 cor0">备注信息</span>
          <div class="mgl90">
            <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4"disabled v-if="Therape.remarks" v-model="Therape.remarks">
            <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4"disabled v-else>
          </div>
        </div>
        <div class="mgt10">
          <span class="db w90 fl h40 lh40 cor0">医生姓名</span>
          <div class="mgl90">
            <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4"disabled v-if="Therape.physician_name" v-model="Therape.physician_name">
            <input type="text" class="ww100 h40 lh40 pdl20 borf1 ras4"disabled v-else>
          </div>
        </div>
        <div class="t-c mgt40" style="margin-top: 10px">
          <a href="javascript:"@click="$router.back(-1)" class="dinb w140 h40 lh40 t-c cor01 bgf1 ras4 hov8 mgl5">返回</a>
        </div>
      </div>
      <!--<div class="TT" id="xiao" @click="xiao" style="position: fixed;width: 100%;height: 88%;left: 0;top: 12%;background-color: rgba(0,0,0,.5);z-index: 2;text-align: center;display: none;vertical-align: middle;">-->
      <div class="TT" id="xiao" @click="xiao" style="position: fixed;width: 100%;height: 100%;left: 0;top: 0%;background-color: rgba(0,0,0,.5);z-index: 2;display: none">
        <div style="width: 100%;height: 80%;margin-top: 7%;display: flex;justify-content:center;align-items: center">
          <div>
            <img class="img"width="80%" v-if="big" :src="big"/>
          </div>
        </div>

      </div>
    </div>
  <!--投诉建议END-->
</template>

<style scoped>
  .mgl90>textarea{
    height: 130px;
  }
  .max{
    /*width: 100%;
    height: auto;;*/
  }


</style>

<script>
  import $ from 'jquery'
    export default {
        name: "dogManagerIllnessDatailss"
      ,data(){
          return{
            Therape:''
            ,big:''
          }
      },created(){
          this.$axios({
            url: '/biz/dogInfo/getDogTherapeLists',
            params: {"dogId":this.$route.params.dogIds}
          }).then((ref)=>{
            console.log(ref.data)
            if(ref.data){
              this.Therape=ref.data;
            }
          })
      },methods:{
          fanda:function(event){
            $(".TT").show()
            this.big=event.currentTarget.src

          },
        xiao:function(){
          $(".TT").hide()
        }
      }
    }
</script>


