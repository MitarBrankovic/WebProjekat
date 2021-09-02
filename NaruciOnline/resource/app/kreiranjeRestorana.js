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
	<div id="login-pozadina">    
		<form id="kreiranjeForm" method ="POST" @submit.prevent = "submitForm">
		  	<div class="forma container">
			    <h1>Kreiranje novog restorana</h1>
			    <hr>
			
			    <label class="col-sm-2 col-form-label" for="naziv"><b>Naziv</b></label>
			    <input class="col-sm-2 col-form-control" type="text" v-model="naziv" required>
				<br>
				
				<label class="col-sm-2 col-form-label" for="tip"><b>Tip</b></label>
			    <input class="col-sm-2 col-form-control" type="text" v-model="tip" required>
				<br>
				
				<label class="col-sm-2 col-form-label" for="status"><b>Status</b></label>
				<select class="col-sm-2 col-form-control" v-model="status">
					<option value="otvoren">Otvoren</option>
				    <option value="zatvoren">Zatvoren</option>
				</select>
				<br>
				
				<hr>
				<label class="col-sm-2 col-form-label" for="lokacija"><b>Lokacija</b></label>
				<br>
				<input class="col-sm-2 col-form-control" type="text" placeholder="Geografska duzina" v-model="geografskaDuzina" required>
				<input class="col-sm-2 col-form-control" type="text" placeholder="Geografska sirina" v-model="geografskaSirina" required>
				<br>
			    <input class="col-sm-2 col-form-control" type="text" placeholder="Grad" v-model="grad" required>
				<input class="col-sm-2 col-form-control" type="text" placeholder="Ulica" v-model="ulica" required>
			    <br>
				<input class="col-sm-2 col-form-control" type="text" placeholder="Broj" v-model="broj" required>
				<input class="col-sm-2 col-form-control" type="text" placeholder="Postanski broj" v-model="postanskiBroj" required>

				<br>
				<hr>
			    <label class="col-sm-2 col-form-label" for="slika"><b>Slika</b></label>
			    <input class="col-sm-2 col-form-control" type="file"  required @change=imageAdded>
				<br>

			    <label class="col-sm-2 col-form-label" for="menadzer"><b>Menadzer</b></label>
				<select class="form-select" v-model="menadzer">
					<option disabled value="">Please select one</option>
					<option v-for="m in menadzeri" :value="m.korisnickoIme">{{m.korisnickoIme}}</option>
				</select>
				<a target="_blank" href="#/kreiranjeNaloga">Kreiraj novog menadzera</a>
				
				<br>                
				<button type="submit" class="button">Kreiraj</button>
			</div>
		</form>
		
		<footer class="footer">
			<p>Contact: &nbsp; brankovic.ra198.2018@uns.ac.rs <br>&emsp;&emsp; beric.ra191.2018@uns.ac.rs</p> &emsp;&emsp;&emsp;&emsp;
			<p>Studentarija, Copyright &copy; 2021</p>  
		</footer>
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
        },
        imageAdded(e){
            var files = e.target.files;

			if(!files.length)
				return;
			
				this.createImage(files[0]);
        },
        createImage(file){
			var image = new Image();
            var reader = new FileReader();
			var vm = this;

			reader.onload = (e) =>{
				vm.slika = e.target.result;

			};
			reader.readAsDataURL(file);
        }
		
		
		/*,
		kreirajMenadzera : function(){
			localStorage.setItem('kreiranjeMenadzera', true)
		}*/
    }

});