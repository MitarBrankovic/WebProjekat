package io;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonIOException;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.Korisnik;

public class Serialization {
	private ObjectMapper mapper;
	private File file;;

	public Serialization() {
		mapper = new ObjectMapper();
		file = new File("data" + File.separator + "Korisnici.json");
		if(!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}
	
	public boolean create(Korisnik korisnik){
		List<Korisnik> korisnici = getAll();
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
	
	public boolean edit(Korisnik stari, Korisnik novi) {
		List<Korisnik> korisnici = getAll();
		if(korisnici != null && getObj(stari.korisnickoIme) != null) {
			ArrayList<Korisnik> pomocna = new ArrayList<Korisnik>();
			pomocna.addAll(korisnici);
			for(Korisnik k: pomocna) {
				if(k.korisnickoIme.equals(stari.korisnickoIme)) {
					korisnici.remove(k);
				}			
			}
			korisnici.add(novi);
			return saveAll(korisnici);
		}
		return false;		
	}

	public List<Korisnik> getAll(){
		try {
			return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<Korisnik>>() {});
		} catch (IllegalArgumentException | IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public boolean saveAll(List<Korisnik> objs){
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, objs);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		
	}
	
	public Korisnik getObj(String id) {
		List<Korisnik> korisnici = getAll();
		for(Korisnik k : korisnici) {
			if(k.korisnickoIme.equals(id)) {
				return k;
			}
		}
		return null;
	}
	
	public boolean LoginValidation(String username, String password) {
		Korisnik korisnik = getObj(username);
		if(korisnik != null) {
			if(korisnik.lozinka.equals(password)) {
				return true;
			}
		}
		return false;
	}
	
}