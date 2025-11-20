# Vue 3 + Vite

> 实际使用场景：开发时，后端开发了一部分接口，前端比如本项目里的 httpbin.org，后期肯定也是要全部使用这个 Host 作为 API 接口的。但是还有一部分是尚未开发的，这个时候，定义好接口字段，使用 apifox 或者 postman 的线上 mock 服务，先进行页面的开发。于是就想定义一个 header，而不修改 URL，这样后期改动更小，vite proxy 根据这个 header 动态转发到不同的 Host 即可。

> 经小伙伴提醒，这个功能可以在接口请求层改写 URL prefix，比如检测到指定的 header，则把请求的 URL prefix 改为 mock 的，这样在 vite proxy 写两个转发规则即可。比如 `/api` 改成 `/mock-api`。但还是想继续探索动态 proxy 的可能性。

动态 proxy 的尝试

尝试了 bypass 直接返回 url：
```js
bypass: (req, res) => {
  console.log("bypass handler", req.url);
  if (req.headers[mockHeader] === "true") {
    return apifox + req.url;
  } else {
    return false;
  }
}
```

尝试了 configure 重写 target:
```js
configure: (req, res) => {
  console.log("configure handler", req.url);
  if (req.headers[mockHeader] === "true") {
    const mockUrlObj = new URL(apifox);
    proxyReq.setHeader('Host', mockUrlObj.host);
    proxyReq.path = req.url!.replace(/^\/api/, "");
  } else {
    return false;
  }
}
```

以上方案均失败。

实际代码里也是不成功的 :(
