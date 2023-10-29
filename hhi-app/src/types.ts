export type Coordinates = [number, number];

export interface ServedLocation {
  name: string;
  coordinates: Coordinates;
}

export interface StakeholderInfo {
  logo: string;
  emailAddress: string;
  organizationName: string;
  headquarter: string;
  headquarterCoordinates: Coordinates;
  locationsServed: Record<string, Coordinates>;
  description: string;
  tags: string[];
  website: string;
}

export interface InfoPanelProps {
  data: StakeholderInfo[];
  isVisible: boolean;
  onClose: () => void;
}

export {};
