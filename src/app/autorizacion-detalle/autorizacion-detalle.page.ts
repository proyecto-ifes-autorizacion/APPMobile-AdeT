import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AutorizacionService } from '../services/autorizacion.service';
import { FormsModule } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-autorizacion-detalle',
  templateUrl: './autorizacion-detalle.page.html',
  styleUrls: ['./autorizacion-detalle.page.scss'],
})
export class AutorizacionDetallePage implements OnInit {
  consulta: any;
  fecha: any;

  constructor(private autorizacionService: AutorizacionService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private formsModule: FormsModule,
    public alertController: AlertController,
    public navCtrl: NavController) { }

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
    public permiteBtnCerrar: boolean;
    public recipeId: any;
    public FechaHoraPersonalizada: any;


  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const recipeId = paramMap.get('autorizacionId')
      console.log("id recibida por URL: "+ recipeId);

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
          console.log("Empresas ejecutantes: "+this.empresasEjecutantes);

          this.trabajadoresEjecutantes = contenidoObtenido.ejecutanteTrabajadores;
          this.trabajadoresEjecutantesLargo = this.trabajadoresEjecutantes.length;
          console.log("trabajadoresEjecutantes: "+this.trabajadoresEjecutantes);

          this.vehiculosEjecutantes = contenidoObtenido.ejecutanteVehiculos;
          this.vehiculosEjecutantesLargo = this.vehiculosEjecutantes.length;
          console.log("vehiculosEjecutantes: "+this.vehiculosEjecutantes);


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
          console.log("Permite usar los botones Cerrar/Cancelar")
          this.permiteBtnCerrar = true;
          }else{
            console.log("No permite usar los botonesCerrar/Cancelar")
            this.permiteBtnCerrar = false;
          }
        },
        (error: any) => {
            console.log("Error al GET:"+ error.message + "status: "+error.status+ "statusText: "+error.statusText+"headers: "+error.headers);
        }
      );

    });

  }//end ngOnInit()

  volveraInicio(){
    this.navCtrl.navigateRoot('/autorizacion-lista');
  }//end volveraInicio()


  fechaCambiada(){
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const recipeId = paramMap.get('autorizacionId')
      let {FechaHoraPersonalizada} = this
      console.log("La fecha traida: "+FechaHoraPersonalizada)
    this.cerrarAutorizacion(recipeId, FechaHoraPersonalizada)
    })

    this.presentAlert().then(()=>{
      this.navCtrl.navigateRoot('/autorizacion-lista');
    });
  }//end fechaCambiada()

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Informacion',
      message: 'La autorizacion fue cerrada con la fecha seleccionada.',
      buttons: ['Aceptar'],
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }


  
  cerrarAutorizacion(id: any, fecha: any) {
    console.log("Se recibio id: "+id +" y fecha: "+fecha)
  
    this.autorizacionService.cerrarAutorizacion(id, fecha)
    .subscribe(
      contenidoObtenido => {
        console.log(contenidoObtenido)
    });
  } //end cerrarAutorizacion()

  cancelarAutorizacion(){
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const recipeId = paramMap.get('autorizacionId')
      this.navCtrl.navigateRoot('/autorizacion-cancelar/'+recipeId);
    })
  }//end CancelarAutorizacion()


}//end class
