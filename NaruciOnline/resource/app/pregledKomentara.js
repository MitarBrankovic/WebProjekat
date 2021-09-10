Vue.component("pregledKomentara", {
    data: function() {
        return {
            korisnik:null,
            komentari:null
        }
    },
    template:`  
        <div style="margin-top: 30px;" v-if="korisnik.uloga=='ADMIN'">
            <h2 class="flex title-div bigtitle">Svi komentari</h2>
            <div v-for="k in komentari" class="list-group container">
                <div class="list-item">
                    <p>
                        <b>Kupac:</b> {{k.idKorisnika}}<br>
                        <b>Ocena:</b> {{k.ocena}}<br>
                        <b>Tekst:</b> {{k.tekst}}<br>
                        <b>Status:</b> {{k.status}}<br><br>
                        <hr>
                    </p>
                </div>
            </div>
        </div>
        <div v-else-if="korisnik.uloga=='MENADZER'" style="margin-top: 30px; margin-left: 30px">
            <h2 class="flex title-div bigtitle">Svi komentari</h2>
            <div v-for="k in komentari" class="list-group container">
                <div class="list-item">
                    <p>
                        <b>Kupac:</b> {{k.idKorisnika}}<br>
                        <b>Ocena:</b> {{k.ocena}}<br>
                        <b>Tekst:</b> {{k.tekst}}<br>
                        <b>Status:</b> {{k.status}}<br><br>
                        <hr>
                    </p>
                </div>
            </div>
        </div>
    `       
        ,
    mounted(){
        this.korisnik = JSON.parse(localStorage.getItem('korisnik'))
        if(this.korisnik.uloga=='ADMIN'){
            axios
            .get('/bukvalnoSviKomentari')
            .then(response=>{
                this.komentari=response.data
                console.log(this.komentari)
            })
        }else if(this.korisnik.uloga=='MENADZER'){
            axios
            .get(`/sviKomentariRestorana/${this.korisnik.korisnickoIme}`)
            .then(response=>{
                this.komentari=response.data
                console.log(this.komentari)
            })
        }
	},
    methods:{
    }
});