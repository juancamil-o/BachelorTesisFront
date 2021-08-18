import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

import { CrearGatoService } from 'src/app/services/crear-gato.service';

export interface Vacuna_box{
  nombre: String;
  completado: boolean;
  color: ThemePalette;
  esquema?: Vacuna_box[];
}


@Component({
  selector: 'app-crear-animal-gato',
  templateUrl: './crear-animal-gato.component.html',
  styleUrls: ['./crear-animal-gato.component.css']
})
export class CrearAnimalGatoComponent implements OnInit {

  constructor(public crearGatoService: CrearGatoService) { }

  ngOnInit(): void {
  }

  
  edad: any [] = ['menos de 1 mes ', '1 mes', '2 meses', '3 meses'
  , '4 meses', '5 meses', '6 meses', '7 meses', '8 meses', '9 meses', '10 meses', 
  '11 meses', '1 año',  '2 años',  '3 años',  '4 años',  '5 años',  '6 años',  '7 años',  '8 años',
  '9 años',  '10 años',  '11 años',  '12 años', '13 años', '14 años', '15 años', 'más de 15 años'];

  tipo: any[] = ['Perro', 'Gato'];

  genero: any [] = ['Macho','Hembra'];

  color_ojos: any[] = ['Azul', 'Verde', 'Marrón', 'Dorado', 'Negro', 'Heterocromía'];

  tipo_pelaje: any[] = ['Pelaje largo', 'Pelaje semilargo', 'Pelaje corto', 'Sin pelaje'];

  desparasitado: any[] = ['Sí', 'No'];

  lista_vacunas: any[] = ['Leucemia viral felina', 'Triple felina', 'Segunda dosis leucemia', 'Refuerzo triple felina', 'Rabia'];

  situacion: any[] = ['Sin esterilizar','Esterilizado'];

  vacunas: Vacuna_box = {
    
    nombre: 'Seleccione el esquema de vacunas del animal',
    completado: false,
    color: "primary",
    esquema: [
      {nombre: 'Leucemia viral felina', completado: false, color:"primary"},
      {nombre: 'Triple felina', completado: false, color:"primary"},
      {nombre: 'Segunda dosis leucemia', completado: false, color:"primary"},
      {nombre: 'Refuerzo triple felina', completado: false, color:"primary"},
      {nombre: 'Rabia', completado: false, color:"primary"},
    ]
  }; 

  all_complete: boolean = false;

  updateAllComplete(){
    this.all_complete = this.vacunas.esquema != null && this.vacunas.esquema.every(t => t.completado);
  }

  someComplete(){
    if(this.vacunas.esquema == null){
      return false;
    }
    return this.vacunas.esquema.filter(t => t.completado).length > 0 && !this.all_complete;
  }

  setAll(completado: boolean){
    this.all_complete = completado;
    if(this.vacunas.esquema == null){
      return;
    }
    this.vacunas.esquema.forEach(t => t.completado = completado);
  }

  onCrearGato(form: NgForm){
    console.log(form.value);
    if(form.invalid){
      return;
    }
    this.crearGatoService.crearGato(form.value.nombre, form.value.edad, form.value.raza, form.value.sexo, form.value.color_ojos, form.value.tipo_pelaje, form.value.situacion, form.value.ultima_vac, form.value.desparasitado, form.value.descripcion, form.value.esquema_vac);
  }
  
}