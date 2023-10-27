import { useState } from 'react'
import { Input } from '../lib/main'

const DUMMY_OPTIONS = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
]

function App() {
  const [value, setValue] = useState('')
  return (
    <div>
      <Input
        options={DUMMY_OPTIONS}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onOptionSelect={(option) => setValue(option.label)}
      />
    </div>
  )
}

export default App
