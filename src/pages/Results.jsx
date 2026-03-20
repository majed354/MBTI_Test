import { useLocation, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { mbtiTypes, dimensionInfo } from '../data/types'

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const { type, scores } = location.state || {}

  // Redirect if no data
  if (!type || !scores) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <span className="text-6xl mb-4">🤔</span>
        <h2 className="text-2xl font-bold mb-2">لا توجد نتائج</h2>
        <p className="text-gray-400 mb-6">يبدو أنك لم تكمل الاختبار بعد</p>
        <Link
          to="/test"
          className="px-6 py-3 bg-gradient-to-l from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
        >
          ابدأ الاختبار
        </Link>
      </div>
    )
  }

  const typeData = mbtiTypes[type]

  if (!typeData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <span className="text-6xl mb-4">❌</span>
        <h2 className="text-2xl font-bold mb-2">نمط غير معروف</h2>
        <Link to="/test" className="px-6 py-3 bg-gradient-to-l from-purple-600 to-pink-600 rounded-xl font-bold">
          أعد الاختبار
        </Link>
      </div>
    )
  }

  // Calculate percentages for each dimension
  const dimensionPairs = [
    { left: 'E', right: 'I', label: dimensionInfo?.EI?.label || 'الطاقة' },
    { left: 'S', right: 'N', label: dimensionInfo?.SN?.label || 'الإدراك' },
    { left: 'T', right: 'F', label: dimensionInfo?.TF?.label || 'القرارات' },
    { left: 'J', right: 'P', label: dimensionInfo?.JP?.label || 'نمط الحياة' },
  ]

  const dimensionResults = dimensionPairs.map((pair) => {
    const leftScore = scores[pair.left] || 0
    const rightScore = scores[pair.right] || 0
    const total = leftScore + rightScore || 1
    return {
      ...pair,
      leftScore,
      rightScore,
      leftPercent: Math.round((leftScore / total) * 100),
      rightPercent: Math.round((rightScore / total) * 100),
    }
  })

  // Radar chart data
  const radarData = dimensionResults.map((d) => ({
    dimension: d.label,
    value: Math.max(d.leftPercent, d.rightPercent),
  }))

  // Bar chart data for each dimension
  const barData = dimensionResults.map((d) => ({
    name: d.label,
    left: d.leftPercent,
    right: d.rightPercent,
    leftLabel: d.left,
    rightLabel: d.right,
  }))

  const groupColors = {
    analysts: 'from-purple-600 to-indigo-600',
    diplomats: 'from-emerald-600 to-teal-600',
    sentinels: 'from-blue-600 to-cyan-600',
    explorers: 'from-amber-600 to-orange-600',
  }

  const groupNames = {
    analysts: 'المحللون',
    diplomats: 'الدبلوماسيون',
    sentinels: 'الحراس',
    explorers: 'المستكشفون',
  }

  const handleShare = async () => {
    const shareText = `نتيجة اختبار الشخصية MBTI الخاص بي:\n\n${typeData.emoji} ${type} - ${typeData.nameAr}\n${typeData.summary}\n\nاكتشف نمط شخصيتك أنت أيضاً!`
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const textarea = document.createElement('textarea')
      textarea.value = shareText
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      {/* Type Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
          className="text-7xl md:text-8xl block mb-4"
        >
          {typeData.emoji}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-3 tracking-wider">
            <span className="bg-gradient-to-l from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              {type}
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {typeData.nameAr}
          </h2>
          <span className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-l ${groupColors[typeData.group] || 'from-purple-600 to-pink-600'} text-sm font-bold`}>
            {groupNames[typeData.group] || typeData.group}
          </span>
        </motion.div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6 md:p-8 mb-8"
      >
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span>📋</span> نبذة عن شخصيتك
        </h3>
        <p className="text-gray-300 leading-relaxed">{typeData.summary}</p>
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        {/* Radar Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-4 text-center">ملخص الأبعاد</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: '#6b7280', fontSize: 10 }}
              />
              <Radar
                dataKey="value"
                stroke="#a855f7"
                fill="#a855f7"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-4 text-center">توزيع النسب</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: '#d1d5db', fontSize: 12 }} width={70} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15,15,30,0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  direction: 'rtl',
                }}
              />
              <Bar dataKey="left" name="النسبة" radius={[0, 4, 4, 0]}>
                {barData.map((_, index) => (
                  <Cell key={index} fill={['#f59e0b', '#10b981', '#3b82f6', '#a855f7'][index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Dimension Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-4 mb-8"
      >
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span>📊</span> تفاصيل الأبعاد
        </h3>
        {dimensionResults.map((dim, i) => {
          const colors = ['from-amber-500 to-orange-500', 'from-emerald-500 to-teal-500', 'from-blue-500 to-indigo-500', 'from-purple-500 to-pink-500']
          return (
            <div key={dim.left} className="glass-card p-5">
              <div className="flex justify-between items-center mb-3 text-sm">
                <span className="text-gray-300 font-medium">{dim.label}</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`font-bold text-lg ${dim.leftScore >= dim.rightScore ? 'text-white' : 'text-gray-500'}`}>
                  {dim.left} ({dim.leftPercent}%)
                </span>
                <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden flex">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dim.leftPercent}%` }}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.8 }}
                    className={`h-full bg-gradient-to-l ${colors[i]} rounded-r-full`}
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dim.rightPercent}%` }}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.8 }}
                    className="h-full bg-white/20 rounded-l-full"
                  />
                </div>
                <span className={`font-bold text-lg ${dim.rightScore > dim.leftScore ? 'text-white' : 'text-gray-500'}`}>
                  {dim.right} ({dim.rightPercent}%)
                </span>
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Strengths & Weaknesses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        <div className="glass-card p-6 border border-emerald-500/20">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-emerald-400">
            <span>💪</span> نقاط القوة
          </h3>
          <ul className="space-y-2">
            {(typeData.strengths || []).map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <span className="text-emerald-400 mt-1">&#9679;</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-6 border border-red-500/20">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-400">
            <span>⚡</span> نقاط التحدي
          </h3>
          <ul className="space-y-2">
            {(typeData.weaknesses || []).map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <span className="text-red-400 mt-1">&#9679;</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Careers */}
      {typeData.careers && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
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

      {/* Compatibility */}
      {typeData.compatibility && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>💞</span> التوافق مع الأنماط الأخرى
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {typeData.compatibility.best && (
              <div>
                <h4 className="text-emerald-400 font-bold text-sm mb-2">توافق ممتاز</h4>
                <div className="flex flex-wrap gap-2">
                  {typeData.compatibility.best.map((t) => (
                    <Link
                      key={t}
                      to={`/types/${t}`}
                      className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-bold hover:bg-emerald-500/30 transition-colors"
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {typeData.compatibility.good && (
              <div>
                <h4 className="text-amber-400 font-bold text-sm mb-2">توافق جيد</h4>
                <div className="flex flex-wrap gap-2">
                  {typeData.compatibility.good.map((t) => (
                    <Link
                      key={t}
                      to={`/types/${t}`}
                      className="px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm font-bold hover:bg-amber-500/30 transition-colors"
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {typeData.compatibility.challenging && (
              <div>
                <h4 className="text-red-400 font-bold text-sm mb-2">قد يكون تحدياً</h4>
                <div className="flex flex-wrap gap-2">
                  {typeData.compatibility.challenging.map((t) => (
                    <Link
                      key={t}
                      to={`/types/${t}`}
                      className="px-3 py-1 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm font-bold hover:bg-red-500/30 transition-colors"
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

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
      >
        <Link
          to={`/types/${type}`}
          className="px-6 py-3 bg-gradient-to-l from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105 text-center"
        >
          اكتشف المزيد عن {type}
        </Link>
        <button
          onClick={() => navigate('/test')}
          className="px-6 py-3 glass rounded-xl font-medium hover:bg-white/10 transition-all"
        >
          أعد الاختبار
        </button>
        <button
          onClick={handleShare}
          className="px-6 py-3 glass rounded-xl font-medium hover:bg-white/10 transition-all flex items-center gap-2"
        >
          <span>{copied ? '✅' : '📋'}</span>
          {copied ? 'تم النسخ!' : 'شارك النتيجة'}
        </button>
      </motion.div>
    </div>
  )
}
