import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  button: {
    position: 'relative',
    display: 'inline-flex',
    width: 120,
    height: 60,
    color: '#fff',
    transition: 'all 0.3s cubic-bezier(0, 0.22, 0.3, 1)',
    background: '#e74c3c',
    overflow: 'hidden',
    '& div': {
      position: 'absolute',
      width:0,
      height:0,
      left: '-50%',
      bottom: '-50%',
      borderRadius: '50%',
      transition: 'all .8s cubic-bezier(0.1, 0.22, 0.3, 1)',
      background: '#2980b9',
    },
    '&:hover div': {
      width: 240,
      height: 120,
    }
  },
  back: {
    position: 'absolute',
    width:0,
    height:0,
    left: '-50%',
    bottom: '-50%',
    // filter: 'url(#filter)',
    borderRadius: '50%',
    transition: 'all .6s cubic-bezier(0.1, 0.22, 0.3, 1)',
    background: '#2980b9',
    '&:hover': {
      width: 240,
      height: 120,
    }
  }
}

function getId (name: string) {
  let tmp = Number(Math.random().toString().substr(3, 12) + Date.now()).toString(36);
  return `${name}-${tmp}`
}

const Button = injectSheet(styles)(({classes}) => {
  const id = getId(`button-svg`)
  return (
    <div className={classes['button']}>
      <span>1231</span>
      <div className={classes['back']} style={{filter: `url('#${id}')`}}></div>
      <svg width="0" height="0">
        <filter id={id}>
          {/* <feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="6" />
          <feDisplacementMap in="SourceGraphic" scale="100" /> */}
          <feTurbulence type="fractalNoise" baseFrequency=".01 .02" numOctaves="3"  />
          <feDisplacementMap  scale="100" in="SourceGraphic" seed="500"/>
        </filter>
      </svg>
    </div>
  )
})



export default Button