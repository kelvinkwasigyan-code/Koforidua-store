import { NextResponse } from 'next/server';

export interface AppleNewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
  badge: string;
  badgeBg: string;
  gradient: string;
  orbColor: string;
}

export async function GET() {
  try {
    // Fetch live official Apple Newsroom RSS feed
    const res = await fetch('https://www.apple.com/newsroom/rss-feed.rss', {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch Apple Newsroom RSS: ${res.status}`);
    }

    const xmlText = await res.text();

    // Parse RSS/Atom items using Regex for zero dependencies
    const itemMatches = xmlText.match(/<(?:entry|item)>[\s\S]*?<\/(?:entry|item)>/gi) || [];
    
    const parsedNews: AppleNewsItem[] = itemMatches.slice(0, 5).map((itemXml, idx) => {
      const titleMatch = itemXml.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
      const linkMatch = itemXml.match(/<link[^>]*href="([^"]+)"(?:[^>]*rel="alternate")?[^>]*>/i) || itemXml.match(/<link[^>]*href="([^"]+)"/i) || itemXml.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);
      const descMatch = itemXml.match(/<(?:content|description)>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/(?:content|description)>/i);
      const pubDateMatch = itemXml.match(/<(?:updated|pubDate)>([\s\S]*?)<\/(?:updated|pubDate)>/i);

      let title = titleMatch ? titleMatch[1].trim() : 'Latest Apple News';
      let link = linkMatch ? linkMatch[1].trim() : 'https://www.apple.com/newsroom/';
      let description = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : 'Discover the latest official announcements and product releases directly from Apple.';
      let pubDate = pubDateMatch ? new Date(pubDateMatch[1].trim()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Live Update';

      // Assign sleek visual gradients & badges based on index
      const gradients = [
        'from-slate-950 via-slate-900 to-red-950',
        'from-slate-950 via-gray-900 to-indigo-950',
        'from-slate-950 via-slate-900 to-rose-950',
        'from-slate-950 via-gray-900 to-emerald-950',
        'from-slate-950 via-slate-900 to-amber-950',
      ];

      const badgeBgs = [
        'bg-red-600/90',
        'bg-indigo-600/90',
        'bg-rose-600/90',
        'bg-emerald-600/90',
        'bg-amber-600/90',
      ];

      const orbColors = [
        'bg-red-600/20',
        'bg-indigo-600/20',
        'bg-rose-600/20',
        'bg-emerald-600/20',
        'bg-amber-600/20',
      ];

      return {
        title,
        link,
        description,
        pubDate,
        source: 'Official Apple Newsroom',
        badge: ` APPLE NEWSROOM • ${pubDate.toUpperCase()}`,
        badgeBg: badgeBgs[idx % badgeBgs.length],
        gradient: gradients[idx % gradients.length],
        orbColor: orbColors[idx % orbColors.length],
      };
    });

    if (parsedNews.length > 0) {
      return NextResponse.json({ news: parsedNews, live: true });
    }

    throw new Error('No items parsed');
  } catch (err) {
    console.warn('Falling back to curated Apple news:', err);
    
    // Fallback curated live Apple news items
    const fallbackNews: AppleNewsItem[] = [
      {
        title: 'Apple introduces iPhone 16 Pro and iPhone 16 Pro Max',
        link: 'https://www.apple.com/newsroom/',
        pubDate: 'Latest Release',
        description: 'Powered by the A18 Pro chip and featuring Camera Control, 48MP Fusion camera system, and a huge leap in battery life.',
        source: 'Official Apple Newsroom',
        badge: ' APPLE NEWSROOM • LATEST RELEASE',
        badgeBg: 'bg-red-600/90',
        gradient: 'from-slate-950 via-slate-900 to-red-950',
        orbColor: 'bg-red-600/20',
      },
      {
        title: 'Apple Watch Ultra 2 now available in Black Titanium',
        link: 'https://www.apple.com/newsroom/',
        pubDate: 'Official News',
        description: 'The ultimate sports and adventure watch features precision dual-frequency GPS, up to 36 hours battery life, and 3000 nits display.',
        source: 'Official Apple Newsroom',
        badge: ' APPLE NEWSROOM • WEARABLE TECH',
        badgeBg: 'bg-indigo-600/90',
        gradient: 'from-slate-950 via-gray-900 to-indigo-950',
        orbColor: 'bg-indigo-600/20',
      },
      {
        title: 'Apple Intelligence features expand across iOS & macOS',
        link: 'https://www.apple.com/newsroom/',
        pubDate: 'Press Release',
        description: 'Personal intelligence system that combines generative AI models with personal context to deliver useful, relevant assistance.',
        source: 'Official Apple Newsroom',
        badge: ' APPLE NEWSROOM • PRESS RELEASE',
        badgeBg: 'bg-rose-600/90',
        gradient: 'from-slate-950 via-slate-900 to-rose-950',
        orbColor: 'bg-rose-600/20',
      },
    ];

    return NextResponse.json({ news: fallbackNews, live: false });
  }
}
