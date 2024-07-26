/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import * as R from 'ramda';
import { COLORS, SHAPES } from '../constants';


const isColor = (color, shape) => R.propEq(shape, color);
const isRed =  R.partial(isColor, [COLORS.RED]);
const isGreen =  R.partial(isColor, [COLORS.GREEN]);
const isWhite =  R.partial(isColor, [COLORS.WHITE]);
const isBlue =  R.partial(isColor, [COLORS.BLUE]);
const isOrange =  R.partial(isColor, [COLORS.ORANGE]);
const filterColor = (color, object) => R.filter(R.equals(color), object);
const colorLength = (color) => {
    const colorShape = R.partial(filterColor, [color])
    const length = R.pipe(R.keys, R.length)
    return R.pipe(colorShape, length)
}


// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (shapes) => {
  
    const allPass = R.allPass([isRed(SHAPES.STAR), isGreen(SHAPES.SQUARE), isWhite(SHAPES.TRIANGLE), isWhite(SHAPES.CIRCLE)]);

    return allPass(shapes)
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (shapes) => {
  
    const allGreenLength = colorLength(COLORS.GREEN);
    const isMoreThan2Green = R.pipe(allGreenLength, R.lte(2));
    const allPass = R.allPass([isMoreThan2Green]);

    return allPass(shapes)
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 =  (shapes) => {
  
    const allRedLength = colorLength(COLORS.RED);
    const allBlueLength = colorLength(COLORS.BLUE);
    const isBlueEqualsRed = R.converge(R.equals, [allBlueLength, allRedLength]);
    const allPass = R.allPass([isBlueEqualsRed]);

    return allPass(shapes)
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 =(shapes) => {
  
    const allPass = R.allPass([isBlue(SHAPES.CIRCLE),isRed(SHAPES.STAR), isOrange(SHAPES.SQUARE)]);

    return allPass(shapes)
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 =  (shapes) => {
  
    const colorsExceptWhite =R.filter(R.pipe( R.equals(COLORS.WHITE), R.not), R.values(COLORS))
    const moreThan3LengthCheckArray = R.map(x => R.pipe(colorLength(x), R.lte(3)), colorsExceptWhite);
    const anyPass = R.anyPass(moreThan3LengthCheckArray);

    return anyPass(shapes)
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (shapes) => {
  
    const allGreenLength = colorLength(COLORS.GREEN);
    const allRedLength = colorLength(COLORS.RED);
    const isTwoGreen = R.pipe(allGreenLength, R.equals(2));
    const isOneRed = R.pipe(allRedLength, R.equals(1));
    const allPass = R.allPass([isTwoGreen, isOneRed, isGreen(SHAPES.TRIANGLE)]);

    return allPass(shapes)
};
// 7. Все фигуры оранжевые.
export const validateFieldN7 =  (shapes) => {
  
    const allOrangeLength = colorLength(COLORS.ORANGE);
    const isFourOrange = R.pipe(allOrangeLength, R.equals(4));
    const allPass = R.allPass([isFourOrange]);

    return allPass(shapes)
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = (shapes) => {
  
    const isNotRedStar = R.pipe(isRed(SHAPES.STAR), R.not);
    const isNotWhiteStar = R.pipe(isWhite(SHAPES.STAR), R.not);
    const allPass = R.allPass([isNotRedStar, isNotWhiteStar]);

    return allPass(shapes)
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (shapes) => {
  
    const allGreenLength = colorLength(COLORS.GREEN);
    const isFourGreen = R.pipe(allGreenLength, R.equals(4));
    const allPass = R.allPass([isFourGreen])

    return allPass(shapes)
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 =  (shapes) => {
  

    const isSameColor = R.converge(R.equals, [R.prop(SHAPES.TRIANGLE), R.prop(SHAPES.SQUARE)]);
    const isNotWhite = R.pipe(isWhite(SHAPES.TRIANGLE), R.not)
    const allPass = R.allPass([isSameColor, isNotWhite]);

    return allPass(shapes)
};
