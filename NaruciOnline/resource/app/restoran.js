Vue.component("restoran",{
    data: function(){
        return{
            korisnik:null,
            restoran:null,
            uloga:null,
            artikal:null,
            artikli:null,
            naziv:null,
            cena:null,
            tip:null,
            kolicina:null,
            opis:null,
            slika:null,
            dodajArtikalVisible:true,
            izmeniClick:false,
            izmeniArtikalClick:false,
            artikalZaIzmenu:null
        }
    },

    template:`
        <div v-if="restoran">
            <h2>{{restoran.naziv}}</h2>
            <div v-if="!izmeniClick">
                <button type="button" v-on:click="izmeniInformacije()">Izmeni</button>
            </div>
            <div v-else>
                <button type="button" v-on:click="sacuvajIzmene()">Sacuvaj</button>
                <button type="button" v-on:click="izmeniInformacije()">Otkazi</button>
            </div>
            <div v-if="!izmeniClick">
                <p>
                    <b>Tip:</b> {{restoran.tip}} <br>
                    <b>Status:</b> {{ restoran.status ? 'Otvoreno' : 'Zatvoreno' }} <br>
                    <hr>
                    <b>Geografska sirina:</b> {{restoran.lokacija.geoSirina}} <br>
                    <b>Geografska duzina:</b> {{restoran.lokacija.geoDuzina}} <br>
                    <b>Grad:</b> {{restoran.lokacija.grad}} <br>
                    <b>Ulica:</b> {{restoran.lokacija.ulica}} <br>
                    <b>Broj:</b> {{restoran.lokacija.broj}} <br>
                    <b>Postanski broj:</b> {{restoran.lokacija.postanskiBroj}} <br>
                    <hr>
                    <b>Menadzer:</b> {{restoran.menadzer.ime}} {{restoran.menadzer.prezime}} <br>
                    <hr>    
                </p>
            </div>
            <div v-else>
                <p>
                    <b>Tip:</b> <input type="text" v-model="restoran.tip"> <br>
                    <b>Status:</b> {{ restoran.status ? 'Otvoreno' : 'Zatvoreno' }} <br>
                    <!--<select v-model="restoran.status">
                        <option :value="true">Otvoreno</option>
                        <option :value="false">Zatvoreno</option>
                    </select> <br>-->
                    <hr>
                    <b>Geografska sirina:</b> <input type="text" v-model="restoran.lokacija.geoSirina"> <br>
                    <b>Geografska duzina:</b> <input type="text" v-model="restoran.lokacija.geoDuzina"> <br>
                    <b>Grad:</b> <input type="text" v-model="restoran.lokacija.grad"> <br>
                    <b>Ulica:</b> <input type="text" v-model="restoran.lokacija.ulica"> <br>
                    <b>Broj:</b> <input type="text" v-model="restoran.lokacija.broj"> <br>
                    <b>Postanski broj:</b> <input type="number" v-model="restoran.lokacija.postanskiBroj"> <br>
                    <hr>
                    <b>Menadzer:</b> {{restoran.menadzer.ime}} {{restoran.menadzer.prezime}} <br>
                    <hr>    
                </p>
            </div>
            
            <h3>Artikli:</h3><hr>
            <div v-for = "a in artikli">
                <div v-if="izmeniArtikalClick && a===artikalZaIzmenu">
                    <p>
                        <b>Naziv: </b> <input type="text" v-model="a.naziv"><br>
                        <b>Cena: </b> <input type="text" v-model="a.cena"> din<br>
                        <b>Tip: </b> 
                        <select v-model="a.tip">
                        <option value="jelo">Jelo</option>
                        <option value="pice">Pice</option>
                        </select>
                        <br>
                        <b>Kolicina: </b> <input type="text" v-model="a.kolicina"><br>
                        <b>Opis: </b> <input type="text" v-model="a.opis"><br>
                        <button type="button" v-on:click="sacuvajIzmenuArtikla(a)">Sacuvaj</button>
                        <button type="button" v-on:click="izmeniInformacijeArtikla(a)">Otkazi</button>
                        <hr>
                    </p>
                </div>
                <div v-else>
                    <p>
                        <b>Naziv: </b> {{a.naziv}}<br>
                        <b>Cena: </b> {{a.cena}} din<br>
                        <b>Tip: </b> {{a.tip}}<br>
                        <b>Kolicina: </b> {{a.kolicina}}<br>
                        <b>Opis: </b> {{a.opis}}<br>
                        <button type="button" v-on:click="izmeniInformacijeArtikla(a)">Izmeni</button>
                        <button type="button" v-on:click="izbrisiArtikal(a)">Izbrisi</button>
                        <hr>
                        
                    </p>
                </div>
            </div>
            <div v-if="vlasnikRestorana()">
                <div v-if="dodajArtikalVisible">
                    <button v-on:click="dodajArtikalVisible=false">Dodaj artikal</button>
                </div>
                <div v-else>
                    <form method ="POST" @submit.prevent = "dodajArtikal()">
                        <div>    
                            <label for="naziv"><b>Naziv</b></label>
                            <input type="text" v-model="naziv" required>
                            <br>
                            <label for="cena"><b>Cena</b></label>
                            <input type="number" v-model="cena" required>
                            <br>
                            <label for="tip"><b>Tip</b></label>
                            <select v-model="tip" required>
                                <option value="jelo">Jelo</option>
                                <option value="pice">Pice</option>
                            </select>
                            <br>
                            <label for="kolicina"><b>Kolicina</b></label>
                            <input type="text" v-model="kolicina">
                            <br>
                            <label for="opis"><b>Opis</b></label>
                            <input type="text" v-model="opis">
                            <br>
                            <button type="submit">Dodaj</button>    
                        </div>
                    </form>
                    <button v-on:click="dodajArtikalVisible=true">Otkazi</button>
                </div>
            </div>
        </div> 
    `,
    mounted(){
        this.korisnik = JSON.parse(localStorage.getItem('korisnik'))
        this.uloga = this.korisnik.uloga
        axios
        .get(`/restoran/get/${this.$route.params.naziv}`)
        .then(response=>{
            this.restoran = response.data
            this.artikli = this.restoran.artikli
            console.log(this.artikli)
        })
    },
    methods:{
        dodajArtikalClick:function(){
            this.dodajArtikalVisible = !dodajArtikalVisible
        },
        dodajArtikal:function(){
            const artikal = {
                naziv:this.naziv,
                cena:this.cena,
                tip:this.tip,
                kolicina:this.kolicina,
                opis:this.opis,
                idRestorana: this.restoran.id
            }
            axios
            .post('/restoran/add/artikal', artikal)
            .then(response=>{
                this.artikal = response.data
                this.artikli.push(artikal)
                this.dodajArtikalVisible=true
                this.anuliranjeArtikla()
            })
        },
        vlasnikRestorana:function(){
            if(this.restoran.menadzer.korisnickoIme == this.korisnik.korisnickoIme){
                return true;
            }else{
                return false
            }
        },
        izmeniInformacije:function(){
            this.izmeniClick = !this.izmeniClick
        },
        sacuvajIzmene:function(){
            this.izmeniClick = !this.izmeniClick
            const slanje = {
                idRestorana: this.restoran.id,
                tip:this.restoran.tip,
                status:this.restoran.status,
                geoSirina:this.restoran.lokacija.geoSirina,
                geoDuzina:this.restoran.lokacija.geoDuzina,
                grad:this.restoran.lokacija.grad,
                ulica:this.restoran.lokacija.ulica,
                broj:this.restoran.lokacija.broj,
                postanskiBroj:this.restoran.lokacija.postanskiBroj,
            }
            axios
            .post('/editRestoran', slanje)
            .then(response=>{
                window.location.reload()
            })
        },
        dodavanjeArtikalaValidacija:function(){
            if(this.naziv == null){
                return false
            }
            return true
        },
        anuliranjeArtikla:function(){
            this.naziv = null,
            this.cena = null,
            this.tip = null,
            this.kolicina = null,
            this.opis = null
        },
        izbrisiArtikal:function(a){
            axios
            .post('/izbrisiArtikal', a)
            .then(response=>{
                console.log('brisanje')
                var i = this.artikli.length
                while(i--){
                    if(this.artikli[i].naziv == a.naziv){
                        this.artikli.splice(i,1)
                    }
                }
            })
        },
        izmeniInformacijeArtikla:function(a){
            this.izmeniArtikalClick = !this.izmeniArtikalClick
            this.artikalZaIzmenu = a
        },
        promeniStanjeDugmetaIzmenaArtikla:function(){
            this.izmeniArtikalClick = !this.izmeniArtikalClick
            this.artikalZaIzmenu = null
        },
        sacuvajIzmenuArtikla:function(artikal){
            artikal.cena.toString()
            axios
            .post('/izmenaArtikla', artikal)
            .then(response=>{
                this.promeniStanjeDugmetaIzmenaArtikla()
            })
        }

    }
})