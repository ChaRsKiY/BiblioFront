import TitleWithIcon from "./TitleWithIcon";
import {VscDashboard} from "react-icons/vsc";
import DashboardBlocks from "./DashboardBlock";
import {SlCalender} from "react-icons/sl";
import LastActivityTable from "./LastActivityTable";
import {useEffect, useState, useTransition} from "react";
import axios from "axios";
import tokenStore from "../../../stores/TokenStore";

const AdminDashboard = () => {
    const [statistic, setStatistic] = useState({
        totalBooks: 0,
        totalDownloads: 0,
        totalComments: 0
    })
    const [lastActivities, setLastActivities] = useState([])
    const [page, setPage] = useState(1)
    const [isPending, startTransition] = useTransition()

    const {token} = tokenStore

    useEffect(() => {
        const getDashboardData = () => {
            try {
                startTransition(async () => {
                    const response = await axios.get("Admin/dashboard", {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })

                    setStatistic(response.data)
                })
            } catch (e) {
                console.error(e)
            }
        }

        getDashboardData()
    }, []);

    useEffect(() => {
        const getLastActivityData = () => {
            try {
                startTransition(async () => {
                    const response = await axios.get("Admin/last-activity/" + page, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })

                    setLastActivities(response.data)
                })
            } catch (e) {
                console.error(e)
            }
        }

        getLastActivityData()
    }, [page]);

    return (
        <div>
            <div className="mb-9">
                <TitleWithIcon icon={<VscDashboard size={40}/>} text="Dashboard" />
                <DashboardBlocks {...statistic} />
            </div>

            <TitleWithIcon icon={<SlCalender size={20} />} text="Last Activity" />
            <LastActivityTable lastActivities={lastActivities} page={page} setPage={setPage} isPending={isPending} />
        </div>
    )
}

export default AdminDashboard