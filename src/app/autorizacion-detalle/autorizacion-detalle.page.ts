import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AutorizacionService } from '../services/autorizacion.service';
import { FormsModule } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import {concatMap, tap} from 'rxjs/operators';


@Component({
  selector: 'app-autorizacion-detalle',
  templateUrl: './autorizacion-detalle.page.html',
  styleUrls: ['./autorizacion-detalle.page.scss'],
})
export class AutorizacionDetallePage implements OnInit {
  consulta: any;
  fecha: any;
  data: any = [];

  constructor(private autorizacionService: AutorizacionService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private formsModule: FormsModule,
    public alertCtrl: AlertController,
    public navCtrl: NavController) { }

    public arrayAutorizacion: any = [];
    public solicitanteEmpresa: String;
    public solicitanteTrabajador: String;
    public solicitanteVehiculo: String;
    public empresasEjecutantes: any =[];
    public empresasEjecutantesLargo: any;
    public trabajadoresEjecutantes: any;
    public trabajadoresEjecutantesLargo :any;
    public vehiculosEjecutantes: any;
    public vehiculosEjecutantesLargo: any;
    public permiteBtnCerrar: boolean;
    public recipeId: any;
    public FechaHoraPersonalizada: any;
    //private alertCtrl: AlertController;
    public inputFecha: any;
    public inputHora: any;
    public inputMotivo: any;
    public fechaHoraUnidas: any;

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paramMap => {
      const recipeId = paramMap.get('autorizacionId')
      console.log("id recibida por URL: "+ recipeId);
      

      this.autorizacionService.obtenerAutorizacionById(recipeId).subscribe(
        contenidoObtenido => {
          this.arrayAutorizacion = contenidoObtenido;
          console.log("##############################################")
          console.log(contenidoObtenido);
          
          if(!contenidoObtenido.titulo){
            this.arrayAutorizacion.titulo = "Sin titulo";
          }

          if(!contenidoObtenido.descripcion){
            this.arrayAutorizacion.descripcion = "Sin descripcion";
          }

          if(!contenidoObtenido.ubicacion){
            this.arrayAutorizacion.ubicacion = "Sin ubicacion";
          }

          if(!contenidoObtenido.cierre){
            this.arrayAutorizacion.cierre = "No cerrada aún";
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
          //console.log("Empresas ejecutantes: "+this.empresasEjecutantes);

          //this.trabajadoresEjecutantes = contenidoObtenido.ejecutanteTrabajadores;
          //this.trabajadoresEjecutantesLargo = this.trabajadoresEjecutantes.length;
          //console.log("trabajadoresEjecutantes: "+this.trabajadoresEjecutantes);

          //this.vehiculosEjecutantes = contenidoObtenido.ejecutanteVehiculos;
          //this.vehiculosEjecutantesLargo = this.vehiculosEjecutantes.length;
          //console.log("vehiculosEjecutantes: "+this.vehiculosEjecutantes);


          if(
            this.arrayAutorizacion.titulo != "Sin titulo" &&
            this.arrayAutorizacion.descripcion != "Sin descripcion" &&
            this.arrayAutorizacion.ubicacion != "Sin ubicacion" &&
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



  async cerrarAutorizacionPrompt(){

    const alerta = await this.alertCtrl.create({
      header: 'Cerrar Autorizacion',
      subHeader: 'selecione Fecha y hora',
      inputs: [
        {
          name: 'inputFecha',
          type: 'date',
          placeholder: 'AAAA-MM-DD',
          label: "Fecha"
        },
        {
          name: 'inputHora',
          type: 'time',
          placeholder: 'HH:MM',
          label: "Hora"
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Presiono Cancelar');
          }
        }, {
          text: 'Guardar',
          handler: (data) => {
            //console.log('Persiono Guardar. Campo: '+data.inputUrlServidor);
            
            if (data.inputFecha == "" ||
              data.inputHora == "" ) {
              console.log("Los campos estan vacios");
              //alert("Los campos estan vacios");
              return false;

            }else if (data.inputFecha != "" ||
                      data.inputHora != "" ) {
              this.activatedRoute.paramMap.subscribe(paramMap => {
              const recipeId = paramMap.get('autorizacionId')
              let {inputFecha} = this
              let {inputHora} = this
              this.fechaHoraUnidas = data.inputFecha+" "+data.inputHora;
              var fechaConvertida = new Date(this.fechaHoraUnidas).toISOString()
              console.log("Fecha convertida: "+fechaConvertida);
              //alert("Fecha convertida: "+fechaConvertida);
              //alert("Los campos tienen algo entonces envia: "+recipeId+"/"+fechaConvertida);

              this.autorizacionService.cerrarAutorizacion(recipeId, fechaConvertida)
              .subscribe(
                contenidoObtenido => {
                  console.log("resultado: "+contenidoObtenido)
                })

              })
            }
        
            this.cerrarAutorizacionSatisfactoria().then(()=>{
              this.navCtrl.navigateRoot('/autorizacion-lista');
            })
          }
        }
      ]
    });
    await alerta.present();
  }//end cerrarAutorizacionPrompt()

  async cerrarAutorizacionSatisfactoria() {
    const alerta = await this.alertCtrl.create({
      header: 'Informacion',
      message: 'La autorizacion fue cerrada con la fecha seleccionada.',
      buttons: ['Aceptar'],
    });
  
    await alerta.present();
    let result = await alerta.onDidDismiss();
    console.log(result);
  }//end cancelarAutorizacionSatisfactoria()



  
  async cancelarAutorizacionPrompt(){
    // this.activatedRoute.paramMap.subscribe(paramMap => {
    //   const recipeId = paramMap.get('autorizacionId')
    //   this.navCtrl.navigateRoot('/autorizacion-cancelar/'+recipeId);

    const alerta = await this.alertCtrl.create({
      header: 'Cancelar Autorizacion',
      subHeader: 'selecione Fecha y hora',
      inputs: [
        {
          name: 'inputFecha',
          type: 'date',
          placeholder: 'AAAA-MM-DD',
          label: "Fecha"
        },
        {
          name: 'inputHora',
          type: 'time',
          placeholder: 'HH:MM',
          label: "Hora"
        },
        {
          name: 'inputMotivo',
          type: 'text',
          placeholder: 'Motivo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Presiono Cancelar');
          }
        }, {
          text: 'Guardar',
          handler: (data) => {
            //console.log('Persiono Guardar. Campo: '+data.inputUrlServidor);
            
            if (data.inputFecha == "" ||
              data.inputHora == "" ) {
              console.log("Los campos estan vacios");
              //alert("Los campos estan vacios");
              //alerta.dismiss();
              return false;

            }else if (data.inputFecha != "" ||
                      data.inputHora != "" ||
                      data.inputMotivo != "" ) {
              this.activatedRoute.paramMap.subscribe(paramMap => {
              const recipeId = paramMap.get('autorizacionId')
              let {inputFecha} = this
              let {inputHora} = this
              let {inputMotivo} = this
              this.fechaHoraUnidas = data.inputFecha+" "+data.inputHora;
              var fechaConvertida = new Date(this.fechaHoraUnidas).toISOString()
              console.log("Fecha convertida: "+fechaConvertida);
              //alert("Fecha convertida: "+fechaConvertida);
              alert("Los campos tienen algo entonces envia: "+recipeId+"/"+fechaConvertida+"/"+data.inputMotivo);
              //this.autorizacionService.cancelarAutorizacion(recipeId, inputFecha, inputMotivo);
              this.autorizacionService.cancelarAutorizacion(recipeId, fechaConvertida, data.inputMotivo)
              .subscribe(
                contenidoObtenido => {
                  console.log("resultado: "+contenidoObtenido)
                })

              })
            }
        
            this.cancelarAutorizacionSatisfactoria().then(()=>{
              this.navCtrl.navigateRoot('/autorizacion-lista');
            })
          }
        }
      ]
    });
    await alerta.present();
  }//end cancelarAutorizacionPrompt()

  async cancelarAutorizacionSatisfactoria() {
    const alerta = await this.alertCtrl.create({
      header: 'Informacion',
      message: 'La Autorizacion fue cancelada con la informacion especificada.',
      buttons: ['Aceptar'],
    });
  
    await alerta.present();
    let result = await alerta.onDidDismiss();
    console.log(result);
  }//end cancelarAutorizacionSatisfactoria()



}//end class
