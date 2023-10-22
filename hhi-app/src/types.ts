export type Coordinates = [number, number];

export interface ServedLocation {
  name: string;
  coordinates: Coordinates;
}

export interface StakeholderInfo {
  logo: string;
  "Email Address": string;
  "Organization Name": string;
  "Headquarter Location": string;
  "Headquarter Coordinates": Coordinates;
  "Served Locations": Record<string, Coordinates>;
  "Descriptive Blurb": string;
  "Tags/themes": string[];
  Website: string;
}

export interface InfoPanelProps {
  data: StakeholderInfo[];
  isVisible: boolean;
  onClose: () => void;
}

export {};
