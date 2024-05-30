import React, { useState } from "react";
import StartupCard from "./StartupCard";
const companies = [
  {
    id: 1,
    name: "Creative Intell",
    location: "New York, New York, United States",
    industry: ["Artificial Intelligence (AI)", "Education", "Information Technology"],
    employees: 10,
    foundingYear: 2015,
    fundingRaised: 800000,
    founderName: "John Doe",
    description:
      "Creative Intell is the artificial intelligence-powered dealmaking platform for the music industry.",
  },
  {
    id: 2,
    name: "DataWars",
    location: "San Francisco, California, United States",
    industry: ["Data Science", "Machine Learning", "Cybersecurity"],
    employees: 20,
    foundingYear: 2018,
    fundingRaised: 4000000,
    founderName: "Jane Doe",
    description:
      "DataWars is a data science platform that helps companies make better decisions.",
  },
  {
    id: 3,
    name: "AI Masters",
    location: "London, United Kingdom",
    industry: ["Artificial Intelligence (AI)", "Machine Learning", "Robotics"],
    employees: 30,
    foundingYear: 2012,
    fundingRaised: 1000000,
    founderName: "Bob Smith",
    description: "AI Masters is a leading AI research and development company.",
  },
  // Add more companies here
];

function FilterData() {
  const [companyValuation, setCompanyValuation] = useState(0);
  const [totalFundingRaise, setTotalFundingRaise] = useState(0);
  const [noOfEmployees, setNoOfEmployees] = useState(0);
  const [foundingYear, setFoundingYear] = useState("");
  const [founderName, setFounderName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industryTag, setIndustryTag] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(companies);

  const handleCompanyValuationChange = (event) => {
    setCompanyValuation(event.target.value);
    filterCompanies();
  };

  const handleTotalFundingRaiseChange = (event) => {
    setTotalFundingRaise(event.target.value);
    filterCompanies();
  };

  const handleNoOfEmployeesChange = (event) => {
    setNoOfEmployees(event.target.value);
    filterCompanies();
  };

  const handleFoundingYearChange = (event) => {
    setFoundingYear(event.target.value);
    filterCompanies();
  };

  const handleFounderNameChange = (event) => {
    setFounderName(event.target.value);
    filterCompanies();
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
    filterCompanies();
  };

  const handleIndustryTagChange = (event) => {
    setIndustryTag(event.target.value);
    filterCompanies();
  };

  const filterCompanies = () => {
    let filteredCompanies = companies;

    if (companyValuation > 0) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.employees >= companyValuation
      );
    }

    if (totalFundingRaise > 0) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.fundingRaised >= totalFundingRaise
      );
    }

    if (noOfEmployees > 0) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.employees >= noOfEmployees
      );
    }

    if (foundingYear) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.foundingYear === parseInt(foundingYear)
      );
    }

    if (founderName) {
      filteredCompanies = filteredCompanies.filter((company) =>
        company.founderName.toLowerCase().includes(founderName.toLowerCase())
      );
    }

    if (companyName) {
      filteredCompanies = filteredCompanies.filter((company) =>
        company.name.toLowerCase().includes(companyName.toLowerCase())
      );
    }

    if (industryTag) {
      filteredCompanies = filteredCompanies.filter((company) =>
        company.industry.includes(industryTag)
      );
    }

    setFilteredCompanies(filteredCompanies);
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mx-auto w-[80%]">
          <h1 className="text-2xl font-bold mb-4">filter</h1>
          <div className="mb-4">
            <label htmlFor="companyValuation" className="block text-white font-bold mb-2">
              Company Valuation
            </label>
            <input
              type="range"
              id="companyValuation"
              min="0"
              max="100"
              value={companyValuation}
              onChange={handleCompanyValuationChange}
              className="w-full zinctext-zinc-600-none bg-gray-200 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="totalFundingRaise"
              className="block text-white font-bold mb-2"
            >
              Total Funding Raise
            </label>
            <input
              type="range"
              id="totalFundingRaise"
              min="0"
              max="10000000"
              value={totalFundingRaise}
              onChange={handleTotalFundingRaiseChange}
              className="w-full zinctext-zinc-600-none bg-gray-200 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="noOfEmployees" className="block text-white font-bold mb-2">
              No of Employees
            </label>
            <input
              type="range"
              id="noOfEmployees"
              min="0"
              max="1000"
              value={noOfEmployees}
              onChange={handleNoOfEmployeesChange}
              className="w-full zinctext-zinc-600-none bg-gray-200 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="foundingYear" className="block text-white font-bold mb-2">
              Founding Year
            </label>
            <select
              id="foundingYear"
              value={foundingYear}
              onChange={handleFoundingYearChange}
              className="w-full appearance-none bg-gray-200 p-2 text-zinc-600 border border-gray-200 rounded"
            >
              <option value="">Select Year</option>
              {/* Generate options for each year between 1900 and 2022 */}
              {[...Array(25).keys()].map((_, i) => (
                <option key={i} value={i + 2000}>
                  {i + 2000}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="founderName" className="block text-white font-bold mb-2">
              Founder Name
            </label>
            <input
              type="text"
              id="founderName"
              value={founderName}
              onChange={handleFounderNameChange}
              className="w-full appearance-none bg-gray-200 p-2 text-zinc-600 border border-gray-200 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-white font-bold mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={handleCompanyNameChange}
              className="w-full appearance-none bg-gray-200 p-2 text-zinc-600 border border-gray-200 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="industryTag" className="block text-white font-bold mb-2">
              Industry Tag
            </label>
            <input
              type="text"
              id="industryTag"
              value={industryTag}
              onChange={handleIndustryTagChange}
              className="w-full appearance-none bg-gray-200 p-2 text-zinc-600 border border-gray-200 rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4 ">
          {filteredCompanies.map((company) => (
            <StartupCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterData;
