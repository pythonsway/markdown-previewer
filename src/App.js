import React from 'react';
import './App.css';
import logo from './logo.svg';
import marked from 'marked';

// 'marked' config
// line breaks
marked.setOptions({
  breaks: true,
});

// target="_blank"
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a href="${href}" target="_blank" rel="noopener">${text} </a>`;
};

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state =  {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }
  handleChange(e) {
    this.setState({
      markdown: e.target.value
    });
  }
  handleEditorMaximize() {
    this.setState({
      editorMaximized: !this.state.editorMaximized
    });
  }
  handlePreviewMaximize() {
    this.setState({
      previewMaximized: !this.state.previewMaximized
    });
  }
  render() {
    const classes = this.state.editorMaximized ? 
          ['editorWrap half', 
           'previewWrap hide', 
           'far fa-minus-square'] : 
          this.state.previewMaximized ?
          ['editorWrap hide', 
           'previewWrap half', 
           'far fa-minus-square'] :
          ['editorWrap half', 
           'previewWrap half', 
           'far fa-window-maximize'];
    return (
      <div className="container">
        <div className={classes[0]}>
          <Toolbar 
            icon={classes[2]} 
            onClick={this.handleEditorMaximize}
            text="Editor"/>
          <Editor markdown={this.state.markdown} 
            onChange={this.handleChange} />
        </div>
        <div className={classes[1]}>
          <Toolbar
            icon={classes[2]} 
            onClick={this.handlePreviewMaximize}
            text="Previewer"/>
          <Preview  markdown={this.state.markdown}/>
        </div>
      </div>
    )
  }
}

const Toolbar = (props) => {
    return (
      <div className="toolbar">
        {props.text}
        <i onClick={props.onClick} className={props.icon}></i>
      </div>
   )
}

const Editor = (props) => {
  return (
    <textarea id="editor"
      value={props.markdown}
      onChange={props.onChange}
      type="text"/>
    )
}

const Preview = (props) => {
  return (
      <div id='preview' dangerouslySetInnerHTML={{__html: marked(props.markdown, { renderer: renderer })}} />
    )
}

const placeholder = 
`# This page lets you convert Markdown into HTML

## How to use
1. Type in 'Editor'
1. See results in 'Previewer'

## Some examples:
### - code
\`<div> _____ </div>\`, between 2 backticks.

#### multi-line code
\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

### - text
make text **bold**,
_italic_.
**_both_**,
or ~~crossed out~~.

### - links
Check out [Markdown Doc](https://help.github.com/en/articles/basic-writing-and-formatting-syntax)

### - block quotes
> Block Quote

### - tables

One | Two | Three
------------ | ------------- | ------------- 
content can | be here | and here
and here | here | 0

### - lists
#### unordered
- There are lists.
  - Some are bulleted
     - With different indentation levels
        - That look like this.

#### ordered
1. Numbererd lists too.
1. Numbers doesn't matter 
1. The list goes on
- You can use dashes
* or asterisks

### - images
![React logo](${logo} "React logo")
`
export default App;