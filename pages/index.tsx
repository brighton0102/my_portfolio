import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import About from '../components/About';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import ContactMe from '../components/ContactMe';
import WorkExperience from '../components/WorkExperience';
import Link from 'next/link';
import { Experience, PageInfo, Project, Skill, Social } from '../typings'
import { fetchSocial } from '../utils/fetchSocials';
import { fetchSkills } from '../utils/fetchSkills';
import { fetchProjects } from '../utils/fetchProjects';
import { fetchPageInfo } from '../utils/fetchPageInfo';
import { fetchExperiences } from '../utils/fetchExperiences';
import Image from 'next/image';

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  socials: Social[];
};


const Home = ({ pageInfo, experiences, projects, skills, socials }: Props) => {

  return (
    <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory
    overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-tracking-gray-400/20 scrollbar-thumb-[#F7AB0A]/80">
      <Head>
        <title>{pageInfo?.name} - portfolio</title>
        
      </Head>

      
      <Header socials={socials}/>

      <section id="hero" className="snap-start">
        < Hero pageInfo={pageInfo} />
      </section>

      <section id='about' className='snap-center'>
        <About pageInfo={ pageInfo }/>
      </section>
      
      <section id='experience' className='snap-center'>
        <WorkExperience experiences={experiences} />
      </section>
      
      <section id='skills' className='snap-start'>
        <Skills skills={skills}/>
      </section>

      <section id='projects' className='snap-start'>
        <Projects projects={projects} />
      </section>

      <section id='contact' className='snap-start'>
        <ContactMe />
      </section>

      <Link href='#hero'>
        <footer className='sticky bottom-5 w-full cursor-pointer'>
          <div className="flex items-center justify-center">
            <Image
            className="h-10 w-10 rounded-full filter grayscale hover:grayscale-0 cursor-pointer"
            src='https://i.imgur.com/e2yvD6A.png'
            alt='contact'
            width={10}
            height={10}
            />
          </div>
        </footer>
      </Link>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await fetchPageInfo();
  const experiences: Experience[] = await fetchExperiences();
  const skills: Skill[] = await fetchSkills();
  const projects: Project[] = await fetchProjects();
  const socials: Social[] = await fetchSocial();

  return {
    props: {
      pageInfo,
      experiences,
      skills,
      projects,
      socials,
    },

    revalidate: 10,
  };
  
};

