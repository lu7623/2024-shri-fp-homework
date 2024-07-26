/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
 import Api from '../tools/api';
 import * as R from 'ramda';

 const api = new Api();

 const lessThan10 = R.pipe(R.split(''), R.length, R.gt(10));
 const moreThan2 = R.pipe(R.split(''), R.length, R.lt(2));
 const isPositiveNum  =R.pipe(R.startsWith('-'), R.not)
 const isNumber = R.pipe(R.add(0), R.type, R.equals('Number'));
 const validate = R.allPass([lessThan10, moreThan2, isPositiveNum, isNumber]);
 const toNumber = R.pipe(parseFloat, Math.round);
 const square = (num) => R.product([num, num]);
 const modulo = (num) => R.modulo(num, 3)
 const params = (number) => ({
   from: 10,
   to: 2,
   number,
 });
 
 const getNumber = (number) =>
   api.get('https://api.tech/numbers/base', params(number))
    
 
 const getAnimal = (id) =>
   api.get(`https://animals.tech/${id}`, id)
 
 
 const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {

 const tapWriteLog =(val) => R.tap(writeLog, val); 
 const handleValidationError = () => handleError('ValidationError');

 const processMath = R.pipe(
    tapWriteLog,
    R.length,
    tapWriteLog,
    square,
    tapWriteLog,
    modulo,
    tapWriteLog
)

 const processGetAnimal = R.pipe(
    processMath,
    getAnimal, 
    R.otherwise(handleError),
    R.andThen(
        R.when(R.has('result'),
        R.pipe(R.prop('result'), handleSuccess)
        )
    )
)


 const processRequests = R.pipe (
    toNumber,
    tapWriteLog,
    getNumber,
    R.otherwise(handleError),
    R.andThen(
        R.when(R.has('result'),
        R.pipe(R.prop('result'), processGetAnimal)
        )
    )
)

 const processValue = R.pipe(
   tapWriteLog,
   R.ifElse(validate, processRequests, handleValidationError)
   );

 processValue(value);
    }

export default processSequence;
