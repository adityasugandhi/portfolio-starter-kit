import React from 'react';

const Skills: React.FC = () => {
    const skills = {
        Programming: ['JavaScript', 'TypeScript', 'Python', 'C++','Java','rust'],
        Cloud: ['AWS', 'Azure', 'Google Cloud'],
        Software: ['React', 'Node.js', 'Docker'],
        Design: ['Figma', 'Sketch', 'Adobe XD'],
    };

    return (
        <div className='container mx-auto'>
            <h1 className="text-2xl font-bold mb-4">Skills</h1>
        <div className="container mx-auto px-4 grid grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, skillsList]) => (
                <div key={category}>
                    <h2 className="text-xl font-semibold mb-2">{category}</h2>
                    <p>{skillsList.join(', ')}</p>
                </div>
            ))}
        </div>
        </div>
    );
};

export default Skills;
