package model;

public class Menadzer extends Korisnik{
	public Restoran restoran;
	
	public Menadzer() {}

	public Menadzer(String korisnickoIme, String lozinka, String ime, String prezime, String pol, String datumRodjenja,
			UlogaKorisnika uloga) {
		super(korisnickoIme, lozinka, ime, prezime, pol, datumRodjenja, uloga);
		// TODO Auto-generated constructor stub
	}

	public Menadzer(String korisnickoIme, String lozinka, String ime, String prezime, String pol,
			String datumRodjenja) {
		super(korisnickoIme, lozinka, ime, prezime, pol, datumRodjenja);
		// TODO Auto-generated constructor stub
	}
}
