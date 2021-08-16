package model;

import java.util.ArrayList;
import java.util.List;

public class Restoran {
	public String naziv;
	public String tip; //mozda enum
	public List<Artikal> artikli;
	public boolean status; // da li radi ili ne
	public Lokacija lokacija;
	public String slika;
	public Menadzer menadzer;
	public String id;
	

	public Restoran() {}
	
	public Restoran(String naziv, String tip, boolean status, Lokacija lokacija, String slika,
			Menadzer menadzer, String id) {
		super();
		this.naziv = naziv;
		this.tip = tip;
		this.status = status;
		this.lokacija = lokacija;
		this.slika = slika;
		this.menadzer = menadzer;
		this.id = id;
		this.artikli = new ArrayList<Artikal>();
	}



	public Restoran(String naziv, String tip, boolean status, String slika, String id) {
		super();
		this.naziv = naziv;
		this.tip = tip;
		this.status = status;
		this.slika = slika;
		this.id = id;
		this.artikli = new ArrayList<Artikal>();
	}
	
}
