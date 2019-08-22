import React from 'react'
import injectSheet from 'react-jss'
import { SketchPicker } from 'react-color';

import { TransitionMotion, spring } from 'react-motion'


const styles = {
  'corlor-control': {
    position: 'relative',
  },
  'color-picker': {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: 'calc(100% + 10px)',
    padding: '10px',
    borderRadius: '5px',
    background: 'rgba(0,0,0,.7)',
  },
  'triangle-wrapper': {
    position: 'relative'
  },
  triangle: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '-20px',
    width: 0,
    height: 0,
    border: '5px solid transparent',
    borderBottomColor: 'rgba(0,0,0,.7)',
  }
}


class ColorControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
    }
    this.handleChangeComplete = (color) => {
      this.props.colorChange(color)
    }
  }
  componentDidMount() {

    if (document) {
      document.body.addEventListener('click', this.registerClickEvent)
    }

  }
  componentWillUnmount() {

    if (document) {
      document.body.removeEventListener('click', this.registerClickEvent)
    }

  }
  registerClickEvent = (event) => {
    let { modalShow } = this.state
    modalShow && this.hide()
  }
  hide() {
    this.setState({
      modalShow: false
    })
  }
  handleClick() {
    this.setState({
      modalShow: true
    })
  }
  willEnter() {
    return {
      opacity: .4
    }
  }
  willLeave() {
    return {
      opacity: spring(1)
    }
  }
  render() {
    let { classes } = this.props
    let { modalShow } = this.state;
    return (
      <div className={classes['corlor-control']} onClick={this.handleClick.bind(this)}>
        <div className="iconfont icon-font" style={{ color: '' }}></div>
        
      </div>
    );
  }
}

export default injectSheet(styles)(ColorControl);

{/* <div key={inStyles[0].key}
              style={{
                opacity: inStyles[0].style.opacity,
              }}
              className={classes['color-picker']}
            >
              <div className={classes['triangle-wrapper']}>
                <div className={classes.triangle}></div>
              </div>
              <SketchPicker presetColors={[]} onChangeComplete={this.handleChangeComplete}></SketchPicker>
            </div> */}