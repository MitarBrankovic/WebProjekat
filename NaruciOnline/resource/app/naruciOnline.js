Vue.component("NaruciOnline", {
    data: function() {
        return {
            restorani:null,
            korisnik:null,
            uloga:"",
            sortiraniRestorani:[]
        }
    },
    template:`  
    <div>
        <div style="margin-left: 50px" >
            <pretragaRestorana id="search" @clicked="onSearchClick"></pretragaRestorana>
            <br>    
            <div v-for = "m in sortiraniRestorani" >
                <div id="manifest" style="width: 400px">
                    <img :src="m.slika" width = "200px" heigth = "300">
                    <div>
                        <p>
                            <b>{{m.naziv}}<b><br>
                        </p>    
                        <p>
                            {{m.tip}}<br>
                            {{m.lokacija.grad}} {{m.lokacija.ulica}} {{m.lokacija.broj}}
                        </p>
                        <div v-if="(m.status===true)">
                            <p style="color:green">otvoren</p>
                        </div>
                        <div v-if="(m.status===false)">
                            <p style="color:red">zatvoren</p>
                        </div>
                        <button type = "button" v-on:click="prikazRestorana(m)">Detalji</button> 
                        <hr>
                                
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
                .then(response=>{this.restorani= response.data})
            },
            sortiranjeRestorana:function(){
                for(var i = 0; i < this.restorani.length; i++){
                    if(this.restorani[i].status===true)
                        this.sortiraniRestorani.push(this.restorani[i])
                }
                for(var i = 0; i < this.restorani.length; i++){
                    console.log(this.restorani[i].status)
                    if(this.restorani[i].status===false)
                        this.sortiraniRestorani.push(this.restorani[i])
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
                this.sortiranjeRestorana()
            })
            localStorage.removeItem('restor')
        }

});