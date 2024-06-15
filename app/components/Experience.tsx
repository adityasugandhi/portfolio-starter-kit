import React from 'react';
import { FaCheckCircle, FaStar} from 'react-icons/fa';
import { IconType } from 'react-icons';
import info from '@data/Info.json';
import Experience from "@icons/Experience.png"
import Image from 'next/image';
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
// function to get the duration
function getDuration(dateString: string) {
    const startDateParts = dateString.split(" - ")[0].split(" ");
    const endDateParts = dateString.split(" - ")[1].split(" ");
  
    const startDate = new Date(`${startDateParts[0]} 1, ${startDateParts[1]}`);
    let endDate;
    if (endDateParts.length === 2) {
      endDate = new Date(`${endDateParts[0]} 1, ${endDateParts[1]}`);
    } else {
      endDate = new Date();
    }
  
    const difference = endDate.getTime() - startDate.getTime();
    const months = Math.floor(difference / (1000 * 3600 * 24 * 30));
    const years = Math.floor(months / 12);
  
    return `${years} yr ${months % 12} mon`;
  }
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
      <p className="text-sm text-gray-600">{dates} {getDuration(dates)} • {location} • {employmentType}</p>
    </div>
  );
};

const ExperienceList: React.FC = () => {
  const experiences = Object.values(info).map((exp, index) => ({
    ...exp,
    icon: iconMap[exp.icon as string]
  }));

  return (
    <div className="p-2">
<h2 className="flex items-center mb-4">

  <span className="text-2xl font-bold">Experience</span>
  <Image src={Experience} width={35} height={35} alt="Experience icon" className="ml-" />
</h2>

      {experiences.map((exp, index) => (
        <ExperienceItem key={index} {...exp} />
      ))}
    </div>
  );
};

export default ExperienceList;
