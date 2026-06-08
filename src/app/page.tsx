"use client";

import {
  faHeart,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "sonner";

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

const aatroxImageUrl =
  "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg";

export default function Home() {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const shortBio =
    "Tôi là 1 Java Developer. Tôi đam mê công nghệ, thích khám phá và luôn sẵn sàng học hỏi.";

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
    <main className="relative min-h-dvh overflow-x-hidden bg-[#f8f1eb] text-stone-900">
      <Toaster closeButton position="top-right" richColors />
      <div className="animated-bg pointer-events-none fixed inset-0 overflow-hidden">
        <span className="bg-orb bg-orb-1" />
        <span className="bg-orb bg-orb-2" />
        <span className="bg-orb bg-orb-3" />
        <span className="bg-grid" />
      </div>

      <div className="relative mx-auto flex min-h-dvh w-full max-w-5xl items-start justify-center px-3 py-4 sm:px-6 sm:py-8 md:items-center lg:px-8 lg:py-10">
        <section className="w-full max-w-[420px] rounded-[1.5rem] border border-white/70 bg-white/75 p-3 shadow-[0_24px_90px_rgba(107,64,27,0.18)] backdrop-blur-xl sm:max-w-2xl sm:rounded-[2rem] sm:p-5 md:p-7">
          <div className="rounded-[1.25rem] border border-stone-200/70 bg-gradient-to-br from-white via-[#fffaf4] to-[#fef2e2] p-4 sm:rounded-[1.75rem] sm:p-5 md:p-7">
            <div className="flex flex-col gap-4">
              <div className="flex min-w-0 items-center gap-4 sm:gap-6">
                <button
                  type="button"
                  onClick={() => setIsAvatarOpen(true)}
                  className="relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-full border-4 border-white shadow-[0_20px_50px_rgba(70,42,16,0.18)] transition hover:scale-[1.02] hover:shadow-[0_24px_60px_rgba(70,42,16,0.24)] sm:h-24 sm:w-24 md:h-28 md:w-28"
                  aria-label="Open Aatrox image"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 via-rose-100 to-sky-100 blur-2xl opacity-70" />
                  <Image
                    src={aatroxImageUrl}
                    alt="Aatrox from League of Legends"
                    fill
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, 112px"
                    className="relative object-cover object-center"
                  />
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <h1 className="break-words text-xl font-semibold leading-tight tracking-tight text-stone-950 min-[380px]:text-2xl sm:text-3xl">
                      Lê Minh Tuyên
                    </h1>
                  </div>
                  <p className="mt-1 break-words text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-stone-500 sm:text-xs sm:tracking-[0.28em]">
                    Personal profile
                  </p>
                </div>
              </div>

              {/* Desktop / tablet: show full bio */}
              <p className="mt-3 hidden max-w-xl break-words text-sm leading-6 text-stone-700 sm:block md:text-lg">
                Tôi là 1 Java Developer. Tôi đam mê công nghệ, thích khám phá
                những điều mới mẻ và luôn sẵn sàng học hỏi để phát triển bản
                thân. Tôi cũng rất yêu thích game, thể thao và du lịch, đặc biệt
                là những chuyến đi đến những nơi có cảnh đẹp và văn hóa độc đáo.
                Tôi tin rằng cuộc sống là một hành trình đầy màu sắc và tôi luôn
                cố gắng tận hưởng từng khoảnh khắc của nó. Nếu bạn muốn kết nối
                hoặc trò chuyện về công nghệ, game, thể thao hoặc du lịch, đừng
                ngần ngại liên hệ với tôi qua các mạng xã hội bên dưới!
              </p>

              {/* Mobile: short bio with toggle */}
              <div className="mt-3 block sm:hidden">
                <p className="max-w-xl break-words text-sm leading-6 text-stone-700">
                  {showMore
                    ? "Tôi là 1 Java Developer. Tôi đam mê công nghệ, thích khám phá những điều mới mẻ và luôn sẵn sàng học hỏi để phát triển bản thân. Tôi cũng rất yêu thích game, thể thao và du lịch, đặc biệt là những chuyến đi đến những nơi có cảnh đẹp và văn hóa độc đáo. Tôi tin rằng cuộc sống là một hành trình đầy màu sắc và tôi luôn cố gắng tận hưởng từng khoảnh khắc của nó. Nếu bạn muốn kết nối hoặc trò chuyện về công nghệ, game, thể thao hoặc du lịch, đừng ngần ngại liên hệ với tôi qua các mạng xã hội bên dưới!"
                    : shortBio}
                </p>
                <button
                  type="button"
                  onClick={() => setShowMore((s) => !s)}
                  className="mt-2 text-sm font-semibold text-amber-600"
                >
                  {showMore ? "Rút gọn" : "Xem thêm"}
                </button>
              </div>

              <div className="mt-3 flex flex-wrap justify-start gap-2">
                <span className="inline-flex max-w-full flex-wrap items-center gap-2 whitespace-normal break-words rounded-2xl border border-pink-200 bg-pink-50 px-3 py-1.5 text-xs font-medium leading-5 text-pink-700 sm:rounded-full sm:text-sm">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="h-3.5 w-3.5 shrink-0 text-pink-500"
                  />
                  Lover: Đặng Bích Phượng
                </span>
                <span className="inline-flex max-w-full flex-wrap items-center gap-2 whitespace-normal break-words rounded-2xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium leading-5 text-amber-700 sm:rounded-full sm:text-sm">
                  <FontAwesomeIcon
                    icon={faGamepad}
                    className="h-3.5 w-3.5 shrink-0 text-amber-600"
                  />
                  Hobby: Chơi Game, Thể Thao, Du Lịch
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-stone-200/80 bg-white/90 p-3 sm:rounded-[1.5rem] sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="min-w-0 break-words text-sm font-semibold uppercase tracking-[0.18em] text-stone-500 sm:tracking-[0.28em]">
                    Mạng xã hội
                  </h2>
                  <span className="shrink-0 text-xs font-medium text-stone-400">
                    4 links
                  </span>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
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
                      className="group flex min-w-0 w-full cursor-pointer items-center gap-2 rounded-2xl border border-stone-200 bg-stone-50 px-3 py-3 transition hover:border-amber-200 hover:bg-white sm:gap-3 sm:px-4 sm:py-4 md:px-5 md:py-5 fancy-border"
                    >
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/70 bg-white shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition group-hover:shadow-[0_14px_28px_rgba(245,158,11,0.24)] sm:h-11 sm:w-11 sm:rounded-2xl">
                        <Image
                          src={link.iconSrc}
                          alt={`${link.name} app logo`}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
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
                        className="min-w-[3.25rem] shrink-0 cursor-pointer rounded-full border border-stone-200 bg-white px-2.5 py-1 text-xs font-semibold text-stone-700 transition hover:cursor-pointer hover:border-stone-300 hover:bg-stone-100 active:scale-95"
                        aria-label={`Copy ${link.name}`}
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-stone-200/80 bg-white/90 p-3 sm:rounded-[1.5rem] sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="min-w-0 break-words text-sm font-semibold uppercase tracking-[0.18em] text-stone-500 sm:tracking-[0.28em]">
                    Game
                  </h2>
                  <span className="shrink-0 text-xs font-medium text-stone-400">
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
                      className="group min-w-0 w-full cursor-pointer rounded-2xl border border-stone-200 bg-stone-50 px-3 py-3 transition hover:border-sky-200 hover:bg-white sm:px-4 sm:py-4 md:px-5 md:py-5 fancy-border"
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-sky-200 bg-sky-950 shadow-[0_12px_24px_rgba(2,132,199,0.18)]">
                          <Image
                            src={game.iconSrc}
                            alt={`${game.name} logo`}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </span>

                        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start">
                          <div className="min-w-0 flex-1">
                            <p className="break-words text-sm font-semibold text-stone-900">
                              {game.name}
                            </p>
                            <p className="mt-1 break-words text-sm text-stone-600 group-hover:text-stone-800">
                              {game.handle}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleCopy(game.copyText, game.name);
                            }}
                            className="min-w-[3.25rem] shrink-0 cursor-pointer self-start rounded-full border border-stone-200 bg-white px-2.5 py-1 text-xs font-semibold text-stone-700 transition hover:cursor-pointer hover:border-stone-300 hover:bg-stone-100 active:scale-95"
                            aria-label={`Copy ${game.name}`}
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>

      {isAvatarOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-6"
          onClick={() => setIsAvatarOpen(false)}
          role="presentation"
        >
          <div
            className="relative max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-stone-950 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:rounded-[2rem]"
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
