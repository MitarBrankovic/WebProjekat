Vue.component("pregledRestoranaMenadzer",{
    data: function(){
        return{
          korisnik:null,
          restoran:null,
          statusRestorana:null
        }
    },

    template:`
        <div>
            <h2>{{restoran.naziv}}</h2>
            <p>
                <b>Tip:</b> {{restoran.tip}} <br>
                <b>Status:</b> {{ restoran.status ? 'Otvoreno' : 'Zatvoreno' }} <br>
                <hr>
                <b>Geografska sirina:</b> {{restoran.lokacija.geoSirina}} <br>
                <b>Geografska duzina:</b> {{restoran.lokacija.geoDuzina}} <br>
                <b>Grad:</b> {{restoran.lokacija.grad}} <br>
                <b>Ulica:</b> {{restoran.lokacija.ulica}} <br>
                <b>Broj:</b> {{restoran.lokacija.broj}} <br>
                <b>Postanski broj:</b> {{restoran.lokacija.postanskiBroj}} <br>
                <hr>
                <b>Menadzer:</b> {{restoran.menadzer.ime}} {{restoran.menadzer.prezime}} <br>
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

})