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

            }
        }
    },
    template:`
        <div>
            <h3 id="search2">Pretraga</h3>

            <input type="text" v-model="search.naziv" placeholder="naziv"/>
            <input type="text" v-model="search.tip" placeholder="tip"/>
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
                <button type="button" v-on:click="nazivRast()">Naziv (Rastuce)</button>
                <button type="button" v-on:click="nazivOpad()">Naziv (Opadajuce)</button>
                <button type="button" v-on:click="lokacRast()">Lokacija Rastuce</button>
                <button type="button" v-on:click="lokacOpad()">Lokacija Opadajuce</button>
                <button type="button" v-on:click="ocenaRast()">Ocena Rastuce</button>
                <button type="button" v-on:click="ocenaOpad()">Ocena Opadajuce</button>
                
            </div>
        
        
        
        
        </div>
    `,
    methods:{
        pretrazi:function(){
            this.$emit('clicked',this.search)
        }
    }
})