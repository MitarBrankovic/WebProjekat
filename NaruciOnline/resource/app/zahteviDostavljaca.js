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
        <div>
            <h2>Zahtevi porudzbina: </h2>
            <div v-for="z in zahtevi">
                    <p>
                        Id zahteva: {{z.id}}<br>
                        Dostavljac: {{z.dostavljac.ime}} {{z.dostavljac.prezime}}<br>
                        Sifra porudzbine: {{z.porudzbina.id}}
                    </p>
                    <button type="button" v-on:click="izCekaDostavljacaUTransport(z)">Potvrdi</button>
                    <button type="button" v-on:click="odbijZahtev(z)">Odbij</button>

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