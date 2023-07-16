import RightArrow from "../../assets/right-arrow.png";

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
      className={`flex flex-row gap-2 items-center justify-center ${bgcolor} ${textColor} px-4 py-2 rounded-lg`}
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

export default function MockupPreview({ className }: { className?: string }) {
  return (
    <div className={`${className} bg-white rounded-lg p-4 lg:p-12 lg:px-16`}>
      <div className="outer-boundry border w-full h-full rounded-[3em] p-4">
        <div className="inner-boundry border w-full h-full rounded-[2em] overflow-hidden">
          <div className="top-bar w-1/2 h-8 rounded-[1em] border mx-auto -translate-y-4"></div>

          <div className="w-full h-full overflow-y-scroll no-scrollbar pb-12">
            <figure>
              <img
                src="../../../src/assets/dp.jpeg"
                alt="profile"
                className="w-16 h-16 lg:w-24 lg:h-24 mx-auto rounded-full border-2 border-slate-400"
              />
            </figure>

            <h2 className="text-md text-center font-bold my-2 text-slate-600">
              Pranay Raj
            </h2>
            <p className="text-sm text-center break-all mx-2 text-slate-600">
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
    </div>
  );
}
