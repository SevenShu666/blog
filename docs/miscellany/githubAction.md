# GitHub Action(Electron)

[GitHub Action文档](https://docs.github.com/zh/actions/using-workflows/workflow-commands-for-github-actions)

## 一、创建yml文件

在根目录创建一个.github/workflows/build.yml文件

## 二、为workflow命名

~~~yml
name: Build Electron App
~~~

## 三、添加触发workflow的操作

~~~yml
name: Build Electron App For Win/Mac

on:
  push:
    tags:
      - v*
~~~

为commit添加标签：

~~~
git tag v1.0.1
~~~

推送到远程仓库

~~~
git push origin --tags
~~~

推送成功后就会触发工作流

## 四、创建一个job

~~~yml
name: Build Electron App For Win/Mac

on:
  push:
    tags:
      - v*
jobs:
	release:
		name: build and release electron app
~~~

## 五、创建矩阵定义 mac 、 windows和linux

~~~yml
name: Build Electron App For Win/Mac

on:
  push:
    tags:
      - v*
jobs:
	release:
		name: build and release electron app
		runs-on: ${{ matrix.os }}
		
		strategy:
      	fail-fast: false
      	matrix:
        	os: [windows-latest, macos-latest, ubuntu-latest]
~~~

## 六、创建steps定义各个步骤

### 1.下载代码到工作区

~~~yml
name: Build Electron App For Win/Mac

on:
  push:
    tags:
      - v*
jobs:
	release:
		name: build and release electron app
		runs-on: ${{ matrix.os }}
		
		strategy:
      		fail-fast: false
      		matrix:
        		os: [windows-latest, macos-latest, ubuntu-latest]
        steps:
        	- name: Check out git repository
        	  uses: actions/checkout@v2
~~~

### 2.安装node.js环境

~~~yml
name: Build Electron App For Win/Mac

on:
  push:
    tags:
      - v*
jobs:
	release:
		name: build and release electron app
		runs-on: ${{ matrix.os }}
		
		strategy:
      		fail-fast: false
      		matrix:
        		os: [windows-latest, macos-latest, ubuntu-latest]
        steps:
        	- name: Check out git repository
        	  uses: actions/checkout@v3.0.0
        	  
        	- name: Install Node.js
        	  uses: actions/setup-node@v3.0.0
        	  with:
          		node-version: 16
~~~

### 4.下载依赖

~~~yml
name: Build Electron App For Win/Mac

on:
  push:
    tags:
      - v*
jobs:
	release:
		name: build and release electron app
		runs-on: ${{ matrix.os }}
		
		strategy:
      		fail-fast: false
      		matrix:
        		os: [windows-latest, macos-latest, ubuntu-latest]
        steps:
        	- name: Check out git repository
        	  uses: actions/checkout@v3.0.0
        	  
        	- name: Install Node.js
        	  uses: actions/setup-node@v3.0.0
        	  with:
          		node-version: 16
          	- name: Install Dependencies
        	   run: |
          		 npm i -g pnpm
          		 pnpm install
~~~

### 5.构建 Electron App

~~~yml
name: Build Electron App For Win/Mac

on:
  push:
    tags:
      - v*
jobs:
	release:
		name: build and release electron app
		runs-on: ${{ matrix.os }}
		
		if: startsWith(github.ref, 'refs/tags/')
		strategy:
      		fail-fast: false
      		matrix:
        		os: [windows-latest, macos-latest, ubuntu-latest]
        steps:
        	- name: Check out git repository
        	  uses: actions/checkout@v3.0.0
        	  
        	- name: Install Node.js
        	  uses: actions/setup-node@v3.0.0
        	  with:
          		node-version: 16
          		
          	- name: Install Dependencies
        	   run: |
          		 npm i -g pnpm
          		 pnpm install
          		 
          	- name: Build Electron App for windows
                if: matrix.os == 'windows-latest'
               run: pnpm run build:win
               env:
                 GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}

            - name: Build Electron App for macos
            	if: matrix.os == 'macos-latest'
               run: |
              	pnpm run build:mac-x86
              	pnpm run build:mac-arm64
               env:
              	 GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}

          # - name: Build Electron App for linux
          #   if: matrix.os == 'ubuntu-latest'
          #   run: |
          #     pnpm run build:linux-x86
          #     pnpm run build:linux-arm64
          # env:
          #   GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}
~~~

### 6.上传dist文件夹中的 .exe、.dmg 等文件

~~~yml
name: Build Electron App For Win/Mac

on:
  push:
    tags:
      - v*
