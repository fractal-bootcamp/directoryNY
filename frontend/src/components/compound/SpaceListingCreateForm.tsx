import { useEffect, useState } from "react"
import { SpaceListingInput } from "../../lib/services/Space-Listing/types"
import SpaceListingService from "../../lib/services/Space-Listing/service"
import { UserService } from "../../lib/services/Users/service"
import { User } from "../../lib/services/Users/types"

interface SpaceListingCreateFormProps {
    onSuccess: () => void;
}

export const SpaceListingCreateForm: React.FC<SpaceListingCreateFormProps> = ({ onSuccess }) => {

    const [currentUser, setCurrentUser] = useState<User>()
    const [isFormVisible, setIsFormVisible] = useState(false);

    // const userService = useUserService()
    const userService = UserService()

    useEffect(() => {
        const fetchUser = async () => {
            const userResponse = await userService.getCurrentUser()
            const user = userResponse.data
            if (!user) return
            setCurrentUser(user)
            setFormData(prevData => ({ ...prevData, user_id: user.id || '' }))
            console.log(user, 'here')
        }
        fetchUser()
    }, [])

    const [formData, setFormData] = useState<SpaceListingInput>({
        user_id: '',
        name: '',
        description: '',
        location: '',
        housemates: '',
        priceRange: '',
        website: '',
        image: '',
        phone: '',
        email: '',
        leaselength: '',
        twitter_handle: '',
        referrer_name: '',
        room_price: '',
        referrer_twitter_url: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
        console.log('hey formdata', formData)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await SpaceListingService().create(formData)
            console.log('Space listing created:', response)
            setFormData({
                user_id: currentUser?.id || '',
                name: '',
                description: '',
                location: '',
                housemates: '',
                priceRange: '',
                website: '',
                image: '',
                phone: '',
                email: '',
                leaselength: '',
                twitter_handle: '',
                referrer_name: '',
                room_price: '',
                referrer_twitter_url: ''
            })
            onSuccess(); // Call the onSuccess callback

        } catch (error) {
            console.error('Error creating space listing:', error)
            // Handle error (e.g., show error message to user)
        }
    }

    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <div>
            <button
                onClick={toggleForm}
                className="mb-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {isFormVisible ? 'Hide Form' : 'Create Space Listing'}
            </button>
            {isFormVisible && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="housemates" className="block text-sm font-medium text-gray-700">Housemates</label>
                        <input
                            type="text"
                            id="housemates"
                            name="housemates"
                            value={formData.housemates}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">Price Range</label>
                        <input
                            type="text"
                            id="priceRange"
                            name="priceRange"
                            value={formData.priceRange}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website (optional)</label>
                        <input
                            type="url"
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL (optional)</label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone (optional)</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (optional)</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Space Listing
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}