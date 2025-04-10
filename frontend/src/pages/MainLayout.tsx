import { Outlet } from 'react-router'

const mainlayout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      
    </>
  )
}

export default mainlayout