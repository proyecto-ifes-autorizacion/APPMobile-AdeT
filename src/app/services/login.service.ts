import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  Auth64: string;

  constructor(private http: HttpClient) { }

  public consulta : any;
  public IPServidor: String = 'http://192.168.1.100:8080';
  public URLservidor: String;

  realizaLogin(usuario:String, contrasena:String){

    if(window.localStorage.URLservidor){
      this.URLservidor = window.localStorage.URLservidor;
    }else{
      this.URLservidor = this.IPServidor;
    }

    console.log("Va a realizar consulta para Login con la URL: "+this.URLservidor)
    
    this.Auth64 = btoa(usuario+":"+contrasena);
    console.log("usuario:contrasena a Base64: "+this.Auth64);

      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Accept', 'application/json;profile=urn:org.apache.isis/v1');
      headers = headers.append('Authorization', 'Basic '+this.Auth64);

    const URL = this.URLservidor+'/restful/services/Autorizacion/actions/listAll/invoke';

    return this.http.get<any>(URL, {headers: headers})  
 

  } //end obtenerAutorizacionById()



}
