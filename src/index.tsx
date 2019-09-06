import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello } from "./components";
import './index.css';


class App extends React.Component<{}, {}> {
  public render() {
      return <Hello name="TypeScript" enthusiasmLevel={10} />;
  }
}


ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
