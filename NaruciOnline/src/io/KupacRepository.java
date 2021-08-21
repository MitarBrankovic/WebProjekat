package io;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.Korisnik;
import model.Kupac;

public class KupacRepository {
	private ObjectMapper mapper;
	private File file;

	public KupacRepository() {
		mapper = new ObjectMapper();
		file = new File("data" + File.separator + "Kupci.json");
		if(!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}
	
	public boolean create(Kupac korisnik){
		List<Kupac> korisnici = getAll();
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
	
	public boolean edit(Kupac kupac) {
		List<Kupac> korisnici = getAll();
		if(korisnici != null && getObj(kupac.korisnickoIme) != null) {
			ArrayList<Kupac> pomocna = new ArrayList<Kupac>();
			pomocna.addAll(korisnici);
			for(Kupac k: pomocna) {
				if(k.korisnickoIme.equals(kupac.korisnickoIme)) {
					k.ime = kupac.ime;
					k.prezime = kupac.prezime;
					k.datumRodjenja = kupac.datumRodjenja;
					k.lozinka = kupac.lozinka;
					k.pol = kupac.pol;
					k.uloga = kupac.uloga;
					k.brojBodova = kupac.brojBodova;
				}			
			}
			return saveAll(korisnici);
		}
		return false;
	}

	public List<Kupac> getAll(){
		try {
			return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<Kupac>>() {});
		} catch (IllegalArgumentException | IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public boolean saveAll(List<Kupac> objs){
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, objs);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		
	}
	
	public Kupac getObj(String id) {
		List<Kupac> korisnici = getAll();
		for(Kupac k : korisnici) {
			if(k.korisnickoIme.equals(id)) {
				return k;
			}
		}
		return null;
	}
	
	public boolean LoginValidation(String username, String password) {
		Kupac korisnik = getObj(username);
		if(korisnik != null) {
			if(korisnik.lozinka.equals(password)) {
				return true;
			}
		}
		return false;
	}
}
