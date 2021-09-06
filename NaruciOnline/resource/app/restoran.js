Vue.component("restoran",{
    data: function(){
        return{
            korisnik:null,
            restoran:null,
            uloga:null,
            artikal:null,
            artikli:null,
            naziv:null,
            cena:null,
            tip:null,
            kolicina:null,
            opis:null,
            slika:"",
            dodajArtikalVisible:true,
            izmeniClick:false,
            izmeniArtikalClick:false,
            artikalZaIzmenu:null,
            Korpa:null,

            geografskaDuzina:"",
			geografskaSirina:"",
			grad:"",
			ulica:"",
			broj:"",
			postanskiBroj:"",
        }
    },

    template:`
        <div >
        <div id="js-map1" style="height:500px; width:50%;"></div><br><br>
        <div v-if="restoran" >

            <div class="container-xl" id="moj-restoran">
                <h2>{{restoran.naziv}}</h2>
                
                <img :src="restoran.slika" width = "200px" heigth = "300">
                <br><br>
                <button class="btn btn-primary" type="button" v-on:click="otvoriRecenzije()">Recenzije</button><br><br>
                <div v-if="!izmeniClick">
                    <button class="btn btn-primary" v-if="uloga==='ADMIN'" type="button" v-on:click="izmeniInformacije()">Izmeni</button>
                </div>
                <div v-else>
                    <button class="btn btn-success" type="button" v-on:click="sacuvajIzmene()">Sacuvaj</button>
                    <button class="btn btn-danger" type="button" v-on:click="izmeniInformacije()">Otkazi</button>
                </div>
                <div v-if="!izmeniClick">
                    <p><br>
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
                        <hr>    
                    </p>
                </div>
                <div v-else>
                    <p><br>
                        <b>Tip:</b> <input type="text" v-model="restoran.tip"> <br>
                        <b>Status:</b> {{ restoran.status ? 'Otvoreno' : 'Zatvoreno' }} <br>
                        <!--<select v-model="restoran.status">
                            <option :value="true">Otvoreno</option>
                            <option :value="false">Zatvoreno</option>
                        </select> <br>-->
                        <hr>
                        <div class="artikli">
                            <div class="container">
                                <label class="col-sm-2 col-form-label"><b>Geografska sirina:</b></label> <input class="col-sm-2 col-form-control" id="geoSir" type="text" v-model="restoran.lokacija.geoSirina"> <br>
                                <label class="col-sm-2 col-form-label"><b>Geografska duzina:</b></label> <input class="col-sm-2 col-form-control" id="geoDuz" type="text" v-model="restoran.lokacija.geoDuzina"> <br>
                                <label class="col-sm-2 col-form-label"><b>Grad:</b></label> <input id="grad" class="col-sm-2 col-form-control" type="text" v-model="restoran.lokacija.grad"> <br>
                                <label class="col-sm-2 col-form-label"><b>Ulica:</b></label> <input id="ulica" class="col-sm-2 col-form-control" type="text" v-model="restoran.lokacija.ulica"> <br>
                                <label class="col-sm-2 col-form-label"><b>Broj:</b></label> <input id="broj" class="col-sm-2 col-form-control" type="text" v-model="restoran.lokacija.broj"> <br>
                                <label class="col-sm-2 col-form-label"><b>Postanski broj:</b></label> <input class="col-sm-2 col-form-control" id="postanskiBroj" type="number" v-model="restoran.lokacija.postanskiBroj"> <br>
                                <label class="col-sm-2 col-form-label" for="slika"><b>Slika</b></label>
                                <input type="file"  required @change=imageAdded>
                            </div>
                            
                        
                        </div>
                        <hr>
                        <b>Menadzer:</b> {{restoran.menadzer.ime}} {{restoran.menadzer.prezime}} <br>
                        <hr>    
                    </p>
                </div>
            </div>

            <div  class="whole-content">
                <h3 class="flex title-div bigtitle">Artikli:</h3><hr>
                <div class="artikli">
                    <div v-for = "a in artikli">
                        <div v-if="izmeniArtikalClick && a===artikalZaIzmenu" class="mojArtikal">
                            <p>
                                <img class="mojImg spacing" :src="a.slika"><br>
                                <b>Naziv: </b> <input type="text" v-model="a.naziv"><br>
                                <b>Cena: </b> <input type="text" v-model="a.cena"> din<br>
                                <b>Tip: </b> 
                                <select v-model="a.tip">
                                    <option value="jelo">Jelo</option>
                                    <option value="pice">Pice</option>
                                </select>
                                <br>
                                <b>Kolicina: </b> <input type="text" v-model="a.kolicina"><br>
                                <b>Opis: </b> <input type="text" v-model="a.opis"><br>
                                <label for="slika"><b>Slika</b></label>
                                <input type="file"  required @change=imageAdded>
                                <br>
                                <div v-if="vlasnikRestorana()">
                                    <button class="btn btn-primary" type="button" v-on:click="sacuvajIzmenuArtikla(a)">Sacuvaj</button>
                                    <button class="btn btn-danger" type="button" v-on:click="izmeniInformacijeArtikla(a)">Otkazi</button>
                                </div>    
                                <hr>
                            </p>
                        </div>
                        <div v-else class="mojArtikal">
                            <p>
                                <img class="mojImg spacing" :src="a.slika"><br>
                                <b>Naziv: </b> {{a.naziv}}<br>
                                <b>Cena: </b> {{a.cena}} din<br>
                                <b>Tip: </b> {{a.tip}}<br>
                                <b>Kolicina: </b> {{a.kolicina}}<br>
                                <b>Opis: </b> {{a.opis}}<br>
                                <div v-if="vlasnikRestorana()">
                                    <button class="btn btn-primary" type="button" v-on:click="izmeniInformacijeArtikla(a)">Izmeni</button>
                                    <button class="btn btn-danger" type="button" v-on:click="izbrisiArtikal(a)">Izbrisi</button>
                                </div>
                                
                                <div v-if="(korisnik.uloga==='KUPAC')">
                                    <!-- <input type="number" v-model="kolicinaZaKorpu" required> -->
                                    <div v-if="restoran.status==true">
                                        <button v-if="artikalJeUKorpi(a)" class="buttonDecrease" type="button" v-on:click="ukloniIzKorpe(a)">-</button>
                                        <button class="button" type="button" v-on:click="dodajUKorpu(a)">+</button>
                                    </div>
                                    <div v-else>
                                        <p>Restoran je zatvoren</p>
                                    </div>
                                    <div v-if="kolicinaArtikala(a) != 0">
                                        <hr>
                                        <b><p>Kolicina: {{kolicinaArtikala(a)}}</p></b>
                                    </div>

                                </div>
                                <hr>                            
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="vlasnikRestorana()" class="dugme-ispod-artikala">
                <div v-if="dodajArtikalVisible">
                    <button class="btn btn-success" v-on:click="dodajArtikalVisible=false">Dodaj artikal</button>
                </div>
                <div v-else>
                    <form method ="POST" @submit.prevent = "dodajArtikal()">
                        <div class="artikal-tekst">    
                            <label for="naziv"><b>Naziv</b></label>
                            <input type="text" v-model="naziv" required>
                            <br>
                            <label for="cena"><b>Cena</b></label>
                            <input type="number" v-model="cena" required>
                            <br>
                            <label for="tip"><b>Tip</b></label>
                            <select v-model="tip" required>
                                <option value="jelo">Jelo</option>
                                <option value="pice">Pice</option>
                            </select>
                            <br>
                            <label for="kolicina"><b>Kolicina</b></label>
                            <input type="text" v-model="kolicina">
                            <br>
                            <label for="opis"><b>Opis</b></label>
                            <input type="text" v-model="opis">
                            <br>
                            <label for="slika"><b>Slika:</b></label>
                            <input type="file" @change=imageAdded>
                            <br>
                            <button class="btn btn-success" type="submit">Dodaj</button>    
                        </div>
                    </form>
                    <button class="btn btn-danger" v-on:click="dodajArtikalVisible=true">Otkazi</button>
                </div>
            </div>
        </div> 
        </div>
    `,
    mounted(){
        init1()
        if(JSON.parse(localStorage.getItem('Korpa')) !== null){
            this.Korpa = JSON.parse(localStorage.getItem('Korpa'))
        }
        this.korisnik = JSON.parse(localStorage.getItem('korisnik'))
        if(this.korisnik === null){
            this.korisnik = {
                uloga:'GUEST',
                korisnickoIme:"GUEST"
            }
        }
        this.uloga = this.korisnik.uloga
        axios
        .get(`/restoran/get/${this.$route.params.naziv}`)
        .then(response=>{
            this.restoran = response.data
            this.artikli = this.restoran.artikli
            console.log(this.artikli)
        })
        
    },
    methods:{
        dodajArtikalClick:function(){
            this.dodajArtikalVisible = !dodajArtikalVisible
        },
        dodajArtikal:function(){
            const artikal = {
                naziv:this.naziv,
                cena:this.cena,
                tip:this.tip,
                kolicina:this.kolicina,
                opis:this.opis,
                idRestorana: this.restoran.id,
                slika:this.slika
            }
            for(var i = 0; i < this.artikli.length; i++){
                if(this.artikli[i].naziv == artikal.naziv){
                    alert('Artikal sa tim imenom vec postoji!')
                    console.log('greska')
                    return
                }
            }
            axios
            .post('/restoran/add/artikal', artikal)
            .then(response=>{
                this.artikal = response.data
                this.artikli.push(artikal)
                this.dodajArtikalVisible=true
                this.anuliranjeArtikla()
            })
        },
        vlasnikRestorana:function(){
            if(this.restoran.menadzer.korisnickoIme == this.korisnik.korisnickoIme){
                return true;
            }else{
                return false
            }
        },
        izmeniInformacije:function(){
            this.izmeniClick = !this.izmeniClick
        },
        sacuvajIzmene:function(){
            this.izmeniClick = !this.izmeniClick
            const slanje = {
                idRestorana: this.restoran.id,
                tip:this.restoran.tip,
                status:this.restoran.status,
                geoSirina:this.restoran.lokacija.geoSirina,
                geoDuzina:this.restoran.lokacija.geoDuzina,
                grad:this.restoran.lokacija.grad,
                ulica:this.restoran.lokacija.ulica,
                broj:this.restoran.lokacija.broj,
                postanskiBroj:this.restoran.lokacija.postanskiBroj,
                slika:this.slika
            }
            axios
            .post('/editRestoran', slanje)
            .then(response=>{
                window.location.reload()
            })
        },
        dodavanjeArtikalaValidacija:function(){
            if(this.naziv == null){
                return false
            }
            return true
        },
        anuliranjeArtikla:function(){
            this.naziv = null,
            this.cena = null,
            this.tip = null,
            this.kolicina = null,
            this.opis = null
        },
        izbrisiArtikal:function(a){
            axios
            .post('/izbrisiArtikal', a)
            .then(response=>{
                console.log('brisanje')
                var i = this.artikli.length
                while(i--){
                    if(this.artikli[i].naziv == a.naziv){
                        this.artikli.splice(i,1)
                    }
                }
            })
        },
        izmeniInformacijeArtikla:function(a){
            this.izmeniArtikalClick = !this.izmeniArtikalClick
            this.artikalZaIzmenu = a
            this.artikalZaIzmenu.slika = this.slika
        },
        promeniStanjeDugmetaIzmenaArtikla:function(){
            this.izmeniArtikalClick = !this.izmeniArtikalClick
            this.artikalZaIzmenu = null
        },
        sacuvajIzmenuArtikla:function(artikal){
            artikal.cena = artikal.cena.toString()
            artikal.slika = this.slika
            axios
            .post('/izmenaArtikla', artikal)
            .then(response=>{
                this.promeniStanjeDugmetaIzmenaArtikla()
            })
        },
        dodajUKorpu:function(a){
            if(this.Korpa == null){
                this.Korpa = {
                    idRestorana: this.restoran.id,
                    korisnickoIme: this.korisnik.korisnickoIme,
                    listaArtikala: []
                }
            }
            this.Korpa.listaArtikala.push(a)
            if(localStorage.getItem('Korpa') !== null){
                localStorage.removeItem('Korpa')

            }
            localStorage.setItem('Korpa', JSON.stringify(this.Korpa))
            console.log(this.Korpa.listaArtikala)

            //swal("Uspesno ste dodali artikal u korpu!", "", "success");

        },
        ukloniIzKorpe:function(a){
            this.Korpa.listaArtikala.pop(a)
            if(localStorage.getItem('Korpa') !== null){
                localStorage.removeItem('Korpa')

            }
            localStorage.setItem('Korpa', JSON.stringify(this.Korpa))
            console.log(this.Korpa.listaArtikala)
            if(this.Korpa.listaArtikala.length == 0){
                localStorage.removeItem('Korpa')
            }
            //swal("Uspesno ste obrisali artikal iz korpe!", "", "success");

        },
        imageAdded(e){
            var files = e.target.files;

			if(!files.length)
				return;
			
				this.createImage(files[0]);
        },
        createImage(file){
			var image = new Image();
            var reader = new FileReader();
			var vm = this;

			reader.onload = (e) =>{
				vm.slika = e.target.result;

			};
			reader.readAsDataURL(file);
        },
        otvoriRecenzije:function(){
            axios
            .get(`/recenzije/${this.restoran.naziv}`)
            .then(response=>{
                const rest = response.data
                localStorage.setItem('rest', JSON.stringify(rest))
                this.$router.push(`/recenzije/${this.restoran.naziv}`)
            })
        },
        artikalJeUKorpi:function(p){
            if(this.Korpa === null){
                return false
            }
            var postoji = false
            for(var i = 0; i < this.Korpa.listaArtikala.length; i++){
                if(p.naziv == this.Korpa.listaArtikala[i].naziv){
                    postoji = true
                    break
                }
            }
            return postoji
        },
        kolicinaArtikala(a){
            if(this.Korpa == null || this.Korpa.listaArtikala == 0){ return 0 }
            var count = 0 
            for(var i = 0; i < this.Korpa.listaArtikala.length; i++){
                if(a.naziv == this.Korpa.listaArtikala[i].naziv){
                    count++
                }
            }
            return count;
        },
        sacuvajLokaciju(){
			this.geografskaDuzina = document.getElementById("geoDuz").value;
			this.geografskaSirina = document.getElementById("geoSir").value;
			this.grad = document.getElementById("grad").value;
			this.ulica = document.getElementById("ulica").value;
			this.broj = document.getElementById("broj").value;
			this.postanskiBroj = document.getElementById("postanskiBroj").value;

			document.getElementById("geoDuz").value = this.geografskaDuzina;
			document.getElementById("geoSir").value = this.geografskaSirina;
			document.getElementById("grad").value = this.grad;
			document.getElementById("ulica").value = this.ulica;
			document.getElementById("broj").value = this.broj;
			document.getElementById("postanskiBroj").value = this.postanskiBroj;
		}

    }
});

