package model;

import java.time.LocalDate;

public class Korisnik {
	public String korisnickoIme;
	public String lozinka;
	public String ime;
	public String prezime;
	public String pol;
	public LocalDate datumRodjenja;
	public enum Uloga{Administrator, Menadzer, Dostavljac, Kupac};
	public String svePorudzbine; //kupac
	public Korpa korpa;	//kupac
	public Restoran restoran; //menadzer
	public String dostava; //dostavljac
	public int brojBodova; //kupac
	public TipKupca tip;
	
	
	public Korisnik(String korisnickoIme, String lozinka, String ime, String prezime, String pol,
			LocalDate datumRodjenja, String svePorudzbine, Korpa korpa, Restoran restoran, String dostava,
			int brojBodova, TipKupca tip) {
		super();
		this.korisnickoIme = korisnickoIme;
		this.lozinka = lozinka;
		this.ime = ime;
		this.prezime = prezime;
		this.pol = pol;
		this.datumRodjenja = datumRodjenja;
		this.svePorudzbine = svePorudzbine;
		this.korpa = korpa;
		this.restoran = restoran;
		this.dostava = dostava;
		this.brojBodova = brojBodova;
		this.tip = tip;
	}
	
	
}
