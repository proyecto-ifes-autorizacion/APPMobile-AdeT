import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AutorizacionService } from '../services/autorizacion.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-autorizacion-lista',
  templateUrl: './autorizacion-lista.page.html',
  styleUrls: ['./autorizacion-lista.page.scss'],
})
export class AutorizacionListaPage implements OnInit {

  constructor(private http: HttpClient,
              private autorizacionService: AutorizacionService,
              public alertController: AlertController,
              public navCtrl: NavController,
              public toastController: ToastController) { }

  public resultadosArray : any = null;
  public resultadosArraytemp : any;
  public resultadosArrayFiltrado = [];
  public resultadoPost : any;

  ngOnInit() {
    this.listarTodasLasAutorizaciones();
  } //end ngOnInit()

  ionViewWillEnter(){
    console.log("volvio a entrar y pidio lista")
    this.resultadosArray = [];
    this.resultadosArrayFiltrado = [];
    this.listarTodasLasAutorizaciones();
  }//end ionViewWillEnter()

  doRefresh(event) {
    console.log('Begin async operation');
  
    setTimeout(() => {
      this.ionViewWillEnter()
      console.log('Async operation has ended');
      event.target.complete();
    }, 100);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Actualizando lista de Autorizaciones',
      duration: 2000
    });
    toast.present();
  }

  listarTodasLasAutorizaciones() {
    this.autorizacionService.listarTodasLasAutorizaciones()
    .subscribe(
      contenidoObtenido => {
        //this.resultadosArraytemp = contenidoObtenido;
        this.resultadosArray = contenidoObtenido;
        this.resultadosArraytemp = this.resultadosArray;

        
        console.log(this.resultadosArray);
        console.log('Largo del array es: ' + this.resultadosArray.length);
        //this.resultadosArraytemp.splice(-1);
        this.resultadosArraytemp.pop()
        //console.log(Object.getOwnPropertyNames(this.resultadosArraytemp))
        //le elimina el ultimo item del array que no contiene una autorizacion
        console.log(this.resultadosArraytemp);
        console.log('Largo del array es: ' + this.resultadosArraytemp.length);

        const largoArray =this.resultadosArraytemp.length;
        for (var i = 0; i < largoArray;) {
        console.log(this.resultadosArray[i].estado);
        console.log(this.resultadosArray[i].titulo);
        if(this.resultadosArray[i].hasOwnProperty("estado")){
        if(this.resultadosArray[i].estado == "Liberada"){
        //this.resultadosArray.splice(i,1);
        this.resultadosArrayFiltrado.push(this.resultadosArray[i]);
        console.log("se agrega al temp")
        //si el estado del item no es Abierta lo quita del Array
        
        }
        }
        console.log(i);
        i = i+1;
      }
        console.log("Se quitaron los items del array que no tenian estado=Abierta");

        this.resultadosArrayFiltrado.sort(( a, b ) => parseInt(a.$$instanceId, 10) - parseInt(b.$$instanceId, 10) )
        console.log("Se ordenaron los items del array ascendentemente por instanceId");

        this.resultadosArray = this.resultadosArrayFiltrado;
        console.log('Largo del array es: ' + this.resultadosArray.length);
        console.log(this.resultadosArrayFiltrado);
    });
  } //end listarTodasLasAutorizaciones()

  async alertaLogOut() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesion',
      message: '¿Esta seguro que desea cerrar sesion?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Apreto boton cancelar');
          }
        }, {
          text: 'Si, salir',
          handler: () => {
            console.log('Apreto boton Salir');
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }

}//end class
