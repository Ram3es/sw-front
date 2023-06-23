import { Link as RouterLink, useLocation } from 'react-router-dom';

interface ILink {
  to?: string;
  text?: string | React.JSX.Element;
  className?: string;
  icon?: any;
  iconRight?: boolean;
  onClick?: any;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Link = ({ to = '', text, className = '', onClick, icon, iconRight = false}: ILink) => {
  const { pathname } = useLocation();

  return (
    <span
      className={
        classNames(
          'inline-flex items-center h-[56px]',
          to !== '/' && pathname.replace('/market', '').includes(to) ? 'border-b border-solid border-linkUnderline' : '',
        )
      }
    >
      <RouterLink
        to={to}
        onClick={onClick}
        className={classNames(
          'button font-["Barlow"] px-[16px] h-[32px] text-[14px] uppercase tracking-[1.12px]',
          className,
          text ? '' : 'contents'
        )}
      >
        { icon && !iconRight && <span className="pr-[8px]">{icon}</span> }
        { text }
        { icon && iconRight && <span className="pl-[8px]">{icon}</span> }
      </RouterLink>
    </span>
  );
}