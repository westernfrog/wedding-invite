const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const meta = (key, name, content) => ({ tag: 'meta', attrs: { [key]: name, content }, injectTo: 'head' });

/** Adds the title, description, link-preview (Open Graph / Twitter) and Event structured-data tags to index.html. */
export default function seo({ details: d, siteUrl }) {
  const site = siteUrl.replace(/\/+$/, '');
  const image = `${site}/og-image.jpg`;
  const title = `${d.groom} weds ${d.bride} · Wedding Invitation`;
  const [locality, region] = d.place.split('·').map((s) => s.trim());
  const where = [d.venue, locality, region].filter(Boolean).join(', ');
  const when = `${d.weekday}, ${d.day} ${d.month} ${d.year}`;
  const description = `With joy, we invite you to celebrate the wedding of ${d.groom} and ${d.bride} on ${when} at ${where}.`;
  const month = MONTHS.indexOf(d.month) + 1;

  const event = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${d.groom} weds ${d.bride}`,
    description,
    ...(month && { startDate: `${d.year}-${String(month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}` }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: d.venue,
      address: { '@type': 'PostalAddress', addressLocality: locality, ...(region && { addressRegion: region }), addressCountry: 'IN' },
    },
    image,
    url: `${site}/`,
  };

  return {
    name: 'seo',
    transformIndexHtml: () => [
      { tag: 'title', children: title, injectTo: 'head' },
      meta('name', 'description', description),
      { tag: 'link', attrs: { rel: 'canonical', href: `${site}/` }, injectTo: 'head' },
      meta('property', 'og:type', 'website'),
      meta('property', 'og:locale', 'en_IN'),
      meta('property', 'og:site_name', `${d.groom} weds ${d.bride}`),
      meta('property', 'og:title', title),
      // Chat apps cut this short, so it leads with the date and the place.
      meta('property', 'og:description', `${when} · ${where}`),
      meta('property', 'og:url', `${site}/`),
      meta('property', 'og:image', image),
      meta('property', 'og:image:type', 'image/jpeg'),
      meta('property', 'og:image:width', '1200'),
      meta('property', 'og:image:height', '630'),
      meta('property', 'og:image:alt', `Wedding invitation: ${d.groom} weds ${d.bride}, ${when}, ${where}`),
      meta('name', 'twitter:card', 'summary_large_image'),
      { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(event).replace(/</g, '\\u003c'), injectTo: 'head' },
    ],
  };
}
