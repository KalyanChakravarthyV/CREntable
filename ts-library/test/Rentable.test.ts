
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

//Add 600 SFT Assignable, 50 VP spaces to all floors - 52*4

allFloors.forEach((f) => {
    for (let i = 0; i < 50; i++) {

        let s = new Space('AA-' + i, 12, f);
        s.area = 12;
        s.bomaType = BOMAType.ASSIGNABLE;
        spaces.push(s);
    }

    for (let i = 0; i < 2; i++) {
        let s = new Space("VP-" + i, 25, f);
        s.bomaType = BOMAType.VERTICAL_PENETRATION;
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

//Add 60 FC to Sixth Floor - 3
(() => {
    for (let i = 0; i < 3; i++) {
        let s = new Space("FC-" + i, 20, sixthFloor);
        s.bomaType = BOMAType.FLOOR_COMMON;
        spaces.push(s);
    }



})();

//Add 36 FC, 45+50 VP to Seventh Floor - 6
//SC = 1000 - (36+95+600)
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

/*
const array = [0, 1, 2, 3, 4, 5];
const myObj = Object.groupBy(array, (num, index) => {
    return num % 2 === 0 ? "even" : "odd";
});
*/

rentable.calculateFloorTotals(spaces);
rentable.calculateBuildingCommon(spaces);
rentable.calculateRentable(spaces);


test('Building Common for My New Building ', () => {

    expect(spaces.length).toBe(219);
    // expect(myObj["even"].length).toBe(2);
    expect(myNewBuilding.buildingCommon).toBe(100);
    expect(myNewBuilding.totalAssignable).toBe(2400);

});



test('Floor Totals for Fifth Floor ', () => {

    expect(fifthFloor.secondaryCirculation).toBe(250);
    expect(fifthFloor.floorCommon).toBe(250);
    expect(fifthFloor.verticalPenetration).toBe(50);
    expect(fifthFloor.totalAssignable).toBe(600);



});

test('Floor Totals for Sixth Floor ', () => {

    expect(sixthFloor.floorCommon).toBe(350);
    expect(sixthFloor.verticalPenetration).toBe(50);
    expect(sixthFloor.totalAssignable).toBe(600);


});

test('Floor Totals for Seventh Floor ', () => {

    expect(seventhFloor.verticalPenetration).toBe(50+45);
    expect(seventhFloor.secondaryCirculation).toBe(1000 - (36+95+600));
    expect(seventhFloor.floorCommon).toBe((1000 - (36+95+600))+ 36);



});

test('Floor Common for Tenth Floor ', () => {


    expect(tenthFloor.floorCommon).toBe(tenthFloor.secondaryCirculation);


});




test('Building Totals for My New Building ', () => {

    expect(myNewBuilding.buildingCommon).toBe(100);
    expect(myNewBuilding.totalAssignable).toBe(2400);
    // expect(myNewBuilding.totalRentable).toBe((950 * 4) - 45);


});