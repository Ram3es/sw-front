
import { Switch } from '@headlessui/react'

const SwitchToggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => {
  return (
        <Switch
         checked={checked}
         onChange={onChange}
         className={`${
            checked ? 'bg-blue-5d' : 'bg-darkGrey border border-graySecondary'
          } relative inline-flex h-6 w-11 items-center rounded-full shrink-0 `}
        >
        <span className="sr-only">Enable notifications</span>
      <span
        className={`${
            checked ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
        </Switch>
  )
}

export default SwitchToggle