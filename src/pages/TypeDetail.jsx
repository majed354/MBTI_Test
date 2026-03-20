import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mbtiTypes } from '../data/types'

const groupColors = {
  analysts: 'from-purple-600 to-indigo-600',
  diplomats: 'from-emerald-600 to-teal-600',
  sentinels: 'from-blue-600 to-cyan-600',
  explorers: 'from-amber-600 to-orange-600',
}

const groupLabels = {
  analysts: 'المحللون',
  diplomats: 'الدبلوماسيون',
  sentinels: 'الحراس',
  explorers: 'المستكشفون',
}

const groupTypes = {
  analysts: ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
  diplomats: ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
  sentinels: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
  explorers: ['ISTP', 'ISFP', 'ESTP', 'ESFP'],
}

const cogFunctionLabels = {
  Ni: 'الحدس الداخلي',
  Ne: 'الحدس الخارجي',
  Si: 'الحس الداخلي',
  Se: 'الحس الخارجي',
  Ti: 'التفكير الداخلي',
  Te: 'التفكير الخارجي',
  Fi: 'الشعور الداخلي',
  Fe: 'الشعور الخارجي',
}

const cogFunctionColors = [
  'from-amber-500 to-yellow-500',
  'from-teal-500 to-emerald-500',
  'from-blue-500 to-indigo-500',
  'from-pink-500 to-rose-500',
]

