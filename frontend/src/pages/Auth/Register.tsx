import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import { LoginData, fetchRegister } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { AppDispatch } from "../../redux/types.ts";
export default function Register() {
  window.scrollTo(0, 0);
  const loader = useSelector((state: any) => state.auth.user.status);
  const isLoading = loader === "loading";
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "stason@gmail.com",
      fullName: "Stanislav",
      password: "12345",
    },
  });

  async function handleSubmitForm(values: LoginData) {
    try {
      const res = await dispatch(fetchRegister(values)).unwrap();
      if (res?.token) {
        navigate("/auth/login");
        return enqueueSnackbar("You registered successfully!", {
          variant: "success",
        });
      }
    } catch (error: any) {
      setError("root", {
        type: "manual",
        message: "User already exists",
      });

      return console.log(error?.message);
    }
  }
  return (
    <div className="bg-white block mt-[100px] p-6 w-[500px] mx-auto ">
      <h1 className="text-3xl font-medium mb-7">Register</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: 500,
            gap: "15px",
            maxWidth: "100%",
          }}
        >
          <TextField
            helperText={errors.fullName?.message}
            {...register("fullName", { required: "Name is required" })}
            fullWidth
            error={Boolean(errors.fullName?.message)}
            label="Name"
            id="fullWidth"
          />

          <TextField
            {...register("email", { required: "Email is required" })}
            fullWidth
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            label="Email"
            id="fullWidth"
          />

          <TextField
            {...register("password", { required: "Password is required" })}
            fullWidth
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            label="Password"
            id="fullWidth"
          />
        </Box>

        <Button
          type="submit"
          sx={{ marginTop: "20px", width: "100%" }}
          variant="contained"
        >
          {isLoading ? "Loading..." : "Register"}
        </Button>
        {errors.root && (
          <p className="text-red-500 text-center text-sm mt-2">
            {errors.root.message}
          </p>
        )}
      </form>
      <p className="mt-8">
        Allready have an account?{" "}
        <Link to="/auth/login">
          <span className="text-lg cursor-pointer font-semibold text-blue-500">
            Log In
          </span>
        </Link>
      </p>
    </div>
  );
}
