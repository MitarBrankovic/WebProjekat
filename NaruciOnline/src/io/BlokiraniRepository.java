package io;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.Korisnik;

public class BlokiraniRepository {
	private ObjectMapper mapper;
	private File file;

	public BlokiraniRepository() {
		mapper = new ObjectMapper();
		file = new File("data" + File.separator + "Blokirani.json");
		if(!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}
	
	public boolean create(String korisnik){
		List<String> korisnici = getAll();
		if(korisnici != null && getObj(korisnik) == null) {
			korisnici.add(korisnik);
			return saveAll(korisnici);
		}
		return false;
	}


	public List<String> getAll(){
		try {
			return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<String>>() {});
		} catch (IllegalArgumentException | IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public boolean saveAll(List<String> objs){
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, objs);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		
	}
	
	public String getObj(String id) {
		List<String> korisnici = getAll();
		for(String k : korisnici) {
			if(k.equals(id)) {
				return k;
			}
		}
		return null;
	}

}
