import { Button } from "@mui/material"

interface IProps {
	launchWallet(): void
}

export const Login: React.FC<IProps> = ({launchWallet}) => {
	const login = async () => launchWallet();

	return (
		<Button 
			onClick={login}
			variant="contained"
			sx={{margin: 2}}
		>
			Login
		</Button>
	)
}