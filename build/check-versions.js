'use strict'
const chalk = require('chalk')
// 语义化版本规范在 Node.js 中的实现
const semver = require('semver')
const packageConfig = require('../package.json')
const shell = require('shelljs')

// 使用脚本执行命令
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    // 获取当前执行的 node 的版本
    currentVersion: semver.clean(process.version),
    // 项目要求的版本
    versionRequirement: packageConfig.engines.node
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    // 获取当前执行的 npm 的版本
    currentVersion: exec('npm --version'),
    // 项目要求的版本
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []

  // 对 node 以及 npm 的版本进行判断
  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    // 逐个打印错误提示信息
    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}
