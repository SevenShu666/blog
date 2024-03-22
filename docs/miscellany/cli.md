# 脚手架

## 一、工具介绍

**`commander`**

Commander 是一个用于构建命令行工具的 npm 库。它提供了一种简单而直观的方式来创建命令行接口，并处理命令行参数和选项。使用 Commander，你可以轻松定义命令、子命令、选项和帮助信息。它还可以处理命令行的交互，使用户能够与你的命令行工具进行交互

**`inquirer`**

Inquirer 是一个强大的命令行交互工具，用于与用户进行交互和收集信息。它提供了各种丰富的交互式提示（如输入框、选择列表、确认框等），可以帮助你构建灵活的命令行界面。通过 Inquirer，你可以向用户提出问题，获取用户的输入，并根据用户的回答采取相应的操作。

**`ora`**

Ora 是一个用于在命令行界面显示加载动画的 npm 库。它可以帮助你在执行耗时的任务时提供一个友好的加载状态提示。Ora 提供了一系列自定义的加载动画，如旋转器、进度条等，你可以根据需要选择合适的加载动画效果，并在任务执行期间显示对应的加载状态。

**`download-git-repo`**

Download-git-repo 是一个用于下载 Git 仓库的 npm 库。它提供了一个简单的接口，可以方便地从远程 Git 仓库中下载项目代码。你可以指定要下载的仓库和目标目录，并可选择指定分支或标签。Download-git-repo 支持从各种 Git 托管平台（如 GitHub、GitLab、Bitbucket 等）下载代码。
## 二、编写代码

`index.js`

~~~js
#!/usr/bin/env node
import { program } from 'commander'
import inquirer from 'inquirer'
import fs from 'node:fs'
import { checkPath, downloadTemp } from './utils.js'
let json = fs.readFileSync('./package.json', 'utf-8')
json = JSON.parse(json)


program.version(json.version) //创建版本号
//添加create 命令 和 别名crt 以及描述 以及 执行完成之后的动作
program.command('create <project>').alias('ctr').description('create a new project').action((project) => {
    //命令行交互工具
    inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'project name',
            default: project
        },
        {
            type: 'confirm',
            name: 'isTs',
            message: '是否支持typeScript',
        }
    ]).then((answers) => {
        if (checkPath(answers.projectName)) {
            console.log('文件已存在')
            return
        }

        if (answers.isTs) {
            downloadTemp('ts', answers.projectName)
        } else {
            downloadTemp('js', answers.projectName)
        }
    })
})

program.parse(process.argv)
~~~

`#!/usr/bin/env node`用于告诉操作系统用node解释器去执行这个文件，而不是显式地调用 `node` 命令

`utils.js`

~~~js
import fs from 'node:fs'
import download from 'download-git-repo'
import ora from 'ora'
const spinner = ora('下载中...')
//验证路径
export const checkPath = (path) => {
    return fs.existsSync(path)
}

//下载
export const downloadTemp = (branch,project) => {
    spinner.start()
    return new Promise((resolve,reject)=>{
        download(`direct:https://gitee.com/chinafaker/vue-template.git#${branch}`, project , { clone: true, }, function (err) {
            if (err) {
                reject(err)
                console.log(err)
            }
            resolve()
            spinner.succeed('下载完成')
        })
    })
   
}
~~~

`package.json`

~~~js
 "type": "module", //使用import需要设置这个
 "bin": {
    "vue-cli": "src/index.js"
  },
~~~

用于生成软连接挂载到全局，便可以全局执行`vue-cli`这个命令，配置完成之后 需要执行

~~~
npm link
~~~

