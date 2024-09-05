import TemplateCard from '@/common/templatecard/TemplateCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetTemplatesByEventsQuery } from '@/store/apiSlice/templateApi';
import { useParams } from 'react-router-dom';

const EventWiseTemplates = () => {
    const { eventId, type } = useParams();
    const { data, isLoading, error } = useGetTemplatesByEventsQuery({ eventId, type });
    return (
        <ScrollArea className='w-full h-full'>
            <h3 className="text-[2rem] font-medium text-center mt-2">Templates for Events</h3>
            <div className="flex flex-wrap justify-center items-start gap-6 py-4 mb-[8rem]">
                {data?.data?.templates?.length ? (data?.data?.templates?.map((template) =>
                    <TemplateCard template={template} key={template?._id} type={type} eventId={eventId}/>
                ))
                    :
                    (<h1>No templates founds</h1>)
                }

            </div>
        </ScrollArea>
    )
}
export default EventWiseTemplates