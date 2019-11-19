import React, { Component } from 'react';
import * as jinrishici from 'jinrishici';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import './poetry.scss';
import { setTimeout } from 'optimism';
class Poetry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      title: '',
      inProp: false,
    }
  }
  componentDidMount() {
    jinrishici.load(res => {
      if (res.status === 'success') {
        let { content, origin } = res.data;
        let title = `〔${origin.dynasty}〕 ${origin.author} 《${origin.title}》`
        setTimeout(() => {
          this.setState({
            content,
            title,
            inProp: true
          })
        }, 300)
      }
    }, () => {
      let { inProp } = this.state;
      if (!inProp && this.props.onEntered) {
        this.props.onEntered()
      }
    });
  }
  render() {
    let { content, title, inProp } = this.state;
    return (
      <div className="poetry">
        <CSSTransition in={inProp} timeout={300} classNames="fade" unmountOnExit onEntered={() => {
          if (this.props.onEntered) {
            this.props.onEntered()
          }
        }}>
          <div>
            <div>{content}</div>
            <div>{inProp && `——${title}`}</div>
          </div>
        </CSSTransition>
      </div>
    )
  }
}
Poetry.defaultProps = {
  onEntered() { }
}

Poetry.propTypes = {
  onEntered: PropTypes.func,
}

export default Poetry;