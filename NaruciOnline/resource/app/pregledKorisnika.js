Vue.component("pregledKorisnika",{
    data: function(){
        return{
          korisnici:null,
          blokirani:null,
          count:0
        }
    },

    template:`
        <div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" style="margin-left: 50px" >
                <pretragaKorisnika id="search" @clicked="onSearch2Click"></pretragaKorisnika>    
                <div v-for = "k in korisnici">

                    <div style="width: 300px">

                            
                            <p class="card-text">
                            Korisnicko ime: {{k.korisnickoIme}} <br/>
                            Lozinka: {{k.lozinka}} <br/>
                            Ime: {{k.ime}} <br/>
                            Prezime: {{k.prezime}} <br/>
                            Pol: {{k.pol}} <br/>
                            Datum: {{k.datum}} <br/>
                            Uloga: {{k.uloga}} <br/>
                            </p>
                            
                            <button v-if="k.uloga!=='ADMIN' && !proveraBlokiran(k)" type = "button" v-on:click="blokirajKorisnika(k)">Blokiraj</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted(){
        axios.all([axios.get('/pregledKorisnika'), axios.get('/pregledBlokiranih')
        ]).then(axios.spread((...responses) => {
           this.korisnici = responses[0].data
           this.blokirani = responses[1].data
       }))
    },
    methods:{
        increment(){
            this.count += 1;
        },
        onSearch2Click:function(search){
            console.log(search)
            axios
            .post('/pretragaKoris',search)
            .then(response=>{this.korisnici= response.data})
        },
        blokirajKorisnika(k){
            const slanje = {
                korisnickoIme:k.korisnickoIme          
            }
            axios
            .post('/blokirajKorisnika',slanje)
            .then(response=>{this.korisnici= response.data})
            window.location.reload()
        },
        proveraBlokiran(k){
            for(let blokiran of this.blokirani){
                if(blokiran === k.korisnickoIme){
                    return true;
                }
            }
            return false;
        }
    }
})