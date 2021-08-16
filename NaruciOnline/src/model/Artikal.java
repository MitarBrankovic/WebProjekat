package model;

public class Artikal {
	public String naziv;
	public int cena;
	public TipArtikla tip;
	public Restoran restoran;
	public String kolicina;
	public String opis;
	public String slika;
	
	
	public Artikal(String naziv, int cena, Restoran restoran, String kolicina, String opis, TipArtikla tip) {
		super();
		this.naziv = naziv;
		this.cena = cena;
		this.restoran = restoran;
		this.kolicina = kolicina;
		this.opis = opis;
		this.tip = tip;
	}
	
	public Artikal() {
		
	}
}
