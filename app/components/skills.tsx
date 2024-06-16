'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import skillsPng from '@icons/Skills.png';

const skills = {
  Programming: ['JavaScript', 'TypeScript', 'Python', 'C++', 'Java', 'Rust'],
  Cloud: ['AWS', 'Azure', 'Google Cloud'],
  Software: ['React', 'Node.js', 'Docker'],
  Design: ['Figma', 'Sketch', 'Adobe XD'],
};

const Skills: React.FC = () => {
  const [loadedIcons, setLoadedIcons] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadIcons = async () => {
      const icons: { [key: string]: string } = {};
      for (const category in skills) {
        for (const skill of skills[category]) {
          try {
            const iconPath = `Icons/${skill.toLowerCase()}.png`;
            const icon = require(iconPath); 
            // const icon = await import(`./Icons/${skill.toLowerCase()}.png`);
            icons[skill] = icon.default;
          } catch (error) {
            icons[skill] = ''; // No icon found
          }
        }
      }
      setLoadedIcons(icons);
    };

    loadIcons();
  }, []);

  const renderSkill = (skill: string) => {
    return loadedIcons[skill] ? (
      <span key={skill} className="flex items-center mb-2">
        <img src={loadedIcons[skill]} alt={skill} className="w-6 h-6 mr-2" />
        {skill}
      </span>
    ) : (
      <span key={skill} className="mb-2">{skill}</span>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="flex items-center text-2xl sm:text-xl font-bold mb-4">
        <span>Skills</span>
        <Image src={skillsPng} width={35} height={35} alt="skills icon" className="ml-2" />
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(skills).map(([category, skillsList]) => (
          <div key={category} className="mb-4">
            <h2 className="text-xl sm:text-lg font-semibold mb-2">{category}</h2>
            <div className="flex flex-wrap">
              {skillsList.map((skill, index) => (
                <React.Fragment key={skill}>
                  {renderSkill(skill)}
                  {index < skillsList.length - 1 && <span className="mx-1">,</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
