Vue.component("pregledRestoranaMenadzer",{
    data: function(){
        return{
          korisnik:null,
          restoran:null
        }
    },

    template:`
        <div>
            <p class="card-text">
                Naziv restorana: {{restoran.naziv}} <br/>
                Tip: {{restoran.tip}} <br/>
                Status: {{restoran.status}} <br/>
            </p>
        </div>
    `,
    mounted(){
        this.korisnik = JSON.parse(localStorage.getItem('korisnik'))
        console.log(this.korisnik)
        axios
        .post('/pregledRestoranaMenadzer', this.korisnik)
        .then(response=>{
            console.log(response)
            console.log(response.data)
            this.restoran=response.data;})
        
    },
    method(){
        restoran=this.restoran
    }
})