'use client'

import { useAppDispatch } from "@/base/store";
import { logoutThunk } from "@/base/store/thunks/auth.thunk";
import { Avatar, Divider, Drawer, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, } from "@mui/material"
import { useRouter } from "next/navigation";
import { FlagCheckered, SignOut } from "phosphor-react";

const menus: MenuType[] = [
    { text: 'Metrics', href: '/admin/metrics', icon: '' }
]

type MenuType = { text: string; href: string; icon: any }
export interface SitebarProps {
    // menus: MenuType[];
}
export function Sitebar(props: SitebarProps) {
    const router = useRouter()
    const dispatchAsyn = useAppDispatch()
    const logout = async () => {
        const result = await dispatchAsyn(logoutThunk())
        if (logoutThunk.fulfilled.match(result)) {
            router.push("/login");
        }

    }
    return <Drawer open={true}
        variant={'permanent'}
    >
        <List>
            <Stack padding={1} spacing={1} alignItems={'center'}>
                <Avatar sizes='small' >A</Avatar>
                <Stack >
                    <Typography variant='body1'>{'Hi, Admin'}</Typography>
                    <Typography variant='caption' color='textSecondary'>{''}</Typography>
                </Stack>

            </Stack>
            <Divider />
            {menus?.map((item, index) => (
                <ListItem key={index} disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                        selected={true}
                        sx={{
                            minWidth: 240,
                            display: "flex",
                            justifyContent: 'flex-start',
                            alignItems: "center",
                            margin: 1,
                            borderRadius: 2
                        }}
                        onClick={() => router.push(item.href)}
                    >
                        <Stack spacing={1} direction={'row'} >

                            <Icon sx={{ justifyContent: 'center', alignContent: 'center', }} >
                                {<FlagCheckered />}
                            </Icon>
                            <ListItemText primary={item.text}
                                sx={{
                                    "& .MuiTypography-root": {
                                        fontSize: "1rem",
                                        fontWeight: 500,
                                    },
                                    marginY: 'inherit'
                                }} />
                        </Stack>
                    </ListItemButton>
                </ListItem>
            ))}
            <Divider />
            <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                    sx={{
                        minWidth: 240,
                        display: "flex",
                        justifyContent: 'flex-start',
                        alignItems: "center",
                        margin: 1,
                        borderRadius: 2
                    }}
                    onClick={() => logout()}
                >
                    <Stack spacing={1} direction={'row'} >

                        <Icon sx={{ justifyContent: 'center', alignContent: 'center', }} >
                            {<SignOut />}
                        </Icon>
                        <ListItemText primary={"Logout"}
                            sx={{
                                "& .MuiTypography-root": {
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                },
                                marginY: 'inherit'
                            }} />
                    </Stack>
                </ListItemButton>
            </ListItem>
        </List>

    </Drawer>

}