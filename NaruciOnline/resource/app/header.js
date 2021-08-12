Vue.component("header-comp", {
    data: function() {
        return {
			korisnik:null
        }
    },
    template:`  
    <nav class="topnav">
	  <a class="active" href="/#/">Home</a>

		<div v-if="(korisnik===null)">
			<a href="#restorani">Restorani</a>
		</div>

	  <div class="topnav-right" v-if="(korisnik !== null)" class="dropdown">
	  <button class="dropbtn">Restorani
		<i class="fa fa-caret-down"></i>
	  </button>
	  <div class="dropdown-content" >
		  <div v-if="(korisnik.uloga==='ADMIN')">
		  <a class="nav-link" href="/#/kreiranjeRestorana">Kreiranje restorana</a>
		  </div>
		  <div v-if="(korisnik.uloga==='ADMIN')">
		  <a href="#restorani">Restorani</a>
		  </div>
	  </div>
		</div>


	  <a href="#contact">Contact</a>

		<div class="topnav-right" v-if="(korisnik===null)">
	    	<a href="/#/login">Prijavi se</a>
	    	<a href="/#/register">Registruj se</a>
  		</div>


		<div class="topnav-right" v-if="(korisnik !== null)" class="dropdown">
		  <button class="dropbtn">Profil
			<i class="fa fa-caret-down"></i>
		  </button>
		  <div class="dropdown-content" >
		  	<div v-if="(korisnik.uloga==='KUPAC') ||(korisnik.uloga==='MENADZER')||(korisnik.uloga==='ADMIN')||(korisnik.uloga==='DOSTAVLJAC')">
			  <a href="/#/edit">Izmena podataka</a>
  			</div>
			<a href="/#/logout">Logout</a>
		  </div>
		</div>
		  

		<div class="topnav-right" v-if="(korisnik !== null)">
		<a id="logout" class="nav-link" href="/#/logout">Logout</a>
		</div>



		<div class="topnav-right" v-if="(korisnik !== null)" class="dropdown">
		<button class="dropbtn">Korisnici
		  <i class="fa fa-caret-down"></i>
		</button>
		<div class="dropdown-content" >
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
    }
});