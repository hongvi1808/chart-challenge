'use client'
import { RootState, useAppDispatch, useAppSelector } from "@/base/store";
import { loginThunk } from "@/base/store/thunks/auth.thunk";
import { validRequire, validUsername } from "@/base/utils/func";
import { ButtonBack } from "@/components/button/btn-back.comp";
import { TextFiledControlBase } from "@/components/input/textfield.comp";
import { Box, Button, IconButton, Link, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLogin() {
    const router = useRouter()

    const dispatchAsyn = useAppDispatch()
    const { loading, loggedIn } = useAppSelector((state: RootState) => state.auth)
    useEffect(() => { if (loggedIn) router.replace('/admin') }, [loggedIn])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries())
        dispatchAsyn(loginThunk(data))
    }
    return (
        <Stack spacing={4} sx={{ justifyContent: "center", padding: 2, }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ButtonBack />
                <Typography
                    component="h1"
                    variant="h4"
                    textAlign={'center'}
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    {'Log in'}
                </Typography>
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <TextFiledControlBase
                    name='username'
                    label="Username"
                    getErrorMessage={validUsername}
                    inputProps={{ placeholder: 'Your username', required: true, }}
                />
                <TextFiledControlBase
                    name='password'
                    label="Password"
                    getErrorMessage={validRequire}
                    inputProps={{ placeholder: 'Your password', type: 'password', required: true }}
                />
                <Button
                    type="submit"
                    fullWidth
                    loading={loading}
                    variant="contained"
                >
                    {'Submit'}
                </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography sx={{ textAlign: 'center' }}>
                    {"Don't you have an account? "}
                    <Link
                        href="/register"
                        variant="body2"
                        sx={{ alignSelf: 'center' }}
                    >
                        {'Sign up'}
                    </Link>
                </Typography>
            </Box>
        </Stack>
    )
}