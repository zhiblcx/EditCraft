import { transform } from '@babel/standalone'

const _require = moduleName => {
  const modeules = {
    react: require('react'),
    'react-dom': require('react-dom')
  }
  if (modeules[moduleName]) {
    return modeules[moduleName]
  }
  throw new Error(`找不到'${moduleName}模块'，可选模块有：${Object.keys(modeules).join(', ')}`)
}

export const evalCode = code => {
  const output = transform(code, { presets: ['es2015', 'react'] }).code
  const fn = new Function(`var require = arguments[0], exports = arguments[1];\n ${output}`)
  const exports = {}
  fn.call(null, _require, exports)
  return exports.default
}
