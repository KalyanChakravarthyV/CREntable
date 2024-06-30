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
            let total = 0;
            spaces.forEach(s => { if (s.floor.building === b && s.bomaType === BOMAType.BUILDING_COMMON) total += s.area; });
            b.buildingCommon = total;

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
            f.floorRU = (assignable + floorCommon) / assignable;


        });

    }
}