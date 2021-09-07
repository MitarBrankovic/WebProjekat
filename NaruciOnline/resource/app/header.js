Vue.component("header-comp", {
    data: function() {
        return {
			korisnik:null,
			restoran:null
			//naziv_restorana:null
        }
    },
    template:`  
    <nav class="topnav">
	  <a class="active" href="/#/">Home</a>

		<div v-if="(korisnik===null)">
			<a href="#restorani">Restorani</a>
		</div>

	  <div class="topnav-right dropdown1" v-if="(korisnik !== null)">
	  <button class="dropbtn1">Restoran
		<i class="fa fa-caret-down"></i>
	  </button>
	  <div class="dropdown-content1" >
		  <div v-if="(korisnik.uloga==='ADMIN')">
		  	<a href="/#/kreiranjeRestorana">Kreiranje restorana</a>
		  </div>
		  <div v-if="(korisnik.uloga==='ADMIN')">
		  	<a href="#restorani">Restorani</a>
		  </div>
		  	<div v-if="(korisnik.uloga==='MENADZER')">
				<!--<a href="/#/pregledRestoranaMenadzer">Pregled restorana</a>-->
				<a href="#" v-on:click="pregledRestorana()">Pregled restorana</a>
	  		</div>
			<div v-if="(korisnik.uloga==='MENADZER') || (korisnik.uloga==='DOSTAVLJAC') || (korisnik.uloga==='ADMIN') || (korisnik.uloga==='KUPAC')">
			  <a href="/#/pregledPorudzbina">Pregled porudzbina</a>
			</div>
			<div v-if="(korisnik.uloga==='MENADZER')">
			  <a href="/#/zahteviDostavljaca">Zahtevi dostavljaca</a>
			  <a href="/#/zahteviKomentara">Zahtevi komentara</a>
			</div>
	  </div>
		</div>


	  <a href="#contact">Contact</a>

		<div class="topnav-right" v-if="(korisnik===null)">
	    	<a href="/#/login">Prijavi se</a>
	    	<a href="/#/register">Registruj se</a>
  		</div>


		<div class="topnav-right dropdown1" v-if="(korisnik !== null)">
		  <button class="dropbtn1">Profil
			<i class="fa fa-caret-down"></i>
		  </button>
		  <div class="dropdown-content1" >
		  	<div v-if="(korisnik.uloga==='KUPAC') ||(korisnik.uloga==='MENADZER')||(korisnik.uloga==='ADMIN')||(korisnik.uloga==='DOSTAVLJAC')">
			  <a href="/#/edit">Pogledaj profil</a>
  			</div>
			<a href="/#/logout">Logout</a>
		  </div>
		</div>
		  

		<div class="topnav-right" v-if="(korisnik !== null)">
		<a id="logout" class="nav-link" href="/#/logout">Logout</a>
		</div>

		<div class="topnav-right" v-if="(korisnik !== null) && (korisnik.uloga==='KUPAC')">
		<a id="korpa" class="nav-link bi bi-bag" href="/#/korpa">Korpa</a>
		</div>



		<div class="topnav-right dropdown1" v-if="(korisnik !== null) && (korisnik.uloga==='ADMIN')">
		<button class="dropbtn1">Korisnici
		  <i class="fa fa-caret-down"></i>
		</button>
		<div class="dropdown-content1" >
			<div v-if="(korisnik.uloga==='ADMIN')">
			<a class="nav-link" href="/#/kreiranjeNaloga">Kreiranje naloga</a>
			</div>
			<div v-if="(korisnik.uloga==='ADMIN')">
			<a class="nav-link" href="/#/pregledKorisnika">Pregled korisnika</a>
			</div>
		</div>
	  	</div>

	</div>
	</nav>
    `       
        ,
    mounted(){
        this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
		if(this.korisnik != null){
			if(this.korisnik.uloga == 'MENADZER'){
				axios
				.post('/pregledRestoranaMenadzer', this.korisnik)
				.then(response=>{
					console.log(response.data)
					this.restoran=response.data
					//this.naziv_restorana = this.restoran.naziv.replace(/ /g, "-")
				})
			}
		}
    },
	methods:{
		pregledRestorana:function(){
			if(this.restoran!=null){
				axios
				.get(`/restoran/${this.restoran.naziv}`)
				.then(response=>{
					const rest = response.data
					localStorage.setItem('rest', JSON.stringify(rest))
					this.$router.push(`/restoran/${this.restoran.naziv}`)
				})
			}
		}
	}
});