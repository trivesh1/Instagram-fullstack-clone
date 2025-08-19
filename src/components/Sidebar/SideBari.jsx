import React from 'react'
import Home from './Home'
import Notifications from './Notifications'
import Profile from './Profile'
import CreatePost from './CreatPost'
import Search from './Search'
import SuggestedUser from '../Suggesteds/SuggestedUser'


const SideBari = () => {
  return (
    <>
    <Home/>
    <Search/>
    <Notifications/>
    <CreatePost/>
    

    <Profile/>
    </>
    
  )
}

export default SideBari