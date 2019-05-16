import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import ElementUI from 'element-ui';

import login from '../components/login/login'
import transit from '../components/login/transit'
import totran from '../components/login/totran'
import IndexPage from '../components/index/IndexPage'
import MainContainer from '../components/common/MainContainer'
import dogManagerUpdPwd from '../components/login/dogManagerUpdPwd'//txy

import ueditor from '../components/common/ueditor'

import dogManager from '../components/dogManager/dogManager'
import dogManagerList from '../components/dogManager/dogManagerList'
import dogManagerInfo from '../components/dogManager/dogManagerInfo'
import dogManagerBlacklist from '../components/dogManager/dogManagerBlacklist'
import dogManagerBlackInfo from '../components/dogManager/dogManagerBlackInfo'
import dogManagerBlackAdd from '../components/dogManager/dogManagerBlackAdd'
// import dogManagerDogList from '../components/dogManager/dogManagerDogList'
import dogManagerDogList from '../components/dogManager/dogCardManager'
import dogCardaudit from '../components/dogManager/dogCardaudit'
import addDogCardScene from '../components/petHospital/addDogCardScene'
import dogManagerLawEList from '../components/dogManager/dogManagerLawEList'
import dogManagerLawEInfo from '../components/dogManager/dogManagerLawEInfo'
import dogManagerBanList from '../components/dogManager/dogManagerBanList'
import dogManagerBanAdd from '../components/dogManager/dogManagerBanAdd'
import dogManagerFence from '../components/dogManager/dogManagerFence'
import dogManagerIndex from '../components/dogManager/dogManagerIndex'
import dogManagerOwnersList from '../components/dogManager/dogManagerOwnersList'
import dogManagerOwnersInfo from '../components/dogManager/dogManagerOwnersInfo'
import dogManagerUnlicensed from '../components/dogManager/dogManagerUnlicensed'
import siteRegistrationfrom from '../components/serviceGuide/siteRegistration'

import dogManagerIllnessList from '../components/dogManager/dogManagerIllnessList' //txy
import dogManagerIllnessDatails from '../components/dogManager/dogManagerIllnessDatails' //txy
import dogManagerIllnessAdds from '../components/dogManager/dogManagerIllnessAdds' //txy
import dogManagerIllnessAdd from '../components/dogManager/dogManagerIllnessAdd' //txy
import dogManagerIllnessDatailss from '../components/dogManager/dogManagerIllnessDatailss' //txy
import dogManagerImmuneList from '../components/dogManager/dogManagerImmuneList' //txy
import dogManagerImmuneDatail from '../components/dogManager/dogManagerImmuneDatail' //txy
import dogManagerImmuneDatailXin from '../components/dogManager/dogManagerImmuneDatailXin' //txy
// import addImmunCardsss from '../components/dogManager/addImmunCardsss'
import dogManagerImmuneAdd from '../components/dogManager/dogManagerImmuneAdd' //txy
import dogManagerImmuneAddXin from '../components/dogManager/dogManagerImmuneAddXin' //txy
import dogManagerDrugAdd from '../components/dogManager/dogManagerDrugAdd' //txy
import dogManagerDrugDatail from '../components/dogManager/dogManagerDrugDatail' //txy
import dogManagerDrugList from '../components/dogManager/dogManagerDrugList' //txy
import HospitalDetails from '../components/loveAdopt/HospitalDetails'//txy
import hospitalInfo from '../components/petHospital/hospitalInfo'
import serviceNetwork from '../components/dogManager/serviceNetwork'//txy
import serviceNetworkDetails from'../components/dogManager/serviceNetworkDetails'
import serviceNetworkMap from'../components/dogManager/serviceNetworkMap'

