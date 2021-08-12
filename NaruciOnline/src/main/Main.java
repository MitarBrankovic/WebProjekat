package main;

import static spark.Spark.*;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.google.gson.Gson;

import io.DostavljacRepository;
import io.KupacRepository;
import io.MenadzerRepository;
import io.RestoranRepository;
import io.KorisnikRepository;
import model.Dostavljac;
import model.ImeTipaKupca;
import model.Korisnik;
import model.Kupac;
import model.Menadzer;
import model.Restoran;
import model.UlogaKorisnika;

public class Main {
	public static void main(String[] args) throws IOException{
		port(8080);
		
		Gson g = new Gson();
		
		staticFiles.externalLocation(new File("./resource").getCanonicalPath());
        after((req,res) -> res.type("application/json"));
		
		get("/test", (req, res) -> {
			return "Works";
		});
//		get("/naruciOnline", (req, res) -> {
//			return true;
//		});
		KorisnikRepository korisnikRepository = new KorisnikRepository();
		KupacRepository kupacRepository = new KupacRepository();
		MenadzerRepository menadzerRepository = new MenadzerRepository();
		DostavljacRepository dostavljacRepository = new DostavljacRepository();
		RestoranRepository restoranRepository = new RestoranRepository();
		
		post("/register", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			
			String ime = mapa.get("ime");
			String prezime = mapa.get("prezime");
			String pol = mapa.get("pol");
			String datumRodjenja = mapa.get("datumRodjenja");
			String korisnickoIme = mapa.get("korisnickoIme");
			String lozinka = mapa.get("lozinka");
			//String uloga = mapa.get("uloga");
			
			//printMap(mapa);
			
			//DateTimeFormatter formatiran = DateTimeFormatter.ofPattern("dd.MM.yyyy.");
			//LocalDate.parse(datumRodjenja, formatiran);
			
			//Korisnik korisnik = new Korisnik(korisnickoIme, lozinka, ime, prezime, 
			//		pol, datumRodjenja, );
			//Serialization serialization = new Serialization();
			Korisnik korisnik = new Korisnik(korisnickoIme, lozinka, ime, prezime, pol, datumRodjenja, UlogaKorisnika.KUPAC);
			Kupac kupac = new Kupac(korisnickoIme, lozinka, ime, prezime, pol, datumRodjenja, UlogaKorisnika.KUPAC);
			if(!kupacRepository.create(kupac) || !korisnikRepository.create(korisnik)) {
				res.status(400);
				return "Greska";
			}

			res.status(200);
			return "OK";
		});
		
		
		
		post("/login", (req, res) -> {
			try {
				HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
				if (korisnikRepository.LoginValidation(mapa.get("korisnickoIme"), mapa.get("lozinka"))) {
					Korisnik k = korisnikRepository.getObj(mapa.get("korisnickoIme"));
					res.status(200);
					return g.toJson(k);
				} else {
					res.status(404);
					return "Greska";
				}

			} catch (Exception e) {

			}
			return "Success";
		});		
		
		
		get("/logout", (req, res) -> {
			return null;
		});
		
		
		post("/edit", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
				Korisnik k = korisnikRepository.getObj(mapa.get("korisnickoIme"));
				//res.status(200);
				//return g.toJson(k);		
				Korisnik novi = new Korisnik();				
				novi.korisnickoIme = mapa.get("korisnickoIme");
				novi.lozinka = mapa.get("lozinka");
				novi.ime = mapa.get("ime");
				novi.prezime = mapa.get("prezime");
				novi.pol = mapa.get("pol");
				novi.datumRodjenja = mapa.get("datumRodjenja");
				novi.uloga = k.uloga;

			if(!korisnikRepository.edit(novi)) {
				res.status(400);
				return "Greska";
			}else {
				
			}
			return "OK";
		});
		
		post("/kreiranjeNaloga", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			
			String ime = mapa.get("ime");
			String prezime = mapa.get("prezime");
			String pol = mapa.get("pol");
			String datumRodjenja = mapa.get("datumRodjenja");
			String korisnickoIme = mapa.get("korisnickoIme");
			String lozinka = mapa.get("lozinka");
			String uloga = mapa.get("uloga");
			
			//Korisnik korisnik = new Korisnik(korisnickoIme, lozinka, ime, prezime, 
					//pol, datumRodjenja, uloga);
			if(uloga.equals("Menadzer")) {
				Korisnik korisnik = new Korisnik(korisnickoIme, lozinka, ime, prezime, 
						pol, datumRodjenja, UlogaKorisnika.MENADZER);
				korisnikRepository.create(korisnik);
				Menadzer menadzer = new Menadzer(korisnickoIme, lozinka, ime, prezime, 
						pol, datumRodjenja, UlogaKorisnika.MENADZER);
				
				if(!menadzerRepository.create(menadzer)) {
					res.status(400);
					return "Greska";
				}
			}else {
				Korisnik korisnik = new Korisnik(korisnickoIme, lozinka, ime, prezime, 
						pol, datumRodjenja, UlogaKorisnika.DOSTAVLJAC);
				korisnikRepository.create(korisnik);
				Dostavljac dostavljac = new Dostavljac(korisnickoIme, lozinka, ime, prezime, 
						pol, datumRodjenja, UlogaKorisnika.DOSTAVLJAC);
				
				if(!dostavljacRepository.create(dostavljac)) {
					res.status(400);
					return "Greska";
				}
			}
			res.status(200);
			return "OK";
		});
		
		get("/pregledKorisnika", (req, res) -> {
			return g.toJson(korisnikRepository.getAll());
		});
		
		post("/kreiranjeRestorana", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			
			String naziv = mapa.get("naziv");
			String tip = mapa.get("tip");
			String status1 = mapa.get("status");		
			boolean status = (status1.equals("otvoren")) ? true : false;
			String lokacija = mapa.get("lokacija");
			String slika = mapa.get("slika");
			//GENERATOR ZA ID		    		    
		    String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		    StringBuilder sb = new StringBuilder();
		    Random random = new Random();
		    for(int i = 0; i < 5; i++) {
		      int index = random.nextInt(alphabet.length());
		      char randomChar = alphabet.charAt(index);
		      sb.append(randomChar);
		    }
		    String generisanID = sb.toString();

			Restoran restoran = new Restoran(naziv, tip, status, slika, 
					generisanID);
			
			if(!restoranRepository.create(restoran)) {
				res.status(400);
				return "Greska";
			}
			
			res.status(200);
			return "OK";
		});
		
		
		
	}
	
	// Sluzi za ispisiavnje hashmape - nebitno
	public static void printMap(Map mp) {
	    Iterator it = mp.entrySet().iterator();
	    while (it.hasNext()) {
	        Map.Entry pair = (Map.Entry)it.next();
	        System.out.println(pair.getKey() + " = " + pair.getValue());
	        it.remove(); // avoids a ConcurrentModificationException
	    }
	}
}
