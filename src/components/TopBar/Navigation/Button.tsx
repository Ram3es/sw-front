function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface IButton {
  text: string;
  className?: string;
  icon?: any;
  iconRight?: boolean;
  onClick?: () => void;
}

export const Button = ({ text = '', className = '', icon, iconRight = false, onClick}: IButton) => {
  return (
    <span className='inline-flex items-center h-[56px]'>
      <button 
        className={classNames(
          'button font-["Barlow"] h-[32px] px-[16px] text-[14px] uppercase tracking-[1.12px]',
          className,
        )}
        onClick={onClick}
      >
        { icon && !iconRight && <span className="pr-[8px]">{icon}</span> }
        { text }
        { icon && iconRight && <span className="pl-[8px]">{icon}</span> }
      </button>
    </span>
  );
};