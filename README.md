
# 江西师范大学 外国语学院 智语新航教学管理系统

## 基本文件结构：

### components：
这个文件夹放置组件
#### dialogs：
一些模态框
#### editors:
编辑器组件
#### list-item:
放置列表控件
#### sections：
单页面的其他节，比如说有任务页面，点击具体的任务，进入任务细节，这个任务细节仍然处于本页面，显示的具体情况就是一个sections页面
#### widgets
一些控件，app文件夹放置的是一些功能模块组件，layout是一些泛用的控件，比如说List，package则是一些特殊功能的模块
### css：
放置比较大的css
### functions：
放置一些比较大的功能
### icons：
从外部引入的图标，通过demo_index.html可以看到具体的图标情况
### router：
路由
### services：
访问服务器的api，从config中更改服务器的地址
### store：
持久存储
### views：
这个文件夹放置具体页面
### local-cors-proxy.bat:
这个批处理指令用于开启代理服务器，只不过目前FastAPI服务程序已经将CORS策略设置为了全部通过，所以目前而言，它没啥用。


# app构建方式

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
