'use client'
import React, { useState, useEffect } from 'react';

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
            const icon = await import(`Icons/${skill}.png`);
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
      <span key={skill} className="flex items-center">
        <img src={loadedIcons[skill]} alt={skill} className="w-6 h-6 mr-2" />
        {skill}
      </span>
    ) : (
      <span key={skill}>{skill}</span>
    );
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Skills</h1>
      <div className="container mx-auto px-4 grid grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, skillsList]) => (
          <div key={category}>
            <h2 className="text-xl font-semibold mb-2">{category}</h2>
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
