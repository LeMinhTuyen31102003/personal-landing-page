"use client";

import {
  faFacebook,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

const socialLinks = [
  {
    name: "Facebook",
    handle: "facebook.com/lmtuyen.dz",
    href: "https://www.facebook.com/lmtuyen.dz",
    icon: faFacebook,
    copyText: "https://www.facebook.com/lmtuyen.dz",
  },
  {
    name: "Zalo",
    handle: "0928755446",
    href: "https://zalo.me/0928755446",
    icon: faMessage,
    copyText: "https://zalo.me/0928755446",
  },
  {
    name: "Instagram",
    handle: "_nyut.31th10",
    href: "https://www.instagram.com/_nyut.31th10/",
    icon: faInstagram,
    copyText: "https://www.instagram.com/_nyut.31th10/",
  },
  {
    name: "GitHub",
    handle: "LeMinhTuyen31102003",
    href: "https://github.com/LeMinhTuyen31102003",
    icon: faGithub,
    copyText: "https://github.com/LeMinhTuyen31102003",
  },
];

const gameLinks = [
  {
    name: "Liên Minh: Tốc Chiến",
    handle: "Ingame / ID: 여기 뚜엔#3110",
    href: "https://wildrift.leagueoflegends.com/",
    copyText: "여기 뚜엔#3110",
  },
];

const aatroxImageUrl =
  "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg";

export default function Home() {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLabel(label);
      window.setTimeout(() => setCopiedLabel(null), 1500);
    } catch {
      setCopiedLabel(null);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8f1eb] text-stone-900">
      <div className="animated-bg absolute inset-0">
        <span className="bg-orb bg-orb-1" />
        <span className="bg-orb bg-orb-2" />
        <span className="bg-orb bg-orb-3" />
        <span className="bg-grid" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-5 py-10 sm:px-8">
        <section className="w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-[0_24px_90px_rgba(107,64,27,0.18)] backdrop-blur-xl sm:p-7">
          <div className="rounded-[1.75rem] border border-stone-200/70 bg-gradient-to-br from-white via-[#fffaf4] to-[#fef2e2] p-5 sm:p-7">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => setIsAvatarOpen(true)}
                  className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-[0_20px_50px_rgba(70,42,16,0.18)] transition hover:scale-[1.02] hover:shadow-[0_24px_60px_rgba(70,42,16,0.24)] cursor-pointer"
                  aria-label="Open Aatrox image"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 via-rose-100 to-sky-100 blur-2xl opacity-70" />
                  <Image
                    src={aatroxImageUrl}
                    alt="Aatrox from League of Legends"
                    fill
                    sizes="160px"
                    className="relative object-cover object-center"
                  />
                </button>

                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-semibold tracking-tight text-stone-950">
                      Lê Minh Tuyên
                    </h1>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone-500 mt-1">
                    Personal profile
                  </p>
                </div>
              </div>

              <p className="mt-3 max-w-xl text-base leading-7 text-stone-700 sm:text-lg">
                Tôi là 1 Java Developer. Tôi đam mê công nghệ, thích khám phá
                những điều mới mẻ và luôn sẵn sàng học hỏi để phát triển bản
                thân. Tôi cũng rất yêu thích game, thể thao và du lịch, đặc biệt
                là những chuyến đi đến những nơi có cảnh đẹp và văn hóa độc đáo.
                Tôi tin rằng cuộc sống là một hành trình đầy màu sắc và tôi luôn
                cố gắng tận hưởng từng khoảnh khắc của nó. Nếu bạn muốn kết nối
                hoặc trò chuyện về công nghệ, game, thể thao hoặc du lịch, đừng
                ngần ngại liên hệ với tôi qua các mạng xã hội bên dưới!
              </p>

              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-sm font-medium text-pink-700">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="h-3.5 w-3.5 text-pink-500"
                  />
                  Love: Đặng Bích Phượng
                </span>
                <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-sm font-medium text-stone-700">
                  Chơi Game, Thể Thao, Du Lịch
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-[1.5rem] border border-stone-200/80 bg-white/90 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
                    Mạng xã hội
                  </h2>
                  <span className="text-xs font-medium text-stone-400">
                    4 links
                  </span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {socialLinks.map((link) => (
                    <div
                      key={link.name}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleCopy(link.copyText, link.name)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleCopy(link.copyText, link.name);
                        }
                      }}
                      className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 transition hover:-translate-y-0.5 hover:border-amber-200 hover:bg-white"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-950 text-white shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition group-hover:bg-amber-500 group-hover:text-stone-950">
                        <FontAwesomeIcon icon={link.icon} className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-stone-900">
                          {link.name}
                        </p>
                        <p className="mt-1 truncate text-sm text-stone-600 group-hover:text-stone-800">
                          {link.handle}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleCopy(link.copyText, link.name);
                        }}
                        className="cursor-pointer rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:cursor-pointer hover:border-stone-300 hover:bg-stone-100 active:scale-95"
                        aria-label={`Copy ${link.name}`}
                      >
                        {copiedLabel === link.name ? "Copied" : "Copy"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-stone-200/80 bg-white/90 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
                    Game
                  </h2>
                  <span className="text-xs font-medium text-stone-400">
                    1 link
                  </span>
                </div>
                <div className="mt-4 grid gap-3">
                  {gameLinks.map((game) => (
                    <div
                      key={game.name}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleCopy(game.copyText, game.name)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleCopy(game.copyText, game.name);
                        }
                      }}
                      className="group rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-stone-900">
                            {game.name}
                          </p>
                          <p className="mt-1 text-sm text-stone-600 group-hover:text-stone-800">
                            {game.handle}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleCopy(game.copyText, game.name);
                          }}
                          className="cursor-pointer rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:cursor-pointer hover:border-stone-300 hover:bg-stone-100 active:scale-95"
                          aria-label={`Copy ${game.name}`}
                        >
                          {copiedLabel === game.name ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {copiedLabel ? (
              <p className="mt-4 text-center text-sm font-medium text-emerald-700 sm:text-left">
                Đã copy {copiedLabel}
              </p>
            ) : null}
          </div>
        </section>
      </div>

      {isAvatarOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm"
          onClick={() => setIsAvatarOpen(false)}
          role="presentation"
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-stone-950 shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsAvatarOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-stone-900 transition hover:bg-white cursor-pointer"
            >
              Đóng
            </button>
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={aatroxImageUrl}
                alt="Aatrox from League of Legends"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
