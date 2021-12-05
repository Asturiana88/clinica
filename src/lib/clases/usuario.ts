export class Usuario {
  uid!: any;
  password?: string = '';
  email!: string;
  nombre!: string;
  apellido!: string;
  edad!: number;
  dni!: number;
  fotoPerfil!: string;
  emailVerified!: boolean;
  approved = false;
  rol!: string;
}
