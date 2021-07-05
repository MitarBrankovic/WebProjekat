/**
 * 
 */
const NaruciOnline = { template:'<NaruciOnline></NaruciOnline>' }

const router = new VueRouter({
	mode: 'hash',
	routes: [	
		{path:'/',component: NaruciOnline}
	]
});


var app = new Vue({
	router,
	el: '#app_div'
});