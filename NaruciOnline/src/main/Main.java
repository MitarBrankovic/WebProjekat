package main;

import static spark.Spark.*;
import static spark.Spark.port;

import java.io.File;
import java.io.IOException;

public class Main {
	public static void main(String[] args) throws IOException{
		port(8080);
		
		staticFiles.externalLocation(new File("./resource").getCanonicalPath());
        after((req,res) -> res.type("application/json"));
		
		get("/test", (req, res) -> {
			return "Works";
		});
//		get("/naruciOnline", (req, res) -> {
//			return true;
//		});
	}
}
