Vue.component("kreiranjeRestorana", {
    data: function() {
        return {
			naziv:"",
			tip:"",
			status:"",
			geografskaDuzina:"",
			geografskaSirina:"",
			grad:"",
			ulica:"",
			broj:"",
			postanskiBroj:"",
			slika:"",
			menadzeri:null,
			menadzer:"",
			unetaAdresa:false
        }
    },
    template:`  
	<div>    
		<form id="kreiranjeForm" method ="POST" @submit.prevent = "submitForm">
		  	<div class="forma container">
			    <h1>Kreiranje novog restorana</h1>
			    <hr>
			
			    <label class="col-sm-2 col-form-label" for="naziv"><b>Naziv</b></label>
			    <input class="col-sm-2 col-form-control" type="text" v-model="naziv" required>
				<br>
				
				<label class="col-sm-2 col-form-label" for="tip"><b>Tip</b></label>
			    <input class="col-sm-2 col-form-control" type="text" v-model="tip" required>
				<br>
				
				<label class="col-sm-2 col-form-label" for="status"><b>Status</b></label>
				<select class="col-sm-2 col-form-control" v-model="status">
					<option value="otvoren">Otvoren</option>
				    <option value="zatvoren">Zatvoren</option>
				</select>
				<br>
				
				<hr>
				<label class="col-sm-2 col-form-label" for="lokacija"><b>Lokacija</b></label>
				<br>
				<input class="col-sm-2 col-form-control" type="text" placeholder="Geografska duzina" id="geoDuz" v-model.lazy="geografskaDuzina" required>
				<input class="col-sm-2 col-form-control" type="text" placeholder="Geografska sirina" id="geoSir" v-model="geografskaSirina" required>
				<br>
			    <input class="col-sm-2 col-form-control" type="text" placeholder="Grad" id="grad" v-model="grad" required>
				<input class="col-sm-2 col-form-control" type="text" placeholder="Ulica" id="ulica" v-model="ulica" required>
			    <br>
				<input class="col-sm-2 col-form-control" type="text" placeholder="Broj" id="broj" v-model="broj" required>
				<input class="col-sm-2 col-form-control" type="text" placeholder="Postanski broj" id="postanskiBroj" v-model="postanskiBroj" required>
				<br><br>
				<div id="js-map" style="height:500px; width:50%;"></div><br><br>
				<button class="btn btn-primary" type="button" v-on:click="sacuvajLokaciju()">Sacuvaj lokaciju</button>
				<hr>
			    <label class="col-sm-2 col-form-label" for="slika"><b>Slika</b></label>
			    <input class="col-sm-2 col-form-control" type="file"  required @change=imageAdded>
				<br>

			    <label class="col-sm-2 col-form-label" for="menadzer"><b>Menadzer</b></label>
				<select class="form-select" v-model="menadzer">
					<option disabled value="">Please select one</option>
					<option v-for="m in menadzeri" :value="m.korisnickoIme">{{m.korisnickoIme}}</option>
				</select>
				<a target="_blank" href="#/kreiranjeNaloga">Kreiraj novog menadzera</a>
				
				<br>                
				<button type="submit" class="button">Kreiraj</button>
			</div>
		</form>
		<footer class="footer" style="margin-top:20px;">
			<p>Contact: &nbsp; brankovic.ra198.2018@uns.ac.rs <br>&emsp;&emsp; beric.ra191.2018@uns.ac.rs</p> &emsp;&emsp;&emsp;&emsp;
			<p>Studentarija, Copyright &copy; 2021</p>  
		</footer>
	</div>
    `       
        ,
		mounted(){
			axios
			.get('/pregledMenadzera')
			.then(response=>{this.menadzeri=response.data;})
			init()

		},


	 methods:{
        submitForm:function(){
			
            const user = {
                naziv:this.naziv,
                tip:this.tip,
                status: this.status,
                geografskaDuzina:this.geografskaDuzina,
				geografskaSirina:this.geografskaSirina,
				grad:this.grad,
				ulica:this.ulica,
				broj:this.broj,
				postanskiBroj:this.postanskiBroj,
                slika:this.slika,
				menadzer:this.menadzer
            }
			
            axios
            .post('/kreiranjeRestorana',user)
            .then(response=>{
                this.$router.push('/')
            })
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

function init(){
	const map = new ol.Map({
		view: new ol.View({
			center: [2208254.0327390945,5661276.834908611],
			zoom: 15
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		],
		target: 'js-map'
	})
	var previousLayer = null;
	map.on('click', function(e){
		if(previousLayer!=null) {map.removeLayer(previousLayer)}
		var latLong = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
		console.log(latLong);
		this.geografskaDuzina = latLong[0]
		this.geografskaSirina = latLong[1]
		
		var layer = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [
					new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.fromLonLat(latLong))
					})
				]
			})
		});	
		previousLayer = layer;
		map.addLayer(layer);
		simpleReverseGeocoding(this.geografskaDuzina, this.geografskaSirina)
	})
}

function simpleReverseGeocoding(lon, lat) {
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
}

