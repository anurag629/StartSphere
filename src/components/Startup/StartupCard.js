import React from "react";
import { Link } from 'react-router-dom';

const StartupCard = ({ startup }) => {
  const {
    StartUpName,
    Logo,
    FounderName,
    CompanyDes,
    FoundingYear,
    NumberOfEmployees,
    TargetMarket,
    CurrentStage,
    KeyFeatures,
    Inverstors,
    Evaluation,
    Revenue,
    FundingRaised,
    ContactInformation,
    _id
  } = startup;

  return (
    <div className="bg-slate-300 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <Link to={`/startups/${_id}`}>
        <div className="flex items-center mb-4">
          <img
            src={Logo}
            alt={`${StartUpName} logo`}
            className="w-16 h-16 rounded-full object-cover bg-gray-200"
          />
          <div className="ml-4">
            <h3 className="text-2xl font-bold text-gray-800">{StartUpName}</h3>
            <p className="text-gray-600">{FounderName}</p>
          </div>
        </div>
        <p className="text-gray-700 mb-4">{CompanyDes}</p>
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-800">Details</h4>
          <p className="text-gray-700">Founded: {FoundingYear}</p>
          <p className="text-gray-700">Employees: {NumberOfEmployees}</p>
          <p className="text-gray-700">Target Market: {TargetMarket}</p>
          <p className="text-gray-700">Current Stage: {CurrentStage}</p>
          <p className="text-gray-700">Key Features: {KeyFeatures}</p>
          <p className="text-gray-700">Investors: {Inverstors}</p>
          <p className="text-gray-700">Evaluation: ${Evaluation}M</p>
          <p className="text-gray-700">Revenue: ${Revenue}M</p>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-800">Funding Raised</h4>
          {FundingRaised.map((fund, index) => (
            <div key={index} className="text-gray-700">
              <p>Company: {fund.CompanyName}</p>
              <p>Equity Holds: {fund.EquityHolds}%</p>
              <p>Amount: ${fund.Amount}M</p>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default StartupCard;