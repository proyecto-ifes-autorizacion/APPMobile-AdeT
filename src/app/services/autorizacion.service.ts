import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {
  resultado: any;
  array1: string[];
  dataObtenida: any;
  dataFromCallUno: any;
  constructor(private http: HttpClient, public navCtrl: NavController,) { }

  public consulta : any;
  //public id: any;
  public fecha: any;
  public motivo: String;
  public URLSecundaria: String = 'http://192.168.1.100:8080';
  public URLservidor: String;
  public autenticacion: String;

  obtieneServidorConfigurado(){
    if(window.localStorage.URLservidor){
      //this.URLservidor = window.localStorage.URLservidor;
      return window.localStorage.URLservidor
    }else{
      //this.URLservidor = this.URLSecundaria;
      return this.URLSecundaria
    }
  }

  obtieneAuteticacionUsuario(){
    if(window.localStorage.autenticacion){
      //this.URLservidor = window.localStorage.URLservidor;
      return window.localStorage.autenticacion
    }else{
      //this.URLservidor = this.URLSecundaria;
      return this.navCtrl.navigateRoot('/autorizacion-lista');
    }
  }
  
  listarTodasLasAutorizaciones(){

    this.URLservidor = this.obtieneServidorConfigurado();

    this.autenticacion = this.obtieneAuteticacionUsuario();

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json;profile=urn:org.apache.isis/v1',
        'Authorization': 'Basic '+this.autenticacion+'',
      })
    }
    const URL = this.URLservidor+'/restful/services/Autorizacion/actions/listAll/invoke';

    this.consulta = this.http.get<any>(URL, httpOptions);

    return this.consulta;
  } //end listarTodasLasAutorizaciones()



  obtenerAutorizacionById(autorizacionId: string){

    this.URLservidor = this.obtieneServidorConfigurado();

    this.autenticacion = this.obtieneAuteticacionUsuario();

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json;profile=urn:org.apache.isis/v1',
        'Authorization': 'Basic '+this.autenticacion+'',
      })
    }
    const URL = this.URLservidor+'/restful/objects/dominio.Autorizacion/'+autorizacionId;

    this.consulta = this.http.get<any>(URL, httpOptions);
    //console.log("El resultado de la consulta es:")
    //console.log(this.consulta)
    return this.consulta;
  } //end obtenerAutorizacionById()



  obtenerEjecutante(ejecutanteId: void){

    this.URLservidor = this.obtieneServidorConfigurado();

    this.autenticacion = this.obtieneAuteticacionUsuario();

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json;profile=urn:org.apache.isis/v1',
        'Authorization': 'Basic '+this.autenticacion+'',
      })
    }

    const URL = this.URLservidor+'/restful/objects/dominio.Ejecutante/'+ejecutanteId;

  return this.http.get<any>(URL, httpOptions);
  }//end obtenerEjecutante()
  


  cerrarAutorizacion(id: any, fecha: any){
    console.log("entro aca con el id: "+id)

    this.URLservidor = this.obtieneServidorConfigurado();

    this.autenticacion = this.obtieneAuteticacionUsuario();

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json;profile=urn:org.apache.isis/v1',
        'Authorization': 'Basic '+this.autenticacion+'',
      })
    }
    const URL = this.URLservidor+'/restful/objects/dominio.Autorizacion/'+id+'/actions/Cerrar/invoke'

    this.consulta = this.http.post(URL,
      {
        "cierre:": {
          "value": fecha
        }
      }, httpOptions);
      console.log("Cerro la autorizacion ("+id+") con fecha: '"+fecha+"'");
    console.log(this.consulta);
    //return alert("cerrada")
    return this.consulta;
    console.log("fin de cerrar")
  }//end cerrarAutorizacion()



  cancelarAutorizacion(id: any, fecha: any, motivo:String){
    //console.log("Cancelara con el id: "+id+" motivo: "+motivo+" fecha: "+fecha)

    this.URLservidor = this.obtieneServidorConfigurado();

    this.autenticacion = this.obtieneAuteticacionUsuario();
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json;profile=urn:org.apache.isis/v1',
        'Authorization': 'Basic '+this.autenticacion+'',
      })
    }
    const URL = this.URLservidor+'/restful/objects/dominio.Autorizacion/'+id+'/actions/Cancelar/invoke'

    this.consulta = this.http.post(URL,
      {
        "cierre:": {
          "value": fecha
        },
        "motivoCancelacion:": {
          "value": motivo
        }
      }, httpOptions);
      console.log("Cancelada la autorizacion ("+id+") con fecha: '"+fecha+"' y motivo: '"+motivo+"'");
    console.log(this.consulta);
    //return alert("cerrada")
    return this.consulta;
    console.log("fin de Cancelar")
  }//end cerrarAutorizacion()

} //end class
