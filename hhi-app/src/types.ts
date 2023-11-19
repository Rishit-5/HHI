export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ServedLocation {
  name: string;
  coordinates: Coordinates;
}

export interface StakeholderInfo {
  name: string;
  email: string;
  website: string;
  logo: string;
  description: string;
  headquarter: string;
  locationsServed: string[];
  global: boolean;
  tags: string[];
  headquarterCoordinates: Coordinates;
  locationsServedCoordinates: Coordinates[];
}

