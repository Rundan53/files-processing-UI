import React, { useEffect, useState } from 'react'
import { getNextFiveDays } from '@/utils/getFiveDays';
import { formateDate } from '@/utils/formateDate';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import notFound from "../../../assets/not_found.svg";
import { format } from "date-fns";
import axios from 'axios';
import { server } from '@/config';
import { getEventsByDate } from '@/store/apiSlice/axiosApi';
import { Link } from 'react-router-dom';
import { useLazyGetEventsByDateQuery } from '@/store/apiSlice/templateApi';
import eventTemplateImg from "/assets/event.svg";


const EventSection = ({ type }) => {

    const [calendarDate, setCalendarDate] = useState("");
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(getNextFiveDays()[0]);
    const [getEventsByDate,{data:eventsData,isLoading}] = useLazyGetEventsByDateQuery();

    useEffect(() => {
        const formattedDate = formateDate(selectedDate);
        getEventsByDate(formattedDate);
    }, [selectedDate]);



    function handleSelectDate(event) {
        setCalendarDate(event);
        setSelectedDate(event);
    }

    return (
        <section className="text-[2rem] font-medium mt-[5rem] bg-slate-300 p-4">
            <h3 className="text-[2rem] font-medium text-center text-background">Events</h3>
            <p className="w-[40rem] mx-auto text-center text-lg text-pretty text-background">
                Stay up-to-date with month-wise events and festivals! Get notified
                and never miss out on any celebration with our event alert service
            </p>
            <div className="flex flex-col items-center gap-5 mt-4">
                <div className="flex gap-6">
                    {getNextFiveDays().map((days) => {
                        const date = new Date(days).getDate();
                        const month = new Date(days).toLocaleString("default", {
                            month: "long",
                        });
                        const day = new Date(days).toLocaleString("default", {
                            weekday: "long",
                        });
                        const year = new Date(days).getFullYear();
                        return (
                            <div
                                className={`px-5 py-2 text-primary-foreground rounded-lg cursor-pointer ${formateDate(days) === formateDate(selectedDate) ?
                                    "bg-blue-600" : " bg-primary"
                                    }`}
                                key={days}
                                onClick={() => {
                                    setSelectedDate(days);
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <p className="leading-none text-[2.5rem] text-center">
                                        {date}
                                    </p>
                                    <p className=" text-center text-sm">
                                        {month},&nbsp;{year}
                                    </p>
                                </div>
                                <p className="text-center text-[1rem] leading-none">
                                    {day}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="flex gap-3 mt-5">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className={cn(
                                    "w-[20rem] justify-start text-left font-normal",
                                    !calendarDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {calendarDate ? (
                                    format(calendarDate, "PPP")
                                ) : (
                                    <span>Select by date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={calendarDate}
                                onSelect={handleSelectDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {/* <Select>
                <SelectTrigger className="w-[10rem]">
                  <SelectValue placeholder="Select by month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectContent>
              </Select> */}
                </div>
            </div>
            <div className="w-full my-12 flex gap-[4rem] flex-wrap items-start justify-center">
                {!eventsData?.data?.events.length && (
                    <div className="">
                        <div className="h-[20rem]">
                            <img
                                src={notFound}
                                alt="not found"
                                className="h-full object-cover object-center"
                            />
                        </div>
                        <h4 className="opacity-60">No Events Found!</h4>
                    </div>
                )}
                {eventsData?.data?.events?.map((event) => {
                    return (
                        <Link className='h-[24rem] w-[20rem] ' to={`/eventTemplates/${event._id}/${type}`} key={event._id}>
                            <div
                                className={`w-full h-full rounded-lg bg-background pt-5`}
                                
                            >
                                <h3 className="text-[1.3rem] text-center">
                                    {event?.eventName}
                                </h3>
                                <div className="w-full h-[15rem] opacity-70 mt-10">
                                    <img src={eventTemplateImg} alt="" className='w-full h-full object-contain object-center'/>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    )
}

export default EventSection