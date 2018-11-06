import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  // Variable que contendra todos los atributos de nuestro formulario
  forma: FormGroup;

  usuario: Object = {
    fullname: {nombre: 'German', apellido: 'Aviles'},
    correo: 'german.aviles06@gmail.com',
    pasatiempos: ['Peliculas', 'Video juegos', 'Cursos online']
  }

  constructor() {
    console.log(this.usuario);
  }

  ngOnInit() {  

    /**
     * Creamos un nuevo objeto de tipo "FormGroup" al caul le pasamos
     * el nombre de los campos del formulario y sus respectivas validaciones
     * 
     */
    this.forma = new FormGroup({
      'fullname': new FormGroup({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(5)] ),
        'apellido': new FormControl('', [Validators.required, Validators.minLength(6)] ),
      }),
      'correo': new FormControl('', [Validators.required, Validators.pattern("^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$")]),
      'pasatiempos': new FormArray([ 
        new FormControl('Comer', [Validators.required]) ]),
      'username': new FormControl('',[Validators.required], this.existeusuario),
      'pass1': new FormControl('',[Validators.required]),
      'pass2': new FormControl()
    });
    /** 
     * otra forma de aplicarle una validación a un elemento del formulario, 
     * esto por fuera del objeto "forma"
     * toca utilziar el bind porque la función que se esta ejecutando "equalpass"
     *  esta en otro contexto donde el "this" no existe
    */
    //this.forma.controls['pass2'].setValidators([ Validators.required, this.equalpass.bind( this.forma ) ]);
    this.forma.controls['pass2'].setValidators([ Validators.required, this.noIgual ]);
    /** 
     * enviamos los datos que hay en nuestro objeto "usuario" a nuestro objeto "forma"
     * los objetos que deseemos relacionar deben de tener la misma estructura para que funcione
     */
    //this.forma.setValue( this.usuario );
    //estar pendiente de los cambios de todo el formulario
    /*this.forma.valueChanges.subscribe( (data)=> {
      console.log( data );
    });*/
    //estar pendiente de los cambios de un solo elemento del formulario
    this.forma.controls['username'].valueChanges.subscribe( (data)=> {
      console.log( data );
    });
    //estar pendientes del estado (status) del formulario o de un elemento especifico
    this.forma.controls['username'].statusChanges.subscribe( (data) => {
      console.log(data);
    })
  }
  /*
  match(controlKey: string) {
    return (control: AbstractControl): { [s: string]: boolean } => {
        // control.parent es el FormGroup
        if (control.parent) { // en las primeras llamadas control.parent es undefined
          const checkValue  = control.parent.controls[controlKey].value;
          if (control.value !== checkValue) {
            return {
              match: false
            };
          }
        }
        return null;
    };
  }*/
  /*equalpass( control: FormControl ):{ [s:string]: boolean}  {

    let forma: any = this;

    if( control.value !== forma.controls['pass1'].value ){
      noiguales: true;
    }
    return null;
  }*/
  noIgual = (control:FormControl) => {
    if(control.value !== this.forma.controls["pass1"].value) {
      return {
        differentpass: true
      }
    }
    return null;
  }
  //validacion asincrona
  existeusuario( control : FormGroup): Promise<any> | Observable<any>{

    let promesa = new Promise( (resolve, reject)=> {
       setTimeout( () =>{
        if( control.value === "strider" ){
          resolve( {existe:true} ) 
        }else{
          resolve( null )
        }
       },3000)
    });
    
    return promesa;
  }

  guardar(){
    //console.log( this.forma.value );
    console.log( this.forma );
    // reset al formulario, mandarle(setearle) valores y deshabilitar el campo si se desea
    /*this.forma.reset({ 
      'fullname': {'nombre': {value: 'David', disabled:true}, 'apellido': 'Paipa'},
      'correo': {value: 'algo@gmail.com', disabled: true}
     });*/
     //reset (limpiar) el form. activo el pristine, untouched.
     this.forma.reset();
  }

  addPasatiempo(){
    (<FormArray>this.forma.controls['pasatiempos']).push( 
      new FormControl('', [Validators.required] ));
  }

}
