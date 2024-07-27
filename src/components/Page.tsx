import { Stack } from '@mui/material';

export const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack
      style={{
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'black',
      }}
    >
      {children}
    </Stack>
  );
};