function init1(){
	const map1 = new ol.Map({
		view: new ol.View({
			center: [2208254.0327390943,5661276.834908611],
			zoom: 15
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		],
		target: 'js-map1'
	})
	var previousLayer1 = null;
	map1.on('click', function(e){
		if(previousLayer1!=null) {map1.removeLayer(previousLayer1)}
		var latLong1 = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
		console.log(latLong1);
		this.geografskaDuzina = latLong1[0]
		this.geografskaSirina = latLong1[1]
		
		var layer1 = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [
					new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.fromLonLat(latLong1))
					})
				]
			})
		});	
		previousLayer1 = layer1;
		map1.addLayer(layer1);
		//simpleReverseGeocoding(this.geografskaDuzina, this.geografskaSirina)
	})
}

/*function simpleReverseGeocoding(lon, lat) {
	fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then(function(response) {
	  	return response.json();
	}).then(function(json) {
		ispisAdrese(json, lon, lat);
	})
  }

function ispisAdrese(json, lon, lat) {
	var adresa = json.address;
	document.getElementById("geoDuz").value = lon;
	document.getElementById("geoSir").value = lat;
	var grad = adresa.city
	if(grad.includes("City")){
		grad = grad.replace(' City', "")
	}else if(grad.includes("Municipality")){
		grad = grad.replace(' Municipality', "")
	}
	document.getElementById("grad").value = grad;
	document.getElementById("ulica").value = adresa.road;
	document.getElementById("broj").value = adresa.house_number;
	document.getElementById("postanskiBroj").value = adresa.postcode;
}*/