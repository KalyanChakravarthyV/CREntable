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

    calculateFloorCommon(spaces: Space[]) {

        let floors: Set<Floor> = new Set();

        spaces.forEach(s => floors.add(s.floor));

        floors.forEach(f => {
            let total = 0;

            spaces.forEach(s => { if (f === s.floor && s.bomaType === BOMAType.FLOOR_COMMON) total += s.area; })
            f.floorCommon = total;
        });

    }
}