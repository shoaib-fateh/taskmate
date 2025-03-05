"use client";

export default function Dashboard() {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <div
        className="bg-[#38291E] flex items-center w-100 min-h-[100px]"
        style={{
          backgroundImage: "url(./meo.svg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        }}
      >
        <img src="" className="w-100" alt="" />
      </div>
      <div className="px-2 py-4 text-center text-[#B6C2CF]">
        <h1 className="font-bold text-lg mb-3">Stay on track and up to date</h1>
        <p>
          Invite people to boards and cards, leave comments, add due dates, and
          we'll show the most important activity here.
        </p>
      </div>
    </div>
  );
}
