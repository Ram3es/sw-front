import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface ILink {
  to?: string;
  text?: string | React.JSX.Element;
  className?: string;
  icon?: boolean;
  iconRight?: boolean;
  onClick?: any;
  children?: any;
  wrapperStyles?: string;
  active?: boolean;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Link = ({
  to = '',
  text,
  className = '',
  onClick,
  icon,
  iconRight = false,
  children,
  wrapperStyles,
  active,
}: ILink) => {
  return (
    <span
      className={
        classNames(
          'inline-flex items-center mx-[16px]',
          active ? 'border-b border-solid border-swViolet' : '',
          wrapperStyles ? wrapperStyles : ''
        )
      }
    >
      <RouterLink
        to={to}
        onClick={onClick}
        className={classNames(
          'button font-["Barlow"] h-[32px] text-[14px] uppercase flex tracking-[1.12px]',
          className,
          text ? '' : 'contents'
        )}
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
  );
}