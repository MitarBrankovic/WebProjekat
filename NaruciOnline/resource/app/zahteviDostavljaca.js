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
            <div v-for="z in zahtevi">
                    <p>
                        Id porudzbine: {{z.id}}<br>
                        Dostavljac: {{z.dostavljac.korisnickoIme}}<br>
                    </p>
                    <button type="button">Potvrdi</button>
                    <button type="button">Odbij</button>

            </div>
        </div>
    `,
    mounted(){
        this.korisnik = JSON.parse(localStorage.getItem('korisnik'))

        axios
        .post('/pregledRestoranaMenadzer', this.korisnik)
        .then(response=>{
            this.restoran=response.data
            console.log(this.restoran.naziv)
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
        }
    }
});