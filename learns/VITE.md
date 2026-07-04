# Vite — Ghi chú tham khảo

## Vite là gì (1 câu)

Vite là **bộ công cụ dev + build cho frontend hiện đại** — chạy trên Node.js, giúp bạn viết TSX/TS/JSX/SCSS/Tailwind và có dev server nhanh + build tối ưu cho production.

**Vite KHÔNG phải runtime.** Nó là JS library chạy TRÊN Node.js.

---

## Vai trò của Vite trong hệ sinh thái

```
Code của bạn (TSX, TS, CSS, Tailwind...)
        ↓
    [ VITE ]  ← điều phối các tool khác
        ↓
Vanilla JS + CSS mà browser hiểu được
```

Vite tự nó không transform code. Nó **gọi các tool chuyên môn**:

- **esbuild** — transform TS/TSX → JS (dev, cực nhanh)
- **Rollup** — bundle cho production
- **PostCSS** — xử lý CSS, Tailwind, Autoprefixer
- **Sass/Less** — nếu dùng preprocessor
- **lightningcss** — minify CSS (optional)

Ẩn dụ: Vite là **đầu bếp trưởng** điều phối phụ bếp (các tool), chạy trong **bếp** (Node.js).

---

## Vite làm gì cụ thể

### Ở dev mode (`vite dev`)

1. **Chạy dev server HTTP** (mặc định port 5173)
2. **Transform on-the-fly** — TSX → JS khi browser request
3. **Module resolution** — biết cách tìm `import { X } from "y"` trong node_modules
4. **HMR (Hot Module Replacement)** — sửa code → browser cập nhật ngay, giữ nguyên state
5. **Pre-bundle dependencies** — gộp node_modules lớn thành file để tải nhanh hơn
6. **Serve static files** — ảnh, font, JSON...
7. **SSR orchestration** — nếu dùng framework SSR (React Router, Remix, SvelteKit...)
8. **Plugin system** — cho phép framework/lib mở rộng (Tailwind v4, React plugin, Vue plugin...)

### Ở build mode (`vite build`)

1. **Bundle** — gộp code thành ít file hơn (dùng Rollup)
2. **Tree-shake** — bỏ code không dùng
3. **Code split** — chia thành chunks load lazy
4. **Minify** — nén JS/CSS
5. **Optimize assets** — nén ảnh, hash filename cho cache
6. **Generate source maps** — debug production
7. **Output ra `dist/`** — sau đó Vite XONG VIỆC

### Ở production runtime

**KHÔNG CÓ VITE.** Chỉ có:

- **Browser** chạy `dist/client/*.js` (static app)
- **Node.js** chạy `dist/server/*.js` (SSR app)

Vite chỉ tồn tại ở dev + build time. Deploy xong là biến mất.

---

## Mental model đúng

| Câu hỏi                                   | Trả lời                                                |
| ----------------------------------------- | ------------------------------------------------------ |
| Vite host app à?                          | Không. **Node.js host**, Vite chạy trên Node.          |
| Vite chạy code SSR của tôi à?             | Không. **Node V8 chạy code**, Vite điều phối.          |
| Vite là runtime à?                        | Không. Vite là **JS library**. Node là runtime.        |
| Vite tự transform CSS/JS à?               | Không. Nó **gọi esbuild, PostCSS, Rollup...**          |
| Production có cần Vite không?             | Không. Chỉ cần Node hoặc browser.                      |
| `localStorage is not defined` — ai throw? | **Node V8** (khi thực thi SSR). Vite chỉ hiển thị lỗi. |

---

## Lệnh cơ bản

```bash
# Dev server (thường port 5173)
npm run dev          # thường là "vite" trong package.json

# Build production
npm run build        # tạo folder dist/

# Preview build (chạy local để test build)
npm run preview      # KHÔNG dùng cho production thật

# Chạy production thật (SSR)
node dist/server/index.js
```

---

## Cấu hình chính

File `vite.config.ts` — nơi khai báo mọi thứ:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Tailwind v4

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: { "/api": "http://localhost:3000" }, // proxy API dev
  },
  resolve: {
    alias: { "@": "/src" }, // path alias
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
```

Cấu hình xong 1 lần, hầu như không đụng lại — đúng như bạn nói.

---

## Các framework build TRÊN Vite

Framework tận dụng Vite làm nền, thêm routing/SSR logic:

- **React Router v7** (framework mode)
- **Remix** (đang merge với React Router)
- **SvelteKit**
- **Nuxt** (Vue)
- **SolidStart**
- **Astro**
- **Qwik**

Nếu dùng framework, bạn hiếm khi phải config Vite trực tiếp — framework config sẵn.

---

## Vite vs các tool khác

| Tool          | Loại                    | Vai trò                              |
| ------------- | ----------------------- | ------------------------------------ |
| **Vite**      | Dev server + build tool | Toàn bộ pipeline                     |
| **esbuild**   | Transformer             | Chỉ transform TS/JSX → JS            |
| **Rollup**    | Bundler                 | Chỉ bundle (Vite dùng bên trong)     |
| **Webpack**   | Bundler + dev server    | Tương tự Vite nhưng cũ hơn, chậm hơn |
| **Turbopack** | Bundler                 | Đối thủ Vite từ Vercel               |
| **Parcel**    | Bundler + dev server    | Tương tự Vite, ít phổ biến hơn       |

Vite thắng vì **dev server cực nhanh** (nhờ ESM native + esbuild) và **plugin ecosystem tốt**.

---

## Khi nào có thể cần đụng lại Vite config

Thường không cần, nhưng có mấy tình huống:

- Thêm **path alias** (`@/components/...`)
- Cấu hình **proxy** cho API dev
- Thêm **environment variables** (file `.env`)
- Cấu hình **base URL** khi deploy dưới sub-path
- Thêm **plugin** cho lib mới (image optimizer, PWA, sentry...)
- Debug build issue (chunk size, tree-shaking...)

Với các case này, tra tại: https://vite.dev/config/

---

## Ghi nhớ ngắn gọn

- **Vite = dev server + build tool** chạy trên Node.
- **Không phải runtime.** Production chỉ cần Node hoặc browser.
- **Không tự transform code.** Nó điều phối esbuild, PostCSS, Rollup...
- **Setup 1 lần, dùng mãi.** Framework thường config sẵn.
- **Lỗi runtime khi SSR là do Node V8**, không phải Vite. Vite chỉ hiển thị.

---

## Nếu bạn cần đào sâu

- Docs: https://vite.dev
- Config: https://vite.dev/config/
- Plugin list: https://github.com/vitejs/awesome-vite
- SSR guide: https://vite.dev/guide/ssr
