import { curry, map, prop } from "@mostly-adequate/support";
import flk from "folktale/concurrency/task/index.js";
import core from "@actions/core";

const path = "./pintos.checker.js";

let checkerModule = flk.task((resolver) => {
  import(path).then(resolver.resolve).catch(resolver.reject);
});

// getGrade :: String -> {gradeExpr: RegExpr} -> {grade: Float, total: Float}
const getGrade = curry((result, {gradeExpr}) => {
  let {grade, total} = gradeExpr.exec(result).groups;
  grade = parseFloat(grade);
  total = parseFloat(total);

  return {grade, total};
});

const getGradeWithRegExp = getGrade(core.getInput("results"));

// Task of {grade: Float, total: Float}
const grade = map(getGradeWithRegExp, checkerModule);

const buildCheck = curry((name, checker) => {
  return map(prop(name), checker);
});

const checker = buildCheck("threads", checkerModule);

const app = checker.chain((executeCheck) => map(executeCheck, grade));

app.run().promise().then((pass) => {
  if (!pass) {
    core.setFailed("No cumple la regla");
  }
});

