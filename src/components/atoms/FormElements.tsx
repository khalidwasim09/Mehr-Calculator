import React from 'react';
import styles from './FormElements.module.css';

/* ── Input ── */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

export function Input({
  label,
  helperText,
  error,
  required,
  id,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className={styles.input__wrapper}>
      {label && (
        <label
          htmlFor={id}
          className={`${styles.input__label} ${required ? styles['input__label--required'] : ''}`}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`${styles.input__field} ${error ? styles['input__field--error'] : ''} ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} className={styles.input__error} role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={`${id}-helper`} className={styles.input__helper}>
          {helperText}
        </span>
      )}
    </div>
  );
}

/* ── Select ── */

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export function Select({
  label,
  options,
  helperText,
  error,
  required,
  placeholder,
  id,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className={styles.input__wrapper}>
      {label && (
        <label
          htmlFor={id}
          className={`${styles.input__label} ${required ? styles['input__label--required'] : ''}`}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={`${styles.select__field} ${error ? styles['input__field--error'] : ''} ${className}`}
        aria-invalid={!!error}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className={styles.input__error} role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span className={styles.input__helper}>{helperText}</span>
      )}
    </div>
  );
}

/* ── Slider ── */

interface SliderProps {
  label?: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  minLabel?: string;
  maxLabel?: string;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
  id?: string;
}

export function Slider({
  label,
  min,
  max,
  value,
  onChange,
  minLabel,
  maxLabel,
  showValue = true,
  valueFormatter,
  id,
}: SliderProps) {
  return (
    <div className={styles.slider__wrapper}>
      {label && (
        <label htmlFor={id} className={styles.input__label}>
          {label}
        </label>
      )}
      {showValue && (
        <div className={styles.slider__value}>
          {valueFormatter ? valueFormatter(value) : value}
        </div>
      )}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.slider__track}
      />
      {(minLabel || maxLabel) && (
        <div className={styles.slider__labels}>
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}
