import React, { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import clsx from 'clsx'
import { javascript } from '@codemirror/lang-javascript'
import { EditorState } from '@codemirror/state'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { motion, AnimatePresence } from 'framer-motion'

export function Hero({ left, right }) {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        position: 'relative'
      }}
    >
      <div style={{ width: '50%', transform: 'translateX(-50px)', zIndex: 10 }}>{left}</div>
      {right}
    </div>
  )
}

export default function CodeMirrorDemo() {
  const [code, setCode] = useState('')
  const [court, setCourt] = useState(-1)
  const [typingStarted, setTypingStarted] = useState(false)
  const [extend, setExtend] = useState(false)

  const range = [' p-8', ' rounded-full ', 'mx-auto', ' font-medium', 'font-medium', 'text-sky-500 dark:text-sky-400', 'text-slate-700 dark:text-slate-500', ' text-center', 'md:flex ', ' md:p-0', ' md:p-8', ' md:rounded-none', ' md:w-48', ' md:h-auto', ' md:text-left']

  const rangIndex = [1, 6, 7, 11, 12, 13, 14, 8, 0, 2, 9, 5, 3, 4, 10]

  useEffect(() => {
    const code1 = require(`!raw-loader!./File`).default
    const regex = /return \(([\s\S]*)}/
    const match = code1.match(regex)
    let extractedCode
    if (match && match.length > 1) {
      extractedCode = match[1].trim()
      extractedCode = extractedCode.slice(0, extractedCode.length - 10)
    }
    setCode(extractedCode.replace(/(\s*)@@@\s?/g, ''))
  }, [])

  useEffect(() => {
    const code1 = require(`!raw-loader!./File`).default
    const regex = /return \(([\s\S]*)}/
    const match = code1.match(regex)
    let extractedCode
    if (match && match.length > 1) {
      extractedCode = match[1].trim()
      extractedCode = extractedCode.slice(0, extractedCode.length - 10)
    }
    typeWriter(extractedCode)
  }, [code])

  const typeWriter = async text => {
    let str = ''
    str = code
    if (typingStarted || code == '') {
      return
    }
    setTypingStarted(true)
    const insertClassIndex = []
    for (let count = 0; count < range.length; count++) {
      console.log(count)
      insertClassIndex.push(rangIndex[count])
      let count2 = -1
      let newStr = text.replace(/\s?@@@\s?/g, () => {
        count2++
        const index = insertClassIndex.findIndex(item => item === count2)
        if (index !== -1) {
          return range[index]
        } else {
          return ''
        }
      })
      for (let i = 0; i < str.length; i++) {
        if (str[i] !== newStr[i]) {
          for (let j = i; j < i + range[count].length; j++) {
            await new Promise(resolve => {
              setTimeout(() => {
                setCode(prevState => {
                  const firstPart = prevState.slice(0, j)
                  const secondPart = prevState.slice(j)
                  const updatedCode = firstPart + newStr[j] + secondPart
                  return updatedCode
                })
                resolve()
              }, 80)
            })
          }
          str = newStr
          setCourt(count)
          await new Promise(resolve => {
            let timer = 1000
            setTimeout(() => {
              if (count === 7) {
                setExtend(true)
                timer = 2000
              }
              resolve()
            }, timer)
          })

          break
        }
      }
    }
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert('代码已复制到剪贴板')
      })
      .catch(error => {
        alert('复制代码时出现错误:', error)
      })
  }

  return (
    <Hero
      left={
        <div className="lg:-mr-18">
          <AnimatePresence>
            <motion.div
              className="relative z-10 rounded-lg shadow-xl text-slate-900 mx-auto sm:w-[23.4375rem] dark:text-slate-300"
              transition={{
                duration: 0.5
              }}
            >
              <motion.div
                className={clsx('bg-white rounded-lg overflow-hidden ring-1  ring-slate-900/5 dark:bg-slate-800 dark:highlight-white/5 dark:ring-0', {
                  'text-center': court >= 7 && court < 14,
                  'text-left': court >= 14,
                  'md:flex': court >= 8
                })}
                transition={{
                  duration: 1
                }}
                animate={{
                  ...(court >= 0 ? { padding: '32px' } : {}),
                  ...(court >= 7 && extend ? { width: '600px' } : {})
                }}
              >
                <motion.div
                  transition={{ duration: 0.5 }}
                  className={clsx('relative z-10 overflow-hidden flex-none')}
                  animate={{
                    ...(court >= 10 ? { margin: '-32px', marginRight: '32px' } : '')
                  }}
                >
                  <motion.img
                    transition={{ duration: 0.5 }}
                    className={clsx('w-24 h-24')}
                    src={require('../images/wolf.jpg')}
                    decoding="async"
                    animate={{
                      ...(court >= 2 && court <= 7 ? { x: 110, y: 0 } : { x: 0, y: 0 }),
                      ...(court >= 1 && court <= 11 ? { borderRadius: '50%' } : {}),
                      ...(court >= 12 ? { width: '192px' } : ''),
                      ...(court >= 13 ? { height: '100%' } : '')
                    }}
                  />
                </motion.div>
                <motion.div>
                  <motion.div
                    className="mb-4"
                    transition={{ duration: 0.5 }}
                    animate={{
                      ...(court >= 3 ? { fontWeight: 500, padding: '1px' } : {}),

                      ...(court >= 7 && court < 14
                        ? {
                            x: ['-10%', '0%']
                          }
                        : {}),
                      ...(court >= 14 ? { x: ['10%', '0%'] } : {})
                    }}
                  >
                    “Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to customize, adapts to any design, and the build size is tiny.”
                  </motion.div>
                  <motion.div
                    transition={{ duration: 0.5 }}
                    animate={{
                      ...(court >= 4 ? { fontWeight: 500 } : {}),
                      ...(court >= 7 && court < 14
                        ? {
                            x: ['-20%', '0%']
                          }
                        : {}),
                      ...(court >= 14 ? { x: ['20%', '0%'] } : {})
                    }}
                    className={{
                      'text-center': court >= 7 && court < 14,
                      'text-left': court >= 14
                    }}
                  >
                    <motion.p className={clsx('transition-colors duration-500', court >= 5 ? 'text-sky-500 dark:text-sky-400' : 'text-black dark:text-slate-300')}>Sarah Dayan</motion.p>
                    <motion.p initial={false} className={clsx('transition-colors duration-500', court >= 6 ? 'text-slate-700 dark:text-slate-500' : 'text-black dark:text-slate-300')}>
                      Staff Engineer, Algolia
                    </motion.p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      }
      right={
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
            setCode(editor)
          }}
        />
      }
    />
  )
}
