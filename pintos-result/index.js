const { getInput, setFailed } = require("@actions/core");

const path = `../../pintos.checker.mjs`;
const phase = getInput("phase");
const results = getInput("results");

const getGrade = (result, {gradeExpr}) => {
  if (!result) {
    setFailed("La etapa anterior no produjo resultados");
    process.exit(1);
  }

  let {grade, total} = gradeExpr.exec(result).groups;
  grade = parseFloat(grade);
  total = parseFloat(total);

  return {grade, total};
};

const executeCheck = (name, utils, {grade, total}) => utils[name](grade, total);

customImport(path).then((utils) => {
  const grade = getGrade(results, utils);
  const pass = executeCheck(phase, utils, grade);

  if (!pass) {
    setFailed("No cumple la regla");
  }

  const {showResults} = utils;

  showResults(console.log, results, grade.grade, grade.total);
});

