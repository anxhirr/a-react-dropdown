// import { Input } from 'goog-input'

import { useState } from 'react'
import { Input } from '../lib/main'

function App() {
  const [value, setValue] = useState('')
  return (
    <div>
      <Input
        options={[
          { label: 'Option 1', value: 'option-1' },
          { label: 'Option 2', value: 'option-2' },
          { label: 'Option 3', value: 'option-3' },
        ]}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onOptionSelect={(option) => setValue(option.label)}
      />
    </div>
  )
}

export default App
