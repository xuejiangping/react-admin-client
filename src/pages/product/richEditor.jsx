import React,{ Component } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState,convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class richEditor extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }


  // const[editorState,setEditorState] = useState(EditorState.createEmpty())
  getDetail = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

  }
  render() {
    return (
      <Editor
        editorStyle={{
          border: '1px solid #c1c1bf',minHeight: 150,
          padding: '0 5px',cursor: 'text'
        }}
        editorState={this.state.editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={editorState => this.setState({ editorState })}
      />
    )
  }
}
