import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import { activateUser } from '@/lib/database/actions/user.action';

type props = {
    jwt: string;
}

const EmailVarification = async ({ jwt }: props) => {
    // const session = await getServerSession(authOptions);
    const activeUser = await activateUser(jwt);
    return (
        <Card className='bg-hero_BG shadow-md p-5 sm:p-10 w-full'>
            <CardContent>
                {activeUser === "userNotExist" ? (
                    <>
                        <p className='text-red-500 text-center h3'> Ops !</p>
                        <p className="text-red-500 h4 text-center">The user does not exist</p>
                    </>
                ) : activeUser === "alreadyActivate" ? (
                    <>
                        <p className='text-red-500 text-center h3'>Hmm...</p>
                        <p className="text-red-500 h4 text-center">The user is already activated</p>
                    </>
                ) : activeUser === "success" ? (
                    <>
                        <p className='text-center text-green-500 h3'>Success !</p>
                        <p className="text-green-500 h4 text-center">The user is now activated</p>
                    </>
                ) : (
                    <>
                        <p className='text-center h3 text-yellow-500'></p>
                        <p className="text-yellow-500 h4 text-center">Oops! Something went wrong!</p>
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default EmailVarification