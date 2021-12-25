/** Modifique las funciones para personalizar los fallos */

export function threads({grade, total}) {
  return grade > 30;
}

/** Imprime a pantalla el mensaje
  * @param {Function} print función que imprime a pantalla
  * @param {string} results es el texto del input del action
  * @param {float} grade es la nota que sacó
  * @param {float} total es la nota máxima*/
export function showResults(print, results, grade, total) {
  print(`\x1b[32m${grade}/${total}\x1b[0m\n`);
  print(results);
}



// ------------------------------------------------------------
// No modifique si no es necesario
// ------------------------------------------------------------

/** Esta línea se usa para extraer la nota y el total
  Ejemplo:
...
tests/filesys/base/Rubric                       30/ 30   30.0%/ 30.0%
--------------------------------------------- --- --- ------ ------
    Total                                                   90.5%/100.0%

extrae:
  grade: 90.5
  total: 100.0
*/
export const gradeExpr = /Total(\t|\s)+(?<grade>\d+[.]\d)+%\/(?<total>\d+[.]\d+)%/mg;


