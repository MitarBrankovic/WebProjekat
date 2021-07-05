package model;

public class Lokacija {
	public double geoDuzina;
	public double geoSirina;
	public String adresa;
	
	
	public Lokacija(double geoDuzina, double geoSirina, String adresa) {
		super();
		this.geoDuzina = geoDuzina;
		this.geoSirina = geoSirina;
		this.adresa = adresa;
	}
}
