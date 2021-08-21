package model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Porudzbina {
	public String id;
	public List<Artikal> artikli;
	public String idRestorana;
	public LocalDateTime datum; // treba i vreme
	public double cena;
	public String korisnickoImeKupca; //ime i prezime
	public StatusPorudzbine status;
	
	
	public Porudzbina() {}
	
	public Porudzbina(String id, List<Artikal> artikli, String idRestorana, LocalDateTime datum, double cena,
			String korisnickoImeKupca, StatusPorudzbine status) {
		super();
		this.id = id;
		this.artikli = new ArrayList<Artikal>();
		this.idRestorana = idRestorana;
		this.datum = datum;
		this.cena = cena;
		this.korisnickoImeKupca = korisnickoImeKupca;
		this.artikli = artikli;
		this.status = status;
	};
}
