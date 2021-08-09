package io;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonIOException;
import com.fasterxml.jackson.core.JsonGenerationException;
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
	
	public void create(Korisnik korisnik) throws JsonGenerationException, JsonMappingException, IOException {
		/*List<Korisnik> admins = getAll();
		if(admins != null && getObj(korisnik.korisnickoIme) == null) {
			admins.add(korisnik);
			return saveAll(admins);
		}
		return false;*/
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, korisnik);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}


	/*public boolean saveAll(List<Korisnik> objs){
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, objs);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		
	}
	
	public List<Korisnik> getAll() {
		try {
			return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<Korisnik>>() {});
		} catch (IllegalArgumentException | IOException e) {
			e.printStackTrace();
			return null;
		}
		
	}*/
	
	
}