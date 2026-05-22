import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site } from "../data/site";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return rss({
    title: `${site.name} blog`,
    description: `Engineering notes, product updates and field reports from ${site.name}. Travel tech, AI, SaaS and the lessons we've learnt building software for small businesses.`,
    site: context.site ?? site.url,
    items: posts
      .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.slug}/`,
        categories: [...post.data.tags],
        author: post.data.author,
      })),
    customData: `<language>en-in</language>`,
  });
}
