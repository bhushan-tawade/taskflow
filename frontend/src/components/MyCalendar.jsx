import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function MyCalendar() {
  return (
    <DayPicker
      animate
      mode="single"
      className="p-4 flex justify-center rounded-xl  dark:text-white "
      classNames={{
        day: "hover:bg-[#FFD300] dark:hover:bg-[#ffff90] hover:text-black rounded-full",
        selected: "bg-[#FFD300] dark:bg-[#ffff90]  rounded-full text-black",
        today: "text-[#FFD300] dark:text-[#ffff90]  font-semibold",
        chevron: "fill-[#FFD300] dark:fill-[#ffff90]",
        caption_label: "text-[#FFD300] dark:text-[#ffff90] font-semibold",
        head_cell: "text-gray-500",
      }}
    />
  );
}

export default MyCalendar;