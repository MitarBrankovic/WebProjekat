Vue.component("kreiranjeRestorana", {
    data: function() {
        return {
			naziv:"",
			tip:"",
			status:"",
			lokacija:"",
			slika:"",
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
				
				<label for="lokacija"><b>Lokacija</b></label>
			    <input type="text" v-model="lokacija" required>
				<br>
				
			    <label for="slika"><b>Slika</b></label>
			    <input type="text" v-model="slika" required>
				<br>
                
			
			    <button type="submit" class="kreiranjebtn">Kreiraj</button>
		  	</div>
		</form>
	</div>
    `       
        ,
	 methods:{
        submitForm:function(){
			
            const user = {
                naziv:this.naziv,
                tip:this.tip,
                status: this.status,
                lokacija: this.lokacija,
                slika:this.slika
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