import logo from "../assets/logo.png";
import "../components/InfoPanel/InfoPanel";
import { StakeholderInfo } from "../types";

export const stakeholders: StakeholderInfo[] = [
  {
    logo: logo,
    "Email Address": "",
    "Organization Name": "Economic Community for West African States (ECOWAS)",
    "Headquarter Location": "Abuja, Nigeria",
    "Headquarter Coordinates": [51.505, -0.09],
    "Served Locations": {
      Benin: [51.515, -0.08],
      "Burkina Faso": [51.52, -0.07],
      "Cabo Verde": [51.525, -0.06],
    },
    "Descriptive Blurb":
      "The aim of the Community is to promote co-operation and integration, leading to the establishment of an economic union in West Africa in order to raise the living standards of its peoples, and to maintain and enhance economic stability, foster relations-among Member States and contribute to the progress and development of the African continent.",
    "Tags/themes": [
      "West Africa",
      "conflict prevention",
      "peacekeeping",
      "governmental organization",
    ],
    Website: "https://ecowas.int/",
  },
  {
    logo: "path/to/logo.png",
    "Email Address": "sampleA@example.com",
    "Organization Name": "Sample Organization A",
    "Headquarter Location": "Washington, DC",
    "Headquarter Coordinates": [51.49, -0.08],
    "Served Locations": {
      "Country X": [51.485, -0.08],
      "Community Y": [51.48, -0.09],
    },
    "Descriptive Blurb": "Sample Organization A is focused on ...",
    "Tags/themes": ["Healthcare", "Education"],
    Website: "https://www.hotosm.org/",
  },
  {
    logo: "path/to/logo.png",
    "Email Address": "sampleB@example.com",
    "Organization Name": "Sample Organization B",
    "Headquarter Location": "City B, Country B",
    "Headquarter Coordinates": [51.51, -0.1],
    "Served Locations": {
      "Country Z": [51.515, -0.11],
      "Community W": [51.52, -0.12],
    },
    "Descriptive Blurb": "Sample Organization B specializes in ...",
    "Tags/themes": ["Sustainability", "Environment"],
    Website: "https://sampleB.org",
  },
];

// {
//   id: 1,
//   name: "Organization A",
//   location: [51.505, -0.09],
//   website: "https://orga.com",
//   description: "Organization A is focused on environmental sustainability.",
//   tags: ["Environment", "Sustainability"],
//   countryPolygons: {
//     Country1: [
//       [51.6, -0.1],
//       [51.7, -0.2],
//       [51.8, -0.3],
//       [51.6, -0.1],
//     ],
//   },
// },
// {
//   id: 2,
//   name: "Organization B",
//   location: [51.605, -0.095],
//   website: "https://orgb.com",
//   description: "Organization B is into educational reforms.",
//   tags: ["Education", "Reform"],
//   countryPolygons: {
//     Country2: [
//       [51.7, -0.2],
//       [51.8, -0.3],
//       [51.9, -0.4],
//       [51.7, -0.2],
//     ],
//   },
// },
// {
//   id: 3,
//   name: "Organization C",
//   location: [51.615, -0.085],
//   website: "https://orgc.com",
//   description: "Organization C promotes health and wellness.",
//   tags: ["Health", "Wellness"],
//   countryPolygons: {
//     Country3: [
//       [51.8, -0.3],
//       [51.9, -0.4],
//       [52.0, -0.5],
//       [51.8, -0.3],
//     ],
//   },
// },
