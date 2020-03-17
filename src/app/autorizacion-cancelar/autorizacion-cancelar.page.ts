import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorizacionService } from '../services/autorizacion.service';

@Component({
  selector: 'app-autorizacion-cancelar',
  templateUrl: './autorizacion-cancelar.page.html',
  styleUrls: ['./autorizacion-cancelar.page.scss'],
})
export class AutorizacionCancelarPage implements OnInit {
  PickerPersonalizadoOptions;
  public FormularioCancelar: FormGroup;
  public invalidLogin: boolean =false;
  public fecha: any;
  motivo: any;
  autorizacionId: any;
  errorMessage: any;
  invalidCancelar: boolean;
  myDate:any;
  constructor(
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              public alertController: AlertController,
              public navCtrl: NavController,
              public autorizacionService: AutorizacionService) { }

  

  ngOnInit() {
    this.myDate  = new Date().toISOString();

    this.FormularioCancelar = this.formBuilder.group({
      'fechaTxt': [null, Validators.compose([
        Validators.required
      ])],
      'motivoTxt': [null, Validators.compose([
        Validators.required
      ])]
    });

    this.PickerPersonalizadoOptions = {
      buttons: [{
        text: 'Cancelar',
        handler: () => {
          console.log('Se clickeo Cancelar, no hace nada.');
          return false;
        }
      },{
        text: 'Aceptar',
        handler: ( ) => {
          console.log('Se clickeo Aceptar.');
          return true;
          //console.log("fecha seleccionada:"+ evento.ionChange);
          //const FechaHoraPersonalizada= new Date().toISOString()
          //console.log(this.fecha)
  
          // this.activatedRoute.paramMap.subscribe(paramMap => {
          //   const recipeId = paramMap.get('autorizacionId')
          // this.cancelarAutorizacion(recipeId, FechaHoraPersonalizada, motivo)
          // })

          

  
          // this.presentAlert().then(()=>{
            
          //   this.navCtrl.navigateRoot('/autorizacion-lista');
          // });
  
        }
      }]
    }
    
  }//end ngOnInit()

  onSubmit(){
    console.log("Se apreto submit")
    console.log(this.FormularioCancelar.value)
    if (this.FormularioCancelar.invalid){
      return;
    }
    this.autorizacionId = this.activatedRoute.snapshot.paramMap.get('autorizacionId');
    this.fecha= this.FormularioCancelar.value["fechaTxt"];
    this.motivo= this.FormularioCancelar.controls.motivoTxt.value;

    //alert(this.autorizacionId+" "+this.fecha+" "+ this.motivo);

    this.autorizacionService.cancelarAutorizacion(this.autorizacionId, this.fecha, this.motivo)
    .subscribe(
    (response) => {
    console.log('Respuesta de GET recibida')
      this.presentAlert().then(()=>{
      this.navCtrl.navigateRoot('/autorizacion-lista');
      });
    },
    (error) => {                              //Error callback
    console.error('Error de GET capturado')
    this.errorMessage = error.statusText;
    console.log(this.errorMessage)
    this.invalidCancelar = true;
    }
    )
  } //end onSubmit()

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Informacion',
      message: 'La autorizacion fue cancelada con la fecha y el motivo especificados.',
      buttons: ['Aceptar'],
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }


}//end class
