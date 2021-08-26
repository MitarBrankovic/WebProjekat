Vue.component("pretragaPorudzbina",{
    data:function(){
        return{
            search:{
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

            }
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
            <button type="button" v-on:click="pretrazi()">Pretrazi</button>
            <br>

            <div>
                <select v-model="search.status">
                    <option selected  value="">Svi statusi</option>
                    <option value="Obrada">Obrada</option>
                    <option value="UPripremi">U pripremi</option>
                    <option value="CekaDostavljaca">Ceka dostavljaca</option>
                    <option value="UTransportu">U transportu</option>
                    <option value="Dostavljena">Dostavljena</option>
                    <option value="Otkazana">Otkazana</option>
                </select>
            </div>
        
            <div>
                <button type="button" v-on:click="nazivRastFun()">Naziv Rastuce</button>
                <button type="button" v-on:click="nazivOpadFun()">Naziv Opadajuce</button>
                <button type="button" v-on:click="cenaRastFun()">Cena Rastuce</button>
                <button type="button" v-on:click="cenaOpadFun()">Cena Opadajuce</button>
                <button type="button" v-on:click="datumRastFun()">Datum Rastuce</button>
                <button type="button" v-on:click="datumOpadFun()">Datum Opadajuce</button>
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
    }
})