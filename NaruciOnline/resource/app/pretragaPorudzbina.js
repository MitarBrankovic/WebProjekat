Vue.component("pretragaPorudzbina",{
    data:function(){
        return{
            search:{
                checkNedostavljene:false,
                nazivRast:false,
                nazivOpad:false,
                cenaRast:false,
                cenaOpad:false,
                datumRast:false,
                datumOpad:false,
                naziv:"",
                cenaOd:"",
                cenaDo:"",
                datumOd:"",
                datumDo:"",
                status:""

            },
            tipoviRestorana:[],
            korisnik:null
        }
    },
    template:`
        <div>
            <h3 id="search3">Pretraga</h3>

            <input type="text" v-model="search.naziv" placeholder="naziv"/>
            <input type="number" v-model="search.cenaOd" placeholder="cenaOd"/>
            <input type="number" v-model="search.cenaDo" placeholder="cenaDo"/>
            <input type="date" v-model="search.datumOd" placeholder="datumOd"/>
            <input type="date" v-model="search.datumDo" placeholder="datumDo"/>
            <button class="btn btn-sm btn-primary bi bi-search" type="button" v-on:click="pretrazi()">Pretrazi</button>
            <br>

            <div v-if="korisnik">
                <select v-model="search.status">
                    <option selected value="">Svi statusi</option>
                    <option value="Obrada">Obrada</option>
                    <option value="UPripremi">U pripremi</option>
                    <option value="CekaDostavljaca">Ceka dostavljaca</option>
                    <option value="UTransportu">U transportu</option>
                    <option value="Dostavljena">Dostavljena</option>
                    <option value="Otkazana">Otkazana</option>
                </select>

                <select v-model="search.tipRestorana">
                    <option value="" selected>Svi tipovi</option>
                    <option v-for="t in tipoviRestorana" :value="t">{{t}}</option>
                </select>

                <input v-if="(korisnik.uloga==='KUPAC') || (korisnik.uloga==='DOSTAVLJAC')" type="checkbox" v-model="search.checkNedostavljene"></input>
                <label v-if="(korisnik.uloga==='KUPAC') || (korisnik.uloga==='DOSTAVLJAC')">Nedostavljene</label>
            </div>
        
            <div>
                <button class="bi bi-arrow-up btn btn-info" type="button" v-on:click="nazivRastFun()">Naziv Rastuce</button>
                <button class="bi bi-arrow-down btn btn-info" type="button" v-on:click="nazivOpadFun()">Naziv Opadajuce</button>
                <button class="bi bi-arrow-up btn btn-info" type="button" v-on:click="cenaRastFun()">Cena Rastuce</button>
                <button class="bi bi-arrow-down btn btn-info" type="button" v-on:click="cenaOpadFun()">Cena Opadajuce</button>
                <button class="bi bi-arrow-up btn btn-info" type="button" v-on:click="datumRastFun()">Datum Rastuce</button>
                <button class="bi bi-arrow-down btn btn-info" type="button" v-on:click="datumOpadFun()">Datum Opadajuce</button>
             </div>
        
        
        
        
        </div>                
    `,
    methods:{
        pretrazi:function(){
            this.$emit('clicked',this.search)
        },
        nazivRastFun: function(){
            this.search.nazivRast = true
            this.search.nazivOpad = false
            this.search.cenaRast = false
            this.search.cenaOpad = false
            this.search.datumRast = false
            this.search.datumOpad = false
            console.log("Klik!")
            this.$emit('clicked', this.search)
        },
        nazivOpadFun: function(){
            this.search.nazivRast = false
            this.search.nazivOpad = true
            this.search.cenaRast = false
            this.search.cenaOpad = false
            this.search.datumRast = false
            this.search.datumOpad = false
            console.log("Klik!")
            this.$emit('clicked', this.search)
        },
        cenaRastFun: function(){
            this.search.nazivRast = false
            this.search.nazivOpad = false
            this.search.cenaRast = true
            this.search.cenaOpad = false
            this.search.datumRast = false
            this.search.datumOpad = false
            console.log("Klik!")
            this.$emit('clicked', this.search)
        },
        cenaOpadFun: function(){
            this.search.nazivRast = false
            this.search.nazivOpad = false
            this.search.cenaRast = false
            this.search.cenaOpad = true
            this.search.datumRast = false
            this.search.datumOpad = false
            console.log("Klik!")
            this.$emit('clicked', this.search)
        },
        datumRastFun: function(){
            this.search.nazivRast = false
            this.search.nazivOpad = false
            this.search.cenaRast = false
            this.search.cenaOpad = false
            this.search.datumRast = true
            this.search.datumOpad = false
            console.log("Klik!")
            this.$emit('clicked', this.search)
        },
        datumOpadFun: function(){
            this.search.nazivRast = false
            this.search.nazivOpad = false
            this.search.cenaRast = false
            this.search.cenaOpad = false
            this.search.datumRast = false
            this.search.datumOpad = true
            console.log("Klik!")
            this.$emit('clicked', this.search)
        }
    },
    mounted(){
        this.korisnik = JSON.parse(localStorage.getItem('korisnik'))
        axios
        .get('/getTipoveRestorana')
        .then(response=>{
            this.tipoviRestorana=response.data
        })
    }
})