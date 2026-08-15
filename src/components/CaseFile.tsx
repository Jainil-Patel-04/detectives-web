'use client';

import { useState, FormEvent } from 'react';
import type { Theme } from '@/lib/themes';
import type { OptionCandidate } from '@/lib/questionTemplates';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export default function CaseFile({
  messages,
  options,
  onSelectOption,
  onAskFreeText,
  loading,
  theme,
}: {
  messages: Message[];
  options: OptionCandidate[];
  onSelectOption: (option: OptionCandidate) => void;
  onAskFreeText: (question: string) => void;
  loading: boolean;
  theme: Theme;
}) {
  const [input, setInput] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    onAskFreeText(input);
    setInput('');
  }

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: theme.bgSecondary, color: theme.textPrimary }}>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="italic text-sm opacity-60">
            Choose a lead below, or ask your own question.
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span
              className="inline-block px-3 py-2 rounded"
              style={{
                backgroundColor: m.role === 'user' ? theme.accent : `${theme.accent}20`,
                color: m.role === 'user' ? '#fff' : theme.textPrimary,
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
        {loading && <p className="italic opacity-60 text-sm">Cross-referencing files...</p>}
      </div>

      <div className="p-4 border-t space-y-2" style={{ borderColor: `${theme.accent}30` }}>
        {options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => onSelectOption(opt)}
            disabled={loading}
            className="w-full text-left px-4 py-3 rounded border transition-colors disabled:opacity-40"
            style={{ borderColor: `${theme.accent}50`, backgroundColor: `${theme.accent}08` }}
          >
            {opt.label}
          </button>
        ))}

        <form onSubmit={handleSubmit} className="flex gap-2 pt-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Or ask your own..."
            disabled={loading}
            className="flex-1 px-3 py-2 rounded border"
            style={{ borderColor: theme.accent, backgroundColor: '#fff' }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2 rounded text-white disabled:opacity-40"
            style={{ backgroundColor: theme.accent }}
          >
            Ask
          </button>
        </form>
      </div>
    </div>
  );
}