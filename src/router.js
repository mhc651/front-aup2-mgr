import VueRouter from 'vue-router'

import index from '@/view/index'

import enterpriseDeclareIndex from '@/view/enterpriseDeclare/index/index'           // 企业申报管理首页
import enterpriseDeclareAudit from '@/view/enterpriseDeclare/audit/index'           // 企业申报审核
import enterpriseDeclareDetail from '@/view/enterpriseDeclare/detail/index'         // 企业申报详情

import registrationIndex from '@/view/registration/index/index'          					 // 注册证申报管理首页
import registrationAudit from '@/view/registration/audit/index'          					 // 注册证申报审核
import registrationDetail from '@/view/registration/detail/index'        					 // 注册证申报详情

import componentIndex from './view/componentManagement/index/index'  // 组件管理首页
import componentAuditIndex from './view/componentManagement/audit/index'  // 组件管理首页 审核
import componentDetail from './view/componentManagement/detail/index'  // 组件管理首页 详情

import productIndex from './view/productManagement/index/index'  // 产品管理首页
import productAuditIndex from './view/productManagement/audit/index'  // 产品管理首页 审核
import productDetail from './view/productManagement/detail/index'  // 产品管理首页 详情
import productEntryPublicityIndex from '@/view/productEntryPublicity/indexList'  // 产品入围公示首页

const routes = [
	{path: '/', component: index},  // 首页

  {path: '/enterpriseDeclareIndex', component: enterpriseDeclareIndex }, 						 // 企业申报管理首页
  {path: '/enterpriseDeclareAudit', component: enterpriseDeclareAudit },             // 企业申报审核
  {path: '/enterpriseDeclareDetail', component: enterpriseDeclareDetail },					 // 企业申报详情

  {path: '/registrationIndex', component: registrationIndex }, 											 // 注册证申报管理首页
  {path: '/registrationAudit', component: registrationAudit },            					 // 注册证申报审核
  {path: '/registrationDetail', component: registrationDetail },										 // 注册证申报详情

	{path: '/componentIndex', component: componentIndex },  // 组件管理首页
	{path: '/componentAuditIndex', component: componentAuditIndex },  // 组件管理首页 审核
	{path: '/componentDetail', component: componentDetail },  // 组件管理首页 详情

	{path: '/productIndex', component: productIndex },  // 产品管理首页
	{path: '/productAuditIndex', component: productAuditIndex },  // 产品管理  审核 - 初审
	{path: '/productDetail', component: productDetail },  // 产品管理  详情
	{path: '/productEntryPublicityIndex', component: productEntryPublicityIndex },  // 产品入围公示首页

]

const router = new VueRouter({routes})

export default router