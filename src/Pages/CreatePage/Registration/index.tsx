import Box from "@mui/material/Box";
import { useInput } from "../../../Hooks/input";
import { useFormik } from 'formik';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { object, string } from "yup";

const validationSchema = object({
    email: string().email('must be a valid email').required('enter your email'),
    password: string()
        .required('enter your password')
        .min(8, 'password must be at least 8 characters')
});

export const Registration = () => {


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => postUser(values)
    });

    const postUser = (user: { email: string, password: string }) => {
        console.log(user)
    };

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    variant="standard"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    variant="standard"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </Box>
    );

};



