Vue.component("pregledPorudzbina",{
    data: function(){
        return{
            porudzbine:null,
          count:0
        }
    },

    template:`
        <div>
            <div style="margin-left: 50px" >
                   
                <div v-for = "p in porudzbine">
                
                    <div class="row" >
    
                                
                        <p>
                        Sifra: {{p.id}} <br/>

                        </p>
                                
                            
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted(){
        axios
        .get('/pregledPorudzbina')
        .then(response=>{this.porudzbine=response.data;})
    },
    methods:{
        increment(){
            this.count += 1;
        }
    }
})