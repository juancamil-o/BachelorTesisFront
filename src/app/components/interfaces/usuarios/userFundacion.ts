import { EntidadPublicacion } from '../entidadPublicacion';
import { PuntoInteres } from '../entidadPuntoInteres';

export interface UserFundacion {
  nombreFund: string;
  nombreEncar: string;
  apellidosEncar: string;
  tipo_doc: string;
  num_doc: number;
  fecha_creacion: string;
  latitud: number;
  longitud: number;
  correo: string;
  distancia: string;
  duracion: string;
  num_celular: string;
  password: string;
  urlImg: string;
  tipo_usuario: string;
  direccion: string;
  mision: string;
  vision: string;
  publicaciones: Array<EntidadPublicacion>;
  puntos: Array<PuntoInteres>
  ubicacion: any;
  _id: string;
}
