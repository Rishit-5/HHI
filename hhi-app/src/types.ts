import { Input, array, boolean, custom, number, object, optional, string } from 'valibot';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ServedLocation {
  name: string;
  coordinates: Coordinates;
}

const StakeholderSchema = object(
  {
    name: string(),
    contact: string(),
    website: string(),
    logo: string(),
    description: string(),
    headquarter: string(),
    locationsServed: optional(array(string())),
    global: boolean(),
    tags: array(string()),
    headquarterCoordinates: object({
      lat: number(),
      lng: number()
    }),
    locationsServedCoordinates: optional(array(object({
      lat: number(),
      lng: number()
    }))),
  },
  [
    custom(
      input => {
        console.log(input.global)
        console.log(input.global == false)

        return !(input.global == false && input.locationsServed == undefined)
      }, 
      "If global is false, locationsServed must be defined"
    ),
  ]
)

export const DataSchema = array(StakeholderSchema)

export type Stakeholder = Input<typeof StakeholderSchema>

