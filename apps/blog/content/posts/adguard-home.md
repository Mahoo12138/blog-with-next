---
title: DNS 相关之鼓捣 AdGuard Home
date: 2024-10-25 14:48:43
category: 折腾记录
tags:
  - AdGuard
  - DNS
---

## 禁用 dnsmasq

Ubuntu 默认使用 dnsmasq 作为 DNS 服务器，也就监听着 53 端口，再部署 AdGuard Home 前，我们需要做一些调整：

- 一是继续使用 dnsmasq，AdGuard Home 使用其他端口。通过设置转发或者设置上游的方式将 AdGuard Home 作为 dnsmasq 的上游 DNS 服务器。但这样在 AdGuard Home 无法得知查询 DNS 的客户端，使得部分日志和统计功能变得无意义。
- 另外一种就是 AdGuard Home 使用 `53` 端口作为默认的 DNS 服务器，dnsmasq 则使用其他端口，或者是直接禁用 dnsmasq 。

需要了解下基本概念和逻辑

- **systemd-resolved**：是一个 DNS 解析器，负责处理 DNS 查询和响应。它支持 DNS 缓存、DNSSEC、上游 DNS 配置等功能。默认情况下，它会监听在 `127.0.0.53` 上，接受来自本地程序的 DNS 查询请求。

- **dnsmasq**：是一个轻量级的 DNS 代理和 DHCP 服务器。它可以提供 DNS 缓存和转发功能，从而加快 DNS 查询速度并减少上游 DNS 服务器的负担。`dnsmasq` 可以配置为一个或多个上游 DNS 服务器。

在此，我们直接选择禁用原有的 dns 解析服务器：

```bash
sudo systemctl disable systemd-resolved
sudo systemctl stop systemd-resolved

sudo systemctl disable dnsmasq
sudo systemctl stop dnsmasq
```

然后再次检查下 53 端口是否被占用：

```bash
sudo lsof -i :53
```

## 安装 AdGuard Home

```yaml
name: adguard-home
services:
  adguard-home:
    cpu_shares: 90
    command: []
    container_name: adguard-home
    deploy:
      resources:
        limits:
          memory: 15719M
        reservations:
          memory: '67108864'
    hostname: adguard-home
    cover: adguard/adguardhome:v0.107.41
    ports:
      - target: 53
        published: '53'
        protocol: tcp
      - target: 53
        published: '53'
        protocol: udp
      - target: 3000
        published: '3000'
        protocol: tcp
      - target: 853
        published: '853'
        protocol: tcp
      - target: 784
        published: '784'
        protocol: udp
    restart: unless-stopped
    volumes:
      - type: bind
        source: /DATA/AppData/adguard-home/opt/adguardhome/work
        target: /opt/adguardhome/work
      - type: bind
        source: /DATA/AppData/adguard-home/opt/adguardhome/conf
        target: /opt/adguardhome/conf
    devices: []
    cap_add: []
    environment: []
    network_mode: bridge
    privileged: false
```

启动成功后, 访问 `http://ip:3000`, 第一次会进入一个配置页面. 这个配置页面会要求我们初始化用户名密码及一些常规配置。

注意设置端口时，要保持刚在 docker 文件中的端口配置，不然安装成功后，就打不开了：

- 3000 是 Web 管理端口
- 53 是 DNS 默认端口

## 配置 AdGuard Home

这里主要是设置一个上游 DNS 服务器，可以添加一个或多个上游DNS服务，建议是国外一个，国内一个，国外优先，这样更有保障：

```text
114.114.114.114
1.1.1.1
```

之后按照 AdGuard Home 在各个客户端的指引，设置好 DNS 服务器，测试下能否正常解析：

```shell
# windows
nslookup google.com 192.168.1.100
# linux
host google.com 192.168.1.100
```

在浏览器中也能进行验证，例如 chrome ：

- 打开`chrome ://net-internals/?#dns`
- 先「Clear host cache」，然后 Domain 中输入 google.com，「Lookup」

## 配置 Tailscale DNS

然后我们可以把 AdGuard Home 的 DNS 服务器地址，配置到 Tailscale DNS，让 Tailscale 网络内的所有设备都使用这个 DNS：

- 打开 Tailscale Admin Console， 切换到 DNS 一栏；
- 在「Nameservers」-> 「Global nameservers」中，填写安装了 AdGuard Home 的机器的 Tailscale IP；
- 然后启用「Override local DNS」；

## AdGuard Home 重写解析

该功能可以方便的把一个域名指向一个 IP ，简单来说相当于 hosts ，自定义域名解析。

在 AdGuard Home 管理后台的「过滤器」-> 「DNS 重写」中，根据自己需求添加规则，例如我的：

| 域名         | 应答         |
| ------------ | ------------ |
| \*.mahoo.lab | 100.121.38.1 |
|              |              |

##

## 代理软件配置

完成上述的步骤后，在配置了 Tailscale 网络的设备上，就能直接解析 `*.mahoo.lab`域名了。但是如果通过代理软件访问的话，又会导致没法解析了，例如使用 Clash 内核的代理/ VPN 软件，有两点：

- 配置中需要重写 DNS；
- 需要关闭虚拟网卡，这个大概是路由表冲突了，不太了解；
