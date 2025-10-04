import Stack from '@mui/material/Stack';
import { Paper } from "@mui/material";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Login",
    description: "Login to system",
};

export default function AdminAuthRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Stack sx={{
            minHeight: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center',
            background: "radial-gradient(ellipse at 60% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))"
        }}>
            <Paper elevation={5} sx={{ minWidth: '30%', padding: 2, borderRadius: 2, }}>
                {children}
            </Paper>
        </Stack>
    );
}
