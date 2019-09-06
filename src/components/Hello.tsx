import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Buttons } from "./Buttons";
import { DashBoard } from "./DashBoard";
import { Login } from "./Login";
import { Registration } from "./Registration";

interface IProps {
  name: string;
  enthusiasmLevel?: number;
}

export const Hello = ({ name, enthusiasmLevel = 1 }: IProps) => {
  const [currentEnthusiasm, setCurrentEnthusiasm] = React.useState(1);

  const getExclamationMarks = (numChars: number) => {
    return Array(numChars + 1).join("!");
  };

  const onIncrement = () => setCurrentEnthusiasm(currentEnthusiasm + 1);
  const onDecrement = () => setCurrentEnthusiasm(currentEnthusiasm - 1);

  if (enthusiasmLevel <= 0) {
    throw new Error("You could be a little more enthusiastic. :D");
  }

  return (
    <Router>
      <div>
        <div>
          This is my first {name + getExclamationMarks(enthusiasmLevel)}
        </div>
        <div>
          <button onClick={onDecrement}>-</button>
          <button onClick={onIncrement}>+</button>
        </div>
        <div>{currentEnthusiasm}</div>
      </div>

      <Route path="/" exact={true} component={Buttons} />
      <Route path="/login" component={Login} />
      <Route path="/registration" component={Registration} />
      <Route path="/dashboard" component={DashBoard} />
    </Router>
  );
};
