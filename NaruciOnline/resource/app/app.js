/**
 * 
 */
const NaruciOnline = { template:'<NaruciOnline></NaruciOnline>' }
const Register = { template:'<register></register>' }
const Login = { template:'<login></login>' }


const router = new VueRouter({
	mode: 'hash',
	routes: [	
		{path:'/',component: NaruciOnline},
		{path:'/register',component: Register},
		{path:'/login',component: Login}

	]
});


var app = new Vue({
	router,
	el: '#app_div'
});