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
import model.Artikal;
import model.Dostavljac;
import model.ImeTipaKupca;
import model.Korisnik;
import model.Kupac;
import model.Lokacija;
import model.Menadzer;
import model.Restoran;
import model.TipArtikla;
import model.TipKupca;
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
			System.out.println(mapa);
			Menadzer menadzer = menadzerRepository.getObj(mapa.get("korisnickoIme"));
			Restoran restoran = restoranRepository.getObj(menadzer.idRestorana);
			return g.toJson(restoran);
		});
		
		post("/pregledRestoranaMenadzerAddArtikal", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			System.out.println(mapa);
			Restoran restoran = restoranRepository.getObj(mapa.get("idRestorana"));
			TipArtikla tip;
			if(mapa.get("tip").equals("jelo")) {
				tip = TipArtikla.jelo;
			}else {
				tip = TipArtikla.pice;
			}
			Artikal artikal = new Artikal(mapa.get("naziv"), Integer.parseInt(mapa.get("cena")), restoran,
					mapa.get("kolicina"), mapa.get("opis"), tip);
			restoranRepository.DodajArtikal(restoran.id, artikal);
			return "OK";
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
				
			boolean nazivRast = mapaBool.get("nazivRast");
			boolean nazivOpad = mapaBool.get("nazivOpad");
			boolean lokacRast = mapaBool.get("lokacRast");
			boolean lokacOpad = mapaBool.get("lokacOpad");
			boolean ocenaRast = mapaBool.get("ocenaRast");
			boolean ocenaOpad = mapaBool.get("ocenaOpad");

			if (nazivRast) {
				int n = restorani.size();
				Restoran temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (restorani.get(j - 1).naziv
								.compareTo(restorani.get(j).naziv) > 0) {
							// swap elements
							temp = restorani.get(j - 1);
							restorani.set(j - 1, restorani.get(j));
							restorani.set(j, temp);
						}

					}
				}
			}			
			if (nazivOpad) {
				int n = restorani.size();
				Restoran temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (restorani.get(j - 1).naziv
								.compareTo(restorani.get(j).naziv) < 0) {
							// swap elements
							temp = restorani.get(j - 1);
							restorani.set(j - 1, restorani.get(j));
							restorani.set(j, temp);
						}

					}
				}
			}		
			if (lokacRast) {
				int n = restorani.size();
				Restoran temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (restorani.get(j - 1).lokacija.grad
								.compareTo(restorani.get(j).lokacija.grad) > 0) {
							// swap elements
							temp = restorani.get(j - 1);
							restorani.set(j - 1, restorani.get(j));
							restorani.set(j, temp);
						}

					}
				}
			}			
			if (lokacOpad) {
				int n = restorani.size();
				Restoran temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (restorani.get(j - 1).lokacija.grad
								.compareTo(restorani.get(j).lokacija.grad) < 0) {
							// swap elements
							temp = restorani.get(j - 1);
							restorani.set(j - 1, restorani.get(j));
							restorani.set(j, temp);
						}

					}
				}
			}
			
			//TODO: SORTIRANJE OCENA

			//res.type("application/json");
			return g.toJson(restorani);
		});
		
		
		post("/pretragaKoris", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			HashMap<String, Boolean> mapaBool = g.fromJson(req.body(), HashMap.class);

			String ime = mapa.get("ime");
			String prezime = mapa.get("prezime");
			String korisnickoIme = mapa.get("korisnickoIme");
			String tip = mapa.get("tip");
			String uloga = mapa.get("uloga");

			List<Korisnik> korisnici = korisnikRepository.getAll();

			if (ime.equals("") && prezime.equals("") && korisnickoIme.equals(""))
				korisnici = korisnikRepository.getAll();
				//return g.toJson(restoranRepository.getAll());
			
			if (!ime.equals("")) {
				korisnici =  korisnici.stream().filter(m -> m.ime.toLowerCase().contains(ime.toLowerCase()))
						.collect(Collectors.toList());
			}
			if (!prezime.equals("")) {
				korisnici = korisnici.stream().filter(m -> m.prezime.toLowerCase().contains(prezime.toLowerCase()))
						.collect(Collectors.toList());
			}
			if (!korisnickoIme.equals("")) {
				korisnici = korisnici.stream().filter(m -> m.korisnickoIme.toLowerCase().contains(korisnickoIme.toLowerCase()))
						.collect(Collectors.toList());
			}

			/*if (!ocena.equals("")) {
				restorani = restorani.stream().filter(m -> m.ocena.contains(ocena))
						.collect(Collectors.toList());
			}*/
			
			if (uloga.equals("MENADZER")) {
				korisnici = korisnici.stream().filter(m -> m.uloga.toString().equals("MENADZER"))
						.collect(Collectors.toList());
			}else if(uloga.equals("DOSTAVLJAC")) {
				korisnici = korisnici.stream().filter(m -> m.uloga.toString().equals("DOSTAVLJAC"))
						.collect(Collectors.toList());
			}else if(uloga.equals("KUPAC")) {
				korisnici = korisnici.stream().filter(m -> m.uloga.toString().equals("KUPAC"))
						.collect(Collectors.toList());
			}
			
			List<Kupac> kupci = kupacRepository.getAll();
			List<Kupac> bronzani = new ArrayList<Kupac>();
			List<Kupac> srebrni = new ArrayList<Kupac>();
			List<Kupac> zlatni = new ArrayList<Kupac>();
			for(Kupac k : kupci) {
				if(k.tipKupca.imeTipa == ImeTipaKupca.BRONZANI) {
					bronzani.add(k);				
				}else if(k.tipKupca.imeTipa == ImeTipaKupca.SREBRNI) {
					srebrni.add(k);				
				}else if(k.tipKupca.imeTipa == ImeTipaKupca.ZLATNI) {
					zlatni.add(k);				
				}					
			}			
			if (tip.equals("BRONZANI")) {				
				for(Kupac k : bronzani) {
					korisnici = korisnici.stream().filter(m -> m.korisnickoIme.equals(k.korisnickoIme))
							.collect(Collectors.toList());					
				}
			}else if(tip.equals("SREBRNI")) {
				for(Kupac k : srebrni) {
					korisnici = korisnici.stream().filter(m -> m.korisnickoIme.equals(k.korisnickoIme))
							.collect(Collectors.toList());					
				}
			}else if(tip.equals("ZLATNI")) {
				for(Kupac k : zlatni) {
					korisnici = korisnici.stream().filter(m -> m.korisnickoIme.equals(k.korisnickoIme))
							.collect(Collectors.toList());					
				}
			}
			
			
			
			
			boolean imeRast = mapaBool.get("imeRast");
			boolean imeOpad = mapaBool.get("imeOpad");
			boolean prezimeRast = mapaBool.get("prezimeRast");
			boolean prezimeOpad = mapaBool.get("prezimeOpad");
			boolean korisnickoImeRast = mapaBool.get("korisnickoImeRast");
			boolean korisnickoImeOpad = mapaBool.get("korisnickoImeOpad");

			if (imeRast) {
				int n = korisnici.size();
				Korisnik temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (korisnici.get(j - 1).ime
								.compareTo(korisnici.get(j).ime
										) > 0) {
							// swap elements
							temp = korisnici.get(j - 1);
							korisnici.set(j - 1, korisnici.get(j));
							korisnici.set(j, temp);
						}

					}
				}
			}			
			if (imeOpad) {
				int n = korisnici.size();
				Korisnik temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (korisnici.get(j - 1).ime
								.compareTo(korisnici.get(j).ime) < 0) {
							// swap elements
							temp = korisnici.get(j - 1);
							korisnici.set(j - 1, korisnici.get(j));
							korisnici.set(j, temp);
						}

					}
				}
			}	
			if (prezimeRast) {
				int n = korisnici.size();
				Korisnik temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (korisnici.get(j - 1).prezime
								.compareTo(korisnici.get(j).prezime) > 0) {
							// swap elements
							temp = korisnici.get(j - 1);
							korisnici.set(j - 1, korisnici.get(j));
							korisnici.set(j, temp);
						}

					}
				}
			}			
			if (prezimeOpad) {
				int n = korisnici.size();
				Korisnik temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (korisnici.get(j - 1).prezime
								.compareTo(korisnici.get(j).prezime) < 0) {
							// swap elements
							temp = korisnici.get(j - 1);
							korisnici.set(j - 1, korisnici.get(j));
							korisnici.set(j, temp);
						}

					}
				}
			}	
			if (korisnickoImeRast) {
				int n = korisnici.size();
				Korisnik temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (korisnici.get(j - 1).korisnickoIme
								.compareTo(korisnici.get(j).korisnickoIme) > 0) {
							// swap elements
							temp = korisnici.get(j - 1);
							korisnici.set(j - 1, korisnici.get(j));
							korisnici.set(j, temp);
						}

					}
				}
			}			
			if (korisnickoImeOpad) {
				int n = korisnici.size();
				Korisnik temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (korisnici.get(j - 1).korisnickoIme
								.compareTo(korisnici.get(j).korisnickoIme) < 0) {
							// swap elements
							temp = korisnici.get(j - 1);
							korisnici.set(j - 1, korisnici.get(j));
							korisnici.set(j, temp);
						}

					}
				}
			}

			//TODO: SORTIRANJE BODOVA

			//res.type("application/json");
			return g.toJson(korisnici);
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
