package main;

import static spark.Spark.*;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.Charset;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;
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
import model.Lokacija;
import model.Menadzer;
import model.Restoran;
import model.UlogaKorisnika;

public class Main {
	public static void main(String[] args) throws IOException{
		port(8080);
		
		Gson g = new Gson();
		
		staticFiles.externalLocation(new File("./resource").getCanonicalPath());
        after((req,res) -> res.type("application/json"));
		
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
				switch(k.uloga) {
				case KUPAC:
					Kupac kupacNovi = new Kupac(novi.korisnickoIme, novi.lozinka, novi.ime, novi.prezime, novi.pol, novi.datumRodjenja, UlogaKorisnika.KUPAC);
					kupacRepository.edit(kupacNovi);
					break;
				case DOSTAVLJAC:
					Dostavljac DostavljacNovi = new Dostavljac(novi.korisnickoIme, novi.lozinka, novi.ime, novi.prezime, novi.pol, novi.datumRodjenja, UlogaKorisnika.DOSTAVLJAC);
					dostavljacRepository.edit(DostavljacNovi);
					break;
				case MENADZER:
					Menadzer MenadzerNovi = new Menadzer(novi.korisnickoIme, novi.lozinka, novi.ime, novi.prezime, novi.pol, novi.datumRodjenja, UlogaKorisnika.MENADZER);
					menadzerRepository.edit(MenadzerNovi);
					break;
				default:
					break;
				}
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
		
		get("/pregledMenadzera", (req, res) -> {
			return g.toJson(menadzerRepository.vratiSlobodne());
		});
		
		get("/pregledRestorana", (req, res) -> {
			return g.toJson(restoranRepository.getAll());
		});
		
		post("/kreiranjeRestorana", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			String status1 = mapa.get("status");		
			boolean status = (status1.equals("otvoren")) ? true : false;
			
			Lokacija lokacija = new Lokacija(Double.parseDouble(mapa.get("geografskaDuzina")), Double.parseDouble(mapa.get("geografskaSirina")),
					mapa.get("grad"), mapa.get("ulica"), mapa.get("broj"), Integer.parseInt( mapa.get("postanskiBroj")));
			
			StringBuilder sb = IDgenerator();
		    String generisanID = sb.toString();
			Restoran restoran = new Restoran(mapa.get("naziv"), mapa.get("tip"), status, mapa.get("slika"), generisanID);
			Menadzer menadzer = menadzerRepository.getObj(mapa.get("menadzer"));
			restoran.menadzer = menadzer;
			restoran.lokacija = lokacija;
			menadzer.idRestorana = generisanID;
			menadzerRepository.dodavanjeRestorana(menadzer);
			
			if(!restoranRepository.create(restoran)) {
				res.status(400);
				return "Greska";
			}			
			res.status(200);
			return "OK";
		});
		
		
		post("/pregledRestoranaMenadzer", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			Menadzer menadzer = menadzerRepository.getObj(mapa.get("korisnickoIme"));
			Restoran restoran = restoranRepository.getObj(menadzer.idRestorana);
			return g.toJson(restoran);
		});
		post("/pretragaRestor", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			HashMap<String, Boolean> mapaBool = g.fromJson(req.body(), HashMap.class);

			String naziv = mapa.get("naziv");
			String tip = mapa.get("tip");
			String lokacija = mapa.get("lokacija");
			String ocena = mapa.get("ocena");
			boolean checkOtvoreno = mapaBool.get("checkOtvoren");

			List<Restoran> restorani = restoranRepository.getAll();

			if (naziv.equals("") && tip.equals("") && lokacija.equals("") && ocena.equals(""))
				restorani = restoranRepository.getAll();
				//return g.toJson(restoranRepository.getAll());
			
			if (!naziv.equals("")) {
				restorani =  restorani.stream().filter(m -> m.naziv.toLowerCase().contains(naziv.toLowerCase()))
						.collect(Collectors.toList());
			}
			if (!tip.equals("")) {
				restorani = restorani.stream().filter(m -> m.tip.toLowerCase().contains(tip.toLowerCase()))
						.collect(Collectors.toList());
			}
			if (!lokacija.equals("")) {
				restorani = restorani.stream().filter(m -> m.lokacija.grad.toLowerCase().contains(lokacija.toLowerCase()))
						.collect(Collectors.toList());
			}
			if (checkOtvoreno) {
				restorani = restorani.stream().filter(m -> m.status == true)
						.collect(Collectors.toList());
			}
			/*if (!ocena.equals("")) {
				restorani = restorani.stream().filter(m -> m.ocena.contains(ocena))
						.collect(Collectors.toList());
			}*/
			

			
			
			

			//res.type("application/json");
			return g.toJson(restorani);
		});
		
	}

	private static StringBuilder IDgenerator() {
		String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		StringBuilder sb = new StringBuilder();
		Random random = new Random();
		for(int i = 0; i < 5; i++) {
		  int index = random.nextInt(alphabet.length());
		  char randomChar = alphabet.charAt(index);
		  sb.append(randomChar);
		}
		return sb;
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
