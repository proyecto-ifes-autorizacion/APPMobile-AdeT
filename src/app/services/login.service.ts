import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  ConversionBase64: string;

  constructor(private http: HttpClient) { }

  public URLservidor: String;
  //Si no encuentra URL en la cookie usara la siguiente URL
  public URLSecundaria: String = 'http://192.168.1.100:8080';

  realizaLogin(usuario:String, contrasena:String){

    if(window.localStorage.URLservidor){
      this.URLservidor = window.localStorage.URLservidor;
    }else{
      
      this.URLservidor = this.URLSecundaria;
    }

    console.log("Va a realizar consulta para Login con la URL: "+this.URLservidor)
    
    this.ConversionBase64 = btoa(usuario+":"+contrasena);
    console.log("usuario:contrasena convertido a Base64: "+this.ConversionBase64);

      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Accept', 'application/json;profile=urn:org.apache.isis/v1');
      headers = headers.append('Authorization', 'Basic '+this.ConversionBase64);

    const URL = this.URLservidor+'/restful/services/Autorizacion/actions/listAll/invoke';

    return this.http.get<any>(URL, {headers: headers})  
 
  } //end obtenerAutorizacionById()



}
