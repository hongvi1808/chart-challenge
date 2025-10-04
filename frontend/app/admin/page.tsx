'use client'
import { RootState, useAppSelector } from "@/base/store";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Admin() {
    const router = useRouter()

    const { loading, loggedIn } = useAppSelector((state: RootState) => state.auth)
    useEffect(() => { if (!loggedIn) router.replace('/login') }, [loggedIn])

    return (
        <Stack>
            {'trang admin'}
        </Stack>
    );
}
