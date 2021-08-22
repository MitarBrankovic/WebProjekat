package model;

public class ZahtevPorudzbine {
	public String id;
	public String menadzerId;
	public Dostavljac dostavljac;
	public Porudzbina porudzbina;
	
	public ZahtevPorudzbine() {}

	public ZahtevPorudzbine(String id, String menadzerId, Dostavljac dostavljac, Porudzbina porudzbina) {
		super();
		this.id = id;
		this.menadzerId = menadzerId;
		this.dostavljac = dostavljac;
		this.porudzbina = porudzbina;
	}
	
	
	

}
