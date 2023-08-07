import Checkbox from './Checkbox'

const InputWithCheckbox = ({ setter, isChecked, label, children }: { setter: (checked: boolean) => void, isChecked: boolean, label: string, children?: JSX.Element }) => {
  return (
    <div
      onClick={() => { setter(!isChecked) }}
      className="w-full cursor-pointer flex justify-between items-center"
    >
      <div className="flex items-center">
        <div className="mr-3">
          <Checkbox
            checked={isChecked}
            additionalClasses="pointer-events-none text-black"
          />
        </div>
        <h1 className="font-['Barlow'] text-sm">{label}</h1>
      </div>
      {children}
    </div>
  )
}

export default InputWithCheckbox
