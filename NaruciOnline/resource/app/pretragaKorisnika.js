Vue.component("pretragaKorisnika",{
    data:function(){
        return{
            search:{
                imeRast:false,
                imeOpad:false,
                prezimeRast:false,
                prezimeOpad:false,
                korisnickoImeRast:false,
                korisnickoImeOpad:false,
                ime:"",
                prezime:"",
                korisnickoIme:"",
                uloga:"",
                tip:""

            }
        }
    },
    template:`
        <div>
            <h3 id="search3">Pretraga</h3>

            <input type="text" v-model="search.ime" placeholder="ime"/>
            <input type="text" v-model="search.prezime" placeholder="prezime"/>
            <input type="text" v-model="search.korisnickoIme" placeholder="korisnickoIme"/>
            <button type="button" v-on:click="pretrazi()" class="btn btn-sm btn-outline-primary">Pretrazi</button>
            <br>

            <div>
                <select v-model="search.uloga">
                    <option selected  value="">Sve uloge</option>
                    <option value="MENADZER">Menadzer</option>
                    <option value="KUPAC">Kupac</option>
                    <option value="DOSTAVLJAC">Dostavljac</option>
                </select>
                <select v-model="search.tip">
                    <option selected  value="">Svi tipovi</option>
                    <option value="BRONZANI">Bronzani</option>
                    <option value="SREBRNI">Srebrni</option>
                    <option value="ZLATNI">Zlatni</option>
                </select>
            </div>
        
            <div>
                <button type="button" v-on:click="imeRastFun()">Ime (Rastuce)</button>
                <button type="button" v-on:click="imeOpadFun()">Ime (Opadajuce)</button>
                <button type="button" v-on:click="prezimeRastFun()">Prezime Rastuce</button>
                <button type="button" v-on:click="prezimeOpadFun()">Prezime Opadajuce</button>
                <button type="button" v-on:click="korisnickoImeRastFun()">Korisnicko Ime Rastuce</button>
                <button type="button" v-on:click="korisnickoImeOpadFun()">Korisnicko Ime Opadajuce</button>
                
            </div>
        
        
        
        
        </div>                
    `,
    methods:{
        pretrazi:function(){
            this.$emit('clicked',this.search)
        },
        imeRastFun: function(){
            this.search.imeRast = true
            this.search.imeOpad = false
            this.search.prezimeRast = false
            this.search.prezimeOpad = false
            this.search.korisnickoImeRast = false
            this.search.korisnickoImeOpad = false
            console.log("Klik!")
            this.$emit('clicked', this.search)
        },
        imeOpadFun: function(){
            this.search.imeRast = false
            this.search.imeOpad = true
            this.search.prezimeRast = false
            this.search.prezimeOpad = false
            this.search.korisnickoImeRast = false
            this.search.korisnickoImeOpad = false
            console.log("Klik!")
            this.$emit('clicked', this.search)
        },
        prezimeRastFun: function(){
            this.search.imeRast = false
            this.search.imeOpad = false
            this.search.prezimeRast = true
            this.search.prezimeOpad = false
            this.search.korisnickoImeRast = false
            this.search.korisnickoImeOpad = false
            console.log("Klik!")
            this.$emit('clicked', this.search)
        },
        prezimeOpadFun: function(){
            this.search.imeRast = false
            this.search.imeOpad = false
            this.search.prezimeRast = false
            this.search.prezimeOpad = true
            this.search.korisnickoImeRast = false
            this.search.korisnickoImeOpad = false
            console.log("Klik!")
            this.$emit('clicked', this.search)
        },
        korisnickoImeRastFun: function(){
            this.search.imeRast = false
            this.search.imeOpad = false
            this.search.prezimeRast = false
            this.search.prezimeOpad = false
            this.search.korisnickoImeRast = true
            this.search.korisnickoImeOpad = false
            console.log("Klik!")
            this.$emit('clicked', this.search)
        },
        korisnickoImeOpadFun: function(){
            this.search.imeRast = false
            this.search.imeOpad = false
            this.search.prezimeRast = false
            this.search.prezimeOpad = false
            this.search.korisnickoImeRast = false
            this.search.korisnickoImeOpad = true
            console.log("Klik!")
            this.$emit('clicked', this.search)
        }
    }
})