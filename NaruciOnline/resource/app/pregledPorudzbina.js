Vue.component("pregledPorudzbina",{
    data: function(){
        return{
            korisnik:null,
            restorani:null,
            korisnici:null,
            porudzbine:null,
            dostavljaci:null,
            zahtevi:null,   
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
                    <button v-if="p.status==='UPripremi'" type = "button" v-on:click="izPripremeUCekaDostavljaca(p)">Ceka dostavljaca</button>
                    </p>
                                                
                </div>

                <div v-if="(korisnik.uloga==='KUPAC') && (trenutniKupac(p))">                           
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
                    <button v-if="p.status==='Obrada'" type = "button" v-on:click="otkaziPorudzbinu(p)">Otkazi</button>
                    </p>
                                                
                </div>

                <div v-if="(korisnik.uloga==='DOSTAVLJAC') && ((p.status === 'CekaDostavljaca') || (porudzbineDostavljaca(p)))">                           
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
                    <button v-if="(p.status==='CekaDostavljaca') && (!proveraZahteva(p))" type = "button" v-on:click="zahtevIzCekaDostavljacaUTransport(p)">U transportu</button>
                    <button v-if="p.status==='UTransportu'" type = "button" v-on:click="izTransportUDostavljena(p)">Dostavljeno</button>
                    </p>
                                            
                </div>
            </div>
        </div>
    `,
    mounted(){
        this.korisnik = JSON.parse(localStorage.getItem('korisnik'))
        axios.all([axios.get('/pregledRestorana'), axios.get('/pregledKorisnika'),
         axios.get('/pregledPorudzbina'), axios.get('/pregledDostavljaca'),
         axios.get('/pregledZahteva')]).then(axios.spread((...responses) => {
            this.restorani = responses[0].data
            this.korisnici = responses[1].data
            this.porudzbine = responses[2].data
            this.dostavljaci = responses[3].data
            this.zahtevi = response[4].data
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
        vratiRestoran(p){
            for (let restoran of this.restorani) {
                if(p.idRestorana === restoran.id){
                    this.restoran = restoran.naziv;
                }
            }
            return this.restoran;
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
        trenutniKupac(p){
            if(p.korisnickoImeKupca == this.korisnik.korisnickoIme){
                return true;
            }else{
                return false
            }

        },
        proveraZahteva(p){                          //ovo ne radi. Na neki drugi nacin treba sakriti dugme na 71.liniji nakon klika
            if(this.zahtevi != null){
                for(let zahtev of this.zahtevi){
                    if(zahtev.porudzbina.id === p.id){
                        return true;
                    }
                }
                return false;
            }
        },
        porudzbineDostavljaca(p){
            for (let dostavljac of this.dostavljaci) {
                if(this.korisnik.korisnickoIme === dostavljac.korisnickoIme){
                    for(let porudzbina of dostavljac.porudzbineZaDostavu){
                        if(porudzbina.id === p.id){
                            return true;
                        }else{
                            return false;
                        }

                    }
                }
            } 
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
        },
        izPripremeUCekaDostavljaca(p){
            const sifra = {
                sifraPorudzbine:p.id          
            }

            axios
            .post('/izPripremeUCekaDostavljaca',sifra)
            .then(response=>{
                window.location.reload()
            })
        },
        otkaziPorudzbinu(p){
            const sifra = {
                sifraPorudzbine:p.id          
            }

            axios
            .post('/otkaziPorudzbinu',sifra)
            .then(response=>{
                window.location.reload()
            })
        },
        zahtevIzCekaDostavljacaUTransport(p){
            const sifra = {
                sifraPorudzbine:p.id,
                korisnickoIme:this.korisnik.korisnickoIme        
            }
            axios
            .post('/zahtevIzCekaDostavljacaUTransport',sifra)
            .then(response=>{
                window.location.reload()
            })
        },
        izTransportUDostavljena(p){
            const sifra = {
                sifraPorudzbine:p.id          
            }

            axios
            .post('/izTransportUDostavljena',sifra)
            .then(response=>{
                window.location.reload()
            })
        }

    }
})