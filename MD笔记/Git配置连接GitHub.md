# Git配置连接GitHub

> 来源：[Git配置连接GitHub](https://www.cnblogs.com/linshengqian/p/15065553.html) 

## 1. 新建仓库

![](images\2144260-20210210143313879-2125826169.png)

## 2.Git连接GitHub远程仓库

Github支持两种同步方式`“https”`和`“ssh”`。

如果使用`https`很简单基本不需要配置就可以使用，但是每次提交代码和下载代码时都需要输入用户名和密码。

如果使用`ssh`方式就需要客户端先生成一个密钥对，即一个公钥一个私钥。然后还需要把公钥放到githib的服务器上。

我们直接演示ssh方式

- 首先您可以在”任意盘符“新建一个空白文件夹。
- 然后进入刚刚创建文件夹内鼠标右键
- 选择`git bash here`弹出了`git`命令控制台！

 因为Git是分布式版本控制系统，所以需要填写用户名和邮箱作为一个标识。

- 刚开始在控制命令台输入以下命令：

```bash
git config --global user.name "XXXX"  用户名标识  ---- 实际也可以填写您的github仓库的名称git config --global user.email "xxxx@xxx.com"  邮箱标识  -------可以填写github仓库的邮箱 
```

注意：`git config --global` “参数"，有了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然你也可以对某个仓库指定的不同的用户名和邮箱。

- 创建`SSH Key`。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有`id_rsa`和`id_rsa.pub`这两个文件，如果有的话，直接跳过此如下命令，如果没有的话，打开命令行，输入如下命令：

```bash
ssh-keygen -t rsa  //--创建秘钥
```

![](images\ssh创建密钥.png)

- 直接回车默认即可，秘钥的存放路径在图中！（一般就在C:\Users\Administrator.ssh）

![](images\2144260-20210210141238344-1763574377.png)

- 里面有2个文件一个是公钥 一个是私钥，打开方式用记事本打开即可：
- 打开公钥复制里面的内容

![](images\2144260-20210210142024105-1721780640.png)

## 3.远程github配置ssh秘钥

密钥生成后需要在github上配置密钥本地才可以顺利访问。

进入github右上角你账号的头像选择settings

进去之后选择 SSH and GPG keys

![](images\2144260-20210210142421415-2051802105.png)

![](images\2144260-20210210142842621-692781828.png)

**以上完成之后就是 连接指定仓库**

git工具使用以下命令

看是否有没有远程 仓库源

```bash
git remote      //--git查看远程仓库信息
```

![](images\2144260-20210210144515843-820456060.png)

出现以上错误就是改文件夹没有 git init 他不是一个仓库文件夹

![](images\2144260-20210210144814174-1900831386.png)

之后在输入

![](images\2144260-20210210144833533-2077262239.png)

没有任何显示就是没有仓库信息

没有我们当然要创建咯

```bash
git remote add JAVAstudy git@github.com:ther-crayon/testdom.git
```

![](images\2144260-20210210145024075-345583472.png)

```bash
git remote -v
```

![](images\2144260-20210210145159710-1259541137.png)

已经成功了。

把本地库的内容推送到远程，使用 git push JAVAstudy master命令，实际上是把当前分支master推送到远程

由于远程库是空的，我们第一次推送`master`分支时，加上 `–u`参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，推送成功后，可以立刻在github页面中看到远程库的内容已经和本地一模一样了

只要本地作了提交，就可以通过如下命令：`git push JAVAstudy master`把本地master分支的最新修改推送到github上了