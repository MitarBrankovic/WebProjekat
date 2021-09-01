Vue.component("register", {
    data: function() {
        return {
			korisnickoIme:"",
			lozinka:"",
			ime:"",
			prezime:"",
			pol:"",
			datumRodjenja:"",
			tip:""
        }
    },
    template:`  
	<div id="login-pozadina">    
		<form id="registrationForm" method ="POST" @submit.prevent = "submitForm">
		  	<div class="forma container">
			    <h1>Registracija</h1>
			    <hr>
			
			    <label class="col-sm-2 col-form-label" for="ime"><b>Ime</b></label>
			    <input class="col-sm-2 col-form-control" type="text" v-model="ime" required>
				<br>
				
				<label class="col-sm-2 col-form-label" for="prezime"><b>Prezime</b></label>
			    <input class="col-sm-2 col-form-control" type="text" v-model="prezime" required>
				<br>
				
				<label class="col-sm-2 col-form-label" for="pol"><b>Pol</b></label>
				<select v-model="pol" class="form-select">
					<option value="muski">Muski</option>
				    <option value="zenski">Zenski</option>
				</select>
				<br>
				
				<label class="col-sm-2 col-form-label" for="datumRodjenja"><b>Datum rodjenja</b></label>
			    <input class="col-sm-2 col-form-control" type="date" v-model="datumRodjenja" required>
				<br>
				
				<label class="col-sm-2 col-form-label" for="korisnickoIme"><b>Korisnicko ime</b></label>
			    <input class="col-sm-2 col-form-control" type="text" v-model="korisnickoIme" required>
				<br>
				
			    <label class="col-sm-2 col-form-label" for="lozinka"><b>Lozinka</b></label>
			    <input class="col-sm-2 col-form-control" type="password" v-model="lozinka" required>
				<br>
				
			    <label class="col-sm-2 col-form-label" for="lozinka-repeat"><b>Ponovi lozinku</b></label>
			    <input class="col-sm-2 col-form-control" type="password" name="lozinka-repeat" id="lozinka-repeat" required>
			    <hr>
			
			    <button class="button" type="submit">Register</button>

				<div class="container signin">
		    		<p>Already have an account? <a href="#">Sign in</a>.</p>
		  		</div>
		  	</div>
		</form>

		<footer class="footer">
			<p>Contact: &nbsp; brankovic.ra198.2018@uns.ac.rs <br>&emsp;&emsp; beric.ra191.2018@uns.ac.rs</p> &emsp;&emsp;&emsp;&emsp;
			<p>Studentarija, Copyright &copy; 2021</p>  
		</footer>
	</div>
    `       
        ,
	 methods:{
        submitForm:function(){
			var ulog= "Kupac"
			
            const user = {
                ime:this.ime,
                prezime:this.prezime,
                pol: this.pol,
                datumRodjenja: this.datumRodjenja,
                korisnickoIme:this.korisnickoIme,
                lozinka:this.lozinka,
				uloga:ulog
            }
			
            axios
            .post('/register',user)
            .then(response=>{
                this.$router.push('/')
            })
			/*.catch(error=>{
				console.log("Greska.")	
				alert("Vec postoji korisnik sa tim korisnickim imenom.")
				window.location.reload()

			})*/
        }
    }

});