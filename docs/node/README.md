# nest.js

[nest.js 中文官网][https://docs.nestjs.cn/9/introduction]

## 介绍

​ Nest 是一个用于构建高效，可扩展的 [Node.js](http://nodejs.cn/) 服务器端应用程序的框架。它使用渐进式 JavaScript，内置并完全支持 [TypeScript](https://www.tslang.cn/)（但仍然允许开发人员使用纯 JavaScript 编写代码）并结合了 OOP（面向对象编程），FP（函数式编程）和 FRP（函数式响应编程）的元素。

​ 在底层，Nest 使用强大的 HTTP Server 框架，如 Express（默认）和 Fastify。Nest 在这些框架之上提供了一定程度的抽象，同时也将其 API 直接暴露给开发人员。这样可以轻松使用每个平台的无数第三方模块。

## 内置框架

### express(默认)

[express 文档][https://www.expressjs.com.cn/]

能够快速构建服务端应用程序，容易上手

### Fastify

[Fastify 文档][https://www.fastify.cn/]

快速并且低开销的 web 框架

## Middleware

Nest.js 基于 Express 自然可以使用中间件，但是做了进一步的细分，分为全局中间件和路由中间件：

- 全局中间件：在请求之前和之后加入一些处理逻辑，每个请求都会走到这里
- 路由中间件：针对某个路由，范围更小一点

## Guard

Guard 是路由守卫的意思，可以用于调用某个 Controller 之前判断权限，返回 true 或者 false 来决定是否放行，Guard 可以抽离路由的访问控制逻辑，但是不能对请求、响应做修改，这种逻辑可以使用 Interceptor，

也分为全局守卫和路由守卫。

## Interceptor

Interceptor 是拦截器的意思，可以在目标 Controller 方法前后加入一些逻辑

## Pipe

Pipe 是管道的意思，用来对参数做一些验证和转换

## ExceptionFilter

ExceptionFilter 可以对抛出的异常做处理，返回对应的响应

## 调用顺序

进入路由会先调用 Guard，判断有没有权限，如果没有权限，这里就抛异常了，抛出的 HttpException 会被 ExceptionFilter 处理。如果有权限，就会调用拦截器，拦截器一个个的调用，最后会调用 controller 的方法，调用 controller 的方法之前，会使用 pipe 对参数做处理。
<Valine></Valine>
