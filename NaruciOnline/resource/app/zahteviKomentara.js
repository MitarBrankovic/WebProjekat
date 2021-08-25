Vue.component("zahteviKomentara", {
    data: function() {
        return {
            korisnik:null,
			restoran:null,
            komentari:null
        }
    },
    template:`  
        <div>
            <h2>Zahtevi za komentare</h2>
            <hr>
            <div v-for="k in komentari">
                <p>
                    {{k.idKorisnika}}<br>
                    Ocena: {{k.ocena}}<br>
                    {{k.tekst}}<br>
                    <button type="button" v-on:click="odbijKomentar(k)">Odbij</button>
                    <button type="button" v-on:click="odobriKomentar(k)">Potvrdi</button>
                    <hr>
                </p>
            </div>
        </div>
    `       
        ,
    mounted(){
        this.korisnik = JSON.parse(localStorage.getItem('korisnik'))
        axios
        .post('/pregledRestoranaMenadzer', this.korisnik)
        .then(response=>{
            this.restoran=response.data
            this.dobaviKomentare()
        })
	},
    methods:{
        dobaviKomentare:function(){
            axios
            .get(`/ZahteviZaKomentare/${this.restoran.id}`)
            .then(response =>{
                this.komentari = response.data
                console.log(this.komentari)
            })
        },
        odobriKomentar:function(k){
            axios
            .post('/odobriKomentar', k)
            .then(response=>{
                this.komentari = response.data
                console.log(this.komentari)
            })
        },
        odbijKomentar:function(k){
            axios
            .post('/odbijKomentar', k)
            .then(response=>{
                this.komentari = response.data
            })
        }
    }
});