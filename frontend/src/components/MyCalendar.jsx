import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function MyCalendar() {
  return (
    <DayPicker
      animate
      mode="single"
      className="p-4 flex justify-center rounded-xl  text-white "
      classNames={{
        day: "hover:bg-[#ffff90] hover:text-black rounded-full",
        selected: "bg-[#ffff90] rounded-full text-black",
        today: "text-[#ffff90] font-semibold",
        chevron: "fill-[#ffff90]",
        caption_label: "text-[#ffff90] font-semibold",
        head_cell: "text-gray-500",
      }}
    />
  );
}

export default MyCalendar;