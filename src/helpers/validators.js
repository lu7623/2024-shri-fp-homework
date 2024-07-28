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

const allGreenLength = colorLength(COLORS.GREEN);
const allRedLength = colorLength(COLORS.RED);
const allBlueLength = colorLength(COLORS.BLUE);
const allOrangeLength = colorLength(COLORS.ORANGE);


const isMoreThan2Green = R.pipe(allGreenLength, R.lte(2));
const isTwoGreen = R.pipe(allGreenLength, R.equals(2));
const isOneRed = R.pipe(allRedLength, R.equals(1));
const isFourOrange = R.pipe(allOrangeLength, R.equals(4));
const isFourGreen = R.pipe(allGreenLength, R.equals(4));
const isNotRedStar = R.pipe(isRed(SHAPES.STAR), R.not);
const isNotWhiteStar = R.pipe(isWhite(SHAPES.STAR), R.not);
const isTriangleAndSquareSame = R.converge(R.equals, [R.prop(SHAPES.TRIANGLE), R.prop(SHAPES.SQUARE)]);
const isNotWhiteTriangle = R.pipe(isWhite(SHAPES.TRIANGLE), R.not);
const isBlueEqualsRed = R.converge(R.equals, [allBlueLength, allRedLength]);

const colorsExceptWhite =R.filter(R.pipe( R.equals(COLORS.WHITE), R.not), R.values(COLORS))
const moreThan3LengthCheckArray = R.map(x => R.pipe(colorLength(x), R.lte(3)), colorsExceptWhite);


// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (shapes) => {
    return R.allPass([isRed(SHAPES.STAR), isGreen(SHAPES.SQUARE), isWhite(SHAPES.TRIANGLE), isWhite(SHAPES.CIRCLE)])(shapes)
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (shapes) => {
    return isMoreThan2Green(shapes)
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 =  (shapes) => {
    return isBlueEqualsRed(shapes)
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 =(shapes) => {
    return R.allPass([isBlue(SHAPES.CIRCLE),isRed(SHAPES.STAR), isOrange(SHAPES.SQUARE)])(shapes)
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 =  (shapes) => {
    return R.anyPass(moreThan3LengthCheckArray)(shapes)
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (shapes) => {
     return R.allPass([isTwoGreen, isOneRed, isGreen(SHAPES.TRIANGLE)])(shapes)
};
// 7. Все фигуры оранжевые.
export const validateFieldN7 =  (shapes) => {
    return isFourOrange(shapes)
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = (shapes) => {
    return R.allPass([isNotRedStar, isNotWhiteStar])(shapes)
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (shapes) => {
  return isFourGreen(shapes)
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 =  (shapes) => {  
   return R.allPass([isTriangleAndSquareSame, isNotWhiteTriangle])(shapes);
};
