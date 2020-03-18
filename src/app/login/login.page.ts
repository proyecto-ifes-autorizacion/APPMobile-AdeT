import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController  } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public FormularioLogin: FormGroup;
  public invalidLogin: boolean =false;
  public usuarioDosPuntosContrasena: String;
  public Auth64 : any;
  loading: boolean;
  errorMessage: string;
  public usuario: string = ''
  contrasena: any;
  URLservidor: String;
  public ServidorIP: String = 'http://apacheisis.ddns.net:8080';
  direccionURL: any;
  public invalidServidor: boolean =false;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private alertCtrl: AlertController) { }


  ngOnInit() {
        this.FormularioLogin = this.formBuilder.group({
      'usuario': [null, Validators.compose([
        Validators.required
      ])],
      'contrasena': [null, Validators.compose([
        Validators.required
      ])]
    });

    this.verificaURLservidor();
  } //end ngOnInit()


  verificaURLservidor(){
  //window.localStorage.URLservidor = "";
  
  if(!window.localStorage.URLservidor){
    this.URLservidor = this.ServidorIP;
    window.localStorage.URLservidor = this.ServidorIP;
    //Si no tiene contenido el localstorage asigna la hardcodeada
    //alert("No habia direccion en storage. Usara: "+this.ServidorIP)
  }else{
    //console.log("Inicia verificaURLservidor()");
    this.URLservidor = window.localStorage.URLservidor;
    //console.log("Habia direccion en storage: "+this.URLservidor)
    //Obtiene IP desde localstorage
  }
  
  this.direccionURL = this.URLservidor;

//   const FETCH_TIMEOUT = 3000;
//   let didTimeOut = false;

//   new Promise(function(resolve, reject) {
//     const timeout = setTimeout(function() {
//         didTimeOut = true;
//         reject(new Error('Request timed out'));
//     }, FETCH_TIMEOUT);
    
//     fetch(this.direccionURL)
//     .then(function(response) {
//         // Clear the timeout as cleanup
//         clearTimeout(timeout);
//         if(!didTimeOut) {
//             console.log('fetch good! ', response);
//             resolve(response);
//             this.invalidServidor = false;
//         }
//     })
//     .catch(function(err) {
//         console.log('fetch failed! ', err);
//           this.invalidServidor = true;
//        this.URLservidorPrompt(this.direccionURL);
//         // Rejection already happened with setTimeout
//         if(didTimeOut) return;
//         // Reject with error
//         reject(err);
//     });
// })
// .then(function() {
//     this.invalidServidor = false;
//     // Request success and no timeout
//     console.log('good promise, no timeout! ');
// })
// .catch(function(err) {
//     // Error: response error, request timeout or runtime error
//     this.invalidServidor = true;
//     this.URLservidorPrompt(this.direccionURL);
//     console.log('promise error! ', err);
// });

  return fetch(this.direccionURL, {mode: "no-cors"})
    .then(res => {
      console.log('La URL "'+this.direccionURL+'" si existe.');
      //alert("Existe la direccion: "+this.direccionURL)
      this.invalidServidor = false;
      
    })
    .catch(err => {
      console.log('La URL "'+this.direccionURL+'" NO existe.');
      //alert("No existe la direccion: "+this.direccionURL)
      this.invalidServidor = true;
      this.URLservidorPrompt(this.direccionURL);
    })
  }//end verificaURLservidor()

  async URLservidorPrompt(urlValue) {
    if(window.localStorage.URLservidor){
      urlValue = window.localStorage.URLservidor;
    }else if(!urlValue){
      urlValue = this.ServidorIP;
    }else{
      urlValue = urlValue;
    }
    const alert = await this.alertCtrl.create({
      header: 'Indique URL servidor',
      inputs: [
        {
          name: 'inputUrlServidor',
          type: 'url',
          value: urlValue
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
            window.localStorage.URLservidor = data.inputUrlServidor;
            this.ngOnInit();
          }
        }
      ]
    });

    await alert.present();
  }//en URLservidorPrompt()

  cierraApp(){
    window.localStorage.URLservidor = "";
    navigator['app'].exitApp()
  }

  autoCompletar(parameter1: String, parameter2: String){
    this.FormularioLogin.controls.usuario.setValue(parameter1);
    this.FormularioLogin.controls.contrasena.setValue(parameter2);
  }

  presionaEnter(){
    this.onSubmit();
  }
  
  onSubmit(){
    console.log("Se apreto submit")
    console.log(this.FormularioLogin.value)
    if (this.FormularioLogin.invalid){
      return;
    }

    this.usuario= this.FormularioLogin.controls.usuario.value,
    this.contrasena= this.FormularioLogin.controls.contrasena.value
    
    this.loginService.realizaLogin(this.usuario, this.contrasena)
    .subscribe(
    (response) => {
    console.log('Respuesta de la API recibida sin error')
    //console.log(this.response)

    if (response && response.length) {   
      console.log("Trajo un array entonces significa que se autenticó")
      this.navCtrl.navigateRoot('/autorizacion-lista');

      this.persist(this.usuario);
    }
    },
    (error) => {
      console.log(error);
    console.log('Respuesta de la API recibida con error: '+error.statusText);
    //alert('Respuesta de la API recibida con error: '+error.statusText);
    this.invalidLogin = true;
    })
  } //end onSubmit()

  persist(usuarioRecibido: String){
    window.localStorage.usuario = usuarioRecibido;
  }
  
} //end class
