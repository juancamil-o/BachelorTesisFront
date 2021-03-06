import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EnviarFormularioAdopcionService } from 'src/app/services/formulario/enviar-formulario-adopcion.service';
import { UserAdoptante } from 'src/app/components/interfaces/usuarios/userAdoptante';
import { InformacionFamiliar } from 'src/app/components/interfaces/formularios/formularioInformacionFamiliar';
import { InformacionRelacionada } from 'src/app/components/interfaces/formularios/formularioInformacionRelacionada';
import { EntidadAnimal } from 'src/app/components/interfaces/usuarios/entidadAnimal';
import { Referencias } from 'src/app/components/interfaces/formularios/formularioReferencia';
import { FormularioAdopcion } from 'src/app/components/interfaces/formularios/formularioAdopcion';
import { ThemePalette } from '@angular/material/core';
import { EntidadSolicitudAdopcion } from 'src/app/components/interfaces/solicitud-adopcion/entidadSolicitudAdopcion';
import { Router } from '@angular/router';
import { EnviarSolicitudAdopcionService } from 'src/app/services/adopcion/enviar-solicitud-adopcion.service';


export interface Vacuna_box {
  nombre: String;
  completado: boolean;
  color: ThemePalette;
  esquema?: Vacuna_box[];
}

@Component({
  selector: 'app-formulario-adopcion',
  templateUrl: './formulario-adopcion.component.html',
  styleUrls: ['./formulario-adopcion.component.css'],
})
export class FormularioAdopcionComponent implements OnInit {
  constructor(
    public enviarFormularioAdopcionService: EnviarFormularioAdopcionService,
    private router: Router,
    private solicitudService: EnviarSolicitudAdopcionService
  ) {
  }
  @Input() data: any;
  @Output() salida: EventEmitter<any> = new EventEmitter();
  formAdopcion: FormularioAdopcion | undefined;
  lugaresJuego: string[] = [];
  gastosAnimal: string[] =[];
  actividades: string[] =[];
  lugaresDormir: string [] =[];
  ngOnInit(): void {
    console.log('la data es: ',this.data);
  }
  tiempoConocimiento: any[] = [
    'Entre 0 y 2 a??os',
    'Entre 2 y 5 a??os',
    'Entre 5 y 10 a??os',
    'Entre 10 y 20 a??os',
    'M??s de 20 a??os o toda la vida',
  ];
  parentezcos: any[] = [
    'Padre o Madre',
    'T??o',
    'Abuelo',
    'Hijo',
    'Sobrino',
    'Primo',
    'Hermano',
    'Otro',
  ];
  periodoAdaptacion: any = [
    'Menos de dos meses',
    'Entre 2 y 5 meses',
    'Entre 5 y 12 meses',
    'El tiempo que sea necesario',
  ];
  casaDeLaMascota: any[] = [
    'Patio',
    'Terraza',
    'Garaje',
    'Dentro de la casa',
    'Dormir?? conmigo',
  ];
  actividadesConMascota: any[] = [
    'Senderismo',
    'Monta??ismo',
    'Ciclov??a',
    'Llevarla regularmente al trabajo',
    'Llevarla con usted de viaje',
    'Llevarla con usted a hacer ejercicio',
    'Llevarla a parques',
  ];
  dineroEstimadoMascota: any[] = [
    'Menos de 50 mil pesos',
    'Entre 50 y 150 mil pesos',
    'Entre 200 y 300 mil pesos',
    'M??s de 300 mil pesos',
  ];
  gastosMascota: any[] = [
    'Veterinario',
    'Vacunas y desparasitaci??n',
    'Alimento',
    'Accesorios(juguetes,plato,etc)',
    'Cama',
    'Correa',
    'Placa de Identificaci??n',
  ];
  lugarDeJugar: any[] = [
    'Patio Interior',
    'Patio Exterior',
    'Garaje',
    'Zonas verdes cercanas',
    'Parques en las zonas de domicilio',
  ];
  lugarDeVivienda: any[] = ['Casa', 'Apartamento', 'Finca'];
  horasSolo: any[] = [
    'No se quedar??a solo nunca',
    'Hasta la 1 P.M',
    'Hasta las 6 P.M',
    'M??s de las 6 P.M',
  ];
  decision: any[] = ['SI', 'NO'];
  temperamentos: any[] = ['Amigable', 'Manso', 'Brusco', 'Agresivo'];
  tipo_doc: any[] = ['C??dula de ciudadan??a', 'C??dula de extranjer??a'];
  localidad: any[] = [
    '1.Usaqu??n',
    '2.Chapinero',
    '3.Santa F??',
    '4.San Cristobal',
    '5.Usme',
    '6. Tunjuelito',
    '7.Bosa',
    '8.Kennedy',
    '9.Fontib??n',
    '10.Engativ??',
    '11.Suba',
    '12.Barrios Unidos',
    '13.Teusaquillo',
    '14.Los M??rtires',
    '15.Antonio Nari??o',
    '16.Puente Aranda',
    '17.Candelaria',
    '18.Rafael Uribe Uribe',
    '19.Ciudad Bolivar',
    '20.Sumapaz',
  ];
  onEnviarSolicitud(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    const adoptante: UserAdoptante = {
      nombre: form.value.nombresAdoptante,
      urlImg: '',
      apellidos: form.value.apellidosAdoptante,
      fecha_nacimiento: form.value.fecha_nacimiento,
      tipo_doc: form.value.tipo_doc,
      num_doc: form.value.num_doc,
      localidad: form.value.localidad,
      genero: form.value.genero,
      num_celular: form.value.num_celular,
      correo: form.value.correo,
      password: form.value.password,
      tipo_usuario: form.value.tipo_usuario,
      animales: [],
      solicitudesAdoptante: []
    };
    const informacionFamiliar: InformacionFamiliar = {
      numAdultos: form.value.numAdultos,
      numNinos: form.value.numNi??os,
      edadesAdultos: form.value.edadesAdultos,
      edadesNinos: form.value.edadesNi??os,
      numMascotas: form.value.numMascotas,
      razasMascotas: form.value.razasMascotas,
      temperamentoMascotas: form.value.temperamentoMascotas,
      tiempoConMascotas: form.value.tiempoConMascotas,
      nombreFamiliarContacto: form.value.nombreFamiliarContacto,
      numeroFamiliarContacto: form.value.numeroFamiliarContacto,
      familiaresDeAcuerdo: form.value.familiaresDeAcuerdo,
      familiaresAlergias: form.value.familiaresAlergias,
      familiaresPlaneaEmbarazo: form.value.familiaresPlaneaEmbarazo,
    };
    const informacionRelacionada: InformacionRelacionada = {
      tiempoEnCasaHoras: form.value.tiempoEnCasaHoras,
      horaRegresoCasa: form.value.horaRegresoCasa,
      lugarViviendaDeMascota: form.value.lugarViviendaDeMascota,
      patioInteriorJugar: this.getLista(this.lugaresJuego),
      veterinarioGastos: this.getLista(this.gastosAnimal),
      mascotaAnterior: form.value.mascotaAnterior,
      conoceCuidadosMascota: form.value.conoceCuidadosMascota,
      veterinarioDeConfianza: form.value.veterinarioDeConfianza,
      conscienteResponsabilidad15anos:form.value.conscienteResponsabilidad15a??os,
      actividadesConMascota: this.getLista(this.actividades),
      alternativaPaseador: form.value.alternativaPaseador,
      espacioViviendaMascota: this.getLista(this.lugaresDormir),
      razonesAdopcion: form.value.razonesAdopcion,
      disposicionMudarseConElAnimal: form.value.disposicionMudarseConElAnimal,
      disposicionPasearAlAnimalPerro: form.value.disposicionPasearAlAnimalPerro,
      disposicionAdaptacionAnimal: form.value.disposicionAdaptacionAnimal,
      asumirGastosAnimal: form.value.asumirGastosAnimal,
      adoptanteAlternativoAusencia: form.value.adoptanteAlternativoAusencia,
      permisionTenenciaAnimales: form.value.permisionTenenciaAnimales,
    };
    const animalAdopcion: EntidadAnimal = {
      nombre: form.value.nombre,
      edad: form.value.edad,
      raza: form.value.raza,
      sexo: form.value.sexo,
      tamano: form.value.tamano,
      color_ojos: form.value.color_ojos,
      tipo_pelaje: form.value.tipo_pelaje,
      situacion: form.value.situacion,
      desparasitado: form.value.desparasitado,
      ultima_vac: form.value.ultima_vac,
      descripcion: form.value.descripcion,
      esquema_vac: form.value.esquema_vac,
      urlImg: form.value.urlImg,
      tipo_animal: form.value.tipo_animal,
      ownerFundacion: form.value.tipo_doc,
      enAdopcion: true,
    };
    const referenciaFamiliar: Referencias = {
      nombres: form.value.nombresFamiliar,
      apellidos: form.value.apellidosFamiliar,
      numFijo: form.value.numFijoFamiliar,
      numCelular: form.value.numCelularFamiliar,
      parentezco: form.value.parentezcoFamiliar,
      tiempoDeConocimiento: form.value.tiempoDeConocimientoFamiliar,
    };
    const referenciaPersonal: Referencias = {
      nombres: form.value.nombresAmigo,
      apellidos: form.value.apellidosAmigo,
      numFijo: form.value.numFijoAmigo,
      numCelular: form.value.numCelularAmigo,
      parentezco: form.value.parentezcoAmigo,
      tiempoDeConocimiento: form.value.tiempoDeConocimientoAmigo,
    };
    const formularioAdopcion: FormularioAdopcion = {
      adoptante,
      informacionFamiliar,
      informacionRelacionada,
      animalAdopcion,
      referenciaFamiliar,
      referenciaPersonal,
    };
    //this.authservice.crearUsuarioAdoptante(datosAdoptante);
    this.solicitudService.actualizarEstadoSolicitud(this.data._id,'Aceptado, formulario en espera de respuesta.')
    this.enviarFormularioAdopcionService.formularioAdopcion(formularioAdopcion,this.data._id);
    this.salir();
  }
  salir()
  {
    this.salida.emit(false);
  }
  cancelar()
  {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate(['/same-route']);
  }
  enviarFormQuemado()
  {
    this.formAdopcion = 
    {
      adoptante: this.data.adoptante,
      animalAdopcion: this.data.animal,
      informacionFamiliar: {
        numAdultos: '4',
        numNinos: '2',
        edadesAdultos: '87',
        edadesNinos: '16',
        numMascotas: '3',
        razasMascotas: 'Schnauzer, carey y 2 hamsters',
        temperamentoMascotas: 'Amigable',
        tiempoConMascotas: '11',
        nombreFamiliarContacto: 'Angela Pati??o',
        numeroFamiliarContacto: '3057471184',
        familiaresDeAcuerdo: 'SI',
        familiaresAlergias: 'NO',
        familiaresPlaneaEmbarazo: 'NO'
      },
      informacionRelacionada: 
      {
        tiempoEnCasaHoras: '12',
        horaRegresoCasa: 'Hasta las 6 P.M',
        lugarViviendaDeMascota: 'Casa',
        patioInteriorJugar: 'Zonas verdes cercanas, Parques en las zonas de domicilio',
        veterinarioGastos: 'Menos de 50 mil pesos',
        mascotaAnterior: 'SI',
        conoceCuidadosMascota: 'SI',
        veterinarioDeConfianza: 'SI',
        conscienteResponsabilidad15anos: 'SI',
        actividadesConMascota: 'Llevarla con usted de viaje, Llevarla a parques',
        alternativaPaseador: 'SI',
        espacioViviendaMascota: 'Dentro de la casa, Dormir?? conmigo',
        razonesAdopcion:'Me gust??n las mascotas y considero que le puedo dar una buena vida a mi peludito',
        disposicionMudarseConElAnimal: 'SI',
        disposicionPasearAlAnimalPerro: 'NO',
        disposicionAdaptacionAnimal: 'El tiempo que sea necesario',
        asumirGastosAnimal: 'yo',
        adoptanteAlternativoAusencia: 'Mis hermanas',
        permisionTenenciaAnimales: 'SI'
      },
      referenciaFamiliar: 
      {
        nombres:'Angela Yesenia',
        apellidos: 'Pati??o Gantiva',
        numFijo: 'No aplica',
        numCelular: '3057471184',
        parentezco: 'Padre o madre',
        tiempoDeConocimiento: ''
      },
      referenciaPersonal: 
      {
        nombres:'Juan Sebastian',
        apellidos: 'Martinez Alvarado',
        numFijo: 'No aplica',
        numCelular: '3205586321',
        parentezco: '',
        tiempoDeConocimiento: 'Entre 2 y 5 a??os'
      }
    }
    var index;
    for(var i = 0; i < this.solicitudService.getSolicitudesQuemadas().length; i++)
    {
      if(this.data == this.solicitudService.getSolicitudesQuemadas()[i])
      {
        this.solicitudService.solicitudes[i].formulario = this.formAdopcion; // asigna el formulario a la solicitud 
        this.solicitudService.solicitudes[i].estado = 'Aceptado, formulario en espera de respuesta.'; 
        index = i;
      }
    }
    this.salir()
  }
  verDatos(evento: any,accion: string, nombreCasilla: string)
  {
    var encontrado = false;
    var pos;
    if(accion == 'juego')
    {
      for(var i = 0; i < this.lugaresJuego.length; i++)
        {
          if(this.lugaresJuego[i] == nombreCasilla)
          {
            pos = i;
            encontrado = true;
          }
        }
      if(evento.checked)
      {
        if(!encontrado)
          this.lugaresJuego.push(nombreCasilla);       
      }
      else 
      {
        this.lugaresJuego.splice(pos,1);
      }
    }
    if(accion == 'gastos')
    {
      for(var i = 0; i < this.gastosAnimal.length; i++)
        {
          if(this.gastosAnimal[i] == nombreCasilla)
          {
            pos = i;
            encontrado = true;
          }
        }
      if(evento.checked)
      {
        if(!encontrado)
          this.gastosAnimal.push(nombreCasilla);       
      }
      else 
      {
        this.gastosAnimal.splice(pos,1);
      }
    }
    if(accion == 'actividades')
    {
      for(var i = 0; i < this.actividades.length; i++)
        {
          if(this.actividades[i] == nombreCasilla)
          {
            pos = i;
            encontrado = true;
          }
        }
      if(evento.checked)
      {
        if(!encontrado)
          this.actividades.push(nombreCasilla);       
      }
      else 
      {
        this.actividades.splice(pos,1);
      }
    }
    if(accion == 'dormir')
    {
      for(var i = 0; i < this.lugaresDormir.length; i++)
        {
          if(this.lugaresDormir[i] == nombreCasilla)
          {
            pos = i;
            encontrado = true;
          }
        }
      if(evento.checked)
      {
        if(!encontrado)
          this.lugaresDormir.push(nombreCasilla);       
      }
      else 
      {
        this.lugaresDormir.splice(pos,1);
      }
    }
  }
  getLista(arreglo: string[]): string
  {
    var palabra ='Sin informaci??n';
    for(var i = 0; i < arreglo.length; i++)
    {
      if(i == 0)
        palabra = arreglo[i];
      else 
      {
        palabra +=', ' + arreglo[i]; 
      }
    }
    return palabra;
  }
}
