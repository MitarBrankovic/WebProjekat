Vue.component("kreiranjeNaloga", {
    data: function() {
        return {
			korisnickoIme:"",
			lozinka:"",
			ime:"",
			prezime:"",
			pol:"",
			datumRodjenja:"",
			uloga:"",
			kreirajMenadzera:false
        }
    },
    template:`  
	<div>    
		<form id="kreiranjeForm" method ="POST" @submit.prevent = "submitForm">
		  	<div class="container">
			    <h1>Kreiranje novog naloga</h1>
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
			    <input type="date" v-model="datumRodjenja" required>
				<br>

                <label for="uloga"><b>Uloga</b></label>
				<div v-if="!kreirajMenadzera">
					<select v-model="uloga">
						<option value="Menadzer">Menadzer</option>
						<option value="Dostavljac">Dostavljac</option>
					</select>
				</div>
				<div v-else>
					<select v-model="uloga">
						<option value="Menadzer">Menadzer</option>
					</select>
				</div>
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
			
			    <button type="submit" class="kreiranjebtn">Kreiraj</button>
		  	</div>
		</form>
	</div>
    `       
        ,
	mounted(){
		//this.kreirajMenadzera=JSON.parse(localStorage.getItem('kreiranjeMenadzera'))
	},
	methods:{
        submitForm:function(){
			
            const user = {
                ime:this.ime,
                prezime:this.prezime,
                pol: this.pol,
                datumRodjenja: this.datumRodjenja,
                korisnickoIme:this.korisnickoIme,
                lozinka:this.lozinka,
				uloga:this.uloga
            }
			
            axios
            .post('/kreiranjeNaloga',user)
            .then(response=>{
                this.$router.push('/')
            })
        },
		
    }

});