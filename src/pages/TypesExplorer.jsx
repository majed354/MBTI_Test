import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { mbtiTypes, groupInfo } from '../data/types'

const filterTabs = [
  { key: 'all', label: 'الكل', emoji: '🎭' },
  { key: 'analysts', label: 'المحللون', emoji: '🔬' },
  { key: 'diplomats', label: 'الدبلوماسيون', emoji: '🌿' },
  { key: 'sentinels', label: 'الحراس', emoji: '🛡️' },
  { key: 'explorers', label: 'المستكشفون', emoji: '🧭' },
]

const groupColors = {
  analysts: 'from-purple-600 to-indigo-600',
  diplomats: 'from-emerald-600 to-teal-600',
  sentinels: 'from-blue-600 to-cyan-600',
  explorers: 'from-amber-600 to-orange-600',
}

const groupBorderColors = {
  analysts: 'border-purple-500/30 hover:border-purple-500/50',
  diplomats: 'border-emerald-500/30 hover:border-emerald-500/50',
  sentinels: 'border-blue-500/30 hover:border-blue-500/50',
  explorers: 'border-amber-500/30 hover:border-amber-500/50',
}

const groupLabels = {
  analysts: 'المحللون',
  diplomats: 'الدبلوماسيون',
  sentinels: 'الحراس',
  explorers: 'المستكشفون',
}

export default function TypesExplorer() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const allTypes = useMemo(() => {
    return Object.entries(mbtiTypes).map(([code, data]) => ({
      code,
      ...data,
    }))
  }, [])

  const filteredTypes = useMemo(() => {
    let result = allTypes

    if (activeFilter !== 'all') {
      result = result.filter((t) => t.group === activeFilter)
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase()
      result = result.filter(
        (t) =>
          t.code.toLowerCase().includes(term) ||
          t.nameAr?.includes(searchTerm) ||
          t.summary?.includes(searchTerm)
      )
    }

    return result
  }, [allTypes, activeFilter, searchTerm])

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-5xl font-black mb-3">
          <span className="bg-gradient-to-l from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
            استكشف أنماط الشخصية
          </span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          تعرّف على الأنماط الستة عشر واكتشف ما يميز كل نمط
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-md mx-auto mb-8"
      >
        <div className="relative">
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن نمط..."
            className="w-full pr-12 pl-4 py-3 glass rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
          />
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-2 mb-10"
      >
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              activeFilter === tab.key
                ? 'bg-white/15 text-white border border-white/20'
                : 'glass text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Types Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter + searchTerm}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filteredTypes.map((typeItem, i) => (
            <motion.div
              key={typeItem.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/types/${typeItem.code}`}
                className={`block glass-card p-6 border ${groupBorderColors[typeItem.group] || 'border-white/10'} hover:scale-[1.02] transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{typeItem.emoji}</span>
                  <span className={`px-2.5 py-0.5 rounded-full bg-gradient-to-l ${groupColors[typeItem.group] || 'from-gray-600 to-gray-700'} text-xs font-bold`}>
                    {groupLabels[typeItem.group] || typeItem.group}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white mb-1 tracking-wider">
                  {typeItem.code}
                </h3>
                <h4 className="text-base font-bold text-gray-300 mb-3">
                  {typeItem.nameAr}
                </h4>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                  {typeItem.summary}
                </p>

                {typeItem.population && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>👥</span>
                    <span>{typeItem.population} من السكان</span>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredTypes.length === 0 && (
        <div className="text-center py-16">
          <span className="text-4xl mb-3 block">🔍</span>
          <p className="text-gray-400">لم يتم العثور على نتائج</p>
        </div>
      )}
    </div>
  )
}
