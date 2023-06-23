import { Outlet } from 'react-router-dom';
import TopBar from './components/TopBar/TopBar';

function App () {
  return (
    <div className=' bg-almostBlack min-h-[2000px]'>
      <TopBar isHidableOnScroll={true}/>
      <Outlet />
    </div>
  )
}

export default App
