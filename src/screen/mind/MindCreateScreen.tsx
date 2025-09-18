"use client"
import CreateModal from "@/component/mind/create/MindCreateModal";

export default function MindCreateScreen({params}: {params: number}){

    return(
        <CreateModal travel_log_id={params} />
    )
}