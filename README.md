# AVENTRA Logistics

## شغّل المشروع محليًا

```bash
npm install
cp .env.example .env.local   # وضيف بيانات مشروع Supabase بتاعك
npm run dev
```

افتح http://localhost:3000

## اللي تم بناءه في هذه المرحلة (Phase 1 — الموقع العام)

- **الصفحات**: الرئيسية، عن الشركة، خدماتنا، تتبع الشحنة، طلب عرض سعر، المدونة، الأسئلة الشائعة، تواصل معنا.
- **نظام تصميم كامل**: ألوان وخطوط مخصصة (Tajawal + Big Shoulders Display + IBM Plex Mono)، عنصر بصري مميز (بطاقة بوليصة الشحن المتحركة في الهيدر)، حركة Scroll-reveal بـ Framer Motion.
- **فورم طلب عرض السعر**: تحقق كامل بـ `react-hook-form` + `zod`، يبعت لـ `POST /api/requests`.
- **صفحة التتبع**: واجهة تفاعلية كاملة (حاليًا بيانات Mock — `src/app/(public)/tracking/page.tsx`).
- **قاعدة بيانات Supabase**: السكيما الكاملة لكل الجداول المذكورة في الأرشيتكتشر (`supabase/schema.sql`) + أمثلة RLS لكل دور.
- **بنية الترجمة**: `src/locales/ar.json` و `en.json` جاهزين كنقطة بداية.

## اللي لسه محتاج بناء (Phase 2 — المرحلة دي أكبر بكتير)

هذه مرحلة منفصلة وضخمة، الأفضل تتعمل تدريجيًا:

1. **Auth كامل**: تسجيل / تسجيل دخول / تأكيد إيميل / استرجاع باسورد عبر Supabase Auth + ربط فعلي بـ `middleware.ts`.
2. **7 لوحات تحكم بالأدوار**: admin, operations, accountant, warehouse, driver, customer — كل واحدة بصلاحيات مختلفة.
3. **كل الـ API Routes الفعلية**: shipments, invoices, payments, vehicles, drivers, containers, reports... (حاليًا فيه Route واحد فقط لطلبات عروض الأسعار).
4. **ربط صفحة التتبع الحقيقي** بـ Supabase بدل الـ Mock data.
5. **i18n كامل** (توجيه `/ar` و `/en` فعلي) عبر مكتبة زي `next-intl`، بدل التبديل اللحظي البسيط حاليًا.

قولّي تحب تبدأ في إيه من المرحلة الجاية، وهنبنيها خطوة بخطوة.
