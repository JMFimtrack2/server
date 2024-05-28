export interface Domicilio {
  id: number;
  codigo_postal: string;
  estado?: string;
  municipio?: string;
  colonia?: string;
  calle: string;
  numero_ext: number;
  numero_int?: number;
};
