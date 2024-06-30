import { Space } from "./Space";
import { Floor } from "./Floor";

import { Building } from "./Building";
import { BOMAType } from "./BOMAType";
export class Rentable {

    calculateBuildingCommon(spaces: Space[]) {


        // let buildingCommonSpaces = Object.groupBy(spaces, ({ boma_type }) => boma_type);
        let buildings: Set<Building> = new Set();

        spaces.forEach(s => buildings.add(s.floor.building));

        buildings.forEach(b => {
            let buildingCommon = 0, totalFloorAssignable = 0,totalAssignable = 0, verticalPenetration = 0;
            spaces.forEach(s => {
                if (s.building === b && s.bomaType === BOMAType.ASSIGNABLE) {totalFloorAssignable += (s.area*s.floor.floorRU);
                    totalAssignable += s.area;
                }
                else if (s.building === b && s.bomaType === BOMAType.BUILDING_COMMON) buildingCommon += s.area;
                else if (s.building === b && s.bomaType === BOMAType.VERTICAL_PENETRATION) verticalPenetration += s.area;
            });

            b.buildingCommon = buildingCommon;
            b.verticalPenetration = verticalPenetration;
            b.totalAssignable = totalAssignable;
            b.buildingRU = (totalFloorAssignable + buildingCommon) / totalFloorAssignable;

            console.log(`Building RU for ${b.name} :- ${b.buildingRU}`)

        });

    }

    calculateFloorTotals(spaces: Space[]) {

        let floors: Set<Floor> = new Set();

        spaces.forEach(s => floors.add(s.floor));

        floors.forEach(f => {
            let assignable = 0, floorCommon = 0, verticalPenetration = 0, totalArea = 0;

            spaces.forEach(s => {
                if (f != s.floor) return;

                totalArea += s.area;

                if (s.bomaType === BOMAType.ASSIGNABLE)
                    assignable += s.area;
                else if (s.bomaType === BOMAType.FLOOR_COMMON)
                    floorCommon += s.area;
                else if (s.bomaType === BOMAType.VERTICAL_PENETRATION)
                    verticalPenetration += s.area;

            })
            f.secondaryCirculation = ((f.measuredArea - totalArea) > 0 ? f.measuredArea - totalArea : 0);

            f.floorCommon = floorCommon + f.secondaryCirculation;
            f.verticalPenetration = verticalPenetration;
            f.totalAssignable = assignable;
            f.floorRU = (f.totalAssignable + f.floorCommon) / f.totalAssignable;

            console.log(`Floor RU for ${f.name} :- ${f.floorRU}`)
        });

    }
    
    calculateRentable(spaces: Space[]) {

        const totalRentableMap = new Map<Building, Number>();

        spaces.forEach(s => {
            s.rentable = (s.bomaType === BOMAType.ASSIGNABLE) ?
                (s.area * s.floor.floorRU * s.building.buildingRU) : 0

            if(s.rentable === 0 ) return;

            let rentable = totalRentableMap.get(s.building) ? totalRentableMap.get(s.building).valueOf() : 0;
            // console.log(`${s.bomaType} : ${s.rentable}, ${rentable}`);
            totalRentableMap.set(s.building, new Number(rentable + s.rentable));
        });



        for (let [b, totalRentable] of totalRentableMap) {
            b.totalRentable = totalRentable.valueOf();
        }
        console.log(spaces);

    }

}
