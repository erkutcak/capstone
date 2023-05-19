import Navbar from "@/components/Navbar";
import '../styles/profile.css';
import Profile from "@/components/Profile";

export default async function MyProfile () {

    return (
        <div className="profile-body">
            <Navbar/>
            <div className="profile">
                <Profile/>
            </div>
        </div>
    );
}