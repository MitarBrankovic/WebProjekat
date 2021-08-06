Vue.component("header-comp", {
    data: function() {
        return {
			korisnik:null
        }
    },
    template:`  
    <nav class="topnav">
	  <a class="active" href="/#/">Home</a>
	  <a href="#restorani">Restorani</a>
	  <a href="#contact">Contact</a>
		<div class="topnav-right">
	    	<a href="/#/login">Prijavi se</a>
	    	<a href="/#/register">Registruj se</a>
  		</div>
	</nav>
    `       
        ,

});