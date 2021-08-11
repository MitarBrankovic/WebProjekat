Vue.component("edit",{
    data:function(){
        return{
            korisnik:""
        }
    },
    template:`
    <form id="editForm" method ="POST" @submit.prevent = "submitForm">

        <div class="container">
        <h1>Izmena podataka korisnika</h1>
        <hr>
    
        <label for="ime"><b>Ime</b></label>
        <input type="text"v-model="korisnik.ime"  required>
        <br>
        
        <label for="prezime"><b>Prezime</b></label>
        <input type="text" v-model="korisnik.prezime"  required>
        <br>
        
        <label for="pol"><b>Pol</b></label>
        <select v-model="korisnik.pol">
            <option value="muski">Muski</option>
            <option value="zenski">Zenski</option>
        </select>
        <br>
        
        <label for="datumRodjenja"><b>Datum rodjenja</b></label>
        <input type="date" v-model="korisnik.datumRodjenja" required>
        <br>
        
        <label for="korisnickoIme"><b>Korisnicko ime</b></label>
        <input type="text" v-model="korisnik.korisnickoIme" required>
        <br>
        
        <label for="lozinka"><b>Lozinka</b></label>
        <input type="password" v-model="korisnik.lozinka" required>
        <br>
        
        <label for="lozinka-repeat"><b>Ponovi lozinku</b></label>
        <input type="password" name="lozinka-repeat" id="lozinka-repeat" required>
        <hr>
    
        <button type="submit" class="editbtn">Izmena</button>
      </div>








    </form>
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