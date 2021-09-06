Vue.component("zahteviDostavljaca",{
    data: function(){
        return{
            korisnik:null,
            restoran:null,
            zahtevi:[],
            urednaLista:[]
        }
    },

    template:`
        <div style="margin-top: 30px">
            <h2 class="flex title-div bigtitle">Zahtevi porudzbina: </h2>
            <div class="list-group container">
                <div v-for="z in zahtevi">
                        <div class="list-item">
                            <p>
                                <b>Id zahteva:</b> {{z.id}}<br>
                                <b>Dostavljac:</b> {{z.dostavljac.ime}} {{z.dostavljac.prezime}}<br>
                                <b>Sifra porudzbine:</b> {{z.porudzbina.id}}
                            </p><br>
                            <button class="btn btn-primary" type="button" v-on:click="izCekaDostavljacaUTransport(z)">Potvrdi</button>
                            <button class="btn btn-danger" type="button" v-on:click="odbijZahtev(z)">Odbij</button>
                        </div>
                </div>
            </div>
        </div>
    `,
    mounted(){
        this.korisnik = JSON.parse(localStorage.getItem('korisnik'))

        axios
        .post('/pregledRestoranaMenadzer', this.korisnik)
        .then(response=>{
            this.restoran=response.data
            this.dobaviZahteve()
            //this.naziv_restorana = this.restoran.naziv.replace(/ /g, "-")
        })
    },
    methods:{
        dobaviZahteve:function(){
            console.log(this.restoran)
            axios
            .get(`/pregledZahtevaRestorana/${this.restoran.id}`)
            .then(response=>{
                this.zahtevi = response.data
                console.log(this.zahtevi)
            })
        }, 
        izCekaDostavljacaUTransport(z){
            const sifra = {
                sifraPorudzbine:z.porudzbina.id,
                dostavljac:z.dostavljac.korisnickoIme          
            }

            axios
            .post('/izCekaDostavljacaUTransport',sifra)
            .then(response=>{
                window.location.reload()
            })
        }, 
        odbijZahtev(z){
            const sifra = {
                sifraZahteva:z.id          
            }

            axios
            .post('/odbijZahtev',sifra)
            .then(response=>{
                window.location.reload()
            })
        }
    }
});