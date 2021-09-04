Vue.component("pretragaRestorana",{
    data:function(){
        return{
            search:{
                checkOtvoren:false,
                nazivRast:false,
                nazivOpad:false,
                lokacRast:false,
                lokacOpad:false,
                ocenaRast:false,
                ocenaOpad:false,
                naziv:"",
                tip:"",
                lokacija:"",
                ocena:""

            },
            tipoviRestorana:[]
        }
    },
    template:`
        <div>
            <h3 id="search2">Pretraga</h3>

            <input type="text" v-model="search.naziv" placeholder="naziv"/>
            <select v-model="search.tip">
                <option value="" selected>Bilo koji tip</option>
				<option v-for="t in tipoviRestorana" :value="t">{{t}}</option>
			</select>
            <input type="text" v-model="search.lokacija" placeholder="lokacija"/>
            <select v-model="search.ocena">
                <option selected disabled value="">Sve ocene</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="4.5">4.5+</option>
            </select>
            <input type="checkbox" v-model="search.checkOtvoren">Otvoreno</input>
            <button type="button" v-on:click="pretrazi()" class="btn btn-sm btn-outline-primary">Pretrazi</button>
            <br>
        
            <div>
                <button type="button" v-on:click="nazivRastFun()">Naziv Rastuce</button>
                <button type="button" v-on:click="nazivOpadFun()">Naziv Opadajuce</button>
                <button type="button" v-on:click="lokacRastFun()">Lokacija Rastuce</button>
                <button type="button" v-on:click="lokacOpadFun()">Lokacija Opadajuce</button>
                <button type="button" v-on:click="ocenaRastFun()">Ocena Rastuce</button>
                <button type="button" v-on:click="ocenaOpadFun()">Ocena Opadajuce</button>
                
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
            this.search.lokacRast = false
            this.search.lokacOpad = false
            this.search.ocenaRast = false
            this.search.ocenaOpad = false
            console.log("Klik!")
            this.$emit('clicked', this.search)
        },
        nazivOpadFun: function(){
            this.search.nazivRast = false
            this.search.nazivOpad = true
            this.search.lokacRast = false
            this.search.lokacOpad = false
            this.search.ocenaRast = false
            this.search.ocenaOpad = false
            console.log("Klik!")
            this.$emit('clicked', this.search)
        },
        lokacRastFun: function(){
            this.search.nazivRast = false
            this.search.nazivOpad = false
            this.search.lokacRast = true
            this.search.lokacOpad = false
            this.search.ocenaRast = false
            this.search.ocenaOpad = false
            console.log("Klik!")
            this.$emit('clicked', this.search)
        },
        lokacOpadFun: function(){
            this.search.nazivRast = false
            this.search.nazivOpad = false
            this.search.lokacRast = false
            this.search.lokacOpad = true
            this.search.ocenaRast = false
            this.search.ocenaOpad = false
            console.log("Klik!")
            this.$emit('clicked', this.search)
        },
        ocenaRastFun: function(){
            this.search.nazivRast = false
            this.search.nazivOpad = false
            this.search.lokacRast = false
            this.search.lokacOpad = false
            this.search.ocenaRast = true
            this.search.ocenaOpad = false
            console.log("Klik!")
            this.$emit('clicked', this.search)
        },
        ocenaOpadFun: function(){
            this.search.nazivRast = false
            this.search.nazivOpad = false
            this.search.lokacRast = false
            this.search.lokacOpad = false
            this.search.ocenaRast = false
            this.search.ocenaOpad = true
            console.log("Klik!")
            this.$emit('clicked', this.search)
        }
    },
    mounted(){
        axios
        .get('/getTipoveRestorana')
        .then(response=>{
            this.tipoviRestorana=response.data
        })
    }
})