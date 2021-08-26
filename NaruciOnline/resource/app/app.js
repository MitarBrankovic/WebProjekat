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
const PretragaPorudzbina = {template:'<pretragaPorudzbina></pretragaPorudzbina>'}
const Restoran = {template:'<restoran></restoran>'}
const ZahteviDostavljaca = {template:'<zahteviDostavljaca></zahteviDostavljaca>'}
const Oceni = {template:'<oceni></oceni>'}
const ZahteviKomentara = {template:'<zahteviKomentara></zahteviKomentara>'}
const Recenzije = {template:'<recenzije></recenzije>'}






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
		{path:'/pretragaPorudzbina',component: PretragaPorudzbina},
		{path:'/restoran/:naziv',component: Restoran},
		{path:'/recenzije/:naziv',component: Recenzije},
		{path:'/zahteviDostavljaca',component: ZahteviDostavljaca},
		{path:'/oceni',component: Oceni},
		{path:'/zahteviKomentara',component: ZahteviKomentara}


		

	]
});


var app = new Vue({
	router,
	el: '#app_div'
});