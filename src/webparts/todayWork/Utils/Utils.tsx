import * as moment from 'moment';
import 'moment/locale/es';

moment.locale('es')
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

export function date_TO_String(date_Object:Date) {

    const resultDateAux = moment(date_Object)
    
    resultDateAux.locale(false);
    // get the year, month, date, hours, and minutes seprately and append to the string.
    // const date_String = date_Object.getDate() +
    //    "/" +
    //    (date_Object.getMonth() + 1) +
    //    "/" +
    //    +date_Object.getFullYear() +
    //    " " +
    //    +date_Object.getHours() +
    //    ":" +
    //    +date_Object.getMinutes();

    return resultDateAux.utc(false).format('LLLL')
 }