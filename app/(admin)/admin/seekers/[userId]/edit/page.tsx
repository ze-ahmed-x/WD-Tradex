import UserUpdateForm from "@/components/shared/userForms/UserUpdateForm";
import { findUserByIdExternal } from "@/lib/database/actions/user.action"
import { IUser } from "@/lib/database/models/user.model";

type props = {
    params: { userId: string }
}

const page = async ({ params: { userId } }: props) => {
    const user = await findUserByIdExternal(userId) as IUser;
    const userDatAdjst = { ...user, dob: new Date(user.dob) } as IUser
    return (
        <>
            {user && (<section className='custom_container mt-10 min-h-screen'>
                <div className="flex flex-col gap-6">
                    
                    <h4 className='h4 text-center'>Edit User</h4>
                <UserUpdateForm key={user._id} user={userDatAdjst} />
                </div>
            </section>)
            }
            {
                !user && (
                    <section className='custom_container mt-10 min-h-screen'>
                        Ops ! User data is not found.
                    </section>
                )
            }

        </>
    )
}

export default page