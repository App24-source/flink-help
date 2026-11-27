import Link from 'next/link';
export function normalizeInternalHref(href) {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const match=href.match(/^([^?#]*)(.*)$/);
  const path=match[1], suffix=match[2];
  if(path.startsWith('/.well-known/') || /\.[^/]+$/.test(path)) return href;
  return (path.endsWith('/')?path:path+'/')+suffix;
}
export default function SiteLink({href,children,...props}) {
  if(typeof href!=='string') throw new Error('SiteLink requires a string href');
  if(/^(https?:\/\/|\/\/)/i.test(href)) return <a {...props} href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
  return <Link {...props} href={normalizeInternalHref(href)}>{children}</Link>;
}
