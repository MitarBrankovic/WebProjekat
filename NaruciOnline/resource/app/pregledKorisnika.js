Vue.component("pregledKorisnika",{
    data: function(){
        return{
          korisnici:null,
          blokirani:null,
          otkazane:null,
          kupci:null,
          count:0// 
        }
    },

    template:`
        <div>
            <div  style="margin-left: 70px; margin-top: 70px">
                <h1 style="text-align:center;">Pregled svih korisnika</h1>
                <pretragaKorisnika id="search" @clicked="onSearch2Click"></pretragaKorisnika>    
                <hr><br><br>
                <div class="col-md-10 panel panel-default">
                    <div panel-heading>
                        <h3 class="panel-title">Broj korisnika</h3>
                    </div>

                    <div class="panel-body row">
                        <div class="col-md-2 razmak-card card" style="width: 50px;">
                        <div>
                            <h2><span class="bi bi-people"></span>Korisnici</h2>
                            <h3 style="text-align:center;">{{brojKorisnika()}}</h3>
                        </div>
                        </div>

                        <div class="col-md-2 razmak-card card">
                            <h2><span class="bi bi-person-fill"></span>Kupci</h2>
                            <h3 style="text-align:center;">{{brojKupaca()}}</h3>
                        </div>

                        <div class="col-md-2 razmak-card card">
                            <h2><span class="bi bi-person-circle"></span>Menadzeri</h2>
                            <h3 style="text-align:center;">{{brojMenadzera()}}</h3>
                        </div>

                        <div class="col-md-2 razmak-card card">
                            <h2><span class="bi bi-minecart"></span>Dostavljaci</h2>
                            <h3 style="text-align:center;">{{brojDostavljaca()}}</h3>
                        </div>

                        <div class="col-md-2 razmak-card card">
                            <h2><span class="bi bi-dash-circle-fill"></span>Blokirani</h2>
                            <h3 style="text-align:center;">{{brojBlokiranih()}}</h3>
                        </div>
                    </div>
                </div>
        
                <div>
                    <table class="table table-success table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Korisnicko ime</th>
                                <th scope="col">Lozinka</th>
                                <th scope="col">Ime</th>
                                <th scope="col">Prezime</th>
                                <th scope="col">Pol</th>
                                <th scope="col">Datum</th>
                                <th scope="col">Uloga</th>
                                <th scope="col">Sumnjiv korisnik</th>
                                <th scope="col">Blokiraj</th>
                            </tr>
                        </thead>
                        <tbody v-for = "k in korisnici">

                                <tr>
                                <td>{{k.korisnickoIme}}</td>
                                <td>{{k.lozinka}}</td>
                                <td>{{k.ime}}</td>
                                <td>{{k.prezime}}</td>
                                <td>{{k.pol}}</td>
                                <td>{{k.datumRodjenja}}</td>
                                <td>{{k.uloga}}</td>
                                <td v-if="k.uloga === 'KUPAC' && (proveraSumnjivihKupaca(k) > 4) && !proveraBlokiran(k)" style="color:red"><b>DA</b> (Otkazane porudzbine: {{proveraSumnjivihKupaca(k)}})</td>
                                <td v-else>Ne</td>
                                <td><button v-if="k.uloga!=='ADMIN' && !proveraBlokiran(k)" type="button" class="btn btn-danger" v-on:click="blokirajKorisnika(k)">Blokiraj</button></td>
                                </tr>

                        </tbody>
                    </table>
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
        },        
        brojKorisnika(){
            let brojac=0;
            for(let korsnik of this.korisnici){
                brojac++;
            }
            return brojac;
        },
        brojKupaca(){
            let brojac=0;
            for(let korisnik of this.korisnici){
                if(korisnik.uloga==='KUPAC'){brojac++;}
            }
            return brojac;
        },
        brojDostavljaca(){
            let brojac=0;
            for(let korisnik of this.korisnici){
                if(korisnik.uloga==='DOSTAVLJAC'){brojac++;}
            }
            return brojac;
        },
        brojMenadzera(){
            let brojac=0;
            for(let korisnik of this.korisnici){
                if(korisnik.uloga==='MENADZER'){brojac++;}
            }
            return brojac;
        },
        brojBlokiranih(){
            let brojac=0;
            for(let blokiran of this.blokirani){
                brojac++;
            }
            return brojac;
        }

    }
})