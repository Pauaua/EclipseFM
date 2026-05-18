export function SectionTag({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-0.5 h-5 bg-yellow-DEFAULT" />
      <span className="text-[10px] font-semibold tracking-widest uppercase text-yellow-DEFAULT">
        {text}
      </span>
    </div>
  );
}
