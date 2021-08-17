package io;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.Artikal;
import model.Korisnik;
import model.Restoran;

public class RestoranRepository {
	private ObjectMapper mapper;
	private File file;

	public RestoranRepository() {
		mapper = new ObjectMapper();
		file = new File("data" + File.separator + "Restorani.json");
		if(!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}
	
	public boolean create(Restoran restoran){
		List<Restoran> restorani = getAll();
		if(restorani != null && getObj(restoran.id) == null) {
			restorani.add(restoran);
			return saveAll(restorani);
		}
		return false;
	}
	
	public boolean edit(Restoran restoran) {
		List<Restoran> restorani = getAll();
		if(restorani != null && getObj(restoran.id) != null) {
			ArrayList<Restoran> pomocna = new ArrayList<Restoran>();
			pomocna.addAll(restorani);
			for(Restoran k: pomocna) {
				if(k.id.equals(restoran.id)) {
					k.naziv = restoran.naziv;
					k.lokacija = restoran.lokacija;
					k.slika = restoran.slika;
					k.status = restoran.status;
					k.tip = restoran.tip;
					k.artikli = restoran.artikli;
				}			
			}
			return saveAll(restorani);
		}
		return false;
	}

	public List<Restoran> getAll(){
		try {
			return mapper.convertValue(mapper.readValue(file, List.class), new TypeReference<List<Restoran>>() {});
		} catch (IllegalArgumentException | IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public boolean saveAll(List<Restoran> objs){
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(file, objs);
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		
	}
	
	public Restoran getObj(String id) {
		List<Restoran> restorani = getAll();
		for(Restoran k : restorani) {
			if(k.id.equals(id)) {
				return k;
			}
		}
		return null;
	}
	
	public Restoran getObjViaName(String naziv) {
		List<Restoran> restorani = getAll();
		for(Restoran k : restorani) {
			if(k.naziv.equals(naziv)) {
				return k;
			}
		}
		return null;
	}
	
	public void DodajArtikal(String idRestorana, Artikal artikal) {
		Restoran restoran = getObj(idRestorana);
		restoran.artikli.add(artikal);
		edit(restoran);
	}
}
