import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const dimensions = [
  {
    left: 'E',
    right: 'I',
    leftLabel: 'الانبساط',
    rightLabel: 'الانطواء',
    leftDesc: 'تستمد طاقتك من التفاعل مع الآخرين والعالم الخارجي',
    rightDesc: 'تستمد طاقتك من عالمك الداخلي والتأمل الذاتي',
    color: 'from-amber-500 to-orange-500',
    icon: '🌟',
  },
  {
    left: 'S',
    right: 'N',
    leftLabel: 'الحسي',
    rightLabel: 'الحدسي',
    leftDesc: 'تركز على الحقائق والتفاصيل الملموسة والواقع الحالي',
    rightDesc: 'تركز على الأنماط والاحتمالات والرؤية المستقبلية',
    color: 'from-emerald-500 to-teal-500',
    icon: '👁️',
  },
  {
    left: 'T',
    right: 'F',
    leftLabel: 'التفكير',
    rightLabel: 'الشعور',
    leftDesc: 'تتخذ قراراتك بناءً على المنطق والتحليل الموضوعي',
    rightDesc: 'تتخذ قراراتك بناءً على القيم والتأثير على الآخرين',
    color: 'from-blue-500 to-indigo-500',
    icon: '⚖️',
  },
  {
    left: 'J',
    right: 'P',
    leftLabel: 'الحكم',
    rightLabel: 'الإدراك',
    leftDesc: 'تفضل التنظيم والتخطيط واتخاذ القرارات المبكرة',
    rightDesc: 'تفضل المرونة والعفوية وإبقاء الخيارات مفتوحة',
    color: 'from-purple-500 to-pink-500',
    icon: '🎯',
  },
]

const groups = [
  {
    name: 'المحللون',
    emoji: '🔬',
    types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
    color: 'from-purple-600 to-indigo-600',
    borderColor: 'border-purple-500/30',
    desc: 'مفكرون استراتيجيون يتميزون بالعقلانية والإبداع الفكري',
  },
  {
    name: 'الدبلوماسيون',
    emoji: '🌿',
    types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
    color: 'from-emerald-600 to-teal-600',
    borderColor: 'border-emerald-500/30',
    desc: 'شخصيات مثالية تسعى للإلهام والتأثير الإيجابي في العالم',
  },
  {
    name: 'الحراس',
    emoji: '🛡️',
    types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
    color: 'from-blue-600 to-cyan-600',
    borderColor: 'border-blue-500/30',
    desc: 'شخصيات عملية تتميز بالمسؤولية والاعتمادية والتنظيم',
  },
  {
    name: 'المستكشفون',
    emoji: '🧭',
    types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'],
    color: 'from-amber-600 to-orange-600',
    borderColor: 'border-amber-500/30',
    desc: 'شخصيات مغامرة تحب التجربة والمرونة والعيش في اللحظة',
  },
]

const stats = [
  { number: '16', label: 'نمط شخصية', icon: '🎭' },
  { number: '4', label: 'أبعاد رئيسية', icon: '📐' },
  { number: '40', label: 'سؤال تفاعلي', icon: '❓' },
  { number: '∞', label: 'إمكانيات للاكتشاف', icon: '✨' },
]

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-6xl md:text-8xl mb-6"
          >
            🧠
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          >
            <span className="bg-gradient-to-l from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              اكتشف نمط شخصيتك
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed"
          >
            رحلة ممتعة لاستكشاف ذاتك من خلال سيناريوهات واقعية
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-base text-gray-400 mb-10 max-w-xl mx-auto"
          >
            اختبار مبني على نظرية مايرز-بريغز يساعدك على فهم كيف تفكر وتتخذ قراراتك وتتفاعل مع العالم من حولك
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/test"
              className="px-8 py-4 bg-gradient-to-l from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl text-lg font-bold transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105"
            >
              ابدأ الاختبار الآن
            </Link>
            <Link
              to="/types"
              className="px-8 py-4 glass rounded-2xl text-lg font-medium hover:bg-white/10 transition-all duration-300"
            >
              استكشف الأنماط
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-[-60px] left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
            >
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Dimensions Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              <span className="bg-gradient-to-l from-purple-400 to-pink-400 bg-clip-text text-transparent">
                الأبعاد الأربعة للشخصية
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              كل شخصية تتكون من أربعة أبعاد رئيسية تحدد طريقة تفاعلك مع العالم
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dimensions.map((dim, i) => (
              <AnimatedSection key={dim.left} delay={i * 0.1}>
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{dim.icon}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-lg bg-gradient-to-l ${dim.color} text-white font-bold text-sm`}>
                        {dim.left}
                      </span>
                      <span className="text-gray-500">vs</span>
                      <span className={`px-3 py-1 rounded-lg bg-gradient-to-l ${dim.color} text-white font-bold text-sm`}>
                        {dim.right}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-bold mb-1">{dim.leftLabel}</h4>
                      <p className="text-gray-400 text-sm">{dim.leftDesc}</p>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{dim.rightLabel}</h4>
                      <p className="text-gray-400 text-sm">{dim.rightDesc}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Groups Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              <span className="bg-gradient-to-l from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                المجموعات الأربع
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              تنقسم الأنماط الستة عشر إلى أربع مجموعات رئيسية تشترك في سمات أساسية
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {groups.map((group, i) => (
              <AnimatedSection key={group.name} delay={i * 0.1}>
                <div className={`glass-card p-6 text-center border ${group.borderColor}`}>
                  <span className="text-4xl mb-3 block">{group.emoji}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{group.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{group.desc}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {group.types.map((type) => (
                      <Link
                        key={type}
                        to={`/types/${type}`}
                        className={`px-2.5 py-1 rounded-lg bg-gradient-to-l ${group.color} text-white text-xs font-bold opacity-80 hover:opacity-100 transition-opacity`}
                      >
                        {type}
                      </Link>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="glass-card p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center"
                  >
                    <span className="text-3xl mb-2 block">{stat.icon}</span>
                    <span className="text-3xl md:text-4xl font-black bg-gradient-to-l from-purple-400 to-pink-400 bg-clip-text text-transparent block">
                      {stat.number}
                    </span>
                    <span className="text-gray-400 text-sm mt-1 block">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <AnimatedSection className="text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              هل أنت مستعد لاكتشاف ذاتك؟
            </h2>
            <p className="text-gray-400 mb-8">
              أجب على 40 سؤالاً تفاعلياً مبنياً على سيناريوهات حياتية واقعية واكتشف نمط شخصيتك الفريد
            </p>
            <Link
              to="/test"
              className="inline-block px-10 py-4 bg-gradient-to-l from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-2xl text-xl font-bold transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105"
            >
              ابدأ رحلة الاكتشاف
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
