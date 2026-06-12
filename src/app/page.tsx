"use client";

import Image from "next/image";
import { type CSSProperties, useState } from "react";
import { Toaster, toast } from "sonner";
import ChibiDeveloperAvatar from "./ChibiDeveloperAvatar";
import SoftWebScene from "./SoftWebScene";

const socialLinks = [
  {
    name: "Facebook",
    handle: "facebook.com/lmtuyen.dz",
    href: "https://www.facebook.com/lmtuyen.dz",
    iconSrc:
      "https://play-lh.googleusercontent.com/KCMTYuiTrKom4Vyf0G4foetVOwhKWzNbHWumV73IXexAIy5TTgZipL52WTt8ICL-oIo%3Dw240-h480",
    copyText: "https://www.facebook.com/lmtuyen.dz",
  },
  {
    name: "Zalo",
    handle: "0928755446",
    href: "https://zalo.me/0928755446",
    iconSrc:
      "https://play-lh.googleusercontent.com/Zs0-SVFd7FHABCT6buDhAVmOZHlIJS8Z37LMmWghcJV9N4ryZfpI0dZa0jzejcJ3cQ%3Dw240-h480",
    copyText: "https://zalo.me/0928755446",
  },
  {
    name: "Instagram",
    handle: "_nyut.31th10",
    href: "https://www.instagram.com/_nyut.31th10/",
    iconSrc:
      "https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fMrYZqnEFpk0IoVP4LM%3Dw240-h480",
    copyText: "https://www.instagram.com/_nyut.31th10/",
  },
  {
    name: "GitHub",
    handle: "LeMinhTuyen31102003",
    href: "https://github.com/LeMinhTuyen31102003",
    iconSrc:
      "https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU%3Dw240-h480",
    copyText: "https://github.com/LeMinhTuyen31102003",
  },
];

const gameLinks = [
  {
    name: "Liên Minh: Tốc Chiến",
    handle: "Ingame / ID: 여기 뚜엔#3110",
    href: "https://wildrift.leagueoflegends.com/",
    iconSrc:
      "https://play-lh.googleusercontent.com/7-kbcpgrCOE1mleJ9g0d61sJeoqKcQRIj4iFvJ8DjPlRIfocOWfOQsXzKWw2I5oHySVdbjR2fvzfCCz1FYQ-RQ%3Dw240-h480",
    copyText: "여기 뚜엔#3110",
  },
];

const skillTags = [
  "Java",
  "Next.js",
  "React",
  "Tailwind CSS",
  "REST API",
  "Database",
  "Git",
  "Responsive UI",
];

const profileStats = [
  { label: "Vai trò", value: "Web Developer" },
  { label: "Stack", value: "Java + Next.js" },
  { label: "Gu làm việc", value: "Gọn, rõ, dễ dùng" },
];

const sakuraPetals = [
  {
    left: "6%",
    delay: "-2s",
    duration: "19s",
    drift: "8rem",
    size: "0.7rem",
    rotate: "280deg",
  },
  {
    left: "13%",
    delay: "-10s",
    duration: "24s",
    drift: "-5rem",
    size: "0.56rem",
    rotate: "-240deg",
  },
  {
    left: "21%",
    delay: "-5s",
    duration: "21s",
    drift: "6rem",
    size: "0.64rem",
    rotate: "310deg",
  },
  {
    left: "29%",
    delay: "-14s",
    duration: "27s",
    drift: "-8rem",
    size: "0.52rem",
    rotate: "-300deg",
  },
  {
    left: "37%",
    delay: "-7s",
    duration: "20s",
    drift: "7rem",
    size: "0.74rem",
    rotate: "260deg",
  },
  {
    left: "46%",
    delay: "-18s",
    duration: "29s",
    drift: "-6rem",
    size: "0.58rem",
    rotate: "-280deg",
  },
  {
    left: "54%",
    delay: "-3s",
    duration: "22s",
    drift: "5rem",
    size: "0.62rem",
    rotate: "330deg",
  },
  {
    left: "62%",
    delay: "-12s",
    duration: "25s",
    drift: "-7rem",
    size: "0.68rem",
    rotate: "-260deg",
  },
  {
    left: "70%",
    delay: "-6s",
    duration: "23s",
    drift: "8rem",
    size: "0.5rem",
    rotate: "290deg",
  },
  {
    left: "78%",
    delay: "-16s",
    duration: "28s",
    drift: "-5rem",
    size: "0.72rem",
    rotate: "-320deg",
  },
  {
    left: "86%",
    delay: "-4s",
    duration: "21s",
    drift: "6rem",
    size: "0.57rem",
    rotate: "240deg",
  },
  {
    left: "94%",
    delay: "-13s",
    duration: "26s",
    drift: "-9rem",
    size: "0.66rem",
    rotate: "-300deg",
  },
];

