package model;

public class Artikal {
	public String naziv;
	public int cena;
	public enum Tip{jelo, pice};
	public Restoran restoran;
	public int kolicina;
	public String opis;
	public String slika;
	
	
	public Artikal(String naziv, int cena, Restoran restoran, int kolicina, String opis) {
		super();
		this.naziv = naziv;
		this.cena = cena;
		this.restoran = restoran;
		this.kolicina = kolicina;
		this.opis = opis;
	}
}