import Policies from '../components/policiesRegulations/policiesRegulations'
import loveAdopt from '../components/loveAdopt/loveAdopt'
import serviceGuide from '../components/serviceGuide/serviceGuide'
import Information from '../components/infoAndknowledge/Information'
import knowledge from '../components/infoAndknowledge/knowledge'
import infoDetails from '../components/infoAndknowledge/infoDetails'
import registrationIns from '../components/infoAndknowledge/registrationInstructions'
import bookingOutlets from '../components/serviceGuide/bookingOutlets'
import dogShelter from '../components/shelter/dogShelter/dogShelter'
import pendingAdoptionDetails from '../components/shelter/dogShelter/pendingAdoptionDetails'
import adoptt from '../components/loveAdopt/adopt'
import certificateDealt from '../components/petHospital/certificateDealt'
// import addImmuneCard from '../components/petHospital/addImmuneCard'
import addImmunCard from '../components/petHospital/addImmunCard'
import dogAndOwnerFile from '../components/petHospital/dogAndOwnerFile'
import addDogOwner from '../components/petHospital/addDogOwner'
import dogOwnerDetail from '../components/petHospital/dogOwnerDetail'
import dogDetail from '../components/petHospital/dogDetail'
import addDog from '../components/petHospital/addDog'
// import addImmunCard from '../components/petHospital/NewAddImmunCard'
// import checkImmuneCard from '../components/petHospital/checkImmuneCard'
import checkImmunCard from '../components/petHospital/checkImmunCard'
import reservationList from '../components/petHospital/reservationList'
import listInfoDetail from '../components/operator/listInfoDetail'

import reservationAdd from '../components/petHospital/reservationAdd'

import hospice from '../components/shelter/hospice'
import releaseDetails from '../components/shelter/dogShelter/releaseDetails'
import beenAdoptedDetails from '../components/shelter/dogShelter/beenAdoptedDetails'
import claimedDetails from '../components/shelter/dogShelter/claimedDetails'
import hasDealwith from '../components/shelter/dogShelter/hasDealwith'
import theShelterDetail from '../components/shelter/dogShelter/theShelterDetail'
import enforcementManagement from '../components/shelter/enforcementManagement'
import informationRelease from '../components/shelter/informationRelease'
import release from '../components/shelter/release'
import illegalRegistration from '../components/shelter/illegalRegistration'
import membershipCardAdd from '../components/shelter/membershipCardAdd'
import menberCradList from '../components/shelter/menberCradList'
import menberInfo from '../components/shelter/menberInfo'
import collectionPage from '../components/shelter/collectionPage'
import forRegistration from '../components/shelter/dogShelter/forRegistration'
import handleRegistration from '../components/shelter/dogShelter/handleRegistration'
import claimToRegister from '../components/shelter/dogShelter/claimToRegister'
import adoptionRegistration from '../components/shelter/dogShelter/adoptionRegistration'
import confirmToAdopt from '../components/shelter/dogShelter/confirmToAdopt'

import test from '../components/operator/test'

import operator from '../components/operator/operator'
import telecom from '../components/dogManager/telecom'
import operatorMsgAuditList from '../components/operator/operatorMsgAuditList'
import operatorMsgInfo from '../components/operator/operatorMsgInfo'
import resourceManager from '../components/operator/resourceManager'
import addUser from '../components/operator/addUser'
import operatorIndex from '../components/operator/operatorIndex'
import operatorMsgAdd from '../components/operator/operatorMsgAdd'
import operatorDeviceList from '../components/operator/operatorDeviceList'
import operatorDeviceInfo from '../components/operator/operatorDeviceInfo'
import message from '../components/operator/message'
import serviceNetworkAudit from '../components/operator/serviceNetworkAudit'
import networkAudit from '../components/operator/networkAudit'
import checkBranches from '../components/operator/checkBranches'
import enforcementManagementDetails from '../components/shelter/enforcementManagementDetails'

import petHospital from '../components/petHospital/petHospital'
import petHospitalIndex from '../components/petHospital/petHospitalIndex'
import configJS from "../common/config";
import axios from 'axios'

Vue.use(Router)


