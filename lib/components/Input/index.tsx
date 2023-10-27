import { useState } from 'react'
import { InputHTMLAttributes, ChangeEvent, FocusEvent } from 'react'
import styles from './styles.module.css'

type Option = {
  label: string
  value: string
}

type SelectedOption = Option | null

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  options?: Option[]
  onOptionSelect?: (option: Option) => void
  isClearable?: boolean
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void
  onClear?: () => void
  openOptionsOnFocus?: boolean
}
export function Input(props: InputProps) {
  const {
    className = '',
    onChange,
    options,
    isClearable = true,
    onOptionSelect,
    onBlur,
    onFocus,
    onClear,
    openOptionsOnFocus = true,
    ...restProps
  } = props

  const [filteredOptions, setFilteredOptions] = useState<Option[]>(
    options || []
  )
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SelectedOption>(null)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)

    if (!options) return
    const value = e.target.value
    if (!value) setSelectedOption(null) // clear selected option if input is empty
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredOptions(filteredOptions)
  }

  const handleOnOptionSelect = (option: Option) => {
    setSelectedOption(option)
    onOptionSelect?.(option)
  }

  const handleOnClear = () => {
    onChange?.({
      target: {
        value: '',
      },
    } as ChangeEvent<HTMLInputElement>)
    setFilteredOptions(options || [])
    setSelectedOption(null)
    onClear?.()
  }

  const onInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    openOptionsOnFocus && setTimeout(() => setShowOptions(true), 100) // delay for animation TODO: will be done with css
    onFocus?.(e)
  }
  const onInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    onBlur?.(e)
    setTimeout(() => setShowOptions(false), 100) // delay to allow click on option
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <span className={styles.searchIcon}>
          <SearchIconSvg />
        </span>
        {isClearable && (
          <button className={styles.clearIcon} onClick={handleOnClear}>
            <ClearSvg />
          </button>
        )}
        <input
          className={`${className} ${styles.input}`}
          placeholder='Search google'
          onChange={handleOnChange}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          {...restProps}
        />
      </div>
      {showOptions && (
        <div className={styles.optionsContainer}>
          {filteredOptions.map((option) => (
            <OptionRow
              selectedOption={selectedOption}
              option={option}
              onSelect={handleOnOptionSelect}
            />
          ))}
          {!filteredOptions.length && (
            <div className={styles.option}>
              <span className={styles.optionIcon}>
                <SearchIconSvg />
              </span>
              <span className={styles.optionLabel}>
                No results found for {`"${restProps.value}"`}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function OptionRow({
  option,
  selectedOption,
  onSelect,
}: {
  option: Option
  selectedOption?: SelectedOption
  onSelect?: (option: Option) => void
}) {
  const isSelected = selectedOption?.value === option.value
  return (
    <div
      onClick={() => onSelect?.(option)}
      className={`${styles.option} ${isSelected ? styles.selected : ''}`}
    >
      <span className={styles.optionIcon}>
        <SearchIconSvg />
      </span>
      <span className={styles.optionLabel}>{option.label}</span>
    </div>
  )
}

function SearchIconSvg() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      width='20'
      height='20'
      viewBox='0 0 30 30'
    >
      <path d='M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z'></path>
    </svg>
  )
}

function ClearSvg() {
  return (
    <svg
      height='20'
      width='20'
      viewBox='0 0 20 20'
      aria-hidden='true'
      focusable='false'
    >
      <path d='M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z'></path>
    </svg>
  )
}
