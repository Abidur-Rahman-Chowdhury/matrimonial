import { useEffect, useReducer } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AuthServices from "../../api/AuthServices";
import { AgentCategoryAction } from "../../redux/actions/Agent/AgentAction";
import { LawyerCategoryAction } from "../../redux/actions/Lawyer/LayerAction";

import { USEROLE } from "../../utils/Constants";
import { customPosition } from "../../utils/Modals";

const RegisterModal = ({ show, handleClose }) => {
  const { agentCategory } = useSelector((state) => state.AgentValue);
  const { lawyerCategory } = useSelector((state) => state.LawyerValue);

  const dispattch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      name: "",
      phone: "",
      nid: "",
      user_role: 1,
      password: "",
      password_confirmation: "",
      category: "",
      isShowCat: false,
      errors: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
      },
    }
  );
  useEffect(() => {
    dispattch(AgentCategoryAction());
    dispattch(LawyerCategoryAction());
  }, []);
  // console.log(state)
  const category =
    state.user_role == 2
      ? lawyerCategory
      : state.user_role == 6
      ? agentCategory
      : "";

  const validNameRegex = RegExp(/^[a-zA-Z]([0-9a-zA-Z]){2,10}$/);
  const validEmailRegex = RegExp(
    /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/
  );
  const validPassRegex = RegExp(/^[a-zA-Z]([0-9a-zA-Z]){3,10}$/);
  const validNumRegex = RegExp(/^[0-9+]{11,14}$/);

  let inputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let errors = state.errors;

    switch (name) {
      case "name":
        errors.name = validNameRegex.test(value)
          ? ""
          : "Name must be 5 characters long!";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password = validPassRegex.test(value)
          ? ""
          : "Password must be 4 to 10 character long";
        break;
      case "password_confirmation":
        errors.password_confirmation = state.password.match(
          state.password_confirmation
        )
          ? ""
          : "Password not match";
        break;
      case "phone":
        errors.phone = validNumRegex.test(value)
          ? ""
          : "number must to be 11 to 14 character long";
        break;
      default:
        break;
    }

    setState({ errors, [name]: value });
  };

  let inputSubmit = async (e) => {
    e.preventDefault();
    let res = await AuthServices.register(state);
    if (res.status === 201) {
      customPosition("center", "success", "User has been created");
      setState({
        email: "",
        name: "",
        phone: "",
        nid: "",
        user_role: "",
        password: "",
        password_confirmation: "",
      });

      res.data.token
        ? window.localStorage.setItem("authToken", res.data.token)
        : window.localStorage.removeItem("authToken");

      handleClose();
    } else if (res.status === (422 || 500)) {
      let errors = Object.values(res?.data?.errors);
      errors.forEach((element) => {
        customPosition("center", "error", element[0].toString());
      });
    }
    // console.log("res", res);
    // console.log("state :>> ", state);
  };

  return (
    <div>
      <div className=" d-flex justify-content-center">
        <Modal
          show={show}
          onHide={handleClose}
          className="modal filter-p"
          id="exampleModalCenter2"
        >
          <div className="modal-content logi__modal">
            <Modal.Header
              closeButton
              className=" justify-content-between align-items-center logiHeader"
            >
              <Modal.Title
                className="modal-title text-center logiTitle"
                id="exampleModalCenterTitle"
              >
                Register Here
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
              <form className="join-now-box  register-form p-0">
                <div className="single-option gender justify-content-center  flex-column regisInput">
                  <label htmlFor="Register">Register</label>
                  <div className="regisDrop ">
                    <select
                      name="user_role"
                      id="Register"
                      onChange={inputChange}
                    >
                      <option value={USEROLE.CLIENT}>User</option>
                      <option value={USEROLE.LAWYER}>Lawyer</option>
                      <option value={USEROLE.KAZI}>Kazi</option>
                      <option value={USEROLE.AGENT}>Agent</option>
                      {/* <option value={USEROLE.SPONSOR}>Sponser</option> */}
                    </select>
                    <i className="ri-arrow-down-s-fill" />
                  </div>
                </div>
                {/* category */}
                {(state.user_role == 2 || state.user_role == 6) && (
                  <div className="single-option gender justify-content-center  flex-column regisInput">
                    <label htmlFor="Register">Category</label>
                    <div className="regisDrop ">
                      <select
                        name="category"
                        id="Register"
                        onChange={inputChange}
                      >
                        <option selected disabled>
                          Choose category
                        </option>
                        {category.map((cat, i) => (
                          <option key={i} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <i className="ri-arrow-down-s-fill" />
                    </div>
                  </div>
                )}

                {/*  */}
                <div className="single-option gender justify-content-center flex-column regisInput">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    required
                    onChange={inputChange}
                  />
                  {state.errors.name.length > 0 && (
                    <span className="error">{state.errors.name}</span>
                  )}
                </div>
                <div className="single-option gender justify-content-center flex-column regisInput">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                    onChange={inputChange}
                  />
                  {state.errors.email.length > 0 && (
                    <span className="error">{state.errors.email}</span>
                  )}
                </div>
                <div className="single-option gender justify-content-center flex-column regisInput">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter your number"
                    onChange={inputChange}
                    required
                  />
                  {state.errors.phone.length > 0 && (
                    <span className="error">{state.errors.phone}</span>
                  )}
                </div>
                <div className="single-option gender justify-content-center flex-column regisInput">
                  <label htmlFor="phone">Nid</label>
                  <input
                    type="text"
                    name="nid"
                    id="phone"
                    placeholder="Enter your nid"
                    onChange={inputChange}
                    required
                  />
                </div>
                <div className="single-option gender justify-content-center flex-column regisInput">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={inputChange}
                    placeholder="Enter your password"
                    required
                  />
                  {state.errors.password.length > 0 && (
                    <span className="error">{state.errors.password}</span>
                  )}
                </div>
                <div className="single-option gender justify-content-center flex-column regisInput">
                  <label htmlFor="password">Confirm Password</label>
                  <input
                    type="password"
                    name="password_confirmation"
                    id="passwordCon"
                    onChange={inputChange}
                    placeholder="Confirm your password"
                    required
                  />
                  {state.errors.password_confirmation.length > 0 && (
                    <span className="error">
                      {state.errors.password_confirmation}
                    </span>
                  )}
                </div>
              </form>
              <div className="logiFooter">
                <input
                  className="custom-button"
                  type="submit"
                  onClick={inputSubmit}
                  defaultValue="Create Your Profile"
                />
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default RegisterModal;
