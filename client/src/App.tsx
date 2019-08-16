import React from "react";
import "./App.css";

import {
  Header,
  Button
} from "./components";


type State = {
  isLight: boolean
}

class App extends React.Component<object, State>{
  constructor (props: object) {
    super(props);
    this.state = {
      isLight: true
    }
  }
  changeTheme () {
    let {isLight} = this.state;
    if (isLight) {
      document.getElementsByTagName('body')[0].classList.add('dark');
      isLight = false;
    } else {
      document.getElementsByTagName('body')[0].classList.remove('dark');
      isLight = true;
    }
    this.setState({
      isLight
    })
  }
  render () {
    return (
      <div>
        <Header />
        <Button>
          <div>123123</div>
        </Button>
        <Button></Button>
        <Button></Button>
        <button onClick={this.changeTheme.bind(this)}>更换主题</button>
      </div>
    )
  }
}

export default App;
