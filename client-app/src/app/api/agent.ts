import axios, { AxiosResponse } from 'axios';
import { IAnnouncement } from '../Models/announcement';
import { history } from '../..';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network Error!')
    }
    const {status, data, config} = error.response
    if (status === 404) {
        history.push('/notfound');
    }
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/notfound');
    }
    if (status === 500){
        toast.error('Server Error!')
    }
    throw error;
})

const responseBody = (response: AxiosResponse) => response.data;
const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
}

const Announcements = {
    list: (): Promise<IAnnouncement[]> => requests.get('/announcements'),
    details: (id: string) => requests.get(`/announcements/${id}`),
    create: (announcement: IAnnouncement) => requests.post('/announcements', announcement),
    update: (announcement: IAnnouncement) => requests.put(`/announcements/${announcement.id}`, announcement),
    delete: (id: string) => requests.del(`/announcements/${id}`)
}

export default {
    Announcements
}