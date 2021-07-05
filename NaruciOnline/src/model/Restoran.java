package model;

public class Restoran {
	public String naziv;
	public String Tip; //mozda enum
	public Artikal artikal;
	public boolean status; // da li radi ili ne
	public Lokacija lokacija;
	public String slika;
	
	
	public Restoran(String naziv, String tip, Artikal artikal, boolean status, Lokacija lokacija) {
		super();
		this.naziv = naziv;
		Tip = tip;
		this.artikal = artikal;
		this.status = status;
		this.lokacija = lokacija;
	}
	
}
