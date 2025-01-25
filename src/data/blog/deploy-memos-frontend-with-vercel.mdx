---
title: Memos 前端部署至 Vercel 小记
date: 2025-01-24 20:16:23
tags: 
- Vercel
- Memos
category: 技术教程
---

## 问题的提出

由于博主的个人服务器使用的 [SakuraFrp](https://www.natfrp.com/) 的内网穿透的白嫖计划，只有两条隧道，且每个隧道不能使用泛域名，只能绑定三个域名，当某个自部署服务使用Docker 镜像部署到本地后，如果整个服务的入口反向代理到公网访问，那么仅有的 6 个域名肯定是不够的。

## 问题的解决

针对一些服务，在软件架构上，属于前后端分离的模式，则可以将前端构建后部署到外部，如 Vercel 这样的平台，首先需要稍微修改下前端项目进行接口的函数，将后端请求的接口通过 Nginx 这样的网关暴露到一个某一个域名的子路径，然后配置跨域即可。

## 操作的实例

接下来，我将以 [Memos](https://github.com/usememos/memos) 部署为例，简述整个过程。

### 配置环境变量

Memos 使用 Vite 构建 Web 页面，首先需要将请求接口的环境变量，配置在工程中：

```js
export default defineConfig({
  define: {
    VITE_API_HOST: JSON.stringify(process.env.VITE_API_HOST)
  }
}
```

上述操作是将构建进程中环境变量映射到当前项目中，然后在项目中使用 `import.meta.env.VITE_API_HOST` 访问，详细内容可参考官方文档：[Env Variables and Modes | Vite](https://vite.dev/guide/env-and-mode.html)。

### 请求接口替换

观察到 Memos 前端构建后，是直接嵌入后端二进制文件的服务器中的，也就是直接使用 `window.location.origin` 作为 `baseUrl` 发起 
HTTP 请求的，所以直接全局搜替换即可，当然最好是写成如下的短路运算：

```js
const channel = createChannel(
  import.meta.env.VITE_API_HOST || window.location.origin,
  FetchTransport({
    credentials: "include",
  }),
);
```

当然除了这个接口请求还有几个附件链接的拼接过程，搜索 `window.location.origin` 做类似调整即可。

### 网关跨域配置

```nginx
  location ^~ /memos/ {
    rewrite ^/memos(/.*) $1 break;
    proxy_pass       http://172.17.0.1:5230;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Scheme $scheme;
    proxy_set_header X-Forwarded-Proto  $scheme;
    proxy_set_header X-Forwarded-For    $remote_addr;
    proxy_set_header X-Real-IP		$remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $http_connection;
    proxy_http_version 1.1;

	add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
	add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
    add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range'; 
  }
```

### SPA 重定向问题

SPA 应用打包后，一般只有`index.html`这一个`html`文件，然后引入`css`和`js`文件，前端路由库在解析 URL 从而让对应路由的 DOM，然后渲染生成不同的页面，从而达到了跳转路由的目的。

对于带有 `pathname` 的二级页面路由，如 `https://memos.mahoo12138.cn/about`，浏览器将请求 `about.html` 这个文件，这肯定是是没有，所以报错 404。

解决的办法是，直接把所有的请求都指向`index.html`，返回`index.html`后，对于在 vercel 部署的项目，在根目录新建 `vercel.json`文件，指定一个重写规则

```js
{
	"rewrites": [{ 
        "source": "/:path*", 
        "destination": "/index.html" 
    }]
}
```

- `":path*"` 是一个通配符，表示匹配所有路径；
- `"destination": "/index.html"` 则指定了将所有请求重定向到 `index.html` 文件。



