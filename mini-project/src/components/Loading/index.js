import {TailSpin} from 'react-loader-spinner'

import './index.css'

const Loading = () => (
  <div className="loader-container" data-testid="loader">
    <TailSpin type="TailSpin" color="#D81F26" height="50" width="50" />
  </div>
)

export default Loading