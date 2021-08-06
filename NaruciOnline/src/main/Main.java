package main;

import static spark.Spark.*;
import static spark.Spark.port;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.google.gson.Gson;

import model.Korisnik;

public class Main {
	public static void main(String[] args) throws IOException{
		port(8080);
		
		Gson g = new Gson();
		
		staticFiles.externalLocation(new File("./resource").getCanonicalPath());
        after((req,res) -> res.type("application/json"));
		
		get("/test", (req, res) -> {
			return "Works";
		});
//		get("/naruciOnline", (req, res) -> {
//			return true;
//		});
		
		post("/register", (req, res) -> {
			HashMap<String, String> mapa = g.fromJson(req.body(), HashMap.class);
			
			String ime = mapa.get("ime");
			String prezime = mapa.get("prezime");
			String pol = mapa.get("pol");
			String datumRodjenja = mapa.get("datumRodjenja");
			String korisnickoIme = mapa.get("korisnickoIme");
			String lozinka = mapa.get("lozinka");
			
			//printMap(mapa);
			
			Korisnik korisnik = new Korisnik(korisnickoIme, lozinka, ime, prezime, 
					pol, null, null, null, null, null, 0, null);
			res.status(200);
			return "OK";
		});
		
		
	}
	
	// Sluzi za ispisiavnje hashmape - nebitno
	public static void printMap(Map mp) {
	    Iterator it = mp.entrySet().iterator();
	    while (it.hasNext()) {
	        Map.Entry pair = (Map.Entry)it.next();
	        System.out.println(pair.getKey() + " = " + pair.getValue());
	        it.remove(); // avoids a ConcurrentModificationException
	    }
	}
}
