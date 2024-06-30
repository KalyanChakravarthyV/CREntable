import {Space} from "./Space";
import {Building} from "./Building";
export class Floor {

    constructor(name:string,measuredArea:number, building:Building){
        this.name = name;
        this.measuredArea = measuredArea;
        this.building = building;

    }
    name:String;
    building: Building;
    spaces: Space[];
    
    totalAssignable:number;// Sum of all assignable area of spaces
    totalRentable : number;// Sum of all rentable area of spaces
    totalArea: number; // Sum of all area of spaces
    measuredArea: number;// Gross area
    floorCommon:number;//Total floor common including secondary circulation
    secondaryCirculation:number; // measuredArea - totalArea
    verticalPenetration:number;// Sum of area all spaces whose BOMAType = VP
    floorRU:number; // Rentable to Usable ratio at the floor

}