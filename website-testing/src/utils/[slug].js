import React from 'react';
import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

const MarkdownPage = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export async function getStaticPaths() {
  const markdownDirectory = path.join(process.cwd(), 'markdown');
  const filenames = fs.readdirSync(markdownDirectory);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'markdown', `${params.slug}.md`);
  const content = fs.readFileSync(filePath, 'utf8');
  const htmlContent = md.render(content);

  return {
    props: {
      content: htmlContent,
    },
  };
}

export default MarkdownPage;
