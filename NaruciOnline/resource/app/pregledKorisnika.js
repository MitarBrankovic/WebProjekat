Vue.component("pregledKorisnika",{
    data: function(){
        return{
          korisnici:null,
          blokirani:null,
          otkazane:null,
          kupci:null,
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
                            <h3  v-if="k.uloga === 'KUPAC' && (proveraSumnjivihKupaca(k) > 4) && !proveraBlokiran(k)" style="color:red">Sumnjiv korisnik</h3>
                            <label v-if="k.uloga === 'KUPAC' && (proveraSumnjivihKupaca(k) > 4) && !proveraBlokiran(k)" style="color:red"><b>Broj otkazivanja porudzbina : {{proveraSumnjivihKupaca(k)}}</b></label> <br>
                            Korisnicko ime: {{k.korisnickoIme}} <br/>
                            Lozinka: {{k.lozinka}} <br/>
                            Ime: {{k.ime}} <br/>
                            Prezime: {{k.prezime}} <br/>
                            Pol: {{k.pol}} <br/>
                            Datum: {{k.datum}} <br/>
                            Uloga: {{k.uloga}} <br/>       
                            </p>
                            
                            <label v-if="k.uloga!=='ADMIN' && proveraBlokiran(k)" style="color:red"><b>Blokiran</b></label> <br>
                            <button v-if="k.uloga!=='ADMIN' && !proveraBlokiran(k)" type = "button" v-on:click="blokirajKorisnika(k)">Blokiraj</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted(){
        axios.all([axios.get('/pregledKorisnika'), axios.get('/pregledBlokiranih'),
        axios.get('/pregledOtkazanihPorudzbina'), axios.get('/pregledKupaca')
        ]).then(axios.spread((...responses) => {
           this.korisnici = responses[0].data
           this.blokirani = responses[1].data
           this.otkazane = responses[2].data
           this.kupci = responses[3].data
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
        },
        proveraSumnjivihKupaca(k){
            let kupac1 = null;
            for(let kupac of this.kupci){
                if(kupac.korisnickoIme === k.korisnickoIme){
                    kupac1 = kupac;
                }
            }
            let brojac = 0;
            for(let otkazana of this.otkazane){
                if(otkazana.kupacId === kupac1.korisnickoIme){
                    brojac++;
                }
            }
            return brojac;
        }
    }
})