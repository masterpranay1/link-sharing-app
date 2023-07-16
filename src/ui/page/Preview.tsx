import RightArrow from "../../assets/right-arrow.png";
import DPImage from "../../assets/dp.jpeg";
import { Link } from "react-router-dom";

const Button = ({
  text,
  bgcolor,
  textColor = "text-white",
}: {
  text: string;
  bgcolor: string;
  textColor?: string;
}) => {
  return (
    <button
      className={`flex flex-row gap-2 items-center justify-center ${bgcolor} ${textColor} px-6 py-4 rounded-lg`}
    >
      {/* <span>Image</span> */}
      <div className="block">{text}</div>
      <img
        width="24"
        height="32"
        src={RightArrow}
        alt="long-arrow-right"
        className="ml-auto"
      />
    </button>
  );
};

export default function Preview() {
  return (
    <>
      <div className="w-full h-fit">
        <div className="w-full pb-12 md:pb-32 bg-slate-100 p-4">
          <header className="bg-white p-4 rounded-lg flex justify-between">
            <button className="border w-24 md:w-32 px-4 py-2 border-violet-400 text-violet-400 rounded-lg hover:bg-violet-400 hover:text-white transition-all text-sm">
              <Link to="/links" className="w-full h-full flex items-center justify-center">Back</Link>
            </button>
            <button className="bg-blue-600 text-white hover:opacity-60 px-4 py-2 w-24 md:w-32 rounded-lg text-sm">
              Share Link
            </button>
          </header>
        </div>

        <div className="w-full p-4">
        <div className="w-full md:w-96 mx-auto my-4 -translate-y-12 md:-translate-y-24 bg-white shadow-lg px-4 py-8 rounded-lg m-4">
          <figure>
            <img
              src={DPImage}
              alt="profile"
              className="w-24 h-24 lg:w-32 lg:h-32 mx-auto rounded-full border-2 border-slate-400"
            />
          </figure>

          <h2 className="text-lg text-center font-bold my-2 text-slate-600">
            Pranay Raj
          </h2>
          <p className="text-md text-center break-all mx-2 text-slate-600">
            masterpranayraj@gmail.com
          </p>

          <div className="button-wrapper mx-auto w-full flex flex-col gap-4 px-4 py-4 mt-8">
            <Button text="Github" bgcolor="bg-slate-800" />
            <Button text="Google" bgcolor="bg-red-600" />
            <Button text="Linkedin" bgcolor="bg-blue-600" />
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
