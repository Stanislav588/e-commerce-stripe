import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import { LoginData, fetchLogin } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { enqueueSnackbar } from "notistack";
import { AppDispatch } from "../../redux/store";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  window.scrollTo(0, 0);
  const loader = useSelector((state: any) => state.auth.user.status);

  const isLoading = loader === "loading";
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmitForm(values: LoginData) {
    try {
      const res = await dispatch(fetchLogin(values)).unwrap();
      if (res?.accessToken) {
        navigate("/");
        enqueueSnackbar("You logged in successfully!", { variant: "success" });
        const { accessToken, ...userData } = res;
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error: any) {
      setError("email", {
        type: "manual",
        message: error || "Invalid email or password",
      });
      setError("password", {
        type: "manual",
        message: error || "Invalid email or password",
      });
    }
  }
  return (
    <div className="bg-white block mt-[100px] p-6  md:w-[500px] w-[80%] mx-auto ">
      <h1 className="text-3xl font-medium mb-7">Login</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            gap: "15px",
            maxWidth: "100%",
          }}
        >
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
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
      <p className="mt-8">
        Don't have an account?{" "}
        <Link to="/auth/register">
          <span className="text-lg cursor-pointer font-semibold text-blue-500">
            Sign up
          </span>
        </Link>
      </p>
    </div>
  );
}
