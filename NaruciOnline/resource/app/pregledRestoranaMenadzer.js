Vue.component("pregledRestoranaMenadzer",{
    data: function(){
        return{
          uloga:null,
          korisnik:null,
          restoran:null,
          statusRestorana:null,
          dodajArtikalVisible:true,

          naziv:null,
          cena:null,
          tip:null,
          kolicina:null,
          opis:null,
          slika:null,

          artikli:null
        }
    },

    template:`
        <div>
            <h2>{{restoran.naziv}}</h2>
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
            <h3>Artikli:</h3><hr>
            <div v-for = "a in artikli">
                <p>
                    <b>Naziv: </b> {{a.naziv}}<br>
                    <b>Cena: </b> {{a.cena}} din<br>
                    <b>Tip: </b> {{a.tip}}<br>
                    <b>Kolicina: </b> {{a.kolicina}}<br>
                    <b>Opis: </b> {{a.opis}}<br>

                    <hr>
                </p>
            </div>
            
            
            <div v-if="dodajArtikalVisible">
                <button v-on:click="dodajArtikalVisible=false">Dodaj artikal</button>
            </div>
            <div v-else>
                <form method ="POST" @submit.prevent = "dodajArtikal">
                    <div>    
                        <label for="naziv"><b>Naziv</b></label>
                        <input type="text" v-model="naziv" required>
                        <br>
                        <label for="cena"><b>Cena</b></label>
                        <input type="number" v-model="cena" required>
                        <br>
                        <label for="tip"><b>Tip</b></label>
                        <select v-model="tip">
                            <option value="jelo">Jelo</option>
                            <option value="pice">Pice</option>
				        </select>
                        <br>
                        <label for="kolicina"><b>Kolicina</b></label>
                        <input type="text" v-model="kolicina" required>
                        <br>
                        <label for="opis"><b>Opis</b></label>
                        <input type="text" v-model="opis" required>
                        <br>
                        <button type="submit" v-on:click="dodajArtikalVisible=true">Dodaj</button>
                    </div>
                </form>
                <button v-on:click="dodajArtikalVisible=true">Cancle</button>
            </div>
        </div>    
    `,
    mounted(){
        this.korisnik = JSON.parse(localStorage.getItem('korisnik'))
        console.log(this.korisnik)
        this.uloga = this.korisnik.uloga
        if(this.uloga == 'MENADZER'){
            axios
            .post('/pregledRestoranaMenadzer', this.korisnik)
            .then(response=>{
                console.log(response)
                console.log(response.data)
                this.restoran=response.data;
                this.artikli=this.restoran.artikli;
            })
        }
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
            .post('/pregledRestoranaMenadzerAddArtikal', artikal)
        }


    }

})