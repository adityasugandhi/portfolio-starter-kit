import React from 'react';
import Image from 'next/image'
import educationpng from '@icons/education.png'
interface EducationItemProps {
  degree: string;
  institution: string;
  location: string;
  duration: string;
}

const EducationItem: React.FC<EducationItemProps> = ({ degree, institution, location, duration }) => {
  return (
    <div className="education-item mb-6">
      <div className="education-details p-3 rounded-lg">
        <h3 className="text-xl font-medium mb-2">{degree}</h3>
        <p className="institution  transition duration-300 ease-in-out hover:text-black text-gray-400 font-semibold">{institution}</p>
        <p className="location text-gray-500 text-sm">{location}</p>
        <p className="duration text-gray-500 text-sm">{duration}</p>
      </div>
    </div>
  );
};

const Education: React.FC = () => {
  const educationData = [
    {
      degree: 'Master of Science in Computer Science',
      institution: 'Florida State University',
      location: 'Tallahassee, FL, USA',
      duration: 'Aug 2022 - May 2024',
    },
    {
      degree: 'Bachelor of Technology in Computer Science ',
      institution: 'SRM  Institute of Science and Technology',
      location: 'Chennai, India',
      duration: 'Aug 2016 - May 2020',
    },
  ];

  return (
    <div className="education my-10 dark:text-white text-black">
      <h2 className="flex text-2xl font-semibold border-b-2 border-white-700 pb-2 mb-6">

      <span className="text-2xl font-bold">Education</span>
      <Image src={educationpng} width={35} height={35} alt="Experience icon" className="ml-2" />
      </h2>
      {educationData.map((item, index) => (
        <EducationItem
          key={index}
          degree={item.degree}
          institution={item.institution}
          location={item.location}
          duration={item.duration}
        />
      ))}
    </div>
  );
};

export default Education;
