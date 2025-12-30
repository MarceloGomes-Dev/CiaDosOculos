
export enum Category {
  FRAMES = 'Armações',
  LENSES = 'Lentes',
  ACCESSORIES = 'Acessórios'
}

export type PageView =
  | 'home'
  | 'Armações'
  | 'Lentes'
  | 'Acessórios'
  | 'duvidas'
  | 'budget-chat';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;

  // Preços
  price: number | string;     // Preço final (Pode ser string para 'Sob Consulta')
  originalPrice?: number;     // Preço antigo (DE) – opcional

  imageUrl: string;
  brand: string;
  tags: string[];

  measurements?: string;
  color?: string;
  material?: string;
  
  // Especificações técnicas de Lentes
  sphRange?: string; // Esférico suportado
  cylRange?: string; // Cilíndrico suportado
  addRange?: string; // Adição suportada (Multifocais)

  isNew?: boolean;
  onSale?: boolean;

  gender?: 'Feminino' | 'Masculino' | 'Unissex' | 'Infantil';
  frameColor?: string;

  likes?: number;
  rating?: number;
}

export interface BudgetItem extends Product {
  quantity: number;
}

export interface PrescriptionField {
  spherical: string;
  cylindrical: string;
  axis: string;
}

export interface PrescriptionData {
  rightEye: PrescriptionField;
  leftEye: PrescriptionField;
  addition?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  text: string;
  imageUrl: string;
  rating: number;
}
