import {Space} from "./Space";
import {Building} from "./Building";
export class Floor {

    constructor(name:string,measuredArea:number, building:Building){
        this.name = name;
        this.measuredArea = measuredArea;
        this.building = building;

    }
    name:String;
    totalRentable : number;
    totalArea: number; // Sum of all area of spaces
    measuredArea: number;// Gross area
    building: Building;
    spaces: Space[];
    floorCommon:number;

    getRentableArea(s:number){
        return -1;
    }
}