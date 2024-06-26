import React from 'react';

const Mark = ({ className } : { className?: string }) => {
    return (
        <svg className={ className ?? '' } width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.293 0.265625L3.63672 7.92188L0.929688 5.21484C0.792969 5.10547 0.601562 5.10547 0.464844 5.21484L0.164062 5.54297C0.0273438 5.65234 0.0273438 5.87109 0.164062 6.00781L3.41797 9.26172C3.52734 9.37109 3.74609 9.37109 3.85547 9.26172L12.0586 1.05859C12.1953 0.921875 12.1953 0.703125 12.0586 0.59375L11.7578 0.265625C11.6211 0.15625 11.4297 0.15625 11.293 0.265625Z" fill="currentColor"/>
        </svg>
    );
};

export default Mark;