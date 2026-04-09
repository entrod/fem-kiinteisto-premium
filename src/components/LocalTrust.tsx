import FadeIn from "./FadeIn";

const LocalTrust = () => {
  return (
    <section className="section-padding">
      <div className="container-narrow text-center max-w-2xl">
        <FadeIn>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">Lokalt förankrad</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Verksamma i Jakobstad med omnejd.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Vi betjänar husbolag på svenska och finska i Jakobstadsregionen.
            Närhet, tillgänglighet och personlig service — det är grunden i allt vi gör.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default LocalTrust;
