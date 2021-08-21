package io;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.Porudzbina;

public class PorudzbinaRepository {
	private ObjectMapper mapper;
	private File file;

	public PorudzbinaRepository() {
		mapper = new ObjectMapper();
		file = new File("data" + File.separator + "Porudzbine.json");
		if(!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}
	
	public boolean create(Porudzbina Porudzbina){
		List<Porudzbina> porudzbine = getAll();
		if(porudzbine != null && getObj(Porudzbina.id) == null) {
			porudzbine.add(Porudzbina);
			return saveAll(porudzbine);
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
	

	public List<Porudzbina> getAll(){
		try {
			return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<Porudzbina>>() {});
		} catch (IllegalArgumentException | IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public boolean saveAll(List<Porudzbina> objs){
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, objs);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		
	}
	
	public Porudzbina getObj(String id) {
		List<Porudzbina> porudzbine = getAll();
		for(Porudzbina p : porudzbine) {
			if(p.id.equals(id)) {
				return p;
			}
		}
		return null;
	}

}
