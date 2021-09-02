Vue.component("korpa",{
    data: function(){
        return{
          korpa:null,
          count:0,
          artikli:[],
          cena:null,
          korisnickoIme:"",
          kupci:null,
          pomocnaLista:[]
        }
    },

    template:`
    <div style="margin-left: 100px; margin-top: 30px" class="whole-content">  
    <h2  class="flex title-div bigtitle">Artikli koji se nalaze u korpi:</h2><hr>    
    <div v-if="korpa">    
        <div class="artikli">
            <div v-for = "a in korpa.listaArtikala">         
                <div class="mojArtikal">
                        <p>
                        <img class="mojImg spacing" :src="a.slika"><br>
                        <b>Naziv:</b> {{a.naziv}}</br>                          
                        <b>Tip: </b> {{a.tip}}<br>
                        <b>Kolicina: </b> {{a.kolicina}}<br>
                        <b>Opis: </b> {{a.opis}}<br>
                        <b>Cena:</b> {{a.cena}}</br>
                        <button class="btn btn-danger" type = "button" v-on:click="ukloniIzKorpe(a)">Ukloni</button>
                        </p>           
                </div>
            </div>
                    
            <div class="price-content">
                <h4>Ukupna cena: {{ukupnaCena()}}</h4>
                <div v-if="kupci" v-for = "k in this.kupci" class="price-parts flex flex-row">
                    <h4 v-if="(k.korisnickoIme === korisnik.korisnickoIme)">Cena sa popustom: {{cenaSaPopustom(k)}}</h4>
                </div>
                <div class="price-parts">
                    <button class="button" type="button" v-on:click="potvrdiPorudzbinu()">Potvrdi porudzbinu</button>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
    mounted(){
        axios
        .get('/pregledKupaca')
        .then(response=>{this.kupci = response.data;})

        this.korpa = JSON.parse(localStorage.getItem('Korpa'))
        this.korisnik=JSON.parse(localStorage.getItem('korisnik'))
       

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
            if(this.korpa.listaArtikala.length !== 0){
                localStorage.setItem('Korpa', JSON.stringify(this.korpa))
            }else{ window.location.reload(); }
            
        },       
        ukupnaCena:function(){
            let sum = 0;
            for(let i = 0; i < this.korpa.listaArtikala.length; i++){
              sum += (parseFloat(this.korpa.listaArtikala[i].cena));
            }
      
           return sum;

        },      
        cenaSaPopustom(k){
            let sum = 0;
            for(let i = 0; i < this.korpa.listaArtikala.length; i++){
              sum += (parseFloat(this.korpa.listaArtikala[i].cena));
            }
            if(k.korisnickoIme === this.korisnik.korisnickoIme){
                sum = sum * (100 - k.tipKupca.popust)/100;
            }       
            return sum;
        },
        kupac(){
            let nesto = null;
            for(let k of this.kupci){
                if(k.korisnickoIme === this.korisnik){
                    nesto = k;
                }
            }
            return nesto;
        },
        potvrdiPorudzbinu:function(){
            this.korpa.listaArtikala.forEach(element => {
                this.pomocnaLista.push(element.naziv);
            });

            const porudzbina = {
                artikli:this.pomocnaLista,
                cena:this.ukupnaCena(),
                korisnickoIme:this.korisnik.korisnickoIme
                
            }
			
            axios
            .post('/potvrdiPorudzbinu',porudzbina)
            .then(response=>{
                this.$router.push('/')
            })

            localStorage.removeItem('Korpa')
        }
        
    }
})