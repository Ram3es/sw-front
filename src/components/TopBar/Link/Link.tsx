import { Link } from 'react-router-dom';

interface ILink {
  to?: string;
  text?: string;
  className?: string;
  icon?: any;
  iconRight?: boolean;
  onClick?: any;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function Button({ to = '', text = 'Link', className = '', onClick, icon, iconRight = false}: ILink) {
  return (
    <Link
      to={to}
      className={classNames(
        'button font-["Barlow"] h-[32px] px-[16px] text-[14px] uppercase tracking-[1.12px]',
        className,
      )}
    >
      { icon && !iconRight && <span className="pr-[8px]">{icon}</span> }
      { text }
      { icon && iconRight && <span className="pl-[8px]">{icon}</span> }
    </Link>
  );
}