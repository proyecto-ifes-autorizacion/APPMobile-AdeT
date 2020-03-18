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
    console.log('Respuesta de la API recibida sin error')
    //console.log(this.response)

    if (response && response.length) {   
      console.log("Trajo un array entonces significa que se autenticó")
      this.navCtrl.navigateRoot('/autorizacion-lista');

      this.persist(this.usuario);
    }
    },
    (error) => {
    console.error('Respuesta de la API recibida con error');
    console.log(error.statusText)
    this.invalidLogin = true;
    })
  } //end onSubmit()

} //end class
