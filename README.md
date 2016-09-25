## CloudNotes v0.1
### Private: 一个结合了 Angular, Ionic, NodeJS, MongoDB 的实训项目

<br/>

### 我的云笔记
这是一个使用 Ionic 制作的云笔记App, 以 Markdown 作为解析器，可以方便的使用 Markdown 语法进行记录笔记内容。
(里面使用到了有道云的图标，向有道云致敬)

<br/>

### 使用到的技术：
    HTML, CSS, Javascript
    AngularJS
    Ionic
    NodeJS
    MongoDB

### 如何启动
1. 必须安装好，Ionic, NodeJS, MongoDB 的环境配置

2. 安装好后，先运行 MongoDB 的服务，再运行 NodeJS，最后运行 Ionic

3. 在程序的 /node-server/model/Db 里对数据库连接的配置，默认是 **127.0.0.1:27017/cloudNotes**

4. 关于启动 MongoDB, 在 MongoDb目录下 命令行运行 **Mongod --config Mongodb.config** (根据你的配置情况而定)

5. 关于启动 NodeJS , 在 /node-server/ 命令行运行 **Node app.js**

6. 关于启动 Ionic, 在 /CloudNotes/ 命令行运行 **ionic serve**

<br/>

### 下一个版本
#### v0.2
将完善更多功能

### 更新内容

#### v0.1   <font style='float:right;font-family:consolas' size='-1' color='#888'> 2016-09-25 </font>
初步制作， 完成了编辑，存储，修改，等大部分内容


<br/>


### 更多浏览

![1](http://img.blog.csdn.net/20160925145100769)
![2](http://img.blog.csdn.net/20160925145109203)
![3](http://img.blog.csdn.net/20160925145117235)
![4](http://img.blog.csdn.net/20160925145125922)

<br/>

### 编译打包
使用 Ionic 命令行， 进行编译打包成 Android App, Ios App.

######以Ios为例子：

    // 添加ios平台
    ionic platform ios android
    ionic build ios
    ionic emulate ios [options]
    ionic run ios [options]

<br/>

### 关于
禁止任何商业使用

