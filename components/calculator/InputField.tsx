/**
 * Reusable input field component with slider support
 */

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
}: InputFieldProps) {
  const displayValue = formatValue ? formatValue(value) : value.toLocaleString();

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-baseline mb-1">
        <label className="text-base font-semibold text-gray-800">{label}</label>
        <span className="text-xl font-bold text-gray-900">
          {prefix}
          {displayValue}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${prefix}${displayValue}${suffix}`}
      />
      <div className="flex justify-between text-xs text-gray-500">
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
