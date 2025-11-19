# Vue 3 + Vite

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