jobs:
	release:
		name: build and release electron app
		runs-on: ${{ matrix.os }}
		
		if: startsWith(github.ref, 'refs/tags/')
		strategy:
      		fail-fast: false
      		matrix:
        		os: [windows-latest, macos-latest, ubuntu-latest]
        steps:
        	- name: Check out git repository
        	  uses: actions/checkout@v3.0.0
        	  
        	- name: Install Node.js
        	  uses: actions/setup-node@v3.0.0
        	  with:
          		node-version: 16
          		
          	- name: Install Dependencies
        	   run: |
          		 npm i -g pnpm
          		 pnpm install
          		 
          	- name: Build Electron App for windows
                if: matrix.os == 'windows-latest'
               run: pnpm run build:win
               env:
                 GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}

            - name: Build Electron App for macos
            	if: matrix.os == 'macos-latest'
               run: |
              	pnpm run build:mac-x86
              	pnpm run build:mac-arm64
               env:
              	 GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}

          # - name: Build Electron App for linux
          #   if: matrix.os == 'ubuntu-latest'
          #   run: |
          #     pnpm run build:linux-x86
          #     pnpm run build:linux-arm64
          # env:
          #   GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          
          - name: Cleanup Artifacts for Windows
            if: matrix.os == 'windows-latest'
            run: |
              npx del-cli "dist/*" "!dist/*.exe" "!dist/*.zip" "!dist/*.yml"

          - name: Cleanup Artifacts for MacOS
            if: matrix.os == 'macos-latest'
            run: |
              npx del "dist/*" "!dist/(*.dmg|*.zip|latest*.yml)"

          - name: Cleanup Artifacts for Linux
            if: matrix.os == 'ubuntu-latest'
            run: |
              npx del "dist/*" "!dist/(*.AppImage.*|latest*.yml|*.appimage.*)"

          - name: upload artifacts
            uses: actions/upload-artifact@v3.0.0
            with:
              name: ${{ matrix.os }}
              path: dist
~~~

这里用到了del-cli包，需要在package.json安装

### 7.创建 Release

~~~yml
name: Build Electron App For Win/Mac

on:
  push:
    tags:
      - v*
jobs:
	release:
		name: build and release electron app
		runs-on: ${{ matrix.os }}
		
		if: startsWith(github.ref, 'refs/tags/')
		strategy:
      		fail-fast: false
      		matrix:
        		os: [windows-latest, macos-latest, ubuntu-latest]
        steps:
        	- name: Check out git repository
        	  uses: actions/checkout@v3.0.0
        	  
        	- name: Install Node.js
        	  uses: actions/setup-node@v3.0.0
        	  with:
          		node-version: 16
          		
          	- name: Install Dependencies
        	   run: |
          		 npm i -g pnpm
          		 pnpm install
          		 
          	- name: Build Electron App for windows
                if: matrix.os == 'windows-latest'
               run: pnpm run build:win
               env:
                 GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}

            - name: Build Electron App for macos
            	if: matrix.os == 'macos-latest'
               run: |
              	pnpm run build:mac-x86
              	pnpm run build:mac-arm64
               env:
              	 GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}

          # - name: Build Electron App for linux
          #   if: matrix.os == 'ubuntu-latest'
          #   run: |
          #     pnpm run build:linux-x86
          #     pnpm run build:linux-arm64
          # env:
          #   GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          
          - name: Cleanup Artifacts for Windows
            if: matrix.os == 'windows-latest'
            run: |
              npx del-cli "dist/*" "!dist/*.exe" "!dist/*.zip" "!dist/*.yml"

          - name: Cleanup Artifacts for MacOS
            if: matrix.os == 'macos-latest'
            run: |
              npx del "dist/*" "!dist/(*.dmg|*.zip|latest*.yml)"

          - name: Cleanup Artifacts for Linux
            if: matrix.os == 'ubuntu-latest'
            run: |
              npx del "dist/*" "!dist/(*.AppImage.*|latest*.yml|*.appimage.*)"

          - name: upload artifacts
            uses: actions/upload-artifact@v3.0.0
            with:
              name: ${{ matrix.os }}
              path: dist
              
          - name: release
            uses: softprops/action-gh-release@v1
            if: startsWith(github.ref, 'refs/tags/')
            with:
              files: 'dist/**'
            env:
              GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}
~~~

ACCESS_TOKEN，令牌配置请看[VuePress自动部署](miscellany/vuepress.html#github-actions-自动部署)，需要将workflow选项选上

## 七、运行Action

~~~
git tag v1.0.0
git push origin --tags
~~~