export default function Home() {
  const [showMore, setShowMore] = useState(false);

  const shortBio =
    "Tôi là Web Developer, tập trung vào giao diện responsive, backend rõ ràng và trải nghiệm sử dụng mượt trên mọi thiết bị.";

  const fullBio =
    "Tôi là Web Developer với nền tảng Java, thích xây dựng sản phẩm gọn, dễ dùng và có cấu trúc rõ ràng. Tôi quan tâm đến cả phần giao diện lẫn backend, luôn học thêm công nghệ mới để cải thiện chất lượng sản phẩm. Ngoài code, tôi thích game, thể thao và du lịch. Nếu bạn muốn kết nối hoặc trao đổi về công nghệ, hãy liên hệ qua các kênh bên dưới.";

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Đã copy ${label}`, {
        description: text,
      });
    } catch {
      toast.error("Không thể copy", {
        description: "Vui lòng thử lại.",
      });
    }
  };

  return (
    <main className="portfolio-page relative isolate min-h-dvh overflow-hidden bg-[#f4fbff] text-slate-950">
      <Toaster closeButton position="top-right" richColors />
      <SoftWebScene />
      <div className="sakura-layer" aria-hidden="true">
        {sakuraPetals.map((petal, index) => (
          <span
            key={`${petal.left}-${index}`}
            className="sakura-petal"
            style={
              {
                "--petal-delay": petal.delay,
                "--petal-drift": petal.drift,
                "--petal-duration": petal.duration,
                "--petal-left": petal.left,
                "--petal-rotate": petal.rotate,
                "--petal-size": petal.size,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <header className="site-nav reveal-up">
          <a className="site-brand" href="#top" aria-label="Lê Minh Tuyên">
            <span className="brand-mark" aria-hidden="true">
              <Image
                src="/assets/wanko-header-avatar.png"
                alt=""
                fill
                sizes="40px"
                className="brand-mark-image"
              />
            </span>
            <span>Lê Minh Tuyên</span>
          </a>
          <nav className="site-links" aria-label="Liên kết nhanh">
            <a href="#connect">Kết nối</a>
            <a
              href="https://github.com/LeMinhTuyen31102003"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </nav>
        </header>

        <section
          id="top"
          className="grid flex-1 items-center gap-7 py-8 md:py-10 lg:grid-cols-[1.08fr_0.92fr] lg:py-12"
        >
          <div className="hero-copy reveal-up">
            <p className="section-kicker">Web developer portfolio</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-none text-slate-950 sm:text-6xl lg:text-7xl">
              Lê Minh Tuyên
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              {showMore ? fullBio : shortBio}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowMore((value) => !value)}
                className="primary-action group"
              >
                <span>{showMore ? "Rút gọn profile" : "Đọc thêm profile"}</span>
                <span className="action-dot" aria-hidden="true">
                  {showMore ? "−" : "+"}
                </span>
              </button>
              <a
                href="https://github.com/LeMinhTuyen31102003"
                target="_blank"
                rel="noreferrer"
                className="secondary-action group"
              >
                <span>Xem GitHub</span>
                <span className="action-dot" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {profileStats.map((item) => (
                <div key={item.label} className="profile-stat">
                  <p className="text-sm font-medium text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-950">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="profile-visual reveal-up">
            <div className="avatar-button">
              <ChibiDeveloperAvatar />
            </div>
            <div className="visual-caption">
              <p className="text-sm font-semibold text-slate-950">
                Java / Web Developer
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Clean UI, responsive flow, practical backend.
              </p>
            </div>
          </aside>
        </section>

        <section
          className="grid gap-5 pb-10 lg:grid-cols-[1fr_0.82fr]"
          id="connect"
        >
          <div className="soft-section reveal-up">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Connect</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">
                  Mạng xã hội
                </h2>
              </div>
              <span className="soft-count">{socialLinks.length} kênh</span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {socialLinks.map((link) => (
                <article key={link.name} className="link-card group">
                  <button
                    type="button"
                    onClick={() => handleCopy(link.copyText, link.name)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <span className="app-icon relative h-12 w-12 shrink-0 overflow-hidden">
                      <Image
                        src={link.iconSrc}
                        alt={`${link.name} app logo`}
                        fill
                        sizes="48px"
                        loading="eager"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-slate-950">
                        {link.name}
                      </span>
                      <span className="mt-1 block truncate text-sm text-slate-500">
                        {link.handle}
                      </span>
                    </span>
                  </button>

                  <div className="flex shrink-0 gap-2">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="micro-button"
                    >
                      Open
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(link.copyText, link.name)}
                      className="micro-button"
                      aria-label={`Copy ${link.name}`}
                    >
                      Copy
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <section className="soft-section reveal-up">
              <div className="section-heading">
                <div>
                  <p className="section-kicker">Stack</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                    Kỹ năng
                  </h2>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {skillTags.map((skill) => (
                  <span key={skill} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="soft-section reveal-up">
              <div className="section-heading">
                <div>
                  <p className="section-kicker">Game</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                    Tốc Chiến
                  </h2>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {gameLinks.map((game) => (
                  <article key={game.name} className="link-card group">
                    <button
                      type="button"
                      onClick={() => handleCopy(game.copyText, game.name)}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    >
                      <span className="app-icon relative h-14 w-14 shrink-0 overflow-hidden">
                        <Image
                          src={game.iconSrc}
                          alt={`${game.name} logo`}
                          fill
                          sizes="56px"
                          loading="eager"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block break-words text-sm font-semibold text-slate-950">
                          {game.name}
                        </span>
                        <span className="mt-1 block break-words text-sm leading-6 text-slate-500">
                          {game.handle}
                        </span>
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopy(game.copyText, game.name)}
                      className="micro-button shrink-0"
                      aria-label={`Copy ${game.name}`}
                    >
                      Copy
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
