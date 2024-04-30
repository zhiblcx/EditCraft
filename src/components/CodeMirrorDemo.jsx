import React, { Component } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { evalCode } from './tool'
import { javascript } from '@codemirror/lang-javascript'
import { EditorState } from '@codemirror/state'
import { dracula } from '@uiw/codemirror-theme-dracula'

export default class CodeMirrorDemo extends Component {
  state = {
    code: '',
    codeComponent: null
  }
  typingStarted = false

  range = [' p-8', ' rounded-full ', 'mx-auto', ' font-medium', 'font-medium', 'text-sky-500 dark:text-sky-400', 'text-slate-700 dark:text-slate-500', ' text-center', 'md:flex ', ' md:p-0', ' md:p-8', ' md:rounded-none', ' md:w-48', ' md:h-auto', ' md:text-left']
  rangIndex = [1, 6, 7, 11, 12, 13, 14, 8, 0, 2, 9, 5, 3, 4, 10]

  componentDidMount() {
    const code = require(`!raw-loader!./File`).default
    const regex = /return \(([\s\S]*)}/

    const match = code.match(regex)
    let extractedCode
    if (match && match.length > 1) {
      extractedCode = match[1].trim()
      extractedCode = extractedCode.slice(0, extractedCode.length - 10)
    }
    this.setState({ code: extractedCode.replace(/(\s*)@@@\s?/g, '') }, () => {
      this.evalCode()
      this.typeWriter(extractedCode)
    })
  }

  typeWriter = async text => {
    if (this.typingStarted) {
      return // 如果已经开始打字动画，则直接返回
    }
    this.typingStarted = true // 设置标志位表示打字动画已经开始
    const insertClassIndex = []
    for (let count = 0; count < this.range.length; count++) {
      insertClassIndex.push(this.rangIndex[count])
      let count2 = -1 // 声明count2变量
      let newStr = text.replace(/\s?@@@\s?/g, () => {
        count2++
        const index = insertClassIndex.findIndex(item => item === count2)
        if (index !== -1) {
          return this.range[index]
        } else {
          return ''
        }
      })
      console.log(newStr)
      for (let i = 0; i < this.state.code.length; i++) {
        if (this.state.code[i] !== newStr[i]) {
          for (let j = i; j < i + this.range[count].length; j++) {
            await new Promise(resolve => {
              setTimeout(() => {
                this.setState(prevState => {
                  const firstPart = prevState.code.slice(0, j)
                  const secondPart = prevState.code.slice(j)
                  const updatedCode = firstPart + newStr[j] + secondPart
                  return { code: updatedCode }
                }, resolve) // 在setState的回调函数中调用resolve，表示更新完成
              }, 100)
            })
            this.evalCode()
          }
          await new Promise(resolve => {
            setTimeout(() => {
              resolve()
            }, 1000)
          })
        }
      }
    }
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
        {/* <button onClick={this.evalCode}>运行</button> */}

        {/* <button onClick={this.handleCopy}>复制代码</button> */}
        <div>{codeComponent ? React.createElement(codeComponent) : null}</div>
        <CodeMirror
          style={{ width: '50%', marginRight: '10px' }}
          value={code}
          theme={dracula}
          extensions={[javascript({ jsx: true }), EditorState.readOnly.of(true)]}
          options={{
            readOnly: true, // 直接禁止用户输入
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
      </div>
    )
  }
}
