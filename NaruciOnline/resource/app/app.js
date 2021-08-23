/**
 * 
 */
const NaruciOnline = { template:'<NaruciOnline></NaruciOnline>' }
const Register = { template:'<register></register>' }
const Login = { template:'<login></login>' }
const Logout = {template:'<logout></logout>'}
const Korpa = {template:'<korpa></korpa>'}
const Edit = {template:'<edit></edit>'}
const KreiranjeNaloga = {template:'<kreiranjeNaloga></kreiranjeNaloga>'}
const KreiranjeRestorana = {template:'<kreiranjeRestorana></kreiranjeRestorana>'}
const PregledKorisnika = {template:'<pregledKorisnika></pregledKorisnika>'}
const PregledMenadzera = {template:'<pregledMenadzera></pregledMenadzera>'}
const PregledPorudzbina = {template:'<pregledPorudzbina></pregledPorudzbina>'}
const PretragaRestorana = {template:'<pretragaRestorana></pretragaRestorana>'}
const PretragaKorisnika = {template:'<pretragaKorisnika></pretragaKorisnika>'}
const Restoran = {template:'<restoran></restoran>'}
const ZahteviDostavljaca = {template:'<zahteviDostavljaca></zahteviDostavljaca>'}




const router = new VueRouter({
	mode: 'hash',
	routes: [	
		{path:'/',component: NaruciOnline},
		{path:'/register',component: Register},
		{path:'/login',component: Login},
		{path:'/logout',component: Logout},
		{path:'/korpa',component: Korpa},
		{path:'/edit',component: Edit},
		{path:'/kreiranjeNaloga',component: KreiranjeNaloga},
		{path:'/kreiranjeRestorana',component: KreiranjeRestorana},
		{path:'/pregledKorisnika',component: PregledKorisnika},
		{path:'/pregledMenadzera',component: PregledMenadzera},
		{path:'/pregledPorudzbina',component: PregledPorudzbina},
		{path:'/kreiranjeRestorana',component: KreiranjeRestorana},
		{path:'/pretragaRestorana',component: PretragaRestorana},
		{path:'/pretragaKorisnika',component: PretragaKorisnika},
		{path:'/restoran/:naziv',component: Restoran},
		{path:'/zahteviDostavljaca',component: ZahteviDostavljaca}
		

	]
});


var app = new Vue({
	router,
	el: '#app_div'
});