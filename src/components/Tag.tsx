interface TagProps {
  children: string;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="ml-2 inline-flex items-center border border-accent/50 px-1 py-0.5 align-middle text-[10px] font-medium uppercase tracking-wider text-accent">
      {children}
    </span>
  );
}
