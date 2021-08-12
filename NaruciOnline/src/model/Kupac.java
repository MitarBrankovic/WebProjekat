package model;

public class Kupac extends Korisnik {
	public TipKupca tipKupca;
	public Korpa korpa;
	public Integer brojBodova;
	public String svePorudzbine;
	
	public Kupac() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Kupac(String korisnickoIme, String lozinka, String ime, String prezime, String pol, String datumRodjenja,
			UlogaKorisnika uloga) {
		super(korisnickoIme, lozinka, ime, prezime, pol, datumRodjenja, uloga);
		// TODO Auto-generated constructor stub
		tipKupca = new TipKupca();
		brojBodova = 0;
	}
}
