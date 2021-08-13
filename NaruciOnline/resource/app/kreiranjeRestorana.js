Vue.component("kreiranjeRestorana", {
    data: function() {
        return {
			naziv:"",
			tip:"",
			status:"",
			geografskaDuzina:"",
			geografskaSirina:"",
			grad:"",
			ulica:"",
			broj:"",
			postanskiBroj:"",
			slika:"",
			menadzeri:null,
			menadzer:""
        }
    },
    template:`  
	<div>    
		<form id="kreiranjeForm" method ="POST" @submit.prevent = "submitForm">
		  	<div class="container">
			    <h1>Kreiranje novog restorana</h1>
			    <hr>
			
			    <label for="naziv"><b>Naziv</b></label>
			    <input type="text" v-model="naziv" required>
				<br>
				
				<label for="tip"><b>Tip</b></label>
			    <input type="text" v-model="tip" required>
				<br>
				
				<label for="status"><b>Status</b></label>
				<select v-model="status">
					<option value="otvoren">Otvoren</option>
				    <option value="zatvoren">Zatvoren</option>
				</select>
				<br>
				
				<hr>
				<label for="lokacija"><b>Lokacija</b></label>
				<br>
				<input type="text" placeholder="Geografska duzina" v-model="geografskaDuzina" required>
				<input type="text" placeholder="Geografska sirina" v-model="geografskaSirina" required>
				<br>
			    <input type="text" placeholder="Grad" v-model="grad" required>
				<input type="text" placeholder="Ulica" v-model="ulica" required>
			    <input type="text" placeholder="Broj" v-model="broj" required>
				<input type="text" placeholder="Postanski broj" v-model="postanskiBroj" required>

				<br>
				<hr>
			    <label for="slika"><b>Slika</b></label>
			    <input type="text" v-model="slika" required>
				<br>

			    <label for="menadzer"><b>Menadzer</b></label>
				<select v-model="menadzer">
				<option disabled value="">Please select one</option>
				<option v-for="m in menadzeri" :value="m.korisnickoIme">{{m.korisnickoIme}}</option>
				</select>
				<br>




                
			
			    <button type="submit" class="kreiranjebtn">Kreiraj</button>
		  	</div>
		</form>
	</div>
    `       
        ,
		mounted(){
			axios
			.get('/pregledMenadzera')
			.then(response=>{this.menadzeri=response.data;})
		},


	 methods:{
        submitForm:function(){
			
            const user = {
                naziv:this.naziv,
                tip:this.tip,
                status: this.status,
                geografskaDuzina:this.geografskaDuzina,
				geografskaSirina:this.geografskaSirina,
				grad:this.grad,
				ulica:this.ulica,
				broj:this.broj,
				postanskiBroj:this.postanskiBroj,
                slika:this.slika,
				menadzer:this.menadzer
            }
			
            axios
            .post('/kreiranjeRestorana',user)
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