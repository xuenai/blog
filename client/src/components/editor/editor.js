import React from 'react'
import injectSheet from 'react-jss'
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';

import clsx from 'clsx'

import {ColorControl} from '@components/editor-components';

const styles = {
  editor: {
    position: 'relative',
    height: '100%',
    padding: 0,
    border: '1px solid #d1d1d1',
    borderRadius: '5px',
    boxShadow: '0 15px 40px rgba(0,0,0,.2)',
  },
  controlbar: {
    margin: 0,
    padding: '0 5px',
    boxShadow: 'inset 0 -1px 0 0 rgba(0,0,0,.2)',
  },
  'control-item': {
    display: 'block',
    float: 'left',
    height: '36px',
    margin: '5px 0 5px 3px',
    borderRadius: '2px',
    cursor: 'pointer',
  },
  'button': {
    boxSizing: 'border-box',
    minWidth: '36px',
    padding: '0 8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#6a6f7b',
    fontSize: '14px',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,.05)',
    }
  },
  'separator-line': {
    display: 'block',
    float: 'left',
    height: '26px',
    width: '1px',
    margin: '10px',
    boxShadow: 'inset -1px 0 0 0 rgba(0,0,0,.1)',
  },
  'editor-content': {
    height: '500px',
    paddingBottom: '10px',
    overflow: 'auto',
    fontSize: '16px',
  },
  clearfix: {
    display: 'block',
    clear: 'both',
  }
}

@injectSheet(styles)
class HeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});

    this._onBoldClick = this._onBoldClick.bind(this)

    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(convertToRaw(content));
    };

    this.colorChange = (color) => {
      console.log(color)
    }
  }
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  render () {
    let cls = this.props.classes
    return (
      <div className={cls.editor}>
        <div className={cls.controlbar}>
          <button data-title="Bold" className={`${cls['control-item']} ${cls.button}`} onClick={this._onBoldClick}>Bold</button>
          <div className={cls['separator-line']}></div>
          <button className={`${cls['control-item']} ${cls.button}`} onClick={this.logState}>log state</button>

          <button className={`${cls['control-item']} ${cls.button}`} onClick={this.logState}>
            <ColorControl colorChange={this.colorChange}/>
          </button>
          <div className={cls.clearfix}></div>
        </div>
        <div className={cls['editor-content']}>
          <Editor editorState={this.state.editorState} onChange={this.onChange} />
        </div>
      </div>
    )
  }
}

export default HeEditor;