import React from 'react'
import { IconContext } from 'react-icons'
import { WiStars } from 'react-icons/wi'

const LoadingSpinner = () => {
    return (
    <div className="loadingSpinnerWrapper">
        <IconContext.Provider value={{ className: 'fa-pulse fa-spin', size: '3em' }}>
            <WiStars />
        </IconContext.Provider>
    </div>
)
}

export default LoadingSpinner