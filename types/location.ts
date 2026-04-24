export interface Location {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  distance: number;
  address: string;
  lat: number;
  lng: number;
  image: string;
  isOpen: boolean;
  openTime?: string;
  amenities?: string[];
  description?: string;
  phone?: string;
  website?: string;
}

export interface SearchedLocation {
  id?: number;
  longitude?: string | number;
  latitude?: string | number;
  address?: string;
  address_bn?: string;
  city?: string;
  city_bn?: string;
  area?: string;
  area_bn?: string;
  postCode?: string | number;
  pType?: "Shop" | "Residence" | "Office" | "Industry" | "Food" | string;
  uCode?: string;
}
