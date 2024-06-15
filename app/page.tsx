import { BlogPosts } from '@/posts'
// import { mistral} from '../node_modules/@ai-sdk';
import ChatInput from '@/Chatbox'
import Typewriter from "@/typewriter";
import Skills from '@/skills'
import { TracingBeam } from '@/ui/tracingbeam';
import { Meteors } from '@/ui/meteors';
import { generateText } from 'ai';
import { readStreamableValue } from 'ai/rsc';
import { BackgroundBeams } from '@/ui/background-beam';
import ExperienceList from '@/Experience';
import RepositoryTable from '@/GithubTable'
import {GlobeDemo} from '@/Globe'
import Education from '@/education'
import Image from 'next/image'
import profile from '@icons/profile.png'
// import { Message, continueConversation } from '@/actions';

// const { text } = await generateText({
//   model: mistral('mistral-large-latest'),
//   prompt: 'Write a vegetarian lasagna recipe for 4 people.',
// });

const headlines = ['Software Engineer', 'Researcher', 'Data Scientist', 'Full Stack Developer']
export default function Page() {
  return (
    <div className="w-full flex  sm:px-20 justify-center">
     
      <section className="w-full max-w-screen-xl ">
       <div className='flex'>
      <TracingBeam>
          <div className='flex justify-between w-full'>
            <h1 className="flex mb-8 sm:mb-4 text-2xl font-semibold tracking-tighter mr-auto">
            <span className="text-3xl sm:text-2xl font-bold">Aditya Sugandhi</span>
            <Image src={profile} width={40} height={20} alt="profile icon" className="ml-4" />
            </h1>
            <h1 className="ml-auto">
              {/* <Typewriter texts={headlines} delay={250}/> */}
            </h1>
          </div>
          <div className='flex md:flex-row lg:flex-row xl:flex-row items-center  flex-col'>
          <p className="flex-1 justify-content">
            {`Hey there, Aditya Sugandhi a Software Engineer with 4+ years of experince in building Scalable web applicaitons`}
          </p>
          <GlobeDemo/>
          </div>
          <div className="my-8 sm:my-4">
            <ExperienceList />

            <Skills />
            <Education/>
            {/* <BlogPosts /> */}
            
          </div>
          <RepositoryTable />
          {/* <ChatInput /> */}
          </TracingBeam>
        </div>   
      </section>
      <BackgroundBeams />
     
    </div>
  )
}
