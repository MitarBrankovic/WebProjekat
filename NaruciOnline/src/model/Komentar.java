package model;

public class Komentar {
	public Korisnik korisnik; // treba kupac, tjt vljd
	public Restoran restoran;
	public String tekst;
	public int ocena;
	
	
	public Komentar(Korisnik korisnik, Restoran restoran, String tekst, int ocena) {
		super();
		this.korisnik = korisnik;
		this.restoran = restoran;
		this.tekst = tekst;
		this.ocena = ocena;
	}
}
