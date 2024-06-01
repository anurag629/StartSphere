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
    _id
  } = startup;

  return (
    <div className="bg-slate-700 p-6 rounded-lg shadow-md max-w-md mx-auto text-white">
      <Link to={`/startups/${_id}`}>
        <div className="flex items-center mb-4">
          <img
            src={Logo}
            alt={`${StartUpName} logo`}
            className="w-16 h-16 rounded-full object-cover text-white"
          />
          <div className="ml-4">
            <h3 className="text-2xl font-bold text-white">{StartUpName}</h3>
            <p className="text-white">{FounderName}</p>
          </div>
        </div>
        <p className="text-white mb-4">{CompanyDes}</p>
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-white">Details</h4>
          <p className="text-white">Founded: {FoundingYear}</p>
          <p className="text-white">Employees: {NumberOfEmployees}</p>
          <p className="text-white">Target Market: {TargetMarket}</p>
          <p className="text-white">Current Stage: {CurrentStage}</p>
          <p className="text-white">Key Features: {KeyFeatures}</p>
          <p className="text-white">Investors: {Inverstors}</p>
          <p className="text-white">Evaluation: ${Evaluation}M</p>
          <p className="text-white">Revenue: ${Revenue}M</p>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-white">Funding Raised</h4>
          {FundingRaised ? (
            FundingRaised.map((fund, index) => (
              <div key={index} className="text-white">
                <p>Company: {fund.CompanyName}</p>
                <p>Equity Holds: {fund.EquityHolds}%</p>
                <p>Amount: ${fund.Amount}M</p>
              </div>
            ))
          ) : (
            <p className="text-white">No funding information available.</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default StartupCard;