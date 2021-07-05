package model;

import java.time.LocalDate;
import java.util.List;

public class Porudzbina {
	public String id;
	public List<Artikal> artikli;
	public Restoran restoran;
	public LocalDate datum; // treba i vreme
	public double cena;
	public String kupac; //ime i prezime
	public enum status{Obrada, UPripremi, UTransportu, Dostavljena, Otkazana};
	
	
	public Porudzbina(String id, List<Artikal> artikli, Restoran restoran, LocalDate datum, double cena, String kupac) {
		super();
		this.id = id;
		this.artikli = artikli;
		this.restoran = restoran;
		this.datum = datum;
		this.cena = cena;
		this.kupac = kupac;
	};
}
