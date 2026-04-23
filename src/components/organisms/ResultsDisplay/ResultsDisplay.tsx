'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useCalculator } from '../../../context/CalculatorContext';
import { generateRecommendation } from '../../../lib/engine/RecommendationEngine';
import { formatCurrency, formatGrams } from '../../../lib/engine/MehrEngine';
import { QURAN_MEHR_VERSE, MEHR_HADITH_REFERENCES } from '../../../lib/constants/fiqh';
import { Button } from '../../atoms/Button/Button';
import styles from './ResultsDisplay.module.css';

export function ResultsDisplay() {
  const { state, reset } = useCalculator();

  const result = useMemo(
    () => generateRecommendation(state),
    [state]
  );

  const currency = state.financial.currency;

  // Affordability gauge colors
  const zoneColors: Record<string, string> = {
    comfortable: 'var(--color-zone-comfortable)',
    moderate: 'var(--color-zone-moderate)',
    stretching: 'var(--color-zone-stretching)',
    burdensome: 'var(--color-zone-burdensome)',
  };

  const gaugeColor = zoneColors[result.affordability.zone] || 'var(--color-zone-moderate)';

  // Max benchmark value for bar scaling
  const maxBenchmarkValue = Math.max(
    ...result.sunnahComparisons.map((s) => s.currentValueInCurrency),
    result.recommended.maximum
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.results}>
      <div className={styles.results__inner}>
        {/* Header */}
        <div className={styles.results__header}>
          <p className={styles.results__label}>Your Mehr Recommendation</p>
          <h1 className={styles.results__title}>AI-Powered Guidance</h1>
          <div className={styles.results__confidence}>
            {result.confidence === 'high' ? '🟢' : result.confidence === 'medium' ? '🟡' : '🔴'}
            {result.confidence.charAt(0).toUpperCase() + result.confidence.slice(1)} Confidence
          </div>
        </div>

        {/* Primary Recommendation */}
        <div className={styles.results__primaryCard}>
          <p className={styles.results__rangeLabel}>Recommended Mehr</p>
          <div className={styles.results__amount}>
            {formatCurrency(result.recommended.sweetSpot, currency)}
          </div>
          <p className={styles.results__amountLabel}>Suggested Sweet Spot</p>

          <div className={styles.results__range}>
            <div className={styles.results__rangeItem}>
              <div className={styles.results__rangeItemLabel}>Minimum</div>
              <div className={styles.results__rangeItemValue}>
                {formatCurrency(result.recommended.minimum, currency)}
              </div>
            </div>
            <span className={styles.results__rangeDivider}>—</span>
            <div className={styles.results__rangeItem}>
              <div className={styles.results__rangeItemLabel}>Sweet Spot</div>
              <div className={styles.results__rangeItemValue} style={{ color: 'var(--color-gold-400)' }}>
                {formatCurrency(result.recommended.sweetSpot, currency)}
              </div>
            </div>
            <span className={styles.results__rangeDivider}>—</span>
            <div className={styles.results__rangeItem}>
              <div className={styles.results__rangeItemLabel}>Maximum</div>
              <div className={styles.results__rangeItemValue}>
                {formatCurrency(result.recommended.maximum, currency)}
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className={styles.results__summary}>
          {result.summary}
        </div>

        {/* Grid */}
        <div className={styles.results__grid}>
          {/* Sunnah Benchmarks */}
          <div className={styles.results__section} style={{ animationDelay: '0.3s' }}>
            <h3 className={styles.results__sectionTitle}>📖 Sunnah Benchmarks</h3>
            <div className={styles.results__benchmarkList}>
              {result.sunnahComparisons.map((comp) => {
                const fillPercent = maxBenchmarkValue > 0
                  ? Math.min((comp.currentValueInCurrency / maxBenchmarkValue) * 100, 100)
                  : 0;
                return (
                  <div key={comp.benchmark.id} className={styles.results__benchmark}>
                    <div className={styles.results__benchmarkHeader}>
                      <div>
                        <span className={styles.results__benchmarkName}>
                          {comp.benchmark.name}
                        </span>
                        <br />
                        <span className={styles.results__benchmarkArabic}>
                          {comp.benchmark.arabicName} — {comp.benchmark.dirhams} dirhams ({formatGrams(comp.benchmark.silverGrams)} silver)
                        </span>
                      </div>
                      <span className={styles.results__benchmarkValue}>
                        {formatCurrency(comp.currentValueInCurrency, currency)}
                      </span>
                    </div>
                    <div className={styles.results__benchmarkBar}>
                      <div
                        className={styles.results__benchmarkFill}
                        style={{ width: `${fillPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Affordability */}
          <div className={styles.results__section} style={{ animationDelay: '0.4s' }}>
            <h3 className={styles.results__sectionTitle}>📊 Affordability</h3>
            <div className={styles.results__gauge}>
              <div
                className={styles.results__gaugeCircle}
                style={{ borderColor: gaugeColor }}
              >
                <span className={styles.results__gaugeScore} style={{ color: gaugeColor }}>
                  {result.affordability.score}
                </span>
                <span className={styles.results__gaugeLabel} style={{ color: gaugeColor }}>
                  / 100
                </span>
              </div>
              <div className={styles.results__gaugeZone} style={{ color: gaugeColor }}>
                {result.affordability.zone}
              </div>
              <p className={styles.results__gaugeExplanation}>
                {result.affordability.explanation}
              </p>
              <p className={styles.results__gaugeExplanation} style={{ fontSize: 'var(--text-xs)' }}>
                {result.affordability.percentageOfIncome}% of annual income
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div className={styles.results__section} style={{ animationDelay: '0.5s' }}>
            <h3 className={styles.results__sectionTitle}>💰 Mehr Breakdown</h3>
            {result.breakdown.promptAmount > 0 && result.breakdown.deferredAmount > 0 && (
              <div className={styles.results__breakdownBar}>
                <div
                  className={styles.results__breakdownPrompt}
                  style={{
                    width: `${(result.breakdown.promptAmount / result.breakdown.totalAmount) * 100}%`,
                  }}
                >
                  Prompt
                </div>
                <div
                  className={styles.results__breakdownDeferred}
                  style={{
                    width: `${(result.breakdown.deferredAmount / result.breakdown.totalAmount) * 100}%`,
                  }}
                >
                  Deferred
                </div>
              </div>
            )}
            <div className={styles.results__breakdownDetails}>
              <div className={styles.results__breakdownItem}>
                <div className={styles.results__breakdownItemLabel}>Prompt (Mu&apos;ajjal)</div>
                <div className={styles.results__breakdownItemValue}>
                  {formatCurrency(result.breakdown.promptAmount, currency)}
                </div>
              </div>
              <div className={styles.results__breakdownItem}>
                <div className={styles.results__breakdownItemLabel}>Deferred (Mu&apos;akhkhar)</div>
                <div className={styles.results__breakdownItemValue}>
                  {formatCurrency(result.breakdown.deferredAmount, currency)}
                </div>
              </div>
              <div className={styles.results__breakdownItem}>
                <div className={styles.results__breakdownItemLabel}>Gold Equivalent ({result.breakdown.goldKarat}K)</div>
                <div className={styles.results__breakdownItemValue}>
                  {formatGrams(result.breakdown.goldEquivalentGrams)}
                </div>
              </div>
              <div className={styles.results__breakdownItem}>
                <div className={styles.results__breakdownItemLabel}>Silver Equivalent</div>
                <div className={styles.results__breakdownItemValue}>
                  {formatGrams(result.breakdown.silverEquivalentGrams)}
                </div>
              </div>
            </div>
          </div>

          {/* Fiqh Compliance */}
          <div className={styles.results__section} style={{ animationDelay: '0.6s' }}>
            <h3 className={styles.results__sectionTitle}>
              🕌 Hanafi Compliance
            </h3>
            <div style={{
              padding: 'var(--space-4)',
              background: result.fiqhCompliance.meetsHanafiMinimum
                ? 'rgba(34, 197, 94, 0.08)'
                : 'rgba(239, 68, 68, 0.08)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-4)',
            }}>
              <p style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: result.fiqhCompliance.meetsHanafiMinimum
                  ? 'var(--color-success)'
                  : 'var(--color-error)',
                marginBottom: 'var(--space-2)',
              }}>
                {result.fiqhCompliance.meetsHanafiMinimum ? '✓ Meets' : '✗ Below'} Hanafi Minimum
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                {result.fiqhCompliance.explanation}
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                Hanafi minimum: {formatCurrency(result.fiqhCompliance.hanafiMinimumInCurrency, currency)} ({formatGrams(result.fiqhCompliance.minimumSilverGrams)} silver)
              </p>
            </div>

            {/* Mithl Analysis */}
            {result.mithlAnalysis && (
              <div style={{
                padding: 'var(--space-4)',
                background: 'var(--color-bg-input)',
                borderRadius: 'var(--radius-md)',
              }}>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                  Mehr al-Mithl Analysis
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                  Family average: {formatCurrency(result.mithlAnalysis.familyAverage, currency)} ({result.mithlAnalysis.dataPoints} data point{result.mithlAnalysis.dataPoints > 1 ? 's' : ''})
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                  {result.mithlAnalysis.explanation}
                </p>
              </div>
            )}
          </div>

          {/* AI Reasoning */}
          <div className={`${styles.results__section} ${styles.results__sectionFull}`} style={{ animationDelay: '0.7s' }}>
            <h3 className={styles.results__sectionTitle}>🧠 AI Reasoning Breakdown</h3>
            <div className={styles.results__reasoningList}>
              {result.reasoning.map((step, idx) => (
                <div key={idx} className={styles.results__reasoningItem}>
                  <div className={styles.results__reasoningFactor}>
                    {step.factor}
                    <span className={styles.results__reasoningWeight}> — {Math.round(step.weight * 100)}% weight</span>
                  </div>
                  <p className={styles.results__reasoningExplanation}>
                    {step.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Islamic References */}
          <div className={`${styles.results__section} ${styles.results__sectionFull}`} style={{ animationDelay: '0.8s' }}>
            <h3 className={styles.results__sectionTitle}>📜 Islamic References</h3>

            <div className={styles.results__fiqhRef}>
              <div className={styles.results__fiqhRefTitle} style={{ fontFamily: 'var(--font-arabic)', fontSize: 'var(--text-xl)', textAlign: 'center' }}>
                {QURAN_MEHR_VERSE.arabic}
              </div>
              <div className={styles.results__fiqhRefText} style={{ textAlign: 'center', marginTop: 'var(--space-2)' }}>
                &quot;{QURAN_MEHR_VERSE.translation}&quot;
              </div>
              <div className={styles.results__fiqhRefSource} style={{ textAlign: 'center' }}>
                {QURAN_MEHR_VERSE.reference}
              </div>
            </div>

            {MEHR_HADITH_REFERENCES.map((hadith, idx) => (
              <div key={idx} className={styles.results__fiqhRef}>
                <div className={styles.results__fiqhRefText}>
                  &quot;{hadith.text}&quot;
                </div>
                <div className={styles.results__fiqhRefSource}>
                  {hadith.source} — {hadith.narrator}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className={`${styles.results__actions} no-print`}>
          <Button variant="primary" onClick={handlePrint} icon={<span>🖨️</span>}>
            Print Summary
          </Button>
          <Link href="/calculator">
            <Button variant="secondary" onClick={reset} icon={<span>🔄</span>}>
              Recalculate
            </Button>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className={styles.results__disclaimer}>
          ⚠️ This tool provides guidance based on established Hanafi fiqh principles and general norms.
          It is <strong>not</strong> a fatwa or legally binding calculation. The Mehr is ultimately a mutual
          agreement between the bride and groom. Please consult your local scholar or imam for guidance
          specific to your situation.
        </div>
      </div>
    </div>
  );
}
