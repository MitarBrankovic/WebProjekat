package io;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.Korisnik;
import model.Kupac;
import model.Menadzer;

public class MenadzerRepository {
	private ObjectMapper mapper;
	private File file;

	public MenadzerRepository() {
		mapper = new ObjectMapper();
		file = new File("data" + File.separator + "Menadzeri.json");
		if(!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}
	
	public boolean create(Menadzer korisnik){
		List<Menadzer> korisnici = getAll();
		if(korisnici != null && getObj(korisnik.korisnickoIme) == null) {
			korisnici.add(korisnik);
			return saveAll(korisnici);
		}
		return false;
		
//		try {
//			mapper.writerWithDefaultPrettyPrinter().writeValue(file, korisnici);
//			return true;
//		} catch (IOException e) {
//			e.printStackTrace();
//			return false;
//		}
	}
	
	public boolean edit(Menadzer menadzer) {
		List<Menadzer> korisnici = getAll();
		if(korisnici != null && getObj(menadzer.korisnickoIme) != null) {
			ArrayList<Menadzer> pomocna = new ArrayList<Menadzer>();
			pomocna.addAll(korisnici);
			for(Menadzer k: pomocna) {
				if(k.korisnickoIme.equals(menadzer.korisnickoIme)) {
					k.ime = menadzer.ime;
					k.prezime = menadzer.prezime;
					k.datumRodjenja = menadzer.datumRodjenja;
					k.lozinka = menadzer.lozinka;
					k.pol = menadzer.pol;
					k.idRestorana = menadzer.idRestorana;
				}			
			}
			return saveAll(korisnici);
		}
		return false;
	}

	public List<Menadzer> getAll(){
		try {
			return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<Menadzer>>() {});
		} catch (IllegalArgumentException | IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	public List<Menadzer> vratiSlobodne(){
		try {
			List<Menadzer> korisnici = getAll();
			List<Menadzer> menadzeri = new ArrayList<Menadzer>();
			for(Menadzer k : korisnici) {
				if(k.idRestorana == null || k.idRestorana == "") {
					menadzeri.add(k);
				}
			}
			return menadzeri;
			//return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<Menadzer>>() {});
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	
	public boolean saveAll(List<Menadzer> objs){
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, objs);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		
	}
	
	public Menadzer getObj(String id) {
		List<Menadzer> korisnici = getAll();
		for(Menadzer k : korisnici) {
			if(k.korisnickoIme.equals(id)) {
				return k;
			}
		}
		return null;
	}
	
	public boolean LoginValidation(String username, String password) {
		Menadzer korisnik = getObj(username);
		if(korisnik != null) {
			if(korisnik.lozinka.equals(password)) {
				return true;
			}
		}
		return false;
	}
}
