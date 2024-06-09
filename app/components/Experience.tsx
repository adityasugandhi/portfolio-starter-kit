import React from 'react';
import { FaCheckCircle, FaStar, IconType } from 'react-icons/fa';
import info from '@data/Info.json';

interface Experience {
  company: string;
  position: string;
  dates: string;
  duration: string;
  location: string;
  employmentType: string;
  icon: IconType;
  verified: boolean;
  highlighted?: boolean;
}

const iconMap: { [key: string]: IconType } = {
  FaCheckCircle: FaCheckCircle,
  FaStar: FaStar
};

const ExperienceItem: React.FC<Experience> = ({ company, position, dates, duration, location, employmentType, icon: Icon, verified, highlighted }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-1">
        <Icon className="w-6 h-6 mr-2" />
        <h3 className="text-lg font-medium">{company}</h3>
      </div>
      <div className="flex items-center mb-1">
        <h4 className="text-md font-semibold">{position}</h4>
        {verified && <FaCheckCircle className="ml-2 text-green-500" />}
        {highlighted && <FaStar className="ml-2 text-orange-500" />}
      </div>
      <p className="text-sm text-gray-600">{dates} {duration} • {location} • {employmentType}</p>
    </div>
  );
};

const ExperienceList: React.FC = () => {
  const experiences = Object.values(info).map((exp, index) => ({
    ...exp,
    icon: iconMap[exp.icon as string]
  }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Experience</h2>
      {experiences.map((exp, index) => (
        <ExperienceItem key={index} {...exp} />
      ))}
    </div>
  );
};

export default ExperienceList;
