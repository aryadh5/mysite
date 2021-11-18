import Layout from '../../components/Layout';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { ProjectInfo } from '@types';
import React from 'react';
import Link from 'next/link';
import { getEntriesOfType, ContentfulEntryType } from '@services/contentful';

type ShowcasePageProps = {
  projects: ProjectInfo[];
};

export default function ProjectShowcase({ projects }: ShowcasePageProps) {
  return (
    <Layout description="List of my projects">
      <Head>
        <title>Project Showcase</title>
      </Head>
      <article>
        <h1 className="text-4xl font-semibold mb-6">Projects</h1>
        <ul className="list-none">
          {projects.map(({ projectTitle, slug, publishDate, shortSummary }) => (
            <li className="p-4 mb-4 rounded-lg bg-blue-800 text-white" key={slug}>
              <Link href={`/portfolio/${slug}`}>
                <a className="text-xl mb-2 block text-white">{projectTitle}</a>
              </Link>
              <p className="text-sm">{shortSummary}</p>
            </li>
          ))}
        </ul>
      </article>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projectContentfulData = await getEntriesOfType(ContentfulEntryType.PROJECT);
  const projects = projectContentfulData.items.map((item) => item.fields);
  return {
    props: {
      projects,
    },
  };
};
