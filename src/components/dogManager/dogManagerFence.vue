<template>
  <!--内容区-->
  <div class="w980 fr">
    <div class="ovh">
      <div class="fl cor6 h40 lh40">
        <a href="###" class="db fl hov8  corffa472 mgr35 pc9 pdl36" @click.prevent="mapEdit" :class="mapStatus==0?'btnactive':'btnDisable'">添加围栏</a>
        <a href="###" class="db fl hov8  corffa472 mgr35 bgcGerg pdl36" @click.prevent="generateFence" :class="mapStatus==1?'btnactive':'btnDisable'">生成围栏</a>
        <a href="###" class="db fl hov8  corffa472 mgr35 pc9 pdl36" @click.prevent="saveFence" :class="newPolygons && newPolygons.length>0?'btnactive && mapStatus ==0':'btnDisable'">保存</a>
        <a href="###" class="db fl hov8  corffa472 mgr35 pc10 pdl36" @click.prevent="mapReset">重置</a>
        <a href="###" class="db fl hov8  corffa472 mgr35 pc8 pdl36 btnactive">我的位置</a>
        <!--<a href="###" class="db fl hov8 corffa472 pc8 pdl36" @click.prevent="falsh">刷新</a>-->

        <el-select v-model="electInd" placeholder="请选择">
          <el-option
            label="显示所有围栏"
            value="0">
            <span style="float: left">显示所有围栏</span>
            <span style="float: left"></span>
            <span style="float: right; color: #8492a6; font-size: 13px"></span>
          </el-option>
          <el-option
            v-for="(item,index) in fences"
            :key="index"
            :label="item.fenceName"
            :value="item.fenceId">
            <span style="float: left">{{ item.fenceName }}</span>
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.creationTime |formatDate('yyyy/MM/dd HH:mm') }}</span>
          </el-option>
        </el-select>
      </div>
    </div>

    <!--地图-->
    <div class="mgt10 k3 hb100" id="container-map"></div>

    <!--<div class="k3 hb100" id="container-map">-->
    <!--&lt;!&ndash;<img src="/static/images/bg3.jpg" alt="">&ndash;&gt;-->
    <!--</div>-->

    <!--对话框-->
    <el-dialog title="设置围栏名称" width="350px" :visible.sync="dialogTableVisible">
      <div style="line-height: 36px;" v-for="(item,index) in newPolygons" :key="index">围栏 {{index+1}} :&nbsp;
        <el-input :label="'围栏'+(index+1)+'名称'" v-model="item.fenceName" autocomplete="off"
                  :placeholder="'请输入围栏'+(index+1)+'名称'"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveFences">确 定</el-button>
      </div>
    </el-dialog>

  </div>
  <!--内容区END-->
</template>


