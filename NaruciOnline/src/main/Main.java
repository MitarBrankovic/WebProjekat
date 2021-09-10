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
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;
import com.google.gson.Gson;

import io.BlokiraniRepository;
import io.DostavljacRepository;
import io.KomentarRepository;
import io.KupacRepository;
import io.MenadzerRepository;
import io.OtkazivanjeRepository;
import io.PorudzbinaRepository;
import io.RestoranRepository;
import io.ZahtevPorudzbineRepository;
import io.KorisnikRepository;
import model.Artikal;
import model.Dostavljac;
import model.ImeTipaKupca;
import model.Komentar;
import model.Korisnik;
import model.Kupac;
import model.Lokacija;
import model.Menadzer;
import model.OtkazivanjePorudzbine;
import model.Porudzbina;
import model.Restoran;
import model.StatusPorudzbine;
import model.TipArtikla;
import model.TipKupca;
import model.UlogaKorisnika;
import model.ZahtevPorudzbine;

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
		PorudzbinaRepository porudzbinaRepository = new PorudzbinaRepository();
		ZahtevPorudzbineRepository zahtevPorudzbineRepository = new ZahtevPorudzbineRepository();
		BlokiraniRepository blokiraniRepository = new BlokiraniRepository();
		KomentarRepository komentarRepository = new KomentarRepository();
		OtkazivanjeRepository otkazivanjeRepository = new OtkazivanjeRepository();

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
		
		post("/editRestoran", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			HashMap<String, Double> mapaDouble = g.fromJson(req.body(), HashMap.class);
			HashMap<String, Boolean> mapaBoolean = g.fromJson(req.body(), HashMap.class);
			HashMap<String, Integer> mapaInteger = g.fromJson(req.body(), HashMap.class);



			Restoran restoran = restoranRepository.getObj(mapa.get("idRestorana"));
			
			restoran.tip = mapa.get("tip");
			restoran.status = mapaBoolean.get("status");
			restoran.lokacija.geoSirina = mapaDouble.get("geoSirina");
			restoran.lokacija.geoDuzina = mapaDouble.get("geoDuzina");
			restoran.lokacija.grad = mapa.get("grad");
			restoran.lokacija.ulica = mapa.get("ulica");
			restoran.lokacija.broj = mapa.get("broj");
			restoran.lokacija.postanskiBroj = mapaDouble.get("postanskiBroj").intValue();
			restoran.slika = mapa.get("slika");
			
			restoranRepository.edit(restoran);

			return "OK";
		});
		
		post("/izbrisiArtikal", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			restoranRepository.izbrisiArtikal(mapa.get("naziv"), mapa.get("idRestorana"));

			return "OK";
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
		
		post("/izmenaArtikla", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			HashMap<String, Double> mapaDouble = g.fromJson(req.body(), HashMap.class);

			TipArtikla tip = null;
			if(mapa.get("tip").equals("jelo")) {
				tip = TipArtikla.jelo;
			}else if(mapa.get("tip").equals("pice")) {
				tip = TipArtikla.pice;
			}
			
			//Artikal artikal = new Artikal(mapa.get("naziv"), mapaDouble.get("cena").intValue(), 
			Artikal artikal = new Artikal(mapa.get("naziv"), Integer.parseInt(mapa.get("cena")), 
					mapa.get("idRestorana"), mapa.get("kolicina"), mapa.get("opis"), tip, mapa.get("slika"));
			restoranRepository.izmeniArtikal(artikal);
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
		
		get("/pregledKupaca", (req, res) -> {
			return g.toJson(kupacRepository.getAll());
		});
		
		get("/pregledPorudzbina", (req, res) -> {
			return g.toJson(porudzbinaRepository.getAll());
		});
		
		get("/pregledMenadzera", (req, res) -> {
			return g.toJson(menadzerRepository.vratiSlobodne());
		});
		
		get("/pregledDostavljaca", (req, res) -> {
			return g.toJson(dostavljacRepository.getAll());
		});
		
		get("/pregledRestorana", (req, res) -> {
			return g.toJson(restoranRepository.getAll());
		});
		
		get("/pregledZahteva", (req, res) -> {
			return g.toJson(zahtevPorudzbineRepository.getAll());
		});
		
		get("/pregledBlokiranih", (req, res) -> {
			return g.toJson(blokiraniRepository.getAll());
		});
		
		get("/pregledOtkazanihPorudzbina", (req, res) -> {
			return g.toJson(otkazivanjeRepository.getAll());
		});
		
		get("/pregledZahtevaRestorana/:id", (req,res)->{
			String id = req.params(":id");
			return g.toJson(zahtevPorudzbineRepository.getObjRestorana(id));
		});
		
		get("/ocenaRestorana/:id", (req,res)->{
			String id = req.params(":id");
			return komentarRepository.getOcenaRestorana(id);
		});
		
		get("/sviKomentari", (req,res)->{
			List<Komentar> komentari = komentarRepository.getAllOdobreni();
			return g.toJson(komentari);
		});
		
		get("/bukvalnoSviKomentari", (req,res)->{
			List<Komentar> komentari = komentarRepository.getAll();
			return g.toJson(komentari);
		});
		
		get("/sviKomentariRestorana/:korisnickoIme", (req,res)->{
			String korisnickoIme = req.params("korisnickoIme");
			return g.toJson(komentarRepository.getSviKomentariRestorana((menadzerRepository.getObj(korisnickoIme)).idRestorana));
		});
		
		post("/ocenaKorisnika", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			StringBuilder sb = IDgenerator();
		    String generisanID = sb.toString();
			Komentar komentar = new Komentar(generisanID, mapa.get("idKorisnika"), mapa.get("idRestorana"),
					mapa.get("idPorudzbine"), mapa.get("kom"),Integer.parseInt(mapa.get("oce")));
			komentarRepository.create(komentar);
			return "OK";
		});
		
		get("/ZahteviZaKomentare/:id", (req,res)->{
			String idRestorana = req.params(":id");
			return g.toJson(komentarRepository.getNeodobreniKomentariZaRestoran(idRestorana));
		});
		
		post("/odobriKomentar", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			//HashMap<String, Double> mapaDouble = g.fromJson(req.body(), HashMap.class);

			/*Komentar komentar = new Komentar(mapa.get("idKomentara"), mapa.get("idKorisnika"),
					mapa.get("idRestorana"), mapa.get("idPorudzbine"), mapa.get("tekst"), mapaDouble.get("ocena").intValue());*/
			komentarRepository.OdobravanjeKomentara(mapa.get("idKomentara"));
			return g.toJson(komentarRepository.getNeodobreniKomentariZaRestoran(mapa.get("idRestorana")));
		});
		
		post("/odbijKomentar", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			//HashMap<String, Double> mapaDouble = g.fromJson(req.body(), HashMap.class);

			/*Komentar komentar = new Komentar(mapa.get("idKomentara"), mapa.get("idKorisnika"),
					mapa.get("idRestorana"), mapa.get("idPorudzbine"), mapa.get("tekst"), mapaDouble.get("ocena").intValue());*/
			komentarRepository.OdbijanjeKomentara(mapa.get("idKomentara"));
			return g.toJson(komentarRepository.getNeodobreniKomentariZaRestoran(mapa.get("idRestorana")));
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
			Restoran restoran;
			if(menadzer.idRestorana != null) {
				restoran = restoranRepository.getObj(menadzer.idRestorana);
			}else {
				restoran = null;
			}
			return g.toJson(restoran);
		});
		
		post("/restoran/add/artikal", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			Restoran restoran = restoranRepository.getObj(mapa.get("idRestorana"));
			TipArtikla tip;
			if(mapa.get("tip").equals("jelo")) {
				tip = TipArtikla.jelo;
			}else {
				tip = TipArtikla.pice;
			}
			Artikal artikal = new Artikal(mapa.get("naziv"), Integer.parseInt(mapa.get("cena")), mapa.get("idRestorana"),
					mapa.get("kolicina"), mapa.get("opis"), tip, mapa.get("slika"));
			restoranRepository.DodajArtikal(restoran.id, artikal);
			return artikal;
		});
		
		get("/restoran/:naziv", (req,res)->{
			String naziv = req.params(":naziv");
			return "OK";
		});
		
		get("/recenzije/:naziv", (req,res)->{
			String naziv = req.params(":naziv");
			return "OK";
		});
		
		get("/recenzije/get/:naziv", (req,res)->{
			String nazivRestorana = req.params(":naziv");
			Restoran restoran = restoranRepository.getObjViaName(nazivRestorana);
			return g.toJson(komentarRepository.getOdobreniKomentariZaRestoran(restoran.id));
		});
		
		get("/restoran/get/:naziv", (req,res)->{
			String nazivRestorana = req.params(":naziv");
			Restoran restoran = restoranRepository.getObjViaName(nazivRestorana);
			return g.toJson(restoran);
		});
		
		get("/getTipoveRestorana", (req,res)->{
			List<String> tipovi = new ArrayList<String>();
			for(Restoran r: restoranRepository.getAll()) {
				if(!tipovi.contains(r.tip.toString())) {
					tipovi.add(r.tip.toString().toLowerCase());
				}
			}
			
			return g.toJson(tipovi);
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

				
			boolean nazivRast = mapaBool.get("nazivRast");
			boolean nazivOpad = mapaBool.get("nazivOpad");
			boolean lokacRast = mapaBool.get("lokacRast");
			boolean lokacOpad = mapaBool.get("lokacOpad");
			boolean ocenaRast = mapaBool.get("ocenaRast");
			boolean ocenaOpad = mapaBool.get("ocenaOpad");

			
			if(ocenaRast) {
				Collections.sort(restorani, new Comparator<Restoran>() {
				    @Override
					public int compare(Restoran o1, Restoran o2) {
				        return komentarRepository.getOcenaRestorana(o1.id).compareTo(komentarRepository.getOcenaRestorana(o2.id));
				    }
				});
			}
			
			
			if(ocenaOpad) {
				Collections.sort(restorani, new Comparator<Restoran>() {
				    @Override
					public int compare(Restoran o1, Restoran o2) {
				        return komentarRepository.getOcenaRestorana(o1.id).compareTo(komentarRepository.getOcenaRestorana(o2.id));
				    }
				});
				Collections.reverse(restorani);
			}
			
			for(Restoran r: restorani) {
				System.out.println(r.id);
			}
			
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
			
			List<Restoran> tmpRestorani = new ArrayList<Restoran>();
			switch(mapa.get("ocena")) {
				case "3":
					for(Restoran r: restorani) {
						if(komentarRepository.getOcenaRestorana(r.id) > 3 || komentarRepository.getOcenaRestorana(r.id) == 0) {
							tmpRestorani.add(r);
						}
					}
					break;
				case "4":
					for(Restoran r: restorani) {
						if(komentarRepository.getOcenaRestorana(r.id) > 4 || komentarRepository.getOcenaRestorana(r.id) == 0) {
							tmpRestorani.add(r);
						}
					}
					break;

				case "4.5":
					for(Restoran r: restorani) {
						if(komentarRepository.getOcenaRestorana(r.id) >= 4.5 || komentarRepository.getOcenaRestorana(r.id) == 0) {
							tmpRestorani.add(r);
						}
					}
					break;
				default:
					tmpRestorani = restorani;
			}
			restorani = tmpRestorani;
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
			List<Kupac> kupci2 = kupacRepository.getAll();
			List<Kupac> sortiraniKupci = new ArrayList<Kupac>();
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
			boolean bodoviRast = mapaBool.get("bodoviRast");
			boolean bodoviOpad = mapaBool.get("bodoviOpad");

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
			
			if (bodoviRast) {
				int n = kupci2.size();
				Kupac temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (kupci2.get(j - 1).brojBodova < kupci2.get(j).brojBodova) {
							// swap elements
							temp = kupci2.get(j - 1);
							kupci2.set(j - 1, kupci2.get(j));
							kupci2.set(j, temp);
						}
					}
				}
				List<Korisnik> sortirani = new ArrayList<Korisnik>();
				for(Kupac k : kupci2) {
					for(Korisnik kor : korisnici) {
						if(k.korisnickoIme.equals(kor.korisnickoIme)) {
							sortirani.add(kor);
						}
					}				
				}
				korisnici = sortirani;
			}			
			if (bodoviOpad) {
				int n = kupci2.size();
				Kupac temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (kupci2.get(j - 1).brojBodova > kupci2.get(j).brojBodova) {
							// swap elements
							temp = kupci2.get(j - 1);
							kupci2.set(j - 1, kupci2.get(j));
							kupci2.set(j, temp);
						}
					}
				}
				List<Korisnik> sortirani = new ArrayList<Korisnik>();
				for(Kupac k : kupci2) {
					for(Korisnik kor : korisnici) {
						if(k.korisnickoIme.equals(kor.korisnickoIme)) {
							sortirani.add(kor);
						}
					}				
				}
				korisnici = sortirani;
			}
			
			return g.toJson(korisnici);
		});
		
		post("/potvrdiPorudzbinu", (req, res) -> {
			HashMap<String, Double> mapa = g.fromJson(req.body(), HashMap.class);
			HashMap<String, String> mapa3 = g.fromJson(req.body(), HashMap.class);
			HashMap<ArrayList<String>, ArrayList<String>> mapa4 = g.fromJson(req.body(), HashMap.class);
			
			List<String> naziviArtikala = mapa4.get("artikli");						
			List<Artikal> artikli = new ArrayList<Artikal>();
			List<Restoran> sviRestorani = restoranRepository.getAll();
			for(Restoran r: sviRestorani) {
				for(Artikal a: r.artikli) {
					for(String s : naziviArtikala) {
						if(a.naziv.equals(s)) {
							artikli.add(a);
						}
					}				
				}			
			}
			String idRestorana = null;
			for(Artikal a: artikli) {
				idRestorana = a.idRestorana;
				break;
			}

			StringBuilder sb = IDgeneratorPorudzbine();
		    String generisanID = sb.toString();	
		    Kupac kupac = kupacRepository.getObj(mapa3.get("korisnickoIme"));
			Porudzbina porudzbina = new Porudzbina(generisanID, artikli, idRestorana, LocalDateTime.now(),
				mapa.get("cena") * (100 - kupac.tipKupca.popust)/100, mapa3.get("korisnickoIme"), StatusPorudzbine.Obrada);		
			kupac.brojBodova +=  Math.round((mapa.get("cena")/1000*133) * 100.0) / 100.0 ;
			kupac.brojBodova = Math.round((kupac.brojBodova) * 100.0) / 100.0;
			kupacRepository.edit(kupac);
			
			if(!porudzbinaRepository.create(porudzbina)) {
				res.status(400);
				return "Greska";
			}
			res.status(200);
			return "OK";
		});
		
		
		post("/izObradeUPripremu", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			
			String sifraPorudzbine = mapa.get("sifraPorudzbine");
			Porudzbina porudzbina = porudzbinaRepository.getObj(sifraPorudzbine);
			porudzbina.status = StatusPorudzbine.UPripremi;

			if(!porudzbinaRepository.edit(porudzbina)) {
				res.status(400);
				return "Greska";
			}

			res.status(200);
			return "OK";
		});
		
		post("/izPripremeUCekaDostavljaca", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			
			String sifraPorudzbine = mapa.get("sifraPorudzbine");
			Porudzbina porudzbina = porudzbinaRepository.getObj(sifraPorudzbine);
			porudzbina.status = StatusPorudzbine.CekaDostavljaca;

			if(!porudzbinaRepository.edit(porudzbina)) {
				res.status(400);
				return "Greska";
			}

			res.status(200);
			return "OK";
		});
		
		
		post("/otkaziPorudzbinu", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			
			String sifraPorudzbine = mapa.get("sifraPorudzbine");
			Porudzbina porudzbina = porudzbinaRepository.getObj(sifraPorudzbine);
			List<Porudzbina> porudzbine = porudzbinaRepository.getAll();
			Kupac kupac = kupacRepository.getObj(porudzbina.korisnickoImeKupca);		
			kupac.brojBodova -= Math.round((porudzbina.cena/1000 * 133 * 4) * 100.0) / 100.0;
			kupac.brojBodova = Math.round((kupac.brojBodova) * 100.0) / 100.0;
			if(kupac.brojBodova < 0) {
				kupac.brojBodova = 0;
			}
			kupacRepository.edit(kupac);
			OtkazivanjePorudzbine otkazivanje = new OtkazivanjePorudzbine(porudzbina.korisnickoImeKupca, porudzbina.id, LocalDateTime.now());
			otkazivanjeRepository.create(otkazivanje);
			LocalDateTime ovajMesec = LocalDateTime.now().minusMonths(1);
			List<OtkazivanjePorudzbine> otkazivanja = otkazivanjeRepository.getAll();
			List<OtkazivanjePorudzbine> otkazivanja2 = new ArrayList<OtkazivanjePorudzbine>();
			for(OtkazivanjePorudzbine z: otkazivanja) {
				otkazivanja2.add(z);
			}
			for (OtkazivanjePorudzbine o : otkazivanja) {
				if(o.datumOtkazivanja.isBefore(ovajMesec)) {
					otkazivanja2.remove(o);
				}
				
			}
			otkazivanjeRepository.saveAll(otkazivanja2);
			
			for(Porudzbina p : porudzbine) {
				if(p.id.equals(porudzbina.id)) {
					p.status=StatusPorudzbine.Otkazana;
					break;
				}			
			}
			
			if(!porudzbinaRepository.saveAll(porudzbine)) {
				res.status(400);
				return "Greska";
			}

			res.status(200);
			return "OK";
		});
		
		post("/zahtevIzCekaDostavljacaUTransport", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			
			String sifraPorudzbine = mapa.get("sifraPorudzbine");
			String korisnickoIme = mapa.get("korisnickoIme");
			Porudzbina porudzbina = porudzbinaRepository.getObj(sifraPorudzbine);
			Dostavljac dostavljac = dostavljacRepository.getObj(korisnickoIme);

			StringBuilder sb = IDgenerator();
		    String generisanID = sb.toString();
		    Restoran restoran = restoranRepository.getObj(porudzbina.idRestorana);
		    String menadzerId = restoran.menadzer.korisnickoIme;
			ZahtevPorudzbine zahtev = new ZahtevPorudzbine(generisanID, menadzerId, dostavljac, porudzbina);

			if(!zahtevPorudzbineRepository.create(zahtev)) {
				res.status(400);
				return "Greska";
			}

			res.status(200);
			return "OK";
		});
		
		
		post("/izCekaDostavljacaUTransport", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			
			String sifraPorudzbine = mapa.get("sifraPorudzbine");
			Porudzbina porudzbina = porudzbinaRepository.getObj(sifraPorudzbine);
			porudzbina.status = StatusPorudzbine.UTransportu;

			String dostavljacId = mapa.get("dostavljac");
			Dostavljac dostavljac = dostavljacRepository.getObj(dostavljacId);
			dostavljac.porudzbineZaDostavu.add(porudzbina);
			dostavljacRepository.edit(dostavljac);
			
			List<ZahtevPorudzbine> zahtevi = zahtevPorudzbineRepository.getAll();
			List<ZahtevPorudzbine> zahtevi2 = new ArrayList<ZahtevPorudzbine>();
			for(ZahtevPorudzbine z: zahtevi) {
				zahtevi2.add(z);
			}
			for(ZahtevPorudzbine z: zahtevi) {
				if(z.porudzbina.id.equals(porudzbina.id)) {
					zahtevi2.remove(z);
				}
			}
			zahtevPorudzbineRepository.saveAll(zahtevi2);
			
			if(!porudzbinaRepository.edit(porudzbina)) {
				res.status(400);
				return "Greska";
			}

			res.status(200);
			return "OK";
		});
		
		post("/odbijZahtev", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			
			String sifraZahteva = mapa.get("sifraZahteva");
			List<ZahtevPorudzbine> zahtevi = zahtevPorudzbineRepository.getAll();
			List<ZahtevPorudzbine> zahtevi2 = new ArrayList<ZahtevPorudzbine>();
			for(ZahtevPorudzbine z: zahtevi) {
				zahtevi2.add(z);
			}
			for(ZahtevPorudzbine z: zahtevi) {
				if(z.id.equals(sifraZahteva)) {
					zahtevi2.remove(z);
				}
			}
			
			if(!zahtevPorudzbineRepository.saveAll(zahtevi2)) {
				res.status(400);
				return "Greska";
			}

			res.status(200);
			return "OK";
		});
		
		
		post("/izTransportUDostavljena", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			Porudzbina porudzbina = porudzbinaRepository.getObj(mapa.get("sifraPorudzbine"));
			porudzbina.status = StatusPorudzbine.Dostavljena;	
			Dostavljac dostavljac = dostavljacRepository.getObj(mapa.get("korisnickoIme"));
			for(Porudzbina p : dostavljac.porudzbineZaDostavu) {
				if(p.id.equals(porudzbina.id)) {
					dostavljac.porudzbineZaDostavu.remove(p);
					dostavljac.porudzbineZaDostavu.add(porudzbina);
				}
			}
			dostavljacRepository.edit(dostavljac);		
			if(!porudzbinaRepository.edit(porudzbina)) {
				res.status(400);
				return "Greska";
			}

			res.status(200);
			return "OK";
		});
		
		
		post("/blokirajKorisnika", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);			
			String korisnickoIme = mapa.get("korisnickoIme");			
			if(!blokiraniRepository.create(korisnickoIme)) {
				res.status(400);
				return "Greska";
			}

			res.status(200);
			return "OK";
		});
		
		
		post("/pretragaPorudzbina", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			HashMap<String, Boolean> mapaBool = g.fromJson(req.body(), HashMap.class);
			
			boolean checkNedostavljene = mapaBool.get("checkNedostavljene");
			String tipRestorana = mapa.get("tipRestorana");
			String nazivRestorana = mapa.get("naziv");
			String cenaOd = mapa.get("cenaOd");
			String cenaDo = mapa.get("cenaDo");
			String datumOd = mapa.get("datumOd");
			String datumDo = mapa.get("datumDo");
			String status = mapa.get("status");
			DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy-MM-dd");


			List<Porudzbina> porudzbine = porudzbinaRepository.getAll();
			List<Restoran> restorani = restoranRepository.getAll();
			List<Restoran> restorani2 = restoranRepository.getAll();
			List<Restoran> pomocna = new ArrayList<Restoran>();

			if (nazivRestorana.equals("") && cenaOd.equals("") && cenaDo.equals("") && datumOd.equals("") && datumDo.equals("") && tipRestorana.equals(""))
				porudzbine = porudzbinaRepository.getAll();
			
			if (!nazivRestorana.equals("")) {
				for(Restoran r: restorani) {
					if(r.naziv.toLowerCase().contains(nazivRestorana)) {
						pomocna.add(r);
					}
				}
				for(Restoran r: pomocna) {
					porudzbine =  porudzbine.stream().filter(m -> m.idRestorana.equals(r.id))
							.collect(Collectors.toList());
				}

			}
			if (!cenaOd.equals("")) {
				porudzbine = porudzbine.stream().filter(m -> (m.cena > Double.parseDouble(cenaOd)))
						.collect(Collectors.toList());
			}
			if (!cenaDo.equals("")) {
				porudzbine = porudzbine.stream().filter(m -> (m.cena < Double.parseDouble(cenaDo)))
						.collect(Collectors.toList());
			}
			if (!datumOd.equals("")) {
				porudzbine = porudzbine.stream().filter(m -> (m.datum.isAfter(LocalDate.parse(datumOd, df).atStartOfDay())))
						.collect(Collectors.toList());
			}
			if (!datumDo.equals("")) {
				porudzbine = porudzbine.stream().filter(m -> (m.datum.isBefore(LocalDate.parse(datumDo, df).atStartOfDay())))
						.collect(Collectors.toList());
			}
			if (checkNedostavljene) {
				porudzbine = porudzbine.stream().filter(m -> ((m.status == StatusPorudzbine.UPripremi) || (m.status == StatusPorudzbine.CekaDostavljaca)
						|| (m.status == StatusPorudzbine.Obrada) || (m.status == StatusPorudzbine.UTransportu)))
						.collect(Collectors.toList());
			}
			
			if (!tipRestorana.equals("")) {
				for(Restoran r: restorani) {
					if(r.tip.equals(tipRestorana)) {
						pomocna.add(r);
					}
				}
				for(Restoran r: pomocna) {
					porudzbine =  porudzbine.stream().filter(m -> m.idRestorana.equals(r.id))
							.collect(Collectors.toList());
				}
			}
			
			
			
			List<Porudzbina> obrada = new ArrayList<Porudzbina>();
			List<Porudzbina> uPripremi	 = new ArrayList<Porudzbina>();
			List<Porudzbina> cekaDostavljaca = new ArrayList<Porudzbina>();
			List<Porudzbina> uTransportu = new ArrayList<Porudzbina>();
			List<Porudzbina> dostavljena = new ArrayList<Porudzbina>();
			List<Porudzbina> otkazana = new ArrayList<Porudzbina>();
			for(Porudzbina p : porudzbine) {
				if(p.status == StatusPorudzbine.Obrada) {
					obrada.add(p);				
				}else if(p.status  == StatusPorudzbine.UPripremi) {
					uPripremi.add(p);								
				}else if(p.status  == StatusPorudzbine.CekaDostavljaca) {
					cekaDostavljaca.add(p);								
				}else if(p.status  == StatusPorudzbine.UTransportu) {
					uTransportu.add(p);								
				}else if(p.status  == StatusPorudzbine.Dostavljena) {
					dostavljena.add(p);								
				}else if(p.status  == StatusPorudzbine.Otkazana) {
					otkazana.add(p);								
				};												
			}
				
							
			if (status.equals("Obrada")) {				
				for(Porudzbina k : obrada) {
					porudzbine = porudzbine.stream().filter(m -> m.id.equals(k.id))
							.collect(Collectors.toList());					
				}
			}else if(status.equals("UPripremi")) {
				for(Porudzbina k : uPripremi) {
					porudzbine = porudzbine.stream().filter(m -> m.id.equals(k.id))
							.collect(Collectors.toList());					
				}
			}else if(status.equals("CekaDostavljaca")) {
				for(Porudzbina k : cekaDostavljaca) {
					porudzbine = porudzbine.stream().filter(m -> m.id.equals(k.id))
							.collect(Collectors.toList());					
				}
			}else if(status.equals("UTransportu")) {
				for(Porudzbina k : uTransportu) {
					porudzbine = porudzbine.stream().filter(m -> m.id.equals(k.id))
							.collect(Collectors.toList());					
				}
			}else if(status.equals("Dostavljena")) {
				for(Porudzbina k : dostavljena) {
					porudzbine = porudzbine.stream().filter(m -> m.id.equals(k.id))
							.collect(Collectors.toList());					
				}
			}else if(status.equals("Otkazana")) {
				for(Porudzbina k : otkazana) {
					porudzbine = porudzbine.stream().filter(m -> m.id.equals(k.id))
							.collect(Collectors.toList());					
				}
			}
			
				
			boolean nazivRast = mapaBool.get("nazivRast");
			boolean nazivOpad = mapaBool.get("nazivOpad");
			boolean cenaRast = mapaBool.get("cenaRast");
			boolean cenaOpad = mapaBool.get("cenaOpad");
			boolean datumRast = mapaBool.get("datumRast");
			boolean datumOpad = mapaBool.get("datumOpad");

			if (nazivRast) {
				int n = restorani2.size();
				Restoran temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (restorani2.get(j - 1).naziv
								.compareTo(restorani2.get(j).naziv) > 0) {
							// swap elements
							temp = restorani2.get(j - 1);
							restorani2.set(j - 1, restorani2.get(j));
							restorani2.set(j, temp);
						}
					}
				}
				List<Porudzbina> sortirane = new ArrayList<Porudzbina>();
				for(Restoran r : restorani2) {
					for(Porudzbina p: porudzbine) {
						if(p.idRestorana.equals(r.id)) {
							sortirane.add(p);
						}
					}
				}
				porudzbine = sortirane;
			}			
			if (nazivOpad) {
				int n = restorani2.size();
				Restoran temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (restorani2.get(j - 1).naziv
								.compareTo(restorani2.get(j).naziv) < 0) {
							// swap elements
							temp = restorani2.get(j - 1);
							restorani2.set(j - 1, restorani2.get(j));
							restorani2.set(j, temp);
						}
					}
				}
				List<Porudzbina> sortirane = new ArrayList<Porudzbina>();
				for(Restoran r : restorani2) {
					for(Porudzbina p: porudzbine) {
						if(p.idRestorana.equals(r.id)) {
							sortirane.add(p);
						}
					}
				}
				porudzbine = sortirane;
			}
			if (cenaRast) {
				int n = porudzbine.size();
				Porudzbina temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (porudzbine.get(j - 1).cena > porudzbine.get(j).cena) {
							// swap elements
							temp = porudzbine.get(j - 1);
							porudzbine.set(j - 1, porudzbine.get(j));
							porudzbine.set(j, temp);
						}

					}
				}
			}			
			if (cenaOpad) {
				int n = porudzbine.size();
				Porudzbina temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (porudzbine.get(j - 1).cena < porudzbine.get(j).cena) {
							// swap elements
							temp = porudzbine.get(j - 1);
							porudzbine.set(j - 1, porudzbine.get(j));
							porudzbine.set(j, temp);
						}

					}
				}
			}
			if (datumRast) {
				int n = porudzbine.size();
				Porudzbina temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (porudzbine.get(j - 1).datum.isAfter(porudzbine.get(j).datum)) {
							// swap elements
							temp = porudzbine.get(j - 1);
							porudzbine.set(j - 1, porudzbine.get(j));
							porudzbine.set(j, temp);
						}

					}
				}
			}
			if (datumOpad) {
				int n = porudzbine.size();
				Porudzbina temp = null;
				for (int i = 0; i < n; i++) {
					for (int j = 1; j < (n - i); j++) {
						if (porudzbine.get(j - 1).datum.isBefore(porudzbine.get(j).datum)) {
							// swap elements
							temp = porudzbine.get(j - 1);
							porudzbine.set(j - 1, porudzbine.get(j));
							porudzbine.set(j, temp);
						}

					}
				}
			}
			return g.toJson(porudzbine);
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
	
	private static StringBuilder IDgeneratorPorudzbine() {
		String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		StringBuilder sb = new StringBuilder();
		Random random = new Random();
		for(int i = 0; i < 10; i++) {
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
