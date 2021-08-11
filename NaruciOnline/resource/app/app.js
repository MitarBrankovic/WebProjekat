/**
 * 
 */
const NaruciOnline = { template:'<NaruciOnline></NaruciOnline>' }
const Register = { template:'<register></register>' }
const Login = { template:'<login></login>' }
const Logout = {template:'<logout></logout>'}
const Edit = {template:'<edit></edit>'}


const router = new VueRouter({
	mode: 'hash',
	routes: [	
		{path:'/',component: NaruciOnline},
		{path:'/register',component: Register},
		{path:'/login',component: Login},
		{path:'/logout',component: Logout},
		{path:'/edit',component: Edit}

	]
});


var app = new Vue({
	router,
	el: '#app_div'
});