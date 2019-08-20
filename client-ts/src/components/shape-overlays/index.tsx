import React from 'react';
import ease from '../../config/ease';

const SvgStyle: React.CSSProperties = {
  position: 'absolute',
  left:0,
  top:0,
  width: '100%',
  height: '100%',
}
const PathStyle: React.CSSProperties = {
  fill: 'var(--primary)',
}

interface State {
  d: Array<string>;
  numPoints: number;
  duration: number;
  delayPointsArray: Array<any>;
  delayPointsMax: number;
  delayPerPath: number;
  timeStart: number;
  isOpened: boolean;
  isAnimating: boolean;
}

interface IProps {
  pathNum: number;
}

class ShapeOverlays extends React.Component<IProps, State>{
  pathRef:  string | ((instance: SVGPathElement | null) => void) | React.RefObject<SVGPathElement>  | null | undefined; 
  constructor (props: IProps) {
    super(props)
    this.state = {
      d: [],
      numPoints: 4,
      duration: 400,
      delayPerPath: 50,
      delayPointsMax: 100,
      delayPointsArray: [],
      timeStart: 0,
      isOpened: false,
      isAnimating: false
    }
    this.pathRef = React.createRef();
  }
  public start () {
    console.log(this.pathRef)
    let { isAnimating } = this.state;
    if (isAnimating) {
      return false;
    }
    this.setState({
      isAnimating: true
    })
    setTimeout(() => {
      this.toggle();
    })
  }
  toggle () {
    let { numPoints, delayPointsArray, delayPointsMax, isOpened} = this.state;
    const range = Math.random() * Math.PI * 2;
    for (var i = 0; i < numPoints; i++) {
      const radian = (i / (numPoints - 1)) * Math.PI * 2;
      delayPointsArray[i] = (Math.sin(radian + range) + 1) / 2 * delayPointsMax;
    }
    this.setState({
      delayPointsArray,
      isOpened: !isOpened,
      timeStart: Date.now()
    })
    this.renderLoop();
  }
  renderLoop () {
    let {timeStart, duration, delayPerPath, delayPointsMax} = this.state;
    let {pathNum} = this.props;
    this.renderPath();
    if (Date.now() - timeStart < duration +delayPerPath * (pathNum - 1) + delayPointsMax) {
      requestAnimationFrame(() => {
        this.renderLoop();
      });
    }
    else {
      this.setState({
        isAnimating: false
      })
    }
  }
  renderPath () {
    let {isOpened, timeStart, delayPerPath} = this.state;
    let {pathNum} = this.props;
    if (isOpened) {
      (this.pathRef as any).current.setAttribute('d', this.updatePath(Date.now() - timeStart))
    } else {
      (this.pathRef as any).current.setAttribute('d', this.updatePath(Date.now() - (timeStart + delayPerPath * (pathNum - 1))));
    }
    // this.setState({d})
  }
  updatePath (time: number) {
    const points = [];
    let {numPoints, delayPointsArray, duration, isOpened} = this.state
    for (let i = 0; i < numPoints; i++) {
      points[i] = ease.cubicInOut(Math.min(Math.max(time - delayPointsArray[i], 0) / duration, 1)) * 100
    }
    let str = '';
    str += (isOpened) ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
    for (let i = 0; i < numPoints - 1; i++) {
      const p = (i + 1) / (numPoints - 1) * 100;
      const cp = p - (1 / (numPoints - 1) * 100) / 2;
      str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]} `;
    }
    str += (isOpened) ? `V 0 H 0` : `V 100 H 0`;
    return str;
  }
  render() {
    // let {d} = this.state;
    // let {pathNum} = this.props
    // let items = []
    // for(let i = 0; i<pathNum; i++) {
    //   items.push()
    // }
    return (
      <svg style={SvgStyle} viewBox="0 0 64 32" preserveAspectRatio="none" onClick={this.start.bind(this)}>
        {/* {
          d.map((str, i) => <path style={PathStyle} d={str} key={`${str}${i}`}></path>)
        } */}
        <path style={PathStyle} ref={this.pathRef} ></path>
      </svg>
    )
  }
}

export default ShapeOverlays