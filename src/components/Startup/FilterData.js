import React, { useState, useEffect, useCallback } from "react";
import StartupCard from "./StartupCard";
import { useSelector } from "react-redux";
import { Button, Drawer } from "flowbite-react";
import { FaFilter } from "react-icons/fa";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const filterCompanies = useCallback(() => {
    let filtered = allStartups;

    if (companyValuation > 0) {
      filtered = filtered.filter((company) => company.Evaluation >= companyValuation);
    }

    if (totalFundingRaise > 0) {
      filtered = filtered.filter((company) => {
        const funding = company.FundingRaised.find(
          (raise) => raise.Amount >= totalFundingRaise
        );
        return funding !== undefined;
      });
    }

    if (noOfEmployees > 0) {
      filtered = filtered.filter((company) => company.NumberOfEmployees >= noOfEmployees);
    }

    if (foundingYear) {
      filtered = filtered.filter(
        (company) => company.FoundingYear === parseInt(foundingYear)
      );
    }

    if (founderName) {
      filtered = filtered.filter((company) =>
        company.FounderName.toLowerCase().includes(founderName.toLowerCase())
      );
    }

    if (companyName) {
      filtered = filtered.filter((company) =>
        company.StartUpName.toLowerCase().includes(companyName.toLowerCase())
      );
    }

    if (industryTag) {
      filtered = filtered.filter((company) =>
        company.TargetMarket.toLowerCase().includes(industryTag.toLowerCase())
      );
    }

    setFilteredCompanies(filtered);
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

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-slate-800 text-white min-h-screen">
      {!isSidebarOpen && (
        <div className="fixed top-24 left-4 z-50">
          <Button onClick={handleToggleSidebar}>
            <FaFilter className="text-blue-500 size-7"/>
          </Button>
        </div>
      )}
      <Drawer open={isSidebarOpen} onClose={handleToggleSidebar} position="top"
        className="transition-transform duration-400 transform bg-gray-200 text-white"
      >
        <Drawer.Header title="Filter Options" />
        <Drawer.Items className="bg-gray-800 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <div className="mb-4">
              <label htmlFor="companyValuation" className="block font-bold mb-2">
                Company Valuation: ${companyValuation}M
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
              <label htmlFor="totalFundingRaise" className="block font-bold mb-2">
                Total Funding Raise: ${totalFundingRaise}M
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
              <label htmlFor="noOfEmployees" className="block font-bold mb-2">
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
              <label htmlFor="foundingYear" className="block font-bold mb-2">
                Founding Year
              </label>
              <select
                id="foundingYear"
                value={foundingYear}
                onChange={(e) => setFoundingYear(e.target.value)}
                className="w-full bg-gray-200 p-2 text-gray-900 border border-gray-200 rounded"
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
              <label htmlFor="founderName" className="block font-bold mb-2">
                Founder Name
              </label>
              <input
                type="text"
                id="founderName"
                placeholder="Founder Name"
                value={founderName}
                onChange={(e) => setFounderName(e.target.value)}
                className="w-full bg-gray-200 p-2 text-gray-900 border border-gray-200 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="companyName" className="block font-bold mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-gray-200 p-2 text-gray-900 border border-gray-200 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="industryTag" className="block font-bold mb-2">
                Target Market
              </label>
              <input
                type="text"
                id="industryTag"
                placeholder="Target Market"
                value={industryTag}
                onChange={(e) => setIndustryTag(e.target.value)}
                className="w-full bg-gray-200 p-2 text-gray-900 border border-gray-200 rounded"
              />
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
      <div className={`transition-all duration-300 ${isSidebarOpen ? "mt-80" : "mt-0"} flex-1 p-4`}>
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Search Startups</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap my-14">
          {filteredCompanies &&
            filteredCompanies.map((startup) => (
              <StartupCard key={startup._id} startup={startup} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default FilterData;
