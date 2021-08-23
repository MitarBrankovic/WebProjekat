package io;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.Porudzbina;
import model.ZahtevPorudzbine;

public class ZahtevPorudzbineRepository {
	private ObjectMapper mapper;
	private File file;

	public ZahtevPorudzbineRepository() {
		mapper = new ObjectMapper();
		file = new File("data" + File.separator + "Zahtevi.json");
		if(!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}
	
	public boolean create(ZahtevPorudzbine zahtev){
		List<ZahtevPorudzbine> zahtevi = getAll();
		if(zahtevi != null && getObj(zahtev.id) == null) {
			zahtevi.add(zahtev);
			return saveAll(zahtevi);
		}
		return false;
	}
	
	public boolean edit(ZahtevPorudzbine zahtev) {
		List<ZahtevPorudzbine> zahtevi = getAll();
		if(zahtevi != null && getObj(zahtev.id) != null) {
			ArrayList<ZahtevPorudzbine> pomocna = new ArrayList<ZahtevPorudzbine>();
			pomocna.addAll(zahtevi);
			for(ZahtevPorudzbine z: pomocna) {
				if(z.id.equals(zahtev.id)) {
					z.id = zahtev.id;
					z.menadzerId = zahtev.menadzerId;
					z.dostavljac = zahtev.dostavljac;
					z.porudzbina = zahtev.porudzbina;
				}			
			}
			return saveAll(zahtevi);
		}
		return false;
	}
	

	public List<ZahtevPorudzbine> getAll(){
		try {
			return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<ZahtevPorudzbine>>() {});
		} catch (IllegalArgumentException | IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public boolean saveAll(List<ZahtevPorudzbine> objs){
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, objs);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		
	}
	
	public ZahtevPorudzbine getObj(String id) {
		List<ZahtevPorudzbine> zahtevi = getAll();
		for(ZahtevPorudzbine p : zahtevi) {
			if(p.id.equals(id)) {
				return p;
			}
		}
		return null;
	}
	
	public List<ZahtevPorudzbine> getObjRestorana(String idRestorana) {
		List<ZahtevPorudzbine> zahtevi = getAll();
		List<ZahtevPorudzbine> listaPorudzbina = new ArrayList<ZahtevPorudzbine>();
		for(ZahtevPorudzbine p : zahtevi) {
			if(p.porudzbina.idRestorana.equals(idRestorana)) {
				listaPorudzbina.add(p);
			}
		}
		return listaPorudzbina;
	}
}
