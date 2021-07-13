import React, { useEffect } from 'react'
import RNDiscoUIModule, { Counter } from 'react-native-disco-ui'

const App = () => {
  useEffect(() => {
    console.log(RNDiscoUIModule)
  })

  return <Counter />
}

export default App
