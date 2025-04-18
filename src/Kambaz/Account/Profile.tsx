import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Button, FormControl } from "react-bootstrap";
import * as client from "./client"; // Includes updateUser & signout

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kambaz/Account/Signin");
    setProfile(currentUser);
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl defaultValue={profile.username} id="wd-username" className="mb-2"
                       onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
          <FormControl defaultValue={profile.password} id="wd-password" className="mb-2"
                       onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
          <FormControl defaultValue={profile.firstName} id="wd-firstname" className="mb-2"
                       onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
          <FormControl defaultValue={profile.lastName} id="wd-lastname" className="mb-2"
                       onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
          <FormControl defaultValue={profile.dob} id="wd-dob" className="mb-2" type="date"
                       onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
          <FormControl defaultValue={profile.email} id="wd-email" className="mb-2"
                       onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          <select onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  className="form-control mb-2" id="wd-role" defaultValue={profile.role}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>

          <Button onClick={updateProfile} className="btn btn-primary w-100 mb-2" id="wd-update-btn">
            Update
          </Button>

          <Button onClick={signout} className="w-100 mb-2 btn btn-danger" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
