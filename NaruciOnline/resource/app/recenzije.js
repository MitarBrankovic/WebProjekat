Vue.component("recenzije",{
    data: function(){
        return{
            recenzije:null
        }
    },

    template:`
        <div>
            <h2>Recenzije:</h2>
            <hr>
            <div v-for="r in recenzije">
                <p>
                    <b>{{r.idKorisnika}}</b><br>
                    Ocena: {{r.ocena}}<br>
                    {{r.tekst}}<br>
                    <hr>
                </p>
            </div>
        </div>
    `,
    mounted(){
        axios
        .get(`/recenzije/get/${this.$route.params.naziv}`)
        .then(response=>{
            this.recenzije = response.data
            console.log(this.recenzije)
        })
    },
    methods:{
    }
})