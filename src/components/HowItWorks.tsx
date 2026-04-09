import FadeIn from "./FadeIn";

const steps = [
  { number: "01", title: "Kontakt", description: "Berätta om ert husbolag och era behov." },
  { number: "02", title: "Offert", description: "Vi skräddarsyr ett förslag med tydlig prissättning." },
  { number: "03", title: "Start", description: "Vi tar hand om allt — snabbt och smidigt." },
];

const HowItWorks = () => {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">Så fungerar det</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-16">
            Tre enkla steg.
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 150}>
              <div>
                <span className="font-display text-5xl font-bold text-primary/20">{step.number}</span>
                <h3 className="font-display text-xl font-semibold mt-4 mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
