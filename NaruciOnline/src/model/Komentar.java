package model;

public class Komentar {
	public String idKomentara;
	public String idKorisnika; // treba kupac, tjt vljd
	public String idRestorana;
	public String idPorudzbine;
	public String tekst;
	public int ocena;
	public StatusKomentara status;
	
	
	public Komentar(String idKomentara, String idKorisnika, String idRestorana, String idPorudzbine, String tekst, int ocena) {
		super();
		this.idKomentara = idKomentara;
		this.idKorisnika = idKorisnika;
		this.idRestorana = idRestorana;
		this.idPorudzbine = idPorudzbine;
		this.tekst = tekst;
		this.ocena = ocena;
		this.status = StatusKomentara.naCekanju;
	}
	
	public Komentar() {
		
	}
}
