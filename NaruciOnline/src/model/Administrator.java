package model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Administrator extends Korisnik {
	
	public Administrator(String korisnickoIme, String lozinka, String ime, String prezime, String pol, LocalDate datumRodjenja) {
		super(korisnickoIme, lozinka, ime, prezime, pol, datumRodjenja);
	}

	public static Korisnik parseString(String line) {
		String tokeni[] = line.split(",");
		String korisnickoIme = tokeni[0];
		String lozinka = tokeni[1];
		String ime = tokeni[2];
		String prezime = tokeni[3];
		String pol = tokeni[4];
		String datumRodjenja = tokeni[5];
		DateTimeFormatter formatiran = DateTimeFormatter.ofPattern(" dd.MM.yyyy.");
		

		Administrator a = new Administrator(korisnickoIme, lozinka, ime, prezime, pol, LocalDate.parse(datumRodjenja, formatiran));
		return a;
	}

	public static String toFileString(Administrator k) {
		
		 return k.korisnickoIme + "," + k.lozinka + "," + k.ime + "," + k.prezime + "," + k.pol + "," + k.datumRodjenja;
	
	}

}
