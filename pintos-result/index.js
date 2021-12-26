const { getInput, setFailed } = require("./node_modules/@actions/core");
//const { execSync } = require("child_process");

//const path = `${__dirname}/../pintos.checker.mjs`;
const path = `/home/runner/work/pintos-checker-result-test/pintos-checker-result-test/pintos.checker.mjs`;
//console.log(__dirname);
//console.log(execSync(`ls --color /home/runner/work/pintos-checker-result-test/pintos-checker-result-test/`).toString());
//console.log("------------------");
//console.log(execSync(`ls --color /home/runner/work/pintos-checker-result-test/`).toString());


console.log(path);

const getGrade = (result, {gradeExpr}) => {
  let {grade, total} = gradeExpr.exec(result).groups;
  grade = parseFloat(grade);
  total = parseFloat(total);

  return {grade, total};
};

const executeCheck = (name, utils, {grade, total}) => utils[name](grade, total);

import(path).then((utils) => {
  const results = getInput("results");
  const grade = getGrade(results, utils);
  const pass = executeCheck("threads", utils, grade);

  if (!pass) {
    setFailed("No cumple la regla");
  }

  const {showResults} = utils;

  showResults(console.log, results, grade.grade, grade.total);
});

