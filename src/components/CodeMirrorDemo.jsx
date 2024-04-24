import React, { Component } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { evalCode } from './tool'
import { javascript } from '@codemirror/lang-javascript'
import { dracula } from '@uiw/codemirror-theme-dracula'

export default class CodeMirrorDemo extends Component {
  state = {
    code: '',
    codeComponent: null
  }

  componentDidMount() {
    const code = require(`!raw-loader!./File`).default
    const regex = /return([\s\S]*)}/
    const match = code.match(regex)
    let extractedCode
    if (match && match.length > 1) {
      extractedCode = match[1].trim()
      extractedCode = extractedCode.slice(0, extractedCode.length - 1) // 去除最后一个字符
    }
    this.setState({ code: extractedCode }, () => {
      this.evalCode()
    })
  }

  evalCode = () => {
    const { code } = this.state
    this.setState({ codeComponent: evalCode(require(`!raw-loader!./File`).default.replace(/render\(\) {[\s\S]*}/, `render() {\n return <div> ${code}</div> }}`)) })
  }

  handleCopy = () => {
    const { code } = this.state
    // 复制代码到剪贴板
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert('代码已复制到剪贴板')
      })
      .catch(error => {
        alert('复制代码时出现错误:', error)
      })
  }

  render() {
    const { code, codeComponent } = this.state
    return (
      <div
        style={{
          display: 'flex',
          height: '100%',
          position: 'relative'
        }}
      >
        <button onClick={this.evalCode} style={{ position: 'absolute', right: 10, top: 0, zIndex: 999 }}>
          运行
        </button>
        <CodeMirror
          style={{ width: '50%' }}
          value={code}
          theme={dracula}
          extensions={[javascript({ jsx: true })]}
          options={{
            keyMap: 'sublime',
            mode: 'jsx',
            // 括号匹配
            matchBrackets: true,
            // tab缩进
            tabSize: 2
          }}
          onChange={editor => {
            this.setState({ code: editor })
          }}
        />
        {/* <button onClick={this.handleCopy}>复制代码</button> */}
        <div style={{ 'margin-left': '10px' }}>{codeComponent ? React.createElement(codeComponent) : null}</div>
      </div>
    )
  }
}