let router = new Router({
  routes: [
    {path: '/login', name: 'login', meta: {noRequireAuth: true}, component: login},//登录页
    {path: '/transit', name: 'transit', meta: {noRequireAuth: true}, component: transit},//中转页
    {path: '/totran', name: 'totran', meta: {noRequireAuth: true}, component: totran},//中转页

    {
      path: '/', name: 'container', component: MainContainer, //容器
      children: [
        {path: '/',  redirect: {name: 'index'} },
        {path: 'index', name: 'index', meta: {noRequireAuth: true}, component: IndexPage},//游客--主页
        {path: 'ueditor', name: 'ueditor', meta: {noRequireAuth: true}, component: ueditor},

        {path: 'loveAdopt', name: 'loveAdopt', meta: {noRequireAuth: true}, component: loveAdopt},//游客-爱心领养
        {path: 'policies', name: 'policiesRegulations', meta: {noRequireAuth: true}, component: Policies},//游客-政策法规
        {path: 'serviceGuide', name: 'serviceGuide', meta: {noRequireAuth: true}, component: serviceGuide},//游客-服务指南
        {path: 'Information', name: 'Information', meta: {noRequireAuth: true}, component: Information},//游客-动态资讯
        {path: 'knowledge', name: 'knowledge', meta: {noRequireAuth: true}, component: knowledge},//游客-养犬知识
        {path: 'infoDetails', name: 'infoDetails', meta: {noRequireAuth: true}, component: infoDetails},//详情
        {path: 'registrationIns', name: 'registrationIns', meta: {registrationIns: true}, component: registrationIns},//办证说明
        {path: 'bookingOutlets', name: 'bookingOutlets', meta: {noRequireAuth: true}, component: bookingOutlets},
        {path: 'HospitalDetails/:id', name: 'HospitalDetails', meta: {noRequireAuth: true}, component: HospitalDetails},//医院详情txy
        {path: 'dogManagerUpdPwd', name: 'dogManagerUpdPwd', meta: {noRequireAuth: true}, component: dogManagerUpdPwd},//修改密码txy
        {path: 'siteRegistrationfrom', name: 'siteRegistrationfrom', meta: {noRequireAuth: true}, component: siteRegistrationfrom},//服务网点
        {path: 'adoptt/:collectionId/:dogPublicityId', name: 'adoptt', meta: {noRequireAuth: true}, component: adoptt},//爱心领养申请页
        {
          path: 'dogManager', name: 'dogManager', component: dogManager, //犬只办
          children: [
            {path: 'index', name: 'dogManager_index', component: dogManagerIndex},//首页
            {path: 'message', name: 'dogManager_message', meta: {noRequireAuth: true}, component: message},//我的消息

            {path: 'list', name: 'dogManager_list', component: dogManagerList},//犬只档案
            {path: 'info/:dogId', name: 'dogManager_info', component: dogManagerInfo},//犬只档案--查看详情/犬只详情/犬证详情

            {path: 'ownersList', name: 'dogManager_owners_list', component: dogManagerOwnersList},//犬主档案列表
            {path: 'ownersInfo/:id', name: 'dogManager_owners_info', component: dogManagerOwnersInfo},//犬主档案详情

            {path: 'unlicensedList', name: 'dogManager_Unlicensed_list', component: dogManagerUnlicensed},//犬只办、收容所 无证犬只[未做]

            {path: 'doglist', name: 'dogManager_doglist', component: dogManagerDogList},//犬证列表.犬证管理
            {path: 'addDogCardScene', name: 'dogManager_dogadd', component: addDogCardScene},//犬证办理
            {path: 'info/:dogId', name: 'dogManager_info', component: dogManagerInfo},//犬证--查看详情/犬只详情/犬证详情
            {path: 'dogCardaudit/:dogId', name: 'dogManager_dogCardaudit', component: dogCardaudit},//犬证--审核

            {path: 'blacklist', name: 'dogManager_blacklist', component: dogManagerBlacklist},//黑名单列表.
            {path: 'blackinfo/:blackId', name: 'dogManager_blackinfo', component: dogManagerBlackInfo},//黑名单详情.
            {path: 'blackadd', name: 'dogManager_blackadd', component: dogManagerBlackAdd},//黑名单添加.

            {path: 'LawEList', name: 'dogManager_LawEList', component: dogManagerLawEList},//执法处罚列表
            {path: 'LawEInfo/:violationId', name: 'dogManager_LawEInfo', component: dogManagerLawEInfo},//执法处罚 详情

            {path: 'serviceNetwork', name: 'dogManager_serviceNetwork', component: serviceNetwork},//服务网点审核列表
            {path: 'checkBranches/:organizationId', name: 'dogManager_serviceNetworkDetails', component: checkBranches},//服务网点详情
            // {path: 'serviceNetworkDetails/:organizationId', name: 'dogManager_serviceNetworkDetails', component: serviceNetworkDetails},//服务网点审核网点详情*/
            {path: 'serviceNetworkMap/:id', name: 'dogManager_serviceNetworkMap', component: serviceNetworkMap},//服务

            /*{path: 'serviceNetworkAudit', name: 'dogManager_serviceNetworkAudit', component: serviceNetworkAudit},//服务网点审核列表
            {path: 'networkAudit/:organizationId', name: 'dogManager_networkAudit', component: networkAudit},//服务网点审核
            {path: 'checkBranches/:organizationId', name: 'dogManager_checkBranches', component: checkBranches},//服务网点审核网点详情*/

            {path: 'informationRelease', name: 'dogManager_informationRelease', component: informationRelease},//犬只办/收容所-信息发布列表
            {path: 'release', name: 'dogManager_release', component: release},//犬只办/收容所-信息发布
            {path: 'listInfoDetail', name: 'dogManager_listInfoDetail', component: listInfoDetail},//列表查看信息详情页

            {path: 'fence', name: 'dogManager_fence', component: dogManagerFence},//围栏

            //注销

            {path: 'BanList', name: 'dogManager_BanList', component: dogManagerBanList},//禁养犬种
            {path: 'BanAdd', name: 'dogManager_BanAdd', component: dogManagerBanAdd},//禁养犬种 新增
          ]
        },
        {
          path: 'hospice', name: 'hospice', component: hospice,//收容所
          children: [
            {path: 'index', name: 'hospice_index', component: collectionPage}, //收容所首页
            {path: 'message', name: 'hospice_message', meta: {noRequireAuth: true}, component: message},//我的消息

            // {path: 'enforcementManagement', name: 'enforcementManagement', component: enforcementManagement},//收容所-执法管理列表
            // {path: 'illegalRegistration', name: 'illegalRegistration', component: illegalRegistration},//收容所-执法管理-违法登记


            {path: 'enforcementManagement', name: 'hospice_enforcementManagement', component: enforcementManagement},//收容所-执法管理列表
            {path: 'illegalRegistration', name: 'hospice_illegalRegistration', component: illegalRegistration},//收容所-执法管理-违法登记
            {
              path: 'enforcementManagementDetails',
              name: 'enforcementManagementDetails',
              component: enforcementManagementDetails
            },//违法详情.

            {path: 'dogShelter', name: 'hospice_dogShelter', component: dogShelter},//犬只收容
            // {path: 'dogShelter', name: 'dogShelter', component: dogShelter},//犬只收容
            {path: 'theShelterDetail', name: 'theShelterDetail', component: theShelterDetail},//收容-收容中-查看详情
            {path: 'releaseDetails', name: 'releaseDetails', component: releaseDetails},//收容-发布中-查看详情
            {path: 'pendingAdoptionDetails', name: 'pendingAdoptionDetails', component: pendingAdoptionDetails},//犬只收容-待确认领养-查看详情
            {path: 'claimedDetails', name: 'claimedDetails', component: claimedDetails},//犬只收容-已认领-查看详情
            {path: 'beenAdoptedDetails', name: 'beenAdoptedDetails', component: beenAdoptedDetails},//犬只收容-已领养-查看详情
            {path: 'hasDealwith', name: 'hasDealwith', component: hasDealwith},//犬只收容-已处理-查看详情
            {path: 'forRegistration', name: 'forRegistration', component: forRegistration},//犬只收容-收容登记
            {path: 'handleRegistration', name: 'handleRegistration', component: handleRegistration},//收容中-处理登记
            {path: 'claimToRegister', name: 'claimToRegister', component: claimToRegister},//收容中-认领登记
            {path: 'adoptionRegistration', name: 'adoptionRegistration', component: adoptionRegistration},//收容中-领养登记
            {path: 'confirmToAdopt', name: 'confirmToAdopt', component: confirmToAdopt},//待确认领养-确认领养

            {path: 'unlicensedList', name: 'hospice_Unlicensed_list', component: dogManagerUnlicensed},//犬只办、收容所 无证犬只[未做]

            {path: 'doglist', name: 'hospice_doglist', component: dogManagerDogList},//犬证列表.犬证管理
            {path: 'addDogCardScene', name: 'hospice_dogadd', component: addDogCardScene},//犬证办理
            {path: 'info/:dogId', name: 'hospice_info', component: dogManagerInfo},//犬只档案--查看详情/犬只详情/犬证详情
            {path: 'dogCardaudit/:dogId', name: 'hospice_dogCardaudit', component: dogCardaudit},//犬证--审核

            {path: 'memberCardList', name: 'hospice_memberCardList', component: menberCradList}, //会员证列表
            {path: 'memberCardInfo/:cardId', name: 'hospice_memberCardInfo', component: menberInfo}, //会员证详情
            {path: 'memberCardAdd', name: 'hospice_memberCardAdd', component: membershipCardAdd}, //会员证添加

            {path: 'informationRelease', name: 'hospice_informationRelease', component: informationRelease},//犬只办/收容所-信息发布列表
            {path: 'release', name: 'hospice_release', component: release},//犬只办/收容所-信息发布
            {path: 'listInfoDetail', name: 'hospice_listInfoDetail', component: listInfoDetail},//列表查看信息详情页

            {path: 'blacklist', name: 'hospice_blacklist', component: dogManagerBlacklist},//黑名单列表.
            {path: 'blackinfo/:blackId', name: 'hospice_blackinfo', component: dogManagerBlackInfo},//黑名单详情.
            {path: 'blackadd', name: 'hospice_blackadd', component: dogManagerBlackAdd},//黑名单添加.
          ]
        },
        {
          path: 'hospital', name: 'hospital', component: petHospital,//宠物医院
          children: [
            {path: 'index', name: 'hospital_index', component: petHospitalIndex}, //宠物医院首页
            {path: 'message', name: 'hospital_message', meta: {noRequireAuth: true}, component: message},//我的消息

            {path: 'certificateDealt', name: 'hospital_certificateDealt', component: certificateDealt},//宠物医院犬证管理/免疫证管理
            // {path: 'addImmuneCard', name: 'hospital_addImmuneCard', component: addImmuneCard},//宠物医添加免疫证
            {path: 'addImmunCard', name: 'hospital_addImmuneCard', component: addImmunCard},//宠物医添加免疫证
            // {path: 'checkImmuneCard/:seqId', name: 'hospital_checkImmuneCard', component: checkImmuneCard},//宠物医院查看免疫证
            {path: 'checkImmunCard/:seqId', name: 'hospital_checkImmuneCard', component: checkImmunCard},//宠物医院查看免疫证
            // {path: 'dogadd', name: 'hospital_dogadd', component: dogManagerDogAdd},//犬证办理
            {path: 'addDogCardScene', name: 'hospital_dogadd', component: addDogCardScene},//犬证办理
            {path: 'info/:dogId', name: 'dogManager_infos', component: dogManagerInfo},//宠物医院/犬证详情

            {path: 'ImmuneList', name: 'hospital_ImmuneList', component: dogManagerImmuneList},//免疫记录txy

            {path: 'ImmuneDatail/:dogId/:seqId', name: 'hospital_ImmuneDatail', component: dogManagerImmuneDatailXin},//免疫详情txy

            // {path: 'ImmuneDatail/:VIId/:dogId/:seqId', name: 'hospital_ImmuneDatail', component: dogManagerImmuneDatail},//免疫详情txy
            //
            // {path: 'ImmuneDatail/:VIId/:dogId', name: 'hospital_ImmuneDatail', component: dogManagerImmuneDatail},//免疫详情txy

            {path: 'ImmuneAdd', name: 'hospital_ImmuneAdd', component: dogManagerImmuneAddXin},//添加免疫记录
            // {path: 'ImmunCardsss', name: 'hospital_ImmunCardsss', component: addImmunCardsss},//测试txy

            {path: 'DrugList', name: 'hospital_DogList', component: dogManagerDrugList},//喂药txy
            {path: 'hospitalInfo', name: 'hospital_Info', component: hospitalInfo},//医院信息

            {path: 'DrugDatail', name: 'hospital_DrugDatail', component: dogManagerDrugDatail},//详情
            {path: 'DrugAdd', name: 'hospital_DrugAdd', component: dogManagerDrugAdd},//添加

            {path: 'IllnessList', name: 'hospital_IllnessList', component: dogManagerIllnessList},//病历记录txy
            {path: 'IllnessAdd', name: 'hospital_IllnessAdd', component: dogManagerIllnessAdd},//病历添加txy
            {path: 'txyinfo/:dogId', name: 'hospital_txyinfo', component: dogManagerIllnessDatails},//病历详情txy
            {path: 'txyinfos/:dogIds', name: 'hospital_txyinfos', component: dogManagerIllnessDatailss},//病历详情txy
            {path: 'IllnessAdds/:ICN', name: 'hospital_IllnessAdds', component: dogManagerIllnessAdds},//带病历id跳转病历添加txy
            {path: 'reservationList', name: 'hospital_reservationList', component: reservationList},//宠物医院预约列表
            {path: 'reservationAdd', name: 'hospital_reservationAdd', component: reservationAdd},//宠物医院预约详情页

            {path: 'dogAndOwnerFile', name: 'dogAndOwnerFile', component: dogAndOwnerFile},//犬主犬只列表
            {path: 'addDogOwner', name: 'addDogOwner', component: addDogOwner},//犬主犬只列表
            {path: 'dogOwnerDetail/:dogOwnerId', name: 'dogOwnerDetail', component: dogOwnerDetail},//犬主犬只列表
            {path: 'dogDetail/:dogId', name: 'dogDetail', component: dogDetail},//犬只详情
            {path: 'addDog', name: 'addDog', component: addDog},//新增犬只
          ]
        },
        {
          path: 'operator', name: 'operator', component: operator,//运营商
          children: [
            {path: 'index', name: 'operator_index', component: operatorIndex}, //运营商首页
            {path: 'message', name: 'operator_message', meta: {noRequireAuth: true}, component: message},//我的消息

            {path: 'deviceList', name: 'operator_device_list', component: operatorDeviceList},//设备列表页
            {path: 'deviceInfo/:devId', name: 'operator_device_info', component: operatorDeviceInfo},//设备详情页

            {path: 'informationRelease', name: 'operator_informationRelease', component: informationRelease},//犬只办/收容所-信息发布列表
            {path: 'release', name: 'operator_release', component: release},//犬只办/收容所-信息发布

            {path: 'msgAuditList', name: 'operator_msgAuditList', component: operatorMsgAuditList}, //信息审核列表页
            {path: 'msgAdd', name: 'operator_msgAdd', component: operatorMsgAdd}, //信息审核新增页
            {path: 'msgInfo', name: 'operator_msgInfo', component: operatorMsgInfo},//信息审核详情页
            {path: 'listInfoDetail', name: 'operator_listInfoDetail', component: listInfoDetail},//列表查看信息详情页

            {path: 'serviceNetworkAudit', name: 'operator_serviceNetworkAudit', component: serviceNetworkAudit},//服务网点审核列表
            {path: 'networkAudit/:organizationId', name: 'operator_networkAudit', component: networkAudit},//服务网点审核
            {path: 'checkBranches/:organizationId', name: 'operator_checkBranches', component: checkBranches},//服务网点审核网点详情

            {path: 'resource', name: 'operator_resource', component: resourceManager},//权限管理页
            {path: 'adduser', name: 'operator_add_user', component: addUser},//新增用户
            {path: 'test', name: 'test', component: test},//权限管理页
          ]
        },
        {
          path: 'telecom', name: 'telecom', component: telecom,//电信使能平台用户
          children: [
            {path: 'dogManagerIndex', name: 'dogManager_index1', component: dogManagerIndex},//犬只办首页
            {path: 'hospiceIndex', name: 'hospice_index1', component: collectionPage}, //收容所首页
            {path: 'hospitalIndex', name: 'hospital_index1', component: petHospitalIndex}, //宠物医院首页

            {path: 'message', name: 'telecom_message', meta: {noRequireAuth: true}, component: message},//我的消息

            {path: 'list', name: 'telecom_list', component: dogManagerList},//犬只档案
            {path: 'info/:dogId', name: 'telecom_info', component: dogManagerInfo},//犬只档案--查看详情/犬只详情/犬证详情

            {path: 'ownersList', name: 'telecom_owners_list', component: dogManagerOwnersList},//犬主档案列表
            {path: 'ownersInfo/:id', name: 'telecom_owners_info', component: dogManagerOwnersInfo},//犬主档案详情

            {path: 'unlicensedList', name: 'telecom_Unlicensed_list', component: dogManagerUnlicensed},//犬只办、收容所 无证犬只[未做]

            {path: 'doglist', name: 'telecom_dogCardlist', component: dogManagerDogList},//犬证列表.犬证管理
            {path: 'addDogCardScene', name: 'telecom_dogadd', component: addDogCardScene},//犬证办理
            {path: 'info/:dogId', name: 'telecom_info', component: dogManagerInfo},//犬证--查看详情/犬只详情/犬证详情
            {path: 'dogCardaudit/:dogId', name: 'telecom_dogCardaudit', component: dogCardaudit},//犬证--审核

            {path: 'blacklist', name: 'telecom_blacklist', component: dogManagerBlacklist},//黑名单列表.
            {path: 'blackinfo/:blackId', name: 'telecom_blackinfo', component: dogManagerBlackInfo},//黑名单详情.
            {path: 'blackadd', name: 'telecom_blackadd', component: dogManagerBlackAdd},//黑名单添加.

            {path: 'LawEList', name: 'telecom_LawEList', component: dogManagerLawEList},//执法处罚列表
            {path: 'LawEInfo/:violationId', name: 'telecom_LawEInfo', component: dogManagerLawEInfo},//执法处罚 详情

            {path: 'serviceNetwork', name: 'telecom_serviceNetwork', component: serviceNetwork},//服务网点列表
            {path: 'checkBranches/:organizationId', name: 'telecom_serviceNetworkDetails', component: checkBranches},//服务网点详情

            {path: 'serviceNetworkMap/:id', name: 'telecom_serviceNetworkMap', component: serviceNetworkMap},//服务


            {path: 'informationRelease', name: 'telecom_informationRelease', component: informationRelease},//信息发布列表
            {path: 'release', name: 'telecom_release', component: release},//犬只办/收容所-信息发布
            {path: 'listInfoDetail', name: 'telecom_listInfoDetail', component: listInfoDetail},//列表查看信息详情页

            {path: 'fence', name: 'telecom_fence', component: dogManagerFence},//围栏

            {path: 'BanList', name: 'telecom_BanList', component: dogManagerBanList},//禁养犬种
            {path: 'BanAdd', name: 'telecom_BanAdd', component: dogManagerBanAdd},//禁养犬种 新增
          //  -----------------------------------------------------------
            {path: 'enforcementManagement', name: 'telecom_enforcementManagement', component: enforcementManagement},//收容所-执法管理列表
            {path: 'illegalRegistration', name: 'telecom_illegalRegistration', component: illegalRegistration},//收容所-执法管理-违法登记
            {
              path: 'enforcementManagementDetails',
              name: 'telecom_enforcementManagementDetails',
              component: enforcementManagementDetails
            },//违法详情.

            {path: 'dogShelter', name: 'telecom_dogShelter', component: dogShelter},//犬只收容
            {path: 'theShelterDetail', name: 'telecom_theShelterDetail', component: theShelterDetail},//收容-收容中-查看详情
            {path: 'releaseDetails', name: 'telecom_releaseDetails', component: releaseDetails},//收容-发布中-查看详情
            {path: 'pendingAdoptionDetails', name: 'telecom_pendingAdoptionDetails', component: pendingAdoptionDetails},//犬只收容-待确认领养-查看详情
            {path: 'claimedDetails', name: 'telecom_claimedDetails', component: claimedDetails},//犬只收容-已认领-查看详情
            {path: 'beenAdoptedDetails', name: 'telecom_beenAdoptedDetails', component: beenAdoptedDetails},//犬只收容-已领养-查看详情
            {path: 'hasDealwith', name: 'telecom_hasDealwith', component: hasDealwith},//犬只收容-已处理-查看详情
            {path: 'forRegistration', name: 'telecom_forRegistration', component: forRegistration},//犬只收容-收容登记
            {path: 'handleRegistration', name: 'telecom_handleRegistration', component: handleRegistration},//收容中-处理登记
            {path: 'claimToRegister', name: 'telecom_claimToRegister', component: claimToRegister},//收容中-认领登记
            {path: 'adoptionRegistration', name: 'telecom_adoptionRegistration', component: adoptionRegistration},//收容中-领养登记
            {path: 'confirmToAdopt', name: 'telecom_confirmToAdopt', component: confirmToAdopt},//待确认领养-确认领养

            // {path: 'unlicensedList', name: 'telecom_Unlicensed_list', component: dogManagerUnlicensed},//犬只办、收容所 无证犬只[未做]

            // {path: 'memberCardList', name: 'telecom_memberCardList', component: menberCradList}, //会员证列表
            // {path: 'memberCardInfo/:cardId', name: 'telecom_memberCardInfo', component: menberInfo}, //会员证详情
            // {path: 'memberCardAdd', name: 'telecom_memberCardAdd', component: membershipCardAdd}, //会员证添加

          //  --------------------------------------------

            {path: 'certificateDealt', name: 'telecom_certificateDealt', component: certificateDealt},//宠物医院犬证管理/免疫证管理

            {path: 'addImmunCard', name: 'telecom_addImmuneCard', component: addImmunCard},//宠物医添加免疫证

            {path: 'checkImmunCard/:seqId', name: 'telecom_checkImmuneCard', component: checkImmunCard},//宠物医院查看免疫证


            {path: 'ImmuneList', name: 'telecom_ImmuneList', component: dogManagerImmuneList},//免疫记录txy

            {path: 'ImmuneDatail/:dogId/:seqId', name: 'telecom_ImmuneDatail', component: dogManagerImmuneDatailXin},//免疫详情txy

            {path: 'ImmuneAdd', name: 'telecom_ImmuneAdd', component: dogManagerImmuneAddXin},//添加免疫记录

            {path: 'DrugList', name: 'telecom_DogList', component: dogManagerDrugList},//喂药txy
            {path: 'hospitalInfo', name: 'telecom_Info', component: hospitalInfo},//医院信息

            {path: 'DrugDatail', name: 'hospital_DrugDatail', component: dogManagerDrugDatail},//详情
            {path: 'DrugAdd', name: 'hospital_DrugAdd', component: dogManagerDrugAdd},//添加

            {path: 'IllnessList', name: 'telecom_IllnessList', component: dogManagerIllnessList},//病历记录txy
            {path: 'IllnessAdd', name: 'telecom_IllnessAdd', component: dogManagerIllnessAdd},//病历添加txy
            {path: 'txyinfo/:dogId', name: 'telecom_txyinfo', component: dogManagerIllnessDatails},//病历详情txy
            {path: 'txyinfos/:dogIds', name: 'telecom_txyinfos', component: dogManagerIllnessDatailss},//病历详情txy
            {path: 'IllnessAdds/:ICN', name: 'telecom_IllnessAdds', component: dogManagerIllnessAdds},//带病历id跳转病历添加txy
            {path: 'reservationList', name: 'telecom_reservationList', component: reservationList},//宠物医院预约列表
            {path: 'reservationAdd', name: 'telecom_reservationAdd', component: reservationAdd},//宠物医院预约详情页

            {path: 'dogAndOwnerFile', name: 'telecom_dogAndOwnerFile', component: dogAndOwnerFile},//犬主犬只列表
            {path: 'addDogOwner', name: 'telecom_addDogOwner', component: addDogOwner},//新增犬主
            {path: 'dogOwnerDetail/:dogOwnerId', name: 'telecom_dogOwnerDetail', component: dogOwnerDetail},//犬主详情
            {path: 'dogDetail/:dogId', name: 'telecom_dogDetail', component: dogDetail},//犬只详情
            {path: 'addDog', name: 'telecom_addDog', component: addDog},//新增犬只
          ]
        }
      ]
    },
    {path: '*', redirect: {name: 'index'}},
  ],
  // //页面跳转定位到最上
  // scrollBehavior (to, from, savedPosition) {
  //   // return 期望滚动到哪个的位置
  //   return { x: 0, y: 0 }
  // }
});


