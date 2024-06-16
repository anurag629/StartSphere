import React from 'react';
import LoadingSkeletonProfileCard from './LoadingSkeletonProfileCard';

const LoadingSkeleton = () => {
    const skeletons = Array.from({ length: 20 }, (_, index) => (
        <LoadingSkeletonProfileCard key={index} />
    ));

    return (
        <div className="flex flex-wrap">
            {skeletons}
        </div>
    );
};

export default LoadingSkeleton;
