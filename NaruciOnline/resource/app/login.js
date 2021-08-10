Vue.component("login", {
    data: function() {
        return {
			
        }
    },
    template:`  
	<div>    
		<form method="POST">
		  <div class="container">
		    <h1>Prijavljivanje</h1>
		    <hr>

		    <label for="uname"><b>Username</b></label>
		    <input type="text" v-model="korisnickoIme" required>
			<br>
		    <label for="psw"><b>Password</b></label>
		    <input type="password" v-model="lozinka" required>
		    <hr>

		    <button type="submit">Login</button>
		  </div>
		
		</form>
	</div>
    `       
        ,
	 

});