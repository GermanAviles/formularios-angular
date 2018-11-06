import { Component} from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent{
    algo:string = "adlaldaa";
    /* asdasdad */
    usuario:Object = {
    nombre: null,
    apellido: null,
    correo: null,
    pais:"",
    genero:"",
    condiciones:false
  }

  paises = [
    {
      codigo: "COL",
      nombre: "Colombia"
    },
    {
      codigo: "VEL",
      nombre: "Venezuela"
    },
    {
      codigo: "CRI",
      nombre: "Costa Rica"
    },
    {
      codigo: "ESP",
      nombre: "España"
    }];

  generos:string[] = ["Masculino", "Femenino", "Indefinido"];

  constructor() { 
    this.algo = "por defecto."
  }

  guardar(forma:NgForm){
    
    console.log(" NgForm", forma );
    console.log(" Value ", forma.value);
    console.log(" Usuario ", this.usuario );
  }

}
