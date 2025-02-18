import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const LoginSocialIcons = () => {
  return (
    <div class="social-container">
      <button class="social">
        <FontAwesomeIcon icon={faFacebook} size="lg" />
      </button>
      <button href="#" class="social">
        <FontAwesomeIcon icon={faGoogle} size="lg" />
      </button>
      <button href="#" class="social">
        <FontAwesomeIcon icon={faLinkedin} size="lg" />
      </button>
    </div>
  );
};

export default LoginSocialIcons;
