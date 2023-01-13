# Git 的基本操作

## 常用推送命令

```shell
# 切换分支
$ git checkout [branch-name]

# 添加文件到暂存区
$ git add [filename]

# 查看工作区与暂存区的当前情况
$ git status

# 将缓存区的文件提交到仓库
$ git commit -m "feat: 提交说明"

# 推送本地仓库到远程仓库
$ git push

# 撤销本次的commit
$ git reset --soft HEAD^

# 修改本次提交的commit(vim)
$ git commit --amend
```

## 新建

```shell
# 初始化当前项目
$ git init

# 新建一个目录，将其初始化为Git代码库
$ git init [project-name]

# 在指定的目录<directory>创建一个空的git仓库
$ git init --bare <directory>

# 拷贝一个 Git 仓库到本地
$ git clone [url]
```

## 配置

```shell
# 配置用户名
$ git config --global user.name "用户名"

# 配置用户邮箱
$ git config --global user.email "邮箱"

# 列出当前配置
$ git config --list

# 列出Repository配置
$ git config --local --list

# 列出全局配置
$ git config --global --list

# 列出系统配置
$ git config --system --list

# 更换git 地址
# 查看现有地址
$ git remote -v

# 替换新地址
$ git remote set-url origin [new-url]
```

## 分支

### 查

```shell
# 查看所有本地分支
$ git branch

# 查看所有远程分支
$ git branch -r

# 查看所有本地分支和远程分支
$ git branch -a
```

### 增

```shell
# 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]
```

### 切

```shell
# 从当前分支，切换到指定分支，并更新工作区
$ git checkout [branch-name]

# 创建并切换到新建分支
$ git checkout -b [branch-name]

# 切换到上一个分支
$ git checkout -
```

### 合

```shell
# 合并指定分支到当前分支
$ git merge [branch-name]

# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]

# 取消 merge
$ git merge --abort
```

### 删

```shell
# 删除分支
$ git branch -d [branch-name]

# 删除远程分支
$ git push origin --delete [branch-name]

# 删除本地有但在远程库已经不存在的分支
$ git remote prune origin
```

### 其他

```shell
# 查看哪些分支已经合并到当前分支
$ git branch --merged

# 查看哪些分支没有合并到当前分支
$ git branch --no-merged

# 查看所有本地各个分支最后一个提交对象的信息
$ git branch -v

# 查看所有远程各个分支最后一个提交对象的信息
$ git branch -r -v

# 查看所有本地分支和远程分支各个分支最后一个提交对象的信息
$ git branch -a -v

# 重命名分支
$ git branch -m [oldbranch-name] [newbranch-name]

# 拉取远程分支并创建本地分支
$ git checkout -b [branch-name] origin/远程分支名
```

## 标签

```shell
# 列出所有tag
$ git tag

# 新建一个tag在当前commit
$ git tag [tag]

# 新建一个tag在指定commit
$ git tag [tag] [commit]

# 删除本地tag
$ git tag -d [tag]

# 删除远程tag
$ git push origin :refs/tags/[tagName]

# 查看tag信息
$ git show [tag]

# 提交指定tag
$ git push [remote] [tag]

# 提交所有tag
$ git push [remote] --tags

# 新建一个分支，指向某个tag
$ git checkout -b [branch] [tag]
```

## 信息

```shell
# 显示有变更的文件
$ git status

# 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn

# 显示指定文件是什么人在什么时间修改过
$ git blame [file]

# 显示某次提交的元数据和内容变化
$ git show [commit]

# 显示某次提交发生变化的文件
$ git show --name-only [commit]

# 显示某次提交时，某个文件的内容
$ git show [commit]:[filename]

# 显示当前分支的最近几次提交
$ git reflog
```

## diff

```shell
# 显示暂存区和工作区的差异
$ git diff

# 显示暂存区和上一个commit的差异
$ git diff --cached [file]

# 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD

# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]

# 显示今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"
```

## log

```shell
# 显示当前分支的版本历史
$ git log

# 显示commit历史，以及每次commit发生变更的文件
$git log --stat

# 搜索提交历史，根据关键词
$git log -S [keyword]

# 显示某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --pretty=format:%s

# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature

# 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]

# 显示指定文件相关的每一次diff
$ git log -p [file]

# 显示过去5次提交
$ git log -5 --pretty --oneline
```

## git 提交

```shell
# 主要type
$ feat:     增加新功能
$ fix:      修复bug

# 特殊type
$ docs:     只改动了文档相关的内容
$ style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
$ build:    构造工具的或者外部依赖的改动，例如webpack，npm
$ refactor: 代码重构时使用, 无新功能
$ revert:   执行git revert打印的message
```

**个人空间地址变更后**

执行以下命令更新你本地 git 仓库的 remote 地址

```shell
git remote set-url origin https://gitee.com/whitechiina/react-cloud-music.git
```

# git 合并分支

- ### 1、首先切换到 master 分支上

```shell
git checkout master
```

- ### 2、如果是多人开发的话 需要把远程 master 上的代码 pull 下来

```shell
git pull origin master
```

- ### 3、然后我们把 dev 分支的代码合并到 master 上

```shell
git merge dev
```

- ### 4、然后查看状态及执行提交命令

```shell
git status
```

> 最后执行下面提交命令

```shell
git push origin master
```

- ### 5 其他命令

更新远程分支列表

```shell
git remote update origin --prune
```

查看所有分支

```shell
git branch -a
```

删除远程分支 Chapater6

```shell
git push origin --delete Chapater6
```

删除本地分支 Chapater6

```shell
git branch -d  Chapater6
```

## 回退版本

git reset --hard 目标版本号
