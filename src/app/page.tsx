import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import WorkList from '@/components/WorkList';
import GithubRepos from '@/components/GithubRepos';
import Contact from '@/components/Contact';
import PageWrapper from '@/components/PageWrapper';

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <About />
      <Experience />
      <WorkList />
      <GithubRepos />
      <Contact />
    </PageWrapper>
  );
}
