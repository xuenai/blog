import React from 'react'
import {Editor, EditorState, RichUtils} from 'draft-js';
import styles from './index.module.scss';

class HeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});

    this._onBoldClick = this._onBoldClick.bind(this)

    this.logState = () => {
      
    };
  }
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  render () {
    return (
      <div className={styles.editor}>
        <div className={styles.controlbar}>
          <button data-title="Bold" className={`${styles['control-item']} ${styles.button}`} onClick={this._onBoldClick}>Bold</button>
          <div className={styles['separator-line']}></div>
          <button className={`${styles['control-item']} ${styles.button}`} onClick={this.logState}>log state</button>
          <div className={styles.clearfix}></div>
        </div>
        <div className={styles['editor-content']}>
          <Editor editorState={this.state.editorState} onChange={this.onChange} />
        </div>
      </div>
    )
  }
}

export default HeEditor;