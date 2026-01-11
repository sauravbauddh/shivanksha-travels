import { getSiteContent } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export const HeroSection = async () => {
  const data = await getSiteContent();
  const hero = data?.heroSection;
  const logoUrl = data?.logo;

  const bgImage = hero?.heroImage
    ? hero.heroImage
    : 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9xJWldKFNzLs2GKFXFGLSyYs1n8loyqFa0XuTNZGTxSjkaKNNhTDAt8ox_fcejIkl44qUgyWqWZbUWdD3K5OM2aL0wT-vDchW4ZkZwtMWgXbA5coio8PwIqq3KreBlUbzVaacSs1es0NF0dSwyat9EOfR2y0tuaEG4-tsfnGhH_QuuZFFyWkyg5FedNxmfVhgmV_Iq_gLbgymeH7uQxreXQn4pQtuynbQlzA940qJRdXTAxLgW2e5DE000GGguNeqbXJgthrH4dk5';

  return (
    <section className="relative w-full h-[90vh] md:h-screen pt-16 flex flex-col items-center justify-end md:justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          alt={hero?.heroTitle || 'DevBhoomi'}
          className="w-full h-full object-cover opacity-80 md:opacity-90 dark:opacity-80 dark:md:opacity-90"
          src={bgImage}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/90 md:to-transparent dark:from-black/30 dark:via-transparent dark:to-black/80 dark:md:to-transparent"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-20 md:pb-0 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-text-main dark:text-white mb-6 drop-shadow-2xl text-center">
          {hero?.heroTitle ? (
            hero.heroTitle
          ) : (
            <>
              Divine. <br className="md:hidden" />
              <span className="text-primary-dark">Unexplored.</span>
            </>
          )}
        </h1>

        <p className="text-lg md:text-2xl font-medium text-text-sub dark:text-gray-200 max-w-2xl text-center mb-10 mx-auto leading-relaxed">
          {hero?.heroSubtitle || (
            <>
              Experience the spiritual majesty of Uttarakhand.{' '}
              <br className="hidden md:block" />
              Curated journeys for the modern pilgrim.
            </>
          )}
        </p>

        {/* Logo below subtitle */}
        {logoUrl && (
          <div className="flex flex-col items-center gap-8 mb-10 animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src={logoUrl}
                alt="Logo"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
            <a href="#contact">
              <Button variant="primary" size="lg" className="shadow-xl">
                Contact Us
              </Button>
            </a>
          </div>
        )}

        {/* <div className="flex flex-col md:flex-row gap-4 justify-center w-full items-center">
          <Button variant="primary" size="xl" className="min-w-[200px]">
            Explore Packages
          </Button>

          {hero?.heroVideo ? (
            <Link href={hero.heroVideo} target="_blank">
              <Button
                variant="ghost"
                className="text-white hover:text-primary text-base font-semibold group"
              >
                Watch the Film
                <Icon
                  name="play_circle"
                  size={24}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
          ) : (
            <Button
              variant="ghost"
              className="text-white hover:text-primary text-base font-semibold group"
            >
              Watch the Film
              <Icon
                name="play_circle"
                size={24}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          )}
        </div> */}
      </div>
    </section>
  );
};
