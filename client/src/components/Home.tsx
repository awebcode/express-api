import useUserStore from '@/hooks/useUser';
import React from 'react'

const Home = () => {
  const { user } = useUserStore();
  
  return (
    <div>Home {user?.name}</div>
  )
}

export default Home