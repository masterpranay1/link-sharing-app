import { useEffect, useState } from "react";
import { useGlobal } from "@/services/context";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from "@/services/notification";
import {
  useGetUserInfo,
  useSaveUserInfo,
  useSaveProfilePicture,
} from "@/application/useUserInfo";
import { useLogoutUser } from "@/application/useUserAuth";

export default function Profile({ className, setReRenderMockup }: { className?: string; setReRenderMockup?: any }) {
  const { dispatchUser, userState } = useGlobal();
  const navigate = useNavigate();
  const getUserInfo = useGetUserInfo();
  const saveUserInfo = useSaveUserInfo();
  const saveProfilePicture = useSaveProfilePicture();
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    profilepicture: "https://via.placeholder.com/250",
  });
  const [loading, setLoading] = useState(false);
  const [isProfileImageChanges, setIsProfileImageChanges] = useState(false);
  const [imageLocalPath, setImageLocalPath] = useState<File>();

  const logoutUser = useLogoutUser();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const res = await getUserInfo();
      if (res) {
        setUserInfo((prev) => {
          return {
            ...prev,
            firstname: res.firstname as string,
            lastname: res.lastname as string,
            email: res.email as string,
            profilepicture: (res.profileImage as string) || prev.profilepicture,
          };
        });
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    const res = await saveUserInfo({
      userid: userState.id,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
    });

    if (res) {
      notifySuccess("Profile Data updated successfully");
      setReRenderMockup(true);
    } else {
      notifyError("Something went wrong");
    }

    if (isProfileImageChanges) {
      // upload image
      notifySuccess("Uploading Profile Picture");
      const res = await saveProfilePicture(imageLocalPath as File);
      if (res) {
        setUserInfo((prev) => {
          return {
            ...prev,
            profilepicture: res as string,
          };
        });
        setReRenderMockup(true);
        notifySuccess("Profile Picture Updated Successfully");
      } else {
        return notifyError("Profile Picture Uploading Failed!!");
      }
    }
  };

  const handleClick = async () => {
    await logoutUser();
    dispatchUser(null);
    navigate("/login");
  };

  const handleProfileImageChange = (e: any) => {
    setIsProfileImageChanges(true);
    setImageLocalPath(e.target.files[0]);
    console.log(typeof e.target.files[0]);
  };

  return (
    <section className={`${className} bg-white rounded-lg px-4 py-4 relative`}>
      <h1 className="text-4xl text-slate-600 font-bold">Profile Details</h1>
      <p className="text-slate-400 mt-2">
        Add your details to create a personal touch to your profile
      </p>

      <div className="form_wrapper my-8">
        <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-100 p-4 md:px-8 rounded-lg">
          <span className="text-slate-600 md:w-2/4">Profile Picture</span>
          <label htmlFor="profilepicture" className="cursor-pointer">
            <input
              type="file"
              name="profilepicture"
              id="profilepicture"
              className="hidden"
              onChange={handleProfileImageChange}
            />
            <div
              className={`hover: w-32 h-32 object-cover bg-cover rounded-lg`}
              style={{
                backgroundImage: `url(${userInfo.profilepicture})`,
              }}
            >
              <div className="opacity-0 hover:opacity-60 transition-all text-white flex rounded-lg justify-center items-center w-full h-full backdrop-brightness-50">
                Change Image
              </div>
            </div>
          </label>
          <p className="flex flex-col text-sm text-slate-400">
            <span className="block">Image must be below 1024x1024px</span>
            <span className="block">Use PNG, JPG, BMP format</span>
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 items-center bg-slate-100 p-4 md:px-8 rounded-lg">
          <label
            htmlFor="first-name"
            className="text-slate-600 w-full flex flex-col md:flex-row gap-4 md:items-center"
          >
            <span className="block md:w-2/4 text-slate-600">
              First Name<sup>*</sup>
            </span>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder={loading ? "Loading..." : "First Name"}
              className="input px-4 py-2 outline-none border rounded-lg"
              value={userInfo.firstname}
              onChange={handleChange}
            />
          </label>

          <label
            htmlFor="last-name"
            className="text-slate-600 w-full flex flex-col md:flex-row gap-4 md:items-center"
          >
            <span className="block md:w-2/4 text-slate-600">
              Last Name<sup>*</sup>
            </span>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder={loading ? "Loading..." : "Last Name"}
              className="input px-4 py-2 outline-none border rounded-lg"
              value={userInfo.lastname}
              onChange={handleChange}
            />
          </label>

          <label
            htmlFor="email"
            className="text-slate-600 w-full flex flex-col md:flex-row gap-4 md:items-center"
          >
            <span className="block md:w-2/4 text-slate-600">
              Email<sup>*</sup>
            </span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder={loading ? "Loading..." : "Email"}
              className="input px-4 py-2 outline-none border rounded-lg"
              defaultValue={userInfo.email}
              disabled
            />
          </label>
        </div>
      </div>

      <div className="py-4 border-t bg-white w-full bottom-0 left-0 flex items-center gap-4">
        <span
          onClick={() => handleClick()}
          className="ml-auto inline-block cursor-pointer text-slate-500 hover:text-slate-400"
        >
          Log out
        </span>
        <button
          onClick={(e) => handleSave(e)}
          className="w-full sm:w-fit bg-blue-600 text-white px-4 py-2 rounded-lg text-lg font-semibold"
        >
          Save
        </button>
      </div>
    </section>
  );
}
