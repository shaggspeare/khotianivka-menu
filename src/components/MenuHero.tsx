import Image from "next/image";

export function MenuHero() {
  return (
    <header className="px-5 pt-12 pb-10 sm:px-8 sm:pt-16">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <Image
          src="/bar-logo.png"
          alt="Beach Santa Khotianivka"
          width={180}
          height={180}
          priority
          className="mb-6"
        />
        <h1 className="text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Beach Santa Khotianivka
        </h1>
        <p className="mt-3 text-base text-muted">Пляжний бар • Хотянівка</p>
      </div>
    </header>
  );
}
