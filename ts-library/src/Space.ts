import {Floor} from "./Floor";
import {Building} from "./Building";
import { BOMAType } from "./BOMAType";


export class Space {

    constructor(name:string,area:number,floor:Floor){
        this.name = name;
        this.area = area;
        this.floor = floor;
    }
    name:string;
    rentable : number;
    area: number;
    bomaType: BOMAType;
    floor: Floor;
    building: Building;


    getRentableArea(s:number){
        return -1;

    }
}