import React, { useState } from 'react';
import Footer from '../../components/Footer';
import SharedNavbar from '../../components/Layout/SharedNavbar';
import Reveal from '../../components/Reveal';

const jobData = [
  {
    id: 1,
    title: 'Senior Architect',
    company: 'Design Studio A',
    location: 'New York, NY',
    salary: '$80k - $120k',
    type: 'Full-time',
    posted: '2 days ago',
    description: 'Lead architectural design projects from concept to completion. Collaborate with cross-functional teams and mentor junior architects.',
  },
  {
    id: 2,
    title: 'Junior Designer',
    company: 'Architecture Firm B',
    location: 'Los Angeles, CA',
    salary: '$45k - $65k',
    type: 'Full-time',
    posted: '5 days ago',
    description: 'Support senior architects in design development, create technical drawings, and assist in project coordination.',
  },
  {
    id: 3,
    title: 'Project Manager',
    company: 'Construction Co. C',
    location: 'Chicago, IL',
    salary: '$70k - $90k',
    type: 'Contract',
    posted: '1 week ago',
    description: 'Manage construction projects from planning to execution. Coordinate with architects, contractors, and clients.',
  },
  {
    id: 4,
    title: 'Interior Designer',
    company: 'Creative Interiors',
    location: 'Miami, FL',
    salary: '$50k - $70k',
    type: 'Full-time',
    posted: '3 days ago',
    description: 'Create functional and aesthetically pleasing interior spaces for residential and commercial projects.',
  },
  {
    id: 5,
    title: 'Urban Planner',
    company: 'City Planning Dept',
    location: 'Seattle, WA',
    salary: '$60k - $85k',
    type: 'Full-time',
    posted: '4 days ago',
    description: 'Develop comprehensive plans and programs for land use in urban areas. Analyze demographic and economic data.',
  },
  {
    id: 6,
    title: 'Freelance Architect',
    company: 'Various Clients',
    location: 'Remote',
    salary: '$40 - $80/hour',
    type: 'Freelance',
    posted: '6 days ago',
    description: 'Work on diverse architectural projects remotely. Must have strong portfolio and communication skills.',
  },
];

const locations = [
  'All Locations',
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Miami, FL',
  'Seattle, WA',
  'Remote',
];

const types = [
  'All Types',
  'Full-time',
  'Contract',
  'Freelance',
];

const JobPage = () => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');

  const filteredJobs = jobData.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesLocation =
      !location || location === 'All Locations' || job.location === location;
    const matchesType =
      !type || type === 'All Types' || job.type === type;
    return matchesSearch && matchesLocation && matchesType;
  });

  const handleClearFilters = () => {
    setSearch('');
    setLocation('');
    setType('');
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <SharedNavbar />

    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Reveal as="h1" delay={0} className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Job Opportunities</Reveal>
        <p className="text-lg text-gray-700 font-semibold">
          Find your next career opportunity in architecture and design
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              placeholder="Search jobs or companies..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={location}
            onChange={e => setLocation(e.target.value)}
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <select
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            {types.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">
            Showing {filteredJobs.length} of {jobData.length} jobs
          </p>
          <button
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.map(job => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h2 className="text-xl font-extrabold text-gray-900 mr-3">{job.title}</h2>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    job.type === 'Full-time'
                      ? 'bg-green-100 text-green-800'
                      : job.type === 'Contract'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {job.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-2 font-semibold">{job.company}</p>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="flex items-center mr-4">
                    {/* Location Icon */}
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {job.location}
                  </span>
                  <span className="flex items-center mr-4">
                    {/* Salary Icon */}
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                    {job.salary}
                  </span>
                  <span className="flex items-center">
                    {/* Time Icon */}
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {job.posted}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">{job.description}</p>
              </div>
              <div className="ml-4 flex flex-col space-y-2">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-bold shadow-md">Apply Now</button>
                <button className="border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-bold">Save Job</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mt-12 text-center">
        <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 tracking-tight">Get Job Alerts</h3>
        <p className="mb-6 opacity-90">
          Be the first to know about new opportunities that match your skills and interests.
        </p>
        <div className="flex max-w-md mx-auto">
          <input
            placeholder="Enter your email"
            className="flex-1 p-3 rounded-l-lg text-gray-900 focus:outline-none"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button className="bg-white text-purple-600 px-6 py-3 rounded-r-lg font-bold hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default JobPage;