import {Space} from "./Space";
import {Floor} from "./Floor";

export class Building {

    constructor(name:string){
        this.name = name;
    }
    name:String;
    totalRentable : number;
    totalArea: number;
    floors: Floor[];
    spaces: Space[];

    buildingCommon :number;
    verticalPenetration:number;
    secondaryCirculation:number;

}