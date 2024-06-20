import React from "react";
import { Link } from 'react-router-dom';
import { Button, Card, Label, TextInput } from "flowbite-react";

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
    <div className="max-w-md mx-auto p-6">
      <Card className="rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-4">
          <img
            src={Logo}
            alt={`${StartUpName} logo`}
            className="h-36 w-fit object-contain rounded"
          />
          <h3 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">{StartUpName}</h3>
          <p className="text-gray-700 dark:text-gray-400">{FounderName}</p>
        </div>
        <p className="text-gray-700 dark:text-gray-400 mb-4">
          {CompanyDes.length > 150 ? `${CompanyDes.substring(0, 150)}... ` : CompanyDes}
          {CompanyDes.length > 150 && (
            <Link to={`/startups/${_id}`} className="text-blue-500 hover:underline">
              see more
            </Link>
          )}
        </p>
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Founded:</Label>
              <TextInput readOnly type="text" value={FoundingYear} className="bg-slate-700 text-white" />
            </div>
            <div>
              <Label>Employees:</Label>
              <TextInput readOnly type="text" value={NumberOfEmployees} className="bg-slate-700 text-white" />
            </div>
            <div>
              <Label>Target Market:</Label>
              <TextInput readOnly type="text" value={TargetMarket} className="bg-slate-700 text-white" />
            </div>
            <div>
              <Label>Current Stage:</Label>
              <TextInput readOnly type="text" value={CurrentStage} className="bg-slate-700 text-white" />
            </div>
            <div>
              <Label>Key Features:</Label>
              <TextInput readOnly type="text" value={KeyFeatures} className="bg-slate-700 text-white" />
            </div>
            <div>
              <Label>Investors:</Label>
              <TextInput readOnly type="text" value={Inverstors} className="bg-slate-700 text-white" />
            </div>
            <div>
              <Label>Evaluation:</Label>
              <TextInput readOnly type="text" value={`$${Evaluation}M`} className="bg-slate-700 text-white" />
            </div>
            <div>
              <Label>Revenue:</Label>
              <TextInput readOnly type="text" value={`$${Revenue}M`} className="bg-slate-700 text-white" />
            </div>
          </div>
        </div>
        <Link to={`/startups/${_id}`}>
          <Button
            className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700 text-white`}
          >
            For More Details
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default StartupCard;
