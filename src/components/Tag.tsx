interface TagProps {
  children: string;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="text-[11px] font-medium uppercase tracking-wide text-red-500">
      {children}
    </span>
  );
}
