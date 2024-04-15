import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import NavbarPerformance from 'layouts/navbarPerformance'
import React from 'react'
import ActivityModel from './TransactionModel'

const Transation = () => {
  return (
    <DashboardLayout>
    <NavbarPerformance />
    <br/>
     <ActivityModel/>
   </DashboardLayout>
  
  )
}

export default Transaction