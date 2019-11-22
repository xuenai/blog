import React, { useState, useEffect } from 'react';
import * as jinrishici from 'jinrishici';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import './poetry.scss';

import { areEqual } from '@config'

const Poetry = (props) => {
  const [state, setState] = useState({
    content: '',
    title: '',
    inProp: false,
  })
  useEffect(
    () => {
      jinrishici.load(res => {
        if (res.status === 'success') {
          let { content, origin } = res.data;
          let title = `〔${origin.dynasty}〕 ${origin.author} 《${origin.title}》`
          setTimeout(() => {
            setState({
              content,
              title,
              inProp: true
            })
          }, 300)
        }
      }, () => {
        let { inProp } = state;
        if (!inProp && props.onEntered) {
          props.onEntered()
        }
      });
    },
    []
  );
  let { content, title, inProp } = state;
  return (
    <div className="poetry">
      <CSSTransition in={inProp} timeout={300} classNames="fade" unmountOnExit onEntered={() => {
        if (props.onEntered) {
          props.onEntered()
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

Poetry.propTypes = {
  onEntered: PropTypes.func,
}

export default React.memo(Poetry, areEqual);