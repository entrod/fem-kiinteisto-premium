import FadeIn from "./FadeIn";

const Problem = () => {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">Problemet</p>
        </FadeIn>
        <FadeIn delay={100}>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mb-8">
            Taloyhtiön förvaltning behöver inte vara krångligt.
          </h2>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Långsam respons, otydlig prissättning och bristande transparens. Det är vardagen
            för många husbolag idag. FEM erbjuder det moderna alternativet — med tydlighet,
            snabbhet och digital service i fokus.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default Problem;
