import React from 'react'
import injectSheet, {StyledComponentProps} from 'react-jss'
import {ShapeOverlays} from '../index'

const styles = {
  button: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
    height:32,
    padding: '0 12px',
    border: '1px solid var(--color)',
    borderRadius: '4px',
    color: 'blue',
    overFlow: 'hidden',
    '& span': {
      position: 'relative',
      zIndex: 1,
    }
  }
}



type State = {
  isOpen: boolean,
}

class Button extends React.Component<StyledComponentProps, State> {
  constructor (props: StyledComponentProps) {
    super(props)
    this.state = {
      isOpen: false
    }
  }
  mouseEnterHandle () {

  }
  mouseLeaveHandle () {

  }
  render () {
    let {children = 'Button', classes} = this.props
    let cls = classes as any
    return (
      <div className={cls.button} onMouseEnter={this.mouseEnterHandle.bind(this)} onMouseLeave={this.mouseLeaveHandle.bind(this)}>
        <span>{children}</span>
        <ShapeOverlays pathNum={1}></ShapeOverlays>
      </div>
    )
  }
}

export default injectSheet(styles)(Button);