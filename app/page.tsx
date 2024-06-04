import { BlogPosts } from 'app/components/posts'
// import { mistral} from '../node_modules/@ai-sdk';
import ChatInput from './components/Chatbox'
import Typewriter from "./components/typewriter";
import Skills from './components/skills'
import { generateText } from 'ai';
import { readStreamableValue } from 'ai/rsc';
import { Message, continueConversation } from './components/actions';

// const { text } = await generateText({
//   model: mistral('mistral-large-latest'),
//   prompt: 'Write a vegetarian lasagna recipe for 4 people.',
// });

const headlines = ['Software Engineer', 'Researcher', 'Data Scientist', 'Full Stack Developer']
export default function Page() {
  return (
    <section>
      <div className='flex justify-between'>
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter mr-auto">
          Aditya Sugandhi
        </h1>
        <h1 className="ml-auto">
          <Typewriter texts={headlines} delay={250}/>
        </h1>
      </div>
      <p className="mb-4">
        {`I'm a  and tab advocate, finding unmatched efficiency in
        Vim's keystroke commands and tabs' flexibility for personal viewing
        preferences. This extends to my support for static typing, where its
        early error detection ensures cleaner code, and my preference for dark
        mode, which eases long coding sessions by reducing eye strain.`}
      </p>
      <div className="my-8">
        <BlogPosts />
        <Skills />
      </div>



      

      <ChatInput/>



    </section>
  )
}
