import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingSkeletonProfileCard = () => (
    <div className="w-full md:w-1/5 rounded text-white overflow-hidden shadow-lg p-4 m-4 bg-slate-700 flex flex-col">
        <ContentLoader 
            speed={2}
            width={150}
            height={200}
            viewBox="0 0 150 200"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="75" cy="50" r="24" /> 
            <rect x="0" y="90" rx="3" ry="3" width="150" height="10" /> 
            <rect x="0" y="110" rx="3" ry="3" width="100" height="10" /> 
            <rect x="0" y="130" rx="3" ry="3" width="140" height="10" /> 
            <rect x="0" y="150" rx="3" ry="3" width="80" height="10" /> 
            <rect x="0" y="170" rx="3" ry="3" width="120" height="10" />
        </ContentLoader>
    </div>
);

export default LoadingSkeletonProfileCard;
