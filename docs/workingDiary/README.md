# 问题记录

## 1.calc 不生效问题

在 less 中使用 calc，calc 需要加上~和引号，如：`clac(~"100vw - 14px")`

## 2.ios 时间 NaN

1. 时间格式为 2022-07-14,ios 中时间转换识别不了“-”需要将格式转为“/”，如：2022/07/14
2. 关于时间临界值：对于 00:00:00 和 24:00:00 这两个时间临界值, ios 会转成 NAN
3. 时间格式为 2022/07（年月）,这种在 ios 用 new Date 转换也会变成 NaN，需要补全日期

## 3.replaceAll 方法

低版本手机不支持 replaceAll 方法

## 4.github Action报错

~~~js
[info] [webpackbar] Compiling Client
[info] [webpackbar] Compiling Server
/home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:114
			throw e;
			^

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:71:19)
    at Object.createHash (node:crypto:133:10)
    at module.exports (/home/runner/work/blog/blog/node_modules/webpack/lib/util/createHash.js:135:53)
    at NormalModule._initBuildHash (/home/runner/work/blog/blog/node_modules/webpack/lib/NormalModule.js:417:16)
    at handleParseError (/home/runner/work/blog/blog/node_modules/webpack/lib/NormalModule.js:471:10)
    at /home/runner/work/blog/blog/node_modules/webpack/lib/NormalModule.js:503:5
    at /home/runner/work/blog/blog/node_modules/webpack/lib/NormalModule.js:358:12
    at /home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:373:3
    at iterateNormalLoaders (/home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:214:10)
    at iterateNormalLoaders (/home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:221:10)
    at /home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:236:3
    at context.callback (/home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:111:13)
    at /home/runner/work/blog/blog/node_modules/cache-loader/dist/index.js:134:7
    at /home/runner/work/blog/blog/node_modules/graceful-fs/graceful-fs.js:61:14
    at FSReqCallback.oncomplete (node:fs:198:23) {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}

Node.js v18.15.0
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
Error: Process completed with exit code 1.
~~~

node版本过高，deploy.yml文件设置node的版本

~~~yml
# 设置 Node
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 16
~~~

<Valine></Valine>
