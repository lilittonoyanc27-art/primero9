/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  HelpCircle,
  CheckCircle2,
  Volume2,
  Search,
  FileText,
  Layers,
  Award,
  Languages,
  Check,
  RotateCcw,
  Sparkles,
  Type,
} from 'lucide-react';
import { theorySections } from './theoryData.ts';
import { practice1Items } from './practice1Data.ts';
import { practice2Items } from './practice2Data.ts';
import { examTexts, examModel } from './practice3Data.ts';
import { glossaryItems } from './glossaryData.ts';
import { speakSpanish } from './speech.ts';
import { ExerciseItem } from './types.ts';

type TabType = 'theory' | 'practice1' | 'practice2' | 'texts' | 'glossary';
type FontScale = 'normal' | 'large' | 'xlarge';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('theory');
  const [searchQuery, setSearchQuery] = useState('');
  const [globalShowArmenian, setGlobalShowArmenian] = useState(false);

  // Font scale: default to 'large' (побольше) as requested!
  const [fontScale, setFontScale] = useState<FontScale>('large');

  // Set of IDs where Armenian translation is revealed by clicking Spanish
  const [revealedArmenianItems, setRevealedArmenianItems] = useState<Record<string, boolean>>({});

  // Set of exercise IDs where Answer ("Պատասխան") was clicked to reveal
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // User selected options for multiple choice
  const [userSelectedOptions, setUserSelectedOptions] = useState<Record<string, string>>({});

  // Filter for practice parts
  const [selectedPartP1, setSelectedPartP1] = useState<number | 'all'>('all');
  const [selectedPartP2, setSelectedPartP2] = useState<number | 'all'>('all');
  const [selectedGlossaryCategory, setSelectedGlossaryCategory] = useState<string>('all');

  const toggleArmenian = (key: string) => {
    setRevealedArmenianItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleAnswer = (key: string) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isArmenianShown = (key: string) => {
    return globalShowArmenian || !!revealedArmenianItems[key];
  };

  const isAnswerShown = (key: string) => {
    return !!revealedAnswers[key];
  };

  // Font size classes based on fontScale
  const fClasses = useMemo(() => {
    switch (fontScale) {
      case 'xlarge':
        return {
          question: 'text-xl sm:text-2xl',
          translation: 'text-lg sm:text-xl',
          body: 'text-lg sm:text-xl',
          sub: 'text-base sm:text-lg',
          btn: 'text-base font-bold px-4 py-2',
          badge: 'text-sm font-semibold',
          heading: 'text-2xl sm:text-3xl',
          subheading: 'text-xl sm:text-2xl',
        };
      case 'large': // Default (побольше)
      default:
        return {
          question: 'text-lg sm:text-xl',
          translation: 'text-base sm:text-lg',
          body: 'text-base sm:text-lg',
          sub: 'text-sm sm:text-base',
          btn: 'text-sm sm:text-base font-bold px-3.5 py-1.5',
          badge: 'text-xs sm:text-sm font-semibold',
          heading: 'text-xl sm:text-2xl',
          subheading: 'text-lg sm:text-xl',
        };
      case 'normal':
        return {
          question: 'text-base sm:text-lg',
          translation: 'text-sm sm:text-base',
          body: 'text-sm sm:text-base',
          sub: 'text-xs sm:text-sm',
          btn: 'text-xs sm:text-sm font-semibold px-3 py-1.5',
          badge: 'text-xs font-semibold',
          heading: 'text-lg sm:text-xl',
          subheading: 'text-base sm:text-lg',
        };
    }
  }, [fontScale]);

  // Filtered lists
  const filteredTheory = useMemo(() => {
    if (!searchQuery.trim()) return theorySections;
    const q = searchQuery.toLowerCase();
    return theorySections.filter(
      (sec) =>
        sec.titleEs.toLowerCase().includes(q) ||
        sec.titleHy.toLowerCase().includes(q) ||
        sec.explanationEs.toLowerCase().includes(q) ||
        sec.explanationHy.toLowerCase().includes(q) ||
        sec.examples.some((ex) => ex.es.toLowerCase().includes(q) || ex.hy.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const filteredPractice1 = useMemo(() => {
    return practice1Items.filter((item) => {
      const matchPart = selectedPartP1 === 'all' || item.part === selectedPartP1;
      if (!matchPart) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.questionEs.toLowerCase().includes(q) ||
        (item.questionHy && item.questionHy.toLowerCase().includes(q)) ||
        item.answer.toLowerCase().includes(q) ||
        (item.explanationEs && item.explanationEs.toLowerCase().includes(q))
      );
    });
  }, [selectedPartP1, searchQuery]);

  const filteredPractice2 = useMemo(() => {
    return practice2Items.filter((item) => {
      const matchPart = selectedPartP2 === 'all' || item.part === selectedPartP2;
      if (!matchPart) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.questionEs.toLowerCase().includes(q) ||
        (item.questionHy && item.questionHy.toLowerCase().includes(q)) ||
        item.answer.toLowerCase().includes(q) ||
        (item.explanationEs && item.explanationEs.toLowerCase().includes(q))
      );
    });
  }, [selectedPartP2, searchQuery]);

  const filteredGlossary = useMemo(() => {
    return glossaryItems.filter((item) => {
      const matchCat = selectedGlossaryCategory === 'all' || item.category === selectedGlossaryCategory;
      if (!matchCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.titleEs.toLowerCase().includes(q) ||
        item.titleHy.toLowerCase().includes(q) ||
        item.detailEs.toLowerCase().includes(q) ||
        item.detailHy.toLowerCase().includes(q)
      );
    });
  }, [selectedGlossaryCategory, searchQuery]);

  // Statistics
  const totalExercises = practice1Items.length + practice2Items.length + 17;
  const answeredCount = Object.keys(revealedAnswers).filter((k) => revealedAnswers[k]).length;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Header Banner */}
      <header className="border-b border-stone-200 bg-white/95 sticky top-0 z-40 backdrop-blur-sm shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2.5 py-0.5 rounded border border-amber-300">
                  1º ESO · 7-րդ դասարան
                </span>
                <span className="text-xs sm:text-sm text-stone-600 font-medium">Lengua Castellana y Literatura</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-stone-900 mt-1 flex flex-wrap items-center gap-2">
                <span>Palabras y significados</span>
                <span className="text-stone-400 font-light">|</span>
                <span className="text-amber-900 font-semibold text-lg sm:text-2xl">Բառերը և դրանց իմաստները</span>
              </h1>
            </div>

            {/* Quick Actions & Font Size Selector */}
            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              {/* Font Size Adjuster */}
              <div className="flex items-center bg-stone-100 border border-stone-300 rounded-lg p-0.5 shadow-2xs">
                <span className="px-2 text-stone-500 text-xs font-bold flex items-center gap-1">
                  <Type className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Տառաչափ:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setFontScale('normal')}
                  className={`px-2 py-1 text-xs rounded font-medium cursor-pointer transition-all ${
                    fontScale === 'normal'
                      ? 'bg-white text-stone-900 shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Ստանդարտ չափ"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setFontScale('large')}
                  className={`px-2.5 py-1 text-sm rounded font-medium cursor-pointer transition-all ${
                    fontScale === 'large'
                      ? 'bg-amber-600 text-white shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Մեծ տառաչափ (Խորհուրդ տրվող)"
                >
                  A+
                </button>
                <button
                  type="button"
                  onClick={() => setFontScale('xlarge')}
                  className={`px-2.5 py-1 text-base rounded font-medium cursor-pointer transition-all ${
                    fontScale === 'xlarge'
                      ? 'bg-amber-700 text-white shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Շատ մեծ տառաչափ"
                >
                  A++
                </button>
              </div>

              {/* Translation Toggle */}
              <button
                type="button"
                onClick={() => setGlobalShowArmenian(!globalShowArmenian)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold border transition-colors cursor-pointer ${
                  globalShowArmenian
                    ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                    : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200'
                }`}
                title="Ցույց տալ բոլոր հայերեն թարգմանությունները"
              >
                <Languages className="w-4 h-4" />
                <span>{globalShowArmenian ? 'Հայերենը բացված է' : 'Բացել բոլոր թարգմանությունները 🇦🇲'}</span>
              </button>

              <div className="hidden lg:flex items-center gap-1 text-xs sm:text-sm text-stone-700 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Պատասխաններ՝ <strong>{answeredCount}</strong> / {totalExercises}</span>
              </div>
            </div>
          </div>

          {/* Search bar & Nav tabs */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Tabs */}
            <nav className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveTab('theory')}
                className={`px-3.5 py-2 rounded-lg text-sm sm:text-base font-semibold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-2 ${
                  activeTab === 'theory'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Տեսություն / Teoría</span>
                <span className="text-xs opacity-80 px-1.5 py-0.5 rounded-full bg-white/20">8</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('practice1')}
                className={`px-3.5 py-2 rounded-lg text-sm sm:text-base font-semibold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-2 ${
                  activeTab === 'practice1'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Քննական վարժ. 1</span>
                <span className="text-xs opacity-80 px-1.5 py-0.5 rounded-full bg-white/20">50</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('practice2')}
                className={`px-3.5 py-2 rounded-lg text-sm sm:text-base font-semibold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-2 ${
                  activeTab === 'practice2'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Վարժություն 2</span>
                <span className="text-xs opacity-80 px-1.5 py-0.5 rounded-full bg-white/20">50</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('texts')}
                className={`px-3.5 py-2 rounded-lg text-sm sm:text-base font-semibold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-2 ${
                  activeTab === 'texts'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Տեքստեր / Textos</span>
                <span className="text-xs opacity-80 px-1.5 py-0.5 rounded-full bg-white/20">3+1</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('glossary')}
                className={`px-3.5 py-2 rounded-lg text-sm sm:text-base font-semibold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-2 ${
                  activeTab === 'glossary'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Բառարան / Glosario</span>
              </button>
            </nav>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Որոնել բառ կամ թեմա..."
                className="w-full pl-9 pr-7 py-2 text-sm bg-stone-100 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-sm font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Interactive Helper Banner */}
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3.5">
            <span className="p-2.5 rounded-xl bg-amber-200/80 text-amber-900 shrink-0">
              <Sparkles className="w-6 h-6" />
            </span>
            <div>
              <p className={`font-bold text-amber-950 ${fClasses.body}`}>
                🇪🇸 Ինտերակտիվ ուսուցում · Clic para ver traducción y respuestas
              </p>
              <p className={`text-amber-900 mt-1 leading-relaxed ${fClasses.sub}`}>
                • <strong>Կտտացրո՛ւ իսպաներեն ցանկացած տեքստի վրա</strong>՝ հայերեն թարգմանությունն ու բացատրությունը տեսնելու համար։<br />
                • Ամեն առաջադրանքի համար սեղմի՛ր <strong>«Պատասխան / Ver Respuesta»</strong> կոճակը՝ պատասխանն ու վերլուծությունը բացելու համար։
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => {
                const allKeys: Record<string, boolean> = {};
                practice1Items.forEach((i) => (allKeys[`p1-${i.id}`] = true));
                practice2Items.forEach((i) => (allKeys[`p2-${i.id}`] = true));
                examTexts.forEach((t) => t.questions.forEach((q) => (allKeys[`text-${t.id}-${q.id}`] = true)));
                setRevealedAnswers(allKeys);
              }}
              className="text-xs sm:text-sm px-3.5 py-2 bg-white border border-amber-300 text-amber-950 rounded-lg hover:bg-amber-100 cursor-pointer font-bold shadow-2xs"
            >
              Բացել բոլոր պատասխանները
            </button>
            <button
              type="button"
              onClick={() => setRevealedAnswers({})}
              className="text-xs sm:text-sm px-3 py-2 bg-white border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
              title="Փակել բոլոր պատասխանները՝ կրկին մարզվելու համար"
            >
              <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
              Մաքրել
            </button>
          </div>
        </div>

        {/* TAB 1: THEORY / ՏԵՍՈՒԹՅՈՒՆ */}
        {activeTab === 'theory' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h2 className={`font-bold text-stone-900 ${fClasses.heading}`}>
                  📖 Տեսական նյութեր և հասկացություններ / Teoría y conceptos
                </h2>
                <p className={`text-stone-600 mt-1 ${fClasses.sub}`}>
                  1º ESO / 7-րդ դասարանի լրիվ ծրագիրը՝ մանրամասն բացատրություններով և օրինակներով
                </p>
              </div>
              <span className="text-sm text-stone-500 font-mono font-bold bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
                8 թեմա
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredTheory.map((section) => {
                const isSecArmenianOpen = isArmenianShown(`theory-sec-${section.id}`);

                return (
                  <article
                    key={section.id}
                    className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden transition-all hover:border-amber-300 hover:shadow-xs"
                  >
                    {/* Section Header */}
                    <div className="px-6 py-4.5 bg-stone-50/80 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs sm:text-sm font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-950 border border-amber-300">
                          {section.tag}
                        </span>
                        <h3 className={`font-bold text-stone-900 ${fClasses.subheading}`}>
                          {section.titleEs}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => speakSpanish(section.titleEs.replace(/^\d+\.\s*/, ''))}
                          className="p-2 text-stone-500 hover:text-amber-800 hover:bg-amber-100/70 rounded-lg cursor-pointer transition-colors"
                          title="Լսել արտասանությունը (Իսպաներեն)"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleArmenian(`theory-sec-${section.id}`)}
                          className={`px-3 py-1.5 rounded-lg font-semibold border cursor-pointer transition-colors flex items-center gap-1.5 text-xs sm:text-sm ${
                            isSecArmenianOpen
                              ? 'bg-amber-600 text-white border-amber-700 shadow-2xs'
                              : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-100'
                          }`}
                        >
                          <Languages className="w-4 h-4" />
                          <span>{isSecArmenianOpen ? 'Թաքցնել հայերենը' : 'Հայերեն թարգմանություն 🇦🇲'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-6 space-y-5">
                      {/* Subtitle in Armenian if toggled */}
                      {isSecArmenianOpen && (
                        <div className={`p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-bold ${fClasses.subheading}`}>
                          🇦🇲 {section.titleHy}
                        </div>
                      )}

                      {/* Main Explanation Block with Click-to-Translate */}
                      <div
                        onClick={() => toggleArmenian(`theory-exp-${section.id}`)}
                        className="cursor-pointer group p-4 rounded-xl border border-stone-100 hover:border-amber-300 hover:bg-amber-50/40 transition-colors"
                        title="Կտտացրո՛ւ հայերեն բացատրությունը տեսնելու համար"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xl select-none pt-0.5">🇪🇸</span>
                          <div className="flex-1">
                            <p className={`text-stone-900 font-medium leading-relaxed ${fClasses.body}`}>
                              {section.explanationEs}
                            </p>
                            <span className="inline-block mt-2 text-xs sm:text-sm font-semibold text-amber-800 group-hover:text-amber-950 transition-colors">
                              👆 Կտտացրո՛ւ՝ հայերենը տեսնելու համար / Clic para traducir
                            </span>
                          </div>
                        </div>

                        {/* Armenian translation */}
                        {(isArmenianShown(`theory-exp-${section.id}`) || isSecArmenianOpen) && (
                          <div className={`mt-3.5 pt-3 border-t border-amber-200/80 flex items-start gap-3 text-stone-800 leading-relaxed bg-amber-50/70 p-3.5 rounded-xl font-medium ${fClasses.translation}`}>
                            <span className="text-xl select-none pt-0.5">🇦🇲</span>
                            <p className="font-sans text-stone-950">{section.explanationHy}</p>
                          </div>
                        )}
                      </div>

                      {/* Examples */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-500">
                            Ejemplos / Օրինակներ
                          </h4>
                          <span className="text-xs text-stone-400">Կտտացրու օրինակի վրա՝ թարգմանելու համար</span>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          {section.examples.map((ex, exIdx) => {
                            const exKey = `theory-ex-${section.id}-${exIdx}`;
                            const isExArmenian = isArmenianShown(exKey) || isSecArmenianOpen;

                            return (
                              <div
                                key={exIdx}
                                onClick={() => toggleArmenian(exKey)}
                                className="group p-4 rounded-xl bg-stone-50/80 border border-stone-200 hover:border-amber-400 hover:bg-white transition-all cursor-pointer shadow-2xs"
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-2.5">
                                    <span className="text-xs px-2 py-0.5 rounded bg-stone-200 text-stone-800 font-mono font-bold">
                                      🇪🇸
                                    </span>
                                    <span className={`font-bold text-stone-900 ${fClasses.question}`}>
                                      {ex.es}
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      speakSpanish(ex.es);
                                    }}
                                    className="text-stone-400 hover:text-stone-800 p-1.5 rounded-lg hover:bg-stone-200 transition-colors"
                                    title="Լսել արտասանությունը"
                                  >
                                    <Volume2 className="w-5 h-5" />
                                  </button>
                                </div>

                                {ex.subEs && (
                                  <p className={`text-stone-600 mt-1 pl-8 italic ${fClasses.sub}`}>{ex.subEs}</p>
                                )}

                                {/* Armenian translation */}
                                {isExArmenian ? (
                                  <div className="mt-2.5 pt-2.5 border-t border-stone-200 pl-8">
                                    <div className={`flex items-center gap-2 text-amber-950 font-semibold ${fClasses.translation}`}>
                                      <span className="text-sm">🇦🇲</span>
                                      <span>{ex.hy}</span>
                                    </div>
                                    {ex.subHy && (
                                      <p className={`text-stone-600 mt-1 ${fClasses.sub}`}>{ex.subHy}</p>
                                    )}
                                  </div>
                                ) : (
                                  <div className="pl-8 mt-1.5">
                                    <span className="text-xs font-semibold text-stone-400 group-hover:text-amber-800">
                                      👆 Տեսնել հայերենը
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Comparison Table if present */}
                      {section.comparison && (
                        <div className="mt-5 p-5 rounded-2xl bg-stone-100/90 border border-stone-200">
                          <h4 className={`font-bold uppercase tracking-wider text-stone-800 mb-3.5 flex items-center gap-2 ${fClasses.sub}`}>
                            <span>⚖️ Diferencia clave / Հիմնական տարբերությունը</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
                              <span className={`font-bold text-amber-950 block mb-1.5 ${fClasses.subheading}`}>
                                🇪🇸 {section.comparison.item1Es}
                              </span>
                              <p className={`text-stone-800 mb-2 leading-relaxed ${fClasses.body}`}>
                                {section.comparison.desc1Es}
                              </p>
                              {isSecArmenianOpen && (
                                <div className={`pt-2.5 border-t border-stone-100 text-stone-700 leading-relaxed font-sans ${fClasses.sub}`}>
                                  <strong className="text-stone-900">🇦🇲 {section.comparison.item1Hy}:</strong>{' '}
                                  {section.comparison.desc1Hy}
                                </div>
                              )}
                            </div>

                            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
                              <span className={`font-bold text-emerald-950 block mb-1.5 ${fClasses.subheading}`}>
                                🇪🇸 {section.comparison.item2Es}
                              </span>
                              <p className={`text-stone-800 mb-2 leading-relaxed ${fClasses.body}`}>
                                {section.comparison.desc2Es}
                              </p>
                              {isSecArmenianOpen && (
                                <div className={`pt-2.5 border-t border-stone-100 text-stone-700 leading-relaxed font-sans ${fClasses.sub}`}>
                                  <strong className="text-stone-900">🇦🇲 {section.comparison.item2Hy}:</strong>{' '}
                                  {section.comparison.desc2Hy}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Note */}
                      {section.noteEs && (
                        <div className={`p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3 ${fClasses.body}`}>
                          <span className="font-bold text-lg select-none">💡</span>
                          <div>
                            <p className="font-semibold">{section.noteEs}</p>
                            {isSecArmenianOpen && section.noteHy && (
                              <p className={`mt-1.5 text-stone-800 font-medium ${fClasses.sub}`}>{section.noteHy}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: PRÁCTICA 1 / ՔՆՆԱԿԱՆ ՎԱՐԺՈՒԹՅՈՒՆՆԵՐ 1 */}
        {activeTab === 'practice1' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
              <div>
                <h2 className={`font-bold text-stone-900 ${fClasses.heading}`}>
                  📝 PRÁCTICA DE EXAMEN (50 preguntas) / ՔՆՆՈՒԹՅԱՆ ՎԱՐԺՈՒԹՅՈՒՆՆԵՐ
                </h2>
                <p className={`text-stone-600 mt-1 ${fClasses.sub}`}>
                  1º ESO քննական ձևաչափ՝ ընտրովի, հոմանիշ/հականիշ, բազմիմաստություն, իմաստային դաշտ, բառակազմական ընտանիք
                </p>
              </div>

              {/* Part Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <span className="text-xs sm:text-sm text-stone-500 font-bold">Մաս՝</span>
                <button
                  type="button"
                  onClick={() => setSelectedPartP1('all')}
                  className={`text-xs sm:text-sm px-3 py-1.5 rounded-lg cursor-pointer font-bold ${
                    selectedPartP1 === 'all'
                      ? 'bg-stone-900 text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Բոլորը (50)
                </button>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setSelectedPartP1(p)}
                    className={`text-xs sm:text-sm px-2.5 py-1.5 rounded-lg cursor-pointer font-bold ${
                      selectedPartP1 === p
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Մաս {p}
                  </button>
                ))}
              </div>
            </div>

            {/* List of questions */}
            <div className="space-y-4">
              {filteredPractice1.map((item) => renderExerciseCard(item, 'p1'))}
            </div>
          </div>
        )}

        {/* TAB 3: PRÁCTICA 2 / ՎԱՐԺՈՒԹՅՈՒՆ 2 */}
        {activeTab === 'practice2' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
              <div>
                <h2 className={`font-bold text-stone-900 ${fClasses.heading}`}>
                  🎯 PRÁCTICA 2 (50 preguntas) / ՎԱՐԺՈՒԹՅՈՒՆ 2
                </h2>
                <p className={`text-stone-600 mt-1 ${fClasses.sub}`}>
                  Լրացուցիչ խորացված պրակտիկա՝ նոր բառերով, համատեքստային բազմիմաստությամբ և բացատրություններով
                </p>
              </div>

              {/* Part Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <span className="text-xs sm:text-sm text-stone-500 font-bold">Մաս՝</span>
                <button
                  type="button"
                  onClick={() => setSelectedPartP2('all')}
                  className={`text-xs sm:text-sm px-3 py-1.5 rounded-lg cursor-pointer font-bold ${
                    selectedPartP2 === 'all'
                      ? 'bg-stone-900 text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Բոլորը (50)
                </button>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setSelectedPartP2(p)}
                    className={`text-xs sm:text-sm px-2.5 py-1.5 rounded-lg cursor-pointer font-bold ${
                      selectedPartP2 === p
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Մաս {p}
                  </button>
                ))}
              </div>
            </div>

            {/* List of questions */}
            <div className="space-y-4">
              {filteredPractice2.map((item) => renderExerciseCard(item, 'p2'))}
            </div>
          </div>
        )}

        {/* TAB 4: TEXTS / ՏԵՔՍՏԵՐԻ ՎԵՐԼՈՒԾՈՒԹՅՈՒՆ */}
        {activeTab === 'texts' && (
          <div className="space-y-8">
            <div className="pb-3 border-b border-stone-200">
              <h2 className={`font-bold text-stone-900 ${fClasses.heading}`}>
                🔍 Palabras y significados — Busca en el texto / Գտի՛ր տեքստում
              </h2>
              <p className={`text-stone-600 mt-1 ${fClasses.sub}`}>
                Իրական քննության ձևաչափով ընթերցանական տեքստեր՝ հարցերով, հոմանիշների, հականիշների և բազմիմաստ բառերի որոնմամբ
              </p>
            </div>

            {/* The 3 Exam Texts */}
            {examTexts.map((textItem) => {
              const textArmenianKey = `exam-text-arm-${textItem.id}`;
              const isTextArmenianOpen = isArmenianShown(textArmenianKey);

              return (
                <article
                  key={textItem.id}
                  className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden"
                >
                  {/* Text Header */}
                  <div className="px-6 py-4.5 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs sm:text-sm font-bold px-2.5 py-1 rounded-md bg-stone-200 text-stone-900">
                        Texto de Examen
                      </span>
                      <h3 className={`font-bold text-stone-900 mt-1.5 ${fClasses.subheading}`}>
                        {textItem.titleEs}
                      </h3>
                      {isTextArmenianOpen && (
                        <p className={`text-amber-950 font-bold mt-1 ${fClasses.body}`}>
                          🇦🇲 {textItem.titleHy}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => speakSpanish(textItem.textEs.join(' '))}
                        className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-lg cursor-pointer transition-colors"
                        title="Լսել ամբողջ տեքստը"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleArmenian(textArmenianKey)}
                        className={`px-3 py-1.5 rounded-lg font-semibold border cursor-pointer transition-colors flex items-center gap-1.5 text-xs sm:text-sm ${
                          isTextArmenianOpen
                            ? 'bg-amber-600 text-white border-amber-700 shadow-2xs'
                            : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        <Languages className="w-4 h-4" />
                        <span>{isTextArmenianOpen ? 'Թաքցնել հայերենը' : 'Հայերեն տեքստ 🇦🇲'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Reading Passage: Spanish and optional Armenian side-by-side or stacked */}
                  <div className="p-6 border-b border-stone-100 bg-stone-50/40">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Spanish Column */}
                      <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-2xs">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs sm:text-sm font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                            <span>🇪🇸 Español (Texto original)</span>
                          </span>
                          <span className="text-xs text-stone-400">Կտտացրու նախադասության վրա</span>
                        </div>
                        <div className="space-y-3 text-stone-900 leading-relaxed">
                          {textItem.textEs.map((paragraph, pIdx) => {
                            const pKey = `p-es-${textItem.id}-${pIdx}`;
                            const isPRevealed = isArmenianShown(pKey) || isTextArmenianOpen;

                            return (
                              <div
                                key={pIdx}
                                onClick={() => toggleArmenian(pKey)}
                                className="group cursor-pointer p-2 rounded-lg hover:bg-amber-50/60 transition-colors"
                              >
                                <p className={fClasses.body}>{paragraph}</p>
                                {isPRevealed && (
                                  <p className={`mt-1.5 text-amber-950 font-sans pl-3 border-l-3 border-amber-400 font-medium ${fClasses.sub}`}>
                                    🇦🇲 {textItem.textHy[pIdx]}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Armenian Column */}
                      <div className="p-5 rounded-xl bg-amber-50/50 border border-amber-200">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs sm:text-sm font-bold text-amber-950 uppercase tracking-wider">
                            🇦🇲 Հայերեն թարգմանություն
                          </span>
                        </div>
                        <div className="space-y-3 text-stone-800 leading-relaxed font-sans font-medium">
                          {textItem.textHy.map((pArm, pIdx) => (
                            <p key={pIdx} className={fClasses.body}>{pArm}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text Questions */}
                  <div className="p-6 space-y-4">
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-600 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-600" />
                      <span>Preguntas sobre el texto / Հարցեր տեքստի վերաբերյալ ({textItem.questions.length})</span>
                    </h4>

                    <div className="grid grid-cols-1 gap-3.5">
                      {textItem.questions.map((q) => {
                        const qKey = `text-${textItem.id}-${q.id}`;
                        const isQAnswerOpen = isAnswerShown(qKey);
                        const isQArmenianOpen = isArmenianShown(qKey);

                        return (
                          <div
                            key={q.id}
                            className="p-4 rounded-xl border border-stone-200 bg-white hover:border-amber-300 transition-colors shadow-2xs"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              {/* Question ES with click to reveal Armenian */}
                              <div
                                onClick={() => toggleArmenian(qKey)}
                                className="cursor-pointer group flex-1"
                                title="Կտտացրո՛ւ հարցի հայերենը տեսնելու համար"
                              >
                                <div className="flex items-start gap-2.5">
                                  <span className={`font-bold text-stone-900 ${fClasses.question}`}>
                                    {q.questionEs}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      speakSpanish(q.questionEs);
                                    }}
                                    className="text-stone-400 hover:text-stone-800 p-1"
                                    title="Լսել"
                                  >
                                    <Volume2 className="w-4 h-4" />
                                  </button>
                                </div>

                                {(isQArmenianOpen || globalShowArmenian) && q.questionHy && (
                                  <p className={`mt-2 text-amber-950 font-sans pl-3 border-l-2 border-amber-300 font-medium ${fClasses.translation}`}>
                                    🇦🇲 {q.questionHy}
                                  </p>
                                )}
                              </div>

                              {/* Answer Button */}
                              <button
                                type="button"
                                onClick={() => toggleAnswer(qKey)}
                                className={`rounded-lg transition-all cursor-pointer shrink-0 flex items-center gap-1.5 shadow-2xs ${fClasses.btn} ${
                                  isQAnswerOpen
                                    ? 'bg-emerald-600 text-white border border-emerald-700'
                                    : 'bg-amber-600 text-white border border-amber-700 hover:bg-amber-700'
                                }`}
                              >
                                <Check className="w-4 h-4" />
                                <span>{isQAnswerOpen ? 'Պատասխան՝ Բացված է' : 'Պատասխան / Ver Respuesta'}</span>
                              </button>
                            </div>

                            {/* Answer Block */}
                            {isQAnswerOpen && (
                              <div className="mt-3.5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 animate-in fade-in duration-150">
                                <div className={`font-bold flex items-center gap-2 text-emerald-950 ${fClasses.body}`}>
                                  <span>🇪🇸</span>
                                  <span className="underline decoration-emerald-400 underline-offset-3">{q.answerEs}</span>
                                </div>
                                {q.answerHy && (
                                  <div className={`mt-1.5 text-emerald-900 font-sans flex items-center gap-2 font-medium ${fClasses.translation}`}>
                                    <span>🇦🇲</span>
                                    <span>{q.answerHy}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Real Exam Model (Modelo de pregunta real de examen) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-linear-to-br from-amber-50 to-stone-100 border border-amber-300 shadow-xs">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="p-2 rounded-lg bg-amber-600 text-white">
                  <Award className="w-6 h-6" />
                </span>
                <h3 className={`font-bold text-stone-900 ${fClasses.heading}`}>
                  {examModel.titleEs}
                </h3>
              </div>
              <p className={`text-amber-950 font-bold mb-4 ${fClasses.subheading}`}>
                🇦🇲 {examModel.titleHy}
              </p>

              {/* Exam Prompt */}
              <div className="p-5 rounded-xl bg-white border border-amber-200 mb-5 shadow-2xs">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-900 block mb-1.5">
                  Enunciado oficial de examen / Քննության հիմնական առաջադրանքը՝
                </span>
                <p className={`text-stone-950 font-bold leading-relaxed mb-2 ${fClasses.question}`}>
                  🇪🇸 {examModel.promptEs}
                </p>
                <p className={`text-stone-800 leading-relaxed font-sans font-medium ${fClasses.body}`}>
                  🇦🇲 {examModel.promptHy}
                </p>
              </div>

              {/* Checklist & Exemplar Breakdown */}
              <div className="space-y-3.5">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-700">
                  Պատասխանի կառուցվածքն ու հիմնավորումները (5 կետ) / Estructura modelo y justificación:
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {examModel.checklist.map((item, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                        <span className={`font-bold text-stone-900 ${fClasses.body}`}>{item.conceptEs}</span>
                        <span className={`text-stone-600 font-sans font-medium ${fClasses.sub}`}>{item.conceptHy}</span>
                      </div>
                      <div className={`p-2 rounded-lg bg-stone-100 text-amber-950 font-mono font-bold mb-2 ${fClasses.sub}`}>
                        Ejemplo: {item.exampleEs}
                      </div>
                      <div className={`text-stone-800 leading-relaxed ${fClasses.body}`}>
                        <p><strong className="text-stone-900">🇪🇸 Justificación:</strong> {item.justificationEs}</p>
                        <p className={`mt-1 text-stone-700 font-sans font-medium ${fClasses.sub}`}><strong className="text-stone-900">🇦🇲 Հիմնավորում:</strong> {item.justificationHy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GLOSSARY / ԲԱՌԱՐԱՆ */}
        {activeTab === 'glossary' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
              <div>
                <h2 className={`font-bold text-stone-900 ${fClasses.heading}`}>
                  📚 Vocabulario y Glosario / Բառարան և հիմնական զույգեր
                </h2>
                <p className={`text-stone-600 mt-1 ${fClasses.sub}`}>
                  Դասընթացի բոլոր հոմանիշները, հականիշները, բազմիմաստ բառերը և ընտանիքները՝ արագ որոնմամբ և աուդիոյով
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {[
                  { key: 'all', label: 'Բոլորը' },
                  { key: 'polisemia', label: 'Բազմիմաստություն' },
                  { key: 'sinonimos', label: 'Հոմանիշներ' },
                  { key: 'antonimos', label: 'Հականիշներ' },
                  { key: 'familia', label: 'Ընտանիքներ' },
                  { key: 'campo', label: 'Իմաստ. դաշտ' },
                ].map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedGlossaryCategory(cat.key)}
                    className={`text-xs sm:text-sm px-3 py-1.5 rounded-lg cursor-pointer font-bold ${
                      selectedGlossaryCategory === cat.key
                        ? 'bg-stone-900 text-white shadow-2xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Glossary Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGlossary.map((g) => {
                const gArmKey = `gloss-${g.id}`;
                const isGArmOpen = isArmenianShown(gArmKey);

                return (
                  <div
                    key={g.id}
                    onClick={() => toggleArmenian(gArmKey)}
                    className="group bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                          {g.categoryLabelEs} · {g.categoryLabelHy}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakSpanish(g.titleEs);
                          }}
                          className="text-stone-400 hover:text-stone-900 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
                          title="Լսել արտասանությունը"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      <h3 className={`font-bold text-stone-900 ${fClasses.question}`}>{g.titleEs}</h3>
                      <p className={`text-stone-700 mt-1.5 leading-relaxed ${fClasses.body}`}>{g.detailEs}</p>
                    </div>

                    {/* Armenian Translation */}
                    <div className="mt-3.5 pt-3 border-t border-stone-100">
                      {isGArmOpen ? (
                        <div className="font-sans">
                          <p className={`font-bold text-amber-950 ${fClasses.body}`}>{g.titleHy}</p>
                          <p className={`text-stone-700 mt-1 leading-relaxed ${fClasses.sub}`}>{g.detailHy}</p>
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-stone-400 group-hover:text-amber-800">
                          👆 Կտտացրո՛ւ հայերենը տեսնելու համար
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-14 border-t border-stone-200 bg-white py-8 text-center text-sm text-stone-600">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-medium">Palabras y significados · Բառերը և դրանց իմաստները (1º ESO / 7-րդ դասարան)</span>
          <span>Իսպաներենի քննական պատրաստություն · Տեսություն և 100+ գործնական վարժություններ</span>
        </div>
      </footer>
    </div>
  );

  // Helper render for exercise cards (used in Practice 1 and Practice 2)
  function renderExerciseCard(item: ExerciseItem, prefix: string) {
    const itemKey = `${prefix}-${item.id}`;
    const armKey = `arm-${itemKey}`;
    const isArmOpen = isArmenianShown(armKey);
    const isAnsOpen = isAnswerShown(itemKey);
    const selectedOption = userSelectedOptions[itemKey];

    return (
      <div
        key={item.id}
        className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs p-5 sm:p-6 transition-all hover:border-amber-300"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-800 border border-stone-300">
              № {item.id}
            </span>
            <span className="text-xs sm:text-sm text-stone-500 font-semibold">
              {item.partTitleEs}
            </span>
          </div>

          <button
            type="button"
            onClick={() => speakSpanish(item.questionEs)}
            className="text-stone-400 hover:text-stone-800 p-1.5 rounded-lg hover:bg-stone-100 cursor-pointer transition-colors"
            title="Լսել իսպաներեն"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Question Text in Spanish (Clickable to reveal Armenian) */}
        <div
          onClick={() => toggleArmenian(armKey)}
          className="cursor-pointer group p-2.5 rounded-xl hover:bg-amber-50/60 transition-colors"
          title="Կտտացրո՛ւ հայերեն թարգմանությունը տեսնելու համար"
        >
          <div className="flex items-start gap-3">
            <span className="text-lg select-none pt-0.5">🇪🇸</span>
            <div className="flex-1">
              <p className={`font-bold text-stone-900 leading-snug ${fClasses.question}`}>
                {item.questionEs}
              </p>
              <span className="inline-block text-xs font-semibold text-stone-400 group-hover:text-amber-800 mt-1 transition-colors">
                👆 Կտտացրո՛ւ՝ հայերեն թարգմանության համար
              </span>
            </div>
          </div>

          {/* Armenian Translation */}
          {(isArmOpen || globalShowArmenian) && item.questionHy && (
            <div className={`mt-2.5 pl-7 pt-2 border-t border-stone-100 flex items-start gap-2.5 text-stone-800 font-sans bg-amber-50/60 p-3 rounded-xl font-medium ${fClasses.translation}`}>
              <span className="text-base select-none pt-0.5">🇦🇲</span>
              <p>{item.questionHy}</p>
            </div>
          )}
        </div>

        {/* Options if Multiple Choice */}
        {item.options && item.options.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3.5 pl-2">
            {item.options.map((opt) => {
              const isSelected = selectedOption === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() =>
                    setUserSelectedOptions((prev) => ({
                      ...prev,
                      [itemKey]: opt.key,
                    }))
                  }
                  className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-50 border-amber-500 font-bold text-amber-950 shadow-2xs ring-2 ring-amber-400'
                      : 'bg-stone-50 border-stone-200 text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <div>
                    <span className={fClasses.body}>{opt.textEs}</span>
                    {isArmOpen && opt.textHy && (
                      <span className={`block text-stone-600 font-normal font-sans mt-0.5 ${fClasses.sub}`}>
                        🇦🇲 {opt.textHy}
                      </span>
                    )}
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-800 shrink-0" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Action bar with the explicit "ՊԱՏԱՍԽԱՆ" (VER RESPUESTA) button */}
        <div className="mt-4 pt-3.5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => toggleAnswer(itemKey)}
              className={`rounded-xl uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-2xs ${fClasses.btn} ${
                isAnsOpen
                  ? 'bg-emerald-600 text-white border border-emerald-700 hover:bg-emerald-700'
                  : 'bg-amber-600 text-white border border-amber-700 hover:bg-amber-700'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isAnsOpen ? 'Պատասխան՝ Այո (Բացված)' : 'Պատասխան / Ver Respuesta'}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleArmenian(armKey)}
              className="text-xs sm:text-sm text-stone-600 hover:text-stone-950 px-3 py-1.5 rounded-lg hover:bg-stone-100 cursor-pointer font-bold border border-transparent hover:border-stone-200"
            >
              {isArmOpen ? 'Թաքցնել հայերենը' : 'Հայերեն 🇦🇲'}
            </button>
          </div>

          {isAnsOpen && (
            <span className="text-xs sm:text-sm font-bold text-emerald-900 bg-emerald-100/70 px-3 py-1 rounded-md border border-emerald-300">
              ✓ Ստուգված է
            </span>
          )}
        </div>

        {/* Revealed Answer & Explanation Block */}
        {isAnsOpen && (
          <div className="mt-3.5 p-4 sm:p-5 rounded-2xl bg-emerald-50/95 border border-emerald-200 text-emerald-950 animate-in fade-in duration-150">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <div className={`flex items-center gap-2 font-bold text-emerald-950 ${fClasses.question}`}>
                  <span>🇪🇸 Respuesta:</span>
                  <span className="underline decoration-emerald-400 underline-offset-3">{item.answer}</span>
                </div>
                {item.explanationEs && (
                  <p className={`text-emerald-900/90 leading-relaxed ${fClasses.body}`}>
                    {item.explanationEs}
                  </p>
                )}
                {item.explanationHy && (
                  <p className={`text-emerald-800 font-sans pt-2 border-t border-emerald-200 leading-relaxed font-medium ${fClasses.translation}`}>
                    🇦🇲 <strong>Բացատրություն՝</strong> {item.explanationHy}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => speakSpanish(item.answer)}
                className="text-emerald-700 hover:text-emerald-950 p-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
                title="Լսել պատասխանը"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
