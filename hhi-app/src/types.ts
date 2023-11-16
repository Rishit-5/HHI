export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ServedLocation {
  name: string;
  coordinates: Coordinates;
}

export interface StakeholderInfo {
  emailAddress: string;
  organizationName: string;
  logo: string;
  description: string;
  website: string;
  headquarter: string;
  locationsServed: string[];
  tags: string[];
  headquarterCoordinates: Coordinates;
  locationServedCoordinates: Coordinates[];
}

