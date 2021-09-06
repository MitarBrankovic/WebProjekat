Vue.component("zahteviKomentara", {
    data: function() {
        return {
            korisnik:null,
			restoran:null,
            komentari:null
        }
    },
    template:`  
        <div style="margin-top: 30px">
            <h2 class="flex title-div bigtitle">Zahtevi za komentare</h2>
            <hr>
            <div class="list-group container">
                <div v-for="k in komentari">
                    <div class="list-item">
                        <p>
                            <b>Kupac:</b>{{k.idKorisnika}}<br>
                            <b>Ocena:</b> {{k.ocena}}<br>
                            <b>Tekst:</b>{{k.tekst}}<br><br>
                            <button class="btn btn-danger" type="button" v-on:click="odbijKomentar(k)">Odbij</button>
                            <button class="btn btn-success" type="button" v-on:click="odobriKomentar(k)">Potvrdi</button>
                            <hr>
                        </p>
                    </div>
                </div>
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