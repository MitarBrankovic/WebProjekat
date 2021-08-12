/**
 * 
 */
const NaruciOnline = { template:'<NaruciOnline></NaruciOnline>' }
const Register = { template:'<register></register>' }
const Login = { template:'<login></login>' }
const Logout = {template:'<logout></logout>'}
const Edit = {template:'<edit></edit>'}
const KreiranjeNaloga = {template:'<kreiranjeNaloga></kreiranjeNaloga>'}
const PregledKorisnika = {template:'<pregledKorisnika></pregledKorisnika>'}
const KreiranjeRestorana = {template:'<kreiranjeRestorana></kreiranjeRestorana>'}

const router = new VueRouter({
	mode: 'hash',
	routes: [	
		{path:'/',component: NaruciOnline},
		{path:'/register',component: Register},
		{path:'/login',component: Login},
		{path:'/logout',component: Logout},
		{path:'/edit',component: Edit},
		{path:'/kreiranjeNaloga',component: KreiranjeNaloga},
		{path:'/pregledKorisnika',component: PregledKorisnika},
		{path:'/kreiranjeRestorana',component: KreiranjeRestorana}

	]
});


var app = new Vue({
	router,
	el: '#app_div'
});