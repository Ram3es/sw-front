import React from 'react'
import { type LinkProps, Link as RouterLink } from 'react-router-dom'

interface ILink extends LinkProps {
  text?: string | React.JSX.Element
  className?: string
  icon?: boolean
  iconRight?: boolean
  onClick?: any
  children?: any
  wrapperStyles?: string
  active?: boolean
  withBorder?: boolean
}

function classNames (...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Link = ({
  text,
  className = '',
  onClick,
  icon,
  iconRight = false,
  children,
  wrapperStyles,
  active,
  withBorder,
  ...linkProps
}: ILink) => {
  return (
    <span
      className={
        classNames(
          'inline-flex items-center mx-[16px]',
          active ? ' pointer-events-none' : '',
          wrapperStyles ?? '',
          withBorder && active ? 'border-b border-solid border-swViolet' : ''
        )
      }
    >
      <RouterLink
        onClick={onClick}
        className={classNames(
          'button font-["Barlow"] h-[50px] text-[14px] uppercase flex tracking-[1.12px]',
          className,
          text ? '' : 'contents',
          active ? 'text-white' : ''
        )}
        {...linkProps}
      >
        { icon && !iconRight &&
          <span className="pr-[8px]">
            { React.cloneElement(children, { color: active ? '#6842FF' : '#A4A4A4' }) }
          </span>
        }
        { text }
        { icon && iconRight &&
          <span className="pl-[8px]">
            { React.cloneElement(children, { color: active ? '#6842FF' : '#A4A4A4' }) }
          </span>
        }
      </RouterLink>
    </span>
  )
}
