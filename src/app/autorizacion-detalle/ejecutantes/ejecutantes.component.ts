import { Component, OnInit, Input } from '@angular/core';

import { AutorizacionService } from '../../services/autorizacion.service';

@Component({
  selector: 'componente-ejecutantes',
  templateUrl: './ejecutantes.component.html',
  styleUrls: ['./ejecutantes.component.scss'],
})
export class EjecutantesComponent implements OnInit {
  ejecutante : any;

  constructor(private autorizacionService: AutorizacionService) { }

  @Input("identificadorEmpresa") set datos(value: any) {
    this.autorizacionService
      .obtenerEjecutante(value)
      .subscribe(contenidoObtenido => {
        this.ejecutante = contenidoObtenido
        //console.log("Resultado de obtenerEjecutante("+value+"):")
        //console.log(this.ejecutante)
      });
  }

  ngOnInit() {}

}//end class
