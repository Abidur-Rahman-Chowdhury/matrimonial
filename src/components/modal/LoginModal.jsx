import { useEffect, useReducer } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AuthServices from "../../api/AuthServices";
import appStore from "../../assets/img/appstore.webp";
import pic1 from "../../assets/img/play-store-logo-nisi-filters-australia-11.png";
import {
  authenticatedFunction,
  loginModalShowAction,
  typeFunction,
} from "../../redux/actions/AuthAction";
import { setToken, setType } from "../../utils/functions";

import { customPosition } from "../../utils/Modals";

function LoginModal({}) {
  const { authenticated, loginShow } = useSelector((state) => state.authValue);
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  let dispatch = useDispatch();
  const KAZI = "Kazi";
  const USER = "User";
  const LAWYER = "Lawyer";
  // const AGENT = "Agent";
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      modalNow: KAZI,
      user_role: USER ? 1 : KAZI ? 3 : LAWYER ? 2 : "",
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
    }
  );

  const validEmailRegex = RegExp(
    /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/
  );
  const validPassRegex = RegExp(/^[a-zA-Z]([0-9a-zA-Z]){3,10}$/);

  let inputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let errors = state.errors;

    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password = validPassRegex.test(value)
          ? ""
          : "Password must be 4 to 10 character long";
        break;
      default:
        break;
    }

    setState({ errors, [name]: value });
  };

  const handleClose = () => {
    dispatch(loginModalShowAction(false));

    window.history.back();
  };

  let inputSubmit = async (e) => {
    e.preventDefault();
    let data = {
      user_role:
        state.modalNow === USER
          ? 1
          : state.modalNow === KAZI
          ? 3
          : state.modalNow === LAWYER
          ? 2
          : "",
      email: state.email,
      password: state.password,
    };
    let res = await AuthServices.login(data);

    // console.log("res", res);

    if (res.status === 200) {
      customPosition("center", "success", "Successfully logged in");
      setState({
        email: "",
        user_role: "",
        password: "",
      });
      // console.log("res.data.token", res.data.token);
      // setToken(res.data.token);
      res.data.token
        ? window.localStorage.setItem("authToken", res.data.token)
        : window.localStorage.removeItem("authToken");

      dispatch(authenticatedFunction(true));
      dispatch(typeFunction(res.data.data.user_type));
      setType(res.data.data.user_type);

      // console.log(from);
      navigate(from, { replace: true });
      // navigate(`/profile/info/${res.data.data.profile_id}`);
      dispatch(loginModalShowAction(false));
    } else if (res.status === (422 || 500)) {
      // let errors = Object.values(res?.data?.errors);
      // console.log("errors", errors);
      // errors.forEach((element) => {
      customPosition("center", "error", res?.data?.message.toString());
      // });
    }
    // console.log("state :>> ", state);
  };

  useEffect(() => {
    if (location.pathname === "/login") {
      dispatch(loginModalShowAction(true));
    }
  }, [dispatch, location.pathname]);

  let changeInput = (data) => setState({ modalNow: data });

  return (
    <>
      <div className=" d-flex justify-content-center">
        <Modal show={loginShow} onHide={handleClose} className="modal filter-p">
          <div className=" modal-content logi__modal">
            <Modal.Header
              closeButton
              className=" justify-content-between align-items-center logiHeader"
            >
              <Modal.Title
                className="modal-title text-center logiTitle"
                id="exampleModalCenterTitle"
              >
                Login Here
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
              <div className="join-now-box p-0">
                <div className="single-option logiFooter age justify-content-center flex-column">
                  <div className="my-3">
                    {/* <h4>{state.modalNow}</h4> */}
                    <input
                      type={"email"}
                      className="my-2"
                      name="email"
                      value={state.email}
                      onChange={inputChange}
                      placeholder="email"
                    />
                    {state.errors.email.length > 0 && (
                      <span className="error">{state.errors.email}</span>
                    )}
                    <input
                      type={"password"}
                      name="password"
                      value={state.password}
                      onChange={inputChange}
                      placeholder="password"
                    />
                    {state.errors.password.length > 0 && (
                      <span className="error">{state.errors.password}</span>
                    )}
                    <button className="my-2 loginBtn" onClick={inputSubmit}>
                      Login
                    </button>
                  </div>
                </div>
                <div className="logiFooter">
                  <h6>Get the app</h6>
                  <div className="logiApp">
                    <a href="#">
                      <img src={appStore} alt="" />
                    </a>
                    <a href="#">
                      <img src={pic1} alt="" />
                    </a>
                  </div>
                  <button className="custom-button mt-3">Sign up</button>
                </div>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default LoginModal;

/* 

   <Modal.Body className="modal-body">
			  <div className="join-now-box p-0">
				<div className="single-option justify-content-center">
				  <button className="logiItem custom-button">
					<span>Log in with Google</span>
					<span className="logiGoogle">
					  <img src={google} alt="google" />
					</span>
				  </button>
				</div>
				<div className="single-option gender justify-content-center">
				  <button className="logiItem custom-button">
					<span>Log in with Facebook</span>
					<span className="logiGoogle">
					  <img src={facebook} alt="google" />
					</span>
				  </button>
				</div>
				<div className="single-option age justify-content-center">
				  <button className="logiItem custom-button">
					<span>Log in with phone number</span>
					<span className="logiGoogle">
					  <i className="ri-chat-1-fill"></i>
					</span>
				  </button>
				</div>
				<div className="single-option logiFooter age justify-content-center flex-column">
				  <h6>Login as</h6>
				  <div className="lawKA">
					<button className="custom-button">Lawyer</button>
					<button className="custom-button">Kazi</button>
					<button className="custom-button">Agent</button>
				  </div>
				</div>
				<div className="logiFooter">
				  <h6>Get the app</h6>x
				  <button className="custom-button mt-3">Sign up</button>
				</div>
			  </div>
			</Modal.Body>
*/
