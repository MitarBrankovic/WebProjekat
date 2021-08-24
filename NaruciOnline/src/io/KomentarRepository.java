package io;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.Komentar;
import model.Korisnik;

public class KomentarRepository {
	private ObjectMapper mapper;
	private File file;
	
	public KomentarRepository() {
		mapper = new ObjectMapper();
		file = new File("data" + File.separator + "Komentari.json");
		if(!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}
	
	public boolean create(Komentar komentar){
		List<Komentar> komentari = getAll();
		if(komentari != null) {
			komentari.add(komentar);
			return saveAll(komentari);
		}
		return false;
	}
	
	public boolean saveAll(List<Komentar> objs){
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, objs);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}
	
	public List<Komentar> getAll(){
		try {
			return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<Komentar>>() {});
		} catch (IllegalArgumentException | IOException e) {
			e.printStackTrace();
			return null;
		}
	}
}
