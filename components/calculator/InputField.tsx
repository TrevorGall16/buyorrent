/**
 * Reusable input field component with slider support and editable number input
 */

import { useState, useEffect } from 'react';
import InfoTooltip from '@/components/ui/InfoTooltip';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  formatValue?: (value: number) => string;
  tooltip?: string;
}

export default function InputField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix = '',
  suffix = '',
  formatValue,
  tooltip,
}: InputFieldProps) {
  const displayValue = formatValue ? formatValue(value) : value.toLocaleString();
  const [inputValue, setInputValue] = useState(value.toString());

  // Sync input value when slider changes
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setInputValue(rawValue);

    // Parse the number and validate
    const numValue = parseFloat(rawValue);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue);
    }
  };

  const handleInputBlur = () => {
    // On blur, sync input with actual value to fix any invalid input
    setInputValue(value.toString());
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-baseline mb-1">
        <label className="text-base font-semibold text-gray-800 dark:text-gray-100 flex items-center">
          {label}
          {tooltip && <InfoTooltip text={tooltip} />}
        </label>
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            {prefix}
            {displayValue}
            {suffix}
          </span>
          
          {/* NUMBER INPUT: FORCE DARK BACKGROUND WITH HEX */}
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            min={min}
            max={max}
            step={step}
            className="w-24 px-2 py-1 text-sm text-slate-900 dark:text-white bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-600 rounded-md opacity-100 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent"
            aria-label={`${label} - exact value`}
          />
        </div>
      </div>
      
      {/* SLIDER INPUT */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-[#333333] rounded-lg appearance-none cursor-pointer accent-green-600 dark:accent-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${prefix}${displayValue}${suffix}`}
      />
      
      {/* MIN/MAX LABELS */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-300">
        <span>
          {prefix}
          {min.toLocaleString()}
          {suffix}
        </span>
        <span>
          {prefix}
          {max.toLocaleString()}
          {suffix}
        </span>
      </div>
    </div>
  );
}