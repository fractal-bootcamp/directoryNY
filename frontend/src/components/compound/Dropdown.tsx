import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

interface DropdownProps {
    options: string[]; // Array of options for the dropdown
    onSelect: (value: string) => void; // Callback function to return selected value
    defaultOption?: string; // Optional default option
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, defaultOption }) => {
    const [selected, setSelected] = useState<string | null>(defaultOption || null) // Set default option

    const handleSelect = (value: string) => {
        setSelected(value)
        onSelect(value) // Call the callback with the selected value
    }

    return (
        <Menu as="div" className="relative inline-block text-left w-full">
            <div className="">
                <MenuButton className="bg-white inline-flex w-full justify-between items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <span className="text-xs text-gray-500">{selected || 'Select an option'}</span>
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                </MenuButton>
            </div>

            <MenuItems
                className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
            >
                <div className="py-1">
                    {options.map((option) => (
                        <MenuItem key={option} as="div">
                            <a
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </a>
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    )
}

export default Dropdown
