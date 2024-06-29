
import { Space } from "../src/Space";
import { Rentable } from "../src/Rentable";
import { BOMAType } from "../src/BOMAType";
import { Floor } from "../src/Floor";
import { Building } from "../src/Building";
// import {expect, jest, test} from '@jest/globals';

let spaces: Space[] = new Array();

let myNewBuilding = new Building("My New Building");
let tenthFloor = new Floor('Ground Floor', 100, myNewBuilding);

for (let i = 0; i < 18; i++) {

    let s = new Space('GG-' + i, 12, tenthFloor);
    s.area = 12;
    s.bomaType = BOMAType.ASSIGNABLE;
    spaces.push(s);

}

let fifthFloor = new Floor('5th Floor', 100, myNewBuilding);


for (let i = 0; i < 2; i++) {

    let s = new Space("AA" + i, 30, fifthFloor);
    // s.area = 100;

    s.bomaType = BOMAType.BUILDING_COMMON;
    s.floor = fifthFloor;
    spaces.push(s);

}

let sixthFloor = new Floor('6th Floor', 100, myNewBuilding);


for (let i = 0; i < 5; i++) {

    let s = new Space("BB-" + i, 12, sixthFloor);
    // s.area = 10;
    s.bomaType = BOMAType.FLOOR_COMMON;
    spaces.push(s);

}


let seventhFloor = new Floor('6th Floor', 100, myNewBuilding);


for (let i = 0; i < 5; i++) {

    let s = new Space("BB-" + i, 12, seventhFloor);
    // s.area = 10;
    if (i % 2 == 0) s.bomaType = BOMAType.FLOOR_COMMON;
    spaces.push(s);

}
const rentable = new Rentable();


const array = [0, 1, 2, 3, 4, 5];
const myObj = Object.groupBy(array, (num, index) => {
    return num % 2 === 0 ? "even" : "odd";
});

test('Building Common for My New Building ', () => {




    expect(spaces.length).toBe(30);

    // expect(myObj["even"].length).toBe(2);


    rentable.calculateBuildingCommon(spaces);

    expect(myNewBuilding.buildingCommon).toBe(60);


});

rentable.calculateFloorCommon(spaces);


test('Floor Common for Sixth Floor ', () => {




    expect(spaces.length).toBe(30);

    expect(sixthFloor.floorCommon).toBe(60);


});
test('Floor Common for Seventh Floor ', () => {


    expect(seventhFloor.floorCommon).toBe(36);


});

test('Floor Common for Tenth Floor ', () => {


    expect(tenthFloor.floorCommon).toBe(0);


});