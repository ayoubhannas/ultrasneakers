import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import { Eye, EyeOff, LogIn, Lock, Mail, AlertCircle } from "lucide-react";
import { login, clearError } from "@/Redux/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
`;

const LoginPageWrapper = styled.div`
  height: 91vh;
  display: flex;
  align-items: stretch;
  background-color: ${(props) => props.theme.background};
  position: relative;
  overflow: hidden;
  font-family: "Poppins", sans-serif;

  &::before {
    content: "";
    position: absolute;
    top: -10%;
    right: -5%;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.primary}20,
      ${(props) => props.theme.primary}05
    );
    z-index: 0;
    animation: ${fadeIn} 1.5s ease-out;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -10%;
    left: -5%;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.primary}10,
      ${(props) => props.theme.primary}02
    );
    z-index: 0;
    animation: ${fadeIn} 1.5s ease-out 0.3s backwards;
  }
`;

const BrandSection = styled.div`
  flex: 1;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundAlt};
  position: relative;
  overflow: hidden;

  @media (min-width: 1024px) {
    display: flex;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.primary}10,
      transparent
    );
    z-index: 1;
  }
`;

const BrandContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 2rem;
  animation: ${fadeIn} 1s ease-out;
`;

const BrandLogo = styled.h1`
  font-family: "Anton", sans-serif;
  font-size: 4rem;
  font-weight: 400;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: ${(props) => props.theme.text};
  margin-bottom: 1.5rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background-color: ${(props) => props.theme.primary};
    border-radius: 2px;
  }
`;

const BrandTagline = styled.p`
  font-size: 1.25rem;
  color: ${(props) => props.theme.textSecondary};
  max-width: 400px;
  margin: 0 auto;
`;

const LoginSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 420px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const MobileLogo = styled.h1`
  font-family: "Anton", sans-serif;
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${(props) => props.theme.text};
  margin-bottom: 2rem;
  text-align: center;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const LoginCard = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 2.5rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  transition: all 0.3s ease;
  box-sizing: border-box;

  ${(props) =>
    props.$hasError &&
    css`
      animation: ${shake} 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    `}

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const LoginHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const LoginTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.text};
  margin-bottom: 0.5rem;
`;

const LoginSubtitle = styled.p`
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.875rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${(props) => props.theme.primary};
  }
`;

const InputWrapper = styled.div`
  position: relative;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &:focus-within {
    transform: translateY(-2px);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  padding-left: 2.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.backgroundAlt};
  color: ${(props) => props.theme.text};
  font-size: 0.875rem;
  transition: all 0.3s ease;
  font-family: "Poppins", sans-serif;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.primary}30;
  }

  &.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 2px #ef444430;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  ${InputWrapper}:focus-within & {
    color: ${(props) => props.theme.primary};
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${(props) => props.theme.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.text};
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.875rem 1.5rem;
  background-color: #24a0ed;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-family: "Poppins", sans-serif;
  box-sizing: border-box;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${(props) => props.theme.primary}40;
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  ${(props) =>
    props.$loading &&
    css`
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.2),
          transparent
        );
        animation: shimmer 1.5s infinite;
      }

      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
    `}
`;

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isLogged,
    loading,
    error: authError,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, email, password]);

  useEffect(() => {
    if (hasError) {
      const timer = setTimeout(() => {
        setHasError(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hasError]);

  useEffect(() => {
    if (isLogged) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isLogged, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setHasError(true);
      return;
    }

    try {
      await dispatch(login({ email, password })).unwrap();
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setHasError(true);
    }
  };

  return (
    <LoginPageWrapper>
      <BrandSection>
        <BrandContent>
          <BrandLogo>UltraSneakers</BrandLogo>
          <BrandTagline>Admin Dashboard</BrandTagline>
        </BrandContent>
      </BrandSection>

      <LoginSection>
        <LoginContainer>
          <MobileLogo>UltraSneakers</MobileLogo>

          <LoginCard $hasError={hasError}>
            <LoginHeader>
              <LoginTitle>Admin Login</LoginTitle>
              <LoginSubtitle>
                Enter your credentials to access the dashboard
              </LoginSubtitle>
            </LoginHeader>

            <Form onSubmit={handleSubmit}>
              {authError && (
                <ErrorMessage>
                  <AlertCircle size={12} />
                  {authError}
                </ErrorMessage>
              )}

              <FormGroup>
                <Label htmlFor="email">
                  <Mail size={14} />
                  Email Address
                </Label>
                <InputWrapper>
                  <InputIcon>
                    <Mail size={16} />
                  </InputIcon>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? "error" : ""}
                    placeholder="Enter your email"
                  />
                </InputWrapper>
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">
                  <Lock size={14} />
                  Password
                </Label>
                <InputWrapper>
                  <InputIcon>
                    <Lock size={16} />
                  </InputIcon>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.password ? "error" : ""}
                    placeholder="Enter your password"
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </PasswordToggle>
                </InputWrapper>
                {errors.password && (
                  <ErrorMessage>{errors.password}</ErrorMessage>
                )}
              </FormGroup>

              <Button type="submit" disabled={loading} $loading={loading}>
                {loading ? (
                  "Logging in..."
                ) : (
                  <>
                    <LogIn size={16} />
                    Login to Dashboard
                  </>
                )}
              </Button>
            </Form>
          </LoginCard>
        </LoginContainer>
      </LoginSection>
    </LoginPageWrapper>
  );
};

export default AdminLoginPage;
