import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import cart from "../../assets/img/icon/LogoMakr-02OEp4.png";
import lawyer from "../../assets/img/icon/LogoMakr-551CtA.png";
import findPartner from "../../assets/img/icon/LogoMakr-6mV6Vg.png";
import course from "../../assets/img/icon/LogoMakr-7d7yhl.png";
import shop from "../../assets/img/icon/LogoMakr-7rdF2C.png";
import membership from "../../assets/img/icon/LogoMakr-7XW4Bl.png";
import blog from "../../assets/img/icon/LogoMakr-8HQa8v.png";
import {
  default as kaziAgent,
  default as register,
} from "../../assets/img/icon/LogoMakr-9dyVlR.png";
import blackLogo from "../../assets/img/logo/Frame 5.png";
import white__logo from "../../assets/img/logo/Frame 6.png";
import { cartDataAction } from "../../redux/actions/shop/ShopAction";
import RegisterModal from "../modal/RegisterModal";
import ScrollToTop from "../ScrollToTop";
import { toastifyAlertSuccess } from "../toast/toast";

function Header() {
  const { authenticated, currentUser } = useSelector(
    (state) => state.authValue
  );
  const { cartData } = useSelector((state) => state.shopValue);
  // console.log("cartData", cartData);
  // console.log("authenticated", authenticated);

  const getToken = window.localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [regShow, setRegShow] = useState(false);

  const handleRegClose = () => setRegShow(false);
  const handleRegShow = () => setRegShow(true);
  let [isHaderActive, setIsHeaderActive] = useState(false);

  let logOut = () => {
    // window.localStorage.removeItem("matrimonial_auth_token");
    window.localStorage.removeItem("authToken");
    toastifyAlertSuccess("Logged out successfully", "top-center");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const active = () => {
    setIsActive(!isActive);
  };
  useEffect(() => {
    // console.log("kk");
    window.addEventListener("scroll", function () {
      let scrollPosition = this.scrollY;

      if (scrollPosition <= 30) {
        setIsHeaderActive(false);
      } else if (scrollPosition >= 30) {
        setIsHeaderActive(true);
      }
    });

    dispatch(cartDataAction());
  }, [isHaderActive, dispatch]);
  return (
    <>
      {/* <Loader /> */}

      <div className={isActive ? "overlay active" : "overlay"}></div>
      <ScrollToTop />
      <header
        className={
          isHaderActive ? "header-section  header-active" : " header-section"
        }
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="header-wrapper">
                <div className="logo">
                  <Link to={"/"}>
                    <img className="black__logo" src={blackLogo} alt="logo" />
                    <img className="white__logo" src={white__logo} alt="logo" />
                  </Link>
                </div>

                <div className="header__iconWrpr">
                  <ul className={isActive ? "menu active" : "menu"}>
                    <li className="hover">
                      <Link to={"/partner"}>
                        <span id="tooltipText" className="toolTipBig">
                          <img
                            src={findPartner}
                            alt=""
                            srcSet=""
                            className="img-fluid"
                          />
                          <span className="tooltip__"> find your partner</span>
                        </span>
                      </Link>
                    </li>
                    <li className="hover">
                      <Link to={"/membership"}>
                        <span
                          id="tooltipText"
                          href="membership.php"
                          className="pain"
                        >
                          <img
                            src={membership}
                            alt=""
                            srcSet=""
                            className="img-fluid"
                          />

                          <span className="tooltip__"> Membership</span>
                        </span>
                      </Link>
                    </li>
                    <li className="hover">
                      <Link to={"/blog"}>
                        <span id="tooltipText" className="toolTipBig pain2">
                          <img
                            src={blog}
                            alt=""
                            srcSet=""
                            className="img-fluid"
                          />

                          <span className="tooltip__"> Blog</span>
                        </span>
                      </Link>
                    </li>
                    <li className="hover">
                      <Link to={"/course"}>
                        <img
                          src={course}
                          alt=""
                          srcSet=""
                          className="img-fluid"
                        />
                        <span className="tooltip__"> Course</span>
                      </Link>
                    </li>
                    <li className="hover">
                      <Link to={"/shop"}>
                        <img
                          src={shop}
                          alt=""
                          srcSet=""
                          className="img-fluid"
                        />
                        <span className="tooltip__"> Shop</span>
                      </Link>
                    </li>
                    <li className="hover">
                      <Link to={"/lawyer"}>
                        <img
                          src={lawyer}
                          alt=""
                          srcSet=""
                          className="img-fluid"
                        />
                        <span className="tooltip__"> Find a lawyer</span>
                      </Link>
                    </li>
                    <li
                      id="tooltipText"
                      className="user-profile d-flex header__login header__login2"
                    >
                      <img src={kaziAgent} alt="img" />
                      <span className="tooltip__o tooltip__02">
                        <Link to={"/kazi"}>Kazi</Link>
                        <Link to={"/agent"}>Agent</Link>
                      </span>
                    </li>
                  </ul>
                  <ul className={isActive ? "menu active" : "menu"}>
                    {authenticated || getToken ? (
                      <li id="tooltipText" className="user-profile d-flex">
                        <Link to={`/profile/info/${currentUser.id}`}>
                          <img src={register} alt="img" />
                        </Link>

                        <span
                          className="tooltip__o tooltip__02"
                          onClick={logOut}
                        >
                          <span>Logout</span>
                        </span>
                      </li>
                    ) : (
                      <li
                        id="tooltipText"
                        className="user-profile d-flex header__login"
                      >
                        <img src={register} alt="img" />
                        <span className="tooltip__o tooltip__02">
                          <Link to="/login">login</Link>
                          <span  onClick={() => handleRegShow()}>
                            Register as Member
                          </span>

                          <Link to="/regAsProfessional">
                            Register as a Professional
                          </Link>
                        </span>
                      </li>
                    )}

                    <li className="user-profile">
                      <Link
                        id="tooltipText"
                        to="/cart"
                        className="positon-relative"
                      >
                        <img src={cart} className="cart-bag img-fluid" alt="" />
                        <span className="tooltip__o">Cart</span>
                        <span
                          className="cart-item"
                          style={{ color: "#e41272" }}
                        >
                          {cartData?.length}
                        </span>
                      </Link>
                    </li>
                    <li className="user-profile pl-2">
                      <select className="lanChange" name="lan" id="lan">
                        <option value="">EN</option>
                        <option value="">IN</option>
                        <option value="">BN</option>
                      </select>
                    </li>
                  </ul>
                </div>

                <div
                  className={
                    isActive
                      ? "header-bar d-lg-none active"
                      : "header-bar d-lg-none"
                  }
                  onClick={active}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="search-overlay">
        <div className="close">
          <i className="fas fa-times"></i>
        </div>
        <form action="#">
          <input type="text" placeholder="Write what you want.." />
        </form>
      </div>

      <RegisterModal
        show={regShow}
        handleClose={handleRegClose}
        handleShow={handleRegShow}
      />
    </>
  );
}

export default Header;
