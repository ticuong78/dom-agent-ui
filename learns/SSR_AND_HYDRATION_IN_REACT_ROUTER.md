# SSR & Hydration — Ghi chú tham khảo (React Router framework mode)

Tổng hợp lại các concept về server-side rendering, client-side rendering, hydration, và cách React Router điều phối chúng.

---

## 1. Bức tranh tổng quan

Trong React Router framework mode (chạy trên Vite + Node), có **2 môi trường thực thi**:

| Môi trường | Runtime                | APIs có sẵn                               | Không có                             |
| ---------- | ---------------------- | ----------------------------------------- | ------------------------------------ |
| **Server** | Node.js (V8)           | `process`, `fs`, DB drivers, secrets      | `window`, `document`, `localStorage` |
| **Client** | Browser (V8/Gecko/JSC) | `window`, `document`, `localStorage`, DOM | `process`, `fs`, secrets             |

**Cùng một file `.tsx` có thể chạy ở cả 2 nơi.** Đây là nguồn gốc của mọi rắc rối SSR.

---

## 2. Vòng đời một request SSR

```
1. Browser gửi request → Node server
2. Server chạy loader() → fetch data
3. Server render component thành HTML string
4. Server gửi HTML + <script src="client.js"> về browser
5. Browser hiển thị HTML NGAY (fast paint, SEO tốt)
6. Browser tải client.js (song song)
7. JS chạy → React library load vào memory
8. React gọi hydrateRoot() → HYDRATION bắt đầu
9. React duyệt cây component, gắn event listener vào DOM có sẵn
10. Hydration xong → trang tương tác được (bấm nút, submit form...)
11. Từ đây, app chạy như React thường (client-side) cho đến khi F5
```

**Hydration = bước cuối của khởi động SSR.** Không có "bước sau hydration" — chỉ có "app đang chạy bình thường".

---

## 3. Các hàm chạy ở đâu

| Hàm            | Chạy ở                                               | Khi nào                         | Dùng được gì                           |
| -------------- | ---------------------------------------------------- | ------------------------------- | -------------------------------------- |
| `loader`       | **Server** (SSR đầu) + **Client** (navigation)       | Trước render                    | DB, secrets, headers                   |
| `clientLoader` | **Chỉ client**                                       | Trước render (client)           | `localStorage`, `window`, browser APIs |
| `action`       | **Chỉ server**                                       | Khi submit form POST/PUT/DELETE | DB, secrets, không có browser APIs     |
| `clientAction` | **Chỉ client**                                       | Wrap action, có thể intercept   | Browser APIs + gọi action server       |
| Component      | **Server** (SSR) + **Client** (hydrate + navigation) | Render                          | Chỉ code universal                     |
| `useEffect`    | **Chỉ client**                                       | Sau khi mount                   | Browser APIs OK                        |

**Quy tắc vàng:** Nếu code dùng browser API, phải bọc trong `useEffect`, `clientLoader`, `clientAction`, hoặc file `.client.ts`.

---

## 4. Lỗi phổ biến: `localStorage is not defined`

### Nguyên nhân

`localStorage` là **JavaScript global**, không phải React API. Ở server (Node), global scope không có nó → V8 throw `ReferenceError` khi thực thi.

### Chuỗi sự kiện

```
1. Vite bảo Node chạy code SSR
2. Node V8 chạy component
3. Component có: const x = localStorage.getItem("y")
4. V8 tra biến `localStorage` trong scope → không thấy
5. V8 throw: ReferenceError: localStorage is not defined
6. Lỗi bubble up: function → React → Vite catch
7. Vite hiển thị error overlay
```

**V8 (Node) throw. Vite chỉ hiển thị.** React không "kiểm tra trước" — nó đang gọi function của bạn thì crash.

### Cách sửa

**1. `useEffect` (khuyên dùng):**

```tsx
const [value, setValue] = useState<string | null>(null);
useEffect(() => {
  setValue(localStorage.getItem("x"));
}, []);
```

**2. `typeof window` guard:**

```tsx
const value = typeof window !== "undefined" ? localStorage.getItem("x") : null;
```

⚠️ Có thể gây hydration mismatch nếu server và client render khác nhau.

**3. `useSyncExternalStore` (chuẩn nhất cho external store):**

```tsx
const value = useSyncExternalStore(
  subscribe,
  () => localStorage.getItem("x"), // client snapshot
  () => null, // server snapshot
);
```

