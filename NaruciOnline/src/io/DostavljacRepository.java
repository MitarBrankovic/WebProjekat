package io;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.Dostavljac;
import model.Korisnik;
import model.Kupac;

public class DostavljacRepository {
	private ObjectMapper mapper;
	private File file;

	public DostavljacRepository() {
		mapper = new ObjectMapper();
		file = new File("data" + File.separator + "Dostavljaci.json");
		if(!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}
	
	public boolean create(Dostavljac korisnik){
		List<Dostavljac> korisnici = getAll();
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
	
	public boolean edit(Dostavljac stari, Dostavljac novi) {
		List<Dostavljac> korisnici = getAll();
		if(korisnici != null && getObj(stari.korisnickoIme) != null) {
			ArrayList<Dostavljac> pomocna = new ArrayList<Dostavljac>();
			pomocna.addAll(korisnici);
			for(Dostavljac k: pomocna) {
				if(k.korisnickoIme.equals(stari.korisnickoIme)) {
					korisnici.remove(k);
				}			
			}
			korisnici.add(novi);
			return saveAll(korisnici);
		}
		return false;
	}

	public List<Dostavljac> getAll(){
		try {
			return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<Dostavljac>>() {});
		} catch (IllegalArgumentException | IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public boolean saveAll(List<Dostavljac> objs){
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, objs);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		
	}
	
	public Dostavljac getObj(String id) {
		List<Dostavljac> korisnici = getAll();
		for(Dostavljac k : korisnici) {
			if(k.korisnickoIme.equals(id)) {
				return k;
			}
		}
		return null;
	}
	
	public boolean LoginValidation(String username, String password) {
		Dostavljac korisnik = getObj(username);
		if(korisnik != null) {
			if(korisnik.lozinka.equals(password)) {
				return true;
			}
		}
		return false;
	}
}
