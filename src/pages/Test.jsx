import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { questions } from '../data/questions'

export default function Test() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [direction, setDirection] = useState(1)

  const totalQuestions = questions.length
  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex) / totalQuestions) * 100

  const handleAnswer = useCallback((value) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value }
    setAnswers(newAnswers)
    setDirection(1)

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      // Calculate results
      const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

      questions.forEach((q) => {
        const answer = newAnswers[q.id]
        if (answer) {
          scores[answer] = (scores[answer] || 0) + 1
        }
      })

      const type = [
        scores.E >= scores.I ? 'E' : 'I',
        scores.S >= scores.N ? 'S' : 'N',
        scores.T >= scores.F ? 'T' : 'F',
        scores.J >= scores.P ? 'J' : 'P',
      ].join('')

      navigate('/results', {
        state: { type, scores },
      })
    }
  }, [answers, currentIndex, currentQuestion, navigate, totalQuestions])

  const handleSkip = useCallback(() => {
    setDirection(1)
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      // Calculate with what we have
      const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
      questions.forEach((q) => {
        const answer = answers[q.id]
        if (answer) {
          scores[answer] = (scores[answer] || 0) + 1
        }
      })
      const type = [
        scores.E >= scores.I ? 'E' : 'I',
        scores.S >= scores.N ? 'S' : 'N',
        scores.T >= scores.F ? 'T' : 'F',
        scores.J >= scores.P ? 'J' : 'P',
      ].join('')
      navigate('/results', { state: { type, scores } })
    }
  }, [answers, currentIndex, navigate, totalQuestions])

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex((prev) => prev - 1)
    }
  }, [currentIndex])

  const dimensionLabels = {
    EI: 'الطاقة: الانبساط / الانطواء',
    SN: 'الإدراك: الحسي / الحدسي',
    TF: 'القرارات: التفكير / الشعور',
    JP: 'نمط الحياة: الحكم / الإدراك',
  }

  const dimensionKey = currentQuestion?.dimension || ''

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  }

  return (
    <div className="min-h-[80vh] px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-black mb-2">
            <span className="bg-gradient-to-l from-purple-400 to-pink-400 bg-clip-text text-transparent">
              اختبار تحليل الشخصية
            </span>
          </h1>
          <p className="text-gray-400 text-sm">اختر الإجابة الأقرب لطبيعتك</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-gray-400">
              السؤال {currentIndex + 1} من {totalQuestions}
            </span>
            <span className="text-purple-400 font-bold">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-l from-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs text-gray-500 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              {dimensionLabels[dimensionKey] || dimensionKey}
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              {/* Scenario */}
              <div className="glass-card p-6 md:p-8 mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl shrink-0">📖</span>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">السيناريو</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {currentQuestion.scenario}
                    </p>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4">
                <button
                  onClick={() => handleAnswer(currentQuestion.optionA.value)}
                  className={`w-full text-right glass-card p-5 md:p-6 cursor-pointer group transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10 ${
                    answers[currentQuestion.id] === currentQuestion.optionA.value
                      ? 'border-purple-500/50 bg-purple-500/15'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-sm font-bold shrink-0 group-hover:scale-110 transition-transform">
                      أ
                    </span>
                    <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors">
                      {currentQuestion.optionA.text}
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleAnswer(currentQuestion.optionB.value)}
                  className={`w-full text-right glass-card p-5 md:p-6 cursor-pointer group transition-all duration-300 hover:border-teal-500/40 hover:bg-teal-500/10 ${
                    answers[currentQuestion.id] === currentQuestion.optionB.value
                      ? 'border-teal-500/50 bg-teal-500/15'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center text-sm font-bold shrink-0 group-hover:scale-110 transition-transform">
                      ب
                    </span>
                    <p className="text-gray-200 leading-relaxed group-hover:text-white transition-colors">
                      {currentQuestion.optionB.text}
                    </p>
                  </div>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-5 py-2.5 glass rounded-xl text-sm font-medium hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            السابق
          </button>

          <button
            onClick={handleSkip}
            className="px-5 py-2.5 text-gray-400 hover:text-white text-sm transition-colors"
          >
            غير متأكد ←
          </button>
        </div>

        {/* Question Dots */}
        <div className="flex justify-center gap-1 mt-6 flex-wrap">
          {questions.map((q, i) => (
            <div
              key={q.id}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-purple-500 scale-125'
                  : answers[q.id]
                    ? 'bg-purple-500/50'
                    : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
