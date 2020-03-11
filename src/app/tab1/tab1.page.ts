import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AutorizacionesService } from '../services/autorizaciones.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  constructor(private http: HttpClient, private autorizacionService: AutorizacionesService) {}

  public resultadosArray : any = null;
  public resultadosArraytemp : any;
  public resultadoPost : any;
   ngOnInit() {
    this.listarTodasLasAutorizaciones();
  
  }


  listarTodasLasAutorizaciones() {
  
    this.autorizacionService.editarMarca("1","cietroencambiado").subscribe(
      contenidoObtenido => {
        //this.resultadosArraytemp = contenidoObtenido;
        this.resultadoPost = contenidoObtenido;
        console.log(this.resultadoPost);
      }
    );


    this.autorizacionService.listarTodasLasAutorizaciones()
    .subscribe(
      contenidoObtenido => {
        //this.resultadosArraytemp = contenidoObtenido;
        this.resultadosArray = contenidoObtenido;
        console.log('Largo del array es: ' + this.resultadosArray.length);
        this.resultadosArray.splice(-1,1);
        console.log(this.resultadosArray[21].estado);

        for (var i = 0; i < this.resultadosArray.length; i++) {
        console.log(this.resultadosArray[i].estado);
        if(this.resultadosArray[i].estado != "Abierta"){
          this.resultadosArray.splice(0,i);

        }
        }

        
        //this.resultadosArray = this.resultadosArraytemp;


        console.log('Largo del array es: ' + this.resultadosArray.length);
    });
  }


  filterItemsOfType(){
    return this.resultadosArray.filter(resultado => resultado.titulo != null);
  }
}
