const Avatar = ({ url }: { url?: string }) => {
    return (
          <div
            className='rounded-full w-10 h-10 shrink-0 bg-cover'
            style={{ backgroundImage: `url(${url ?? ''})` }}
          >
          </div>
    )
  }
  
  export default Avatar