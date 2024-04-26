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
    const regex = /return \(([\s\S]*)}/

    const match = code.match(regex)
    let extractedCode
    if (match && match.length > 1) {
      extractedCode = match[1].trim()
      extractedCode = extractedCode.slice(0, extractedCode.length - 10)
    }
    console.log(extractedCode)
    this.setState({ code: '' }, () => {
      this.typeWriter(extractedCode)
    })
  }

  typeWriter = text => {
    if (this.typingStarted) {
      return // 如果已经开始打字动画，则直接返回
    }
    this.typingStarted = true // 设置标志位表示打字动画已经开始
    let currentIndex = 0
    const typingInterval = 1 // 打字速度（每个字符的间隔时间）
    const typingTimer = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(typingTimer)
        try {
          this.evalCode()
        } catch (err) {}
      } else {
        this.setState(prevState => {
          return { code: prevState.code + text[currentIndex - 1] }
        })
        currentIndex++
      }
    }, typingInterval)
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
          style={{ width: '50%', marginRight: '10px' }}
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
        <div>{codeComponent ? React.createElement(codeComponent) : null}</div>
      </div>
    )
  }
}
