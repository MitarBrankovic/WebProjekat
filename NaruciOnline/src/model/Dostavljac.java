package model;

import java.util.ArrayList;

public class Dostavljac extends Korisnik {
	public ArrayList<Porudzbina> porudzbineZaDostavu;
	
	public Dostavljac() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Dostavljac(String korisnickoIme, String lozinka, String ime, String prezime, String pol,
			String datumRodjenja, String uloga) {
		super(korisnickoIme, lozinka, ime, prezime, pol, datumRodjenja, uloga);
		// TODO Auto-generated constructor stub
	}

	public Dostavljac(String korisnickoIme, String lozinka, String ime, String prezime, String pol,
			String datumRodjenja) {
		super(korisnickoIme, lozinka, ime, prezime, pol, datumRodjenja);
		// TODO Auto-generated constructor stub
	}
}
