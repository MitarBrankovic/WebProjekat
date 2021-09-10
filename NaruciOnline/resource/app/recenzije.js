Vue.component("recenzije",{
    data: function(){
        return{
            recenzije:null
        }
    },

    template:`
        <div>
            <h2 class="flex title-div bigtitle" style="margin-top: 30px;">Recenzije:</h2>
            <hr>
            <div class="list-group container">
                <div v-for="r in recenzije">
                    <p>
                        <b>Kupac:</b><b> {{r.idKorisnika}}</b><br>
                        <b>Ocena:</b> {{r.ocena}}<br>
                        <b>Tekst:</b> {{r.tekst}}<br>
                        <hr>
                    </p>
                </div>
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