# Git常用命令

## 1. Git 配置

- **配置用户信息**
  设置 Git 用户名和邮箱地址，用于标记提交：

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

- **查看配置**
  查看当前配置的用户名和邮箱：

```bash
git config --list
```

## 2. 仓库操作

- **初始化仓库**
  在当前目录初始化一个新的 Git 仓库：

  ```bash
  git init
  ```

- **克隆远程仓库**
  克隆一个远程仓库到本地：

  ```bash
  git clone https://github.com/username/repository.git
  ```

## 3. 查看状态和日志

- **查看工作区和暂存区的状态**
  查看哪些文件被修改、哪些文件在暂存区：

  ```bash
  git status
  ```

- **查看提交历史**
  查看提交日志：

  ```bash
  git log
  ```

- **简洁的提交日志**
  查看简洁版提交历史：

  ```bash
  git log --oneline
  ```

## 4. 添加、修改、删除文件

- **添加文件到暂存区**
  将文件添加到 Git 暂存区（准备提交）：

  ```bash
  git add <file>
  ```

  添加所有修改过的文件：

  ```bash
  git add .
  ```

- **删除文件**
  删除文件并将删除操作添加到暂存区：

  ```bash
  git rm <file>
  ```

  删除文件但保留工作区文件：

  ```bash
  git rm --cached <file>
  ```

- **查看修改内容**
  查看文件修改内容：

  ```bash
  git diff
  ```

## 5. 提交操作

- **提交更改**
  提交已暂存的文件并附上提交信息：

  ```bash
  git commit -m "提交信息"
  ```

- **提交并跳过暂存区**
  直接提交所有已修改文件（跳过暂存区）：

  ```bash
  git commit -a -m "提交信息"
  ```

## 6. 分支操作

- **查看所有分支**
  查看当前仓库的所有分支：

  ```bash
  git branch
  ```

- **创建新分支**
  创建并切换到新分支：

  ```bash
  git checkout -b <branch-name>
  ```

- **切换分支**
  切换到一个已存在的分支：

  ```bash
  git checkout <branch-name>
  ```

- **删除本地分支**
  删除本地分支：

  ```bash
  git branch -d <branch-name>
  ```

- **合并分支**
  将指定分支合并到当前分支：

  ```bash
  git merge <branch-name>
  ```

## 7. 远程操作

- **查看远程仓库**
  查看当前仓库配置的远程仓库：

  ```bash
  git remote -v
  ```

- **添加远程仓库**
  为本地仓库添加远程仓库：

  ```bash
  git remote add origin <远程仓库地址>
  ```

- **推送到远程仓库**
  将本地分支推送到远程仓库：

  ```bash
  git push origin <branch-name>
  ```

- **拉取远程仓库的更改**
  从远程仓库拉取并合并更改：

  ```bash
  git pull origin <branch-name>
  ```

- **从远程仓库拉取分支**
  拉取并切换到远程分支：

  ```bash
  git fetch origin <branch-name>
  git checkout <branch-name>
  ```

## 8. 撤销操作

- **撤销文件的修改**
  撤销工作区对文件的修改（恢复为最新的提交状态）：

  ```bash
  git checkout -- <file>
  ```

- **撤销所有文件的修改**（恢复所有文件到上次提交时的状态）：

  ```bash
  git checkout -- .
  ```

- **撤销暂存区的文件**（即取消 `git add`）
  将文件从暂存区移除，但保留工作区的修改：

  ```bash
  git reset <file>
  ```

- **撤销所有文件的暂存**：

  ```bash
  git reset
  ```

- **撤销提交**

  - `git reset`

    - 撤销最近一次的提交，并保留修改在暂存区：

      ```bash
      git reset --soft HEAD~1
      ```

    - 撤销最近一次的提交，并保留修改在工作区：

      ```bash
      git reset --mixed HEAD~1
      ```

    - 完全撤销最近一次的提交和修改：

      ```bash
      git reset --hard HEAD~1
      ```

  - `git revert`

    - **`git revert`** 是 Git 中用于撤销某个提交并生成一个新的提交的命令。与 `git reset` 不同，`git revert` 不会修改项目历史，而是创建一个新的提交来“反转”指定的提交内容。这意味着它是一个 **安全的撤销操作**，适合在多人协作的仓库中使用，因为它不会影响提交历史或导致历史重写。

    - 撤销单个提交（通过其提交哈希值）：这会创建一个新的提交，这个新的提交的内容是 `<commit-hash>` 提交的反向更改（即撤销 `<commit-hash>` 所做的所有更改）。

      ```bash
      git revert <commit-hash>
      ```

    - 撤销多个提交，例如，撤销最近的 3 个提交：

      ```bash
      git revert HEAD~3..HEAD
      ```

      这将会撤销从 `HEAD~3`（第三个最新的提交）到 `HEAD`（最新提交）之间的所有提交。你也可以指定具体的提交范围，如：

      ```bash
      git revert <commit-hash1>^..<commit-hash2>
      ```

      这会撤销从 `<commit-hash1>` 之后的所有提交直到 `<commit-hash2>` 为止。

- **撤销合并操作**

  - `git reset`

    - 撤销合并并恢复到合并前的状态，`ORIG_HEAD` 是合并前的 HEAD 指针：

      ```bash
      git reset --hard ORIG_HEAD
      ```

  - `git revert`

    - 撤销并合并多个提交

      将多个提交撤销合并为一个提交，可以使用 `-n` 或 `--no-commit` 选项，这样每个 `revert` 都会暂停等待手动提交，直到确定合并所有反向更改：

      ```bash
      git revert -n <commit-hash1> <commit-hash2> <commit-hash3>
      ```

      然后你可以手动提交所有反向更改，创建一个合并提交：

      ```bash
      git commit -m "Revert multiple commits"
      ```

- **撤销与远程仓库的更改**

  撤销远程的提交并回滚到上一个提交（并推送到远程）：

  ```bash
  git reset --hard HEAD~1
  git push --force
  ```

## 9. 查看和修复提交

- **修改上一次提交**
  修改提交信息或添加忘记的文件到上一次提交：

  ```bash
  git commit --amend
  ```

- **恢复文件到特定提交状态**
  恢复某个文件到指定提交的状态：

  ```bash
  git checkout <commit-hash> -- <file>
  ```

## 10. Git 标签

- **创建标签**
  创建一个新的标签：

  ```bash
  git tag <tag-name>
  ```

- **推送标签到远程**
  将标签推送到远程仓库：

  ```bash
  git push origin <tag-name>
  ```

## 11. Git 其他常用命令

- **查看分支合并情况**
  查看分支合并情况和历史：

  ```bash
  git log --graph --oneline --all
  ```

- **清理无用文件**
  删除没有跟踪的文件：

  ```bash
  git clean -fd
  ```