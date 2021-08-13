package model;

public class Lokacija {
	public double geoDuzina;
	public double geoSirina;
	public String grad;
	public String ulica;
	public String broj;
	public Integer postanskiBroj;
	
	
	public Lokacija(double geoDuzina, double geoSirina, String grad, String ulica, String broj, Integer postanskiBroj) {
		super();
		this.geoDuzina = geoDuzina;
		this.geoSirina = geoSirina;
		this.grad = grad;
		this.ulica = ulica;
		this.broj = broj;
		this.postanskiBroj = postanskiBroj;
	}
	
	public Lokacija() {
		
	}
}
