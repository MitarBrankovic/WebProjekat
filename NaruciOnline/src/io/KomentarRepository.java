package io;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.Komentar;
import model.Korisnik;
import model.StatusKomentara;

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
	
	public List<Komentar> getAllOdobreni(){
		List<Komentar> komentari = getAll();
		List<Komentar> odobreni = new ArrayList<Komentar>();
		for(Komentar k: komentari) {
			if(k.status == StatusKomentara.odobren) {
				odobreni.add(k);
			}
		}
		return odobreni;
	}
	
	public List<Komentar> getNeodobreniKomentariZaRestoran(String idRestorana){
		List<Komentar> lista = getAll();
		List<Komentar> listaNeodobrenihKomentara = new ArrayList<Komentar>();
		for(Komentar k: lista) {
			if(k.idRestorana.equals(idRestorana) && k.status == StatusKomentara.naCekanju) {
				listaNeodobrenihKomentara.add(k);
			}
		}
		return listaNeodobrenihKomentara;
	}
	
	public List<Komentar> getOdobreniKomentariZaRestoran(String idRestorana){
		List<Komentar> lista = getAll();
		List<Komentar> listaNeodobrenihKomentara = new ArrayList<Komentar>();
		for(Komentar k: lista) {
			if(k.idRestorana.equals(idRestorana) && k.status == StatusKomentara.odobren) {
				listaNeodobrenihKomentara.add(k);
			}
		}
		return listaNeodobrenihKomentara;
	}
	
	/*public boolean edit(Komentar komentar) {
		List<Komentar> komentari = getAll();
		if(komentari != null) {
			for(Komentar k: komentari) {
				if(k.idKomentara.equals(komentar.idKomentara)) {
					k.odobren = komentar.odobren;
				}			
			}
			return saveAll(komentari);
		}
		return false;
	}*/
	
	public void OdbijanjeKomentara(String id) {
		List<Komentar> komentari = getAll();
		for(Komentar k: komentari) {
			if(k.idKomentara.equals(id)) {
				k.status = StatusKomentara.odbijen;
				saveAll(komentari);
				return;
			}
		}
	}
	
	public void OdobravanjeKomentara(String id) {
		List<Komentar> komentari = getAll();
		for(Komentar k: komentari) {
			if(k.idKomentara.equals(id)) {
				k.status = StatusKomentara.odobren;
				saveAll(komentari);
				return;
			}
		}
	}
	
	public List<Komentar> getSviKomentariRestorana(String id){
		List<Komentar> komentari = getAll();
		List<Komentar> getKomentari = new ArrayList<Komentar>();
		for(Komentar k: komentari) {
			if(k.idRestorana.equals(id)) {
				getKomentari.add(k);
			}
		}
		return getKomentari;
	}
	
	/*public boolean OdobravanjeOdbijanjeKomentara(Komentar komentar) {
		List<Komentar> komentari = getAll();
		if(komentari != null) {
			for(Komentar k: komentari) {
				if(k.idKomentara.equals(komentar.idKomentara)) {
					if(k.odobren != komentar.odobren) {
						k.odobren = komentar.odobren;
						return saveAll(komentari);
					}else {
						komentari.remove(k);
						return saveAll(komentari);
					}
				}			
			}
		}
		return false;
	}*/
	
	public Double getOcenaRestorana(String id) {
		Double ocena = 0.0;
		int count = 0;
		List<Komentar> komentari = getAll();
		for(Komentar k: komentari) {
			if(k.idRestorana.equals(id) && k.status == StatusKomentara.odobren) {
				count++;
				ocena = (ocena + k.ocena)/count;
			}
		}
		return ocena;
	}
}
