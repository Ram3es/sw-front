import { Outlet } from 'react-router-dom'
import TopBar from './components/TopBar/TopBar'

function App () {
  return (
    <div className='flex flex-col bg-darkSecondary min-h-screen'>
      <TopBar isHidableOnScroll={true}/>
      <Outlet />
    </div>
  )
}

export default App
