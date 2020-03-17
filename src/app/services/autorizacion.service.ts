import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {
  

  constructor(private http: HttpClient) { }

  public consulta : any;
  public fecha: any;

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
  } //end listarTodasLasAutorizaciones()

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
  } //end obtenerAutorizacionById()

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
  } //end obtenerSolicitanteEmpresaByURL()



  cerrarAutorizacion(id: any, fecha: any){
    console.log("entro aca con el id: "+id)
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json;profile=urn:org.apache.isis/v1',
        'Authorization': 'Basic YWRtaW46YWRtaW4=',
      })
    }
    const URL = 'http://192.168.1.100:8080/restful/objects/dominio.Autorizacion/'+id+'/actions/Cerrar/invoke'
    //const URL = 'http://192.168.1.100:8080/restful/objects/dominio.Marca/'+id+'/actions/Update/invoke';
    //this.fecha = 'peug';
    //this.fecha = '2020-03-16T23:20:00.00Z';
    

    this.consulta = this.http.post(URL,
      {
        "cierre:": {
          "value": fecha
        }
      }, httpOptions);
      console.log("Cerro la autorizacion con fecha: '"+this.fecha+"'");
    console.log(this.consulta);
    //return alert("cerrada")
    return this.consulta;
    console.log("fin de cerrar")
  }

} //end class
