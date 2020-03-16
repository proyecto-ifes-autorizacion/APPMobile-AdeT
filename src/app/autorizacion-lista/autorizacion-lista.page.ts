import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AutorizacionService } from '../services/autorizacion.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-autorizacion-lista',
  templateUrl: './autorizacion-lista.page.html',
  styleUrls: ['./autorizacion-lista.page.scss'],
})
export class AutorizacionListaPage implements OnInit {

  constructor(private http: HttpClient, private autorizacionService: AutorizacionService, public alertController: AlertController,public navCtrl: NavController) { }

  public resultadosArray : any = null;
  public resultadosArraytemp : any;
  public resultadosArrayFiltrado = [];
  public resultadoPost : any;

  ngOnInit() {
    this.listarTodasLasAutorizaciones();
  } //end ngOnInit()

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
        if(this.resultadosArray[i].estado == "Abierta"){
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
        this.resultadosArray = this.resultadosArrayFiltrado;
        console.log('Largo del array es: ' + this.resultadosArray.length);
        console.log(this.resultadosArrayFiltrado);
    });
  } //end listarTodasLasAutorizaciones()

  
}
