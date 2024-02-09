import React from 'react'
import Header from './components/Header'

type Props = {
    children:React.ReactNode
}

const DashboardLayout = ({children}: Props) => {
  return (
    <>
      <Header></Header>
      {children}
    </>
  )
}

export default DashboardLayout