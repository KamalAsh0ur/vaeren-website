import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '../../../lib/projects';
import ProjectLayout from '../../../components/ProjectLayout';
import Cursor from '../../../components/Cursor';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  const title = `${project.client} × ${project.title} | Vaeren Studios`;
  const description = project.sections?.concept?.description || `Case study for ${project.title}`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://vaeren.vercel.app/work/${project.slug}`,
      images: [
        {
          url: project.thumbnail,
          width: 1200,
          height: 800,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.thumbnail],
    },
  };
}

export default function ProjectPage({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative w-full bg-black min-h-screen text-white">
      <Cursor />
      
      {/* Back button */}
      <div className="fixed top-8 left-4 md:left-12 z-50">
        <a href="/#work" className="type-meta uppercase tracking-widest text-[var(--color-vaeren-ash)] hover:text-white transition-colors" data-cursor-text="BACK">
          &larr; Back to Work
        </a>
      </div>

      <ProjectLayout project={project} />
      
      {/* Footer CTA */}
      <footer className="bg-black text-[var(--color-vaeren-bone)] flex flex-col justify-center p-4 md:p-12 relative z-20 overflow-hidden py-32 border-t border-white/10 mt-32">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center text-center">
          <h2 className="type-h2 uppercase leading-[1.1] mb-12 max-w-2xl tracking-tight">
            Ready to start a <br/>
            <span className="text-[var(--color-vaeren-concrete)]">collaboration?</span>
          </h2>
          <a href="/#collaboration" className="btn-primary" data-cursor-text="START">
            Start A Project <span className="arrow">&rarr;</span>
          </a>
        </div>
      </footer>
    </main>
  );
}
