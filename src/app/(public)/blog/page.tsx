import { Reveal } from "@/components/ui/reveal";

const posts = [
  {
    title: "إزاي تقلل وقت التخليص الجمركي لشحنتك",
    excerpt: "5 مستندات لازم تجهزها قبل وصول الشحنة لتقليل وقت الإفراج الجمركي.",
    date: "2026-05-12",
  },
  {
    title: "الشحن البحري ولا الجوي؟ إزاي تقرر",
    excerpt: "مقارنة بين التكلفة والوقت لمساعدتك تختار وسيلة الشحن الأنسب لبضاعتك.",
    date: "2026-04-02",
  },
  {
    title: "ليه التتبع اللحظي بيقلل شكاوى العملاء",
    excerpt: "نظرة على تأثير رؤية حالة الشحنة لحظيًا على رضا العملاء وتقليل الاستفسارات.",
    date: "2026-03-18",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-paper py-16">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal className="mb-10">
          <span className="font-mono text-xs text-rust">المدونة</span>
          <h1 className="text-3xl font-extrabold mt-2">مقالات عن الشحن واللوجستيات</h1>
        </Reveal>

        <div className="space-y-5">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.06}>
              <article className="bg-white border border-black/10 rounded-xl p-6 hover:border-amber transition-colors">
                <span className="font-mono text-xs text-steel" dir="ltr">{post.date}</span>
                <h2 className="font-bold text-lg mt-1 mb-2">{post.title}</h2>
                <p className="text-sm text-steel">{post.excerpt}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
