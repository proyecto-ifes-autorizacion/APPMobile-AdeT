import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AutorizacionesService } from '../services/autorizaciones.service';

@Component({
  selector: 'app-tab1-detalles',
  templateUrl: './tab1-detalles.page.html',
  styleUrls: ['./tab1-detalles.page.scss'],
})
export class Tab1DetallesPage implements OnInit {

  constructor(
    private autorizacionService: AutorizacionesService,
    private activatedRoute: ActivatedRoute) { }

    public contenidoObtenido : any;
    public solicitanteEmpresa: String;
    public solicitanteTrabajador: String;
    public solicitanteVehiculo: String;
    public empresasEjecutantes: any;
    public empresasEjecutantesLargo: any;
    public trabajadoresEjecutantes: any;
    public trabajadoresEjecutantesLargo :any;
    public vehiculosEjecutantes: any;
    public vehiculosEjecutantesLargo: any;
    public permiteBtnLiberar: boolean;
    
  ngOnInit() {
    
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const recipeId = paramMap.get('autorizacionId')
      console.log("id recibida: "+ recipeId);

      // this.contenidoObtenido = this.autorizacionService.obtenerAutorizacionById(''+recipeId+'');
      // console.log(this.contenidoObtenido);

      this.contenidoObtenido = this.autorizacionService.obtenerAutorizacionById(recipeId).subscribe(
        contenidoObtenido => {
          this.contenidoObtenido = contenidoObtenido;

          console.log(contenidoObtenido);
          if(!contenidoObtenido.titulo){
            this.contenidoObtenido.titulo = "Sin titulo";
          }

          if(!contenidoObtenido.descripcion){
            this.contenidoObtenido.descripcion = "Sin descripcion";
          }

          if(!contenidoObtenido.ubicacion){
            this.contenidoObtenido.ubicacion = "Sin ubicacion";
          }

          if (contenidoObtenido.hasOwnProperty("solicitanteEmpresa")){
            console.log("Tiene SolicitanteEmpresa");
            console.log("la empresa del solicitante es: "+contenidoObtenido.solicitanteEmpresa.title)
            this.solicitanteEmpresa = contenidoObtenido.solicitanteEmpresa.title;
          }else{
            console.log("No tiene SolicitanteEmpresa");
            this.solicitanteEmpresa = 'No tiene';
          }
          
          if (contenidoObtenido.hasOwnProperty("solicitanteTrabajador")){
            console.log("Tiene solicitanteTrabajador");
            console.log("el nombre del solicitante es: "+contenidoObtenido.solicitanteTrabajador.title)
            this.solicitanteTrabajador = contenidoObtenido.solicitanteTrabajador.title
          }else{
            console.log("No tiene solicitanteTrabajador");
            this.solicitanteTrabajador = 'No tiene';
          }

          if (contenidoObtenido.hasOwnProperty("solicitanteVehiculo")){
            console.log("Tiene solicitanteVehiculo");
            console.log("el vehiculo del solicitante es: "+contenidoObtenido.solicitanteVehiculo.title)
            this.solicitanteVehiculo = contenidoObtenido.solicitanteVehiculo.title
          }else{
            console.log("No tiene solicitanteVehiculo");
            this.solicitanteVehiculo = 'No tiene';
          }
                    
          this.empresasEjecutantes = contenidoObtenido.ejecutantes;
          this.empresasEjecutantesLargo = this.empresasEjecutantes.length;
          console.log(this.empresasEjecutantes);

          this.trabajadoresEjecutantes = contenidoObtenido.ejecutanteTrabajadores;
          this.trabajadoresEjecutantesLargo = this.trabajadoresEjecutantes.length;
          console.log(this.trabajadoresEjecutantes);

          this.vehiculosEjecutantes = contenidoObtenido.ejecutanteVehiculos;
          this.vehiculosEjecutantesLargo = this.vehiculosEjecutantes.length;
          console.log(this.vehiculosEjecutantes);


          if(
            this.contenidoObtenido.titulo != "Sin titulo" &&
            this.contenidoObtenido.descripcion != "Sin descripcion" &&
            this.contenidoObtenido.ubicacion != "Sin ubicacion" &&
            this.solicitanteEmpresa != 'No tiene' &&
            this.solicitanteTrabajador != 'No tiene' &&
            //this.solicitanteVehiculo = null ES OPCIONAL EL VEHICULO
            this.empresasEjecutantesLargo != 0 &&
            this.trabajadoresEjecutantesLargo != 0
            // this.vehiculosEjecutantesLargo != 0 ES OPCIONAL LOS VEHICULOS
            ){
          console.log("Permite el boton Liberar")
          this.permiteBtnLiberar = true;
          }else{
            console.log("No se muestra el boton Liberar")
            this.permiteBtnLiberar = false;
          }
        },
        (error: any) => {
            console.log("Error al GET:"+ error.message);
            //alert("Error al GET:"+ error.message + "status: "+error.status+ "statusText: "+error.statusText+"headers: "+error.headers);
        }
      );

    });

    
  }



}
