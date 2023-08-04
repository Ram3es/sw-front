import React from 'react'

const EditPencil = ({ className }: { className?: string }) => {
  return (
    <svg className={className ?? ''} width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M18.332 2.25391L16.9961 0.917969C16.5742 0.496094 15.9766 0.25 15.4141 0.25C14.8516 0.25 14.2539 0.496094 13.832 0.917969L1.42188 13.3281L1 17.3359C0.929688 17.8281 1.31641 18.25 1.80859 18.25C1.84375 18.25 1.87891 18.25 1.91406 18.25L5.92188 17.8281L18.332 5.41797C19.2109 4.53906 19.2109 3.13281 18.332 2.25391ZM5.42969 16.7383L2.16016 17.0898L2.51172 13.8203L11.793 4.53906L14.7109 7.45703L5.42969 16.7383ZM17.5234 4.64453L15.4844 6.68359L12.5664 3.76562L14.6055 1.72656C14.8164 1.51562 15.0977 1.375 15.4141 1.375C15.7305 1.375 16.0117 1.51562 16.2227 1.72656L17.5234 3.02734C17.9805 3.48438 17.9805 4.1875 17.5234 4.64453Z" fill="currentColor"/>
    </svg>
  )
}

export default EditPencil
