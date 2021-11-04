import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdoptanteService } from 'src/app/services/adoptante/adoptante.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserAdoptante } from '../../interfaces/usuarios/userAdoptante';

@Component({
  selector: 'app-mi-cuenta-adoptante',
  templateUrl: './mi-cuenta-adoptante.component.html',
  styleUrls: ['./mi-cuenta-adoptante.component.css'],
})
export class MiCuentaAdoptanteComponent implements OnInit {
  userId: string = '';
  genero: string = '';
  adoptante: UserAdoptante = {
    nombre: '',
    urlImg: '',
    apellidos: '',
    fecha_nacimiento: '',
    tipo_doc: '',
    num_doc: '',
    genero: '',
    localidad: '',
    correo: '',
    num_celular: '',
    tipo_usuario: '',
    password: '',
    animales: [],
    solicitudesAdoptante: [],
  };
  tipo_doc: string = '';
  localidad: string = '';
  file!: File;
  photoSelected: string | ArrayBuffer = '';
  localidades: any[] = [
    '1.Usaquén',
    '2.Chapinero',
    '3.Santa Fé',
    '4.San Cristobal',
    '5.Usme',
    '6. Tunjuelito',
    '7.Bosa',
    '8.Kennedy',
    '9.Fontibón',
    '10.Engativá',
    '11.Suba',
    '12.Barrios Unidos',
    '13.Teusaquillo',
    '14.Los Mártires',
    '15.Antonio Nariño',
    '16.Puente Aranda',
    '17.Candelaria',
    '18.Rafael Uribe Uribe',
    '19.Ciudad Bolivar',
    '20.Sumapaz',
  ];

  documentos: String[] = [
    'Cédula de ciudadanía',
    'Cédula de extranjería',
    'Pasaporte',
  ];
  generos: String[] = ['Masculino', 'Femenino'];

  constructor(
    private authService: LoginService,
    private adoptanteService: AdoptanteService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.adoptanteService.getAdoptanteById(this.userId).subscribe((res) => {
      this.adoptante = res;
      this.genero = res.genero;
      this.localidad = res.localidad;
      this.tipo_doc = res.tipo_doc;
    });
  }

  onPhotoSelected(event: any): void {
    if (event.target?.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      //image preview
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result as string);
      reader.readAsDataURL(this.file);
    }
  }

  updateAdoptante(
    nombre: HTMLInputElement,
    apellidos: HTMLInputElement,
    tipo_doc: string,
    num_doc: HTMLInputElement,
    fecha_nac: HTMLInputElement,
    genero: string,
    localidad: string,
    correo: HTMLInputElement,
    num_celular: HTMLInputElement,
    password: HTMLInputElement
  ) {
    this.adoptanteService
      .editarAdoptante(
        this.userId,
        nombre.value,
        apellidos.value,
        tipo_doc,
        num_doc.value,
        fecha_nac.value,
        genero,
        localidad,
        correo.value,
        num_celular.value,
        password.value,
        this.file
      )
      .subscribe((res) => {
        console.log('RESPUESTA', res);
        this._router.navigate(['dashboard-adoptante']);
      });
  }
}