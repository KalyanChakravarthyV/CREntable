import {Space} from "./Space";
import {Floor} from "./Floor";

export class Building {

    constructor(name:string){
        this.name = name;
    }
    name:String;
    totalRentable : number;
    totalAssignable: number;
    floors: Floor[];
    spaces: Space[];

    buildingCommon :number;
    buildingRU:number;
    verticalPenetration:number;
    secondaryCirculation:number;

}