**4. Dùng `clientLoader` + `HydrateFallback`** — xem mục 6.

---

## 5. Hydration mismatch

**Định nghĩa:** HTML server render ≠ HTML client render lần đầu → React panic vì không biết hydrate thế nào.

### Ví dụ gây mismatch

```tsx
// SAI
function Component() {
  const text =
    typeof window !== "undefined"
      ? (localStorage.getItem("name") ?? "Anonymous")
      : "Anonymous";
  return <div>{text}</div>;
}
```

- Server render: `<div>Anonymous</div>`
- Client render: `<div>An</div>` (nếu có value)
- **Không khớp** → warning.

### Cách tránh

- Render giống nhau lần đầu, cập nhật sau qua `useEffect`.
- Dùng `suppressHydrationWarning` cho trường hợp cố ý khác (như thời gian hiện tại).
- Dùng `useSyncExternalStore` với server snapshot rõ ràng.

---

## 6. HydrateFallback — server làm gì khi client cần ưu tiên

### Vấn đề

Route chỉ có `clientLoader`, không có `loader` server:

```tsx
export async function clientLoader() {
  const visitorId = localStorage.getItem("visitor_id");
  return { visitorId };
}

export default function Page({ loaderData }) {
  return <div>Visitor: {loaderData.visitorId}</div>;
}
```

Server không thể render `<Page />` vì:

- `loaderData` là `undefined` (clientLoader chưa chạy).
- Render component sẽ crash hoặc render sai.

### Giải pháp: `HydrateFallback`

Component **server render tạm** cho đến khi client hydrate và chạy `clientLoader`.

```tsx
export async function clientLoader() {
  const visitorId = localStorage.getItem("visitor_id");
  return { visitorId };
}

export function HydrateFallback() {
  return <Skeleton />;
}

export default function Page({ loaderData }) {
  return <div>Visitor: {loaderData.visitorId}</div>;
}
```

### Flow

```
[Server]
1. Router thấy route có clientLoader (không có loader server)
2. Render <HydrateFallback /> thay vì <Page />
3. Gửi HTML fallback về browser

[Browser]
4. Hiển thị fallback ngay (fast paint)
5. Tải JS bundle
6. Client chạy clientLoader → đọc localStorage
7. Client render <Page /> với loaderData thật
8. UI update: fallback → nội dung thật
```

### 4 lựa chọn của server khi client cần ưu tiên

1. **Render HydrateFallback** — nếu bạn khai báo cho route đó.
2. **Bubble up tìm fallback cha** — nếu route con không có, tìm ở route cha/root/layout.
3. **Component tự bảo vệ** — component kiểm tra `if (!loaderData) return <Loading />`.
4. **`clientLoader.hydrate = true`** — ép chạy clientLoader cả ở lần hydrate đầu.

### Lợi ích

- User thấy nội dung ngay (không trang trắng).
- Không crash vì thiếu client data.
- SEO tốt (có HTML).
- Progressive enhancement — HTML có ngay, JS "nâng cấp" sau.

---

## 7. Điều gì KHÔNG xảy ra (myth debunk)

Những điều tưởng đúng nhưng SAI:

- ❌ Vite/React **không cache** `localStorage` vào server memory.
- ❌ Server **không "biết"** dữ liệu localStorage của browser trừ khi browser gửi lên (cookie/header/form).
- ❌ `clientLoader` **không "chuẩn bị" gì cho server** — nó chỉ là chỉ báo để framework skip SSR.
- ❌ React **không tự exception** khi thấy code browser-only — vì `localStorage` không phải React API, là JS global.
- ❌ Vite **không kiểm tra biến có tồn tại ở build time** — chỉ parse cú pháp. Lỗi runtime khi thực thi.

### Sự thật

- Server và client là **2 process khác nhau, 2 machine khác nhau** khi deploy.
- **Không có magic sync** giữa localStorage và server memory.
- Server chỉ biết dữ liệu client qua **4 kênh**: cookie, header, form/body, URL query.

---

## 8. Kiến trúc app SSR "khỏe mạnh"

### Nguyên tắc

1. **Universal data ở loader server** — data từ DB, API public → SSR có sẵn.
2. **Client-only data ở clientLoader** — localStorage, geolocation, screen size, user preference.
3. **Fallback rõ ràng** — HydrateFallback cho route cần client data.
4. **Component pure** — top-level không dùng browser API. Browser API chỉ trong `useEffect`.
5. **Secrets chỉ server** — action/loader server dùng secrets. Không bao giờ import secret vào file component.
6. **Progressive enhancement** — HTML có nội dung ý nghĩa ngay cả khi JS chưa load.

