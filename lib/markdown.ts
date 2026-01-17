import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';
import type {Language} from './i18n';

const contentDirectory = path.join(process.cwd(), 'app/_content');

export interface LegalContent {
  title: string;
  lastUpdated: string;
  contentHtml: string;
}

export async function getLegalContent(slug: string, lang: Language): Promise<LegalContent> {
  const filePath = path.join(contentDirectory, `${slug}.${lang}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const {data, content} = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    title: data.title as string,
    lastUpdated: data.lastUpdated as string,
    contentHtml,
  };
}
