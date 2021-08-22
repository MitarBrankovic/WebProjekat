Vue.component("pregledPorudzbina",{
    data: function(){
        return{
            korisnik:null,
            restorani:null,
            korisnici:null,
            porudzbine:null,       
            datum:null,
            imePrezime:"",
            restoran:""
        }
    },

    template:`
        <div>
            <h2>PORUDZBINE:</h2>      
            <div v-for = "p in porudzbine">
            
                <div v-if="(korisnik.uloga==='MENADZER') && (vlasnikRestorana(p))">

                            
                    <p>
                    <b>Sifra porudzbine:</b> {{p.id}} <br>
                    <b>Datum i vreme porucivanja:</b> {{p.datum}} <br>
                    <b>Artikli:</b><br>
                    <label v-for = "a in p.artikli">
                        {{a.naziv}} {{a.cena}} <br>
                    </label>
                    <b>Restoran:</b> {{vratiRestoran(p)}} <br>
                    <b>Kupac:</b> {{ vratiImePrezimeKupca(p) }} <br>
                    <b>Status:</b> {{p.status}} <br>
                    <b>Ukupna cena:</b> {{p.cena}} <br>
                    <br>
                    <button v-if="p.status==='Obrada'" type = "button" v-on:click="izObradeUPripremu(p)">U pripremi</button>
                    </p>
                            
                        
                </div>
            </div>
        </div>
    `,
    mounted(){
        this.korisnik = JSON.parse(localStorage.getItem('korisnik'))
        axios.all([axios.get('/pregledRestorana'), axios.get('/pregledKorisnika'),
         axios.get('/pregledPorudzbina')]).then(axios.spread((...responses) => {
            this.restorani = responses[0].data
            this.korisnici = responses[1].data
            this.porudzbine = responses[2].data 
        }))
        
    },
    methods:{
        vratiImePrezimeKupca(p){
            for (let el of this.korisnici) {
                if(el.korisnickoIme === p.korisnickoImeKupca){
                    this.imePrezime = el.ime + ' ' + el.prezime;
                    el.korisnickoIme = ""; // ova linija kontrolise infinite loop koji nastaje zbog if-a
                    break; 
                }
              }
              return this.imePrezime;
        },
        vlasnikRestorana(p){
            for (let restoran of this.restorani) {
                if(p.idRestorana === restoran.id){
                    if(restoran.menadzer.korisnickoIme == this.korisnik.korisnickoIme){
                        return true;
                    }else{
                        return false
                    }
                }
            }
        },
        vratiRestoran(p){
            for (let restoran of this.restorani) {
                if(p.idRestorana === restoran.id){
                    this.restoran = restoran.naziv;
                }
            }
            return this.restoran;
        },
        izObradeUPripremu(p){
            const sifra = {
                sifraPorudzbine:p.id          
            }

            axios
            .post('/izObradeUPripremu',sifra)
            .then(response=>{
                window.location.reload()
            })
            

        }
    }
})