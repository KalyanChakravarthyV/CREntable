
import { Space } from "../src/Space";
import { Rentable } from "../src/Rentable";
import { BOMAType } from "../src/BOMAType";
import { Floor } from "../src/Floor";
import { Building } from "../src/Building";
// import {expect, jest, test} from '@jest/globals';

let spaces: Space[] = new Array();

let myNewBuilding = new Building("My New Building");

let fifthFloor = new Floor('5th Floor', 1000, myNewBuilding);
let sixthFloor = new Floor('6th Floor', 1000, myNewBuilding);
let seventhFloor = new Floor('7th Floor', 1000, myNewBuilding);
let tenthFloor = new Floor('10th Floor', 1000, myNewBuilding);

let allFloors = [fifthFloor, sixthFloor, seventhFloor, tenthFloor];

//Add 600 SFT Assignable spaces to all floors - 50*4

allFloors.forEach((f) => {
    for (let i = 0; i < 50; i++) {

        let s = new Space('AA-' + i, 12, f);
        s.area = 12;
        s.bomaType = BOMAType.ASSIGNABLE;
        spaces.push(s);
    }
});


//Add 100 Buiding Common to Fifth Floor - 2
(() => {
    for (let i = 0; i < 2; i++) {

        let s = new Space("BC-" + i, 50, fifthFloor);
        s.bomaType = BOMAType.BUILDING_COMMON;
        s.floor = fifthFloor;
        spaces.push(s);

    }
})();

//Add 60 FC, 20 VP to Sixth Floor - 5
(() => {
    for (let i = 0; i < 3; i++) {
        let s = new Space("FC-" + i, 20, sixthFloor);
        s.bomaType = BOMAType.FLOOR_COMMON;
        spaces.push(s);
    }

    for (let i = 0; i < 2; i++) {
        let s = new Space("VP-" + i, 10, sixthFloor);
        s.bomaType = BOMAType.VERTICAL_PENETRATION;
        spaces.push(s);
    }

})();

//Add 36 FC, 45 VP to Seventh Floor - 6
//SC = 1000 - (36+45+600)
(() => {
    for (let i = 0; i < 3; i++) {
        let s = new Space("FC-" + i, 12, seventhFloor);
        s.bomaType = BOMAType.FLOOR_COMMON;
        spaces.push(s);

    }

    for (let i = 0; i < 3; i++) {
        let s = new Space("VP-" + i, 15, seventhFloor);
        s.bomaType = BOMAType.VERTICAL_PENETRATION;
        spaces.push(s);
    }
})();

const rentable = new Rentable();


const array = [0, 1, 2, 3, 4, 5];
const myObj = Object.groupBy(array, (num, index) => {
    return num % 2 === 0 ? "even" : "odd";
});

test('Building Common for My New Building ', () => {

    expect(spaces.length).toBe(213);
    // expect(myObj["even"].length).toBe(2);
    rentable.calculateBuildingCommon(spaces);
    expect(myNewBuilding.buildingCommon).toBe(100);
});

rentable.calculateFloorTotals(spaces);


test('Floor Totals for Fifth Floor ', () => {

    expect(fifthFloor.secondaryCirculation).toBe(300);
    expect(fifthFloor.floorCommon).toBe(300);
    expect(fifthFloor.verticalPenetration).toBe(0);
    expect(fifthFloor.totalAssignable).toBe(600);



});

test('Floor Totals for Sixth Floor ', () => {

    expect(sixthFloor.floorCommon).toBe(380);
    expect(sixthFloor.verticalPenetration).toBe(20);
    expect(sixthFloor.totalAssignable).toBe(600);


});

test('Floor Totals for Seventh Floor ', () => {

    expect(seventhFloor.verticalPenetration).toBe(45);
    expect(seventhFloor.secondaryCirculation).toBe(1000 - (36+45+600));
    expect(seventhFloor.floorCommon).toBe((1000 - (36+45+600))+ 36);



});

test('Floor Common for Tenth Floor ', () => {


    expect(tenthFloor.floorCommon).toBe(tenthFloor.secondaryCirculation);


});