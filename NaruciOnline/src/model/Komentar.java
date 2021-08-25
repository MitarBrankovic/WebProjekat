package model;

public class Komentar {
	public String idKomentara;
	public String idKorisnika; // treba kupac, tjt vljd
	public String idRestorana;
	public String tekst;
	public int ocena;
	public boolean odobren;
	
	
	public Komentar(String idKomentara, String idKorisnika, String idRestorana, String tekst, int ocena) {
		super();
		this.idKomentara = idKomentara;
		this.idKorisnika = idKorisnika;
		this.idRestorana = idRestorana;
		this.tekst = tekst;
		this.ocena = ocena;
		this.odobren = false;
	}
	
	public Komentar() {
		
	}
}
