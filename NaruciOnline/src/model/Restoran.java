package model;

public class Restoran {
	public String naziv;
	public String tip; //mozda enum
	public Artikal artikal;
	public boolean status; // da li radi ili ne
	public Lokacija lokacija;
	public String slika;
	public Menadzer menadzer;
	public String id;
	

	public Restoran() {}
	
	public Restoran(String naziv, String tip, Artikal artikal, boolean status, Lokacija lokacija, String slika,
			Menadzer menadzer, String id) {
		super();
		this.naziv = naziv;
		this.tip = tip;
		this.artikal = artikal;
		this.status = status;
		this.lokacija = lokacija;
		this.slika = slika;
		this.menadzer = menadzer;
		this.id = id;
	}



	public Restoran(String naziv, String tip, boolean status, String slika, String id) {
		super();
		this.naziv = naziv;
		this.tip = tip;
		this.status = status;
		this.slika = slika;
		this.id = id;
	}
	
}
