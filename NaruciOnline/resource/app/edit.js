Vue.component("edit",{
    data:function(){
        return{
            korisnik:""
        }
    },
    template:`
    <div id="login-pozadina">
        <form id="editForm" method ="POST" @submit.prevent = "submitForm">
        <div class="forma container">
            <h1>Izmena podataka korisnika</h1>
            <hr>
        
            <label class="col-sm-2 col-form-label" for="ime"><b>Ime</b></label>
            <input class="col-sm-2 col-form-control" type="text"v-model="korisnik.ime"  required>
            <br>
            
            <label class="col-sm-2 col-form-label" for="prezime"><b>Prezime</b></label>
            <input class="col-sm-2 col-form-control" type="text" v-model="korisnik.prezime"  required>
            <br>
            
            <label class="col-sm-2 col-form-label" for="pol"><b>Pol</b></label>
            <select class="form-select"> v-model="korisnik.pol">
                <option value="muski">Muski</option>
                <option value="zenski">Zenski</option>
            </select>
            <br>
            
            <label class="col-sm-2 col-form-label" for="datumRodjenja"><b>Datum rodjenja</b></label>
            <input class="col-sm-2 col-form-control" type="date" v-model="korisnik.datumRodjenja" required>
            <br>
            
            <label class="col-sm-2 col-form-label" for="korisnickoIme"><b>Korisnicko ime</b></label>
            <input class="col-sm-2 col-form-control" type="text" v-model="korisnik.korisnickoIme" required>
            <br>
            
            <label class="col-sm-2 col-form-label" for="lozinka"><b>Lozinka</b></label>
            <input class="col-sm-2 col-form-control" type="password" v-model="korisnik.lozinka" required>
            <br>
            
            <label class="col-sm-2 col-form-label" for="lozinka-repeat"><b>Ponovi lozinku</b></label>
            <input class="col-sm-2 col-form-control" type="password" name="lozinka-repeat" id="lozinka-repeat" required>
            <hr>
        
            <button type="submit" class="button">Izmena</button>
        </div>
        </form>

        <footer class="footer">
            <p>Contact: &nbsp; brankovic.ra198.2018@uns.ac.rs <br>&emsp;&emsp; beric.ra191.2018@uns.ac.rs</p> &emsp;&emsp;&emsp;&emsp;
            <p>Studentarija, Copyright &copy; 2021</p>  
        </footer>
    </div>
    `,
    mounted(){
        this.korisnik = JSON.parse(localStorage.getItem('korisnik'))
    },
    methods:{
        submitForm:function(){
            axios
            .post('/edit',this.korisnik)
            .then(response=>{
                localStorage.setItem('korisnik',JSON.stringify(this.korisnik))
                this.$router.push('/')
                window.location.reload()
            })
            .catch(error=>{
                console.log("Greska.")	
                alert("Podaci su lose uneti.")
                window.location.reload()

            })
        }
    }
})