router.afterEach((to, from) => {
  // store.commit('changShowWindow',true);
})

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  // next()

  // next();
  // return;
  if (!to.matched.some(res => res.meta.noRequireAuth)) {// 判断是否需要登录
    //当前应用中没有用户信息
    if (!configJS.userInfo || !configJS.userInfo.userId) {
      try {
        axios.post('/biz/getUSerInfo')
          .then(res => {
            if (res.data.status == 200 && res.data.data) {
              configJS.userInfo = res.data.data;
              return axios.get('/biz/resource/getResources')
            }
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
            next();
          } else {
            //没有用户信息游客首页
            ElementUI.MessageBox.message("用户信息获取失败！")
          }
        })

        try {
          //用户资源信息
          // localStorage.setItem("resource_info_token", JSON.stringify(configJS.resource));
          // localStorage.setItem("manager_dog_user_id", configJS.userInfo);
        } catch (e) {
        }

        //userInfo = JSON.parse(localStorage.getItem("user_info_token"));
        // resource = JSON.parse(localStorage.getItem("resource_info_token"));
      } catch (e) {
        next({name: 'index',})
      }
      // //成功取出用户信息
      // if (userInfo && resource) {
      //   configJS.userInfo = userInfo;
      //   configJS.resource = resource;
      //   next();//放行
      //   return;
      // }

      // this.$router.push({name:"login"});
    } else {//有用户信息
      next();//放行
    }
  } else {//无须登录页面
    next()
  }
})

function nextTo() {
  ElementUI.MessageBox.confirm("登录信息过期了,是否去登录？", "登录超时提示", {
    confirmButtonText: '去登陆',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    router.replace({name: 'login'})
  }).catch(() => {
    router.replace({name: 'index'})
  }).finally(_ => {
  })
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

export default router;
