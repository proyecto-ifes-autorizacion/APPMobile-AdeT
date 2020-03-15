import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionesService {

  constructor(private http: HttpClient) { }
  public consulta : any;

  listarTodasLasAutorizaciones(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json;profile=urn:org.apache.isis/v1',
        'Authorization': 'Basic YWRtaW46YWRtaW4=',
      })
    }
    const URL = 'http://192.168.1.100:8080/restful/services/Autorizacion/actions/listAll/invoke';

    this.consulta = this.http.get<any>(URL, httpOptions);

    return this.consulta;
  }

  obtenerAutorizacionById(autorizacionId: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json;profile=urn:org.apache.isis/v1',
        'Authorization': 'Basic YWRtaW46YWRtaW4=',
      })
    }
    const URL = 'http://192.168.1.100:8080/restful/objects/dominio.Autorizacion/'+autorizacionId;

    this.consulta = this.http.get<any>(URL, httpOptions);

    return this.consulta;
  }

  obtenerSolicitanteEmpresaByURL(solicitanteEmpresaURL: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json;profile=urn:org.apache.isis/v1',
        'Authorization': 'Basic YWRtaW46YWRtaW4=',
      })
    }
    const URL = solicitanteEmpresaURL;

    this.consulta = this.http.get<any>(URL, httpOptions);

    return this.consulta;
  }

  editarMarca(id: String, nuevoValor:String){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json;profile=urn:org.apache.isis/v1',
        'Authorization': 'Basic YWRtaW46YWRtaW4=',
      })
    }
    const URL = 'http://192.168.1.100:8080/restful/objects/dominio.Marca/'+id+'/actions/Update/invoke';

    this.consulta = this.http.post(URL,
      {
        "marca:": {
          "value": nuevoValor
        }
      }, httpOptions);
      console.log("Cambio marca");
    return this.consulta;
  }


}
