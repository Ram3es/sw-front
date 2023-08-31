import React from 'react';

const FacebookIcon = ({ className }: { className?: string}) => {
    return (
        <svg className={ className ?? '' } width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M17.7188 9.25C17.7188 13.6094 14.5195 17.2305 10.3359 17.8633V11.7812H12.375L12.7617 9.25H10.3359V7.63281C10.3359 6.92969 10.6875 6.26172 11.7773 6.26172H12.8672V4.11719C12.8672 4.11719 11.8828 3.94141 10.8984 3.94141C8.92969 3.94141 7.62891 5.17188 7.62891 7.35156V9.25H5.41406V11.7812H7.62891V17.8633C3.44531 17.2305 0.28125 13.6094 0.28125 9.25C0.28125 4.43359 4.18359 0.53125 9 0.53125C13.8164 0.53125 17.7188 4.43359 17.7188 9.25Z" fill="currentColor"/>
        </svg>
    );
};

export default FacebookIcon;