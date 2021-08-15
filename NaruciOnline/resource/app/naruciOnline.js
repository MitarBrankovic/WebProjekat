Vue.component("NaruciOnline", {
    data: function() {
        return {
            restorani:null,
            korisnik:null,
            uloga:""
        }
    },
    template:`  
    <div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" style="margin-left: 50px" >
            <pretragaRestorana id="search" @clicked="onSearchClick"></pretragaRestorana>    
            <div v-for = "m in restorani" >
                <div class="row" v-if="(m.status===true)">
                    <div class="card shadow-sm" id="manifest" style="width: 400px">
                        <img :src="'../images/'+m.slika+'.jpg'" width = "200px" heigth = "300">
                        <div class="card-body">
                            <p id="man"class="card-text">{{m.naziv}}, {{m.tip}} trenutno je
                            <div v-if="(m.status===true)">
                            <p style="color:green">otvoren</p>
                            </div>
                            <div v-if="(m.status===false)">
                            <p style="color:red">zatvoren</p>
                            </div>
                            na lokaciji {{m.lokacija.grad}}
                            {{m.lokacija.ulica}} {{m.lokacija.broj}}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type = "button" v-on:click="prikazRestorana(m)" class="btn btn-sm btn-outline-primary">Detalji</button> 
                                    <div v-if="(korisnik!==null)">
                                        <button  v-if="(korisnik.uloga==='Kupac')" type= "button" class="btn btn-sm btn-outline-secondary" v-on:click="rezervisiKartu(m)">Rezervisi karte</button>
                                    </div>
                                    <div v-if="(korisnik!==null)">
                                        <button  v-if="(korisnik.uloga==='Administrator')" type= "button" class="btn btn-sm btn-outline-secondary" v-on:click="aktivirajManif(m)">Aktiviraj</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>


            <div v-for = "m in restorani" >
            <div class="row" v-if="(m.status===false)">
                <div class="card shadow-sm" id="manifest" style="width: 400px">
                    <img :src="'../images/'+m.slika+'.jpg'"  width = "200px" heigth = "300">
                    <div class="card-body">
                        <p id="man"class="card-text">{{m.naziv}}, {{m.tip}} trenutno je
                        <div v-if="(m.status===true)">
                        <p style="color:green">otvoren</p>
                        </div>
                        <div v-if="(m.status===false)">
                        <p style="color:red">zatvoren</p>
                        </div>
                        na lokaciji {{m.lokacija.grad}}
                            {{m.lokacija.ulica}} {{m.lokacija.broj}}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type = "button" v-on:click="prikazRestorana(m)" class="btn btn-sm btn-outline-primary">Detalji</button> 
                                <div v-if="(korisnik!==null)">
                                    <button  v-if="(korisnik.uloga==='Kupac')" type= "button" class="btn btn-sm btn-outline-secondary" v-on:click="rezervisiKartu(m)">Rezervisi karte</button>
                                </div>
                                <div v-if="(korisnik!==null)">
                                    <button  v-if="(korisnik.uloga==='Administrator')" type= "button" class="btn btn-sm btn-outline-secondary" v-on:click="aktivirajManif(m)">Aktiviraj</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
        </div>
    </div>
    `      
        ,

        methods:{
            prikazRestorana:function(m){
                axios
                .get(`prikazRestorana/${m.naziv}`)
                .then(response=>{
                    const restor = response.data
                    localStorage.setItem('restor',JSON.stringify(restor))
                    this.$router.push('/prikazRestorana')
                })
            },
            onSearchClick:function(search){
                console.log(search)
                axios
                .post('/pretragaRestor',search)
                .then(response=>{this.restorani= response.data})
            }
        },
        mounted(){
            this.korisnik = JSON.parse(localStorage.getItem('korisnik'))
            if(this.korisnik!=null){
                //this.uloga = this.korisnik.uloga
            }
            axios
            .get('/pregledRestorana')
            .then(response=>{this.restorani=response.data;})
            localStorage.removeItem('restor')
        }

});