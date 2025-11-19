import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const httpbin = "https://httpbin.org";
const apifox = "https://echo.apifox.com/anything";
const mockHeader = "x-mock-enabled";

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: httpbin,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            proxyReq.setHeader("X-Special-Proxy-Header", "foobar");
            let body = "";
            req.on("data", (chunk) => {
              body += chunk.toString();
            });
            req.on("end", () => {
              console.log(
                proxyReq.method,
                proxyReq.protocol,
                proxyReq.host,
                proxyReq.path,
                req.headers,
                body,
                options,
              );
            });
          });
        },
        bypass: (req, res) => {
          if (req.headers[mockHeader] === "true") {
            console.log("bypass handler", req.url, req.headers);
            delete req.headers[mockHeader];
            fetch(apifox + req.url, {
              method: req.method,
              headers: req.headers,
              body: req.method === "GET" ? null : req.body,
            }).then((response) => {
              response.text().then((text) => {
                console.log("response", text);
                // res.setHeader("Content-Type", "application/json");
                res.end(text);
              });
            });
          } else {
            return false;
          }
        },
      },
    },
  },
});