<script>

  import configJS from '../../common/config'
  import moment from 'moment'

  let newFenceId = 1;//临时fenceId

  export default {
    name: "dogManagerFence",
    data() {
      return {
        dialogTableVisible: false,
        newPolygons: [],//新多边形信息
        mapStatus: 0,//地图编辑状态 0查看状态 1新增编辑中
        fences: [],//围栏数据信息
        polygons: [],//地图上的围栏
        mapInstance: '',//地图实例
        electInd: '',//选择的
        polygonEditor: '',//编辑对象
        mapClickEvent:'',
        rightClickEvent:'',
      }
    },
    watch: {
      //向地图添加围栏信息
      fences(newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          this.fences.map(item => {
            let LngLats = item.coordinates.map(e => {//每个围栏信息坐标集
              return new AMap.LngLat(e.longitude, e.latitude)
            })
            createPolygon(this, LngLats, item);
          })
        }
      },
      electInd(newVal) {
        if (newVal) {
          if (newVal == 0) {//选择所有
            this.mapInstance.clearMap()
            this.mapInstance.add(this.polygons)
            toMapCenter(this)
          } else {
            // let polygon = this.mapInstance.getAllOverlays("polygon").find(item => item.getExtData().fence.fenceId == newVal)
            let polygon = this.polygons.find(item => item.getExtData().fence.fenceId == newVal)
            let paths = polygon.getPath();
            if (paths && paths.length >= 3) {
              this.mapInstance.clearMap()
              this.mapInstance.add(polygon)

              //定位
              let lat = paths.map(item => item.O).reduce((x, y) => x + y) / paths.length
              let lng = paths.map(item => item.P).reduce((x, y) => x + y) / paths.length
              this.mapInstance.setCenter(new AMap.LngLat(lng, lat));
            } else {
              this.$message("所选围栏坐标数据有误！")
            }

          }
        }
      }
    },
    created() {
    },
    mounted() {
      //初始化地图
      initMap(this)
      //定位
      toMapCenter(this)
      //初始化围栏
      initFence(this);

    },
    methods: {
      saveFence() {
        if (this.newPolygons && this.newPolygons.length > 0) {
          this.dialogTableVisible = true
        }
        if (this.polygonEditor) {//多边形有有编辑过
          this.polygonEditor.close();
        }
        this.mapStatus = 0;
        AMap.event.removeListener(this.mapClickEvent)
        AMap.event.removeListener(this.rightClickEvent)
      },
      mapReset() {
        this.mapInstance.clearMap();
        initFence(this)
        this.mapStatus = 0;

        AMap.event.removeListener(this.mapClickEvent)
        AMap.event.removeListener(this.rightClickEvent)
      },
      //编辑地图
      mapEdit() {
        //地图添加点击事件
        this.mapClickEvent = AMap.event.addListener(this.mapInstance, "click", mapOnClick, this)
        this.mapStatus = 1;
      },
      //生成围栏
      generateFence() {
        mapOnRightClick.bind(this)()
        this.mapStatus = 1;
      },
      //保存围栏信息
      saveFences() {
        this.dialogTableVisible = false

        let fences = this.newPolygons.map(item => {
          let coordinates = item.getPath().map((e, i) => {
            return {
              seq: i,
              longitude: e.P,
              latitude: e.O
            }
          })
          return {
            fenceName: item.fenceName,
            fenceType: 0,
            operatorId: configJS.userInfo.userId,
            status: 1,
            coordinates,
            newFenceId: item.newFenceId
          }
        })
        this.newPolygons = []

        this.$axios({
          url: "/biz/fence/addFences",
          headers: {
            "content-type": "application/json"
          },
          method: "post",
          data: JSON.stringify(fences)
        }).then((res) => {
          if (res.data.meta.success) {
            this.$alert('新增犬只禁养电子围栏成功');
            this.mapInstance.clearMap()
            initFence(this)
          } else {
            this.$alert('新增犬只禁养电子围栏失败');
          }
        })
      }
    }
  }

  //获得多边形中心点坐标
  function getCenterPosition(polygon) {
    let paths = polygon.getPath();
    //定位
    let lat = paths.map(item => item.O).reduce((x, y) => x + y) / paths.length
    let lng = paths.map(item => item.P).reduce((x, y) => x + y) / paths.length
    return new AMap.LngLat(lng, lat);
  }

  //map点击事件
  function mapOnClick(e) {
    //给地图添加标记
    mapAddMarker(this, e.lnglat);

    //绑定地图右键点击事件
    this.rightClickEvent = AMap.event.addListener(this.mapInstance, "rightclick", mapOnRightClick, this)
  }

  //绑定地图右键点击事件
  function mapOnRightClick() {
    let mapMarkers = this.mapInstance.getAllOverlays("marker");
    //最少3个点才能生成围栏信息
    if (mapMarkers) {
      if (mapMarkers.length >= 3) {
        //所有点坐标
        let LngLats = mapMarkers.map(item => {
          let lnglat = item.getPosition()
          return new AMap.LngLat(lnglat.P, lnglat.O)
        });
        //添加新围栏
        createPolygon(this, LngLats, null)

        //移除标记
        this.mapInstance.remove(mapMarkers)
      } else {
        this.$message("定位点数不足3个，不能生成围栏")
      }
    }

    // let polygon = _this.mapInstance.getAllOverlays("polygon").find(item => item.getExtData().fence.fenceId == fenceId)

  }

  //地图添加marker
  function mapAddMarker(_this, lnglat) {
    let marker = new AMap.Marker({
      // icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",   //bug 不能自定义标记
      position: lnglat,
    });
    marker.setMap(_this.mapInstance);
    return marker;
  }

  function initMap(_this) {
    _this.mapInstance = new AMap.Map("container-map", {
      resizeEnable: true,
      center: [116.403322, 29.900255],//地图中心点
      zoom: 14, //地图显示的缩放级别
    });
  }

  //初始化围栏信息
  function initFence(_this, fenceId) {
    let params = {"operatorId": configJS.userInfo.userId}
    if (fenceId) {
      params.fenceId = fenceId;
    }
    //查询围栏信息
    _this.$axios({
      url: '/biz/fence/selectFenceRefCoordinate',
      method: "POST",
      params
    }).then((res) => {
      if (res.data.status == '200' && res.data.data && res.data.data.length > 0) {
        _this.fences = res.data.data;
      }
    })
  }

  //创建多边形
  function createPolygon(_this, LngLats, fence) {
    let polygon = new AMap.Polygon({
      path: LngLats,
      fillColor: '#FFAA00', // 多边形填充颜色
      fillOpacity: 0.2,//填充透明度
      borderWeight: 1, // 线条宽度，默认为 1
      strokeColor: 'red', // 线条颜色
      strokeOpacity: 0.5,//线条透明度
      extData: {fence}
    });

    //新添加的围栏设置颜色
    if (!fence) {
      polygon.setOptions({
        fillColor: '#FFAA11',
        strokeColor: "#FD498E",
        fillOpacity: 0.1,
        strokeStyle: 'dashed'
      });
      polygon.newFenceId = newFenceId++;//添加临时围栏id

      //待确认的围栏
      _this.newPolygons.push(polygon);
    }

    _this.mapInstance.add(polygon);
    _this.polygons.push(polygon);

    //绑定多边形对象点击事件
    polygon.on("click", function (e) {
      createPolygonInfoWindow(_this, e.target)
    });
    //绑定右键点击事件
    polygon.on("rightclick", function (e) {
      createContextMenu(_this, e)
    })
    return polygon;
  }

  //创建信息窗体
  function createPolygonInfoWindow(_this, polygon) {
    let point = getCenterPosition(polygon)
    let fence = polygon.getExtData().fence
    if (!fence) {//多边形没有额外信息
      return;
    }
    // 信息窗体的内容
    let content = [
      `<div><div style='padding: 0px 4px;'><b>${fence.fenceName}</b>`,
      `创建人 : ${fence.tUsers.name}`,
      `创建时间 : ${ moment(fence.creationTime).format("YYYY年MM月DD日 HH时mm分ss秒")}`,
      `区域大小 : ${polygon.getArea()}平方米 </div> </div>`
    ]

    // 创建 infoWindow 实例
    let infoWindow = new AMap.InfoWindow({
      content: content.join("<br>")  //传入 dom 对象，或者 html 字符串
    });

    // 打开信息窗体
    infoWindow.open(_this.mapInstance, point);
  }

  //创建右键菜单
  function createContextMenu(_this, e) {
    let contextMenu = new AMap.ContextMenu();//创建右键菜单

    //添加菜单元素
    contextMenu.addItem("删除", function () {
      deleteFence(_this, e.target)
    }, 0);
    if (!e.target.getExtData().fence) {
      //添加菜单元素
      contextMenu.addItem("修改", function () {
        modifyFence(_this, e.target)
      }, 1);
    }
    contextMenu.open(_this.mapInstance, e.lnglat)
  }

  //修改围栏信息
  function modifyFence(_this, polygon) {
    //构造折线编辑对象，并开启折线的编辑状态
    _this.mapInstance.plugin(["AMap.PolyEditor"], function () {
      if (_this.polygonEditor) {//一次只能编辑一个
        _this.polygonEditor.close();
        _this.polygonEditor = ''
      }
      let polygonEditor = new AMap.PolyEditor(_this.mapInstance, polygon);
      _this.polygonEditor = polygonEditor;

      polygonEditor.open();

      //监听编辑事件结束
      AMap.event.addListener(polygonEditor, 'end', function (e) {
      });
    });
  }

  //删除围栏
  function deleteFence(_this, polygon) {

    //获取围栏
    let fence = polygon.getExtData().fence;
    //临时围栏没有信息
    if (!fence) {
      //临时多边形信息删除
      _this.newPolygons.map((item, index) => {
        if (item == polygon) {
          _this.newPolygons.splice(index, 1)
        }
      })
      _this.mapInstance.remove(polygon)//删除围栏

      _this.polygons.map((item, index) => {
        if (item.getArea() == polygon.getArea()) {
          let temp = item.getExtData().fence;
          if (fence && temp && fence.fenceId == temp.fenceId) {
            _this.polygons.splice(index, 1)
          } else if (polygon.newFenceId == item.newFenceId) {
            _this.polygons.splice(index, 1)
          }
        }
      })
      _this.polygons.splice()
      return;
    }
    // polygon = _this.mapInstance.getAllOverlays("polygon").find(item => item.getExtData().fence.fenceId == fenceId)
    _this.$confirm('此操作将永久删除该围栏, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(res => {
      _this.$axios({
        url: "/biz/fence/deleteFence",
        method: 'post',
        params: {
          fenceId: fence.fenceId
        }
      }).then(res => {
        if (res.data.status == 200) {
          _this.$message({
            type: 'success',
            message: '删除围栏成功！'
          });
          _this.mapInstance.remove(polygon)//删除围栏
        } else {
          _this.$message("删除失败");
        }
      })
    })
  }

  //定位 并定位地图中心
  function toMapCenter(_this) {
    AMap.plugin('AMap.Geolocation', function () {
      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: false      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      _this.mapInstance.addControl(geolocation);
      geolocation.getCurrentPosition()
      // geolocation.getCurrentPosition((status,result)=>{});
      AMap.event.addListener(geolocation, 'complete', (e) => {
        // let curPostion = [e.position.P,e.position.O]
        // _this.curPostion = curPostion
        // console.log(e)
      });//返回定位信息
      AMap.event.addListener(geolocation, 'error', (e) => {//返回定位出错信息
        _this.$message("定位信息获取失败！")
      });
    });
  }
</script>

<style scoped>
  .hb100 {
    height: 700px;
  }

  .borRed {
    border: solid 1px red;
  }

  .btnDisable {
    color: #ccc;
    cursor: auto;
  }

  .btnactive {
    color: rgb(285, 163, 118);
  }

  .bgcGerg {
    background: url("/static/images/p201.png") no-repeat 0;
    background-size: 31% 35%;
  }

  .el-input {
    width: auto;
  }
  .el-select{
    width: 300px;
  }
</style>
