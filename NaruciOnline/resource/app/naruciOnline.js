Vue.component("NaruciOnline", {
    data: function() {
        return {
            restorani:null,
            korisnik:null,
            uloga:"",
            sortiraniRestorani:[],
            ocena:"",
            komentari:[]
        }
    },
    template:`  
    <div>
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" style="height: 500px;">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner" style="height: 500px;">
                <div class="carousel-item active">
                    <img src="../images/restoran.jpg" style="-800px;" class="d-block w-100" alt="...">
                    <div class=" carousel-content">
                        <h1 style="text-align: center;">Naruci Online</h1>
                        <h2 >Sajt za narucivanje hrane</h2>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="../images/restoran1.jpg" style="-1200px;" class="d-block w-100" alt="...">
                    <div class=" carousel-content">
                        <h1 style="text-align: center;">Naruci Online</h1>
                        <h2 >Sajt za narucivanje hrane</h2>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="../images/restoran2.jpg" style="-1700px;" class="d-block w-100" alt="...">
                    <div class=" carousel-content">
                        <h1 style="text-align: center;">Naruci Online</h1>
                        <h2 >Sajt za narucivanje hrane</h2>
                    </div>
                </div>
            </div>
        </div>


        <div style="margin-left: 12%"   >
            <pretragaRestorana id="search" @clicked="onSearchClick"></pretragaRestorana>
            <br>    
            <div v-for = "m in sortiraniRestorani" >
                <div class="restoran">
                    <img :src="m.slika">
                    <div class="restoran-tekst">
                        <p>
                            <b>{{m.naziv}}</b><br>
                        </p>    
                        <p>
                            {{m.tip}}<br>
                            {{m.lokacija.grad}} {{m.lokacija.ulica}} {{m.lokacija.broj}}<br>
                            <div v-if="m.ocena!=0">
                                ({{m.ocena}})
                            </div>
                            <div v-else>
                                (nema ocena)
                            </div>
                        </p>
                        <div v-if="(m.status===true)">
                            <p style="color:green">otvoren</p>
                        </div>
                        <div v-if="(m.status===false)">
                            <p style="color:red">zatvoren</p>
                        </div>
                        <button type="button" class="button" v-on:click="prikazRestorana(m)">Detalji</button> 
                                
                    </div>
                </div>
            </div>    
        </div>

        <footer class="footer">
            <p>Contact: &nbsp; brankovic.ra198.2018@uns.ac.rs <br>&emsp;&emsp; beric.ra191.2018@uns.ac.rs</p> &emsp;&emsp;&emsp;&emsp;
            <p>Studentarija, Copyright &copy; 2021</p>  
        </footer>
    </div>
    `      
        ,

        methods:{
            prikazRestorana:function(m){
                axios
                .get(`/restoran/${m.naziv}`)
				.then(response=>{
					const rest = response.data
					localStorage.setItem('rest', JSON.stringify(rest))
					this.$router.push(`/restoran/${m.naziv}`)
				})
                
                
                // .get(`prikazRestorana/${m.naziv}`)
                // .then(response=>{
                //     const restor = response.data
                //     localStorage.setItem('restor',JSON.stringify(restor))
                //     this.$router.push('/prikazRestorana')
                // })
            },
            onSearchClick:function(search){
                console.log(search)
                axios
                .post('/pretragaRestor',search)
                .then(response=>{
                    this.sortiraniRestorani = response.data
                    console.log(response.data)
                    this.dodeliOcene(this.sortiraniRestorani)
                })
            },
            sortiranjeRestorana:function(){
                for(var i = 0; i < this.restorani.length; i++){
                    if(this.restorani[i].status===true)
                        this.sortiraniRestorani.push(this.restorani[i])
                }
                for(var i = 0; i < this.restorani.length; i++){
                    if(this.restorani[i].status===false)
                        this.sortiraniRestorani.push(this.restorani[i])
                }

            },
            getProsecnaOcena:function(restorani){
                
                axios
                .get('/sviKomentari')
                .then(response=>{
                    this.komentari = response.data
                    this.dodeliOcene(restorani)
                    this.sortiranjeRestorana()
                })
            },
            dodeliOcene:function(restorani){
                for(var i = 0; i < restorani.length; i++){
                    restorani[i]['ocena'] = 0
                }
                for(var i = 0; i < restorani.length; i++){
                    let count = 0;
                    for(let j = 0; j < this.komentari.length; j++){
                        if(restorani[i].id == this.komentari[j].idRestorana){
                            count++
                            restorani[i].ocena = (restorani[i].ocena + this.komentari[j].ocena)/count
                        }
                    }
                }
            }
            
        },
        mounted(){
            this.korisnik = JSON.parse(localStorage.getItem('korisnik'))
            if(this.korisnik!=null){
                //this.uloga = this.korisnik.uloga
            }
            axios
            .get('/pregledRestorana')
            .then(response=>{
                this.restorani=response.data;
                this.getProsecnaOcena(this.restorani)
            })
            localStorage.removeItem('restor')
        }
});