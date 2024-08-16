import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { UserListingInput } from '../../../lib/services/User-Listing/types'
import UserListingService from '../../../lib/services/User-Listing/service'
import { UserService } from '../../../lib/services/Users/service';
import { User } from '../../../lib/services/Users/types';


interface UserListingModalProps {
    onClose: () => void;
    onSubmitSuccess: () => void;
}

const UserListingModal: React.FC<UserListingModalProps> = ({ onClose, onSubmitSuccess }) => {
    // TODO: get current form data from user to prefill form if they have one

    const [currentUser, setCurrentUser] = useState<User>()

    const [formData, setFormData] = useState<UserListingInput>({
        user_id: '',
        leaselength: '',
        moveInTime: '',
        housematesCount: '',
        description: '',
        website: '',
        phone: '',
        email: '',

    })


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



    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log('form', formData)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userListingService = UserListingService();
        try {
            await userListingService.create(formData);
            console.log('Submitted:', { formData });
            onSubmitSuccess();
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }

        onClose();
    };

    return (
        <>
            <Dialog open={true} onClose={onClose} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-white bg-opacity-85 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
                    <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0 h-screen">
                        <DialogPanel
                            transition
                            className="h-4/6 relative transform overflow-y-auto rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 p-8"
                        >
                            <form onSubmit={handleSubmit} className="flex flex-col text-xs">
                                <div className='flex flex-col justify-center items-center '>
                                    <h3 className='text-lg font-bold'>Create profile
                                    </h3>
                                    <p className='text-sm text-gray-500'>
                                        Make yourself
                                        discoverable on DirectorySF
                                    </p>
                                </div>
                                <section>
                                    <label className='text-xs text-gray-500'>
                                        Bio
                                        <textarea
                                            name='description'
                                            value={formData.description}
                                            onChange={handleChange}
                                            className='border p-2 rounded mb-4 w-full text-xs'
                                            placeholder="What are you working on? What is important to you? What type of environment do you want to live in?" />
                                    </label>

                                </section>
                                <section>
                                    <span>What type of housing do you want?</span>
                                    <div className="mb-4 flex flex-col gap-2 mt-2">
                                        <label>
                                            <input
                                                type="radio"
                                                name='leaselength'
                                                value="1-year lease"
                                                checked={formData.leaselength === '1-year lease'}
                                                onChange={handleChange}
                                            />
                                            1-year lease
                                        </label>
                                        <label className="">
                                            <input
                                                type="radio"
                                                name='leaselength'
                                                value="Short-term stay"
                                                checked={formData.leaselength === 'Short-term stay'}
                                                onChange={handleChange}
                                            />
                                            Short-term stay
                                        </label>
                                    </div>
                                </section>
                                <section>
                                    <span>When do you want to move in?</span>
                                    <div className="mb-4 flex flex-col gap-2 mt-2">
                                        <label>
                                            <input
                                                name='moveInTime'
                                                type="radio"
                                                value="ASAP"
                                                checked={formData.moveInTime === 'ASAP'}
                                                onChange={handleChange}
                                            />
                                            ASAP
                                        </label>
                                        <label className="">
                                            <input
                                                name='moveInTime'
                                                type="radio"
                                                value="<3 months"
                                                checked={formData.moveInTime === '<3 months'}
                                                onChange={handleChange}
                                            />
                                            {`<3 months`}
                                        </label>
                                        <label className="">
                                            <input
                                                name='moveInTime'
                                                type="radio"
                                                value="3+ months"
                                                checked={formData.moveInTime === '3+ months'}
                                                onChange={handleChange}
                                            />
                                            3+ months
                                        </label>
                                    </div>
                                </section>
                                <section>
                                    <span>How many housemates do you want to live with?</span>
                                    <div className="mb-4 flex flex-col gap-2 mt-2">
                                        <label>
                                            <input
                                                name='housematesCount'
                                                type="radio"
                                                value="1-2"
                                                checked={formData.housematesCount === '1-2'}
                                                onChange={handleChange}
                                            />
                                            1-2
                                        </label>
                                        <label className="">
                                            <input
                                                name='housematesCount'
                                                type="radio"
                                                value="3-5"
                                                checked={formData.housematesCount === '3-5'}
                                                onChange={handleChange}
                                            />
                                            3-5
                                        </label>
                                        <label className="">
                                            <input
                                                name='housematesCount'
                                                type="radio"
                                                value="6-12"
                                                checked={formData.housematesCount === '6-12'}
                                                onChange={handleChange}
                                            />
                                            6-12
                                        </label>
                                        <label className="">
                                            <input
                                                name='housematesCount'
                                                type="radio"
                                                value="12+"
                                                checked={formData.housematesCount === '12+'}
                                                onChange={handleChange}
                                            />
                                            12+
                                        </label>
                                    </div>
                                </section>
                                <section>
                                    <div className="flex mb-4 flex-col">
                                        <span>Link that best describes you (Optional)</span>
                                        <input
                                            type="text"
                                            name='website'
                                            value={formData.website || ''}
                                            onChange={handleChange}
                                            className='border p-2 rounded mb-4 w-full text-xs'
                                            placeholder="gwern.net" />
                                    </div>

                                </section>
                                <section>
                                    <div className="flex mb-4 flex-col">
                                        <span>Contact phone number (Optional)</span>
                                        <input
                                            type="text"
                                            name='phone'
                                            value={formData.phone || ''}
                                            onChange={handleChange}
                                            className='border p-2 rounded mb-4 w-full text-xs'
                                            placeholder="123-456-7890" />
                                    </div>

                                </section>
                                <section>
                                    <div className="flex mb-4 flex-col">
                                        <span>Contact email (Optional)</span>
                                        <input
                                            type="text"
                                            name='email'
                                            value={formData.email || ''}
                                            onChange={handleChange}
                                            className='border p-2 rounded mb-4 w-full text-xs'
                                            placeholder="example@example.com" />
                                    </div>
                                </section>
                                <div className="flex justify-start">
                                    <button disabled={!formData.description || !formData.leaselength || !formData.moveInTime || !formData.housematesCount} type="submit" className="bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded">Submit</button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog >
        </>
    )
}

export default UserListingModal;
