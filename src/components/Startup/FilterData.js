import React, { useState, useEffect } from "react";
import StartupCard from "./StartupCard";
import { useSelector } from "react-redux";

function FilterData() {
  const allStartups = useSelector((state) => state.startups.startups);

  const [companyValuation, setCompanyValuation] = useState(0);
  const [totalFundingRaise, setTotalFundingRaise] = useState(0);
  const [noOfEmployees, setNoOfEmployees] = useState(0);
  const [foundingYear, setFoundingYear] = useState("");
  const [founderName, setFounderName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industryTag, setIndustryTag] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  
  useEffect(() => {
    setFilteredCompanies(allStartups);
  }, [allStartups]);

  useEffect(() => {
    filterCompanies();
  }, [
    companyValuation,
    totalFundingRaise,
    noOfEmployees,
    foundingYear,
    founderName,
    companyName,
    industryTag,
    allStartups,
  ]);

  const filterCompanies = () => {
    let filtered = allStartups;

    if (companyValuation > 0) {
      filtered = filtered.filter(
        (company) => company.valuation >= companyValuation
      );
    }

    if (totalFundingRaise > 0) {
      filtered = filtered.filter(
        (company) => company.fundingRaised >= totalFundingRaise
      );
    }

    if (noOfEmployees > 0) {
      filtered = filtered.filter(
        (company) => company.employees >= noOfEmployees
      );
    }

    if (foundingYear) {
      filtered = filtered.filter(
        (company) => company.foundingYear === parseInt(foundingYear)
      );
    }

    if (founderName) {
      filtered = filtered.filter((company) =>
        company.founderName.toLowerCase().includes(founderName.toLowerCase())
      );
    }

    if (companyName) {
      filtered = filtered.filter((company) =>
        company.name.toLowerCase().includes(companyName.toLowerCase())
      );
    }

    if (industryTag) {
      filtered = filtered.filter((company) =>
        company.industry.includes(industryTag)
      );
    }

    setFilteredCompanies(filtered);
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mx-auto w-[80%]">
          <h1 className="text-2xl font-bold mb-4">Filter</h1>
          <div className="mb-4">
            <label htmlFor="companyValuation" className="block text-white font-bold mb-2">
              Company Valuation: {companyValuation}
            </label>
            <input
              type="range"
              id="companyValuation"
              min="0"
              max="10000"
              value={companyValuation}
              onChange={(e) => setCompanyValuation(Number(e.target.value))}
              className="w-full bg-gray-200 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="totalFundingRaise" className="block text-white font-bold mb-2">
              Total Funding Raise: {totalFundingRaise}
            </label>
            <input
              type="range"
              id="totalFundingRaise"
              min="0"
              max="10000000"
              value={totalFundingRaise}
              onChange={(e) => setTotalFundingRaise(Number(e.target.value))}
              className="w-full bg-gray-200 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="noOfEmployees" className="block text-white font-bold mb-2">
              No of Employees: {noOfEmployees}
            </label>
            <input
              type="range"
              id="noOfEmployees"
              min="0"
              max="1000"
              value={noOfEmployees}
              onChange={(e) => setNoOfEmployees(Number(e.target.value))}
              className="w-full bg-gray-200 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="foundingYear" className="block text-white font-bold mb-2">
              Founding Year
            </label>
            <select
              id="foundingYear"
              value={foundingYear}
              onChange={(e) => setFoundingYear(e.target.value)}
              className="w-full appearance-none bg-gray-200 p-2 text-zinc-600 border border-gray-200 rounded"
            >
              <option value="">Select Year</option>
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
              placeholder="Founder Name"
              value={founderName}
              onChange={(e) => setFounderName(e.target.value)}
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
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full appearance-none bg-gray-200 p-2 text-zinc-600 border border-gray-200 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="industryTag" className="block text-white font-bold mb-2">
              Industry Tag
            </label>
            <input
              type="text"
              placeholder="Industry Tag"
              id="industryTag"
              value={industryTag}
              onChange={(e) => setIndustryTag(e.target.value)}
              className="w-full appearance-none bg-gray-200 p-2 text-zinc-600 border border-gray-200 rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {filteredCompanies && filteredCompanies.map((startup) => (
            <StartupCard key={startup._id} startup={startup} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterData;
