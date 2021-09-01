Vue.component("login", {
    data: function() {
        return {
			korisnickoIme:"",
			lozinka:""
        }
    },
    template:`  
	<div id="login-pozadina">
		<div>
			<form method="POST" @submit.prevent = "submitForm">
			<div class="forma container">
				<h1>Prijavljivanje</h1>
				<hr>

				<label class="col-sm-2 col-form-label" for="korisnickoIme"><b>Korisnicko ime</b></label>
				<input class="col-sm-2 col-form-control" type="text" v-model="korisnickoIme" required>
				<br>
				<label class="col-sm-2 col-form-label" for="lozinka"><b>Lozinka</b></label>
				<input class="col-sm-2 col-form-control" type="password" v-model="lozinka" required>
				<br><br><br>

				<button class="button" type="submit">Login</button>
				<br>
				<div class="container signin">
					<p>Nemate nalog? <a href="#/register">Registrujte se</a>.</p>
			  	</div>
			</div>
			
			</form>
		</div>

		<footer class="footer">
			<p>Contact: &nbsp; brankovic.ra198.2018@uns.ac.rs <br>&emsp;&emsp; beric.ra191.2018@uns.ac.rs</p> &emsp;&emsp;&emsp;&emsp;
			<p>Studentarija, Copyright &copy; 2021</p>  
		</footer>
	</div>
    `       
        ,
	 methods:{
		submitForm:function(){
			axios
				.post('/login',{
					korisnickoIme:this.korisnickoIme,
					lozinka:this.lozinka
				})
				.then(response => {
					localStorage.setItem('korisnik',JSON.stringify(response.data))
					this.$router.push('/')
					window.location.reload()
				})
				.catch(error=>{
					console.log("Greska.")	
					alert("Uneti nevalidni ili nepostojeci parametri, pokusajte ponovo.")
					window.location.reload()
	
				})
		}
	}

});