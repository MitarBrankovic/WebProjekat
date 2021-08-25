package io;

import java.io.File;
import java.io.IOException;
import java.util.List;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import model.OtkazivanjePorudzbine;

public class OtkazivanjeRepository {
	private ObjectMapper mapper;
	private File file;

	public OtkazivanjeRepository() {
		mapper = new ObjectMapper();
		file = new File("data" + File.separator + "OtkazivanjePorudzbine.json");
		if(!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}
	
	public boolean create(OtkazivanjePorudzbine o){
		List<OtkazivanjePorudzbine> oktazivanja = getAll();
		if(oktazivanja != null && getObj(o.sifraPorudzbine) == null) {
			oktazivanja.add(o);
			return saveAll(oktazivanja);
		}
		return false;
	}


	public List<OtkazivanjePorudzbine> getAll(){
		try {
			return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<OtkazivanjePorudzbine>>() {});
		} catch (IllegalArgumentException | IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public boolean saveAll(List<OtkazivanjePorudzbine> objs){
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, objs);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		
	}
	
	public OtkazivanjePorudzbine getObj(String id) {
		List<OtkazivanjePorudzbine> otkazivanja = getAll();
		for(OtkazivanjePorudzbine k : otkazivanja) {
			if(k.sifraPorudzbine.equals(id)) {
				return k;
			}
		}
		return null;
	}
}
