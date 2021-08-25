package model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

public class OtkazivanjePorudzbine {
	public String kupacId;
	public String sifraPorudzbine;
	@JsonFormat(pattern = "dd.MM.yyyy. HH:mm:ss")
	@JsonDeserialize(using = LocalDateTimeDeserializer.class)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	public LocalDateTime datumOtkazivanja;
	
	
	public OtkazivanjePorudzbine() {}


	public OtkazivanjePorudzbine(String kupacId, String sifraPorudzbine, LocalDateTime datumOtkazivanja) {
		super();
		this.kupacId = kupacId;
		this.sifraPorudzbine = sifraPorudzbine;
		this.datumOtkazivanja = datumOtkazivanja;
	}
	
	
}
