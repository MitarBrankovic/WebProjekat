Vue.component("pregledKorisnika",{
    data: function(){
        return{
          korisnici:null,
          count:0
        }
    },

    template:`
        <div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" style="margin-left: 50px" >
                <pretragaKorisnika id="search" @clicked="onSearch2Click"></pretragaKorisnika>    
                <div v-for = "m in korisnici">
                
                    <div class="row" >
                        <div class="card shadow-sm" style="width: 300px">
    
                                
                                <p class="card-text">
                                Korisnicko ime: {{m.korisnickoIme}} <br/>
                                Lozinka: {{m.lozinka}} <br/>
                                Ime: {{m.ime}} <br/>
                                Prezime: {{m.prezime}} <br/>
                                Pol: {{m.pol}} <br/>
                                Datum: {{m.datum}} <br/>
                                Uloga: {{m.uloga}} <br/>
                                </p>
                                
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted(){
        axios
        .get('/pregledKorisnika')
        .then(response=>{this.korisnici=response.data;})
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
        }
    }
})