package model;

import java.time.LocalDate;

public class Korisnik {
	public String korisnickoIme;
	public String lozinka;
	public String ime;
	public String prezime;
	public String pol;
	public String datumRodjenja;
	public String uloga;
	//public enum Uloga{Administrator, Menadzer, Dostavljac, Kupac};
	
	
	public Korisnik(String korisnickoIme, String lozinka, String ime, String prezime, String pol,
			String datumRodjenja, String uloga) {
		super();
		this.korisnickoIme = korisnickoIme;
		this.lozinka = lozinka;
		this.ime = ime;
		this.prezime = prezime;
		this.pol = pol;
		this.datumRodjenja = datumRodjenja;
		this.uloga = uloga;
	}
	
	public Korisnik(String korisnickoIme, String lozinka, String ime, String prezime, String pol,
			String datumRodjenja) {
		super();
		this.korisnickoIme = korisnickoIme;
		this.lozinka = lozinka;
		this.ime = ime;
		this.prezime = prezime;
		this.pol = pol;
		this.datumRodjenja = datumRodjenja;
	}



	public Korisnik() {
		super();
	}
	
	
}
