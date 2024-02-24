import { CircularProgress } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router";
import { setSession } from "../../utils/jwt";
import axiosInstance from "../../utils/AxiosInstance";
import { setAppList, setLoginData } from "../../store/pyramidSlice";
import { useDispatch, useSelector } from "react-redux";

// For routes that can only be accessed by authenticated team members
function RegistryAuthGuard({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((store) => store.pyramidStore);
  const [loading, setLoading] = React.useState(false);

  const fetchDataFromPortal = async () => {
    try {
      const response = await axiosInstance.get(`/registry/data`);
      switch (response.status) {
        case 200:
          if (response.data.status === "SUCCESS") {
            dispatch(
              setLoginData({
                email: response.data.data.email,
                domain_name: response.data.data.registryData.domain_name,
                logo_url: response.data.data.registryData.logo_url,
                registry_name: response.data.data.registryData.registry_name,
              })
            );

            dispatch(setAppList(response.data.data.registryData.app_list));

            // dispatch(setAppList(response.data.data.app_list));
          } else {
            // setErrorModal({ state: true, errorMessage: response.reason });
          }
          break;

        case 500:
          // setErrorModal({ state: true, errorMessage: response.reason });
          break;

        default: {
          // setErrorModal({ state: true, errorMessage: response.reason });
          break;
        }
      }
    } catch (error) {
      console.log(error.response.status);
      // if (error.response.status === 401) {
        console.log(error);
        setSession();
        navigate("/login");
      // }
    }
  };

  const servePage = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        setSession(accessToken);
        await fetchDataFromPortal();
        navigate("/pyramid");
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  console.log("auth state---", state);
  React.useEffect(() => {
    servePage();
  }, []);

  if (loading) {
    return (
      <React.Fragment>
        <CircularProgress />
      </React.Fragment>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default RegistryAuthGuard;
