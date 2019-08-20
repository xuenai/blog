import React from 'react'
import {Editor, EditorState, RichUtils, DraftEditorCommand} from 'draft-js';

interface Props {

}
interface State {
  editorState: EditorState
}

const styleMap = {
  'RED': {
      color: 'red'
  }
}

class HeEditor extends React.Component<object, State>{
  onChange: (editorState: EditorState)=> void;
  constructor (props: object) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
  }
  toggleInlineStyle (inlineStyle: any) {
    this.onChange(
      RichUtils.toggleInlineStyle(
          this.state.editorState,
          inlineStyle
      )
  );
  }
  handleKeyCommand(command: DraftEditorCommand, editorState: EditorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  render () {
    return (
      <div>
        <button onClick={() => this.toggleInlineStyle('BOLD')}>Bold</button>
        <button onClick={() => {this.toggleInlineStyle('RED')}}>Red</button>
        <Editor customStyleMap={styleMap} editorState={this.state.editorState} onChange={this.onChange} handleKeyCommand={this.handleKeyCommand}/>
      </div>
    )
  }
}

export default HeEditor