"use client";

import { SUGGESTED_CATEGORIES } from "@/lib/categories";

const CUSTOM_OPTION = "__custom__";

type CategoryFieldProps = {
  value: string;
  onChange: (value: string) => void;
  fieldClass: string;
};

export function CategoryField({ value, onChange, fieldClass }: CategoryFieldProps) {
  const isPreset = (SUGGESTED_CATEGORIES as readonly string[]).includes(value);
  const selectValue = isPreset ? value : CUSTOM_OPTION;

  return (
    <div className="space-y-3">
      <label className="block text-sm text-slate-300">
        Category
        <select
          className={fieldClass}
          value={selectValue}
          onChange={(event) => {
            if (event.target.value === CUSTOM_OPTION) {
              onChange(isPreset ? "" : value);
              return;
            }

            onChange(event.target.value);
          }}
        >
          {SUGGESTED_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
          <option value={CUSTOM_OPTION}>Custom category…</option>
        </select>
      </label>

      {selectValue === CUSTOM_OPTION ? (
        <label className="block text-sm text-slate-300">
          Custom category name
          <input
            className={fieldClass}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="e.g. Education, Foreign Policy"
            required
          />
        </label>
      ) : null}
    </div>
  );
}
