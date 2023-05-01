import * as moment from 'moment';
import 'moment/locale/es';

moment.locale('es')
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

export function date_TO_String(date_Object:Date) {
//     date_Object.toISOString()
//     const date = moment(date_Object).utc().format('YYYY-MM-DD HH:mm:ss');



// const stillUtc = moment.utc(date).toDate();
// const local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
    // const resultDateAux = moment(date_Object)
    
    // resultDateAux.locale(false);
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

    return moment(date_Object).format('DD/MM/YYYY HH:mm');
 }