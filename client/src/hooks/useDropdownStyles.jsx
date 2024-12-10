import { useMemo } from 'react'

const useDropdownStyles = () => {
  return useMemo(
    () => ({
      control: (provided, state) => ({
        ...provided,
        backgroundColor: 'transparent', // Transparent background for the dropdown button
        borderColor: state.isFocused ? '#3498db' : '#ccc',
        borderWidth: '1px',
        '&:hover': {
          borderColor: '#3498db', // Change border color on hover
        },
        boxShadow: 'none', // Remove box-shadow
      }),
      placeholder: (provided) => ({
        ...provided,
        color: '#777', // Placeholder text color
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: '#fff', // Solid background color for the options menu
        borderRadius: '4px',
        border: '1px solid #ccc', // Optional border for the dropdown menu
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? '#3498db'
          : state.isFocused
          ? '#e0e0e0' // Slightly darker or lighter when hovered
          : '#fff', // Solid background for non-selected options
        color: state.isSelected ? '#fff' : '#333', // White text when selected
        padding: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease', // Smooth transition
        '&:hover': {
          backgroundColor: state.isSelected ? '#3498db' : '#d0d0d0', // Hover effect for non-selected options
        },
      }),
    }),
    []
  )
}

export default useDropdownStyles
