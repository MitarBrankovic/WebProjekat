package model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

public class Porudzbina {
	public String id;
	public List<Artikal> artikli;
	public String idRestorana;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
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
