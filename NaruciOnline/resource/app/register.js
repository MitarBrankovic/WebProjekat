Vue.component("register", {
    data: function() {
        return {
			korisnickoIme:"",
			lozinka:"",
			ime:"",
			prezime:"",
			pol:"",
			datumRodjenja:"",
			tip:"",
			uloga:""
        }
    },
    template:`  
	<div>    
		<form id="registrationForm" method ="POST" @submit.prevent = "submitForm">
		  	<div class="container">
			    <h1>Registracija</h1>
			    <hr>
			
			    <label for="ime"><b>Ime</b></label>
			    <input type="text" v-model="ime" required>
				<br>
				
				<label for="prezime"><b>Prezime</b></label>
			    <input type="text" v-model="prezime" required>
				<br>
				
				<label for="pol"><b>Pol</b></label>
				<select v-model="pol">
					<option value="muski">Muski</option>
				    <option value="zenski">Zenski</option>
				</select>
				<br>
				
				<label for="datumRodjenja"><b>Datum rodjenja</b></label>
			    <input type="text" v-model="datumRodjenja" required>
				<br>
				
				<label for="korisnickoIme"><b>Korisnicko ime</b></label>
			    <input type="text" v-model="korisnickoIme" required>
				<br>
				
			    <label for="lozinka"><b>Lozinka</b></label>
			    <input type="password" v-model="lozinka" required>
				<br>
				
			    <label for="lozinka-repeat"><b>Ponovi lozinku</b></label>
			    <input type="password" name="lozinka-repeat" id="lozinka-repeat" required>
			    <hr>
			
			    <button type="submit" class="registerbtn">Register</button>
		  	</div>
			
		  	<div class="container signin">
		    	<p>Already have an account? <a href="#">Sign in</a>.</p>
		  	</div>
		</form>
	</div>
    `       
        ,
	 methods:{
        submitForm:function(){ 
            const user = {
                ime:this.ime,
                prezime:this.prezime,
                pol: this.pol,
                datumRodjenja: this.datumRodjenja,
                korisnickoIme:this.korisnickoIme,
                lozinka:this.lozinka
            }
			
            axios
            .post('/register',user)
            .then(response=>{
                this.$router.push('/')
            })
        }
    }

});