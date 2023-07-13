interface ICartIcon {
  className?: string
  color?: string
}

export const CartIcon = ({ className, color = '#A4A4A4' }: ICartIcon) => {
  return (
    <svg className={ className } width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.5996 3.25H5.29102L4.92188 1.44531C4.83984 0.994141 4.42969 0.625 3.97852 0.625H0.492188C0.205078 0.625 0 0.871094 0 1.11719V1.44531C0 1.73242 0.205078 1.9375 0.492188 1.9375H3.69141L6.5625 17.2363C6.15234 17.7285 5.90625 18.3438 5.90625 19C5.90625 20.4766 7.05469 21.625 8.53125 21.625C9.9668 21.625 11.1562 20.4766 11.1562 19C11.1562 18.6309 10.9922 18.0566 10.7871 17.6875H16.7344C16.5293 18.0566 16.4062 18.6309 16.4062 19C16.4062 20.4766 17.5547 21.625 19.0312 21.625C20.4668 21.625 21.6562 20.4766 21.6562 19C21.6562 18.3027 21.3281 17.6055 20.8359 17.1543C20.7539 16.7031 20.3438 16.375 19.8926 16.375H7.75195L7.25977 13.75H20.8359C21.3281 13.75 21.6973 13.4629 21.8203 12.9707L23.584 4.43945C23.707 3.82422 23.2559 3.25 22.5996 3.25ZM9.84375 19C9.84375 19.7383 9.22852 20.3125 8.53125 20.3125C7.79297 20.3125 7.21875 19.7383 7.21875 19C7.21875 18.3027 7.79297 17.6875 8.53125 17.6875C9.22852 17.6875 9.84375 18.3027 9.84375 19ZM19.0312 20.3125C18.293 20.3125 17.7188 19.7383 17.7188 19C17.7188 18.3027 18.293 17.6875 19.0312 17.6875C19.7285 17.6875 20.3438 18.3027 20.3438 19C20.3438 19.7383 19.7285 20.3125 19.0312 20.3125ZM20.5898 12.4375H7.01367L5.53711 4.5625H22.2305L20.5898 12.4375Z"
        fill={color}
      />
    </svg>
  )
}
