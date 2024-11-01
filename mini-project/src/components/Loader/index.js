import React from 'react';
import Loader from 'react-loader-spinner';

const Loader = () => {
  return (
    <div>
        <div className="loader-container" data-testid="loader">
            <Loader type="TailSpin" color="#D81F26" height="50" width="50" />
        </div>
    </div>
  )
}

export default Loader