### Anti-patterns

```tsx
// ❌ SAI — component crash trên server
export default function Page() {
  const theme = localStorage.getItem("theme");
  return <div className={theme}>...</div>;
}

// ❌ SAI — secret vào client bundle
import { SERVICE_ROLE_KEY } from "./config";
export default function Page() {
  const admin = createClient(url, SERVICE_ROLE_KEY);
  // ...
}

// ❌ SAI — component không handle loaderData undefined
export default function Page({ loaderData }) {
  return <div>{loaderData.visitor.name}</div>; // crash nếu loaderData null
}
```

### Đúng

```tsx
// ✅ ĐÚNG — browser API trong useEffect
export default function Page() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    setTheme(localStorage.getItem("theme") ?? "light");
  }, []);
  return <div className={theme}>...</div>;
}

// ✅ ĐÚNG — secret trong action server
export async function action({ request }) {
  const admin = createClient(url, process.env.SERVICE_ROLE_KEY);
  // ...
}

// ✅ ĐÚNG — defensive rendering
export default function Page({ loaderData }) {
  if (!loaderData?.visitor) return <Skeleton />;
  return <div>{loaderData.visitor.name}</div>;
}
```

---

## 9. Bảng tra nhanh — dùng cái gì

| Muốn làm gì                                   | Dùng gì                                             |
| --------------------------------------------- | --------------------------------------------------- |
| Fetch data từ DB cho SSR                      | `loader` (server)                                   |
| Đọc localStorage                              | `useEffect` hoặc `clientLoader`                     |
| Xử lý form submit                             | `action` (server)                                   |
| Fetch API public trước render                 | `loader`                                            |
| Tracking client-side (visitor_id)             | `clientLoader` + `HydrateFallback`                  |
| Show loading state trong lúc chờ              | `HydrateFallback` (route) hoặc Suspense (component) |
| Gọi API cần auth secret                       | `action` hoặc `loader` (server)                     |
| Cập nhật state theo user input                | `useState` + event handlers                         |
| Sync với external store (localStorage, theme) | `useSyncExternalStore`                              |
| Chạy code chỉ khi mount                       | `useEffect(() => {...}, [])`                        |

---

## 10. Debug checklist khi gặp lỗi SSR

Khi thấy `xxx is not defined` hoặc hydration mismatch:

1. **Search codebase** — `grep -rn "localStorage" app/` để tìm mọi nơi dùng browser API.
2. **Xem error stack trace** — dòng nào crash, file nào?
3. **Kiểm tra top-level component** — có dùng browser API không? Phải bọc `useEffect`.
4. **Kiểm tra clientLoader** — có kèm `HydrateFallback` không?
5. **Kiểm tra loaderData** — có defensive check chưa (`loaderData?.x`)?
6. **Console.log ở server** — thêm log trong loader/action, xem output ở terminal Node.
7. **Devtools Network tab** — xem HTML server render có nội dung gì.

---

## 11. Ghi nhớ ngắn gọn

- **SSR = server render HTML → client hydrate → app chạy như React thường.**
- **Server không có browser APIs. Client không có server secrets.**
- **Component chạy CẢ 2 nơi → không dùng browser API ở top-level.**
- **`clientLoader` = "route này cần client, đừng SSR component chính".**
- **`HydrateFallback` = "render cái này tạm cho đến khi client sẵn sàng".**
- **Không có magic sync giữa server và client memory.** Data đi qua request/response.
- **Lỗi runtime, không phải build time.** V8 throw khi thực thi, Vite chỉ hiển thị.
- Khi chúng ta throw một redirect về response thì react router fm sẽ xem đó như là một exception và cho phép catch. Nếu chúng ta catch thành công thì có thể resolve hoặc kích hoạt logic khác, còn nếu chúng ta return thì react router sẽ xem đây là một response bình thường và trả về ok với statusCode là 302, có nghĩa là chuyển hướng hợp lệ.

---

## 12. Đọc thêm khi cần

- React Router clientLoader: https://reactrouter.com/api/data-routers/clientLoader
- React Router HydrateFallback: https://reactrouter.com/api/data-routers/HydrateFallback
- React hydration: https://react.dev/reference/react-dom/client/hydrateRoot
- useSyncExternalStore: https://react.dev/reference/react/useSyncExternalStore
