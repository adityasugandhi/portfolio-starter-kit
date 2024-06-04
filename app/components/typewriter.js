'use client'
import React, { useState, useEffect } from 'react';

const Typewriter = ({ texts, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLooping, setIsLooping] = useState(false);

  useEffect(() => {
    const textArray = Array.isArray(texts) ? texts : [texts]; // Convert single string to array if needed

    const currentString = textArray[currentIndex % textArray.length];

    if (currentIndex < currentString.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + currentString[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      if (textArray.length > 1) {
        // Move to the next string in the array
        setCurrentIndex(prevIndex => prevIndex + 1);
        setCurrentText(''); // Reset the current text
      } else {
        setIsLooping(false); // Stop looping if single string
      }
    }
  }, [currentIndex, delay, texts]);

  useEffect(() => {
    if (Array.isArray(texts) && !isLooping) {
      setIsLooping(true);
      setCurrentIndex(0); // Reset index when looping starts
    }
  }, [texts, isLooping]);

  return <span className='transition-opacity duration-500 ease-in-out opacity-100'>{currentText}</span>;
};

export default Typewriter;
