import { useRef, useState } from "react";

type Props = {
  label: string;
  hint: string;
  file: File | null;
  onFile: (f: File | null) => void;
  disabled?: boolean;
};

const ACCEPT = ".pdf,.doc,.docx,.txt,.md";

export function FileDrop({ label, hint, file, onFile, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (disabled) return;
        const f = e.dataTransfer.files?.[0];
        if (f) onFile(f);
      }}
      className={[
        "group relative rounded-xl border-2 border-dashed p-6 transition",
        "bg-white",
        dragOver
          ? "border-[#C8A24B] bg-[#FFF9EC]"
          : "border-[#1B3A6B]/25 hover:border-[#1B3A6B]/60",
        disabled ? "opacity-60 pointer-events-none" : "",
      ].join(" ")}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C8A24B]">
            {label}
          </div>
          <p className="mt-1 text-sm text-slate-600">{hint}</p>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="cursor-pointer shrink-0 rounded-md bg-[#1B3A6B] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#15305A]"
        >
          {file ? "Replace" : "Browse"}
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#1B3A6B]/5 text-[#1B3A6B]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          {file ? (
            <>
              <div className="truncate text-sm font-medium text-slate-900">
                {file.name}
              </div>
              <div className="text-xs text-slate-500">
                {(file.size / 1024).toFixed(1)} KB · ready
              </div>
            </>
          ) : (
            <div className="text-sm text-slate-500">
              Drag & drop or browse — PDF, DOCX, TXT
            </div>
          )}
        </div>
        {file && (
          <button
            type="button"
            onClick={() => onFile(null)}
            className="cursor-pointer text-xs text-red-500 hover:text-red-700"
          >
            Remove
          </button>
          )}
        </div>
    </div>
  );
}
