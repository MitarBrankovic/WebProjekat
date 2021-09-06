Vue.component("oceni",{
    data: function(){
        return{
            komentar:null,
            ocena:null
        }
    },
    template:`
    <div>
        <div class="rate">
            <input type="radio" v-model="ocena" value="5" />
            <label for="star5" title="text">5 stars</label>
            <input type="radio" v-model="ocena" value="4" />
            <label for="star4" title="text">4 stars</label>
            <input type="radio" v-model="ocena" value="3" />
            <label for="star3" title="text">3 stars</label>
            <input type="radio" v-model="ocena" value="2" />
            <label for="star2" title="text">2 stars</label>
            <input type="radio" v-model="ocena" value="1" />
            <label for="star1" title="text">1 star</label>
        </div>
        <div>
            <textarea v-model="komentar" placeholder="Vas komentar:"></textarea>
        </div>
        <button class="btn btn-primary" type="button" v-on:click="posaljiOcenu()">Posalji</button>
    </div>
    `,
    methods:{
        posaljiOcenu:function(){
            const feedback={
                komentar:this.komentar,
                ocena:this.ocena
            }
            this.$emit('clicked', feedback)
        }
    }
        
})