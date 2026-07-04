import { Form, useActionData, useNavigation, useParams } from "react-router";
import type { Route } from "./+types/ComingSoonPage";
import { createSupabaseServerClient } from "~/lib/supabase/supabase.server";
import { createContact } from "~/features/contacts/contact.mutation";
import { useEffect, useState } from "react";
import { VISITOR_ID_KEY } from "~/constant";

// === Server-side loader: fetch danh sách city ===
export async function loader() {
  // TODO: thay bằng fetch từ nguồn thật (Supabase, API địa lý...)
  const cities = [
    { code: "HN", name: "Hà Nội" },
    { code: "HCM", name: "TP. Hồ Chí Minh" },
    { code: "DN", name: "Đà Nẵng" },
    { code: "HP", name: "Hải Phòng" },
    { code: "CT", name: "Cần Thơ" },
  ];
  return { cities };
}

// === Server-side action: xử lý form submit ===
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const source = String(formData.get("source") ?? "").trim();
  const visitor_id = String(formData.get("visitor_id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: Record<string, string> = {};
  if (!email) errors.email = "Vui lòng nhập email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Email không hợp lệ.";

  if (phone && !/^[+\d\s().-]{6,20}$/.test(phone))
    errors.phone = "Số điện thoại không hợp lệ.";

  if (Object.keys(errors).length > 0) {
    return { ok: false as const, errors };
  }

  try {
    const { supabase, headers } = createSupabaseServerClient(request);

    createContact(supabase, {
      email,
      visitor_id,
      name,
      phone,
      city,
      message,
      source,
    });

    return { ok: true as const, message: "Cảm ơn bạn đã đăng ký!" };
  } catch (err) {
    return {
      ok: false as const,
      errors: { form: "Có lỗi xảy ra, vui lòng thử lại." },
    };
  }
}

// === Component ===
export default function ComingSoonPage({ loaderData }: Route.ComponentProps) {
  const { cities } = loaderData;
  const params = useParams();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isSuccess = actionData?.ok === true;
  const errors = actionData?.ok === false ? actionData.errors : {};
  const [visitorId, setVisitorId] = useState<string>("");

  useEffect(() => {
    const cachedVisitorId = localStorage.getItem(VISITOR_ID_KEY) || "";
    setVisitorId(cachedVisitorId);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 md:items-start md:py-24">
        {/* === Cột trái: Giới thiệu dự án === */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Đang phát triển
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            [Tên sản phẩm] <br />
            <span className="text-neutral-500">sắp ra mắt.</span>
          </h1>

          <p className="text-lg leading-relaxed text-neutral-600">
            Một câu mô tả ngắn giải thích sản phẩm giải quyết vấn đề gì cho ai.
            Nói rõ giá trị cốt lõi trong 1-2 câu.
          </p>

          <div className="space-y-3 pt-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Những gì đang được xây dựng
            </h2>
            <ul className="space-y-2">
              {[
                "Tính năng chính thứ nhất giải quyết vấn đề X",
                "Tính năng chính thứ hai giúp bạn làm Y nhanh hơn",
                "Tính năng chính thứ ba tích hợp với công cụ Z",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-neutral-700"
                >
                  <svg
                    className="mt-1 h-4 w-4 shrink-0 text-neutral-900"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6">
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
              <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                Ảnh/Video demo sản phẩm
              </div>
            </div>
            <p className="mt-3 text-xs text-neutral-500">
              Bản xem trước — giao diện có thể thay đổi trước khi ra mắt chính
              thức.
            </p>
          </div>
        </section>

        {/* === Cột phải: Form đăng ký === */}
        <section className="md:sticky md:top-16">
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Nhận thông báo khi ra mắt</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Để lại thông tin — bọn mình sẽ báo bạn ngay khi có bản chính thức.
            </p>

            {isSuccess ? (
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="text-sm font-medium text-green-800">
                  Cảm ơn bạn đã đăng ký! 🎉
                </p>
                <p className="mt-1 text-sm text-green-700">
                  Bọn mình đã ghi nhận thông tin và sẽ gửi email ngay khi có bản
                  launch.
                </p>
              </div>
            ) : (
              <Form method="post" className="mt-6 space-y-4">
                {/* Hàng 1: Tên + Số điện thoại */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-neutral-700"
                    >
                      Tên của bạn
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nguyễn Văn A"
                      disabled={isSubmitting}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-neutral-700"
                    >
                      Số điện thoại
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      placeholder="0912 345 678"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.phone}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:opacity-50 aria-invalid:border-red-400"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email (mandatory) */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="ban@example.com"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.email}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:opacity-50 aria-invalid:border-red-400"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* City (select) */}
                <div>
                  <label
                    htmlFor="city"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                  >
                    Thành phố
                  </label>
                  <select
                    id="city"
                    name="city"
                    defaultValue=""
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:opacity-50 cursor-pointer"
                  >
                    <option value="">-- Chọn thành phố --</option>
                    {cities.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                  >
                    Lời nhắn
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    maxLength={1000}
                    placeholder="Bạn quan tâm tính năng gì? Đang gặp vấn đề gì mà bọn mình có thể giúp?"
                    disabled={isSubmitting}
                    className="w-full resize-y rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:opacity-50"
                  />
                </div>

                <div className="hidden">
                  <label
                    htmlFor="visitor_id"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                  >
                    VisitorId
                  </label>
                  <input
                    id="visitor_id"
                    readOnly={true}
                    name="visitor_id"
                    type="text"
                    value={visitorId || ""}
                    placeholder="Nguyễn Văn A"
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:opacity-50"
                  />
                </div>

                <div className="hidden">
                  <label
                    htmlFor="source"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                  >
                    source
                  </label>
                  <input
                    id="source"
                    readOnly={true}
                    name="source"
                    type="text"
                    value={params?.source}
                    placeholder="Nguyễn Văn A"
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 disabled:opacity-50"
                  />
                </div>

                {errors.form && (
                  <p className="text-sm text-red-600">{errors.form}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? "Đang gửi..." : "Đăng ký nhận thông báo"}
                </button>

                <p className="text-xs text-neutral-500">
                  Bằng cách đăng ký, bạn đồng ý nhận email cập nhật về sản phẩm.
                  Bạn có thể hủy đăng ký bất kỳ lúc nào.
                </p>
              </Form>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
