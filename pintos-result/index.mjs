import core from "@actions/core";

const path = "./pintos.checker.js";

const getGrade = (result, {gradeExpr}) => {
  let {grade, total} = gradeExpr.exec(result).groups;
  grade = parseFloat(grade);
  total = parseFloat(total);

  return {grade, total};
};

const executeCheck = (name, utils, {grade, total}) => utils[name](grade, total);

import(path).then((utils) => {
  const results = core.getInput("results");
  const grade = getGrade(results, utils);
  const pass = executeCheck("threads", utils, grade);

  if (!pass) {
    core.setFailed("No cumple la regla");
  }

  const {showResults} = utils;

  showResults(console.log, results, grade.grade, grade.total);
});

//let checkerModule = flk.task((resolver) => {
  //import(path).then(resolver.resolve).catch(resolver.reject);
//});

//// getGrade :: String -> {gradeExpr: RegExpr} -> {grade: Float, total: Float}
//const getGrade = curry((result, {gradeExpr}) => {
  //let {grade, total} = gradeExpr.exec(result).groups;
  //grade = parseFloat(grade);
  //total = parseFloat(total);

  //return {grade, total};
//});

//const getGradeWithRegExp = getGrade(core.getInput("results"));

//// Task of {grade: Float, total: Float}
//const grade = map(getGradeWithRegExp, checkerModule);

//const buildCheck = curry((name, checker) => {
  //return map(prop(name), checker);
//});

//const checker = buildCheck("threads", checkerModule);

//const app = checker.chain((executeCheck) => map(executeCheck, grade));

//app.run().promise().then((pass) => {
  //if (!pass) {
    //core.setFailed("No cumple la regla");
  //}
//});



