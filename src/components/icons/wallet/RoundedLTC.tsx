import React from 'react';

const RoundedLTC = ({ className } : { className?: string  }) => {
    return (
        <svg className={ className ?? ''} width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M11.4063 6.5918L9.35541 14.2976L7.72591 14.9315L7.13592 17.1151L8.79351 16.5516L7.69782 21.1018L19.5398 21.1159L20.2702 18.1998H13.0358L13.9629 14.678L15.9015 13.8468L16.4634 11.6914L14.567 12.3395L16.056 6.61998L11.4063 6.5918ZM13.696 0.731445C20.9305 0.731445 26.8023 6.61998 26.8023 13.875C26.8023 21.13 20.9305 27.0185 13.696 27.0185C6.46165 27.0044 0.589844 21.1159 0.589844 13.875C0.589844 6.61998 6.46165 0.731445 13.696 0.731445Z" fill="white"/>
        </svg>
    );
};

export default RoundedLTC;