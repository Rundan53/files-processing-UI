import { server } from "@/config";
import axios from "axios";
import { formateDate } from "@/utils/formateDate";

export async function handleChangeCategory(categoryId,type) {
    try {
        const response = await axios.get(
            `${server}/templates/category/${categoryId}?type=${type}`,
            {
                withCredentials: true,
            }
        );
        if (response.data.success) {
            return response?.data?.data || []
        }
    } catch (err) {
        console.log(err);
    }
}

export async function getCategories() {
    try {
        const { data } = await axios.get(
            `${server}/categories?type=TEMPLATE`,
            {
                withCredentials: true,
            }
        )
        return data?.data;
    } catch (err) {
        console.log(err);
    }
}
export async function getEventsByDate(selectedDate) {
    try {
        const formattedDate = formateDate(selectedDate);
        const { data: response } = await axios.get(
            `${server}/events?date=${formattedDate}`,
            {
                withCredentials: true,
            }
        );
        return response?.data;
    } catch (err) {
        console.log(err, "from all template page");
    }
}