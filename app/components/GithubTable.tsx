'use client'
import React, { useEffect, useState } from 'react';
import { FaLink } from 'react-icons/fa'; // Import the link icon from react-icons
import { format, parseISO } from 'date-fns'; // Import date-fns for date formatting
import GitHubCalendar from '@/GithubHeatMap'
import Image from 'next/image'
import projectpng from '@icons/projects.png'
interface Repository {
  id: number;
  name: string;
  updated_at: string;
  html_url: string;
}

const columns = [
  { id: 'name', label: 'Repository Name', width: '50%' },
  { id: 'updated_at', label: 'Last Updated', width: '30%' },
  { id: 'link', label: 'Link', width: '20%' },
];

const GITHUB_TOKEN = "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";
const GITHUB_USERNAME = "adityasugandhi";

const RepositoryTable = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 5;

  useEffect(() => {
    if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
      setError('GitHub username or token is not set in environment variables');
      return;
    }

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`GitHub API returned an error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const repoData = data.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            updated_at: repo.updated_at,
            html_url: repo.html_url,
          })).sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
          setRepos(repoData);
        } else {
          throw new Error('Unexpected response format from GitHub API');
        }
      })
      .catch(error => {
        console.error('Error fetching GitHub repositories:', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(repos.length / reposPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="flex text-2xl font-bold mb-4 text-white">
      <span className="text-2xl font-bold">Projects</span>
      <Image src={projectpng} width={35} height={35} alt="Projects icon" className="ml-2" />
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full dark:bg-black bg-white border border-gray-700 table-fixed">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.id} className="px-4 py-2 text-black dark:text-white" style={{ width: column.width }}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRepos.map((repo) => (
              <tr
                key={repo.id}
                className="border-t border-gray-700 dark:hover:bg-gray-100 hover:bg-gray-500 cursor-pointer"
                onClick={() => window.open(repo.html_url, '_blank')}
              >
                <td className="px-4 py-2  text-black dark:text-white">{repo.name}</td>
                <td className="px-4 py-2 text-black dark:text-white">{format(parseISO(repo.updated_at), 'yyyy-MM-dd')}</td>
                <td className="px-4 py-2 dark:text-white text-center">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                    <FaLink />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 rounded-full bg-gray-700 text-white disabled:opacity-50"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 mx-1 rounded-full ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 rounded-full bg-gray-700 text-white disabled:opacity-50"
        >
          {/* &gt; */}
        </button>
      </div>
      {/* <GitHubCalendar username="adityasugandhi" /> */}
    </div>
  );
};

export default RepositoryTable;
