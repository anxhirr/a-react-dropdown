// import { Input } from 'goog-input'

import { Input } from '../lib/main'

function App() {
  return (
    <div>
      <Input onChange={() => console.log('hi')} />
    </div>
  )
}

export default App
