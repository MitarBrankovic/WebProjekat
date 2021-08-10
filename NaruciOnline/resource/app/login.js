Vue.component("login", {
    data: function() {
        return {
			korisnickoIme:"",
			lozinka:""
        }
    },
    template:`  
	<div>    
		<form method="POST" @submit.prevent = "submitForm">
		  <div class="container">
		    <h1>Prijavljivanje</h1>
		    <hr>

		    <label for="korisnickoIme"><b>Username</b></label>
		    <input type="text" v-model="korisnickoIme" required>
			<br>
		    <label for="lozinka"><b>Password</b></label>
		    <input type="password" v-model="lozinka" required>
		    <hr>

		    <button type="submit">Login</button>
		  </div>
		
		</form>
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