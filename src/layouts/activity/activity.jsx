import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import NavbarPerformance from 'layouts/navbarPerformance'
import React from 'react'
import ActivityModel from './ActivityModel'

const Activity = () => {
  return (
    <DashboardLayout>
    <NavbarPerformance />
    <br/>
     <ActivityModel/>
   </DashboardLayout>
  
  )
}

export default Activity