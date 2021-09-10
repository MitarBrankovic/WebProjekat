Vue.component("pregledPorudzbina",{
    data: function(){
        return{
            korisnik:null,
            restorani:null,
            korisnici:null,
            porudzbine:null,
            porudzbina:null,
            dostavljaci:null,
            zahtevi:null,   
            datum:null,
            imePrezime:"",
            restoran:"",
            oceniClick:false,
            idRestoranaKomentar:null,
            porudzbinaOcena:null,
            sviKomentari:[]
        }
    },

    template:`
        <div style="margin-top: 30px" class="whole-content">
            <h2 class="flex title-div bigtitle">PORUDZBINE:</h2>  <hr>
            <pretragaPorudzbina style="margin-left: 60px" id="search" @clicked="onSearch2Click"></pretragaPorudzbina>    
            <div class="artikli">
            
                <div v-for = "p in porudzbine" >

                    <div v-if="(korisnik.uloga==='ADMIN')" class="mojArtikal">                           
                        <p>
                        <b>Sifra porudzbine:</b> {{p.id}} <br>
                        <b>Datum i vreme porucivanja:</b> {{vratiFormatiranDatum(p)}} <br>
                        <b>Artikli:</b><br>
                        <label v-for = "a in p.artikli">
                            {{a.naziv}} {{a.cena}} <br>
                        </label><br>                
                        <b>Restoran:</b> {{vratiRestoran(p)}} <br>
                        <b>Kupac:</b> {{ vratiImePrezimeKupca(p) }} <br>
                        <b>Status:</b> {{p.status}} <br>
                        <b>Ukupna cena:</b> {{p.cena}} <br>
                        <br>
                        </p>
                                                
                    </div>
                
                    <div v-if="(korisnik.uloga==='MENADZER') && (vlasnikRestorana(p))" class="mojArtikal">                           
                        <p>
                        <b>Sifra porudzbine:</b> {{p.id}} <br>
                        <b>Datum i vreme porucivanja:</b> {{vratiFormatiranDatum(p)}} <br>
                        <b>Artikli:</b><br>
                        <label v-for = "a in p.artikli">
                            {{a.naziv}} {{a.cena}} <br>
                        </label><br>                
                        <b>Restoran:</b> {{vratiRestoran(p)}} <br>
                        <b>Kupac:</b> {{ vratiImePrezimeKupca(p) }} <br>
                        <b>Status:</b> {{p.status}} <br>
                        <b>Ukupna cena:</b> {{p.cena}} <br>
                        <br>
                        <button button class="btn btn-primary" v-if="p.status==='Obrada'" type = "button" v-on:click="izObradeUPripremu(p)">U pripremi</button>
                        <button button class="btn btn-primary" v-if="p.status==='UPripremi'" type = "button" v-on:click="izPripremeUCekaDostavljaca(p)">Ceka dostavljaca</button>
                        </p>
                                                    
                    </div>

                    <div v-if="(korisnik.uloga==='KUPAC') && (trenutniKupac(p))" class="mojArtikal">                           
                        <p>
                        <b>Sifra porudzbine:</b> {{p.id}} <br>
                        <b>Datum i vreme porucivanja:</b> {{vratiFormatiranDatum(p)}} <br>
                        <b>Artikli:</b><br>
                        <label v-for = "a in p.artikli">
                            {{a.naziv}} {{a.cena}} <br>
                        </label><br>
                        <b>Restoran:</b> {{vratiRestoran(p)}} <br>
                        <b>Kupac:</b> {{ vratiImePrezimeKupca(p) }} <br>
                        <b>Status:</b> {{p.status}} <br>
                        <b>Ukupna cena:</b> {{p.cena}} <br>
                        <br>
                        <button class="btn btn-danger" v-if="p.status==='Obrada'" type = "button" v-on:click="otkaziPorudzbinu(p)">Otkazi</button>
                        <div v-if="!oceniClick">
                            <button class="btn btn-primary" v-if="p.status==='Dostavljena' && !vecProkomentarisao(p)" type="button" v-on:click="((oceniClick = true) && getRestoran(p))">Oceni</button>
                        </div>
                        <div v-else-if="p.id === porudzbinaOcena.id">
                            <oceni id="ocena" @clicked="PosaljiOcenu"></oceni>
                            <button class="btn btn-danger" type="button" v-on:click="oceniClick = false">Otkazi</button>
                        </div>
                        </p>
                                                    
                    </div>

                    <div v-if="(korisnik.uloga==='DOSTAVLJAC') && ((p.status === 'CekaDostavljaca') || (porudzbineDostavljaca(p)))" class="mojArtikal">                           
                        <p>
                        <b>Sifra porudzbine:</b> {{p.id}} <br>
                        <b>Datum i vreme porucivanja:</b> {{vratiFormatiranDatum(p)}} <br>
                        <b>Artikli:</b><br>
                        <label v-for = "a in p.artikli">
                            {{a.naziv}} {{a.cena}} <br>
                        </label><br>
                        <b>Restoran:</b> {{vratiRestoran(p)}} <br>
                        <b>Kupac:</b> {{ vratiImePrezimeKupca(p) }} <br>
                        <b>Status:</b> {{p.status}} <br>
                        <b>Ukupna cena:</b> {{p.cena}} <br>
                        <br>
                        <button button class="btn btn-primary" v-if="(p.status==='CekaDostavljaca') && (!proveraZahteva(p))" type = "button" v-on:click="zahtevIzCekaDostavljacaUTransport(p)">Zahtev za porudzbinu</button>
                        <button button class="btn btn-primary" v-if="p.status==='UTransportu'" type = "button" v-on:click="izTransportUDostavljena(p)">Dostavljeno</button>
                        </p>
                                                
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted(){
        this.korisnik = JSON.parse(localStorage.getItem('korisnik'))
        axios.all([axios.get('/pregledRestorana'), axios.get('/pregledKorisnika'),
         axios.get('/pregledPorudzbina'), axios.get('/pregledDostavljaca'),
         axios.get('/pregledZahteva'),axios.get('/bukvalnoSviKomentari')]).then(axios.spread((...responses) => {
            this.restorani = responses[0].data
            this.korisnici = responses[1].data
            this.porudzbine = responses[2].data
            this.dostavljaci = responses[3].data
            this.zahtevi = responses[4].data
            this.sviKomentari = responses[5].data

        }))
        
    },
    methods:{
        onSearch2Click:function(search){
            console.log(search)
            axios
            .post('/pretragaPorudzbina',search)
            .then(response=>{this.porudzbine= response.data})
        },
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
        vratiFormatiranDatum(p){
            var minut = "";
            if(p.datum.time.minute < 10){
                minut = "0"+p.datum.time.minute;
            }else{minut = p.datum.time.minute;}

            var datum = p.datum.date.day.toLocaleString()+"."+ p.datum.date.month.toLocaleString()+"."+ p.datum.date.year.toString() +".";
            var vreme = p.datum.time.hour.toLocaleString()+":"+ minut+":"+ p.datum.time.second.toLocaleString();
            var formatiran = datum +" "+ vreme;
            return formatiran;
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
        proveraZahteva(p){
            for(let zahtev of this.zahtevi){
                if(zahtev.porudzbina.id === p.id && zahtev.dostavljac.korisnickoIme === this.korisnik.korisnickoIme){
                    return true;
                }
            }
            return false;

        },
        porudzbineDostavljaca(p){
            for (let dostavljac of this.dostavljaci) {
                if(this.korisnik.korisnickoIme === dostavljac.korisnickoIme){
                    for(let porudzbina of dostavljac.porudzbineZaDostavu){
                        if(porudzbina.id === p.id){
                            return true;
                        }
                    }
                    return false;
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
                sifraPorudzbine:p.id,
                korisnickoIme:this.korisnik.korisnickoIme       
            }

            axios
            .post('/izTransportUDostavljena',sifra)
            .then(response=>{
                window.location.reload()
            })
        },
        PosaljiOcenu:function(feedback){
            const Komentar = {
                kom:feedback.komentar,
                oce:feedback.ocena,
                idKorisnika:this.korisnik.korisnickoIme,
                idRestorana:this.idRestoranaKomentar,
                idPorudzbine:this.porudzbinaOcena.id
            }
            console.log(Komentar)
            axios
            .post("/ocenaKorisnika", Komentar)
            .then(response=>{
                console.log('uspesno ocenjeno')
                this.oceniClick = false
                window.location.reload()

            })
        },
        getRestoran:function(p){
            this.idRestoranaKomentar = p.idRestorana
            this.porudzbinaOcena = p
            console.log(this.porudzbinaOcena)
        },
        vecProkomentarisao:function(p){
            if(p.status=='Dostavljena'){
                if(this.sviKomentari.length!=0){
                    for(let i = 0; i < this.sviKomentari.length; i++){
                        if(this.sviKomentari[i].idPorudzbine == p.id){
                            return true
                        }
                    }
                    return false
                }else{
                    return false
                }
            }
            return true
        }

    }
})