import React, {Component} from 'react';
import * as jinrishici from 'jinrishici';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';


import './poetry.scss';

class Poetry extends Component{
  constructor (props) {
    super(props);
    this.state = {
      content: '',
      title: '',
      inProp: false,
    }
  }
  componentDidMount () {
    jinrishici.load(res => {
      if (res.status === 'success') {
        let {content, origin} = res.data;
        let title = `〔${origin.dynasty}〕 ${origin.author} 《${origin.title}》`
        setTimeout(() => {
          this.setState({
            content,
            title,
            inProp: true
          })
          setTimeout(() => {
            if (this.props.onEntered) {
              this.props.onEntered()
            }
          }, 300)
        }, 300)
      }
    })
  }
  render () {
    let {content, title, inProp} = this.state;
    return (
      <div className="poetry">
        <CSSTransition in={inProp} timeout={300} classNames="fade" unmountOnExit>
          <div>
            <div>{content}</div>
            <div>{inProp && `——${title}`}</div>
          </div>
        </CSSTransition>
      </div>
    )
  }
}

Poetry.propTypes = {
  onEntered: PropTypes.func,
}

export default Poetry;