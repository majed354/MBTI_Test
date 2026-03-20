import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-900/50 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🧠</span>
              <span className="text-lg font-bold bg-gradient-to-l from-purple-400 to-pink-400 bg-clip-text text-transparent">
                اختبار الشخصية MBTI
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              اكتشف نمط شخصيتك من خلال اختبار تفاعلي مبني على نظرية مايرز بريغز لتحليل الشخصيات. تعرّف على نقاط قوتك وأسلوبك في الحياة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-3">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/test" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                  ابدأ الاختبار
                </Link>
              </li>
              <li>
                <Link to="/types" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                  استكشف الأنماط
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-bold mb-3">عن الاختبار</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              يتكون الاختبار من 40 سؤالاً يقيس 4 أبعاد رئيسية للشخصية. النتائج تساعدك على فهم نفسك بشكل أعمق وتطوير علاقاتك ومسارك المهني.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} اختبار الشخصية MBTI. جميع الحقوق محفوظة.
          </p>
          <p className="text-gray-600 text-xs">
            هذا الاختبار للأغراض التعليمية والترفيهية فقط وليس بديلاً عن الاستشارة المتخصصة.
          </p>
        </div>
      </div>
    </footer>
  )
}
