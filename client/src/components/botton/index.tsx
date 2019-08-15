import React from 'react';
import injectSheet from 'react-jss';

import fill, {
  ReactComponent as ReactFill
} from "../../svg/fill.svg";

console.log(fill);
console.log(ReactFill)

const styles = {
  button: {
    display: 'inline-flex',
    height: 60,
  },
  back: {
    height: 100
  }
}

const Button = injectSheet(styles)(({classes, chirldren}) => {
  console.log(chirldren)
  return (
    <div className={classes['button']}>
      <span>1231</span>
      <div className={classes['back']}></div>
    </div>
  )
})

// class Button extends React.Component<>{
//   render () {

//   }
// }

export default Button