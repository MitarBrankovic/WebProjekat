Vue.component("korpa",{
    data: function(){
        return{
          korpa:null,
          count:0,
          artikli:[],
          cena:null,
          korisnickoIme:""
        }
    },

    template:`
        <div style="margin-left: 50px" >  
            <h2>Artikli koji se nalaze u korpi:</h2>    
            <div v-if="korpa">
            
                <div v-for = "a in korpa.listaArtikala">
                    
                    <div style="width: 300px">

                            <p>
                            <img :src="a.slika" width = "200px" heigth = "200"><br>
                            <b>Naziv:</b> {{a.naziv}}</br>
                            <b>Cena:</b>{{a.cena}}</br>
                            <button type = "button" v-on:click="ukloniIzKorpe(a)">Ukloni</button>
                            </p>
                
                    </div>
                </div>

                <h4>Ukupna cena: {{ukupnaCena()}}</h4>

            </div>
            
            <button type = "button" v-on:click="potvrdiPorudzbinu()">Potvrdi porudzbinu</button>

        </div>
    `,
    mounted(){
        this.korpa = JSON.parse(localStorage.getItem('Korpa'))
        this.korisnik=JSON.parse(localStorage.getItem('korisnik'))

        
        //axios
        //.get('/pregledKorisnika')
        //.then(response=>{this.korisnici=response.data;})
    },
    methods:{
        increment(){
            this.count += 1;
        },
        ukloniIzKorpe:function(a){
            const index = this.korpa.listaArtikala.indexOf(a);
            if (index > -1) {
                this.korpa.listaArtikala.splice(index, 1);
            }

            if(localStorage.getItem('Korpa') !== null){
                localStorage.removeItem('Korpa')
            }
            localStorage.setItem('Korpa', JSON.stringify(this.korpa))

        },
        
        ukupnaCena:function(){
            let sum = 0;
            for(let i = 0; i < this.korpa.listaArtikala.length; i++){
              sum += (parseFloat(this.korpa.listaArtikala[i].cena));
            }
      
           return sum;

        },     
        potvrdiPorudzbinu:function(){
            const porudzbina = {
                artikli:this.korpa.listaArtikala,
                cena:this.ukupnaCena(),
                korisnickoIme:this.korisnik.korisnickoIme
                
            }
			
            axios
            .post('/potvrdiPorudzbinu',porudzbina)
            .then(response=>{
                this.$router.push('/')
            })

        }
        
    }
})