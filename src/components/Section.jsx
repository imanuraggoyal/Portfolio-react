import Reveal from './Reveal';

export default function Section({
  id,
  title,
  subtitle,
  children,
  badge,
  className = '',
  containerClassName = '',
  centered = false,
}) {
  return (
    <section
      id={id}
      className={`relative py-20 md:py-28 overflow-hidden transition-colors duration-300 ${className}`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}
      >
        {(title || subtitle || badge) && (
          <Reveal
            direction="up"
            className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}
          >
            {badge && (
              <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase rounded-full bg-accent-subtle text-accent border border-accent/20">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-light dark:text-text-dark tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={`mt-4 text-base sm:text-lg text-text-light-muted dark:text-text-dark-muted max-w-2xl leading-relaxed ${
                  centered ? 'mx-auto' : ''
                }`}
              >
                {subtitle}
              </p>
            )}
            <div
              className={`mt-4 h-1 w-16 bg-accent-gradient rounded-full ${
                centered ? 'mx-auto' : ''
              }`}
            />
          </Reveal>
        )}

        {children}
      </div>
    </section>
  );
}