export default function TypeDetail() {
  const { typeCode } = useParams()
  const navigate = useNavigate()
  const code = typeCode?.toUpperCase()
  const typeData = mbtiTypes[code]

  if (!typeData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <span className="text-6xl mb-4">❌</span>
        <h2 className="text-2xl font-bold mb-2">نمط غير موجود</h2>
        <p className="text-gray-400 mb-6">لم نجد النمط &quot;{typeCode}&quot;</p>
        <Link
          to="/types"
          className="px-6 py-3 bg-gradient-to-l from-purple-600 to-pink-600 rounded-xl font-bold"
        >
          استكشف الأنماط
        </Link>
      </div>
    )
  }

  const relatedTypes = (groupTypes[typeData.group] || []).filter((t) => t !== code)
  const cogFunctions = typeData.cognitiveFunctions || []

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <span>→</span>
        <span>رجوع</span>
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <span className="text-6xl md:text-7xl block mb-4">{typeData.emoji}</span>
        <h1 className="text-5xl md:text-6xl font-black mb-2 tracking-wider">
          <span className="bg-gradient-to-l from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
            {code}
          </span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          {typeData.nameAr}
        </h2>
        <span
          className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-l ${groupColors[typeData.group] || 'from-gray-600 to-gray-700'} text-sm font-bold`}
        >
          {groupLabels[typeData.group] || typeData.group}
        </span>
        {typeData.population && (
          <p className="text-gray-500 text-sm mt-3">👥 {typeData.population} من السكان</p>
        )}
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 md:p-8 mb-8"
      >
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span>📋</span> نبذة شاملة
        </h3>
        <p className="text-gray-300 leading-relaxed">{typeData.summary}</p>
        {typeData.description && (
          <p className="text-gray-400 leading-relaxed mt-3">{typeData.description}</p>
        )}
      </motion.div>

      {/* Cognitive Functions */}
      {cogFunctions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
            <span>🧩</span> الوظائف المعرفية
          </h3>
          <div className="space-y-3">
            {cogFunctions.map((fn, i) => {
              const labels = ['الوظيفة الرئيسية', 'الوظيفة المساعدة', 'الوظيفة الثالثة', 'الوظيفة الدنيا']
              const widths = ['100%', '80%', '60%', '40%']
              return (
                <div key={fn} className="flex items-center gap-4">
                  <div className="w-28 shrink-0 text-left">
                    <span className="text-gray-500 text-xs">{labels[i] || `الوظيفة ${i + 1}`}</span>
                  </div>
                  <div className="flex-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: widths[i] }}
                      transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                      className={`h-10 rounded-xl bg-gradient-to-l ${cogFunctionColors[i]} flex items-center px-4 gap-2`}
                    >
                      <span className="font-bold text-sm">{fn}</span>
                      <span className="text-white/70 text-xs">
                        {cogFunctionLabels[fn] || fn}
                      </span>
                    </motion.div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Strengths & Weaknesses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        {typeData.strengths && (
          <div className="glass-card p-6 border border-emerald-500/20">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-emerald-400">
              <span>💪</span> نقاط القوة
            </h3>
            <ul className="space-y-2">
              {typeData.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300">
                  <span className="text-emerald-400 mt-1 shrink-0">&#9679;</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {typeData.weaknesses && (
          <div className="glass-card p-6 border border-red-500/20">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-400">
              <span>⚡</span> نقاط التحدي
            </h3>
            <ul className="space-y-2">
              {typeData.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300">
                  <span className="text-red-400 mt-1 shrink-0">&#9679;</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      {/* Careers */}
      {typeData.careers && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>💼</span> المسارات المهنية المناسبة
          </h3>
          <div className="flex flex-wrap gap-2">
            {typeData.careers.map((career, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm"
              >
                {career}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Relationships */}
      {typeData.relationships && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <span>❤️</span> في العلاقات
          </h3>
          <p className="text-gray-300 leading-relaxed">{typeData.relationships}</p>
        </motion.div>
      )}

      {/* Communication Style */}
      {typeData.communicationStyle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <span>💬</span> أسلوب التواصل
          </h3>
          <p className="text-gray-300 leading-relaxed">{typeData.communicationStyle}</p>
        </motion.div>
      )}

      {/* Compatibility */}
      {typeData.compatibility && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
            <span>💞</span> التوافق مع الأنماط الأخرى
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {typeData.compatibility.best && (
              <div>
                <h4 className="text-emerald-400 font-bold text-sm mb-3">توافق ممتاز</h4>
                <div className="flex flex-wrap gap-2">
                  {typeData.compatibility.best.map((t) => (
                    <Link
                      key={t}
                      to={`/types/${t}`}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-bold hover:bg-emerald-500/30 transition-colors"
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {typeData.compatibility.good && (
              <div>
                <h4 className="text-amber-400 font-bold text-sm mb-3">توافق جيد</h4>
                <div className="flex flex-wrap gap-2">
                  {typeData.compatibility.good.map((t) => (
                    <Link
                      key={t}
                      to={`/types/${t}`}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm font-bold hover:bg-amber-500/30 transition-colors"
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {typeData.compatibility.challenging && (
              <div>
                <h4 className="text-red-400 font-bold text-sm mb-3">قد يكون تحدياً</h4>
                <div className="flex flex-wrap gap-2">
                  {typeData.compatibility.challenging.map((t) => (
                    <Link
                      key={t}
                      to={`/types/${t}`}
                      className="px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm font-bold hover:bg-red-500/30 transition-colors"
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Famous People */}
      {typeData.famousPeople && typeData.famousPeople.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>⭐</span> شخصيات مشهورة
          </h3>
          <div className="flex flex-wrap gap-3">
            {typeData.famousPeople.map((person, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm"
              >
                {person}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Related Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="mb-8"
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>🔗</span> أنماط من نفس المجموعة
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {relatedTypes.map((relCode) => {
            const relData = mbtiTypes[relCode]
            if (!relData) return null
            return (
              <Link
                key={relCode}
                to={`/types/${relCode}`}
                className={`glass-card p-4 text-center border ${
                  groupColors[typeData.group]
                    ? `border-${typeData.group === 'analysts' ? 'purple' : typeData.group === 'diplomats' ? 'emerald' : typeData.group === 'sentinels' ? 'blue' : 'amber'}-500/20`
                    : 'border-white/10'
                } hover:scale-105 transition-all`}
              >
                <span className="text-2xl block mb-1">{relData.emoji}</span>
                <span className="font-bold text-white">{relCode}</span>
                <span className="text-gray-400 text-xs block mt-1">{relData.nameAr}</span>
              </Link>
            )
          })}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
        <Link
          to="/test"
          className="px-6 py-3 bg-gradient-to-l from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105"
        >
          ابدأ الاختبار
        </Link>
        <Link
          to="/types"
          className="px-6 py-3 glass rounded-xl font-medium hover:bg-white/10 transition-all"
        >
          كل الأنماط
        </Link>
      </div>
    </div>
  )
}
