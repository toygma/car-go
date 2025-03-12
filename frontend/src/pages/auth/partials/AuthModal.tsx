import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import EditInput from "@/components/input/EditInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createForgotPassword,
  createFormData,
  createFormSchema,
  createLoginData,
  forgotFormSchema,
  loginFormSchema,
} from "@/validation/auth/authValidation";
import { Form } from "@/components/ui/form";
import { useMutation } from "@apollo/client";
import {
  FORGOT_PASSWORD,
  LOGIN_USER_MUTATION,
  REGISTER_USER_MUTATION,
} from "@/graphql/mutations/user.mutations";
import { toastNotification } from "@/helpers/helpers";
import { toast } from "@/hooks/use-toast";
import { CURRENT_USER } from "@/graphql/queries/user.queries";
import { isAuthenticatedVar, isLoadingVar, userVar } from "@/apollo/apolloVars";
interface AuthProps {
  toggleAuth: () => void;
  setAuthType: React.Dispatch<
    React.SetStateAction<"signIn" | "signUp" | "forgot">
  >;
}

const AuthModal = () => {
  const [authType, setAuthType] = useState<"signIn" | "signUp" | "forgot">(
    "signIn"
  );

  return (
    <>
      <div className="absolute top-4 left-4">
        <Link
          to={"/"}
          className="bg-gray-100 flex items-center justify-center h-12 w-12 rounded-full"
        >
          <ArrowLeft />
        </Link>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute border border-gray-200 w-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-2xl p-6"
      >
        <h1 className="text-center uppercase font-extrabold text-2xl text-gray-700 mb-4">
          {authType === "signUp"
            ? "Sign Up"
            : authType === "forgot"
            ? "Reset your password"
            : "Sign In"}
        </h1>

        <AnimatePresence mode="wait">
          {authType === "signIn" ? (
            <motion.div
              key="signIn"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Login
                toggleAuth={() => setAuthType("signUp")}
                setAuthType={setAuthType}
              />
            </motion.div>
          ) : authType === "forgot" ? (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <ForgotPassword
                toggleAuth={() => setAuthType("forgot")}
                setAuthType={setAuthType}
              />
            </motion.div>
          ) : (
            <motion.div
              key="signUp"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <SignUp
                toggleAuth={() => setAuthType("signIn")}
                setAuthType={setAuthType}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

function Login({ toggleAuth, setAuthType }: AuthProps) {
  const [LoginUser, { loading, error }] = useMutation(LOGIN_USER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER }],
    onCompleted: (data) => {
      userVar(data.login);
      isAuthenticatedVar(true);
      isLoadingVar(false);
      toast({
        title: "You have successfully logged in.",
        description: "You can browse the site now.",
        variant: "success",
      });
    },
  });

  useEffect(() => {
    if (error) {
      toastNotification(error);
    }
  }, [error]);

  const form = useForm<createLoginData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: createLoginData) => {
    await LoginUser({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Email</label>
          <EditInput
            control={form.control}
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <label className="text-gray-600 font-medium">Password</label>
            <label
              onClick={() => setAuthType("forgot")}
              className="text-gray-600 font-medium text-sm cursor-pointer"
            >
              Forgot your password ?{" "}
            </label>
          </div>
          <EditInput
            control={form.control}
            name="password"
            type="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
            placeholder="Enter your password"
          />
        </div>

        <div className="w-full">
          <Button
            disabled={loading}
            loading={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition cursor-pointer"
          >
            Sign In
          </Button>
        </div>

        <div className="text-center  mt-4 text-gray-600 text-sm">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={toggleAuth}
            className="text-blue-500 font-medium hover:underline cursor-pointer"
          >
            Sign up
          </button>
        </div>
      </form>
    </Form>
  );
}

function SignUp({ toggleAuth, setAuthType }: AuthProps) {
  const [registerUser, { loading, error }] = useMutation(
    REGISTER_USER_MUTATION,
    {
      onCompleted: () => {
        toast({
          title: "Account created",
          description: "You can now log in to your account.",
        });
        setAuthType("signIn");
      },
    }
  );

  useEffect(() => {
    if (error) {
      toastNotification(error);
    }
  }, [error]);

  const form = useForm<createFormData>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      phoneNo: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: createFormData) => {
    await registerUser({
      variables: {
        userInput: data,
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col ">
          <label className="text-gray-600 font-medium">Name</label>
          <EditInput
            control={form.control}
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
            placeholder="Enter your name"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Email</label>
          <EditInput
            name="email"
            control={form.control}
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
            placeholder="Enter your email"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Password</label>
          <EditInput
            control={form.control}
            name="password"
            type="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Phone No</label>
          <EditInput
            control={form.control}
            name="phoneNo"
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="w-full">
          <Button
            disabled={loading}
            loading={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition cursor-pointer"
          >
            Sign Up
          </Button>
        </div>

        <div className="text-center mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={toggleAuth}
            className="text-blue-500 font-medium hover:underline cursor-pointer"
          >
            Sign in
          </button>
        </div>
      </form>
    </Form>
  );
}

function ForgotPassword({ setAuthType }: AuthProps) {
  const [forgotPassword, { loading, error }] = useMutation(FORGOT_PASSWORD, {
    onCompleted: () => {
      toast({
        title: "Check your email account",
        variant: "success",
      });
    },
  });

  useEffect(() => {
    if (error) {
      toastNotification(error);
    }
  }, [error]);

  const form = useForm<createForgotPassword>({
    resolver: zodResolver(forgotFormSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: createForgotPassword) => {
    await forgotPassword({
      variables: {
        email: data.email,
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Email</label>
          <EditInput
            control={form.control}
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
            placeholder="Enter your email"
          />
        </div>

        <div className="w-full">
          <Button
            disabled={loading}
            loading={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition cursor-pointer"
          >
            Submit
          </Button>
        </div>

        <div className="text-center  mt-4 text-gray-600 text-sm">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => setAuthType("signUp")}
            className="text-blue-500 font-medium hover:underline cursor-pointer"
          >
            Sign up
          </button>
        </div>
      </form>
    </Form>
  );
}

export default AuthModal;
