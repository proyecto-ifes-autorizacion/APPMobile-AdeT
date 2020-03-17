import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
        this.FormularioLogin = this.formBuilder.group({
      'usuario': [null, Validators.compose([
        Validators.required
      ])],
      'contrasena': [null, Validators.compose([
        Validators.required
      ])]
    });
  } //end ngOnInit()

  cierraApp(){
    navigator['app'].exitApp()
  }

  autoCompletar(parameter1: String, parameter2: String){
    this.FormularioLogin.controls.usuario.setValue(parameter1);
    this.FormularioLogin.controls.contrasena.setValue(parameter2);
  }

  presionaEnter(){
    this.onSubmit();
  }
  
  persist(usuarioRecibido: String){
    window.localStorage.usuario = usuarioRecibido;
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
    console.log('Respuesta de GET recibida')
    //console.log(this.response)

    if (response && response.length) {   
      console.log("Trajo un array entonces se logueo")
      //window.localStorage.setItem('token', contenidoObtenido.token)
      if(this.usuario == "admin"){
      this.navCtrl.navigateRoot('/autorizacion-lista');
      }else if(this.usuario == "gestionador"){
      this.navCtrl.navigateRoot('/autorizacion-detalle/21');
      }

      this.persist(this.usuario);

    } else {
    console.log("No trajo un array por lo tanto el usuario o contrasena es incorrecto")
    this.invalidLogin = true;
    }
    },
    (error) => {                              //Error callback
    console.error('Error de GET capturado')
    this.errorMessage = error.statusText;
    console.log(this.errorMessage)
    this.invalidLogin = true;

          //throw error;   //You can also throw the error to a global error handler
        }
      )



    //this.navCtrl.navigateRoot('/autorizacion-lista');
  } //end onSubmit()

} //end class
